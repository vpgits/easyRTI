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
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Search Institution
      </label>
      <input
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to search..."
      />
      {results.length > 0 && (
        <div className="mt-2 border rounded-lg shadow-lg">
          {results.map((institution) => (
            <div
              key={institution.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
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
