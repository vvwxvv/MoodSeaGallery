import { createComprehensiveEventExport } from "@/components/pages/manager/utils/eventExportUtils";
import { getEventLabel, eventLabels, PAGE_TEXT as EVENT_PAGE_TEXT } from "@/components/labels/event_labels";
import { getSystemLabel, createBasePageText } from "@/components/labels/system_labels";
import { ArrowUpDown } from 'lucide-react';
import { sortAlphabetically } from '@/utils/sortUtils';
import { ORIGINAL_SIZE_PRESET } from '@/components/pages/manager/constants/cardDisplayPresets';

/**
 * Event Fields Configuration
 * Matches Moodsea Event Prisma model
 */

export const getEventFields = (lang = 'EN') => [
  { key: 'cover_img_url', label: 'Cover Image' },
  { key: 'title', label: 'Title / 标题' },
  { key: 'subtitle', label: 'Subtitle / 副标题' },
  { key: 'year', label: 'Year / 年份' },
  { key: 'date_time', label: 'Date & Time / 日期时间' },
  { key: 'type', label: 'Type / 类型' },
  { key: 'host', label: 'Host / 主办方' },
  { key: 'support', label: 'Support / 支持方' },
  { key: 'special_thanks', label: 'Special Thanks / 特别感谢' },
  { key: 'venue', label: 'Venue / 场馆' },
  { key: 'address', label: 'Address / 地址' },
  { key: 'caption', label: 'Caption / 说明' },
  { key: 'introduction', label: 'Introduction / 介绍', isArray: true },
  { key: 'related_artist', label: 'Related Artists / 相关艺术家', isArray: true },
  { key: 'web_url', label: 'Web URL / 网页链接' },
  { key: 'video_url', label: 'Video URL / 视频链接' },
  { key: 'mark', label: 'Mark / 标记' },
  { key: 'order', label: 'Order / 顺序' },
  { key: 'language', label: 'Language / 语言' },
  { key: 'updatedAt', label: 'Updated At / 更新时间' },
];

export const getDeleteDialogFields = (lang = 'EN') => [
  { key: 'title', label: 'Title:' },
  { key: 'type', label: 'Type:' },
  { key: 'year', label: 'Year:' },
  { key: 'subtitle', label: 'Subtitle:' },
  { key: 'date_time', label: 'Date & Time:' },
  { key: 'venue', label: 'Venue:' },
  { key: 'mark', label: 'Mark:' },
];

export const EVENT_SORT_FIELDS = [
  'title',
  'order',
];

export const EVENT_SEARCH_FIELDS = [
  'title',
  'host',
  'venue',
  'caption',
];

export const getEmptyEvent = () => ({
  cover_img_url: '',
  title: '',
  subtitle: '',
  year: '',
  date_time: '',
  type: '',
  host: '',
  support: '',
  special_thanks: '',
  venue: '',
  address: '',
  caption: '',
  introduction: [],
  related_artist: [],
  web_url: '',
  video_url: '',
  mark: '',
  order: '',
  language: '',
  updatedAt: '',
});

export const COMPONENT_CONFIG = {
  DEBOUNCE_DELAY: 300,
  FUZZY_SEARCH_THRESHOLD: 3,
  MIN_MATCH_CHAR_LENGTH: 1,
  SESSION_STORAGE_PREFIX: 'event_edit_',
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
    'mark',
  ],
  detailFields: [
    'subtitle',
    'date_time',
    'host',
    'support',
    'special_thanks',
    'address',
    'caption',
    'introduction',
    'related_artist',
    'web_url',
    'video_url',
    'order',
    'language',
    'updatedAt',
  ],
};

export const eventSchemaConfig = {
  title: "Event",
  schemaName: "event",

  api: {
    endpoint: "/api/event",
    deleteEndpoint: "/api/event",
    listEndpoint: "/api/event/list",
  },

  navigation: {
    createPath: "/manager/event/create",
    editPathTemplate: "/manager/event/{id}/edit",
  },

  dataConfig: {
    titleField: "title",
    descriptionField: "caption",
    imageField: "cover_img_url",

    alphabetFilterField: "title",
    languageField: "language",

    getFields: (lang) => getEventFields(lang),
    getDeleteDialogFields: (lang) => getDeleteDialogFields(lang),
    getEmptyItem: () => getEmptyEvent(),

    sortFields: EVENT_SORT_FIELDS,
    searchFields: EVENT_SEARCH_FIELDS,
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
        item.type,
        item.host,
        item.support,
        item.venue,
        item.address,
        item.caption,
        item.mark,
        item.web_url,
      ];

      const introductionMatch =
        Array.isArray(item.introduction) &&
        item.introduction.some(
          (line) => line && String(line).toLowerCase().includes(term)
        );
      const relatedMatch =
        Array.isArray(item.related_artist) &&
        item.related_artist.some(
          (line) => line && String(line).toLowerCase().includes(term)
        );

      return (
        searchableFields.some(
          (field) => field && String(field).toLowerCase().includes(term)
        ) ||
        introductionMatch ||
        relatedMatch
      );
    },
  },

  filterConfig: {
    values: FILTER_VALUES,
    filterFields: [
      { key: "type", fields: ["type"] },
      { key: "year", fields: ["year"] },
      { key: "subtitle", fields: ["subtitle"] },
      { key: "date_time", fields: ["date_time"] },
      { key: "host", fields: ["host"] },
      { key: "support", fields: ["support"] },
      { key: "special_thanks", fields: ["special_thanks"] },
      { key: "mark", fields: ["mark"] },
      { key: "order", fields: ["order"] },
    ],
    createControlPanelConfig: () => createEventControlPanelConfig(),
  },

  exportConfig: {
    formatter: (data, isCn) => createComprehensiveEventExport(data, isCn),
    filename: { EN: "event_export_en", CN: "event_export_cn" },
  },

  uiConfig: {
    defaultViewMode: VIEW_MODES.GRID,
    viewModes: VIEW_MODES,
    isArtistweb: false,
    debounceDelay: COMPONENT_CONFIG.DEBOUNCE_DELAY,
    ...ORIGINAL_SIZE_PRESET,
  },

  labels: {
    itemName: { EN: "Event", CN: "活动" },
    pageText: createBasePageText({
      createTooltip: EVENT_PAGE_TEXT.createTooltip,
      export: {
        ...EVENT_PAGE_TEXT.export,
        items: EVENT_PAGE_TEXT.export.events,
      },
      emptyState: {
        noData: EVENT_PAGE_TEXT.emptyState.noData,
        noMatchingItems: EVENT_PAGE_TEXT.emptyState.noMatchingEvents,
      },
      errors: EVENT_PAGE_TEXT.errors,
      deleteDialog: EVENT_PAGE_TEXT.deleteDialog,
    }),
    getLabel: (key, lang) => {
      const fromEvent = getEventLabel(key, lang);
      if (fromEvent !== key) return fromEvent;
      if (eventLabels.UI_TEXT?.[key]) return eventLabels.UI_TEXT[key][lang];
      return getSystemLabel(key, lang === "CN") ?? key;
    },
  },

  components: {
    actionButtons: [
      {
        labelKey: 'batch_edit',
        route: '/manager/event/batch_edit',
      },
      {
        labelKey: 'exportData',
        action: 'export',
      },
    ],

    searchConfig: {
      placeholder: {
        EN: 'Search title,host, venue...',
        CN: '搜索标题、主办方、场馆...',
      },
      ariaLabel: {
        EN: 'Search events',
        CN: '搜索活动',
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

export const createEventControlPanelConfig = () => ({
  filters: [
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
      field: 'subtitle',
      label: { cn: '副标题', en: 'Subtitle' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'date_time',
      label: { cn: '日期时间', en: 'Date & Time' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'host',
      label: { cn: '主办方', en: 'Host' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'support',
      label: { cn: '支持方', en: 'Support' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'special_thanks',
      label: { cn: '特别感谢', en: 'Special Thanks' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'mark',
      label: { cn: '标记', en: 'Mark' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'order',
      label: { cn: '顺序', en: 'Order' },
      sortFunction: sortAlphabetically,
    },
  ],
  controls: [
    {
      type: 'toggle',
      label: { cn: '按年份排序', en: 'Sort by Year' },
      icon: <ArrowUpDown size={20} />,
      action: 'sortByField',
      sortField: 'year',
      tooltip: { cn: '按年份排序', en: 'Sort by Year' },
      activeColor: 'red',
      inactiveColor: 'var(--text-primary, #000000)',
    },
  ],
});

export default createEventControlPanelConfig;
