// Contador de elementos de texto simplificado

export const countTextElements = (text: string) => {
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  return {
    paragraphs: lines.length,
    words: text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length,
    characters: text.length,
    lines: lines.length,
  };
};

export const getTextStatistics = (content: string) => {
  const stats = countTextElements(content);

  return {
    ...stats,
    readingTime: Math.ceil(stats.words / 200),
    isEmpty: content.trim().length === 0,
  };
};

export const countMarkdownElements = (content: string) => {
  // Función simplificada que cuenta elementos básicos
  return countTextElements(content);
};
