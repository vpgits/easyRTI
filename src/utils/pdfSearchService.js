// src/utils/pdfSearchService.js
import pdfjs from 'pdfjs-dist';
import Fuse from 'fuse.js';

// Set worker path for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export class PDFSearchService {
constructor() {
  this.pdfOrder = [
    '/assets/pdfs/ministries.pdf',
    '/assets/pdfs/2412-08_E.pdf',
    '/assets/pdfs/34-2023_E.pdf'
  ];
}

async searchInPDF(pdfPath, searchTerm) {
  try {
    const pdf = await pdfjs.getDocument(pdfPath).promise;
    const numPages = pdf.numPages;
    let fullText = '';

    // Extract text from all pages
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      fullText += textContent.items.map(item => item.str).join(' ');
    }

    // Use Fuse.js for fuzzy searching
    const fuse = new Fuse([fullText], {
      includeScore: true,
      threshold: 0.3,
      minMatchCharLength: 3
    });

    const results = fuse.search(searchTerm);
    return results.length > 0;
  } catch (error) {
    console.error('Error searching PDF:', error);
    return false;
  }
}

async searchAllPDFs(searchTerm) {
  for (const pdfPath of this.pdfOrder) {
    const found = await this.searchInPDF(pdfPath, searchTerm);
    if (found) {
      // Extract and return the institution details from the PDF
      return {
        name: {
          en: searchTerm,
          si: '', // You might want to add translations later
          ta: ''  // You might want to add translations later
        },
        address: {
          en: 'Found in PDF document',
          si: '',
          ta: ''
        },
        email: '',
        phone: '',
        category: 'government'
      };
    }
  }
  return null;
}
}
