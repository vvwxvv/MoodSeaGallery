"use client";

import React, { useContext, useCallback } from "react";
import { Grid, Divider } from "@mui/material";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import EditFormShell from "@/components/forms/shells/EditFormShell";
import ImageFormSection from "@/components/forms/sections/ImageFormSection";
import ImageUploadSection from "@/components/forms/images/ImageUploadSection";
import MarkSelector from "@/components/forms/selectors/MarkSelector";
import OrderSelector from "@/components/forms/selectors/OrderSelector";
import { imageSchema } from "@/schemas/image_schema";
import { IMAGE_UPLOAD_CONFIGS } from "@/components/forms/configs/image_upload_config";

/* ── constants ───────────────────────────────────────────────────────────── */
const API_ENDPOINT = "/api/image";
const titles       = { en: "Image", cn: "图片" };

/* ── default-values factory ──────────────────────────────────────────────── */
const getDefaultValues = (item, isCn) => ({
  img_url:    item?.img_url    ?? "",
  tag_en:     item?.tag_en     ?? "",
  tag_cn:     item?.tag_cn     ?? "",
  type:       item?.type       ?? "",
  caption_en: item?.caption_en ?? "",
  caption_cn: item?.caption_cn ?? "",
  mark:       item?.mark       ?? "",
  /* always stringify; default to "0" (None) not empty string */
  tag_source: item?.tag_source !== undefined ? String(item.tag_source) : "0",
  order:      String(item?.order ?? ""),
  language:   item?.language   ?? (isCn ? "CN" : "EN"),
});

/* ══════════════════════════════════════════════════════════════════════════
   ImageEditForm
   Props
     item        — the existing image document from DB
     relatedData — { artwork: [...], event: [...], project: [...] }
                   passed from the page (same shape as create form)
═══════════════════════════════════════════════════════════════════════════ */
export default function ImageEditForm({ item, relatedData = {} }) {
  const { isCn }    = useContext(LanguageContext);
  const imageConfig = IMAGE_UPLOAD_CONFIGS.image;

  return (
    <EditFormShell
      key={item?.id ?? item?._id ?? "new"} /* force re-init when item swaps */
      schema={imageSchema}
      defaultValues={getDefaultValues}
      apiRoute={API_ENDPOINT}
      item={item}
      titles={titles}
    >
      {({ form, colors, disabled, onFieldChange, getLabel }) => {

        /* stable fallback if EditFormShell doesn't yet forward getLabel */
        const label = getLabel ?? ((k) => k);

        /* ── upload callbacks ── */
        const handleUploadSuccess = useCallback(
          (url) => imageConfig.createSetValue(form)(url),
          [form]
        );
        const handleUploadError = useCallback(
          (err) => console.error("[ImageEditForm] upload error:", err),
          []
        );

        return (
          <>
            {/* ① Image upload preview */}
            <ImageUploadSection
              title={imageConfig?.title ?? (isCn ? "图片" : "Image")}
              imgUrl={form.watch("img_url")}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
              disabled={disabled}
              getLabel={label}
              register={imageConfig.createRegister(form)}
              fieldName={imageConfig.fieldName}
              form={form}
              colors={colors}
            />

            {/* ② Tabbed form section — tags / caption / type
                relatedData comes from the page (same contract as create form) */}
            <ImageFormSection
              form={form}
              disabled={disabled}
              getLabel={label}
              onFieldChange={onFieldChange}
              colors={colors}
              relatedData={relatedData}
            />

            {/* ③ Mark + Order — Grid row, mirrors create form layout */}
            <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <MarkSelector
                  form={form}
                  entityType="image"
                  disabled={disabled}
                  getLabel={() => (isCn ? "标记" : "Mark")}
                  language={isCn ? "CN" : "EN"}
                  colors={colors}
                  isCn={isCn}
                  onFieldChange={onFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <OrderSelector
                  label={isCn ? "排序" : "Order"}
                  form={form}
                  disabled={disabled}
                  getLabel={() => (isCn ? "排序" : "Order")}
                  onFieldChange={onFieldChange}
                  colors={colors}
                  isCn={isCn}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
          </>
        );
      }}
    </EditFormShell>
  );
}