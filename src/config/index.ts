// src/config/index.ts

import { Institution, Language } from "@/types";

export const languages: Record<Language, string> = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
};

export const templates: Record<Language, string[]> = {
  en: [
    "Under the Right to Information Act, I request the following information:",
    "Please provide the details regarding my request.",
  ],
  si: [
    "තොරතුරු දැනගැනීමේ අයිතිවාසිකම් පනත යටතේ, මම පහත සඳහන් තොරතුරු ඉල්ලා සිටිමි:",
    "මගේ ඉල්ලීම සම්බන්ධයෙන් විස්තර ලබා දෙන්න.",
  ],
  ta: [
    "தகவல் அறியும் உரிமைச் சட்டத்தின் கீழ், நான் பின்வரும் தகவல்களை கோருகிறேன்:",
    "என் கோரிக்கையைப் பற்றிய விவரங்களை வழங்கவும்.",
  ],
};

export const documentText: Record<
  Language,
  {
    subject: string;
    to: string;
    pio: string;
    yours: string;
    finalGreeting: string;
  }
> = {
  en: {
    subject: "Subject: Request for Information under RTI Act, 2005",
    to: "To,",
    pio: "The Public Information Officer",
    yours: "Yours faithfully,",
    finalGreeting: "I would appreciate your prompt attention to this request.",
  },
  si: {
    subject: "විෂය: තොරතුරු දැනගැනීමේ පනත යටතේ තොරතුරු ඉල්ලීම",
    to: "වෙත,",
    pio: "මහජන තොරතුරු නිලධාරී",
    yours: "ඔබගේ විශ්වාසී,",
    finalGreeting:
      "මෙම ඉල්ලීමට ඔබගේ කඩිනම් අවධානය යොමු කරන ලෙස කාරුණිකව ඉල්ලා සිටිමි.",
  },
  ta: {
    subject: "பொருள்: தகவல் அறியும் உரிமைச் சட்டத்தின் கீழ் தகவல் கோரிக்கை",
    to: "பெறுநர்,",
    pio: "பொது தகவல் அலுவலர்",
    yours: "உண்மையுள்ள,",
    finalGreeting: "இந்த கோரிக்கைக்கு உங்கள் உடனடி கவனத்தை நான் பாராட்டுவேன்.",
  },
};

export const institutions: Institution[] = [
  {
    id: "1",
    name: {
      en: "Ministry of Health",
      si: "සෞඛ්‍ය අමාත්‍යාංශය",
      ta: "சுகாதார அமைச்சு",
    },
    address: {
      en: "385, Rev. Baddegama Wimalawansa Thero Mawatha, Colombo 10",
      si: "385, පූජ්‍ය බද්දේගම විමලවංශ හිමි මාවත, කොළඹ 10",
      ta: "385, வண. பத்தேகம விமலவன்ச தேரர் மாவத்தை, கொழும்பு 10",
    },
    email: "info@health.gov.lk",
    phone: "011-2694033",
    category: "government",
  },
  {
    id: "2",
    name: {
      en: "Ministry of Education",
      si: "අධ්‍යාපන අමාත්‍යාංශය",
      ta: "கல்வி அமைச்சு",
    },
    address: {
      en: "'Isurupaya', Pelawatta, Battaramulla",
      si: "'ඉසුරුපාය', පැලවත්ත, බත්තරමුල්ල",
      ta: "'இசுருபாய', பெலவத்த, பத்தரமுல்ல",
    },
    email: "info@moe.gov.lk",
    phone: "011-2785141",
    category: "government",
  },
];
