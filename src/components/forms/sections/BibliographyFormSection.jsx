// BibliographyFormSection.jsx — fully matches Prisma Bibliography model
import React, { useContext } from 'react';

/* ---------- internal imports ---------- */
import { LanguageContext } from '@/components/contexts/LanguageContext';

/* ---------- reusable component ---------- */
import TabbedFormManager from '@/components/forms/managers/TabbedFormManager';

/* ---------- centralised labels ---------- */
// 若你已存在 bibliographyFormLabels 可导入，此处直接定义本地对象保持与 Artwork 一致风格
const BIBLIOGRAPHY_FORM_LABELS = {
  tabs: {
    basic: { en: 'Basic Information', cn: '基本信息' },
    media: { en: 'Media Links', cn: '媒体链接' },
    relations: { en: 'Relations', cn: '关联信息' },
    metadata: { en: 'Metadata', cn: '元数据' },
  },
  fields: {
    title: { en: 'Title', cn: '标题' },
    subtitle: { en: 'Subtitle', cn: '副标题' },
    cover_img_url: { en: 'Cover Image URL', cn: '封面图片链接' },
    author: { en: 'Author', cn: '作者' },
    type: { en: 'Type', cn: '类型' },
    year: { en: 'Year', cn: '年份' },
    date: { en: 'Date', cn: '日期' },
    published_at: { en: 'Published At', cn: '出版时间' },
    pdf_url: { en: 'PDF URL', cn: 'PDF链接' },
    web_url: { en: 'Website URL', cn: '网页链接' },
    video_url: { en: 'Video URL', cn: '视频链接' },
    related_gallery_exhibition: { en: 'Related Gallery Exhibitions', cn: '相关画廊展览' },
    order: { en: 'Order', cn: '排序' },
    language: { en: 'Language', cn: '语言' },
    mark: { en: 'Mark', cn: '标记' },
  },
  buttons: {
    addRelatedGalleryExhibition: { en: 'Add Exhibition', cn: '添加展览' },
  },
};

/* =============================================================================
  Bibliography Form Schema Definition (matches Prisma Bibliography model)
============================================================================= */
const BIBLIOGRAPHY_SCHEMA = [
  {
    key: 'relations',
    type: 'array',
    fieldName: 'related_gallery_exhibition',
    rows: 1,
    multiline: false,
  },
  {
    key: 'basic',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'subtitle', type: 'text' },
      { name: 'cover_img_url', type: 'text' },
      { name: 'author', type: 'text' },
      { name: 'type', type: 'text' },
      { name: 'year', type: 'text' },
      { name: 'date', type: 'text' },
      { name: 'published_at', type: 'text' },
      { name: 'language', type: 'select', options: ['CN', 'EN'] },
    ],
  },
  {
    key: 'media',
    fields: [
      { name: 'pdf_url', type: 'text' },
      { name: 'web_url', type: 'text' },
      { name: 'video_url', type: 'text' },
    ],
  },
  {
    key: 'metadata',
    fields: [
      { name: 'order', type: 'text' },
      { name: 'mark', type: 'text' },
    ],
  },
];

/* =============================================================================
  Bibliography Form Section Component
============================================================================= */
const BibliographyFormSection = ({
  form,
  disabled = false,
  getLabel,
  onFieldChange,
  colors = {},
  relatedMediaSelectors,
  relatedContentSelectors,
}) => {
  const { isCn } = useContext(LanguageContext);

  /* ---------- 将集中标签注入到 schema ---------- */
  const enhancedSchema = BIBLIOGRAPHY_SCHEMA.map((section) => {
    const enhancedSection = { ...section };

    if (BIBLIOGRAPHY_FORM_LABELS?.tabs?.[section.key]) {
      enhancedSection.label = BIBLIOGRAPHY_FORM_LABELS.tabs[section.key];
    }

    if (section.fields) {
      enhancedSection.fields = section.fields.map((field) => ({
        ...field,
        label:
          BIBLIOGRAPHY_FORM_LABELS?.fields?.[field.name] || {
            en: field.name,
            cn: field.name,
          },
      }));
    }

    if (section.key === 'relations') {
      enhancedSection.addLabel =
        BIBLIOGRAPHY_FORM_LABELS?.buttons?.addRelatedGalleryExhibition || {
          en: 'Add Exhibition',
          cn: '添加展览',
        };
    }

    return enhancedSection;
  });

  const normalizeKey = (key) => key?.toLowerCase();

  const getLabelFunc = (key) => {
    const lang = isCn ? 'cn' : 'en';
    const normKey = normalizeKey(key);

    if (BIBLIOGRAPHY_FORM_LABELS?.fields?.[normKey]?.[lang]) {
      return BIBLIOGRAPHY_FORM_LABELS.fields[normKey][lang];
    }
    if (BIBLIOGRAPHY_FORM_LABELS?.tabs?.[normKey]?.[lang]) {
      return BIBLIOGRAPHY_FORM_LABELS.tabs[normKey][lang];
    }
    if (BIBLIOGRAPHY_FORM_LABELS?.buttons?.[normKey]?.[lang]) {
      return BIBLIOGRAPHY_FORM_LABELS.buttons[normKey][lang];
    }

    return key.replace(/[_-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getTabLabel = (tabKey) => {
    const lang = isCn ? 'cn' : 'en';
    return (
      BIBLIOGRAPHY_FORM_LABELS?.tabs?.[tabKey]?.[lang] ||
      tabKey.replace(/[_-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };

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

export default BibliographyFormSection;