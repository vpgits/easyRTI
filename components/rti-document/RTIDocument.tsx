"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { documentText } from "@/config";
import { Language } from "@/types/languages";
import { PersonalInfo } from "@/types/personalInfo";
import { Authority } from "@/types/authority";
import { TrilingualContent } from "@/types/languages";
import { JSX } from "react";

try {
  Font.register({
    family: "NotoSans",
    fonts: [
      {
        src: "/fonts/NotoSans-Regular.ttf",
        fontWeight: 400,
      },
      {
        src: "/fonts/NotoSans-Bold.ttf",
        fontWeight: 700,
      },
    ],
  });

  Font.register({
    family: "NotoSansSinhala",
    fonts: [
      {
        src: "/fonts/NotoSansSinhala-Regular.ttf",
        fontWeight: 400,
      },
      {
        src: "/fonts/NotoSansSinhala-Bold.ttf",
        fontWeight: 700,
      },
    ],
  });

  Font.register({
    family: "NotoSansTamil",
    fonts: [
      {
        src: "/fonts/NotoSansTamil-Regular.ttf",
        fontWeight: 400,
      },
      {
        src: "/fonts/NotoSansTamil-Bold.ttf",
        fontWeight: 700,
      },
    ],
  });
} catch (error) {
  console.error("Error registering fonts:", error);
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSans",
    fontWeight: 400, // Explicitly set default font weight
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  // ... rest of the styles remain the same ...
  bold: {
    fontWeight: 700,
    fontFamily: "NotoSans", // Explicitly set font family for bold text
  },
  textSi: {
    fontFamily: "NotoSansSinhala",
    fontWeight: 400,
  },
  textSiBold: {
    fontFamily: "NotoSansSinhala",
    fontWeight: 700,
  },
  textTa: {
    fontFamily: "NotoSansTamil",
    fontWeight: 400,
  },
  textTaBold: {
    fontFamily: "NotoSansTamil",
    fontWeight: 700,
  },
  textEn: {
    fontFamily: "NotoSans",
    fontWeight: 400,
  },
  textEnBold: {
    fontFamily: "NotoSans",
    fontWeight: 700,
  },
});

interface RTIDocumentProps {
  requestText: string;
  authority: Authority;
  language: Language;
  personalInfo: PersonalInfo;
}

const RTIRequestDocument = ({
  requestText,
  authority,
  language,
  personalInfo,
}: RTIDocumentProps) => {
  const currentDate = new Date().toLocaleDateString(
    language === "en" ? "en-US" : language === "si" ? "si-LK" : "ta-LK",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const texts = documentText[language];

  // Helper function to get content in current language with appropriate text style
  const getContent = (
    content: TrilingualContent<string> | null
  ): JSX.Element => {
    if (!content) return <Text>&quot;&quot;</Text>;
    const text = content[language] || "";
    const textStyle =
      language === "si"
        ? styles.textSi
        : language === "ta"
        ? styles.textTa
        : styles.textEn;
    return <Text style={textStyle}>{text}</Text>;
  };

  // Helper function to render text with language-specific styling
  const LanguageText = ({
    children,
    style = {},
  }: {
    children: string | React.ReactNode;
    style?: object;
  }) => {
    const textStyle =
      language === "si"
        ? styles.textSi
        : language === "ta"
        ? styles.textTa
        : styles.textEn;
    return <Text style={{ ...textStyle, ...style }}>{children}</Text>;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Date */}
        <View>
          <LanguageText>{currentDate}</LanguageText>
          <LanguageText>{texts.subject}</LanguageText>
        </View>

        {/* Institution Details */}
        <View>
          <LanguageText>{texts.to}</LanguageText>
          <LanguageText>{texts.pio}</LanguageText>
          {getContent(authority.name)}
          {getContent(authority.address)}
        </View>

        {/* Request Content */}
        <View>
          <LanguageText>{requestText}</LanguageText>
          <LanguageText>{texts.finalGreeting}</LanguageText>
        </View>

        {/* Footer with Personal Information */}
        <View>
          <LanguageText style={{ marginBottom: 10 }}>
            {texts.yours}
          </LanguageText>
          <LanguageText style={{ ...styles.bold, marginBottom: 5 }}>
            {personalInfo.name}
          </LanguageText>
          <LanguageText style={{ marginBottom: 3 }}>
            {personalInfo.address}
          </LanguageText>
          <LanguageText style={{ marginBottom: 3 }}>
            {personalInfo.city}, {personalInfo.postalCode}
          </LanguageText>
          <LanguageText style={{ marginBottom: 3 }}>
            Phone: {personalInfo.phone}
          </LanguageText>
          <LanguageText style={{ marginBottom: 3 }}>
            Email: {personalInfo.email}
          </LanguageText>
          <LanguageText>ID Number: {personalInfo.idNumber}</LanguageText>
        </View>
      </Page>
    </Document>
  );
};

export default RTIRequestDocument;
