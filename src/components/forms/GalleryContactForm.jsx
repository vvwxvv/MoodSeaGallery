// GalleryContactForm.jsx — matches galleryContactSchema
"use client";

import React, { useContext } from "react";
import { Divider } from "@mui/material";
import FormShell from "@/components/forms/shells/FormShell";
import { galleryContactSchema } from "@/schemas/gallery_contact_schema";
import { LanguageContext } from "@/components/contexts/LanguageContext";

import FormTitle from "@/components/titles/FormTitle";
import GalleryContactFormSection from "@/components/forms/sections/GalleryContactFormSection";

export default function GalleryContactForm() {
  const setValue = (form, field, value) =>
    form.setValue(field, value, { shouldDirty: true });
  const getValue = (form, field) => form.getValues(field);
  const clearErrors = (form, field) => form.clearErrors(field);
  const reset = (form, defaults) => form.reset(defaults || {});

  const getEndpoint = (mode, id) => {
    if (mode === "update" && id) return `/api/gallery-contact?id=${id}`;
    return "/api/gallery-contact";
  };

  const GalleryContactFormConfig = {
    itemUrl: "gallery-contact",

    api: {
      endpoints: {
        create: "/api/gallery-contact",
        update: (id) => `/api/gallery-contact?id=${id}`,
      },
      methods: { create: "POST", update: "PUT" },
      headers: { "Content-Type": "application/json" },
    },

    setValue,
    getValue,
    reset,
    clearErrors,
    getEndpoint,
  };

  const { isCn } = useContext(LanguageContext);

  // Default values matching galleryContactSchema
  const defaultValues = {
    gallery_name: "",
    opening_time: "",
    email: "",
    phone: "",
    address: [],                 // string[]
    social_media: [],            // { platform, account, url }[]
    web_url: "",
    order: "",
    language: isCn ? "CN" : "EN",
  };

  return (
    <FormShell
      schema={galleryContactSchema}
      defaultValues={defaultValues}
      config={GalleryContactFormConfig}
    >
      {({
        form,
        formState,
        isSubmitting,
        watchedValues,
        getLabel,
        onFieldChange,
        colors,
      }) => {
        return (
          <>
            <FormTitle
              schemaNameEn="Gallery Contact"
              schemaNameCn="画廊联系方式"
              isCn={isCn}
            />

            <GalleryContactFormSection
              form={form}
              disabled={isSubmitting}
              getLabel={getLabel}
              onFieldChange={onFieldChange}
              colors={colors}
            />

            <Divider sx={{ my: 3 }} />
          </>
        );
      }}
    </FormShell>
  );
}