// Field labels based on Writing Prisma model
export const fieldLabels = {
  // Core fields
  cover_img_url: "Cover Image / 封面图片",
  author: "Author / 作者",
  title: "Title / 标题",
  subtitle: "Subtitle / 副标题",
  summary: "Summary / 摘要",
  keywords: "Keywords / 关键词",
  category: "Category / 类别",
  type: "Type / 类型",
  year: "Year / 年份",
  paragraphs: "Paragraphs / 段落",
  caption: "Caption / 说明",
  status: "Status / 状态",
  mark: "Mark / 标记",
  tag: "Tag / 标签",
  language: "Language / 语言",
  
  // Timestamps
  createdAt: "Created At / 创建时间",
  updatedAt: "Last Updated / 最后更新",
};

// Page text labels
export const PAGE_TEXT = {
  // Page Title
  pageTitle: {
    EN: "Writing Management",
    CN: "文章管理",
  },
  
  // Item Name
  itemName: {
    EN: "Writing",
    CN: "文章",
  },
  
  // Create Button Tooltip
  createTooltip: {
    EN: "Create New Writing",
    CN: "创建新文章",
  },
  
  // Filter Labels
  filters: {
    author: { EN: "Author", CN: "作者" },
    category: { EN: "Category", CN: "类别" },
    type: { EN: "Type", CN: "类型" },
    year: { EN: "Year", CN: "年份" },
    status: { EN: "Status", CN: "状态" },
    tag: { EN: "Tag", CN: "标签" },
    language: { EN: "Language", CN: "语言" },
    mark: { EN: "Mark", CN: "标记" },
  },
  
  // Control Panel
  controlPanel: {
    sortByDate: { EN: "Sort by Date", CN: "按日期排序" },
    sortByDateTooltip: { EN: "Sort writings by date", CN: "按日期排序文章" },
    sortByUpdate: { EN: "Sort by Update", CN: "按更新排序" },
    sortByUpdateTooltip: { EN: "Sort by update date", CN: "按更新日期排序" },
    exportData: { EN: "Export Data", CN: "导出数据" },
    exportDataTooltip: { EN: "Export writing data", CN: "导出文章数据" },
  },
  
  // Field Labels
  fields: {
    coverImageUrl: { EN: "Cover Image", CN: "封面图片" },
    author: { EN: "Author", CN: "作者" },
    title: { EN: "Title", CN: "标题" },
    subtitle: { EN: "Subtitle", CN: "副标题" },
    summary: { EN: "Summary", CN: "摘要" },
    keywords: { EN: "Keywords", CN: "关键词" },
    category: { EN: "Category", CN: "类别" },
    type: { EN: "Type", CN: "类型" },
    year: { EN: "Year", CN: "年份" },
    paragraphs: { EN: "Paragraphs", CN: "段落" },
    caption: { EN: "Caption", CN: "说明" },
    status: { EN: "Status", CN: "状态" },
    mark: { EN: "Mark", CN: "标记" },
    tag: { EN: "Tag", CN: "标签" },
    language: { EN: "Language", CN: "语言" },
    createdAt: { EN: "Created At", CN: "创建时间" },
    updatedAt: { EN: "Updated At", CN: "更新时间" },
  },
  
  // Empty State Messages
  emptyState: {
    noData: { EN: "No writings found", CN: "暂无文章" },
    noMatchingWritings: { EN: "No matching writings", CN: "没有匹配的文章" },
  },
  
  // Delete Dialog
  deleteDialog: {
    title: { EN: "Confirm Delete", CN: "确认删除" },
    confirm: { EN: "Delete", CN: "删除" },
    cancel: { EN: "Cancel", CN: "取消" },
  },
  
  // Error Messages
  errors: {
    loadingError: { EN: "Error loading data", CN: "加载数据错误" },
    systemError: { EN: "System error occurred", CN: "系统错误" },
    tryAgain: { EN: "Try Again", CN: "重试" },
    deleteError: { EN: "Delete failed", CN: "删除失败" },
    pleaseRetry: { EN: "Please try again", CN: "请重试" },
    ok: { EN: "OK", CN: "确定" },
  },
  
  // Export Messages
  export: {
    success: { EN: "Export successful", CN: "导出成功" },
    error: { EN: "Export failed", CN: "导出失败" },
    writings: { EN: "writings", CN: "个文章" },
  },
};

// Action labels
export const actionLabels = {
  create_en: "Create Writing",
  create_cn: "创建文章",
  edit_en: "Edit Writing",
  edit_cn: "编辑文章",
  delete_en: "Delete Writing",
  delete_cn: "删除文章",
  export_en: "Export Writings",
  export_cn: "导出文章",
  import_en: "Import Writings",
  import_cn: "导入文章",
};

// Status labels
export const statusLabels = {
  success_en: "Operation completed successfully",
  success_cn: "操作成功完成",
  error_en: "An error occurred",
  error_cn: "发生错误",
  loading_en: "Loading...",
  loading_cn: "加载中...",
  saving_en: "Saving...",
  saving_cn: "保存中...",
};

// Entity labels
export const entityLabels = {
  writing_en: "Writing",
  writing_cn: "文章",
  writings_en: "Writings",
  writings_cn: "文章",
  untitledWriting_en: "Untitled Writing",
  untitledWriting_cn: "无题文章",
};

// Filter labels
export const filterLabels = {
  all_authors_en: "All Authors",
  all_authors_cn: "全部作者",
  all_types_en: "All Types",
  all_types_cn: "全部类型",
  all_years_en: "All Years",
  all_years_cn: "全部年份",
  all_categories_en: "All Categories",
  all_categories_cn: "全部类别",
  all_statuses_en: "All Statuses",
  all_statuses_cn: "全部状态",
  all_tags_en: "All Tags",
  all_tags_cn: "全部标签",
  all_languages_en: "All Languages",
  all_languages_cn: "全部语言",
  all_marks_en: "All Marks",
  all_marks_cn: "全部标记",
};

// Sort labels
export const sortLabels = {
  sort_by_author_en: "Sort by Author",
  sort_by_author_cn: "按作者排序",
  sort_by_title_en: "Sort by Title",
  sort_by_title_cn: "按标题排序",
  sort_by_date_en: "Sort by Date",
  sort_by_date_cn: "按日期排序",
  sort_by_year_en: "Sort by Year",
  sort_by_year_cn: "按年份排序",
  sort_by_type_en: "Sort by Type",
  sort_by_type_cn: "按类型排序",
  sort_by_category_en: "Sort by Category",
  sort_by_category_cn: "按类别排序",
  sort_by_update_en: "Sort by Update",
  sort_by_update_cn: "按更新排序",
};

// Page labels
export const pageLabels = {
  title_en: "Writing Management",
  title_cn: "文章管理",
  description_en: "Manage and organize writing content",
  description_cn: "管理和组织文章内容",
};

// UI Text labels
export const uiTextLabels = {
  pageTitle: { en: 'Writing Index', cn: '文章索引' },
  author: { en: 'Author', cn: '作者' },
  title: { en: 'Title', cn: '标题' },
  category: { en: 'Category', cn: '类别' },
  year: { en: 'Year', cn: '年份' },
  type: { en: 'Type', cn: '类型' },
  status: { en: 'Status', cn: '状态' },
  tag: { en: 'Tag', cn: '标签' },
  language: { en: 'Language', cn: '语言' },
  mark: { en: 'Mark', cn: '标记' },
  all: { en: 'All', cn: '全部' },
  other: { en: 'Other', cn: '其他' },
  noItemsFound: { 
    en: 'No items found matching the criteria', 
    cn: '没有找到符合条件的项目' 
  },
  noWritingsFound: { 
    en: 'No writings found matching the criteria', 
    cn: '没有找到符合条件的文章' 
  },
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  fields: {
    author: { en: 'Author', cn: '作者' },
    title: { en: 'Title', cn: '标题' },
    category: { en: 'Category', cn: '类别' },
    year: { en: 'Year', cn: '年份' },
    type: { en: 'Type', cn: '类型' },
    keywords: { en: 'Keywords', cn: '关键词' },
    status: { en: 'Status', cn: '状态' },
  }
};

// Display labels
export const displayLabels = {
  detailButtonText: (isCn) => isCn ? '查看详情' : 'See Details',
  emptyMessage: (isCn) => isCn ? '没有可显示的文章' : 'No writings to display',
  noMatchMessage: (isCn) => isCn ? '未找到匹配的文章' : 'No matching writings found',
  loadingMessage: (isCn) => isCn ? '加载中...' : 'Loading...',
  errorMessage: (isCn) => isCn ? '加载失败' : 'Failed to load',
};

// Control panel labels
export const controlPanelLabels = {
  author: '作者',
  category: '类别',
  type: '类型',
  year: '年份',
  status: '状态',
  tag: '标签',
  language: '语言',
  mark: '标记',
  sortByDate: '按日期排序',
  sortByDateTooltip: 'Sort by Date',
  sortByUpdate: '按更新排序',
  sortByUpdateTooltip: 'Sort by Update',
  authorLabel_en: "Author",
  authorLabel_cn: "作者",
  categoryLabel_en: "Category",
  categoryLabel_cn: "类别",
  typeLabel_en: "Type",
  typeLabel_cn: "类型",
  yearLabel_en: "Year",
  yearLabel_cn: "年份",
  statusLabel_en: "Status",
  statusLabel_cn: "状态",
  tagLabel_en: "Tag",
  tagLabel_cn: "标签",
  languageLabel_en: "Language",
  languageLabel_cn: "语言",
  markLabel_en: "Mark",
  markLabel_cn: "标记",
};

// Default content labels
export const defaultContentLabels = {
  listTitle: (isCn) => isCn ? "文章列表" : "WRITING LIST",
  detailsLabel: (isCn) => isCn ? "文章详情" : "WRITING DETAILS",
  untitled: (isCn) => isCn ? "无题文章" : "Untitled Writing",
  noDescription: (isCn) => isCn ? '暂无描述' : 'No description available',
  back: (isCn) => isCn ? "返回" : "BACK",
};

// Field group labels
export const fieldGroupLabels = {
  basic: {
    title: (isCn) => isCn ? "基本信息" : "Basic Info",
  },
  content: {
    title: (isCn) => isCn ? "内容" : "Content",
  },
  metadata: {
    title: (isCn) => isCn ? "元数据" : "Metadata",
  },
};

// Field labels for components
export const fieldLabelsForComponents = {
  cover_img_url: { en: 'Cover Image', cn: '封面图片' },
  author: { en: 'Author', cn: '作者' },
  title: { en: 'Title', cn: '标题' },
  subtitle: { en: 'Subtitle', cn: '副标题' },
  summary: { en: 'Summary', cn: '摘要' },
  keywords: { en: 'Keywords', cn: '关键词' },
  category: { en: 'Category', cn: '类别' },
  type: { en: 'Type', cn: '类型' },
  year: { en: 'Year', cn: '年份' },
  paragraphs: { en: 'Paragraphs', cn: '段落' },
  caption: { en: 'Caption', cn: '说明' },
  status: { en: 'Status', cn: '状态' },
  mark: { en: 'Mark', cn: '标记' },
  tag: { en: 'Tag', cn: '标签' },
  language: { en: 'Language', cn: '语言' },
};

// Delete dialog labels
export const deleteDialogLabels = {
  delete_dialog_this_item_en: "this writing",
  delete_dialog_this_item_cn: "该文章",
  confirmDeleteWriting_en: "Are you sure you want to delete this writing?",
  confirmDeleteWriting_cn: "确定要删除该文章吗？",
  thisWriting_en: "this writing",
  thisWriting_cn: "该文章",
};

// Additional labels
export const additionalLabels = {
  // Placeholder and description labels
  selectAuthor_en: "Select Author",
  selectAuthor_cn: "选择作者",
  enterAuthorName_en: "Enter author name",
  enterAuthorName_cn: "输入作者名称",
  selectCategory_en: "Select Category",
  selectCategory_cn: "选择类别",
  enterCategoryName_en: "Enter category name",
  enterCategoryName_cn: "输入类别名称",
  selectType_en: "Select Type",
  selectType_cn: "选择类型",
  enterTypeName_en: "Enter type name",
  enterTypeName_cn: "输入类型名称",
  selectStatus_en: "Select Status",
  selectStatus_cn: "选择状态",
  selectLanguage_en: "Select Language",
  selectLanguage_cn: "选择语言",
  
  // Paragraphs labels
  paragraphs_en: "Paragraphs",
  paragraphs_cn: "段落",
  paragraphsSummary_en: "Paragraphs",
  paragraphsSummary_cn: "段落",
  paragraphsDescription_en: "Add one or more paragraphs for this writing.",
  paragraphsDescription_cn: "为此文章添加一个或多个段落。",
  addParagraphButton_en: "Add Paragraph",
  addParagraphButton_cn: "添加段落",
  removeParagraphButton_en: "Remove",
  removeParagraphButton_cn: "移除",
  
  // Entity and collection labels
  no_writings_en: "No writings found",
  no_writings_cn: "未找到文章",
  
  // Search and filter labels
  searchWritings_en: "Search writings",
  searchWritings_cn: "搜索文章",
  
  // Status and error labels
  noFeaturedWritings_en: "No featured writings available",
  noFeaturedWritings_cn: "暂无精选文章",
  noMatchingWritings_en: "No matching writings found",
  noMatchingWritings_cn: "没有找到符合条件的文章",
  noCategoryFound_en: "No category found",
  noCategoryFound_cn: "暂无类别",
};

// UI Text Configuration
export const UI_TEXT = {
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  writingManagement: { en: 'Writing Management', cn: '文章管理' },
  noData: { en: 'No writings available', cn: '暂无文章数据' },
  noMatchingWritings: { en: 'No matching writings found', cn: '未找到匹配的文章' },
  all: { en: 'All', cn: '全部' },
  totalCount: { en: 'Total', cn: '总计' },
  exportSuccess: { en: 'Export successful', cn: '导出成功' },
  exportError: { en: 'Export failed', cn: '导出失败' },
  exportInProgress: { en: 'Exporting...', cn: '导出中...' }
};

// Combined labels object for easy access
export const writingLabels = {
  ...fieldLabels,
  ...actionLabels,
  ...statusLabels,
  ...entityLabels,
  ...filterLabels,
  ...sortLabels,
  ...pageLabels,
  ...deleteDialogLabels,
  ...additionalLabels,
  uiText: uiTextLabels,
  display: displayLabels,
  controlPanel: controlPanelLabels,
  defaultContent: defaultContentLabels,
  UI_TEXT: UI_TEXT,
  PAGE_TEXT,
};

// Helper function to get labels
export const getWritingLabel = (key, language = 'en') => {
  if (!key) return '';
  
  // Try direct field labels first
  if (fieldLabels[key]) {
    return fieldLabels[key][language] || fieldLabels[key]['en'] || key;
  }
  
  // Try labels with language suffix
  const labelKey = `${key}_${language}`;
  if (writingLabels[labelKey]) {
    return writingLabels[labelKey];
  }
  
  // Fallback to English if Chinese not found
  if (language === 'cn') {
    const englishKey = `${key}_en`;
    if (writingLabels[englishKey]) {
      return writingLabels[englishKey];
    }
  }
  
  return key;
};

// Helper function to get UI text
export const getWritingUIText = (key, language = 'en') => {
  if (!key) return '';
  
  // Try to get from uiText configuration
  if (uiTextLabels[key]) {
    return uiTextLabels[key][language] || uiTextLabels[key]['en'] || key;
  }
  
  // Try nested fields
  if (key.includes('.')) {
    const [parent, child] = key.split('.');
    if (uiTextLabels[parent] && uiTextLabels[parent][child]) {
      return uiTextLabels[parent][child][language] || uiTextLabels[parent][child]['en'] || key;
    }
  }
  
  return key;
};

// Default export
export default writingLabels;