import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, unlinkSync } from "fs";
import { join } from "path";

const OUTPUT_DIR = join(process.cwd(), "src");
const TYPES_FILE = join(OUTPUT_DIR, "api", "openapi.types.ts");
const SERVICE_FILE = join(OUTPUT_DIR, "services", "menteenoApi.generated.ts");

describe("RTK API Generator", () => {
  beforeAll(() => {
    // Ensure output directories exist
    mkdirSync(join(OUTPUT_DIR, "api"), { recursive: true });
    mkdirSync(join(OUTPUT_DIR, "services"), { recursive: true });
  });

  afterAll(() => {
    // Clean up generated files after tests
    try {
      if (existsSync(TYPES_FILE)) unlinkSync(TYPES_FILE);
      if (existsSync(SERVICE_FILE)) unlinkSync(SERVICE_FILE);
    } catch (error) {
      console.warn("Failed to clean up test files:", error);
    }
  });

  it("should generate types and service files", async () => {
    // Run the generator
    execSync("pnpm run generate:api", {
      stdio: "inherit",
      cwd: process.cwd(),
    });

    // Check that types file was created
    expect(existsSync(TYPES_FILE)).toBe(true);

    // Check that service file was created
    expect(existsSync(SERVICE_FILE)).toBe(true);

    // Verify types file content
    const typesContent = readFileSync(TYPES_FILE, "utf-8");
    expect(typesContent).toContain("export interface");
    expect(typesContent).toContain("export type");

    // Verify service file content
    const serviceContent = readFileSync(SERVICE_FILE, "utf-8");
    expect(serviceContent).toContain("createApi");
    expect(serviceContent).toContain("fetchBaseQuery");
    expect(serviceContent).toContain("export const menteenoApi");
    expect(serviceContent).toContain("export const use");
  }, 30000); // 30 second timeout for API generation

  it("should generate valid TypeScript code", () => {
    // Check that the generated service file compiles
    try {
      execSync(
        "npx tsc --noEmit --skipLibCheck src/services/menteenoApi.generated.ts",
        {
          stdio: "pipe",
          cwd: process.cwd(),
        }
      );
    } catch (error) {
      // If TypeScript compilation fails, show the error
      console.error("TypeScript compilation failed:", error);
      throw error;
    }
  });
});
