// Field labels based on About Prisma model
export const fieldLabels = {
  // Core fields
  portrait_image_url: "Portrait Image / 肖像图片",
  artist:" Name / 名称",
  caption: "Caption / 说明",
  introductions: "Introduction / 介绍",
  pdf_url: "PDF URL / PDF链接",           // 新增
  web_url: "Website URL / 网页链接",       // 新增
  language: "Language / 语言",
  order: "Order / 顺序",
  mark: "Mark / 标记",
  
  // Timestamps
  updatedAt: "Last Updated / 最后更新",
};

// Page text labels
export const PAGE_TEXT = {
  // Page Title
  pageTitle: {
    EN: "About Management",
    CN: "关于管理",
  },
  
  // Item Name
  itemName: {
    EN: "About Entry",
    CN: "关于条目",
  },
  
  // Create Button Tooltip
  createTooltip: {
    EN: "Create New About Entry",
    CN: "创建新关于条目",
  },
  
  // Filter Labels
  filters: {
    language: { EN: "Language", CN: "语言" },
    mark: { EN: "Mark", CN: "标记" },
  },
  
  // Control Panel
  controlPanel: {
    sortByOrder: { EN: "Sort by Order", CN: "按顺序排序" },
    sortByOrderTooltip: { EN: "Sort entries by order", CN: "按顺序排序条目" },
    sortByUpdate: { EN: "Sort by Update", CN: "按更新排序" },
    sortByUpdateTooltip: { EN: "Sort by update date", CN: "按更新日期排序" },
    exportData: { EN: "Export Data", CN: "导出数据" },
    exportDataTooltip: { EN: "Export about data", CN: "导出关于数据" },
  },
  
  // Field Labels
  fields: {
    portraitImageUrl: { EN: "Portrait Image", CN: "肖像图片" },
    caption: { EN: "Caption", CN: "说明" },
    introductions: { EN: "Introduction", CN: "介绍" },
    pdfUrl: { EN: "PDF URL", CN: "PDF链接" },          // 新增
    webUrl: { EN: "Website URL", CN: "网页链接" },      // 新增
    language: { EN: "Language", CN: "语言" },
    order: { EN: "Order", CN: "顺序" },
    mark: { EN: "Mark", CN: "标记" },
    updatedAt: { EN: "Updated At", CN: "更新时间" },
  },
  
  // Empty State Messages
  emptyState: {
    noData: { EN: "No about entries found", CN: "暂无关于条目" },
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
  create_en: "Create About Entry",
  create_cn: "创建关于条目",
  edit_en: "Edit About Entry",
  edit_cn: "编辑关于条目",
  delete_en: "Delete About Entry",
  delete_cn: "删除关于条目",
  export_en: "Export About Data",
  export_cn: "导出关于数据",
  import_en: "Import About Data",
  import_cn: "导入关于数据",
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
  aboutEntry_en: "About Entry",
  aboutEntry_cn: "关于条目",
  aboutEntries_en: "About Entries",
  aboutEntries_cn: "关于条目",
  untitledEntry_en: "Untitled Entry",
  untitledEntry_cn: "无标题条目",
};

// Filter labels
export const filterLabels = {
  all_languages_en: "All Languages",
  all_languages_cn: "全部语言",
  all_marks_en: "All Marks",
  all_marks_cn: "全部标记",
};

// Sort labels
export const sortLabels = {
  sort_by_order_en: "Sort by Order",
  sort_by_order_cn: "按顺序排序",
  sort_by_update_en: "Sort by Update",
  sort_by_update_cn: "按更新排序",
};

// Page labels
export const pageLabels = {
  title_en: "About Management",
  title_cn: "关于管理",
  description_en: "Manage artist biography and about information",
  description_cn: "管理艺术家传记和关于信息",
};

// UI Text labels
export const uiTextLabels = {
  pageTitle: { en: 'About Index', cn: '关于索引' },
  caption: { en: 'Caption', cn: '说明' },
  language: { en: 'Language', cn: '语言' },
  mark: { en: 'Mark', cn: '标记' },
  all: { en: 'All', cn: '全部' },
  noItemsFound: { 
    en: 'No items found matching the criteria', 
    cn: '没有找到符合条件的项目' 
  },
  noEntriesFound: { 
    en: 'No about entries found matching the criteria', 
    cn: '没有找到符合条件的关于条目' 
  },
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  fields: {
    artist: { en: 'Artist', cn: '艺术家' },
    caption: { en: 'Caption', cn: '说明' },
    language: { en: 'Language', cn: '语言' },
    // 如果需要，可以添加 pdf_url 和 web_url，但 uiTextLabels.fields 主要用于筛选，此处不加也可
  }
};

// Display labels
export const displayLabels = {
  detailButtonText: (isCn) => isCn ? '查看详情' : 'See Details',
  emptyMessage: (isCn) => isCn ? '没有可显示的关于条目' : 'No about entries to display',
  noMatchMessage: (isCn) => isCn ? '未找到匹配的条目' : 'No matching entries found',
  loadingMessage: (isCn) => isCn ? '加载中...' : 'Loading...',
  errorMessage: (isCn) => isCn ? '加载失败' : 'Failed to load',
};

// Control panel labels
export const controlPanelLabels = {
  language: '语言',
  mark: '标记',
  sortByOrder: '按顺序排序',
  sortByOrderTooltip: 'Sort by Order',
  sortByUpdate: '按更新排序',
  sortByUpdateTooltip: 'Sort by Update',
  artistLabel_en: "Artist",
  artistLabel_cn: "艺术家",
  languageLabel_en: "Language",
  languageLabel_cn: "语言",
  markLabel_en: "Mark",
  markLabel_cn: "标记",
};

// Default content labels
export const defaultContentLabels = {
  listTitle: (isCn) => isCn ? "关于列表" : "ABOUT LIST",
  detailsLabel: (isCn) => isCn ? "关于详情" : "ABOUT DETAILS",
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
    title: (isCn) => isCn ? "媒体" : "Media",
  },
  content: {
    title: (isCn) => isCn ? "内容" : "Content",
  },
};

// Field labels for components (object with en/cn)
export const fieldLabelsForComponents = {
  portrait_image_url: { en: 'Portrait Image', cn: '肖像图片' },
  caption: { en: 'Caption', cn: '说明' },
  introductions: { en: 'Introduction', cn: '介绍' },
  pdf_url: { en: 'PDF URL', cn: 'PDF链接' },          // 新增
  web_url: { en: 'Website URL', cn: '网页链接' },      // 新增
  language: { en: 'Language', cn: '语言' },
  order: { en: 'Order', cn: '顺序' },
  mark: { en: 'Mark', cn: '标记' },
};

// Delete dialog labels
export const deleteDialogLabels = {
  delete_dialog_this_item_en: "this about entry",
  delete_dialog_this_item_cn: "该关于条目",
  confirmDeleteEntry_en: "Are you sure you want to delete this about entry?",
  confirmDeleteEntry_cn: "确定要删除该关于条目吗？",
  thisEntry_en: "this entry",
  thisEntry_cn: "该条目",
};

// Additional labels (introductions management, placeholders, etc.)
export const additionalLabels = {
  // Placeholder and description labels
  selectLanguage_en: "Select Language",
  selectLanguage_cn: "选择语言",
  selectMark_en: "Select Mark",
  selectMark_cn: "选择标记",
  portraitImageUrlPlaceholder_en: "Enter portrait image URL",
  portraitImageUrlPlaceholder_cn: "输入肖像图片URL",
  captionPlaceholder_en: "Enter a short caption",
  captionPlaceholder_cn: "输入简短说明",
  // 可添加 pdf_url 和 web_url 的占位符（可选）
  pdfUrlPlaceholder_en: "Enter PDF URL",
  pdfUrlPlaceholder_cn: "输入PDF链接",
  webUrlPlaceholder_en: "Enter website URL",
  webUrlPlaceholder_cn: "输入网页链接",
  
  // Introduction labels
  introduction_en: "Introduction",
  introduction_cn: "介绍",
  introductionSummary_en: "Introduction Paragraphs",
  introductionSummary_cn: "介绍段落",
  introductionDescription_en: "Add introductions paragraphs (supports HTML).",
  introductionDescription_cn: "添加介绍段落（支持HTML）。",
  addIntroductionButton_en: "Add Paragraph",
  addIntroductionButton_cn: "添加段落",
  removeIntroductionButton_en: "Remove",
  removeIntroductionButton_cn: "移除",
  
  // Entity and collection labels
  no_entries_en: "No about entries found",
  no_entries_cn: "未找到关于条目",
  
  // Search and filter labels
  searchEntries_en: "Search about entries",
  searchEntries_cn: "搜索关于条目",
  
  // Status and error labels
  noFeaturedEntries_en: "No featured about entries available",
  noFeaturedEntries_cn: "暂无精选关于条目",
  noMatchingEntries_en: "No matching about entries found",
  noMatchingEntries_cn: "没有找到符合条件的关于条目",
};

// UI Text Configuration (compact error/message strings)
export const UI_TEXT = {
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  aboutManagement: { en: 'About Management', cn: '关于管理' },
  noData: { en: 'No about entries available', cn: '暂无关于条目数据' },
  noMatchingEntries: { en: 'No matching about entries found', cn: '未找到匹配的关于条目' },
  all: { en: 'All', cn: '全部' },
  totalCount: { en: 'Total', cn: '总计' },
  exportSuccess: { en: 'Export successful', cn: '导出成功' },
  exportError: { en: 'Export failed', cn: '导出失败' },
  exportInProgress: { en: 'Exporting...', cn: '导出中...' }
};

// Combined labels object for easy access
export const aboutLabels = {
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
export const getAboutLabel = (key, language = 'en') => {
  if (!key) return '';
  
  // Try direct field labels first (slash format string)
  if (fieldLabels[key]) {
    // fieldLabels[key] is like "Artist / 艺术家"
    if (language === 'en') {
      return fieldLabels[key].split('/')[0].trim();
    } else {
      return fieldLabels[key].split('/')[1]?.trim() || fieldLabels[key];
    }
  }
  
  // Try labels with language suffix
  const labelKey = `${key}_${language}`;
  if (aboutLabels[labelKey]) {
    return aboutLabels[labelKey];
  }
  
  // Fallback to English if Chinese not found
  if (language === 'cn') {
    const englishKey = `${key}_en`;
    if (aboutLabels[englishKey]) {
      return aboutLabels[englishKey];
    }
  }
  
  return key;
};

// Helper function to get UI text
export const getAboutUIText = (key, language = 'en') => {
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
export default aboutLabels;