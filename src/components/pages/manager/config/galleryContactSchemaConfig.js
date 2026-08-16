import { createComprehensiveGalleryContactExport } from "@/components/pages/manager/utils/galleryContactExportUtils";
import { getSystemLabel, createBasePageText } from "@/components/labels/system_labels";
import { ArrowUpDown } from 'lucide-react';
import { sortAlphabetically } from '@/utils/sortUtils';
import { ORIGINAL_SIZE_PRESET } from '@/components/pages/manager/constants/cardDisplayPresets';

/**
 * GalleryContact Fields Configuration
 */

export const getGalleryContactFields = (lang = 'EN') => [
  { key: 'gallery_name', label: 'Gallery Name / 画廊名称' },
  { key: 'opening_time', label: 'Opening Hours / 营业时间' },
  { key: 'email', label: 'Email / 邮箱' },
  { key: 'phone', label: 'Phone / 电话' },
  { key: 'address', label: 'Address / 地址', isArray: true },
  { key: 'social_media', label: 'Social Media / 社交媒体', isArray: true },
  { key: 'web_url', label: 'Website URL / 网站链接' },
  { key: 'language', label: 'Language / 语言' },
  { key: 'order', label: 'Order / 顺序' },
  { key: 'updatedAt', label: 'Updated At / 更新时间' },
];

export const getGalleryContactDeleteDialogFields = (lang = 'EN') => [
  { key: 'gallery_name', label: 'Gallery Name:' },
  { key: 'email', label: 'Email:' },
  { key: 'phone', label: 'Phone:' },
  { key: 'language', label: 'Language:' },
];

export const GALLERY_CONTACT_SORT_FIELDS = [
  'gallery_name',
  'order',
];

export const GALLERY_CONTACT_SEARCH_FIELDS = [
  'gallery_name',
  'email',
  'phone',
  'address',
];

export const getEmptyGalleryContact = () => ({
  gallery_name: '',
  opening_time: '',
  email: '',
  phone: '',
  address: [],
  social_media: [],
  web_url: '',
  language: '',
  order: '',
  updatedAt: '',
});

export const COMPONENT_CONFIG = {
  DEBOUNCE_DELAY: 300,
  FUZZY_SEARCH_THRESHOLD: 3,
  MIN_MATCH_CHAR_LENGTH: 1,
  SESSION_STORAGE_PREFIX: 'gallery_contact_edit_',
  SUMMARY_FIELD_COUNT: 4,
};

export const FILTER_VALUES = {
  ALL: 'all',
};

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
};

export const FIELD_DISPLAY_CONFIG = {
  summaryFields: [
    'gallery_name',
    'email',
    'phone',
  ],
  detailFields: [
    'opening_time',
    'address',
    'social_media',
    'web_url',
    'language',
    'order',
    'updatedAt',
  ],
};

// 页面文本（可复用 system_labels 的部分，或独立定义）
const PAGE_TEXT = {
  createTooltip: { EN: "Add New Gallery Contact", CN: "添加画廊联系信息" },
  export: {
    success: { EN: "Exported successfully", CN: "导出成功" },
    error: { EN: "Export failed", CN: "导出失败" },
    items: { EN: "items", CN: "项" },
  },
  emptyState: {
    noData: { EN: "No gallery contacts found.", CN: "未找到画廊联系信息。" },
    noMatchingItems: { EN: "No matching gallery contacts.", CN: "未找到匹配的画廊联系信息。" },
  },
  errors: {
    loadingError: { EN: "Failed to load data", CN: "加载数据失败" },
    systemError: { EN: "System error occurred", CN: "系统发生错误" },
    tryAgain: { EN: "Try Again", CN: "重试" },
    pleaseRetry: { EN: "Please retry", CN: "请重试" },
    ok: { EN: "OK", CN: "确定" },
  },
  deleteDialog: {
    title: { EN: "Delete Gallery Contact", CN: "删除画廊联系信息" },
    confirm: { EN: "Delete", CN: "删除" },
    cancel: { EN: "Cancel", CN: "取消" },
  },
};

// 如有专用的 labels 文件，可导入替换，这里用内联定义
const galleryContactLabels = {
  UI_TEXT: {
    // 可扩展
  },
};

const getGalleryContactLabel = (key, lang) => {
  // 简单的映射，可扩充
  const labels = {
    gallery_name: { EN: 'Gallery Name', CN: '画廊名称' },
    opening_time: { EN: 'Opening Hours', CN: '营业时间' },
    email: { EN: 'Email', CN: '邮箱' },
    phone: { EN: 'Phone', CN: '电话' },
    address: { EN: 'Address', CN: '地址' },
    social_media: { EN: 'Social Media', CN: '社交媒体' },
    web_url: { EN: 'Website URL', CN: '网站链接' },
    language: { EN: 'Language', CN: '语言' },
    order: { EN: 'Order', CN: '顺序' },
    updatedAt: { EN: 'Updated At', CN: '更新时间' },
  };
  return labels[key]?.[lang] ?? key;
};

export const galleryContactSchemaConfig = {
  title: "Gallery Contacts",
  schemaName: "galleryContact",

  api: {
    endpoint: "/api/gallery-contact",
    deleteEndpoint: "/api/gallery-contact",
    listEndpoint: "/api/gallery-contact/list",
  },

  navigation: {
    createPath: "/manager/gallery-contact/create",
    editPathTemplate: "/manager/gallery-contact/{id}/edit",
  },

  dataConfig: {
    titleField: "gallery_name",
    descriptionField: "email",        // 可选，也可以设为 opening_time
    imageField: null,                 // 没有默认图片字段

    alphabetFilterField: "gallery_name",
    languageField: "language",

    getFields: (lang) => getGalleryContactFields(lang),
    getDeleteDialogFields: (lang) => getGalleryContactDeleteDialogFields(lang),
    getEmptyItem: () => getEmptyGalleryContact(),

    sortFields: GALLERY_CONTACT_SORT_FIELDS,
    searchFields: GALLERY_CONTACT_SEARCH_FIELDS,
    fieldDisplayConfig: FIELD_DISPLAY_CONFIG,

    customSearch: (item, searchTerm, isCn) => {
      const itemLanguage = item.language?.toUpperCase()?.trim();
      const currentLanguage = isCn ? 'CN' : 'EN';

      if (itemLanguage && itemLanguage !== currentLanguage) {
        return false;
      }

      if (!searchTerm) return true;

      const term = searchTerm.toLowerCase().trim();

      const searchableFields = [
        item.gallery_name,
        item.email,
        item.phone,
        // 若希望支持地址搜索，可展开
        ...(Array.isArray(item.address) ? item.address : []),
      ];

      return searchableFields.some(
        (field) => field && String(field).toLowerCase().includes(term)
      );
    },
  },

  filterConfig: {
    values: FILTER_VALUES,
    filterFields: [
      { key: "gallery_name", fields: ["gallery_name"] },
      { key: "language", fields: ["language"] },
    ],
    createControlPanelConfig: () => createGalleryContactControlPanelConfig(),
  },

  exportConfig: {
    formatter: (data, isCn) => createComprehensiveGalleryContactExport(data, isCn),
    filename: { EN: "gallery_contact_export_en", CN: "gallery_contact_export_cn" },
  },

  uiConfig: {
    defaultViewMode: VIEW_MODES.GRID,
    viewModes: VIEW_MODES,
    isArtistweb: false,
    debounceDelay: COMPONENT_CONFIG.DEBOUNCE_DELAY,
    ...ORIGINAL_SIZE_PRESET,
  },

  labels: {
    itemName: { EN: "Gallery Contact", CN: "画廊联系信息" },
    pageText: createBasePageText({
      createTooltip: PAGE_TEXT.createTooltip,
      export: {
        ...PAGE_TEXT.export,
        items: PAGE_TEXT.export.items,
      },
      emptyState: {
        noData: PAGE_TEXT.emptyState.noData,
        noMatchingItems: PAGE_TEXT.emptyState.noMatchingItems,
      },
      errors: PAGE_TEXT.errors,
      deleteDialog: PAGE_TEXT.deleteDialog,
    }),
    getLabel: (key, lang) => {
      const fromGallery = getGalleryContactLabel(key, lang);
      if (fromGallery !== key) return fromGallery;
      if (galleryContactLabels.UI_TEXT?.[key]) return galleryContactLabels.UI_TEXT[key][lang];
      return getSystemLabel(key, lang === "CN") ?? key;
    },
  },

  components: {
    actionButtons: [
      {
        labelKey: 'batch_edit',
        route: '/manager/gallery-contact/batch_edit',
      },
      {
        labelKey: 'exportData',
        action: 'export',
      },
    ],

    searchConfig: {
      placeholder: {
        EN: 'Search by name, email, phone...',
        CN: '搜索名称、邮箱、电话...',
      },
      ariaLabel: {
        EN: 'Search gallery contacts',
        CN: '搜索画廊联系信息',
      },

      selectConfig: {
        filterKey: 'gallery_name',
        placeholder: {
          EN: 'All Galleries',
          CN: '全部画廊',
        },
        ariaLabel: {
          EN: 'Select gallery',
          CN: '选择画廊',
        },
        allLabel: {
          EN: 'All Galleries',
          CN: '全部画廊',
        },
      },
    },
  },
};

export const createGalleryContactControlPanelConfig = () => ({
  filters: [
    {
      field: 'gallery_name',
      label: { cn: '画廊名称', en: 'Gallery Name' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'language',
      label: { cn: '语言', en: 'Language' },
      sortFunction: sortAlphabetically,
    },
  ],
  controls: [
    {
      type: 'toggle',
      label: { cn: '名称排序', en: 'Sort by Name' },
      icon: <ArrowUpDown size={20} />,
      action: 'sortByField',
      sortField: 'gallery_name',
      tooltip: { cn: '按画廊名称排序', en: 'Sort by Gallery Name' },
      activeColor: 'red',
      inactiveColor: 'var(--text-primary, #000000)',
    },
  ],
});

export default createGalleryContactControlPanelConfig;