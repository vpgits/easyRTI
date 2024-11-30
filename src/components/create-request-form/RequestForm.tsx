import React, { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Institution, Language, PersonalInfo } from "@/types";
import { languages, templates } from "@/config";
import InstitutionSearch from "../institiution-search/InstitutionSearch";
import { saveAs } from "file-saver";

const initialPersonalInfo: PersonalInfo = {
  name: "",
  address: "",
  city: "",
  postalCode: "",
  phone: "",
  email: "",
  idNumber: "",
};

export default function CreateRequestForm() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [customText, setCustomText] = useState<string>("");
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);
  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfo>(initialPersonalInfo);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<{
    requestText?: string;
    institution?: string;
    personalInfo?: Partial<Record<keyof PersonalInfo, string>>;
  }>({});

  const handleLanguageChange = (value: Language) => {
    setSelectedLanguage(value);
    setSelectedTemplate("");
    setCustomText("");
  };

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    setCustomText(value);
  };

  const handleCustomTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCustomText(e.target.value);
    if (errors.requestText) {
      setErrors((prev) => ({ ...prev, requestText: undefined }));
    }
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    if (errors.personalInfo?.[name as keyof PersonalInfo]) {
      setErrors((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [name]: undefined,
        },
      }));
    }
  };

  const handleInstitutionSelect = (institution: Institution) => {
    setSelectedInstitution(institution);
    setErrors((prev) => ({ ...prev, institution: undefined }));
  };

  const validateForm = () => {
    const newErrors: {
      requestText?: string;
      institution?: string;
      personalInfo?: Partial<Record<keyof PersonalInfo, string>>;
    } = {};

    // Validate request text
    if (customText.trim().length < 50) {
      newErrors.requestText = "Request must be at least 50 characters long.";
    }

    // Validate institution
    if (!selectedInstitution) {
      newErrors.institution = "Please select an institution.";
    }

    // Validate personal information
    const personalInfoErrors: Partial<Record<keyof PersonalInfo, string>> = {};
    if (!personalInfo.name.trim()) {
      personalInfoErrors.name = "Name is required";
    }
    if (!personalInfo.address.trim()) {
      personalInfoErrors.address = "Address is required";
    }
    if (!personalInfo.city.trim()) {
      personalInfoErrors.city = "City is required";
    }
    if (!personalInfo.postalCode.trim()) {
      personalInfoErrors.postalCode = "Postal code is required";
    }
    if (!personalInfo.phone.trim()) {
      personalInfoErrors.phone = "Phone number is required";
    }
    if (!personalInfo.email.trim()) {
      personalInfoErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      personalInfoErrors.email = "Invalid email format";
    }
    if (!personalInfo.idNumber.trim()) {
      personalInfoErrors.idNumber = "ID number is required";
    }

    if (Object.keys(personalInfoErrors).length > 0) {
      newErrors.personalInfo = personalInfoErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePDFAction = async () => {
    if (!selectedInstitution) return;

    try {
      setIsGenerating(true);

      const { pdf } = await import("@react-pdf/renderer");
      const { default: RTIRequestDocument } = await import(
        "../rti-document/RTIDocument"
      );

      const pdfDoc = (
        <RTIRequestDocument
          requestText={customText}
          institution={selectedInstitution}
          language={selectedLanguage}
          personalInfo={personalInfo}
        />
      );

      const blob = await pdf(pdfDoc).toBlob();
      saveAs(blob, "rti-request.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw new Error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await generatePDFAction();
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Language Selection */}
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={selectedLanguage}
                onValueChange={handleLanguageChange}
                name="language"
              >
                <SelectTrigger id="language" className="w-full">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languages).map(([key, value]) => (
                    <SelectItem key={key} value={key as Language}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                    placeholder="Enter your full name"
                  />
                  {errors.personalInfo?.name && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.personalInfo.name}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* ID Number */}
                <div className="space-y-2">
                  <Label htmlFor="idNumber">
                    National ID / Passport Number
                  </Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    value={personalInfo.idNumber}
                    onChange={handlePersonalInfoChange}
                    placeholder="Enter your ID number"
                  />
                  {errors.personalInfo?.idNumber && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.personalInfo.idNumber}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={personalInfo.address}
                    onChange={handlePersonalInfoChange}
                    placeholder="Enter your street address"
                  />
                  {errors.personalInfo?.address && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.personalInfo.address}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={personalInfo.city}
                    onChange={handlePersonalInfoChange}
                    placeholder="Enter your city"
                  />
                  {errors.personalInfo?.city && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.personalInfo.city}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Postal Code */}
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={personalInfo.postalCode}
                    onChange={handlePersonalInfoChange}
                    placeholder="Enter your postal code"
                  />
                  {errors.personalInfo?.postalCode && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.personalInfo.postalCode}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    placeholder="Enter your phone number"
                  />
                  {errors.personalInfo?.phone && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.personalInfo.phone}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    placeholder="Enter your email address"
                  />
                  {errors.personalInfo?.email && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.personalInfo.email}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>

            {/* Institution Selection */}
            <div className="space-y-2">
              <InstitutionSearch
                language={selectedLanguage}
                onSelect={handleInstitutionSelect}
                required
              />
              {errors.institution && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.institution}</AlertDescription>
                </Alert>
              )}
              {selectedInstitution && (
                <div className="p-3 bg-muted rounded-md">
                  <p className="font-medium">Selected Institution:</p>
                  <p>{selectedInstitution.name[selectedLanguage]}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedInstitution.address[selectedLanguage]}
                  </p>
                </div>
              )}
            </div>

            {/* Template Selection */}
            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <Select
                value={selectedTemplate}
                onValueChange={handleTemplateChange}
                name="template"
              >
                <SelectTrigger id="template" className="w-full">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates[selectedLanguage].map((template, index) => (
                    <SelectItem key={index} value={template}>
                      {template}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Request Text */}
            <div className="space-y-2">
              <Label htmlFor="request" className="flex justify-between">
                <span>Your Right to Information Request</span>
                <span className="text-sm text-muted-foreground">
                  {customText.length}/50 characters minimum
                </span>
              </Label>
              <Textarea
                id="request"
                name="request"
                value={customText}
                onChange={handleCustomTextChange}
                placeholder="Type your request here..."
                className="min-h-32 resize-y"
              />
              {errors.requestText && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.requestText}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" disabled={isGenerating}>
        {isGenerating ? "Generating PDF..." : "Generate and Download PDF"}
      </Button>
    </form>
  );
}
