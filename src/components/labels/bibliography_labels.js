// Field labels based on Bibliography Prisma model
export const fieldLabels = {
  // Core fields
  title: "Title / 标题",
  subtitle: "Subtitle / 副标题",
  cover_img_url: "Cover Image / 封面图片",
  author: "Author / 作者",
  type: "Type / 类型",
  year: "Year / 年份",
  date: "Date / 日期",
  published_at: "Published At / 出版时间",
  pdf_url: "PDF URL / PDF链接",
  web_url: "Website URL / 网页链接",
  video_url: "Video URL / 视频链接",
  related_gallery_exhibition: "Related Gallery Exhibitions / 相关画廊展览",
  order: "Order / 顺序",
  language: "Language / 语言",          // 新增
  mark: "Mark / 标记",                  // 新增
  
  // Timestamps
  updatedAt: "Last Updated / 最后更新",
};

// Page text labels
export const PAGE_TEXT = {
  // Page Title
  pageTitle: {
    EN: "Bibliography Management",
    CN: "书目管理",
  },
  
  // Item Name
  itemName: {
    EN: "Bibliography Entry",
    CN: "书目条目",
  },
  
  // Create Button Tooltip
  createTooltip: {
    EN: "Create New Bibliography Entry",
    CN: "创建新书目条目",
  },
  
  // Filter Labels
  filters: {
    type: { EN: "Type", CN: "类型" },
    year: { EN: "Year", CN: "年份" },
    author: { EN: "Author", CN: "作者" },
    language: { EN: "Language", CN: "语言" },   // 新增
  },
  
  // Control Panel
  controlPanel: {
    sortByOrder: { EN: "Sort by Order", CN: "按顺序排序" },
    sortByOrderTooltip: { EN: "Sort entries by order", CN: "按顺序排序条目" },
    sortByUpdate: { EN: "Sort by Update", CN: "按更新排序" },
    sortByUpdateTooltip: { EN: "Sort by update date", CN: "按更新日期排序" },
    exportData: { EN: "Export Data", CN: "导出数据" },
    exportDataTooltip: { EN: "Export bibliography data", CN: "导出书目数据" },
  },
  
  // Field Labels
  fields: {
    title: { EN: "Title", CN: "标题" },
    subtitle: { EN: "Subtitle", CN: "副标题" },
    coverImgUrl: { EN: "Cover Image", CN: "封面图片" },
    author: { EN: "Author", CN: "作者" },
    type: { EN: "Type", CN: "类型" },
    year: { EN: "Year", CN: "年份" },
    date: { EN: "Date", CN: "日期" },
    publishedAt: { EN: "Published At", CN: "出版时间" },
    pdfUrl: { EN: "PDF URL", CN: "PDF链接" },
    webUrl: { EN: "Website URL", CN: "网页链接" },
    videoUrl: { EN: "Video URL", CN: "视频链接" },
    relatedGalleryExhibition: { EN: "Related Gallery Exhibitions", CN: "相关画廊展览" },
    order: { EN: "Order", CN: "顺序" },
    language: { EN: "Language", CN: "语言" },      // 新增
    mark: { EN: "Mark", CN: "标记" },              // 新增
    updatedAt: { EN: "Updated At", CN: "更新时间" },
  },
  
  // Empty State Messages
  emptyState: {
    noData: { EN: "No bibliography entries found", CN: "暂无书目条目" },
    noMatchingEntries: { EN: "No matching entries", CN: "没有匹配的条目" },
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
    entries: { EN: "entries", CN: "个条目" },
  },
};

// Action labels
export const actionLabels = {
  create_en: "Create Bibliography Entry",
  create_cn: "创建书目条目",
  edit_en: "Edit Bibliography Entry",
  edit_cn: "编辑书目条目",
  delete_en: "Delete Bibliography Entry",
  delete_cn: "删除书目条目",
  export_en: "Export Bibliography Data",
  export_cn: "导出书目数据",
  import_en: "Import Bibliography Data",
  import_cn: "导入书目数据",
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
  bibliographyEntry_en: "Bibliography Entry",
  bibliographyEntry_cn: "书目条目",
  bibliographyEntries_en: "Bibliography Entries",
  bibliographyEntries_cn: "书目条目",
  untitledEntry_en: "Untitled Entry",
  untitledEntry_cn: "无标题条目",
};

// Filter labels
export const filterLabels = {
  all_types_en: "All Types",
  all_types_cn: "全部类型",
  all_years_en: "All Years",
  all_years_cn: "全部年份",
  all_authors_en: "All Authors",
  all_authors_cn: "全部作者",
  all_languages_en: "All Languages",    // 新增
  all_languages_cn: "全部语言",         // 新增
};

// Sort labels
export const sortLabels = {
  sort_by_order_en: "Sort by Order",
  sort_by_order_cn: "按顺序排序",
  sort_by_update_en: "Sort by Update",
  sort_by_update_cn: "按更新排序",
  sort_by_title_en: "Sort by Title",
  sort_by_title_cn: "按标题排序",
  sort_by_year_en: "Sort by Year",
  sort_by_year_cn: "按年份排序",
  sort_by_language_en: "Sort by Language",  // 新增
  sort_by_language_cn: "按语言排序",        // 新增
};

// Page labels
export const pageLabels = {
  title_en: "Bibliography Management",
  title_cn: "书目管理",
  description_en: "Manage bibliography entries including books, articles, and other publications",
  description_cn: "管理书目条目，包括书籍、文章和其他出版物",
};

// UI Text labels
export const uiTextLabels = {
  pageTitle: { en: 'Bibliography Index', cn: '书目索引' },
  title: { en: 'Title', cn: '标题' },
  author: { en: 'Author', cn: '作者' },
  type: { en: 'Type', cn: '类型' },
  year: { en: 'Year', cn: '年份' },
  language: { en: 'Language', cn: '语言' },   // 新增
  mark: { en: 'Mark', cn: '标记' },           // 新增
  all: { en: 'All', cn: '全部' },
  noItemsFound: { 
    en: 'No items found matching the criteria', 
    cn: '没有找到符合条件的项目' 
  },
  noEntriesFound: { 
    en: 'No bibliography entries found matching the criteria', 
    cn: '没有找到符合条件的书目条目' 
  },
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  fields: {
    title: { en: 'Title', cn: '标题' },
    author: { en: 'Author', cn: '作者' },
    type: { en: 'Type', cn: '类型' },
    year: { en: 'Year', cn: '年份' },
    language: { en: 'Language', cn: '语言' },   // 新增
  }
};

// Display labels
export const displayLabels = {
  detailButtonText: (isCn) => isCn ? '查看详情' : 'See Details',
  emptyMessage: (isCn) => isCn ? '没有可显示的书目条目' : 'No bibliography entries to display',
  noMatchMessage: (isCn) => isCn ? '未找到匹配的条目' : 'No matching entries found',
  loadingMessage: (isCn) => isCn ? '加载中...' : 'Loading...',
  errorMessage: (isCn) => isCn ? '加载失败' : 'Failed to load',
};

// Control panel labels
export const controlPanelLabels = {
  type: '类型',
  year: '年份',
  author: '作者',
  language: '语言',        // 新增
  sortByOrder: '按顺序排序',
  sortByOrderTooltip: 'Sort by Order',
  sortByUpdate: '按更新排序',
  sortByUpdateTooltip: 'Sort by Update',
  sortByTitle: '按标题排序',
  sortByTitleTooltip: 'Sort by Title',
  sortByYear: '按年份排序',
  sortByYearTooltip: 'Sort by Year',
  titleLabel_en: "Title",
  titleLabel_cn: "标题",
  authorLabel_en: "Author",
  authorLabel_cn: "作者",
  typeLabel_en: "Type",
  typeLabel_cn: "类型",
  yearLabel_en: "Year",
  yearLabel_cn: "年份",
  languageLabel_en: "Language",    // 新增
  languageLabel_cn: "语言",        // 新增
};

// Default content labels
export const defaultContentLabels = {
  listTitle: (isCn) => isCn ? "书目列表" : "BIBLIOGRAPHY LIST",
  detailsLabel: (isCn) => isCn ? "书目详情" : "BIBLIOGRAPHY DETAILS",
  untitled: (isCn) => isCn ? "无标题条目" : "Untitled Entry",
  noDescription: (isCn) => isCn ? '暂无描述' : 'No description available',
  back: (isCn) => isCn ? "返回" : "BACK",
};

// Field group labels
export const fieldGroupLabels = {
  basic: {
    title: (isCn) => isCn ? "基本信息" : "Basic Info",
  },
  media: {
    title: (isCn) => isCn ? "媒体链接" : "Media Links",
  },
  relations: {
    title: (isCn) => isCn ? "关联信息" : "Relations",
  },
  metadata: {
    title: (isCn) => isCn ? "元数据" : "Metadata",
  },
};

// Field labels for components (object with en/cn)
export const fieldLabelsForComponents = {
  title: { en: 'Title', cn: '标题' },
  subtitle: { en: 'Subtitle', cn: '副标题' },
  cover_img_url: { en: 'Cover Image', cn: '封面图片' },
  author: { en: 'Author', cn: '作者' },
  type: { en: 'Type', cn: '类型' },
  year: { en: 'Year', cn: '年份' },
  date: { en: 'Date', cn: '日期' },
  published_at: { en: 'Published At', cn: '出版时间' },
  pdf_url: { en: 'PDF URL', cn: 'PDF链接' },
  web_url: { en: 'Website URL', cn: '网页链接' },
  video_url: { en: 'Video URL', cn: '视频链接' },
  related_gallery_exhibition: { en: 'Related Gallery Exhibitions', cn: '相关画廊展览' },
  order: { en: 'Order', cn: '顺序' },
  language: { en: 'Language', cn: '语言' },          // 新增
  mark: { en: 'Mark', cn: '标记' },                  // 新增
};

// Delete dialog labels
export const deleteDialogLabels = {
  delete_dialog_this_item_en: "this bibliography entry",
  delete_dialog_this_item_cn: "该书目条目",
  confirmDeleteEntry_en: "Are you sure you want to delete this bibliography entry?",
  confirmDeleteEntry_cn: "确定要删除该书目条目吗？",
  thisEntry_en: "this entry",
  thisEntry_cn: "该条目",
};

// Additional labels (placeholders, descriptions, etc.)
export const additionalLabels = {
  // Placeholder and description labels
  selectType_en: "Select Type",
  selectType_cn: "选择类型",
  selectYear_en: "Select Year",
  selectYear_cn: "选择年份",
  selectLanguage_en: "Select Language",      // 新增
  selectLanguage_cn: "选择语言",            // 新增
  titlePlaceholder_en: "Enter title",
  titlePlaceholder_cn: "输入标题",
  subtitlePlaceholder_en: "Enter subtitle",
  subtitlePlaceholder_cn: "输入副标题",
  coverImageUrlPlaceholder_en: "Enter cover image URL",
  coverImageUrlPlaceholder_cn: "输入封面图片URL",
  authorPlaceholder_en: "Enter author name",
  authorPlaceholder_cn: "输入作者名称",
  typePlaceholder_en: "Enter type (e.g., Book, Article)",
  typePlaceholder_cn: "输入类型（如：书籍、文章）",
  yearPlaceholder_en: "Enter year (e.g., 2024)",
  yearPlaceholder_cn: "输入年份（如：2024）",
  datePlaceholder_en: "Enter date",
  datePlaceholder_cn: "输入日期",
  publishedAtPlaceholder_en: "Enter publication date",
  publishedAtPlaceholder_cn: "输入出版时间",
  pdfUrlPlaceholder_en: "Enter PDF URL",
  pdfUrlPlaceholder_cn: "输入PDF链接",
  webUrlPlaceholder_en: "Enter website URL",
  webUrlPlaceholder_cn: "输入网页链接",
  videoUrlPlaceholder_en: "Enter video URL",
  videoUrlPlaceholder_cn: "输入视频链接",
  relatedGalleryExhibitionPlaceholder_en: "Enter related gallery exhibition IDs (comma separated)",
  relatedGalleryExhibitionPlaceholder_cn: "输入相关画廊展览ID（逗号分隔）",
  languagePlaceholder_en: "Enter language (e.g., English, Chinese)",  // 新增
  languagePlaceholder_cn: "输入语言（如：英语、中文）",              // 新增
  markPlaceholder_en: "Enter mark (optional)",                        // 新增
  markPlaceholder_cn: "输入标记（可选）",                            // 新增
  
  // Related gallery exhibitions labels
  relatedGalleryExhibition_en: "Related Gallery Exhibitions",
  relatedGalleryExhibition_cn: "相关画廊展览",
  relatedGalleryExhibitionSummary_en: "Associated Exhibitions",
  relatedGalleryExhibitionSummary_cn: "关联展览",
  relatedGalleryExhibitionDescription_en: "Add related gallery or exhibition IDs.",
  relatedGalleryExhibitionDescription_cn: "添加相关的画廊或展览ID。",
  
  // Entity and collection labels
  no_entries_en: "No bibliography entries found",
  no_entries_cn: "未找到书目条目",
  
  // Search and filter labels
  searchEntries_en: "Search bibliography entries",
  searchEntries_cn: "搜索书目条目",
  
  // Status and error labels
  noFeaturedEntries_en: "No featured bibliography entries available",
  noFeaturedEntries_cn: "暂无精选书目条目",
  noMatchingEntries_en: "No matching bibliography entries found",
  noMatchingEntries_cn: "没有找到符合条件的书目条目",
};

// UI Text Configuration (compact error/message strings)
export const UI_TEXT = {
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  bibliographyManagement: { en: 'Bibliography Management', cn: '书目管理' },
  noData: { en: 'No bibliography entries available', cn: '暂无书目条目数据' },
  noMatchingEntries: { en: 'No matching bibliography entries found', cn: '未找到匹配的书目条目' },
  all: { en: 'All', cn: '全部' },
  totalCount: { en: 'Total', cn: '总计' },
  exportSuccess: { en: 'Export successful', cn: '导出成功' },
  exportError: { en: 'Export failed', cn: '导出失败' },
  exportInProgress: { en: 'Exporting...', cn: '导出中...' }
};

// Combined labels object for easy access
export const bibliographyLabels = {
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
  fieldLabelsForComponents,
  UI_TEXT: UI_TEXT,
  PAGE_TEXT,
};

// Helper function to get labels
export const getBibliographyLabel = (key, language = 'en') => {
  if (!key) return '';
  
  // Try direct field labels first (slash format string)
  if (fieldLabels[key]) {
    // fieldLabels[key] is like "Title / 标题"
    if (language === 'en') {
      return fieldLabels[key].split('/')[0].trim();
    } else {
      return fieldLabels[key].split('/')[1]?.trim() || fieldLabels[key];
    }
  }
  
  // Try labels with language suffix
  const labelKey = `${key}_${language}`;
  if (bibliographyLabels[labelKey]) {
    return bibliographyLabels[labelKey];
  }
  
  // Fallback to English if Chinese not found
  if (language === 'cn') {
    const englishKey = `${key}_en`;
    if (bibliographyLabels[englishKey]) {
      return bibliographyLabels[englishKey];
    }
  }
  
  return key;
};

// Helper function to get UI text
export const getBibliographyUIText = (key, language = 'en') => {
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
export default bibliographyLabels;