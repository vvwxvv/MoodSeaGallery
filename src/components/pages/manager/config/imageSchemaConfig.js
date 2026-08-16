import { imageConfig } from "@/components/configs/imageConfig";
import { createComprehensiveImageExport } from "@/components/pages/manager/utils/imageExportUtils";
import { getImageLabel, imageLabels, PAGE_TEXT as IMAGE_PAGE_TEXT } from "@/components/labels/image_labels";
import { getSystemLabel } from "@/components/labels/system_labels";
import { createBasePageText } from "@/components/labels/system_labels";
import { ArrowUpDown } from 'lucide-react';
import { sortAlphabetically } from '@/utils/sortUtils';
import { ORIGINAL_SIZE_PRESET } from '@/components/pages/manager/constants/cardDisplayPresets';

/**
 * Image Fields Configuration
 * Defines all field mappings for image schema
 */

/**
 * Get comprehensive field list for image display
 */
export const getImageFields = (lang = 'EN') => [
  // Basic Info
  { key: 'img_url', label: 'Image URL / 图片链接' },
  { key: 'tag_en', label: 'Tag (EN) / 标签 (英文)' },
  { key: 'tag_cn', label: 'Tag (CN) / 标签 (中文)' },
  { key: 'type', label: 'Type / 类型' },
  { key: 'order', label: 'Order / 顺序' },
  { key: 'mark', label: 'Mark / 标记' },
  
  // Details
  { key: 'caption_en', label: 'Caption (EN) / 说明 (英文)' },
  { key: 'caption_cn', label: 'Caption (CN) / 说明 (中文)' },
  { key: 'tag_source', label: 'Tag Source / 标签来源' },
  
  // Metadata
  { key: 'updatedAt', label: 'Updated At / 更新时间' },
];

/**
 * Get delete dialog fields
 */
export const getDeleteDialogFields = (lang = 'EN') => [
  { key: 'img_url', label: 'Image URL:' },
  { key: 'tag_en', label: 'Tag (EN):' },
  { key: 'tag_cn', label: 'Tag (CN):' },
  { key: 'type', label: 'Type:' },
  { key: 'mark', label: 'Mark:' },
];

export const ARTWORK_SORT_FIELDS = [
  'tag_en','order',
];


/**
 * Searchable fields for image
 */
export const IMAGE_SEARCH_FIELDS = [
  'tag_en',
  'tag_cn',
  'type',
  'caption_en',
  'caption_cn',
  'tag_source',
  'mark'
];

/**
 * Default empty image object
 */
export const getEmptyImage = () => ({
  img_url: '',
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

/**
 * Image Schema Configuration
 * 
 * This config defines how the image manager page behaves:
 * - Which API endpoints to call
 * - Which fields to display and search
 * - How to filter and sort data
 * - UI labels and text
 * 
 * Key Features:
 * 1. NO language filtering - Image model uses tag_en/tag_cn, caption_en/caption_cn instead
 * 2. Alphabet pagination: Filter by first letter of tag_en (A-Z)
 * 3. Dropdown filters: Tag, Type, Tag Source, Mark (defined in imageControlPanelConfig.js)
 * 4. Search: tag_en, tag_cn, caption_en, caption_cn
 * 5. Tag dropdown: Quick filter by tag (searches both tag_en and tag_cn)
 * 
 * Filter Flow:
 * Data from API 
 *   → Search filter (if user typed in search box)
 *   → Alphabet filter (if user clicked A-Z button - filters by tag_en)
 *   → Dropdown filters (Tag/Type/TagSource/Mark from imageControlPanelConfig)
 *   → Final filtered data displayed
 * 
 * NOTE: Image model doesn't have a single "language" field like other models.
 * It stores English and Chinese data in separate fields (tag_en/tag_cn, caption_en/caption_cn)
 */

/**
 * Image Manager Constants
 * Centralized constants for the image manager page
 */

export const COMPONENT_CONFIG = {
  DEBOUNCE_DELAY: 300,
  FUZZY_SEARCH_THRESHOLD: 3,
  MIN_MATCH_CHAR_LENGTH: 1,
  SESSION_STORAGE_PREFIX: 'image_edit_',
  SUMMARY_FIELD_COUNT: 4, // Number of fields to show in summary (before accordion)
};

export const FILTER_VALUES = {
  ALL: 'all',
};

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
};

/**
 * Field Display Configuration
 * Controls which fields appear in summary vs detail sections
 */
export const FIELD_DISPLAY_CONFIG = {
  // Fields to show in the summary (always visible)
  summaryFields: [
    'tag_en',
    'tag_cn',
    'type',
    'order',
    'mark',
  ],
  
  // Fields to show in detail accordion (expandable)
  detailFields: [
    'caption_en',
    'caption_cn',
    'tag_source',
    'updatedAt',
  ],
};

export const imageSchemaConfig = {
  // ── Identity ─────────────────────────────────────────────────
  title: "Image",
  schemaName: "images",

  // ── API ──────────────────────────────────────────────────────
  // Endpoints for CRUD operations
  api: {
    endpoint: "/api/image",
    deleteEndpoint: imageConfig?.api?.endpoints?.delete,  // DELETE by ID
    listEndpoint: imageConfig?.api?.endpoints?.list,      // GET with filters
  },

  // ── Navigation ───────────────────────────────────────────────
  // Paths for create and edit pages
  navigation: {
    createPath: "/manager/image/create",
    editPathTemplate: "/manager/image/{id}/edit",         // {id} will be replaced with actual ID
  },

  // ── Data ─────────────────────────────────────────────────────
  dataConfig: {
    // Display fields
    titleField: "tag_en",                 // Used for card titles and sorting (English tag)
    descriptionField: "caption_en",       // Used for card descriptions (English caption)
    imageField: "img_url",                // Used for card images in grid/list view
    
    // Special filtering fields
    alphabetFilterField: "tag_en",        // Alphabet pagination uses this field (A-Z buttons)
    // NO languageField - Image model doesn't have a language field
    // It uses separate tag_en/tag_cn and caption_en/caption_cn fields
    
    // Field configuration functions
    getFields: (lang, isCn) => getImageFields(lang, isCn),
    getDeleteDialogFields: (lang, isCn) => getDeleteDialogFields(lang, isCn),
    getEmptyItem: () => getEmptyImage(),
    
    // Search and sort configuration
    sortFields: ["tag_en"],        // Fields that can be sorted
    searchFields: IMAGE_SEARCH_FIELDS,    // Fields included in search (tag_en, tag_cn, caption_en, caption_cn)
    fieldDisplayConfig: FIELD_DISPLAY_CONFIG, // Which fields show in summary vs detail accordion

    // Language-aware search (matches both EN and CN tag/caption fields)
    customSearch: (item, searchTerm, isCn) => {
      if (!searchTerm) return true;

      const term = searchTerm.toLowerCase().trim();

      const tagField = isCn ? item.tag_cn : item.tag_en;
      const captionField = isCn ? item.caption_cn : item.caption_en;

      const searchableFields = [
        tagField,
        item.type,
        captionField,
        item.mark,
        item.tag_source,
      ];

      return searchableFields.some(
        (field) => field && String(field).toLowerCase().includes(term)
      );
    },
  },

  // ── Filters ──────────────────────────────────────────────────
  /**
   * Filter configuration for dropdown filters
   * 
   * NOTE: The actual dropdown UI is created by imageControlPanelConfig.js
   * This filterFields array is used by useManagerPageLogic to apply the filtering logic
   * 
   * How it works:
   * 1. User selects a tag from dropdown (created by imageControlPanelConfig)
   * 2. filterState.tag = selected_tag
   * 3. Multi-field filtering checks BOTH tag_en and tag_cn fields
   * 4. Only images where tag_en OR tag_cn matches are shown
   */
  filterConfig: {
    values: FILTER_VALUES,
    filterFields: [
      { key: "tag",        fields: ["tag_en", "tag_cn"] },  // Filter by tag (checks both EN and CN)
      { key: "type",       fields: ["type"] },              // Filter by image type
      { key: "tag_source", fields: ["tag_source"] },        // Filter by tag source
      { key: "mark",       fields: ["mark"] },              // Filter by mark/tag
    ],
    createControlPanelConfig: () => createImageControlPanelConfig(),
  },

  // ── Export ───────────────────────────────────────────────────
  // Configuration for exporting data to file
  exportConfig: {
    formatter: (data, isCn) => createComprehensiveImageExport(data, isCn),
    filename: { EN: "image_export_en", CN: "image_export_cn" },
  },

  // ── UI ───────────────────────────────────────────────────────
  uiConfig: {
    defaultViewMode: VIEW_MODES.GRID,
    viewModes: VIEW_MODES,
    isArtistweb: false,
    debounceDelay: COMPONENT_CONFIG.DEBOUNCE_DELAY,
    ...ORIGINAL_SIZE_PRESET,
  },

  // ── Labels ───────────────────────────────────────────────────
  // All text and translations used in the UI
  labels: {
    itemName: { EN: "Image", CN: "图片" },
    pageText: createBasePageText({
      createTooltip: IMAGE_PAGE_TEXT.createTooltip,
      export: {
        ...IMAGE_PAGE_TEXT.export,
        items: IMAGE_PAGE_TEXT.export.images,
      },
      emptyState: {
        noData: IMAGE_PAGE_TEXT.emptyState.noData,
        noMatchingItems: IMAGE_PAGE_TEXT.emptyState.noMatchingImages,
      },
      errors: IMAGE_PAGE_TEXT.errors,
      deleteDialog: IMAGE_PAGE_TEXT.deleteDialog,
    }),

    getLabel: (key, lang) => {
      const fromImage = getImageLabel(key, lang);
      if (fromImage !== key) return fromImage;
      if (imageLabels.UI_TEXT?.[key]) return imageLabels.UI_TEXT[key][lang];
      return getSystemLabel(key, lang === "CN") ?? key;
    },
  },

  // ── Components ───────────────────────────────────────────────
  /**
   * UI Component Configuration
   * 
   * 1. actionButtons: Buttons shown at top of control panel
   * 2. searchConfig: Search bar and tag dropdown configuration
   */
  components: {
    // Action buttons (Batch Edit, Export)
    actionButtons: [
      {
        labelKey: 'batch_edit',
        route: '/manager/image/batch_edit',
      },
      {
        labelKey: 'exportData',
        action: 'export',
      },
    ],
    
    // Search bar and tag dropdown
    searchConfig: {
      // Search input configuration
      placeholder: {
        EN: 'Search tag or caption...',
        CN: '搜索标签或说明...',
      },
      ariaLabel: {
        EN: 'Search tag or caption',
        CN: '搜索标签或说明',
      },
      
      // Tag dropdown (quick filter - searches both EN and CN tags)
      selectConfig: {
        filterKey: 'tag',        // Searches both tag_en and tag_cn
        placeholder: {
          EN: 'All Tags',
          CN: '全部标签',
        },
        ariaLabel: {
          EN: 'Select tag',
          CN: '选择标签',
        },
        allLabel: {
          EN: 'All Tags',
          CN: '全部标签',
        },
      },
    },
  },
};


/**
 * Image Control Panel Configuration
 * Filters for the Image model fields
 * Merges both _en and _cn tag values into one combined dropdown
 */
export const createImageControlPanelConfig = () => {
  return {
    filters: [
      {
        field: 'mark',
        label: { cn: '标记', en: 'Mark' },
        sortFunction: sortAlphabetically,
      },
      {
        field: 'tag',
        label: { cn: '标签', en: 'Tag' },
        fields: ['tag_en', 'tag_cn'],
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
  };
};

export default createImageControlPanelConfig;