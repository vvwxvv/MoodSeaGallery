import { createComprehensiveAboutExport } from "@/components/pages/manager/utils/aboutExportUtils";
import { getAboutLabel, aboutLabels, PAGE_TEXT as ABOUT_PAGE_TEXT } from "@/components/labels/about_labels";
import { getSystemLabel, createBasePageText } from "@/components/labels/system_labels";
import { ArrowUpDown } from 'lucide-react';
import { sortAlphabetically } from '@/utils/sortUtils';
import { ORIGINAL_SIZE_PRESET } from '@/components/pages/manager/constants/cardDisplayPresets';

/**
 * About Fields Configuration
 */

export const getAboutFields = (lang = 'EN') => [
  { key: 'portrait_image_url', label: 'Portrait Image' },
  { key: 'artist', label: 'Artist / 艺术家' },
  { key: 'caption', label: 'Caption / 说明' },
  { key: 'introduction', label: 'Introduction / 介绍', isArray: true },
  { key: 'pdf_url', label: 'PDF URL / PDF链接' },           // 新增
  { key: 'web_url', label: 'Website URL / 网页链接' },       // 新增
  { key: 'order', label: 'Order / 顺序' },
  { key: 'mark', label: 'Mark / 标记' },
  { key: 'language', label: 'Language / 语言' },
  { key: 'updatedAt', label: 'Updated At / 更新时间' },
];

export const getDeleteDialogFields = (lang = 'EN') => [
  { key: 'artist', label: 'Artist:' },
  { key: 'caption', label: 'Caption:' },
  { key: 'mark', label: 'Mark:' },
  { key: 'language', label: 'Language:' },
];

export const ABOUT_SORT_FIELDS = [
  'artist',
  'order',
];

export const ABOUT_SEARCH_FIELDS = [
  'artist',
  'caption',
];

export const getEmptyAbout = () => ({
  portrait_image_url: '',
  artist: '',
  caption: '',
  introduction: [],
  pdf_url: '',   // 新增
  web_url: '',   // 新增
  order: '',
  mark: '',
  language: '',
  updatedAt: '',
});

export const COMPONENT_CONFIG = {
  DEBOUNCE_DELAY: 300,
  FUZZY_SEARCH_THRESHOLD: 3,
  MIN_MATCH_CHAR_LENGTH: 1,
  SESSION_STORAGE_PREFIX: 'about_edit_',
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
    'artist',
    'caption',
    'mark',
  ],
  detailFields: [
    'introduction',
    'pdf_url',      // 新增
    'web_url',      // 新增
    'order',
    'language',
    'updatedAt',
  ],
};

export const aboutSchemaConfig = {
  title: "About",
  schemaName: "about",

  api: {
    endpoint: "/api/about",
    deleteEndpoint: "/api/about",
    listEndpoint: "/api/about/list",
  },

  navigation: {
    createPath: "/manager/about/create",
    editPathTemplate: "/manager/about/{id}/edit",
  },

  dataConfig: {
    titleField: "artist",
    descriptionField: "caption",
    imageField: "portrait_image_url",

    alphabetFilterField: "artist",
    languageField: "language",

    getFields: (lang) => getAboutFields(lang),
    getDeleteDialogFields: (lang) => getDeleteDialogFields(lang),
    getEmptyItem: () => getEmptyAbout(),

    sortFields: ABOUT_SORT_FIELDS,
    searchFields: ABOUT_SEARCH_FIELDS,
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
        item.artist,
        item.caption,
        // 若希望支持搜索 URL，可取消注释：
        // item.pdf_url,
        // item.web_url,
      ];

      return searchableFields.some(
        (field) => field && String(field).toLowerCase().includes(term)
      );
    },
  },

  filterConfig: {
    values: FILTER_VALUES,
    filterFields: [
      { key: "artist", fields: ["artist"] },
      { key: "mark", fields: ["mark"] },
    ],
    createControlPanelConfig: () => createAboutControlPanelConfig(),
  },

  exportConfig: {
    formatter: (data, isCn) => createComprehensiveAboutExport(data, isCn),
    filename: { EN: "about_export_en", CN: "about_export_cn" },
  },

  uiConfig: {
    defaultViewMode: VIEW_MODES.GRID,
    viewModes: VIEW_MODES,
    isArtistweb: false,
    debounceDelay: COMPONENT_CONFIG.DEBOUNCE_DELAY,
    ...ORIGINAL_SIZE_PRESET,
  },

  labels: {
    itemName: { EN: "About", CN: "关于" },
    pageText: createBasePageText({
      createTooltip: ABOUT_PAGE_TEXT.createTooltip,
      export: {
        ...ABOUT_PAGE_TEXT.export,
        items: ABOUT_PAGE_TEXT.export.abouts,
      },
      emptyState: {
        noData: ABOUT_PAGE_TEXT.emptyState.noData,
        noMatchingItems: ABOUT_PAGE_TEXT.emptyState.noMatchingAbouts,
      },
      errors: ABOUT_PAGE_TEXT.errors,
      deleteDialog: ABOUT_PAGE_TEXT.deleteDialog,
    }),
    getLabel: (key, lang) => {
      const fromAbout = getAboutLabel(key, lang);
      if (fromAbout !== key) return fromAbout;
      if (aboutLabels.UI_TEXT?.[key]) return aboutLabels.UI_TEXT[key][lang];
      return getSystemLabel(key, lang === "CN") ?? key;
    },
  },

  components: {
    actionButtons: [
      {
        labelKey: 'batch_edit',
        route: '/manager/about/batch_edit',
      },
      {
        labelKey: 'exportData',
        action: 'export',
      },
    ],

    searchConfig: {
      placeholder: {
        EN: 'Search artist, caption...',
        CN: '搜索艺术家、说明...',
      },
      ariaLabel: {
        EN: 'Search about entries',
        CN: '搜索关于条目',
      },

      selectConfig: {
        filterKey: 'artist',
        placeholder: {
          EN: 'All Artists',
          CN: '全部艺术家',
        },
        ariaLabel: {
          EN: 'Select artist',
          CN: '选择艺术家',
        },
        allLabel: {
          EN: 'All Artists',
          CN: '全部艺术家',
        },
      },
    },
  },
};

export const createAboutControlPanelConfig = () => ({
  filters: [
    {
      field: 'artist',
      label: { cn: '艺术家', en: 'Artist' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'mark',
      label: { cn: '标记', en: 'Mark' },
      sortFunction: sortAlphabetically,
    },
  ],
  controls: [
    {
      type: 'toggle',
      label: { cn: '艺术家排序', en: 'Sort by Artist' },
      icon: <ArrowUpDown size={20} />,
      action: 'sortByField',
      sortField: 'artist',
      tooltip: { cn: '按艺术家排序', en: 'Sort by Artist' },
      activeColor: 'red',
      inactiveColor: 'var(--text-primary, #000000)',
    },
  ],
});

export default createAboutControlPanelConfig;