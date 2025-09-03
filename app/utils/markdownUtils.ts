// Limpia el markdown y cuenta palabras reales
export function getWordCount(md: string): number {
  if (!md) return 0;
  // Elimina sintaxis markdown básica
  let clean = md
    .replace(/(```[\s\S]*?```)/g, " ") // code blocks
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ") // links
    .replace(/[#>*_~`\-]/g, " ") // markdown symbols
    .replace(/\d+\./g, " ") // ordered lists
    .replace(/\s+/g, " ") // extra spaces
    .trim();
  return clean ? clean.split(" ").filter(Boolean).length : 0;
}
