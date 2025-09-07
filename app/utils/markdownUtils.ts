// Funciones de texto simplificadas - sin procesamiento de markdown

export const getWordCount = (text: string): number => {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
};

export const getReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const wordCount = getWordCount(text);
  return Math.ceil(wordCount / wordsPerMinute);
};

export const formatText = (text: string): string => {
  return text;
};

export const processMarkdown = (text: string): string => {
  // Función simplificada que retorna el texto tal como está
  return text;
};
