// src/components/InstitutionSearch.js
import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

const InstitutionSearch = ({ language, onSelect }) => {
const [searchTerm, setSearchTerm] = useState('');
const [institutions, setInstitutions] = useState([]);
const [results, setResults] = useState([]);

useEffect(() => {
  const loadInstitutions = async () => {
    const response = await fetch('/data/institutions.json');
    const data = await response.json();
    setInstitutions(data.institutions);
  };
  loadInstitutions();
}, []);

useEffect(() => {
  if (searchTerm === '') {
    setResults([]);
    return;
  }

  const fuse = new Fuse(institutions, {
    keys: [`name.${language}`],
    threshold: 0.3,
  });

  const searchResults = fuse.search(searchTerm);
  setResults(searchResults.map(result => result.item));
}, [searchTerm, institutions, language]);

return (
  <div className="mb-4">
    <label className="block text-dark-text text-sm font-bold mb-2">
      Search Institution
    </label>
    <input
      type="text"
      className="w-full py-2 px-3 bg-dark-secondary text-dark-text rounded border border-gray-700 focus:outline-none focus:border-dark-accent"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Type to search..."
    />
    {results.length > 0 && (
      <div className="mt-2 border border-gray-700 rounded-lg bg-dark-secondary">
        {results.map((institution) => (
          <div
            key={institution.id}
            className="p-2 hover:bg-dark-accent cursor-pointer transition-colors duration-200"
            onClick={() => onSelect(institution)}
          >
            {institution.name[language]}
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default InstitutionSearch;
