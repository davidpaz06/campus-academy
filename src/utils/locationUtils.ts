export const formatPhoneNumber = (phone: string): string => {
  // Remover caracteres no numéricos
  const cleaned = phone.replace(/\D/g, "");

  // Formatear según longitud
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  return phone;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function validateURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const formatSocialMediaHandle = (handle: string, platform: string): string => {
  if (!handle) return "";

  // Remover @ si existe
  const cleaned = handle.replace("@", "");

  // Agregar URL base según plataforma
  const baseUrls = {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    twitter: "https://twitter.com/",
  };

  return baseUrls[platform as keyof typeof baseUrls]
    ? `${baseUrls[platform as keyof typeof baseUrls]}${cleaned}`
    : cleaned;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
};
