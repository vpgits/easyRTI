// src/components/RequestForm.js
import React from 'react';

const RequestForm = ({ language, onTextChange }) => {
const templates = {
  en: [
    "Under the Right to Information Act, I request the following information:",
    "Please provide the details regarding my request."
  ],
  si: [
    "තොරතුරු දැනගැනීමේ අයිතිවාසිකම් පනත යටතේ, මම පහත සඳහන් තොරතුරු ඉල්ලා සිටිමි:",
    "මගේ ඉල්ලීම සම්බන්ධයෙන් විස්තර ලබා දෙන්න."
  ],
  ta: [
    "தகவல் அறியும் உரிமைச் சட்டத்தின் கீழ், நான் பின்வரும் தகவல்களை கோருகிறேன்:",
    "என் கோரிக்கையைப் பற்றிய விவரங்களை வழங்கவும்."
  ]
};

return (
  <div className="mb-4">
    <label className="block text-dark-text text-sm font-bold mb-2">
      Your Right to Information Request
    </label>
    <select
      className="w-full py-2 px-3 mb-2 bg-dark-secondary text-dark-text rounded border border-gray-700 focus:outline-none focus:border-dark-accent"
      onChange={(e) => onTextChange(e.target.value)}
    >
      <option value="">Select a template</option>
      {templates[language].map((template, index) => (
        <option key={index} value={template}>
          {template}
        </option>
      ))}
    </select>
    <textarea
      className="w-full py-2 px-3 bg-dark-secondary text-dark-text rounded border border-gray-700 focus:outline-none focus:border-dark-accent"
      rows="4"
      placeholder="Or type your own request..."
      onChange={(e) => onTextChange(e.target.value)}
    />
  </div>
);
};

export default RequestForm;
