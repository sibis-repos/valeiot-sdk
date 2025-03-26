/**
 * Converts a camelCase or PascalCase string to kebab-case.
 *
 * @param str - The input string in camelCase or PascalCase.
 * @returns The kebab-case formatted string.
 *
 * @example
 * kebabize("helloWorld") // "hello-world"
 * kebabize("MyAPIKey")   // "my-api-key"
 */
export const kebabize = (str: string) =>
  str.replace(
    /**
     * Regular expression breakdown:
     * - `[A-Z]+(?![a-z])`  → Matches consecutive uppercase letters not followed by lowercase (e.g., "API" in "myAPIKey").
     * - `|[A-Z]`           → Matches any other uppercase letter.
     * - `/g`               → Global flag to match all occurrences.
     */
    /[A-Z]+(?![a-z])|[A-Z]/g,

    /**
     * Replacement function:
     * - `$` is the matched uppercase letter(s).
     * - `ofs` is the offset (position of the match in the string).
     * - If `ofs > 0`, prepend a hyphen (`-`).
     * - Convert the matched part to lowercase.
     */
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
  );
