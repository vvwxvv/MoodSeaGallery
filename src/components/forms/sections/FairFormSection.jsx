// FairFormSection.jsx — 完全匹配 Prisma Fair 模型
import React, { useContext } from 'react';

/* ---------- internal imports ---------- */
import { LanguageContext } from '@/components/contexts/LanguageContext';

/* ---------- reusable component ---------- */
import TabbedFormManager from '@/components/forms/managers/TabbedFormManager';

/* ---------- 标签配置（若无外部文件，此处作为 fallback） ---------- */
// 推荐在 /components/forms/labels/fairFormLabels.js 中集中管理，但此处提供默认值
const DEFAULT_FAIR_FORM_LABELS = {
  tabs: {
    basic: { en: 'Basic Info', cn: '基本信息' },
    dates: { en: 'Dates', cn: '日期' },
    location: { en: 'Location & Participants', cn: '地点与参与者' },
    content: { en: 'Content', cn: '内容' },
    media: { en: 'Media', cn: '媒体' },
    settings: { en: 'Settings', cn: '设置' },
  },
  fields: {
    title: { en: 'Title', cn: '标题' },
    section: { en: 'Section', cn: '板块' },
    type: { en: 'Type', cn: '类型' },
    year: { en: 'Year', cn: '年份' },
    mark: { en: 'Mark', cn: '标记' },
    language: { en: 'Language', cn: '语言' },
    date_start: { en: 'Start Date', cn: '开始日期' },
    date_end: { en: 'End Date', cn: '结束日期' },
    vip_preview_date: { en: 'VIP Preview Date', cn: 'VIP预览日期' },
    booth: { en: 'Booth', cn: '展位' },
    venue: { en: 'Venue', cn: '场馆' },
    location: { en: 'Location', cn: '地点' },
    organiser: { en: 'Organiser', cn: '主办方' },
    curator: { en: 'Curator', cn: '策展人' },
    participating_artists: { en: 'Participating Artists', cn: '参展艺术家' },
    caption: { en: 'Caption', cn: '说明' },
    cover_img_url: { en: 'Cover Image', cn: '封面图片' },
    video_url: { en: 'Video URL', cn: '视频链接' },
    web_url: { en: 'Web URL', cn: '网页链接' },
    order: { en: 'Order', cn: '排序' },
    status: { en: 'Status', cn: '状态' },
  },
  buttons: {
    addPressRelease: { en: 'Add Press Release', cn: '添加新闻稿' },
    addRelatedArtworkTitle: { en: 'Add Related Title', cn: '添加相关作品标题' },
    addRelatedGalleryArtist: { en: 'Add Gallery Artist', cn: '添加画廊艺术家' },
  },
};

// 使用默认标签（外部标签文件不存在时，默认值已足够）
const FAIR_FORM_LABELS = DEFAULT_FAIR_FORM_LABELS;

/* =============================================================================
  Fair Form Schema Definition (完全匹配 Prisma Fair 模型)
============================================================================= */
const FAIR_SCHEMA = [
  {
    key: 'basic',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'section', type: 'text' },
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
      { name: 'vip_preview_date', type: 'date' },
    ],
  },
  {
    key: 'location',
    fields: [
      { name: 'booth', type: 'text' },
      { name: 'venue', type: 'text' },
      { name: 'location', type: 'text' },
      { name: 'organiser', type: 'text' },
      { name: 'curator', type: 'text' },
      { name: 'participating_artists', type: 'text' },
    ],
  },
  {
    key: 'content',
    fields: [
      { name: 'caption', type: 'multiline', rows: 2 },
    ],
  },
  {
    key: 'media',
    fields: [
      { name: 'cover_img_url', type: 'text' },
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
    key: 'press_release',
    type: 'array',
    fieldName: 'press_release',
    rows: 3,
    multiline: true,
  },
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
  Fair Form Section Component
============================================================================= */
const FairFormSection = ({
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
  const enhancedSchema = FAIR_SCHEMA.map((section) => {
    const enhancedSection = { ...section };

    // Tab 标签
    if (FAIR_FORM_LABELS?.tabs?.[section.key]) {
      enhancedSection.label = FAIR_FORM_LABELS.tabs[section.key];
    }

    // 字段标签
    if (section.fields) {
      enhancedSection.fields = section.fields.map((field) => ({
        ...field,
        label:
          FAIR_FORM_LABELS?.fields?.[field.name] || {
            en: field.name,
            cn: field.name,
          },
      }));
    }

    // 数组字段的“添加”按钮标签
    const arrayKeys = ['press_release', 'related_artwork_title', 'related_gallery_artist'];
    if (arrayKeys.includes(section.key)) {
      const buttonKey = `add${section.key.charAt(0).toUpperCase() + section.key.slice(1)}`;
      enhancedSection.addLabel =
        FAIR_FORM_LABELS?.buttons?.[buttonKey] || {
          en: `Add ${section.key.replace(/_/g, ' ')}`,
          cn: `添加${section.key.replace(/_/g, '')}`,
        };
    }

    return enhancedSection;
  });

  /* ---------- 辅助函数：获取标签 ---------- */
  const normalizeKey = (key) => key?.toLowerCase();

  const getLabelFunc = (key) => {
    const lang = isCn ? 'cn' : 'en';
    const normKey = normalizeKey(key);

    if (FAIR_FORM_LABELS?.fields?.[normKey]?.[lang]) {
      return FAIR_FORM_LABELS.fields[normKey][lang];
    }
    if (FAIR_FORM_LABELS?.tabs?.[normKey]?.[lang]) {
      return FAIR_FORM_LABELS.tabs[normKey][lang];
    }
    if (FAIR_FORM_LABELS?.buttons?.[normKey]?.[lang]) {
      return FAIR_FORM_LABELS.buttons[normKey][lang];
    }

    return key.replace(/[_-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getTabLabel = (tabKey) => {
    const lang = isCn ? 'cn' : 'en';
    return (
      FAIR_FORM_LABELS?.tabs?.[tabKey]?.[lang] ||
      tabKey.replace(/[_-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };

  /* ---------- 自定义渲染器（可选） ---------- */
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

export default FairFormSection;