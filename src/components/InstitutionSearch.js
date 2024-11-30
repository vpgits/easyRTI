// src/components/InstitutionSearch.js
import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

const InstitutionSearch = ({ language, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadInstitutions = async () => {
      const response = await fetch('/data/institutions.json');
      const data = await response.json();
      setInstitutions(data.institutions);
    };
    loadInstitutions();
  }, []);

  useEffect(() => {
    const searchInstitutions = () => {
      if (searchTerm === '') {
        setResults([]);
        return;
      }

      setIsSearching(true);

      // Search in the JSON data
      const fuse = new Fuse(institutions, {
        keys: [`name.${language}`],
        threshold: 0.3,
      });

      const jsonResults = fuse.search(searchTerm);
      setResults(jsonResults.map(result => result.item));
      setIsSearching(false);
    };

    const debounceTimeout = setTimeout(searchInstitutions, 300);
    return () => clearTimeout(debounceTimeout);
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
      {isSearching && (
        <div className="mt-2 text-gray-600">
          Searching...
        </div>
      )}
      {results.length > 0 && !isSearching && (
        <div className="mt-2 border rounded-lg shadow-lg">
          {results.map((institution, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(institution)}
            >
              {institution.name[language]}
            </div>
          ))}
        </div>
      )}
      {searchTerm && results.length === 0 && !isSearching && (
        <div className="mt-2 text-gray-600">
          No results found
        </div>
      )}
    </div>
  );
};

export default InstitutionSearch;
