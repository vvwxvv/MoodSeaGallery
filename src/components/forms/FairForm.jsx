"use client";

import React, { useContext, useCallback } from "react";
import { Divider } from "@mui/material";
import FormShell from "@/components/forms/shells/FormShell";
import { fairSchema } from "@/schemas/fair_schema";                    // Fair schema
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { IMAGE_UPLOAD_CONFIGS } from "@/components/forms/configs/image_upload_config";

import FormTitle from "@/components/titles/FormTitle";
import ImageUploadSection from "@/components/forms/images/ImageUploadSection";
import FairFormSection from "@/components/forms/sections/FairFormSection"; // Fair form section

export default function FairForm() {
  const setValue = (form, field, value) =>
    form.setValue(field, value, { shouldDirty: true });
  const getValue = (form, field) => form.getValues(field);
  const clearErrors = (form, field) => form.clearErrors(field);
  const reset = (form, defaults) => form.reset(defaults || {});

  const getEndpoint = (mode, id) => {
    if (mode === "update" && id) return `/api/fair?id=${id}`;
    return "/api/fair";
  };

  const FairFormConfig = {
    itemUrl: "fair",

    api: {
      endpoints: {
        create: "/api/fair",
        update: (id) => `/api/fair?id=${id}`,
      },
      methods: { create: "POST", update: "PUT" },
      headers: { "Content-Type": "application/json" },
    },

    settings: {
      upload: {
        maxFileSize: 10 * 1024 * 1024,
        acceptedFormats: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        uploadPath: "/uploads/fairs/",                              // Fair upload path
      },
    },

    setValue,
    getValue,
    reset,
    clearErrors,
    getEndpoint,
  };

  const { isCn } = useContext(LanguageContext);

  // Default values matching Prisma Fair model
  const defaultValues = {
    cover_img_url: "",
    title: "",
    section: "",                     // Fair specific
    type: "",
    date_start: "",
    date_end: "",
    vip_preview_date: "",            // Fair specific (replaces opening_date)
    year: "",
    booth: "",                       // Fair specific
    venue: "",
    location: "",
    organiser: "",
    curator: "",
    participating_artists: "",
    caption: "",
    press_release: [],               // Fair array fields
    related_artwork_title: [],
    related_gallery_artist: [],
    web_url: "",
    video_url: "",
    status: "",
    mark: "",
    order: "",
    language: isCn ? "CN" : "EN",
  };

  const coverConfig = IMAGE_UPLOAD_CONFIGS.fair;  // Ensure this exists in your config

  return (
    <FormShell
      schema={fairSchema}
      defaultValues={defaultValues}
      config={FairFormConfig}
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
        const handleUploadSuccess = useCallback(
          (url) => {
            coverConfig.createSetValue(form)(url);
            formState.clearError();
          },
          [form, formState]
        );

        const handleUploadError = useCallback(
          (err) =>
            formState.setError(err.message || getLabel("uploadError")),
          [formState, getLabel]
        );

        return (
          <>
            <FormTitle
              schemaNameEn="Fair"
              schemaNameCn="博览会"
              isCn={isCn}
            />

            <ImageUploadSection
              title={coverConfig?.title || getLabel("coverImage")}
              imgUrl={watchedValues.cover_img_url}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
              disabled={isSubmitting}
              getLabel={getLabel}
              register={coverConfig.createRegister(form)}
              fieldName={coverConfig.fieldName}
              form={form}
              colors={colors}
            />

            <FairFormSection
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