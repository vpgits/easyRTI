// src/App.js
import React, { useState, useEffect } from 'react';
import LanguageSelector from './components/LanguageSelector';
import InstitutionSearch from './components/InstitutionSearch';
import RequestForm from './components/RequestForm';
import PDFGenerator from './components/PDFGenerator';
import EmailForm from './components/EmailForm';

function App() {
const [selectedLanguage, setSelectedLanguage] = useState('en');
const [selectedInstitution, setSelectedInstitution] = useState(null);
const [requestText, setRequestText] = useState('');
const [pdfUrl, setPdfUrl] = useState('');

useEffect(() => {
  // Add dark mode class to html element
  document.documentElement.classList.add('dark');
}, []);

const handleSubmit = async () => {
  // Logic to generate PDF and send email
};

return (
  <div className="min-h-screen bg-dark-primary text-dark-text">
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-dark-text">RTI Request Generator</h1>

      <div className="space-y-6">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        <InstitutionSearch
          language={selectedLanguage}
          onSelect={setSelectedInstitution}
        />

        <RequestForm
          language={selectedLanguage}
          onTextChange={setRequestText}
        />

        {requestText && selectedInstitution && (
          <PDFGenerator
            requestText={requestText}
            institution={selectedInstitution}
          />
        )}

        {pdfUrl && (
          <EmailForm pdfUrl={pdfUrl} />
        )}
      </div>
    </div>
  </div>
);
}

export default App;
