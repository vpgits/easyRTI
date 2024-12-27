import CreateRequestForm from "@/components/create-request-form/CreateRequestForm";
import { Authority } from "@/types/authority";
import { Languages } from "@/types/languages";
import { Templates } from "@/types/templates";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "easyRti | Create Request",
  description: "Create a new request",
};

export default async function Page() {
  const supabase = await createClient();
  const { data: raw_request_templates, error: request_templates_error } =
    await supabase.from("request_templates").select("*");

  const { data: raw_authorities, error } = await supabase
    .from("authorities")
    .select("*");

  const templates: Templates[] = raw_request_templates!.map(
    (template) => template.template_data as Templates
  );

  const authorities = raw_authorities!.map(
    (authority) => authority as Authority
  );

  return (
    <CreateRequestForm
      templates={templates}
      languages={Languages}
      authorities={authorities}
    />
  );
}
