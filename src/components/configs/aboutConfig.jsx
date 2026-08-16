// aboutConfig.js
import AboutEditForm from "@/components/forms/AboutEditForm";
import AboutForm from "@/components/forms/AboutForm";
import { 
  ANIMATION_VARIANTS, 
} from './general_config';
import { getFieldGroupsWithLabels } from '@/components/forms/utils/formFieldsUtils';

// ============================================================
// LABELS CONFIGURATION
// ============================================================
export const aboutLabels = {
  // Page labels
  page: {
    title: { en: 'About', cn: '关于' },
    subtitle: { en: 'About Information', cn: '关于信息' },
    description: { en: 'Manage about information', cn: '管理关于信息' },
  },

  // Field labels — one entry per editable Prisma field
  fields: {
    portrait_image_url: { en: 'Portrait Image URL', cn: '肖像图片链接' },
    artist: { en: 'Artist', cn: '艺术家' },
    caption: { en: 'Caption', cn: '说明' },
    introductions: { en: 'Introduction', cn: '介绍' },
    pdf_url: { en: 'PDF URL', cn: 'PDF链接' },           // 新增
    web_url: { en: 'Website URL', cn: '网页链接' },       // 新增
    language: { en: 'Language', cn: '语言' },
    order: { en: 'Order', cn: '排序' },
    mark: { en: 'Mark', cn: '标记' },
  },

  // UI Text
  UI_TEXT: {
    aboutManagement: { en: 'About Management', cn: '关于管理' },
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
export const getAboutLabel = (key, language = 'en') => {
  if (aboutLabels.fields[key]) {
    return aboutLabels.fields[key][language] || aboutLabels.fields[key]['en'];
  }
  if (aboutLabels.UI_TEXT[key]) {
    return aboutLabels.UI_TEXT[key][language] || aboutLabels.UI_TEXT[key]['en'];
  }
  if (aboutLabels.page[key]) {
    return aboutLabels.page[key][language] || aboutLabels.page[key]['en'];
  }
  return key;
};

// ============================================================
// FIELD GROUPS CONFIGURATION
// ============================================================
export const getFieldGroupsAbout = (isCn = false) => {
  const fieldGroups = {
    BASIC: {
      title: isCn ? '基本信息' : 'Basic Information',
      fields: [
        { key: "portrait_image_url" },
        { key: "artist" },
        { key: "caption" },
        { key: "introductions" },
        { key: "pdf_url" },        // 新增
        { key: "web_url" },        // 新增
        { key: "language" },
        { key: "order" },
        { key: "mark" },
      ]
    }
  };
  
  return getFieldGroupsWithLabels('about', fieldGroups, isCn);
};

// ============================================================
// MAIN CONFIGURATION
// ============================================================
export const aboutConfig = {
  // Schema identifier
  itemUrl: "about",
  schemaName: "About",

  // API Configuration
  api: {
    endpoints: {
      base: '/api/about',
      create: '/api/about',
      update: (id) => `/api/about/${id}`,
      delete: (id) => `/api/about/${id}`,
      list: '/api/about',
      detail: (id) => `/api/about/${id}`,
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
      enablePagination: false,
      enableSearch: true,
      enableSorting: true,
      defaultSortField: 'order',
      defaultSortOrder: -1,
      collectionName: 'About',
    },
  },

  // Page Configuration
  page: {
    title: aboutLabels.page.title,
    subtitle: aboutLabels.page.subtitle,
    description: aboutLabels.page.description,
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
    searchableFields: ['artist', 'caption', 'pdf_url', 'web_url'],  // 新增 pdf_url, web_url
    sortableFields: ['order'],
    filterableFields: ['language'],
    mainFields: ['artist', 'caption', 'language'],
    expandedFields: ['introductions', 'mark'],
    arrayFields: ['introductions'],
    validFields: [
      'id', 'portrait_image_url', 'artist', 'caption',
      'introductions', 'pdf_url', 'web_url',          // 新增
      'language', 'order', 'mark'
    ],
  },

  // Component Configuration
  components: {
    createFormComponent: AboutForm,
    editFormComponent: AboutEditForm,
  },

  // Labels Configuration
  labels: aboutLabels,

  // Language Options
  languageOptions: [
    { value: 'CN', label_en: 'Chinese', label_cn: '中文' },
    { value: 'EN', label_en: 'English', label_cn: '英文' },
  ],
};

// Export default
export default aboutConfig;