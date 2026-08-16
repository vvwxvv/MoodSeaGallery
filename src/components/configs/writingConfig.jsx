import WritingEditForm from "@/components/forms/WritingEditForm";
import WritingForm from "@/components/forms/WritingForm";
import {
  writingLabels,
  pageLabels,
  fieldGroupLabels,
} from "@/components/labels/writing_labels";
import {
  languageOptions,
} from "@/components/forms/utils/formOptionsUtils";
import {
  ANIMATION_VARIANTS,
} from "./general_config";
import { getFieldGroupsWithLabels } from "@/components/forms/utils/formFieldsUtils";
import formTypes from "@/data/form_types.json";
import formOptions from "@/data/form_options.json";

// Field groupings
export const getFieldGroupsWriting = (isCn = false) => {
  const fieldGroups = {
    BASIC: {
      title: fieldGroupLabels.basic.title(isCn),
      fields: [
        { key: "title" },
        { key: "subtitle" },
        { key: "author" },
        { key: "category" },
        { key: "type" },
        { key: "year" },
        { key: "summary" },
        { key: "keywords" },
        { key: "tag" },
        { key: "cover_img_url" },
        { key: "language" },
      ],
    },
    CONTENT: {
      title: fieldGroupLabels.content?.title(isCn) || (isCn ? "内容" : "Content"),
      fields: [
        { key: "paragraphs" },
        { key: "caption" },
      ],
    },
    METADATA: {
      title: fieldGroupLabels.metadata?.title(isCn) || (isCn ? "元数据" : "Metadata"),
      fields: [
        { key: "status" },
        { key: "mark" },
        { key: "createdAt" },
        { key: "updatedAt" },
      ],
    },
  };

  return getFieldGroupsWithLabels("writing", fieldGroups, isCn);
};

// Writing-specific constants
export const FALLBACK_IMAGE = "/error.png";

export const writingConfig = {
  // Schema identifier
  itemUrl: "writing",
  schemaName: "Writing",

  // API Configuration
  api: {
    endpoints: {
      base: "/api/writing",
      create: "/api/writing",
      update: (id) => `/api/writing/${id}`,
      delete: (id) => `/api/writing/${id}`,
      list: "/api/writing",
      detail: (id) => `/api/writing/${id}`,
    },
    methods: {
      create: "POST",
      update: "PUT",
      delete: "DELETE",
      list: "GET",
      detail: "GET",
    },
    headers: {
      "Content-Type": "application/json",
    },
    config: {
      enablePagination: true,
      enableSearch: true,
      enableSorting: true,
      defaultPageSize: 20,
      maxPageSize: 100,
      defaultSortField: "createdAt",
      defaultSortOrder: -1,
      collectionName: "Writing",
    },
  },

  // Page Configuration
  page: {
    ...pageLabels,
    animationVariants: ANIMATION_VARIANTS.container,
  },

  // Field Configuration
  fields: {
    // Fields that can be searched through
    searchableFields: [
      "title",
      "subtitle",
      "author",
      "summary",
      "keywords",
      "tag",
      "category",
      "type",
    ],

    // Fields that can be sorted
    sortableFields: [
      "title",
      "author",
      "year",
      "createdAt",
      "updatedAt",
    ],

    // Fields for filtering
    filterableFields: ["status", "category", "year", "author", "tag", "keywords"],

    // Main fields for card display
    mainFields: ["title", "author", "category", "year"],

    // Extended fields for detailed view
    expandedFields: ["subtitle", "summary", "caption", "keywords", "tag"],

    // Image fields for upload and display
    imagesField: ["cover_img_url"],

    // Required fields for validation
    requiredFields: ["title"],

    // All data fields available
    dataField: [
      "id",
      "cover_img_url",
      "title",
      "subtitle",
      "author",
      "summary",
      "keywords",
      "tag",
      "category",
      "type",
      "year",
      "paragraphs",
      "caption",
      "status",
      "mark",
      "language",
      "createdAt",
      "updatedAt",
    ],

    // Display order for fields
    fieldShowOrder: [
      "title",
      "subtitle",
      "author",
      "category",
      "type",
      "year",
      "summary",
      "keywords",
      "tag",
      "cover_img_url",
      "paragraphs",
      "caption",
      "status",
      "mark",
      "language",
      "createdAt",
      "updatedAt",
    ],

    // Array fields for special handling
    arrayFields: ["paragraphs"],

    // Date fields for special handling
    dateFields: ["createdAt", "updatedAt"],

    // Valid fields for API operations
    validFields: [
      "id",
      "cover_img_url",
      "title",
      "subtitle",
      "author",
      "summary",
      "keywords",
      "tag",
      "category",
      "type",
      "year",
      "paragraphs",
      "caption",
      "status",
      "mark",
      "language",
      "createdAt",
      "updatedAt",
    ],
  },

  // Component Configuration
  components: {
    createFormComponent: WritingForm,
    editFormComponent: WritingEditForm,
  },

  // Labels Configuration
  labels: writingLabels,

  // Category Options
  categoryOptions: formTypes.writing,

  // Publish Status Options
  publishStatusOptions: formOptions.common.publishStatus,

  // Language Options
  languageOptions: languageOptions,
};

// Export default writingConfig
export default writingConfig;