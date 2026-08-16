import { getWritingLabel, writingLabels, PAGE_TEXT as WRITING_PAGE_TEXT } from "@/components/labels/writing_labels";
import { getSystemLabel, createBasePageText } from "@/components/labels/system_labels";
import { ArrowUpDown } from 'lucide-react';
import { sortAlphabetically } from '@/utils/sortUtils';
import { ORIGINAL_SIZE_PRESET } from '@/components/pages/manager/constants/cardDisplayPresets';

// Placeholder import — create these utilities later
const createComprehensiveWritingExport = (data, isCn) => data;

/**
 * Writing Fields Configuration
 */

export const getWritingFields = (lang = 'EN') => [
  { key: 'cover_img_url', label: 'Cover Image' },
  { key: 'title', label: 'Title / 标题' },
  { key: 'subtitle', label: 'Subtitle / 副标题' },
  { key: 'author', label: 'Author / 作者' },
  { key: 'type', label: 'Type / 类型' },
  { key: 'category', label: 'Category / 分类' },
  { key: 'year', label: 'Year / 年份' },
  { key: 'summary', label: 'Summary / 概要' },
  { key: 'keywords', label: 'Keywords / 关键词' },
  { key: 'tag', label: 'Tag / 标签' },
  { key: 'paragraphs', label: 'Paragraphs / 段落', isArray: true },
  { key: 'caption', label: 'Caption / 说明' },
  { key: 'status', label: 'Status / 状态' },
  { key: 'mark', label: 'Mark / 标记' },
  { key: 'language', label: 'Language / 语言' },
  { key: 'createdAt', label: 'Created At / 创建时间' },
  { key: 'updatedAt', label: 'Updated At / 更新时间' },
];

export const getDeleteDialogFields = (lang = 'EN') => [
  { key: 'title', label: 'Title:' },
  { key: 'author', label: 'Author:' },
  { key: 'type', label: 'Type:' },
  { key: 'category', label: 'Category:' },
  { key: 'year', label: 'Year:' },
  { key: 'mark', label: 'Mark:' },
  { key: 'status', label: 'Status:' },
];

export const WRITING_SORT_FIELDS = [
  'title',
  'year',
  'order',
];

export const WRITING_SEARCH_FIELDS = [
  'title',
  'subtitle',
  'author',
  'summary',
  'keywords',
];

export const getEmptyWriting = () => ({
  cover_img_url: '',
  author: '',
  title: '',
  subtitle: '',
  summary: '',
  keywords: '',
  category: '',
  type: '',
  year: '',
  paragraphs: [],
  caption: '',
  status: '',
  mark: '',
  tag: '',
  language: '',
  createdAt: '',
  updatedAt: '',
});

export const COMPONENT_CONFIG = {
  DEBOUNCE_DELAY: 300,
  FUZZY_SEARCH_THRESHOLD: 3,
  MIN_MATCH_CHAR_LENGTH: 1,
  SESSION_STORAGE_PREFIX: 'writing_edit_',
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
    'author',
    'type',
    'category',
    'year',
    'status',
    'mark',
  ],
  detailFields: [
    'subtitle',
    'summary',
    'keywords',
    'tag',
    'paragraphs',
    'caption',
    'language',
    'createdAt',
    'updatedAt',
  ],
};

export const writingSchemaConfig = {
  title: "Writing",
  schemaName: "writing",

  api: {
    endpoint: "/api/writing",
    deleteEndpoint: "/api/writing",
    listEndpoint: "/api/writing/list",
  },

  navigation: {
    createPath: "/manager/writing/create",
    editPathTemplate: "/manager/writing/{id}/edit",
  },

  dataConfig: {
    titleField: "title",
    descriptionField: "subtitle",
    imageField: "cover_img_url",

    alphabetFilterField: "title",
    languageField: "language",

    getFields: (lang) => getWritingFields(lang),
    getDeleteDialogFields: (lang) => getDeleteDialogFields(lang),
    getEmptyItem: () => getEmptyWriting(),

    sortFields: WRITING_SORT_FIELDS,
    searchFields: WRITING_SEARCH_FIELDS,
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
        item.author,
        item.summary,
        item.keywords,
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
      { key: "category", fields: ["category"] },
      { key: "year", fields: ["year"] },
      { key: "status", fields: ["status"] },
    ],
    createControlPanelConfig: () => createWritingControlPanelConfig(),
  },

  exportConfig: {
    formatter: (data, isCn) => createComprehensiveWritingExport(data, isCn),
    filename: { EN: "writing_export_en", CN: "writing_export_cn" },
  },

  uiConfig: {
    defaultViewMode: VIEW_MODES.GRID,
    viewModes: VIEW_MODES,
    isArtistweb: false,
    debounceDelay: COMPONENT_CONFIG.DEBOUNCE_DELAY,
    ...ORIGINAL_SIZE_PRESET,
  },

  labels: {
    itemName: { EN: "Writing", CN: "写作" },
    pageText: createBasePageText({
      createTooltip: {
        EN: "Create a new writing",
        CN: "创建新写作",
      },
      export: {
        EN: "Export writings",
        CN: "导出写作",
        items: { EN: "writings", CN: "写作" },
      },
      emptyState: {
        noData: {
          EN: "No writings found",
          CN: "未找到写作",
        },
        noMatchingItems: {
          EN: "No writings match your search",
          CN: "没有匹配的写作",
        },
      },
      errors: {
        fetch: { EN: "Failed to load writings", CN: "加载写作失败" },
        create: { EN: "Failed to create writing", CN: "创建写作失败" },
        update: { EN: "Failed to update writing", CN: "更新写作失败" },
        delete: { EN: "Failed to delete writing", CN: "删除写作失败" },
      },
      deleteDialog: {
        title: { EN: "Delete Writing", CN: "删除写作" },
        message: { EN: "Are you sure you want to delete this writing?", CN: "确定要删除此写作吗？" },
        confirm: { EN: "Delete", CN: "删除" },
        cancel: { EN: "Cancel", CN: "取消" },
      },
    }),
    getLabel: (key, lang) => {
      try {
        const fromWriting = getWritingLabel(key, lang);
        if (fromWriting !== key) return fromWriting;
      } catch (e) {
        // fall through to UI_TEXT / system labels
      }
      try {
        if (writingLabels?.UI_TEXT?.[key]) {
          return writingLabels.UI_TEXT[key][lang === "CN" ? "CN" : "EN"];
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
        route: '/manager/writing/batch_edit',
      },
      {
        labelKey: 'exportData',
        action: 'export',
      },
    ],

    searchConfig: {
      placeholder: {
        EN: 'Search title, author, summary, keywords...',
        CN: '搜索标题、作者、概要、关键词...',
      },
      ariaLabel: {
        EN: 'Search writings',
        CN: '搜索写作',
      },

      selectConfig: {
        filterKey: 'category',
        placeholder: {
          EN: 'All Categories',
          CN: '全部分类',
        },
        ariaLabel: {
          EN: 'Select category',
          CN: '选择分类',
        },
        allLabel: {
          EN: 'All Categories',
          CN: '全部分类',
        },
      },
    },
  },
};

export const createWritingControlPanelConfig = () => ({
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
      field: 'category',
      label: { cn: '分类', en: 'Category' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'year',
      label: { cn: '年份', en: 'Year' },
      sortFunction: (a, b) => Number(b) - Number(a),
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
  ],
});

export default createWritingControlPanelConfig;
