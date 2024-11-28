export type Language = "en" | "si" | "ta";

export interface Institution {
  id: string;
  name: Record<Language, string>;
  address: Record<Language, string>;
  email: string;
  phone: string;
  category: string;
}

export interface PersonalInfo {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  idNumber: string; // National ID or Passport number
}

export interface RequestFormData {
  personalInfo: PersonalInfo;
  institution: Institution | null;
  requestText: string;
  language: Language;
}
