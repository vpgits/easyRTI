import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
page: {
  flexDirection: 'column',
  padding: 30,
},
section: {
  marginBottom: 10,
},
});

const MyDocument = ({ requestText, institution }) => (
<Document>
  <Page size="A4" style={styles.page}>
    <View style={styles.section}>
      <Text>Right to Information Request</Text>
      <Text>Institution: {institution.name.en}</Text>
      <Text>Address: {institution.address.en}</Text>
    </View>
    <View style={styles.section}>
      <Text>{requestText}</Text>
    </View>
  </Page>
</Document>
);

export default MyDocument;
