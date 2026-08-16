// ExhibitionFormSection.jsx — matches updated Prisma Exhibition model
import React, { useContext } from 'react';

/* ---------- internal imports ---------- */
import { LanguageContext } from '@/components/contexts/LanguageContext';

/* ---------- reusable component ---------- */
import TabbedFormManager from '@/components/forms/managers/TabbedFormManager';

/* ---------- centralised labels ---------- */
import EXHIBITION_FORM_LABELS from '@/components/forms/labels/exhibitionFormLables';

/* =============================================================================
  Exhibition Form Schema Definition (matches updated Prisma Exhibition model)
============================================================================= */
const EXHIBITION_SCHEMA = [
  {
    key: 'basic',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'subtitle', type: 'text' },
      { name: 'type', type: 'select', options: 'typeOptions' },
      { name: 'year', type: 'text' },
      { name: 'mark', type: 'text' },
      { name: 'language', type: 'select', options: 'languageOptions' },
    ],
  },
  {
    key: 'dates',
    fields: [
      { name: 'date_start', type: 'date' },
      { name: 'date_end', type: 'date' },
      { name: 'opening_date', type: 'date' },
    ],
  },
  {
    key: 'location',
    fields: [
      { name: 'venue', type: 'text' },
      { name: 'location', type: 'text' },
      { name: 'curator', type: 'text' },
      { name: 'organiser', type: 'text' },
      { name: 'participating_artists', type: 'text' },
    ],
  },
  {
    key: 'content',
    fields: [
      { name: 'caption', type: 'multiline', rows: 2 },
      { name: 'description', type: 'multiline', rows: 4 },
    ],
  },
  {
    key: 'media',
    fields: [
      { name: 'video_url', type: 'text' },
      { name: 'web_url', type: 'text' },
    ],
  },
  {
    key: 'settings',
    fields: [
      { name: 'order', type: 'text' },
      { name: 'status', type: 'select', options: 'statusOptions' },
    ],
  },
  {
    key: 'introduction',
    type: 'array',
    fieldName: 'introduction',
    rows: 3,
    multiline: true,
  },
  {
    key: 'press_release',
    type: 'array',
    fieldName: 'press_release',
    rows: 3,
    multiline: true,
  },
  // 新增的数组字段（匹配 Prisma 模型）
  {
    key: 'related_artwork_title',
    type: 'array',
    fieldName: 'related_artwork_title',
    rows: 1,
    multiline: false,
  },
  {
    key: 'related_gallery_artist',
    type: 'array',
    fieldName: 'related_gallery_artist',
    rows: 1,
    multiline: false,
  },
];

/* =============================================================================
  Exhibition Form Section Component
============================================================================= */
const ExhibitionFormSection = ({
  form,
  disabled = false,
  getLabel,
  onFieldChange,
  colors = {},
  relatedMediaSelectors,
  relatedContentSelectors,
}) => {
  const { isCn } = useContext(LanguageContext);

  /* ---------- 将标签注入 Schema ---------- */
  const enhancedSchema = EXHIBITION_SCHEMA.map(section => {
    const enhancedSection = { ...section };

    // 为每个 section 添加 tab 标签
    if (EXHIBITION_FORM_LABELS?.tabs?.[section.key]) {
      enhancedSection.label = EXHIBITION_FORM_LABELS.tabs[section.key];
    }

    // 为每个字段添加 label
    if (section.fields) {
      enhancedSection.fields = section.fields.map(field => ({
        ...field,
        label: EXHIBITION_FORM_LABELS?.fields?.[field.name] || { en: field.name, cn: field.name }
      }));
    }

    // 为数组字段添加“添加”按钮标签
    if (section.key === 'introduction') {
      enhancedSection.addLabel = EXHIBITION_FORM_LABELS?.buttons?.addIntroduction;
    }
    if (section.key === 'press_release') {
      enhancedSection.addLabel = EXHIBITION_FORM_LABELS?.buttons?.addPressRelease;
    }
    if (section.key === 'related_artwork_title') {
      enhancedSection.addLabel = EXHIBITION_FORM_LABELS?.buttons?.addRelatedArtworkTitle;
    }
    if (section.key === 'related_gallery_artist') {
      enhancedSection.addLabel = EXHIBITION_FORM_LABELS?.buttons?.addRelatedGalleryArtist;
    }

    return enhancedSection;
  });

  /* ---------- 辅助函数：获取标签 ---------- */
  const normalizeKey = (key) => key?.toLowerCase();

  const getLabelFunc = (key) => {
    const lang = isCn ? 'cn' : 'en';
    const normKey = normalizeKey(key);

    if (EXHIBITION_FORM_LABELS?.fields?.[normKey]?.[lang]) {
      return EXHIBITION_FORM_LABELS.fields[normKey][lang];
    }
    if (EXHIBITION_FORM_LABELS?.tabs?.[normKey]?.[lang]) {
      return EXHIBITION_FORM_LABELS.tabs[normKey][lang];
    }
    if (EXHIBITION_FORM_LABELS?.buttons?.[normKey]?.[lang]) {
      return EXHIBITION_FORM_LABELS.buttons[normKey][lang];
    }
    if (EXHIBITION_FORM_LABELS?.selectors?.[normKey]?.[lang]) {
      return EXHIBITION_FORM_LABELS.selectors[normKey][lang];
    }

    return key.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getTabLabel = (tabKey) => {
    const lang = isCn ? 'cn' : 'en';
    return EXHIBITION_FORM_LABELS?.tabs?.[tabKey]?.[lang] ||
           tabKey.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  /* ---------- 可选的自定义渲染器（如需扩展） ---------- */
  const customRenderers = {
    relatedMediaSelectors,
    relatedContentSelectors,
  };

  return (
    <TabbedFormManager
      form={form}
      schema={enhancedSchema}
      getLabelFunc={getLabelFunc}
      getTabLabel={getTabLabel}
      onFieldChange={onFieldChange}
      colors={colors}
      disabled={disabled}
      customRenderers={customRenderers}
      isCn={isCn}
      getLabel={getLabelFunc}
      labelFunc={getLabelFunc}
      getFieldLabel={getLabelFunc}
    />
  );
};

export default ExhibitionFormSection;