import emailjs from 'emailjs-com';

export const sendEmail = (email, pdfUrl) => {
const templateParams = {
  to_email: email,
  message: 'Here is your RTI request PDF.',
  pdf_url: pdfUrl,
};

return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID');
};
