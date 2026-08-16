import { getFairLabel, fairLabels, PAGE_TEXT as FAIR_PAGE_TEXT } from "@/components/labels/fair_labels";
import { getSystemLabel, createBasePageText } from "@/components/labels/system_labels";
import { ArrowUpDown } from 'lucide-react';
import { sortAlphabetically } from '@/utils/sortUtils';
import { ORIGINAL_SIZE_PRESET } from '@/components/pages/manager/constants/cardDisplayPresets';

// Placeholder import — create these utilities later
const createComprehensiveFairExport = (data, isCn) => data;

/**
 * Fair Fields Configuration
 */

export const getFairFields = (lang = 'EN') => [
  { key: 'cover_img_url', label: 'Cover Image' },
  { key: 'title', label: 'Title / 标题' },
  { key: 'section', label: 'Section / 板块' },
  { key: 'type', label: 'Type / 类型' },
  { key: 'date_start', label: 'Date Start / 开始日期' },
  { key: 'date_end', label: 'Date End / 结束日期' },
  { key: 'vip_preview_date', label: 'VIP Preview Date / VIP预览日期' },
  { key: 'year', label: 'Year / 年份' },
  { key: 'booth', label: 'Booth / 展位' },
  { key: 'venue', label: 'Venue / 场馆' },
  { key: 'location', label: 'Location / 地点' },
  { key: 'organiser', label: 'Organiser / 主办方' },
  { key: 'curator', label: 'Curator / 策展人' },
  { key: 'participating_artists', label: 'Participating Artists / 参展艺术家' },
  { key: 'caption', label: 'Caption / 说明' },
  { key: 'press_release', label: 'Press Release / 新闻稿', isArray: true },
  { key: 'related_artwork_title', label: 'Related Artwork Titles / 相关作品', isArray: true },
  { key: 'related_gallery_artist', label: 'Related Gallery Artists / 相关画廊艺术家', isArray: true },
  { key: 'web_url', label: 'Web URL / 网页链接' },
  { key: 'video_url', label: 'Video URL / 视频链接' },
  { key: 'language', label: 'Language / 语言' },
  { key: 'order', label: 'Order / 顺序' },
  { key: 'mark', label: 'Mark / 标记' },
  { key: 'status', label: 'Status / 状态' },
  { key: 'updatedAt', label: 'Updated At / 更新时间' },
];

export const getDeleteDialogFields = (lang = 'EN') => [
  { key: 'title', label: 'Title:' },
  { key: 'type', label: 'Type:' },
  { key: 'year', label: 'Year:' },
  { key: 'venue', label: 'Venue:' },
  { key: 'organiser', label: 'Organiser:' },
  { key: 'mark', label: 'Mark:' },
  { key: 'status', label: 'Status:' },
];

export const FAIR_SORT_FIELDS = [
  'title',
  'year',
  'order',
];

export const FAIR_SEARCH_FIELDS = [
  'title',
  'section',
  'curator',
  'venue',
  'organiser',
  'caption',
];

export const getEmptyFair = () => ({
  cover_img_url: '',
  title: '',
  section: '',
  type: '',
  date_start: '',
  date_end: '',
  vip_preview_date: '',
  year: '',
  booth: '',
  venue: '',
  location: '',
  organiser: '',
  curator: '',
  participating_artists: '',
  caption: '',
  press_release: [],
  related_artwork_title: [],
  related_gallery_artist: [],
  web_url: '',
  video_url: '',
  language: '',
  order: '',
  mark: '',
  status: '',
  updatedAt: '',
});

export const COMPONENT_CONFIG = {
  DEBOUNCE_DELAY: 300,
  FUZZY_SEARCH_THRESHOLD: 3,
  MIN_MATCH_CHAR_LENGTH: 1,
  SESSION_STORAGE_PREFIX: 'fair_edit_',
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
    'title',
    'type',
    'year',
    'venue',
    'status',
    'mark',
  ],
  detailFields: [
    'section',
    'date_start',
    'date_end',
    'vip_preview_date',
    'booth',
    'location',
    'organiser',
    'curator',
    'participating_artists',
    'caption',
    'press_release',
    'related_artwork_title',
    'related_gallery_artist',
    'web_url',
    'video_url',
    'language',
    'order',
    'updatedAt',
  ],
};

export const fairSchemaConfig = {
  title: "Fair",
  schemaName: "fair",

  api: {
    endpoint: "/api/fair",
    deleteEndpoint: "/api/fair",
    listEndpoint: "/api/fair/list",
  },

  navigation: {
    createPath: "/manager/fair/create",
    editPathTemplate: "/manager/fair/{id}/edit",
  },

  dataConfig: {
    titleField: "title",
    descriptionField: "caption",
    imageField: "cover_img_url",

    alphabetFilterField: "title",
    languageField: "language",

    getFields: (lang) => getFairFields(lang),
    getDeleteDialogFields: (lang) => getDeleteDialogFields(lang),
    getEmptyItem: () => getEmptyFair(),

    sortFields: FAIR_SORT_FIELDS,
    searchFields: FAIR_SEARCH_FIELDS,
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
        item.title,
        item.section,
        item.curator,
        item.venue,
        item.organiser,
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
      { key: "type", fields: ["type"] },
      { key: "year", fields: ["year"] },
      { key: "venue", fields: ["venue"] },
      { key: "status", fields: ["status"] },
      { key: "section", fields: ["section"] },
    ],
    createControlPanelConfig: () => createFairControlPanelConfig(),
  },

  exportConfig: {
    formatter: (data, isCn) => createComprehensiveFairExport(data, isCn),
    filename: { EN: "fair_export_en", CN: "fair_export_cn" },
  },

  uiConfig: {
    defaultViewMode: VIEW_MODES.GRID,
    viewModes: VIEW_MODES,
    isArtistweb: false,
    debounceDelay: COMPONENT_CONFIG.DEBOUNCE_DELAY,
    ...ORIGINAL_SIZE_PRESET,
  },

  labels: {
    itemName: { EN: "Fair", CN: "博览会" },
    pageText: createBasePageText({
      createTooltip: {
        EN: "Create a new fair",
        CN: "创建新博览会",
      },
      export: {
        EN: "Export fairs",
        CN: "导出博览会",
        items: { EN: "fairs", CN: "博览会" },
      },
      emptyState: {
        noData: {
          EN: "No fairs found",
          CN: "未找到博览会",
        },
        noMatchingItems: {
          EN: "No fairs match your search",
          CN: "没有匹配的博览会",
        },
      },
      errors: {
        fetch: { EN: "Failed to load fairs", CN: "加载博览会失败" },
        create: { EN: "Failed to create fair", CN: "创建博览会失败" },
        update: { EN: "Failed to update fair", CN: "更新博览会失败" },
        delete: { EN: "Failed to delete fair", CN: "删除博览会失败" },
      },
      deleteDialog: {
        title: { EN: "Delete Fair", CN: "删除博览会" },
        message: { EN: "Are you sure you want to delete this fair?", CN: "确定要删除此博览会吗？" },
        confirm: { EN: "Delete", CN: "删除" },
        cancel: { EN: "Cancel", CN: "取消" },
      },
    }),
    getLabel: (key, lang) => {
      try {
        const fromFair = getFairLabel(key, lang);
        if (fromFair !== key) return fromFair;
      } catch (e) {
        // fall through to UI_TEXT / system labels
      }
      try {
        if (fairLabels?.UI_TEXT?.[key]) {
          return fairLabels.UI_TEXT[key][lang === "CN" ? "CN" : "EN"];
        }
      } catch (e) {
        // fall through
      }
      return getSystemLabel(key, lang === "CN") ?? key;
    },
  },

  components: {
    actionButtons: [
      {
        labelKey: 'batch_edit',
        route: '/manager/fair/batch_edit',
      },
      {
        labelKey: 'exportData',
        action: 'export',
      },
    ],

    searchConfig: {
      placeholder: {
        EN: 'Search title, curator, venue, organiser...',
        CN: '搜索标题、策展人、场馆、主办方...',
      },
      ariaLabel: {
        EN: 'Search fairs',
        CN: '搜索博览会',
      },

      selectConfig: {
        filterKey: 'type',
        placeholder: {
          EN: 'All Types',
          CN: '全部类型',
        },
        ariaLabel: {
          EN: 'Select type',
          CN: '选择类型',
        },
        allLabel: {
          EN: 'All Types',
          CN: '全部类型',
        },
      },
    },
  },
};

export const createFairControlPanelConfig = () => ({
  filters: [
    {
      field: 'mark',
      label: { cn: '标记', en: 'Mark' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'type',
      label: { cn: '类型', en: 'Type' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'year',
      label: { cn: '年份', en: 'Year' },
      sortFunction: (a, b) => Number(b) - Number(a),
    },
    {
      field: 'venue',
      label: { cn: '场馆', en: 'Venue' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'status',
      label: { cn: '状态', en: 'Status' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'section',
      label: { cn: '板块', en: 'Section' },
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
      label: { cn: '年份排序', en: 'Sort by Year' },
      icon: <ArrowUpDown size={20} />,
      action: 'sortByField',
      sortField: 'year',
      tooltip: { cn: '按年份排序', en: 'Sort by Year' },
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

export default createFairControlPanelConfig;