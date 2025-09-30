#!/usr/bin/env tsx

import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import prettier from "prettier";

interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  servers: Array<{
    url: string;
    description?: string;
  }>;
  paths: Record<string, Record<string, any>>;
}

interface OperationInfo {
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: Array<{
    name: string;
    in: "path" | "query" | "header" | "cookie";
    required?: boolean;
    schema?: any;
  }>;
  requestBody?: {
    content: Record<string, any>;
  };
  responses: Record<
    string,
    {
      content?: Record<string, any>;
    }
  >;
}

const OPENAPI_URL = "https://menteeno-backend.chbk.app/docs/api.json";
const OUTPUT_DIR = join(process.cwd(), "src");
const TYPES_FILE = join(OUTPUT_DIR, "api", "openapi.types.ts");
const SERVICE_FILE = join(OUTPUT_DIR, "services", "menteenoApi.generated.ts");

/**
 * Fetches the OpenAPI specification from the given URL
 */
async function fetchOpenAPISpec(): Promise<OpenAPISpec> {
  console.log("📡 Fetching OpenAPI specification...");

  try {
    const response = await fetch(OPENAPI_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`
      );
    }

    const spec = await response.json();
    console.log(
      `✅ Successfully fetched OpenAPI spec (${spec.info?.title} v${spec.info?.version})`
    );
    return spec;
  } catch (error) {
    console.error("❌ Failed to fetch OpenAPI specification:", error);
    process.exit(1);
  }
}

/**
 * Generates TypeScript types from OpenAPI spec
 */
async function generateTypes(spec: OpenAPISpec): Promise<void> {
  console.log("🔧 Generating TypeScript types...");

  try {
    // Use openapi-typescript to generate types
    const { execSync } = await import("child_process");
    execSync(
      `npx openapi-typescript "${OPENAPI_URL}" --output "${TYPES_FILE}"`,
      {
        stdio: "inherit",
        cwd: process.cwd(),
      }
    );
    console.log(`✅ Types generated at ${TYPES_FILE}`);
  } catch (error) {
    console.error("❌ Failed to generate types:", error);
    process.exit(1);
  }
}

/**
 * Safely fills path template with parameters
 */
function fillPath(template: string, params?: Record<string, any>): string {
  if (!params) return template;

  return template.replace(/\{([^}]+)\}/g, (match, paramName) => {
    const value = params[paramName];
    if (value === undefined || value === null) {
      throw new Error(`Missing required path parameter: ${paramName}`);
    }
    return String(value);
  });
}

/**
 * Generates a deterministic camelCase name from path and method
 */
function generateOperationName(path: string, method: string): string {
  const pathParts = path
    .split("/")
    .filter((part) => part && !part.startsWith("{"))
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());

  const methodPrefix =
    method.charAt(0).toUpperCase() + method.slice(1).toLowerCase();
  return methodPrefix + pathParts.join("");
}

/**
 * Sanitizes operation ID to be a valid JavaScript identifier
 */
function sanitizeOperationName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9_$]/g, "_") // Replace invalid chars with underscore
    .replace(/^[0-9]/, "_$&") // Prefix with underscore if starts with number
    .replace(/_+/g, "_") // Replace multiple underscores with single
    .replace(/^_|_$/g, ""); // Remove leading/trailing underscores
}

/**
 * Extracts response type from OpenAPI operation
 */
function getResponseType(operation: OperationInfo): string {
  const responses = operation.responses;

  // Look for 2xx responses with JSON content
  for (const [statusCode, response] of Object.entries(responses)) {
    if (statusCode.startsWith("2") && response.content?.["application/json"]) {
      const schema = response.content["application/json"].schema;
      if (schema?.$ref) {
        // Extract type name from $ref
        const typeName = schema.$ref.split("/").pop();
        return `components['schemas']['${typeName}']` || "unknown";
      }
      return "any"; // Fallback for inline schemas
    }
  }

  return "void";
}

/**
 * Extracts request body type from OpenAPI operation
 */
function getRequestBodyType(operation: OperationInfo): string {
  if (!operation.requestBody?.content?.["application/json"]) {
    return "void";
  }

  const schema = operation.requestBody.content["application/json"].schema;
  if (schema?.$ref) {
    const typeName = schema.$ref.split("/").pop();
    return `components['schemas']['${typeName}']` || "unknown";
  }

  return "any"; // Fallback for inline schemas
}

/**
 * Converts operation name to proper hook name
 */
function toHookName(operationName: string, isQuery: boolean): string {
  const suffix = isQuery ? "Query" : "Mutation";
  return `use${operationName.charAt(0).toUpperCase()}${operationName.slice(1)}${suffix}`;
}

/**
 * Generates RTK Query service from OpenAPI spec
 */
async function generateRTKService(spec: OpenAPISpec): Promise<void> {
  console.log("🔧 Generating RTK Query service...");

  const baseUrl = spec.servers?.[0]?.url || "";
  const endpoints: string[] = [];
  const hooks: string[] = [];

  // Process each path and method
  for (const [path, methods] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      if (typeof operation !== "object" || !operation) continue;

      const op = operation as OperationInfo;
      const rawOperationName =
        op.operationId || generateOperationName(path, method);
      const operationName = sanitizeOperationName(rawOperationName);
      const responseType = getResponseType(op);
      const requestBodyType = getRequestBodyType(op);

      // Determine if it's a query or mutation
      const isQuery = ["get", "head"].includes(method.toLowerCase());
      const builderMethod = isQuery ? "query" : "mutation";

      // Generate JSDoc comment
      const jsdoc = [
        "/**",
        op.summary && ` * ${op.summary}`,
        op.description && ` * ${op.description}`,
        ` * @param arg - Arguments for the ${operationName} operation`,
        ` * @param arg.path - Path parameters`,
        ` * @param arg.query - Query parameters`,
        !isQuery &&
          requestBodyType !== "void" &&
          ` * @param arg.body - Request body`,
        " */",
      ]
        .filter(Boolean)
        .join("\n");

      // Generate endpoint
      const endpoint = `
  ${operationName}: builder.${builderMethod}<${responseType}, {
    path?: Record<string, any>;
    query?: Record<string, any>;${!isQuery && requestBodyType !== "void" ? "\n    body?: " + requestBodyType + ";" : ""}
  }>({
    query: (arg) => {
      const url = fillPath('${path}', arg?.path);
      return {
        url,${!isQuery ? `\n        method: '${method.toUpperCase()}',` : ""}${!isQuery && requestBodyType !== "void" ? "\n        body: arg?.body," : ""}
        ...(arg?.query && Object.keys(arg.query).length > 0 ? { params: arg.query } : {}),
      };
    },
  }),`;

      endpoints.push(endpoint);

      // Generate hook
      const hookName = toHookName(operationName, isQuery);

      hooks.push(
        `export const ${hookName} = menteenoApi.use${operationName.charAt(0).toUpperCase()}${operationName.slice(1)}${isQuery ? "Query" : "Mutation"};`
      );
    }
  }

  // Collect all unique types used
  const usedTypes = new Set<string>();
  for (const [path, methods] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      if (typeof operation !== "object" || !operation) continue;
      const op = operation as OperationInfo;
      const requestBodyType = getRequestBodyType(op);
      if (requestBodyType !== "void" && requestBodyType !== "any") {
        usedTypes.add(requestBodyType);
      }
    }
  }

  // Generate the complete service file
  const serviceContent = `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { paths, components } from '../api/openapi.types';

// Helper function to fill path templates with parameters
function fillPath(template: string, params?: Record<string, any>): string {
  if (!params) return template;
  
  return template.replace(/\\{([^}]+)\\}/g, (match, paramName) => {
    const value = params[paramName];
    if (value === undefined || value === null) {
      throw new Error(\`Missing required path parameter: \${paramName}\`);
    }
    return String(value);
  });
}

// Base API configuration
export const menteenoApi = createApi({
  reducerPath: 'menteenoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '${baseUrl}',
    prepareHeaders: (headers) => {
      // Add authorization header if token exists
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('Authorization', \`Bearer \${token}\`);
        }
      }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({${endpoints.join("")}
  }),
});

// Export hooks
${hooks.join("\n")}

// Export the API for use in store configuration
export default menteenoApi;
`;

  // Ensure directory exists
  mkdirSync(dirname(SERVICE_FILE), { recursive: true });

  // Format with Prettier
  try {
    const prettierConfig = await prettier.resolveConfig(process.cwd());
    const formatted = await prettier.format(serviceContent, {
      ...prettierConfig,
      parser: "typescript",
    });

    writeFileSync(SERVICE_FILE, formatted);
    console.log(`✅ RTK Query service generated at ${SERVICE_FILE}`);
  } catch (error) {
    console.warn(
      "⚠️  Prettier formatting failed, writing unformatted file:",
      error
    );
    writeFileSync(SERVICE_FILE, serviceContent);
  }
}

/**
 * Main generation function
 */
async function main(): Promise<void> {
  console.log("🚀 Starting RTK Query API generation...\n");

  try {
    // Fetch OpenAPI spec
    const spec = await fetchOpenAPISpec();

    // Generate types
    await generateTypes(spec);

    // Generate RTK service
    await generateRTKService(spec);

    // Count endpoints
    const endpointCount = Object.values(spec.paths).reduce((count, methods) => {
      return count + Object.keys(methods).length;
    }, 0);

    console.log("\n📊 Generation Report:");
    console.log(`   • ${endpointCount} endpoints processed`);
    console.log(`   • Types file: ${TYPES_FILE}`);
    console.log(`   • Service file: ${SERVICE_FILE}`);
    console.log("\n✅ API generation completed successfully!");
  } catch (error) {
    console.error("\n❌ Generation failed:", error);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  main();
}
