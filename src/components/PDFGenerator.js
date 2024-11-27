import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '../utils/pdfGenerator';

const PDFGenerator = ({ requestText, institution }) => {
return (
  <div className="mb-4">
    <h2 className="text-lg font-bold">Download Your Request</h2>
    <PDFDownloadLink
      document={<MyDocument requestText={requestText} institution={institution} />}
      fileName="RTI_Request.pdf"
    >
      {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
    </PDFDownloadLink>
  </div>
);
};

export default PDFGenerator;
