"use client";

import React, { useContext, useEffect, useCallback } from "react";
import { Divider, Grid } from "@mui/material";
import FormShell from "@/components/forms/shells/FormShell";
import { imageSchema } from "@/schemas/image_schema";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import useAppTitle from "@/hooks/useAppTitle";
import { getFormArtistValue, shouldHideArtistField } from "@/utils/artistUtils";
import { IMAGE_UPLOAD_CONFIGS } from "@/components/forms/configs/image_upload_config";

import FormTitle from "@/components/titles/FormTitle";
import ImageUploadSection from "@/components/forms/images/ImageUploadSection";
import ImageFormSection from "@/components/forms/sections/ImageFormSection";
import MarkSelector from "@/components/forms/selectors/MarkSelector";
import OrderSelector from "@/components/forms/selectors/OrderSelector";

/**
 * @param {Object} relatedData  Keyed by schema dataKey, e.g.
 *                              { artwork: [...], project: [...], event: [...] }
 *                              Built by the page and passed straight in.
 */
export default function ImageForm({ relatedData = {} }) {
  const { isCn } = useContext(LanguageContext);
  const appPerson = useAppTitle(isCn ? "CN" : "EN");

  const setValue    = (form, field, value) => form.setValue(field, value, { shouldDirty: true });
  const getValue    = (form, field)        => form.getValues(field);
  const clearErrors = (form, field)        => form.clearErrors(field);
  const reset       = (form, defaults)     => form.reset(defaults ?? {});
  const getEndpoint = (mode, id) =>
    mode === 'update' && id ? `/api/image/${id}` : '/api/image';

  const ImageFormConfig = {
    itemUrl: 'image',
    api: {
      endpoints: {
        create: '/api/image',
        update: (id) => `/api/image?id=${id}`,
      },
      methods: { create: 'POST', update: 'PUT' },
      headers: { 'Content-Type': 'application/json' },
    },
    settings: {
      upload: {
        maxFileSize: 10 * 1024 * 1024,
        acceptedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        uploadPath: '/uploads/image/',
      },
    },
    setValue,
    getValue,
    reset,
    clearErrors,
    getEndpoint,
  };

  const defaultValues = {
    img_url: "", tag_en: "", tag_cn: "", type: "",
    caption_en: "", caption_cn: "", mark: "", order: "", tag_source: "0",
  };

  useEffect(() => {
    if (shouldHideArtistField()) {
      const v = getFormArtistValue(appPerson.displayName, isCn ? "CN" : "EN");
      if (v) ImageFormConfig.setValue("artist", v);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appPerson.displayName, isCn]);

  const imageConfig = IMAGE_UPLOAD_CONFIGS.image;

  return (
    <FormShell
      schema={imageSchema}
      defaultValues={defaultValues}
      config={ImageFormConfig}
    >
      {({ form, formState, isSubmitting, watchedValues, getLabel, onFieldChange, colors }) => {
        const handleUploadSuccess = useCallback(
          (url) => { imageConfig.createSetValue(form)(url); formState.clearError(); },
          [form, formState]
        );
        const handleUploadError = useCallback(
          (err) => formState.setError(err.message || getLabel("uploadError")),
          [formState, getLabel]
        );

        return (
          <>
            <FormTitle schemaNameEn="Image" schemaNameCn="图片" isCn={isCn} />

            <ImageUploadSection
              title={imageConfig?.title || getLabel("image")}
              imgUrl={watchedValues.img_url}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
              disabled={isSubmitting}
              getLabel={getLabel}
              register={imageConfig.createRegister(form)}
              fieldName={imageConfig.fieldName}
              form={form}
              colors={colors}
            />

            {/* relatedData is passed straight from the page — no merging needed */}
            <ImageFormSection
              form={form}
              disabled={isSubmitting}
              getLabel={getLabel}
              onFieldChange={onFieldChange}
              colors={colors}
              relatedData={relatedData}
            />

            <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <MarkSelector
                  form={form} entityType="image" disabled={isSubmitting}
                  getLabel={() => (isCn ? "标记" : "Mark")}
                  language={isCn ? "CN" : "EN"} colors={colors} isCn={isCn}
                  onFieldChange={onFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <OrderSelector
                  label={getLabel("order") || (isCn ? "排序" : "Order")}
                  form={form} disabled={isSubmitting}
                  getLabel={() => (isCn ? "排序" : "Order")}
                  onFieldChange={onFieldChange} colors={colors} isCn={isCn}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
          </>
        );
      }}
    </FormShell>
  );
}