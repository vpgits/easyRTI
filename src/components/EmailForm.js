// src/components/EmailForm.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const EmailForm = ({ pdfUrl }) => {
const [email, setEmail] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  const templateParams = {
    to_email: email,
    message: 'Here is your RTI request PDF.',
    pdf_url: pdfUrl,
  };

  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
};

return (
  <form onSubmit={handleSubmit} className="mb-4">
    <label className="block text-dark-text text-sm font-bold mb-2">
      Your Email Address
    </label>
    <input
      type="email"
      className="w-full py-2 px-3 mb-2 bg-dark-secondary text-dark-text rounded border border-gray-700 focus:outline-none focus:border-dark-accent"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      placeholder="Enter your email"
    />
    <button 
      type="submit" 
      className="bg-dark-accent text-dark-text py-2 px-4 rounded hover:bg-opacity-90 transition-colors duration-200"
    >
      Send PDF
    </button>
  </form>
);
};

export default EmailForm;
