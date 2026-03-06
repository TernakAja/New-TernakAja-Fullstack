/**
 * Converts a string to Title Case.
 * Example: "dairy cow" → "Dairy Cow"
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
