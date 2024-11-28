import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Institution, Language, PersonalInfo } from "@/types";
import { documentText } from "@/config";

// Instead of loading Open Sans, we'll use one of the standard PDF fonts
// Options are: 'Helvetica', 'Times-Roman', 'Courier'
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    marginBottom: 20,
  },
  date: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },
  institutionBlock: {
    marginBottom: 20,
  },
  institutionText: {
    marginBottom: 5,
  },
  content: {
    marginTop: 20,
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
  },
  senderInfo: {
    marginTop: 20,
    marginBottom: 20,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  finalGreeting: {
    marginTop: 20,
    marginBottom: 20,
    fontStyle: "italic",
  },
});

interface RTIDocumentProps {
  requestText: string;
  institution: Institution;
  language: Language;
  personalInfo: PersonalInfo;
}

const RTIRequestDocument = ({
  requestText,
  institution,
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Date */}
        <View style={styles.header}>
          <Text style={styles.date}>{currentDate}</Text>
          <Text style={styles.title}>{texts.subject}</Text>
        </View>

        {/* Institution Details */}
        <View style={styles.institutionBlock}>
          <Text style={styles.institutionText}>{texts.to}</Text>
          <Text style={styles.institutionText}>{texts.pio}</Text>
          <Text style={styles.institutionText}>
            {institution.name[language]}
          </Text>
          <Text style={styles.institutionText}>
            {institution.address[language]}
          </Text>
        </View>

        {/* Request Content */}
        <View style={styles.content}>
          <Text>{requestText}</Text>
          <Text style={styles.finalGreeting}>{texts.finalGreeting}</Text>
        </View>

        {/* Footer with Personal Information */}
        <View style={styles.footer}>
          <Text style={{ marginBottom: 10 }}>{texts.yours}</Text>
          <Text style={{ marginBottom: 5, fontFamily: "Helvetica-Bold" }}>
            {personalInfo.name}
          </Text>
          <Text style={{ marginBottom: 3 }}>{personalInfo.address}</Text>
          <Text style={{ marginBottom: 3 }}>
            {personalInfo.city}, {personalInfo.postalCode}
          </Text>
          <Text style={{ marginBottom: 3 }}>Phone: {personalInfo.phone}</Text>
          <Text style={{ marginBottom: 3 }}>Email: {personalInfo.email}</Text>
          <Text>ID Number: {personalInfo.idNumber}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default RTIRequestDocument;
