// ArtworkFormSection.jsx — fully matches Prisma Artwork model
import React, { useContext } from 'react';

/* ---------- internal imports ---------- */
import { LanguageContext } from '@/components/contexts/LanguageContext';

/* ---------- reusable component ---------- */
import TabbedFormManager from '@/components/forms/managers/TabbedFormManager';

/* ---------- centralised labels ---------- */
import ARTWORK_FORM_LABELS from '@/components/forms/labels/artworkFormLables';

/* =============================================================================
  Artwork Form Schema Definition (matches Prisma Artwork model)
============================================================================= */
const ARTWORK_SCHEMA = [
  {
    key: 'basic',
    fields: [
      { name: 'artist', type: 'text' },
      { name: 'title', type: 'text' },
      { name: 'type', type: 'text' },
      { name: 'medium', type: 'text' },
      { name: 'year', type: 'text' },
      { name: 'size', type: 'text' },
      { name: 'series', type: 'text' },
    ],
  },
  {
    key: 'details',
    fields: [
      { name: 'caption', type: 'multiline', rows: 3 },
      { name: 'duration', type: 'text' },
      { name: 'credits', type: 'text' },
      { name: 'special_thanks', type: 'text' },
    ],
  },
  {
    key: 'media',
    fields: [
      { name: 'cover_img_url', type: 'text' },   // 新增：封面图片
      { name: 'video_url', type: 'text' },
      { name: 'web_url', type: 'text' },
    ],
  },
  {
    key: 'pricing',
    fields: [
      { name: 'work_value', type: 'text' },
      { name: 'sold', type: 'select', options: ['Yes', 'No'] },
    ],
  },
  {
    key: 'metadata',
    fields: [
      { name: 'order', type: 'text' },
      { name: 'mark', type: 'text' },
      { name: 'language', type: 'select', options: ['CN', 'EN'] },
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
    key: 'relations',                                     // 新增 relations 区块
    type: 'array',
    fieldName: 'related_gallery_exhibition',              // 对应 Prisma 字段
    rows: 1,
    multiline: false,                                     // 单行输入，每个展览一条
    // addLabel 会从 ARTWORK_FORM_LABELS.buttons 中读取，若未定义则使用默认
  },
];

/* =============================================================================
  Artwork Form Section Component
============================================================================= */
const ArtworkFormSection = ({
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
  const enhancedSchema = ARTWORK_SCHEMA.map((section) => {
    const enhancedSection = { ...section };

    if (ARTWORK_FORM_LABELS?.tabs?.[section.key]) {
      enhancedSection.label = ARTWORK_FORM_LABELS.tabs[section.key];
    }

    if (section.fields) {
      enhancedSection.fields = section.fields.map((field) => ({
        ...field,
        label:
          ARTWORK_FORM_LABELS?.fields?.[field.name] || {
            en: field.name,
            cn: field.name,
          },
      }));
    }

    if (section.key === 'introduction') {
      enhancedSection.addLabel = ARTWORK_FORM_LABELS?.buttons?.addIntroduction;
    }
    if (section.key === 'relations') {
      // 为 relations 区块添加添加按钮标签（可从 labels 中读取，若无则使用默认）
      enhancedSection.addLabel = ARTWORK_FORM_LABELS?.buttons?.addRelatedGalleryExhibition || {
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

    if (ARTWORK_FORM_LABELS?.fields?.[normKey]?.[lang]) {
      return ARTWORK_FORM_LABELS.fields[normKey][lang];
    }
    if (ARTWORK_FORM_LABELS?.tabs?.[normKey]?.[lang]) {
      return ARTWORK_FORM_LABELS.tabs[normKey][lang];
    }
    if (ARTWORK_FORM_LABELS?.buttons?.[normKey]?.[lang]) {
      return ARTWORK_FORM_LABELS.buttons[normKey][lang];
    }

    return key.replace(/[_-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getTabLabel = (tabKey) => {
    const lang = isCn ? 'cn' : 'en';
    return (
      ARTWORK_FORM_LABELS?.tabs?.[tabKey]?.[lang] ||
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

export default ArtworkFormSection;