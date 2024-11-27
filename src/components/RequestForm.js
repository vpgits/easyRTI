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
    <label className="block text-gray-700 text-sm font-bold mb-2">
      Your Right to Information Request
    </label>
    <select
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
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
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      rows="4"
      placeholder="Or type your own request..."
      onChange={(e) => onTextChange(e.target.value)}
    />
  </div>
);
};

export default RequestForm;
