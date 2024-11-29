"use client";

import { useState, useEffect } from "react";
import { Institution, Language } from "@/types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { institutions } from "@/config";

interface InstitutionSearchProps {
  language: Language;
  onSelect: (institution: Institution) => void;
  required?: boolean;
}

export default function InstitutionSearch({
  language,
  onSelect,
  required = false,
}: InstitutionSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Institution[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchInstitutions = () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      setIsSearching(true);

      try {
        // Search in the institutions array
        const searchResults = institutions.filter((inst) => {
          const nameInLanguage = inst.name[language].toLowerCase();
          const searchTermLower = searchTerm.toLowerCase();
          return nameInLanguage.includes(searchTermLower);
        });

        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce the search
    const timeoutId = setTimeout(searchInstitutions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, language]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (institution: Institution) => {
    onSelect(institution);
    setSearchTerm(institution.name[language]); // Update input with selected institution
    setResults([]); // Clear results after selection
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="institution-search">
          Search Institution{" "}
          {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          id="institution-search"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Type to search..."
          className="w-full"
          required={required}
        />
      </div>

      {isSearching && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching...
        </div>
      )}

      {results.length > 0 && !isSearching && (
        <Card className="divide-y max-h-[300px] overflow-y-auto">
          {results.map((institution) => (
            <button
              key={institution.id}
              className="w-full px-4 py-2 text-left hover:bg-accent/50 transition-colors"
              onClick={() => handleSelect(institution)}
              type="button"
            >
              <div className="font-medium">{institution.name[language]}</div>
              <div className="text-sm text-muted-foreground">
                {institution.address[language]}
              </div>
            </button>
          ))}
        </Card>
      )}

      {searchTerm && results.length === 0 && !isSearching && (
        <div className="text-sm text-muted-foreground">No results found</div>
      )}
    </div>
  );
}
