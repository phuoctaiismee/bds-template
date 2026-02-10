const DROP_WORDS = ['-', 'undefined', 'null', '/'];

export const normalizeText = (text?: string) => {
  if (!text) return '';
  for (const word of DROP_WORDS) {
    text = text?.replace(new RegExp(`${word}`, 'g'), '');
  }
  return text.trim();
};
