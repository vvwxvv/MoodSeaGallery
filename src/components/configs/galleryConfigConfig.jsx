// galleryContactConfig.js
import GalleryContactEditForm from "@/components/forms/GalleryContactEditForm";
import GalleryContactForm from "@/components/forms/GalleryContactForm";
import { 
  ANIMATION_VARIANTS, 
} from './general_config';
import { getFieldGroupsWithLabels } from '@/components/forms/utils/formFieldsUtils';

// ============================================================
// LABELS CONFIGURATION
// ============================================================
export const galleryContactLabels = {
  // Page labels
  page: {
    title: { en: 'Gallery Contacts', cn: '画廊联系信息' },
    subtitle: { en: 'Gallery Contact Information', cn: '画廊联系信息' },
    description: { en: 'Manage gallery contact information', cn: '管理画廊联系信息' },
  },

  // Field labels — one entry per editable Prisma field
  fields: {
    gallery_name: { en: 'Gallery Name', cn: '画廊名称' },
    opening_time: { en: 'Opening Hours', cn: '营业时间' },
    email: { en: 'Email', cn: '邮箱' },
    phone: { en: 'Phone', cn: '电话' },
    address: { en: 'Address', cn: '地址' },
    social_media: { en: 'Social Media', cn: '社交媒体' },
    web_url: { en: 'Website URL', cn: '网站链接' },
    language: { en: 'Language', cn: '语言' },
    order: { en: 'Order', cn: '排序' },
  },

  // UI Text
  UI_TEXT: {
    galleryContactManagement: { en: 'Gallery Contact Management', cn: '画廊联系信息管理' },
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
export const getGalleryContactLabel = (key, language = 'en') => {
  if (galleryContactLabels.fields[key]) {
    return galleryContactLabels.fields[key][language] || galleryContactLabels.fields[key]['en'];
  }
  if (galleryContactLabels.UI_TEXT[key]) {
    return galleryContactLabels.UI_TEXT[key][language] || galleryContactLabels.UI_TEXT[key]['en'];
  }
  if (galleryContactLabels.page[key]) {
    return galleryContactLabels.page[key][language] || galleryContactLabels.page[key]['en'];
  }
  return key;
};

// ============================================================
// FIELD GROUPS CONFIGURATION
// ============================================================
export const getFieldGroupsGalleryContact = (isCn = false) => {
  const fieldGroups = {
    BASIC: {
      title: isCn ? '基本信息' : 'Basic Information',
      fields: [
        { key: "gallery_name" },
        { key: "opening_time" },
        { key: "email" },
        { key: "phone" },
        { key: "address" },
        { key: "social_media" },
        { key: "web_url" },
        { key: "language" },
        { key: "order" },
      ]
    }
  };
  
  return getFieldGroupsWithLabels('galleryContact', fieldGroups, isCn);
};

// ============================================================
// MAIN CONFIGURATION
// ============================================================
export const galleryContactConfig = {
  // Schema identifier
  itemUrl: "galleryContact",
  schemaName: "GalleryContact",

  // API Configuration
  api: {
    endpoints: {
      base: '/api/gallery-contact',
      create: '/api/gallery-contact',
      update: (id) => `/api/gallery-contact/${id}`,
      delete: (id) => `/api/gallery-contact/${id}`,
      list: '/api/gallery-contact',
      detail: (id) => `/api/gallery-contact/${id}`,
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
      defaultSortOrder: 1,
      collectionName: 'GalleryContact',
    },
  },

  // Page Configuration
  page: {
    title: galleryContactLabels.page.title,
    subtitle: galleryContactLabels.page.subtitle,
    description: galleryContactLabels.page.description,
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
    searchableFields: ['gallery_name', 'email', 'phone', 'address'],
    sortableFields: ['order', 'gallery_name'],
    filterableFields: ['language'],
    mainFields: ['gallery_name', 'email', 'phone'],
    expandedFields: ['opening_time', 'address', 'social_media', 'web_url'],
    arrayFields: ['address', 'social_media'],
    validFields: [
      'id', 'gallery_name', 'opening_time', 'email', 'phone',
      'address', 'social_media', 'web_url', 'language', 'order'
    ],
  },

  // Component Configuration
  components: {
    createFormComponent: GalleryContactForm,
    editFormComponent: GalleryContactEditForm,
  },

  // Labels Configuration
  labels: galleryContactLabels,

  // Language Options
  languageOptions: [
    { value: 'CN', label_en: 'Chinese', label_cn: '中文' },
    { value: 'EN', label_en: 'English', label_cn: '英文' },
  ],
};

// Export default
export default galleryContactConfig;