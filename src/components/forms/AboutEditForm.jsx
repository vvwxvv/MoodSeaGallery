// AboutEditForm.jsx — matches Prisma About model
"use client";
import React, { useContext } from "react";
import { Divider, Grid, TextField } from "@mui/material";
import EditFormShell from "@/components/forms/shells/EditFormShell";
import AboutFormSection from "@/components/forms/sections/AboutFormSection";
import ImageUploadSection from "@/components/forms/images/ImageUploadSection";
import MarkSelector from "@/components/forms/selectors/MarkSelector";
import LanguageSelector from "@/components/forms/selectors/LanguageSelector";
import { aboutSchema } from "@/schemas/about_schema";
import { getFormArtistValue } from "@/utils/artistUtils";
import {IMAGE_UPLOAD_CONFIGS} from "@/components/forms/configs/image_upload_config";
import { Controller } from "react-hook-form";
import { LanguageContext } from "@/components/contexts/LanguageContext";

const API_ENDPOINT = "/api/about";
const titles = { en: "About", cn: "关于" };

const getDefaultValues = (item, isCn) => {
  console.log('AboutEditForm: Creating default values for item:', item);
  
  const defaultValues = {
    artist: item?.artist || getFormArtistValue("", isCn ? "CN" : "EN"),
    portrait_image_url: item?.portrait_image_url || "",
    caption: item?.caption || "",
    introductions: Array.isArray(item?.introductions) ? item.introductions : [],
    pdf_url: item?.pdf_url || "",   // 新增
    web_url: item?.web_url || "",   // 新增
    language: item?.language || (isCn ? "CN" : "EN"),
    order: String(item?.order ?? ""),
    mark: item?.mark || "",
  };
  
  console.log('AboutEditForm: Default values created:', defaultValues);
  return defaultValues;
};

export default function AboutEditForm({ item }) {
  const { isCn } = useContext(LanguageContext);
  
  console.log('AboutEditForm: Rendering with item:', item, 'isCn:', isCn);
  
  const memoizedGetDefaultValues = React.useCallback(
    (currentItem, isCnValue) => getDefaultValues(currentItem, isCnValue),
    [item?.id || item?._id]
  );
  
  return (
    <EditFormShell
      key={item?.id || item?._id || 'new'}
      schema={aboutSchema}
      defaultValues={memoizedGetDefaultValues}
      apiRoute={API_ENDPOINT}
      item={item}
      titles={titles}
      onSubmitSuccess={(data) => {
        console.log('AboutEditForm: Submit success:', data);
      }}
      onSubmitError={(error) => {
        console.error('AboutEditForm: Submit error:', error);
      }}
    >
      {({ form, colors, disabled, getLabel }) => {
        console.log('AboutEditForm: Inside render, isCn:', isCn);
        
        const formErrors = form.formState.errors;
        console.log('AboutEditForm: Form state:', {
          isValid: form.formState.isValid,
          errors: formErrors,
          isSubmitting: form.formState.isSubmitting,
          isDirty: form.formState.isDirty,
        });
        
        return (
          <>
            <ImageUploadSection
              title={IMAGE_UPLOAD_CONFIGS.aboutPortrait?.title || "Portrait Image"}
              imgUrl={form.watch("portrait_image_url")}
              onUploadSuccess={(url) => form.setValue("portrait_image_url", url)}
              onUploadError={(err) => console.error(err)}
              disabled={disabled}
              getLabel={getLabel}
              register={() => ({})}
              fieldName="portrait_image_url"
              form={form}
              colors={colors}
            />

            <AboutFormSection 
              form={form} 
              disabled={disabled} 
              colors={colors}
              onFieldChange={() => {}}
            />

            {/* ===== 新增 pdf_url 和 web_url 字段 ===== */}
            <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="pdf_url"
                  control={form.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={getLabel("pdf_url") || "PDF URL"}
                      placeholder={isCn ? "输入PDF链接" : "Enter PDF URL"}
                      disabled={disabled}
                      size="small"
                      variant="outlined"
                      error={!!formErrors?.pdf_url}
                      helperText={formErrors?.pdf_url?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="web_url"
                  control={form.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={getLabel("web_url") || "Website URL"}
                      placeholder={isCn ? "输入网页链接" : "Enter website URL"}
                      disabled={disabled}
                      size="small"
                      variant="outlined"
                      error={!!formErrors?.web_url}
                      helperText={formErrors?.web_url?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <MarkSelector
                  form={form}
                  entityType="about"
                  disabled={disabled}
                  getLabel={() => isCn ? "标记" : "Mark"}
                  language={form.watch("language")}
                  colors={colors}
                  isCn={isCn}
                  onFieldChange={() => {}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="language"
                  control={form.control}
                  render={({ field }) => (
                    <LanguageSelector
                      value={field.value}
                      onChange={field.onChange}
                      disabled={disabled}
                      getLabel={() => isCn ? "语言" : "Language"}
                      colors={colors}
                      isCn={isCn}
                    />
                  )}
                />
              </Grid>
            </Grid>

          </>
        );
      }}
    </EditFormShell>
  );
}