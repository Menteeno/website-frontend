/**
 * SEO Validation Utilities
 * Comprehensive validation for SEO elements
 */

export interface SEOValidationResult {
  isValid: boolean;
  score: number;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface PageSEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  url?: string;
  locale?: string;
  images?: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  headings?: Array<{
    level: number;
    text: string;
  }>;
  wordCount?: number;
  readingTime?: number;
  structuredData?: any;
}

/**
 * Validate page title
 */
export function validateTitle(title?: string): {
  isValid: boolean;
  errors: string[];
  suggestions: string[];
} {
  const errors: string[] = [];
  const suggestions: string[] = [];

  if (!title) {
    errors.push("Title is missing");
    return { isValid: false, errors, suggestions };
  }

  if (title.length < 30) {
    errors.push("Title is too short (less than 30 characters)");
  }

  if (title.length > 60) {
    errors.push("Title is too long (more than 60 characters)");
  }

  if (title.length >= 30 && title.length <= 60) {
    suggestions.push("Title length is optimal");
  }

  // Check for keyword stuffing
  const words = title.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  if (words.length / uniqueWords.size > 0.7) {
    suggestions.push("Consider reducing keyword repetition in title");
  }

  return { isValid: errors.length === 0, errors, suggestions };
}

/**
 * Validate meta description
 */
export function validateDescription(description?: string): {
  isValid: boolean;
  errors: string[];
  suggestions: string[];
} {
  const errors: string[] = [];
  const suggestions: string[] = [];

  if (!description) {
    errors.push("Meta description is missing");
    return { isValid: false, errors, suggestions };
  }

  if (description.length < 120) {
    errors.push("Meta description is too short (less than 120 characters)");
  }

  if (description.length > 160) {
    errors.push("Meta description is too long (more than 160 characters)");
  }

  if (description.length >= 120 && description.length <= 160) {
    suggestions.push("Meta description length is optimal");
  }

  // Check for call-to-action
  const ctaWords = [
    "learn",
    "discover",
    "explore",
    "find",
    "get",
    "start",
    "try",
  ];
  const hasCTA = ctaWords.some((word) =>
    description.toLowerCase().includes(word)
  );
  if (!hasCTA) {
    suggestions.push("Consider adding a call-to-action to the description");
  }

  return { isValid: errors.length === 0, errors, suggestions };
}

/**
 * Validate keywords
 */
export function validateKeywords(keywords?: string[]): {
  isValid: boolean;
  errors: string[];
  suggestions: string[];
} {
  const errors: string[] = [];
  const suggestions: string[] = [];

  if (!keywords || keywords.length === 0) {
    errors.push("Keywords are missing");
    return { isValid: false, errors, suggestions };
  }

  if (keywords.length > 10) {
    errors.push("Too many keywords (more than 10)");
  }

  if (keywords.length >= 3 && keywords.length <= 10) {
    suggestions.push("Keyword count is optimal");
  }

  // Check for keyword length
  const longKeywords = keywords.filter((keyword) => keyword.length > 20);
  if (longKeywords.length > 0) {
    suggestions.push("Consider shortening long keywords");
  }

  return { isValid: errors.length === 0, errors, suggestions };
}

/**
 * Validate images
 */
export function validateImages(
  images?: Array<{ src: string; alt: string; width?: number; height?: number }>
): { isValid: boolean; errors: string[]; suggestions: string[] } {
  const errors: string[] = [];
  const suggestions: string[] = [];

  if (!images || images.length === 0) {
    suggestions.push("Consider adding images to improve engagement");
    return { isValid: true, errors, suggestions };
  }

  images.forEach((image, index) => {
    if (!image.alt || image.alt.trim() === "") {
      errors.push(`Image ${index + 1} is missing alt text`);
    } else if (image.alt.length < 5) {
      suggestions.push(`Image ${index + 1} alt text could be more descriptive`);
    }

    if (!image.width || !image.height) {
      suggestions.push(
        `Image ${index + 1} should specify width and height for better performance`
      );
    }

    // Check for generic alt text
    const genericAlts = ["image", "photo", "picture", "تصویر", "عکس"];
    if (genericAlts.includes(image.alt.toLowerCase())) {
      suggestions.push(`Image ${index + 1} alt text is too generic`);
    }
  });

  return { isValid: errors.length === 0, errors, suggestions };
}

/**
 * Validate headings structure
 */
export function validateHeadings(
  headings?: Array<{ level: number; text: string }>
): { isValid: boolean; errors: string[]; suggestions: string[] } {
  const errors: string[] = [];
  const suggestions: string[] = [];

  if (!headings || headings.length === 0) {
    suggestions.push("Consider adding headings to structure your content");
    return { isValid: true, errors, suggestions };
  }

  // Check for H1
  const h1Count = headings.filter((h) => h.level === 1).length;
  if (h1Count === 0) {
    errors.push("Page is missing H1 heading");
  } else if (h1Count > 1) {
    errors.push("Page has multiple H1 headings");
  }

  // Check heading hierarchy
  let previousLevel = 0;
  headings.forEach((heading, index) => {
    if (heading.level > previousLevel + 1) {
      errors.push(
        `Heading hierarchy skipped at position ${index + 1} (H${previousLevel} to H${heading.level})`
      );
    }
    previousLevel = heading.level;
  });

  // Check for empty headings
  const emptyHeadings = headings.filter((h) => !h.text.trim());
  if (emptyHeadings.length > 0) {
    errors.push("Some headings are empty");
  }

  return { isValid: errors.length === 0, errors, suggestions };
}

/**
 * Validate URL structure
 */
export function validateURL(
  url?: string,
  locale?: string
): { isValid: boolean; errors: string[]; suggestions: string[] } {
  const errors: string[] = [];
  const suggestions: string[] = [];

  if (!url) {
    errors.push("URL is missing");
    return { isValid: false, errors, suggestions };
  }

  // Check for HTTPS
  if (!url.startsWith("https://")) {
    errors.push("URL should use HTTPS");
  }

  // Check for trailing slash consistency
  if (url.endsWith("/") && url !== "https://menteeno.app/") {
    suggestions.push("Consider removing trailing slash for consistency");
  }

  // Check for locale in URL
  if (locale && !url.includes(`/${locale}/`)) {
    suggestions.push("URL should include locale for multilingual SEO");
  }

  // Check URL length
  if (url.length > 100) {
    suggestions.push("URL is quite long, consider shortening");
  }

  return { isValid: errors.length === 0, errors, suggestions };
}

/**
 * Validate Persian-specific SEO elements
 */
export function validatePersianSEO(data: PageSEOData): {
  isValid: boolean;
  errors: string[];
  suggestions: string[];
} {
  const errors: string[] = [];
  const suggestions: string[] = [];

  if (data.locale !== "fa") {
    return { isValid: true, errors, suggestions };
  }

  // Check for Persian characters in title
  if (data.title && !/[آ-ی]/.test(data.title)) {
    suggestions.push(
      "Title should contain Persian characters for Persian content"
    );
  }

  // Check for Persian characters in description
  if (data.description && !/[آ-ی]/.test(data.description)) {
    suggestions.push(
      "Description should contain Persian characters for Persian content"
    );
  }

  // Check for RTL direction
  suggestions.push("Ensure page has dir='rtl' attribute for Persian content");

  return { isValid: errors.length === 0, errors, suggestions };
}

/**
 * Comprehensive SEO validation
 */
export function validateSEO(data: PageSEOData): SEOValidationResult {
  const titleValidation = validateTitle(data.title);
  const descriptionValidation = validateDescription(data.description);
  const keywordsValidation = validateKeywords(data.keywords);
  const imagesValidation = validateImages(data.images);
  const headingsValidation = validateHeadings(data.headings);
  const urlValidation = validateURL(data.url, data.locale);
  const persianValidation = validatePersianSEO(data);

  const allErrors = [
    ...titleValidation.errors,
    ...descriptionValidation.errors,
    ...keywordsValidation.errors,
    ...imagesValidation.errors,
    ...headingsValidation.errors,
    ...urlValidation.errors,
    ...persianValidation.errors,
  ];

  const allWarnings: string[] = [];
  const allSuggestions = [
    ...titleValidation.suggestions,
    ...descriptionValidation.suggestions,
    ...keywordsValidation.suggestions,
    ...imagesValidation.suggestions,
    ...headingsValidation.suggestions,
    ...urlValidation.suggestions,
    ...persianValidation.suggestions,
  ];

  // Calculate score (0-100)
  const totalChecks = 7; // Number of validation categories
  const passedChecks = totalChecks - allErrors.length;
  const score = Math.round((passedChecks / totalChecks) * 100);

  return {
    isValid: allErrors.length === 0,
    score,
    errors: allErrors,
    warnings: allWarnings,
    suggestions: allSuggestions,
  };
}

/**
 * Generate SEO report
 */
export function generateSEOReport(data: PageSEOData): string {
  const validation = validateSEO(data);

  let report = `# SEO Validation Report\n\n`;
  report += `**Overall Score: ${validation.score}/100**\n\n`;

  if (validation.isValid) {
    report += `✅ **Status: PASSED**\n\n`;
  } else {
    report += `❌ **Status: FAILED**\n\n`;
  }

  if (validation.errors.length > 0) {
    report += `## 🚨 Critical Issues\n\n`;
    validation.errors.forEach((error, index) => {
      report += `${index + 1}. ${error}\n`;
    });
    report += `\n`;
  }

  if (validation.suggestions.length > 0) {
    report += `## 💡 Suggestions\n\n`;
    validation.suggestions.forEach((suggestion, index) => {
      report += `${index + 1}. ${suggestion}\n`;
    });
    report += `\n`;
  }

  report += `## 📊 Summary\n\n`;
  report += `- **Errors:** ${validation.errors.length}\n`;
  report += `- **Suggestions:** ${validation.suggestions.length}\n`;
  report += `- **Score:** ${validation.score}/100\n`;

  return report;
}
