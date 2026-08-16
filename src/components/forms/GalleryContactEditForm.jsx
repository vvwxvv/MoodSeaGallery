// GalleryContactEditForm.jsx — matches galleryContactSchema
"use client";
import React, { useContext } from "react";
import { Divider } from "@mui/material";
import EditFormShell from "@/components/forms/shells/EditFormShell";
import GalleryContactFormSection from "@/components/forms/sections/GalleryContactFormSection";
import { galleryContactSchema } from "@/schemas/gallery_contact_schema";
import { LanguageContext } from "@/components/contexts/LanguageContext";

const API_ENDPOINT = "/api/gallery-contact";
const titles = { en: "Gallery Contact", cn: "画廊联系方式" };

const getDefaultValues = (item, isCn) => {
  console.log('GalleryContactEditForm: Creating default values for item:', item);

  const defaultValues = {
    gallery_name: item?.gallery_name || "",
    opening_time: item?.opening_time || "",
    email: item?.email || "",
    phone: item?.phone || "",
    address: Array.isArray(item?.address) ? item.address : [],
    social_media: Array.isArray(item?.social_media) ? item.social_media : [],
    web_url: item?.web_url || "",
    order: String(item?.order ?? ""),
    language: item?.language || (isCn ? "CN" : "EN"),
  };

  console.log('GalleryContactEditForm: Default values created:', defaultValues);
  return defaultValues;
};

export default function GalleryContactEditForm({ item }) {
  const { isCn } = useContext(LanguageContext);

  console.log('GalleryContactEditForm: Rendering with item:', item, 'isCn:', isCn);

  const memoizedGetDefaultValues = React.useCallback(
    (currentItem, isCnValue) => getDefaultValues(currentItem, isCnValue),
    [item?.id || item?._id]
  );

  return (
    <EditFormShell
      key={item?.id || item?._id || 'new'}
      schema={galleryContactSchema}
      defaultValues={memoizedGetDefaultValues}
      apiRoute={API_ENDPOINT}
      item={item}
      titles={titles}
      onSubmitSuccess={(data) => {
        console.log('GalleryContactEditForm: Submit success:', data);
      }}
      onSubmitError={(error) => {
        console.error('GalleryContactEditForm: Submit error:', error);
      }}
    >
      {({ form, colors, disabled, getLabel }) => {
        console.log('GalleryContactEditForm: Inside render, isCn:', isCn);

        const formErrors = form.formState.errors;
        console.log('GalleryContactEditForm: Form state:', {
          isValid: form.formState.isValid,
          errors: formErrors,
          isSubmitting: form.formState.isSubmitting,
          isDirty: form.formState.isDirty,
        });

        return (
          <>
            <GalleryContactFormSection
              form={form}
              disabled={disabled}
              colors={colors}
              getLabel={getLabel}
              onFieldChange={() => {}}
            />

            <Divider sx={{ my: 3 }} />
          </>
        );
      }}
    </EditFormShell>
  );
}