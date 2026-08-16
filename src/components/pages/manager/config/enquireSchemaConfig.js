import { enquireConfig } from "@/components/configs/enquireConfig";
import { createComprehensiveEnquireExport } from "@/components/pages/manager/utils/enquireExportUtils"; // Assume you'll create this or use a generic one
import { getEnquireLabel, enquireLabels, PAGE_TEXT as ENQUIRE_PAGE_TEXT } from "@/components/labels/enquire_labels";
import { getSystemLabel, createBasePageText } from "@/components/labels/system_labels";
import { ArrowUpDown, Calendar } from 'lucide-react';
import { sortAlphabetically } from '@/utils/sortUtils';
import { ORIGINAL_SIZE_PRESET } from '@/components/pages/manager/constants/cardDisplayPresets';

/**
 * Enquire Fields Configuration
 */

export const getEnquireFields = (lang = 'EN') => [
  { key: 'name', label: 'Name / 姓名' },
  { key: 'email', label: 'Email / 邮箱' },
  { key: 'phone', label: 'Phone / 电话' },
  { key: 'status', label: 'Status / 状态' },
  { key: 'related_gallery_artist', label: 'Related Artist / 相关艺术家' },
  { key: 'related_artwork_title', label: 'Related Artwork / 相关作品' },
  { key: 'message', label: 'Message / 留言' },
  { key: 'createdAt', label: 'Created At / 创建时间' },
];

export const getDeleteDialogFields = (lang = 'EN') => [
  { key: 'name', label: 'Name:' },
  { key: 'email', label: 'Email:' },
  { key: 'status', label: 'Status:' },
  { key: 'createdAt', label: 'Date:' },
];

export const ENQUIRE_SORT_FIELDS = [
  'createdAt',
  'name',
  'status',
];

export const ENQUIRE_SEARCH_FIELDS = [
  'name',
  'email',
  'phone',
  'message',
  'related_gallery_artist',
  'related_artwork_title',
];

export const getEmptyEnquire = () => ({
  name: '',
  email: '',
  phone: '',
  message: '',
  related_gallery_artist: '',
  related_artwork_title: '',
  status: 'Pending',
});

export const COMPONENT_CONFIG = {
  DEBOUNCE_DELAY: 300,
  FUZZY_SEARCH_THRESHOLD: 3,
  MIN_MATCH_CHAR_LENGTH: 1,
  SESSION_STORAGE_PREFIX: 'enquire_edit_',
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
    'name',
    'email',
    'status',
    'createdAt',
  ],
  detailFields: [
    'phone',
    'message',
    'related_gallery_artist',
    'related_artwork_title',
  ],
};

export const enquireSchemaConfig = {
  title: "Enquiry",
  schemaName: "enquire",

  api: {
    endpoint: "/api/enquire",
    deleteEndpoint: enquireConfig?.api?.endpoints?.delete || "/api/enquire",
    listEndpoint: enquireConfig?.api?.endpoints?.list || "/api/enquire/list",
  },

  navigation: {
    createPath: "/manager/enquire/create",
    editPathTemplate: "/manager/enquire/{id}/edit",
  },

  dataConfig: {
    titleField: "name",
    descriptionField: "message",
    imageField: null, // Enquiries typically don't have cover images

    alphabetFilterField: "name",
    languageField: null, // Enquiries usually don't need strict language segregation

    getFields: (lang) => getEnquireFields(lang),
    getDeleteDialogFields: (lang) => getDeleteDialogFields(lang),
    getEmptyItem: () => getEmptyEnquire(),

    sortFields: ENQUIRE_SORT_FIELDS,
    searchFields: ENQUIRE_SEARCH_FIELDS,
    fieldDisplayConfig: FIELD_DISPLAY_CONFIG,

    customSearch: (item, searchTerm, isCn) => {
      if (!searchTerm) return true;

      const term = searchTerm.toLowerCase().trim();

      const searchableFields = [
        item.name,
        item.email,
        item.phone,
        item.message,
        item.related_gallery_artist,
        item.related_artwork_title,
      ];

      return searchableFields.some(
        (field) => field && String(field).toLowerCase().includes(term)
      );
    },
  },

  filterConfig: {
    values: FILTER_VALUES,
    filterFields: [
      { key: "status", fields: ["status"] },
      { key: "related_gallery_artist", fields: ["related_gallery_artist"] },
    ],
    createControlPanelConfig: () => createEnquireControlPanelConfig(),
  },

  exportConfig: {
    formatter: (data, isCn) => createComprehensiveEnquireExport(data, isCn),
    filename: { EN: "enquiry_export_en", CN: "enquiry_export_cn" },
  },

  uiConfig: {
    defaultViewMode: VIEW_MODES.LIST, // Lists are generally better for text-heavy tabular data like enquiries
    viewModes: VIEW_MODES,
    isArtistweb: false,
    debounceDelay: COMPONENT_CONFIG.DEBOUNCE_DELAY,
    ...ORIGINAL_SIZE_PRESET,
  },

  labels: {
    itemName: { EN: "Enquiry", CN: "咨询" },
    pageText: createBasePageText({
      createTooltip: ENQUIRE_PAGE_TEXT.createTooltip,
      export: {
        ...ENQUIRE_PAGE_TEXT.export,
        items: ENQUIRE_PAGE_TEXT.export.enquiries,
      },
      emptyState: {
        noData: ENQUIRE_PAGE_TEXT.emptyState.noData,
        noMatchingItems: ENQUIRE_PAGE_TEXT.emptyState.noMatchingEnquiries,
      },
      errors: ENQUIRE_PAGE_TEXT.errors,
      deleteDialog: ENQUIRE_PAGE_TEXT.deleteDialog,
    }),
    getLabel: (key, lang) => {
      const fromEnquire = getEnquireLabel(key, lang);
      if (fromEnquire !== key) return fromEnquire;
      if (enquireLabels.UI_TEXT?.[key]) return enquireLabels.UI_TEXT[key][lang];
      return getSystemLabel(key, lang === "CN") ?? key;
    },
  },

  components: {
    actionButtons: [
      {
        labelKey: 'exportData',
        action: 'export',
      },
    ],

    searchConfig: {
      placeholder: {
        EN: 'Search name, email, message...',
        CN: '搜索姓名、邮箱、留言...',
      },
      ariaLabel: {
        EN: 'Search enquiries',
        CN: '搜索咨询',
      },

      selectConfig: {
        filterKey: 'status',
        placeholder: {
          EN: 'All Statuses',
          CN: '全部状态',
        },
        ariaLabel: {
          EN: 'Select status',
          CN: '选择状态',
        },
        allLabel: {
          EN: 'All Statuses',
          CN: '全部状态',
        },
      },
    },
  },
};

export const createEnquireControlPanelConfig = () => ({
  filters: [
    {
      field: 'status',
      label: { cn: '状态', en: 'Status' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'related_gallery_artist',
      label: { cn: '相关艺术家', en: 'Related Artist' },
      sortFunction: sortAlphabetically,
    },
  ],
  controls: [
    {
      type: 'toggle',
      label: { cn: '日期排序', en: 'Sort by Date' },
      icon: <Calendar size={20} />,
      action: 'sortByField',
      sortField: 'createdAt',
      tooltip: { cn: '按创建日期排序', en: 'Sort by Date' },
      activeColor: 'red',
      inactiveColor: 'var(--text-primary, #000000)',
    },
    {
      type: 'toggle',
      label: { cn: '姓名排序', en: 'Sort by Name' },
      icon: <ArrowUpDown size={20} />,
      action: 'sortByField',
      sortField: 'name',
      tooltip: { cn: '按姓名排序', en: 'Sort by Name' },
      activeColor: 'red',
      inactiveColor: 'var(--text-primary, #000000)',
    },
  ],
});

export default createEnquireControlPanelConfig;