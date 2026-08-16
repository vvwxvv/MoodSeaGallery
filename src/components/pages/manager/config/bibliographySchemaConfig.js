import { createComprehensiveArtworkExport } from "@/components/pages/manager/utils/artworkExportUtils";
import { getSystemLabel, createBasePageText } from "@/components/labels/system_labels";
import { ArrowUpDown } from 'lucide-react';
import { sortAlphabetically } from '@/utils/sortUtils';
import { ORIGINAL_SIZE_PRESET } from '@/components/pages/manager/constants/cardDisplayPresets';

// ===================== 字段定义 =====================
export const getBibliographyFields = (lang = 'EN') => [
  { key: 'cover_img_url', label: 'Cover Image' },
  { key: 'title', label: 'Title / 标题' },
  { key: 'subtitle', label: 'Subtitle / 副标题' },
  { key: 'author', label: 'Author / 作者' },
  { key: 'type', label: 'Type / 类型' },
  { key: 'year', label: 'Year / 年份' },
  { key: 'date', label: 'Date / 日期' },
  { key: 'published_at', label: 'Published At / 出版时间' },
  { key: 'pdf_url', label: 'PDF URL / PDF链接' },
  { key: 'web_url', label: 'Web URL / 网页链接' },
  { key: 'video_url', label: 'Video URL / 视频链接' },
  { key: 'order', label: 'Order / 顺序' },
  { key: 'related_gallery_exhibition', label: 'Related Gallery/Exhibition / 关联画廊/展览', isArray: true },
  { key: 'updatedAt', label: 'Updated At / 更新时间' },
];

export const getDeleteDialogFields = (lang = 'EN') => [
  { key: 'title', label: 'Title:' },
  { key: 'subtitle', label: 'Subtitle:' },
  { key: 'author', label: 'Author:' },
  { key: 'type', label: 'Type:' },
  { key: 'year', label: 'Year:' },
  { key: 'date', label: 'Date:' },
  { key: 'published_at', label: 'Published At:' },
];

export const BIBLIOGRAPHY_SORT_FIELDS = ['title', 'order'];
export const BIBLIOGRAPHY_SEARCH_FIELDS = ['title', 'subtitle', 'author', 'type', 'year'];

export const getEmptyBibliography = () => ({
  cover_img_url: '',
  title: '',
  subtitle: '',
  author: '',
  type: '',
  year: '',
  date: '',
  published_at: '',
  pdf_url: '',
  web_url: '',
  video_url: '',
  order: '',
  related_gallery_exhibition: [],
  updatedAt: '',
});

// ===================== 常量 =====================
export const COMPONENT_CONFIG = {
  DEBOUNCE_DELAY: 300,
  FUZZY_SEARCH_THRESHOLD: 3,
  MIN_MATCH_CHAR_LENGTH: 1,
  SESSION_STORAGE_PREFIX: 'bibliography_edit_',
  SUMMARY_FIELD_COUNT: 4,
};

export const FILTER_VALUES = { ALL: 'all' };
export const VIEW_MODES = { GRID: 'grid', LIST: 'list' };

export const FIELD_DISPLAY_CONFIG = {
  summaryFields: ['title', 'subtitle', 'author', 'type', 'year'],
  detailFields: [
    'cover_img_url',
    'date',
    'published_at',
    'pdf_url',
    'web_url',
    'video_url',
    'order',
    'related_gallery_exhibition',
    'updatedAt',
  ],
};

// ===================== 标签与国际化 =====================
// 为 Bibliography 定义专有标签（可扩展）
const bibliographyLabels = {
  UI_TEXT: {
    // 如有需要可添加特定UI文本
  },
  PAGE_TEXT: {
    createTooltip: { EN: 'Create Bibliography', CN: '创建书目' },
    export: {
      artworks: { EN: 'Bibliography', CN: '书目' },
      title: { EN: 'Export Bibliography', CN: '导出书目' },
      button: { EN: 'Export Data', CN: '导出数据' },
    },
    emptyState: {
      noData: { EN: 'No bibliography items found', CN: '未找到书目' },
      noMatchingItems: { EN: 'No matching bibliography items', CN: '没有匹配的书目' },
    },
    errors: {
      loadError: { EN: 'Failed to load bibliography', CN: '加载书目失败' },
      saveError: { EN: 'Failed to save bibliography', CN: '保存书目失败' },
      deleteError: { EN: 'Failed to delete bibliography', CN: '删除书目失败' },
    },
    deleteDialog: {
      title: { EN: 'Delete Bibliography', CN: '删除书目' },
      confirm: { EN: 'Are you sure you want to delete this item?', CN: '确定要删除此书目吗？' },
    },
  },
};

const getBibliographyLabel = (key, lang) => {
  // 简单实现，可从标签映射中查找
  const fieldMap = {
    cover_img_url: { EN: 'Cover Image', CN: '封面图片' },
    title: { EN: 'Title', CN: '标题' },
    subtitle: { EN: 'Subtitle', CN: '副标题' },
    author: { EN: 'Author', CN: '作者' },
    type: { EN: 'Type', CN: '类型' },
    year: { EN: 'Year', CN: '年份' },
    date: { EN: 'Date', CN: '日期' },
    published_at: { EN: 'Published At', CN: '出版时间' },
    pdf_url: { EN: 'PDF URL', CN: 'PDF链接' },
    web_url: { EN: 'Web URL', CN: '网页链接' },
    video_url: { EN: 'Video URL', CN: '视频链接' },
    order: { EN: 'Order', CN: '顺序' },
    related_gallery_exhibition: { EN: 'Related Gallery/Exhibition', CN: '关联画廊/展览' },
    updatedAt: { EN: 'Updated At', CN: '更新时间' },
  };
  if (fieldMap[key]) return fieldMap[key][lang === 'CN' ? 'CN' : 'EN'];
  return getSystemLabel(key, lang === 'CN') ?? key;
};

// ===================== 主配置 =====================
export const bibliographySchemaConfig = {
  title: "Bibliography",
  schemaName: "bibliography",

  api: {
    endpoint: "/api/bibliography",
    deleteEndpoint: "/api/bibliography",
    listEndpoint: "/api/bibliography/list",
  },

  navigation: {
    createPath: "/manager/bibliography/create",
    editPathTemplate: "/manager/bibliography/{id}/edit",
  },

  dataConfig: {
    titleField: "title",
    descriptionField: "subtitle",
    imageField: "cover_img_url",

    // 无语言字段，留空或删除语言过滤
    alphabetFilterField: "title",
    languageField: null, // 无语言

    getFields: (lang) => getBibliographyFields(lang),
    getDeleteDialogFields: (lang) => getDeleteDialogFields(lang),
    getEmptyItem: () => getEmptyBibliography(),

    sortFields: BIBLIOGRAPHY_SORT_FIELDS,
    searchFields: BIBLIOGRAPHY_SEARCH_FIELDS,
    fieldDisplayConfig: FIELD_DISPLAY_CONFIG,

    customSearch: (item, searchTerm, isCn) => {
      // 无语言过滤，直接搜索指定字段
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase().trim();
      const searchableFields = [
        item.title,
        item.subtitle,
        item.author,
        item.type,
        item.year,
      ];
      return searchableFields.some(
        (field) => field && String(field).toLowerCase().includes(term)
      );
    },
  },

  filterConfig: {
    values: FILTER_VALUES,
    filterFields: [
      { key: "type", fields: ["type"] },
      { key: "author", fields: ["author"] },
      { key: "year", fields: ["year"] },
    ],
    createControlPanelConfig: () => createBibliographyControlPanelConfig(),
  },

  exportConfig: {
    // 可替换为专用的 Bibliography 导出函数
    formatter: (data, isCn) => createComprehensiveArtworkExport(data, isCn), // 临时复用，建议自定义
    filename: { EN: "bibliography_export_en", CN: "bibliography_export_cn" },
  },

  uiConfig: {
    defaultViewMode: VIEW_MODES.GRID,
    viewModes: VIEW_MODES,
    isArtistweb: false,
    debounceDelay: COMPONENT_CONFIG.DEBOUNCE_DELAY,
    ...ORIGINAL_SIZE_PRESET,
  },

  labels: {
    itemName: { EN: "Bibliography", CN: "书目" },
    pageText: createBasePageText({
      createTooltip: bibliographyLabels.PAGE_TEXT.createTooltip,
      export: {
        ...bibliographyLabels.PAGE_TEXT.export,
        items: bibliographyLabels.PAGE_TEXT.export.artworks,
      },
      emptyState: {
        noData: bibliographyLabels.PAGE_TEXT.emptyState.noData,
        noMatchingItems: bibliographyLabels.PAGE_TEXT.emptyState.noMatchingItems,
      },
      errors: bibliographyLabels.PAGE_TEXT.errors,
      deleteDialog: bibliographyLabels.PAGE_TEXT.deleteDialog,
    }),
    getLabel: (key, lang) => {
      const fromBibliography = getBibliographyLabel(key, lang);
      if (fromBibliography !== key) return fromBibliography;
      if (bibliographyLabels.UI_TEXT?.[key]) return bibliographyLabels.UI_TEXT[key][lang];
      return getSystemLabel(key, lang === "CN") ?? key;
    },
  },

  components: {
    actionButtons: [
      {
        labelKey: 'batch_edit',
        route: '/manager/bibliography/batch_edit',
      },
      {
        labelKey: 'exportData',
        action: 'export',
      },
    ],

    searchConfig: {
      placeholder: {
        EN: 'Search title, subtitle, author, type, year...',
        CN: '搜索标题、副标题、作者、类型、年份...',
      },
      ariaLabel: {
        EN: 'Search bibliography',
        CN: '搜索书目',
      },

      selectConfig: {
        filterKey: 'author',
        placeholder: {
          EN: 'All Authors',
          CN: '全部作者',
        },
        ariaLabel: {
          EN: 'Select author',
          CN: '选择作者',
        },
        allLabel: {
          EN: 'All Authors',
          CN: '全部作者',
        },
      },
    },
  },
};

// ===================== 控制面板配置 =====================
export const createBibliographyControlPanelConfig = () => ({
  filters: [
    {
      field: 'type',
      label: { cn: '类型', en: 'Type' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'author',
      label: { cn: '作者', en: 'Author' },
      sortFunction: sortAlphabetically,
    },
    {
      field: 'year',
      label: { cn: '年份', en: 'Year' },
      sortFunction: (a, b) => Number(b) - Number(a),
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

// ===================== 导出默认 =====================
export default bibliographySchemaConfig;