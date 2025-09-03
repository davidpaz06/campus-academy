export function formatText(
  setValue: (text: string) => void,
  value: string,
  formatType: string,
  selection?: { start: number; end: number }
) {
  if (!selection) return;

  const { start, end } = selection;
  const selectedText = value.substring(start, end);
  let formatted = value;
  switch (formatType) {
    case "h1":
      formatted =
        value.slice(0, start) + `# ${selectedText}` + value.slice(end);
      break;
    case "h2":
      formatted =
        value.slice(0, start) + `## ${selectedText}` + value.slice(end);
      break;
    case "h3":
      formatted =
        value.slice(0, start) + `### ${selectedText}` + value.slice(end);
      break;
    case "bold":
      formatted =
        value.slice(0, start) + `**${selectedText}**` + value.slice(end);
      break;
    case "italic":
      formatted =
        value.slice(0, start) + `*${selectedText}*` + value.slice(end);
      break;
    case "strikethrough":
      formatted =
        value.slice(0, start) + `~~${selectedText}~~` + value.slice(end);
      break;
    case "quote":
      formatted =
        value.slice(0, start) + `> ${selectedText}` + value.slice(end);
      break;
    case "ul":
      formatted =
        value.slice(0, start) + `- ${selectedText}` + value.slice(end);
      break;
    case "ol":
      formatted =
        value.slice(0, start) + `1. ${selectedText}` + value.slice(end);
      break;
    case "code":
      formatted =
        value.slice(0, start) +
        `\n\`\`\`\n${selectedText}\n\`\`\`\n` +
        value.slice(end);
      break;
    case "link":
      formatted =
        value.slice(0, start) + `[${selectedText}](url)` + value.slice(end);
      break;
    case "image":
      formatted =
        value.slice(0, start) + `![${selectedText}](url)` + value.slice(end);
      break;
    default:
      formatted = value;
      break;
  }
  setValue(formatted);
}
