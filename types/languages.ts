export type Language = "en" | "si" | "ta";

export const Languages: Record<Language, string> = {
    en: "English",
    si: "Sinhala",
    ta: "Tamil"
};

export type TrilingualContent<T> = {
    en: T;
    si: T;
    ta: T;
  };