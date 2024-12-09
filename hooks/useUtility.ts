export const truncatedString = (
  data: string,
  minLength: number,
  maxLength: number
): string => {
  return data.length > maxLength
    ? data.substring(minLength, maxLength) + "..."
    : data;
};

export const truncateDecimal = (value: string): number => {
  return Math.floor(Number(value));
};
