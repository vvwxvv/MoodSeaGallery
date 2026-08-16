import { getExhibitionLabel, exhibitionLabels, PAGE_TEXT as EXHIBITION_PAGE_TEXT } from "@/components/labels/exhibition_labels";
import { getSystemLabel, createBasePageText } from "@/components/labels/system_labels";
import { ArrowUpDown } from 'lucide-react';
import { sortAlphabetically } from '@/utils/sortUtils';
import { ORIGINAL_SIZE_PRESET } from '@/components/pages/manager/constants/cardDisplayPresets';

// Placeholder import — create these utilities later
const createComprehensiveExhibitionExport = (data, isCn) => data;

/**
 * Exhibition Fields Configuration
 */

export const getExhibitionFields = (lang = 'EN') => [
  { key: 'cover_img_url', label: 'Cover Image' },
  { key: 'title', label: 'Title / 标题' },
  { key: 'subtitle', label: 'Subtitle / 副标题' },
  { key: 'type', label: 'Type / 类型' },
  { key: 'date_start', label: 'Date Start / 开始日期' },
  { key: 'date_end', label: 'Date End / 结束日期' },
  { key: 'opening_date', label: 'Opening Date / 开幕日期' },
  { key: 'year', label: 'Year / 年份' },
  { key: 'venue', label: 'Venue / 场地' },
  { key: 'location', label: 'Location / 地点' },
  { key: 'curator', label: 'Curator / 策展人' },
  { key: 'organiser', label: 'Organiser / 主办方' },
  { key: 'participating_artists', label: 'Participating Artists / 参展艺术家' },
  { key: 'caption', label: 'Caption / 说明' },
  { key: 'description', label: 'Description / 描述' },
  { key: 'introduction', label: 'Introduction / 介绍', isArray: true },
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
  { key: 'curator', label: 'Curator:' },
  { key: 'mark', label: 'Mark:' },
  { key: 'status', label: 'Status:' },
];

export const EXHIBITION_SORT_FIELDS = [
  'title',
  'year',
  'order',
];

export const EXHIBITION_SEARCH_FIELDS = [
  'title',
  'subtitle',
  'curator',
  'venue',
  'caption',
  'description',
];

export const getEmptyExhibition = () => ({
  cover_img_url: '',
  title: '',
  subtitle: '',
  type: '',
  date_start: '',
  date_end: '',
  opening_date: '',
  year: '',
  venue: '',
  location: '',
  curator: '',
  organiser: '',
  participating_artists: '',
  caption: '',
  description: '',
  introduction: [],
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
  SESSION_STORAGE_PREFIX: 'exhibition_edit_',
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
    'subtitle',
    'date_start',
    'date_end',
    'opening_date',
    'location',
    'curator',
    'organiser',
    'participating_artists',
    'caption',
    'description',
    'introduction',
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

export const exhibitionSchemaConfig = {
  title: "Exhibition",
  schemaName: "exhibition",

  api: {
    endpoint: "/api/exhibition",
    deleteEndpoint: "/api/exhibition",
    listEndpoint: "/api/exhibition/list",
  },

  navigation: {
    createPath: "/manager/exhibition/create",
    editPathTemplate: "/manager/exhibition/{id}/edit",
  },

  dataConfig: {
    titleField: "title",
    descriptionField: "caption",
    imageField: "cover_img_url",

    alphabetFilterField: "title",
    languageField: "language",

    getFields: (lang) => getExhibitionFields(lang),
    getDeleteDialogFields: (lang) => getDeleteDialogFields(lang),
    getEmptyItem: () => getEmptyExhibition(),

    sortFields: EXHIBITION_SORT_FIELDS,
    searchFields: EXHIBITION_SEARCH_FIELDS,
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
        item.subtitle,
        item.curator,
        item.venue,
        item.caption,
        item.description,
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
    ],
    createControlPanelConfig: () => createExhibitionControlPanelConfig(),
  },

  exportConfig: {
    formatter: (data, isCn) => createComprehensiveExhibitionExport(data, isCn),
    filename: { EN: "exhibition_export_en", CN: "exhibition_export_cn" },
  },

  uiConfig: {
    defaultViewMode: VIEW_MODES.GRID,
    viewModes: VIEW_MODES,
    isArtistweb: false,
    debounceDelay: COMPONENT_CONFIG.DEBOUNCE_DELAY,
    ...ORIGINAL_SIZE_PRESET,
  },

  labels: {
    itemName: { EN: "Exhibition", CN: "展览" },
    pageText: createBasePageText({
      createTooltip: {
        EN: "Create a new exhibition",
        CN: "创建新展览",
      },
      export: {
        EN: "Export exhibitions",
        CN: "导出展览",
        items: { EN: "exhibitions", CN: "展览" },
      },
      emptyState: {
        noData: {
          EN: "No exhibitions found",
          CN: "未找到展览",
        },
        noMatchingItems: {
          EN: "No exhibitions match your search",
          CN: "没有匹配的展览",
        },
      },
      errors: {
        fetch: { EN: "Failed to load exhibitions", CN: "加载展览失败" },
        create: { EN: "Failed to create exhibition", CN: "创建展览失败" },
        update: { EN: "Failed to update exhibition", CN: "更新展览失败" },
        delete: { EN: "Failed to delete exhibition", CN: "删除展览失败" },
      },
      deleteDialog: {
        title: { EN: "Delete Exhibition", CN: "删除展览" },
        message: { EN: "Are you sure you want to delete this exhibition?", CN: "确定要删除此展览吗？" },
        confirm: { EN: "Delete", CN: "删除" },
        cancel: { EN: "Cancel", CN: "取消" },
      },
    }),
    getLabel: (key, lang) => {
      try {
        const fromExhibition = getExhibitionLabel(key, lang);
        if (fromExhibition !== key) return fromExhibition;
      } catch (e) {
        // fall through to UI_TEXT / system labels
      }
      try {
        if (exhibitionLabels?.UI_TEXT?.[key]) {
          return exhibitionLabels.UI_TEXT[key][lang === "CN" ? "CN" : "EN"];
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
        route: '/manager/exhibition/batch_edit',
      },
      {
        labelKey: 'exportData',
        action: 'export',
      },
    ],

    searchConfig: {
      placeholder: {
        EN: 'Search title, curator, venue, description...',
        CN: '搜索标题、策展人、场地、描述...',
      },
      ariaLabel: {
        EN: 'Search exhibitions',
        CN: '搜索展览',
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

export const createExhibitionControlPanelConfig = () => ({
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
      label: { cn: '场地', en: 'Venue' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'status',
      label: { cn: '状态', en: 'Status' },
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

export default createExhibitionControlPanelConfig;
