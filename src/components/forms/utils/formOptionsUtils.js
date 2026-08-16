let formTypesData = {};
let formOptionsData = {};
let formMarksData = {};
let webTypes = [];
let languageOptions = [];

// Load data from JSON files
try { formTypesData = require('@/data/form_types.json'); } catch {}
try { formOptionsData = require('@/data/form_options.json'); } catch {}
try { formMarksData = require('@/data/form_marks.json'); } catch {}
try { webTypes = formTypesData.web || []; } catch {}
try { languageOptions = formOptionsData.common?.language || []; } catch {}

// Export functions and constants
export const getFormTypes = (entityType) => formTypesData[entityType] || [];
export const getFormFieldOptions = (entityType, field, language = 'en') => {
  const opts =
    formOptionsData[entityType]?.formOptions?.[field] ||
    formOptionsData[entityType]?.filterOptions?.[field] ||
    formOptionsData.common?.[field] ||
    [];
  return opts.map(o => ({
    id: o.id,
    value: o.value,
    label: language === 'cn' ? o.label_cn : o.label_en
  }));
};
export const getMarkOptions = (entityType, language = 'en') =>
  (formMarksData[entityType] || []).map(m => ({
    id: m.id,
    value: m.value,
    label: language === 'cn' ? m.label_cn : m.label_en
  }));

export const getTypeOptions = (entityType, language = 'en') => {
  const types = getFormTypes(entityType);
  return types.map(t => ({
    id: t.id,
    value: t.value,
    label: (language === 'cn' && t.label_cn) ? t.label_cn : (t.label_en || t.label || t.value)
  }));
};
export const getBooleanOptions = (language = 'en') =>
  (formOptionsData.common?.boolean || []).map(o => ({
    id: o.id,
    value: o.value,
    label: language === 'cn' ? o.label_cn : o.label_en
  }));

export const getLanguageOptions = (language = 'en') => {
  return languageOptions.map((o, idx) => ({
    id: o.id ?? idx + 1,
    value: o.value,
    label: language === 'cn' ? o.label_cn : o.label_en
  }));
};

export const getCategoryOptions = (entityType, lang = 'EN') => {
  const list = { writing: writingCategories }[entityType] || [];
  const useCn = lang.toUpperCase() === 'CN';
  return list.map(c => ({ value: c.value, label: useCn ? c.label_cn : c.label_en }));
};

export const getPublishStatusOptions = (lang = 'EN') => {
  const useCn = lang.toUpperCase() === 'CN';
  return publishStatusOptions.map(s => ({ value: s.value, label: useCn ? s.label_cn : s.label_en }));
};

// Updated getFormTypeByValue function
export const getFormTypeByValue = (value) => {
  // Ensure formTypesData is loaded and contains the "type" schema
  const allTypes = Object.values(formTypesData).flat(); // Flatten all types from the JSON
  const matchedType = allTypes.find((type) => type.value === value);

  // Return the label if found, otherwise return a default message
  return matchedType ? matchedType.label_en : 'Unknown Form Type';
};

// Export constants
export { languageOptions, webTypes };

// Default export
export default {
  getFormTypes,
  getFormFieldOptions,
  getMarkOptions,
  getTypeOptions,
  getBooleanOptions,
  getLanguageOptions,
  getCategoryOptions,
  getPublishStatusOptions,
  languageOptions,
  webTypes,
  getFormTypeByValue, // Add this to the export
};
