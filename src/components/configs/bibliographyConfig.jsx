// bibliographyConfig.js
import BibliographyEditForm from "@/components/forms/BibliographyEditForm";
import BibliographyForm from "@/components/forms/BibliographyForm";
import { ANIMATION_VARIANTS } from './general_config';
import { getFieldGroupsWithLabels } from '@/components/forms/utils/formFieldsUtils';

// ============================================================
// LABELS CONFIGURATION
// ============================================================
export const bibliographyLabels = {
  // Page labels
  page: {
    title: { en: 'Bibliography', cn: '书目' },
    subtitle: { en: 'Bibliography Information', cn: '书目信息' },
    description: { en: 'Manage bibliography entries', cn: '管理书目条目' },
  },

  // Field labels — one entry per editable Prisma field
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
    language: { en: 'Language', cn: '语言' },          // 新增
    mark: { en: 'Mark', cn: '标记' },                  // 新增
  },

  // UI Text
  UI_TEXT: {
    bibliographyManagement: { en: 'Bibliography Management', cn: '书目管理' },
    create: { en: 'Create New', cn: '创建新项' },
    edit: { en: 'Edit', cn: '编辑' },
    delete: { en: 'Delete', cn: '删除' },
    save: { en: 'Save', cn: '保存' },
    cancel: { en: 'Cancel', cn: '取消' },
    confirmDelete: { en: 'Confirm Delete', cn: '确认删除' },
    noData: { en: 'No data available', cn: '暂无数据' },
  },
};

// Helper function to get labels
export const getBibliographyLabel = (key, language = 'en') => {
  if (bibliographyLabels.fields[key]) {
    return bibliographyLabels.fields[key][language] || bibliographyLabels.fields[key]['en'];
  }
  if (bibliographyLabels.UI_TEXT[key]) {
    return bibliographyLabels.UI_TEXT[key][language] || bibliographyLabels.UI_TEXT[key]['en'];
  }
  if (bibliographyLabels.page[key]) {
    return bibliographyLabels.page[key][language] || bibliographyLabels.page[key]['en'];
  }
  return key;
};

// ============================================================
// FIELD GROUPS CONFIGURATION
// ============================================================
export const getFieldGroupsBibliography = (isCn = false) => {
  const fieldGroups = {
    BASIC: {
      title: isCn ? '基本信息' : 'Basic Information',
      fields: [
        { key: "title" },
        { key: "subtitle" },
        { key: "cover_img_url" },
        { key: "author" },
        { key: "type" },
        { key: "year" },
        { key: "date" },
        { key: "published_at" },
        { key: "language" },        // 新增
      ]
    },
    MEDIA: {
      title: isCn ? '媒体链接' : 'Media Links',
      fields: [
        { key: "pdf_url" },
        { key: "web_url" },
        { key: "video_url" },
      ]
    },
    RELATIONS: {
      title: isCn ? '关联信息' : 'Relations',
      fields: [
        { key: "related_gallery_exhibition" },
      ]
    },
    META: {
      title: isCn ? '元数据' : 'Metadata',
      fields: [
        { key: "order" },
        { key: "mark" },           // 新增
      ]
    }
  };
  
  return getFieldGroupsWithLabels('bibliography', fieldGroups, isCn);
};

// ============================================================
// MAIN CONFIGURATION
// ============================================================
export const bibliographyConfig = {
  // Schema identifier
  itemUrl: "bibliography",
  schemaName: "Bibliography",

  // API Configuration
  api: {
    endpoints: {
      base: '/api/bibliography',
      create: '/api/bibliography',
      update: (id) => `/api/bibliography/${id}`,
      delete: (id) => `/api/bibliography/${id}`,
      list: '/api/bibliography',
      detail: (id) => `/api/bibliography/${id}`,
    },
    methods: {
      create: 'POST',
      update: 'PUT',
      delete: 'DELETE',
      list: 'GET',
      detail: 'GET',
    },
    headers: {
      'Content-Type': 'application/json',
    },
    config: {
      enablePagination: true,
      enableSearch: true,
      enableSorting: true,
      defaultSortField: 'order',
      defaultSortOrder: -1,
      collectionName: 'Bibliography',
    },
  },

  // Page Configuration
  page: {
    title: bibliographyLabels.page.title,
    subtitle: bibliographyLabels.page.subtitle,
    description: bibliographyLabels.page.description,
    animationVariants: ANIMATION_VARIANTS?.container || {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delayChildren: 0.15,
          staggerChildren: 0.08,
        },
      },
    },
  },

  // Field Configuration
  fields: {
    searchableFields: ['title', 'subtitle', 'author', 'type', 'year', 'date', 'published_at', 'language', 'mark'], // 新增 language, mark
    sortableFields: ['order', 'year', 'title', 'language'], // 新增 language（可按语言排序）
    filterableFields: ['type', 'language'],                // 新增 language 筛选
    mainFields: ['title', 'author', 'year'],
    expandedFields: ['subtitle', 'cover_img_url', 'pdf_url', 'web_url', 'video_url'],
    arrayFields: ['related_gallery_exhibition'],
    validFields: [
      'id', 'title', 'subtitle', 'cover_img_url', 'author', 'type',
      'year', 'date', 'published_at', 'pdf_url', 'web_url', 'video_url',
      'related_gallery_exhibition', 'order', 'language', 'mark' // 新增 language, mark
    ],
  },

  // Component Configuration
  components: {
    createFormComponent: BibliographyForm,
    editFormComponent: BibliographyEditForm,
  },

  // Labels Configuration
  labels: bibliographyLabels,

  // Language Options (if needed)
  languageOptions: [
    { value: 'CN', label_en: 'Chinese', label_cn: '中文' },
    { value: 'EN', label_en: 'English', label_cn: '英文' },
  ],
};

// Export default
export default bibliographyConfig;