import { getVideoLabel, videoLabels, PAGE_TEXT as VIDEO_PAGE_TEXT } from "@/components/labels/video_labels";
import { getSystemLabel, createBasePageText } from "@/components/labels/system_labels";
import { ArrowUpDown } from 'lucide-react';
import { sortAlphabetically } from '@/utils/sortUtils';
import { ORIGINAL_SIZE_PRESET } from '@/components/pages/manager/constants/cardDisplayPresets';

// Placeholder import — create these utilities later
const createComprehensiveVideoExport = (data, isCn) => data;

/**
 * Video Fields Configuration
 */

export const getVideoFields = (lang = 'EN') => [
  { key: 'video_url', label: 'Video URL / 视频链接' },
  { key: 'tag_en', label: 'Tag (EN)' },
  { key: 'tag_cn', label: 'Tag (CN) / 标签' },
  { key: 'type', label: 'Type / 类型' },
  { key: 'caption_en', label: 'Caption (EN)' },
  { key: 'caption_cn', label: 'Caption (CN) / 说明' },
  { key: 'mark', label: 'Mark / 标记' },
  { key: 'tag_source', label: 'Tag Source / 标签来源' },
  { key: 'order', label: 'Order / 顺序' },
  { key: 'updatedAt', label: 'Updated At / 更新时间' },
];

export const getDeleteDialogFields = (lang = 'EN') => [
  { key: 'tag_en', label: 'Tag:' },
  { key: 'type', label: 'Type:' },
  { key: 'caption_en', label: 'Caption:' },
  { key: 'mark', label: 'Mark:' },
  { key: 'tag_source', label: 'Tag Source:' },
];

export const VIDEO_SORT_FIELDS = [
  'tag_en',
  'order',
];

export const VIDEO_SEARCH_FIELDS = [
  'tag_en',
  'tag_cn',
  'caption_en',
  'caption_cn',
];

export const getEmptyVideo = () => ({
  video_url: '',
  tag_en: '',
  tag_cn: '',
  type: '',
  caption_en: '',
  caption_cn: '',
  mark: '',
  tag_source: '',
  order: '',
  updatedAt: '',
});

export const COMPONENT_CONFIG = {
  DEBOUNCE_DELAY: 300,
  FUZZY_SEARCH_THRESHOLD: 3,
  MIN_MATCH_CHAR_LENGTH: 1,
  SESSION_STORAGE_PREFIX: 'video_edit_',
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
    'tag_en',
    'type',
    'caption_en',
    'mark',
    'tag_source',
  ],
  detailFields: [
    'video_url',
    'tag_cn',
    'caption_cn',
    'order',
    'updatedAt',
  ],
};

export const videoSchemaConfig = {
  title: "Video",
  schemaName: "video",

  api: {
    endpoint: "/api/video",
    deleteEndpoint: "/api/video",
    listEndpoint: "/api/video/list",
  },

  navigation: {
    createPath: "/manager/video/create",
    editPathTemplate: "/manager/video/{id}/edit",
  },

  dataConfig: {
    titleField: "tag_en",
    descriptionField: "caption_en",
    imageField: "video_url",

    alphabetFilterField: "tag_en",
    languageField: null,

    getFields: (lang) => getVideoFields(lang),
    getDeleteDialogFields: (lang) => getDeleteDialogFields(lang),
    getEmptyItem: () => getEmptyVideo(),

    sortFields: VIDEO_SORT_FIELDS,
    searchFields: VIDEO_SEARCH_FIELDS,
    fieldDisplayConfig: FIELD_DISPLAY_CONFIG,

    customSearch: (item, searchTerm, isCn) => {
      if (!searchTerm) return true;

      const term = searchTerm.toLowerCase().trim();

      const searchableFields = [
        item.tag_en,
        item.tag_cn,
        item.caption_en,
        item.caption_cn,
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
      { key: "tag_source", fields: ["tag_source"] },
      {
        key: "tag",
        fields: ["tag_en", "tag_cn"],
      },
    ],
    createControlPanelConfig: () => createVideoControlPanelConfig(),
  },

  exportConfig: {
    formatter: (data, isCn) => createComprehensiveVideoExport(data, isCn),
    filename: { EN: "video_export_en", CN: "video_export_cn" },
  },

  uiConfig: {
    defaultViewMode: VIEW_MODES.GRID,
    viewModes: VIEW_MODES,
    isArtistweb: false,
    debounceDelay: COMPONENT_CONFIG.DEBOUNCE_DELAY,
    ...ORIGINAL_SIZE_PRESET,
  },

  labels: {
    itemName: { EN: "Video", CN: "视频" },
    pageText: createBasePageText({
      createTooltip: {
        EN: "Create a new video",
        CN: "创建新视频",
      },
      export: {
        EN: "Export videos",
        CN: "导出视频",
        items: { EN: "videos", CN: "视频" },
      },
      emptyState: {
        noData: {
          EN: "No videos found",
          CN: "未找到视频",
        },
        noMatchingItems: {
          EN: "No videos match your search",
          CN: "没有匹配的视频",
        },
      },
      errors: {
        fetch: { EN: "Failed to load videos", CN: "加载视频失败" },
        create: { EN: "Failed to create video", CN: "创建视频失败" },
        update: { EN: "Failed to update video", CN: "更新视频失败" },
        delete: { EN: "Failed to delete video", CN: "删除视频失败" },
      },
      deleteDialog: {
        title: { EN: "Delete Video", CN: "删除视频" },
        message: { EN: "Are you sure you want to delete this video?", CN: "确定要删除此视频吗？" },
        confirm: { EN: "Delete", CN: "删除" },
        cancel: { EN: "Cancel", CN: "取消" },
      },
    }),
    getLabel: (key, lang) => {
      try {
        const fromVideo = getVideoLabel(key, lang);
        if (fromVideo !== key) return fromVideo;
      } catch (e) {
        // fall through to UI_TEXT / system labels
      }
      try {
        if (videoLabels?.UI_TEXT?.[key]) {
          return videoLabels.UI_TEXT[key][lang === "CN" ? "CN" : "EN"];
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
        route: '/manager/video/batch_edit',
      },
      {
        labelKey: 'exportData',
        action: 'export',
      },
    ],

    searchConfig: {
      placeholder: {
        EN: 'Search tags, captions...',
        CN: '搜索标签、说明...',
      },
      ariaLabel: {
        EN: 'Search videos',
        CN: '搜索视频',
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

export const createVideoControlPanelConfig = () => ({
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
      field: 'tag_source',
      label: { cn: '标签来源', en: 'Tag Source' },
      sortFunction: sortAlphabetically,
    },
  ],
  controls: [
    {
      type: 'toggle',
      label: { cn: '标签排序', en: 'Sort by Tag' },
      icon: <ArrowUpDown size={20} />,
      action: 'sortByField',
      sortField: 'tag_en',
      tooltip: { cn: '按标签排序', en: 'Sort by Tag' },
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

export default createVideoControlPanelConfig;
