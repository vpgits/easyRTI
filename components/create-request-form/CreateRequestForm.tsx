"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { saveAs } from "file-saver";
import { Language, Languages, TrilingualContent } from "@/types/languages";
import { Database } from "@/types/database.types";
import { Authority } from "@/types/authority";
import { PersonalInfo } from "@/types/personalInfo";
import { Templates } from "@/types/templates";

interface CreateRequestFormProps {
  authorities: Authority[];
  languages: Record<Language, string>;
  templates: Templates[];
}

const initialPersonalInfo: PersonalInfo = {
  name: "",
  idNumber: "",
  address: "",
  city: "",
  postalCode: "",
  phone: "",
  email: "",
};

export default function CreateRequestForm({
  authorities,
  languages,
  templates,
}: CreateRequestFormProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [customText, setCustomText] = useState<string>("");
  const [selectedAuthority, setSelectedAuthority] = useState<Authority | null>(
    null
  );
  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfo>(initialPersonalInfo);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<{
    requestText?: string;
    authority?: string;
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

  const handleAuthoritySelect = (value: string) => {
    const authority = authorities.find((a) => a.id === value);
    if (authority) {
      setSelectedAuthority(authority);
      setErrors((prev) => ({ ...prev, authority: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: {
      requestText?: string;
      authority?: string;
      personalInfo?: Partial<Record<keyof PersonalInfo, string>>;
    } = {};

    if (customText.trim().length < 50) {
      newErrors.requestText = "Request must be at least 50 characters long.";
    }

    if (!selectedAuthority) {
      newErrors.authority = "Please select an authority.";
    }

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
    if (!selectedAuthority) return;

    try {
      setIsGenerating(true);

      const { pdf } = await import("@react-pdf/renderer");
      const { default: RTIRequestDocument } = await import(
        "@/components/rti-document/RTIDocument"
      );

      const pdfDoc = (
        <RTIRequestDocument
          requestText={customText}
          authority={selectedAuthority}
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

  const getAuthorityName = (authority: Authority, language: Language) => {
    switch (language) {
      case "en":
        return authority.name?.en || "";
      case "si":
        return authority.name?.si || "";
      case "ta":
        return authority.name?.ta || "";
      default:
        return authority.name?.en || "";
    }
  };

  const getAuthorityAddress = (authority: Authority, language: Language) => {
    switch (language) {
      case "en":
        return authority.address?.en || "";
      case "si":
        return authority.address?.si || "";
      case "ta":
        return authority.address?.ta || "";
      default:
        return authority.address?.en || "";
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

            {/* Authority Selection */}
            <div className="space-y-2">
              <Label htmlFor="authority">Authority</Label>
              <Select
                value={selectedAuthority?.id || ""}
                onValueChange={handleAuthoritySelect}
                name="authority"
              >
                <SelectTrigger id="authority" className="w-full">
                  <SelectValue placeholder="Select Authority" />
                </SelectTrigger>
                <SelectContent>
                  {authorities.map((authority) => (
                    <SelectItem key={authority.id} value={authority.id}>
                      {getAuthorityName(authority, selectedLanguage)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.authority && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.authority}</AlertDescription>
                </Alert>
              )}
              {selectedAuthority && (
                <div className="p-3 bg-muted rounded-md">
                  <p className="font-medium">Selected Authority:</p>
                  <p>{getAuthorityName(selectedAuthority, selectedLanguage)}</p>
                  <p className="text-sm text-muted-foreground">
                    {getAuthorityAddress(selectedAuthority, selectedLanguage)}
                  </p>
                </div>
              )}
            </div>

            {/* Template Selection */}
            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>{" "}
              <Select
                value={selectedTemplate}
                onValueChange={handleTemplateChange}
                name="template"
              >
                <SelectTrigger
                  id="template"
                  className="w-full whitespace-pre-wrap min-h-[2.5rem] h-auto items-start py-2"
                >
                  <SelectValue
                    placeholder="Select a template"
                    className="whitespace-pre-wrap break-words"
                  />
                </SelectTrigger>
                <SelectContent>
                  {templates &&
                  templates.length > 0 &&
                  templates[0][selectedLanguage] ? (
                    templates.map((template, index) => (
                      <SelectItem
                        key={index}
                        value={template[selectedLanguage]}
                        className="whitespace-pre-wrap break-words py-2"
                      >
                        <div className="w-full pr-4">
                          {template[selectedLanguage]}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="No templates available" disabled>
                      No Templates Available
                    </SelectItem>
                  )}
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

      <div className="flex gap-4 p-4 pt-0">
        <Button
          type="submit"
          className="flex-1"
          disabled={
            isGenerating ||
            !selectedAuthority ||
            !selectedAuthority.primary_email
          }
        >
          {isGenerating ? "Generating PDF..." : "Generate and Download PDF"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => {
            if (!selectedAuthority) return;
            const subject = `Right to Information Request - ${getAuthorityName(
              selectedAuthority,
              selectedLanguage
            )}`;
            const body = `Dear Sir/Madam,\n\n${customText}\n\nBest regards,\n${personalInfo.name}\n${personalInfo.address}\n${personalInfo.city}, ${personalInfo.postalCode}\nPhone: ${personalInfo.phone}\nID Number: ${personalInfo.idNumber}`;
            window.location.href = `mailto:${
              selectedAuthority.primary_email
            }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
              body
            )}`;
          }}
          disabled={!selectedAuthority || !selectedAuthority.primary_email}
        >
          Send via Email
        </Button>
      </div>
    </form>
  );
}
