import { artworkConfig } from "@/components/configs/artworkConfig";
import { createComprehensiveArtworkExport } from "@/components/pages/manager/utils/artworkExportUtils";
import { getArtworkLabel, artworkLabels, PAGE_TEXT as ARTWORK_PAGE_TEXT } from "@/components/labels/artwork_labels";
import { getSystemLabel, createBasePageText } from "@/components/labels/system_labels";
import { ArrowUpDown } from 'lucide-react';
import { sortAlphabetically } from '@/utils/sortUtils';
import { ORIGINAL_SIZE_PRESET } from '@/components/pages/manager/constants/cardDisplayPresets';

/**
 * Artwork Fields Configuration
 */

export const getArtworkFields = (lang = 'EN') => [
  { key: 'cover_img_url', label: 'Cover Image' },
  { key: 'artist', label: 'Artist / 艺术家' },
  { key: 'title', label: 'Title / 标题' },
  { key: 'type', label: 'Type / 类型' },
  { key: 'year', label: 'Year / 年份' },
  { key: 'mark', label: 'Mark / 标记' },

  { key: 'medium', label: 'Medium / 媒介' },
  { key: 'size', label: 'Size / 尺寸' },
  { key: 'series', label: 'Series / 系列' },
  { key: 'duration', label: 'Duration / 时长' },
  { key: 'caption', label: 'Caption / 说明' },
  { key: 'credits', label: 'Credits / 致谢' },
  { key: 'special_thanks', label: 'Special Thanks / 特别感谢' },
  { key: 'introduction', label: 'Introduction / 介绍', isArray: true },

  // ⬇️ 新增字段：关联画廊/展览
  { key: 'related_gallery_exhibition', label: 'Related Gallery/Exhibition / 关联画廊/展览', isArray: true },

  { key: 'video_url', label: 'Video URL / 视频链接' },
  { key: 'web_url', label: 'Web URL / 网页链接' },
  { key: 'work_value', label: 'Work Value / 作品价值' },
  { key: 'sold', label: 'Sold / 已售' },
  { key: 'order', label: 'Order / 顺序' },
  { key: 'language', label: 'Language / 语言' },

  { key: 'updatedAt', label: 'Updated At / 更新时间' },
];

export const getDeleteDialogFields = (lang = 'EN') => [
  { key: 'artist', label: 'Artist:' },
  { key: 'title', label: 'Title:' },
  { key: 'type', label: 'Type:' },
  { key: 'year', label: 'Year:' },
  { key: 'medium', label: 'Medium:' },
  { key: 'size', label: 'Size:' },
  { key: 'mark', label: 'Mark:' },
];

export const ARTWORK_SORT_FIELDS = [
  'title',
  'order',
];

export const ARTWORK_SEARCH_FIELDS = [
  'title',
  'artist',
  'medium',
  'series',
  'caption',
];

export const getEmptyArtwork = () => ({
  cover_img_url: '',
  artist: '',
  title: '',
  type: '',
  medium: '',
  year: '',
  size: '',
  series: '',
  caption: '',
  duration: '',
  credits: '',
  special_thanks: '',
  introduction: [],
  related_gallery_exhibition: [],   // ⬅️ 新增数组字段默认值
  video_url: '',
  web_url: '',
  work_value: '',
  sold: '',
  order: '',
  mark: '',
  language: '',
  updatedAt: '',
});

export const COMPONENT_CONFIG = {
  DEBOUNCE_DELAY: 300,
  FUZZY_SEARCH_THRESHOLD: 3,
  MIN_MATCH_CHAR_LENGTH: 1,
  SESSION_STORAGE_PREFIX: 'artwork_edit_',
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
    'title',
    'type',
    'year',
    'mark',
  ],
  detailFields: [
    'medium',
    'size',
    'series',
    'duration',
    'caption',
    'credits',
    'special_thanks',
    'introduction',
    'related_gallery_exhibition',   // ⬅️ 加入详情组
    'video_url',
    'web_url',
    'work_value',
    'sold',
    'order',
    'language',
    'updatedAt',
  ],
};

export const artworkSchemaConfig = {
  title: "Artwork",
  schemaName: "artwork",

  api: {
    endpoint: "/api/artwork",
    deleteEndpoint: artworkConfig?.api?.endpoints?.delete || "/api/artwork",
    listEndpoint: artworkConfig?.api?.endpoints?.list || "/api/artwork/list",
  },

  navigation: {
    createPath: "/manager/artwork/create",
    editPathTemplate: "/manager/artwork/{id}/edit",
  },

  dataConfig: {
    titleField: "title",
    descriptionField: "caption",
    imageField: "cover_img_url",

    alphabetFilterField: "title",
    languageField: "language",

    getFields: (lang) => getArtworkFields(lang),
    getDeleteDialogFields: (lang) => getDeleteDialogFields(lang),
    getEmptyItem: () => getEmptyArtwork(),

    sortFields: ARTWORK_SORT_FIELDS,
    searchFields: ARTWORK_SEARCH_FIELDS,
    fieldDisplayConfig: FIELD_DISPLAY_CONFIG,

    customSearch: (item, searchTerm, isCn) => {
      const itemLanguage = item.language?.toUpperCase()?.trim();
      const currentLanguage = isCn ? 'CN' : 'EN';

      // same as About: always filter by current language first
      if (itemLanguage && itemLanguage !== currentLanguage) {
        return false;
      }

      if (!searchTerm) return true;

      const term = searchTerm.toLowerCase().trim();

      const searchableFields = [
        item.title,
        item.artist,
        item.medium,
        item.series,
        item.caption,
      ];

      return searchableFields.some(
        (field) => field && String(field).toLowerCase().includes(term)
      );
    },
  },

  filterConfig: {
    values: FILTER_VALUES,
    filterFields: [
      { key: "mark", fields: ["mark"] },
      { key: "artist", fields: ["artist"] },
      { key: "type", fields: ["type"] },
      { key: "medium", fields: ["medium"] },
      { key: "series", fields: ["series"] },
      { key: "year", fields: ["year"] },
      { key: "sold", fields: ["sold"] },
    ],
    createControlPanelConfig: () => createArtworkControlPanelConfig(),
  },

  exportConfig: {
    formatter: (data, isCn) => createComprehensiveArtworkExport(data, isCn),
    filename: { EN: "artwork_export_en", CN: "artwork_export_cn" },
  },

  uiConfig: {
    defaultViewMode: VIEW_MODES.GRID,
    viewModes: VIEW_MODES,
    isArtistweb: false,
    debounceDelay: COMPONENT_CONFIG.DEBOUNCE_DELAY,
    ...ORIGINAL_SIZE_PRESET,
  },

  labels: {
    itemName: { EN: "Artwork", CN: "作品" },
    pageText: createBasePageText({
      createTooltip: ARTWORK_PAGE_TEXT.createTooltip,
      export: {
        ...ARTWORK_PAGE_TEXT.export,
        items: ARTWORK_PAGE_TEXT.export.artworks,
      },
      emptyState: {
        noData: ARTWORK_PAGE_TEXT.emptyState.noData,
        noMatchingItems: ARTWORK_PAGE_TEXT.emptyState.noMatchingArtworks,
      },
      errors: ARTWORK_PAGE_TEXT.errors,
      deleteDialog: ARTWORK_PAGE_TEXT.deleteDialog,
    }),
    getLabel: (key, lang) => {
      const fromArtwork = getArtworkLabel(key, lang);
      if (fromArtwork !== key) return fromArtwork;
      if (artworkLabels.UI_TEXT?.[key]) return artworkLabels.UI_TEXT[key][lang];
      return getSystemLabel(key, lang === "CN") ?? key;
    },
  },

  components: {
    actionButtons: [
      {
        labelKey: 'batch_edit',
        route: '/manager/artwork/batch_edit',
      },
      {
        labelKey: 'exportData',
        action: 'export',
      },
    ],

    searchConfig: {
      placeholder: {
        EN: 'Search title, artist, medium, series...',
        CN: '搜索标题、艺术家、媒介、系列...',
      },
      ariaLabel: {
        EN: 'Search artworks',
        CN: '搜索作品',
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

export const createArtworkControlPanelConfig = () => ({
  filters: [
    {
      field: 'mark',
      label: { cn: '标记', en: 'Mark' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'artist',
      label: { cn: '艺术家', en: 'Artist' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'type',
      label: { cn: '类型', en: 'Type' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'medium',
      label: { cn: '媒介', en: 'Medium' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'series',
      label: { cn: '系列', en: 'Series' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'year',
      label: { cn: '年份', en: 'Year' },
      sortFunction: (a, b) => Number(b) - Number(a),
    },
    {
      field: 'sold',
      label: { cn: '已售', en: 'Sold' },
      sortFunction: sortAlphabetically,
    },
  ],
  controls: [
    {
      type: 'toggle',
      label: { cn: '标题排序', en: 'Sort by Title' },
      icon: <ArrowUpDown size={20} />,
      action: 'sortByField',
      sortField: 'title',
      tooltip: { cn: '按标题排序', en: 'Sort by Title' },
      activeColor: 'red',
      inactiveColor: 'var(--text-primary, #000000)',
    },
    {
      type: 'toggle',
      label: { cn: '顺序排序', en: 'Sort by Order' },
      icon: <ArrowUpDown size={20} />,
      action: 'sortByField',
      sortField: 'order',
      tooltip: { cn: '按顺序排序', en: 'Sort by Order' },
      activeColor: 'red',
      inactiveColor: 'var(--text-primary, #000000)',
    },
  ],
});

export default createArtworkControlPanelConfig;