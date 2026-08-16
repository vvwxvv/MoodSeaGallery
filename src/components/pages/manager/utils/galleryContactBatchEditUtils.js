/**
 * Get field group definitions for GalleryContact data
 */
export const getGalleryContactFieldGroups = (isCn) => {
  const groupKeyLabels = {
    core: isCn ? "基本信息" : "Core Info",
    contact: isCn ? "联系方式" : "Contact Details",
    classification: isCn ? "分类" : "Classification",
  };

  return {
    core: ["gallery_name", "opening_time"],
    contact: ["email", "phone", "address", "social_media", "web_url"],
    classification: ["language", "order"],
    groupKeyLabels,
  };
};

/**
 * Get all GalleryContact schema fields for column definitions
 */
export const getGalleryContactSchemaFields = () => [
  { name: "gallery_name", labelKey: "galleryName", label: "Gallery Name" },
  { name: "opening_time", labelKey: "openingTime", label: "Opening Hours" },
  { name: "email", labelKey: "email", label: "Email" },
  { name: "phone", labelKey: "phone", label: "Phone" },
  { name: "address", labelKey: "address", label: "Address" },
  { name: "social_media", labelKey: "socialMedia", label: "Social Media" },
  { name: "web_url", labelKey: "webUrl", label: "Website URL" },
  { name: "language", labelKey: "language", label: "Language" },
  { name: "order", labelKey: "order", label: "Order" },
];

/**
 * Get field type categories for GalleryContact data
 */
export const getGalleryContactFieldTypes = () => ({
  arrayFields: ["address", "social_media"],      // 数组字段（普通数组或对象数组）
  multilineFields: ["address"],                 // 适合多行文本输入（如地址）
  objectFields: ["social_media"],               // 对象数组字段，用于特殊渲染
  enumFields: ["language"],                     // 枚举字段，提供下拉选项
});