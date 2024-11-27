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
    <label className="block text-gray-700 text-sm font-bold mb-2">
      Your Email Address
    </label>
    <input
      type="email"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      placeholder="Enter your email"
    />
    <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
      Send PDF
    </button>
  </form>
);
};

export default EmailForm;
