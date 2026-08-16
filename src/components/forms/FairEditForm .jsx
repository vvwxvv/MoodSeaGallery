"use client";
import React, { useContext } from "react";
import { Divider } from "@mui/material";
import EditFormShell from "@/components/forms/shells/EditFormShell";
import FairFormSection from "@/components/forms/sections/FairFormSection";       // Fair 专用表单组件
import ImageUploadSection from "@/components/forms/images/ImageUploadSection";
import { fairSchema } from "@/schemas/fair_schema";                             // Fair Schema
import { IMAGE_UPLOAD_CONFIGS } from "@/components/forms/configs/image_upload_config";
import { LanguageContext } from "@/components/contexts/LanguageContext";

const API_ENDPOINT = "/api/fair";
const titles = { en: "Fair", cn: "博览会" };

const getDefaultValues = (item, isCn) => {
  console.log('FairEditForm: Creating default values for item:', item);

  const defaultValues = {
    cover_img_url: item?.cover_img_url || "",
    title: item?.title || "",
    section: item?.section || "",                 // 新增
    type: item?.type || "",
    date_start: item?.date_start || "",
    date_end: item?.date_end || "",
    vip_preview_date: item?.vip_preview_date || "", // 新增 VIP 预览日期
    year: item?.year || "",
    booth: item?.booth || "",                     // 新增展位
    venue: item?.venue || "",
    location: item?.location || "",
    organiser: item?.organiser || "",
    curator: item?.curator || "",
    participating_artists: item?.participating_artists || "",
    caption: item?.caption || "",
    press_release: Array.isArray(item?.press_release) ? item.press_release : [],
    related_artwork_title: Array.isArray(item?.related_artwork_title) ? item.related_artwork_title : [],
    related_gallery_artist: Array.isArray(item?.related_gallery_artist) ? item.related_gallery_artist : [],
    web_url: item?.web_url || "",
    video_url: item?.video_url || "",
    status: item?.status || "",
    mark: item?.mark || "",
    order: String(item?.order ?? ""),
    language: item?.language || (isCn ? "CN" : "EN"),
  };

  console.log('FairEditForm: Default values created:', defaultValues);
  return defaultValues;
};

export default function FairEditForm({ item }) {
  const { isCn } = useContext(LanguageContext);

  console.log('FairEditForm: Rendering with item:', item, 'isCn:', isCn);

  const memoizedGetDefaultValues = React.useCallback(
    (currentItem, isCnValue) => getDefaultValues(currentItem, isCnValue),
    [item?.id || item?._id]
  );

  return (
    <EditFormShell
      key={item?.id || item?._id || 'new'}
      schema={fairSchema}
      defaultValues={memoizedGetDefaultValues}
      apiRoute={API_ENDPOINT}
      item={item}
      titles={titles}
      onSubmitSuccess={(data) => {
        console.log('FairEditForm: Submit success:', data);
      }}
      onSubmitError={(error) => {
        console.error('FairEditForm: Submit error:', error);
      }}
    >
      {({ form, colors, disabled, getLabel }) => {
        console.log('FairEditForm: Inside render, isCn:', isCn);

        const formErrors = form.formState.errors;
        console.log('FairEditForm: Form state:', {
          isValid: form.formState.isValid,
          errors: formErrors,
          isSubmitting: form.formState.isSubmitting,
          isDirty: form.formState.isDirty,
        });

        return (
          <>
            <ImageUploadSection
              title={IMAGE_UPLOAD_CONFIGS.fair?.title || "Cover Image"}
              imgUrl={form.watch("cover_img_url")}
              onUploadSuccess={(url) => form.setValue("cover_img_url", url)}
              onUploadError={(err) => console.error(err)}
              disabled={disabled}
              getLabel={getLabel}
              register={() => ({})}
              fieldName="cover_img_url"
              form={form}
              colors={colors}
            />

            <FairFormSection
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