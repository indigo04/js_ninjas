export const validateImage = (image: string) => {
  const validImage =
    typeof image === "string" &&
    (image.startsWith("/") ||
      image.startsWith("http://") ||
      image.startsWith("https://"));

  const validSrc = validImage ? image : "/fallback.webp";
  return validSrc;
};
