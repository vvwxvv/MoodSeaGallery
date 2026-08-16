// Field labels based on Web Prisma model
export const fieldLabels = {
  // Core fields
  web_url: "Web URL / 网页链接",
  tag_en: "Tag (EN) / 标签 (英文)",
  tag_cn: "Tag (CN) / 标签 (中文)",
  type: "Type / 类型",
  caption_en: "Caption (EN) / 说明 (英文)",
  caption_cn: "Caption (CN) / 说明 (中文)",
  mark: "Mark / 标记",
  tag_source: "Tag Source / 标签来源",
  order: "Order / 顺序",
  
  // Timestamps
  updatedAt: "Last Updated / 最后更新",
};

// Page text labels
export const PAGE_TEXT = {
  // Page Title
  pageTitle: {
    EN: "Web Management",
    CN: "网页管理",
  },
  
  // Item Name
  itemName: {
    EN: "Web",
    CN: "网页",
  },
  
  // Create Button Tooltip
  createTooltip: {
    EN: "Create New Web",
    CN: "创建新网页",
  },
  
  // Filter Labels
  filters: {
    tag: { EN: "Tag", CN: "标签" },
    type: { EN: "Type", CN: "类型" },
    tag_source: { EN: "Tag Source", CN: "标签来源" },
    mark: { EN: "Mark", CN: "标记" },
    order: { EN: "Order", CN: "顺序" },
  },
  
  // Control Panel
  controlPanel: {
    sortByOrder: { EN: "Sort by Order", CN: "按顺序排序" },
    sortByOrderTooltip: { EN: "Sort webs by order", CN: "按顺序排序网页" },
    sortByUpdate: { EN: "Sort by Update", CN: "按更新排序" },
    sortByUpdateTooltip: { EN: "Sort by update date", CN: "按更新日期排序" },
    exportData: { EN: "Export Data", CN: "导出数据" },
    exportDataTooltip: { EN: "Export web data", CN: "导出网页数据" },
  },
  
  // Field Labels
  fields: {
    webUrl: { EN: "Web URL", CN: "网页链接" },
    tagEn: { EN: "Tag (EN)", CN: "标签 (英文)" },
    tagCn: { EN: "Tag (CN)", CN: "标签 (中文)" },
    tag: { EN: "Tag", CN: "标签" },
    type: { EN: "Type", CN: "类型" },
    captionEn: { EN: "Caption (EN)", CN: "说明 (英文)" },
    captionCn: { EN: "Caption (CN)", CN: "说明 (中文)" },
    caption: { EN: "Caption", CN: "说明" },
    mark: { EN: "Mark", CN: "标记" },
    tagSource: { EN: "Tag Source", CN: "标签来源" },
    order: { EN: "Order", CN: "顺序" },
    updatedAt: { EN: "Updated At", CN: "更新时间" },
  },
  
  // Empty State Messages
  emptyState: {
    noData: { EN: "No webs found", CN: "暂无网页" },
    noMatchingWebs: { EN: "No matching webs", CN: "没有匹配的网页" },
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
    webs: { EN: "webs", CN: "个网页" },
  },
};

// Action labels
export const actionLabels = {
  create_en: "Create Web",
  create_cn: "创建网页",
  edit_en: "Edit Web",
  edit_cn: "编辑网页",
  delete_en: "Delete Web",
  delete_cn: "删除网页",
  export_en: "Export Webs",
  export_cn: "导出网页",
  import_en: "Import Webs",
  import_cn: "导入网页",
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
  web_en: "Web",
  web_cn: "网页",
  webs_en: "Webs",
  webs_cn: "网页",
  untitledWeb_en: "Untitled Web",
  untitledWeb_cn: "无题网页",
};

// Filter labels
export const filterLabels = {
  all_tags_en: "All Tags",
  all_tags_cn: "全部标签",
  all_types_en: "All Types",
  all_types_cn: "全部类型",
  all_tag_sources_en: "All Tag Sources",
  all_tag_sources_cn: "全部标签来源",
  all_marks_en: "All Marks",
  all_marks_cn: "全部标记",
};

// Sort labels
export const sortLabels = {
  sort_by_tag_en: "Sort by Tag",
  sort_by_tag_cn: "按标签排序",
  sort_by_type_en: "Sort by Type",
  sort_by_type_cn: "按类型排序",
  sort_by_tag_source_en: "Sort by Tag Source",
  sort_by_tag_source_cn: "按标签来源排序",
  sort_by_order_en: "Sort by Order",
  sort_by_order_cn: "按顺序排序",
  sort_by_update_en: "Sort by Update",
  sort_by_update_cn: "按更新排序",
};

// Page labels
export const pageLabels = {
  title_en: "Web Management",
  title_cn: "网页管理",
  description_en: "Manage and organize web content",
  description_cn: "管理和组织网页内容",
};

// UI Text labels
export const uiTextLabels = {
  pageTitle: { en: 'Web Index', cn: '网页索引' },
  tag: { en: 'Tag', cn: '标签' },
  type: { en: 'Type', cn: '类型' },
  tag_source: { en: 'Tag Source', cn: '标签来源' },
  mark: { en: 'Mark', cn: '标记' },
  order: { en: 'Order', cn: '顺序' },
  all: { en: 'All', cn: '全部' },
  other: { en: 'Other', cn: '其他' },
  noItemsFound: { 
    en: 'No items found matching the criteria', 
    cn: '没有找到符合条件的项目' 
  },
  noWebsFound: { 
    en: 'No webs found matching the criteria', 
    cn: '没有找到符合条件的网页' 
  },
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  fields: {
    tag: { en: 'Tag', cn: '标签' },
    type: { en: 'Type', cn: '类型' },
    caption: { en: 'Caption', cn: '说明' },
    tag_source: { en: 'Tag Source', cn: '标签来源' },
    order: { en: 'Order', cn: '顺序' },
  }
};

// Display labels
export const displayLabels = {
  detailButtonText: (isCn) => isCn ? '查看详情' : 'See Details',
  emptyMessage: (isCn) => isCn ? '没有可显示的网页' : 'No webs to display',
  noMatchMessage: (isCn) => isCn ? '未找到匹配的网页' : 'No matching webs found',
  loadingMessage: (isCn) => isCn ? '加载中...' : 'Loading...',
  errorMessage: (isCn) => isCn ? '加载失败' : 'Failed to load',
};

// Control panel labels
export const controlPanelLabels = {
  tag: '标签',
  type: '类型',
  tag_source: '标签来源',
  mark: '标记',
  order: '顺序',
  sortByOrder: '按顺序排序',
  sortByOrderTooltip: 'Sort by Order',
  sortByUpdate: '按更新排序',
  sortByUpdateTooltip: 'Sort by Update',
  tagLabel_en: "Tag",
  tagLabel_cn: "标签",
  typeLabel_en: "Type",
  typeLabel_cn: "类型",
  tagSourceLabel_en: "Tag Source",
  tagSourceLabel_cn: "标签来源",
  markLabel_en: "Mark",
  markLabel_cn: "标记",
  orderLabel_en: "Order",
  orderLabel_cn: "顺序",
};

// Default content labels
export const defaultContentLabels = {
  listTitle: (isCn) => isCn ? "网页列表" : "WEB LIST",
  detailsLabel: (isCn) => isCn ? "网页详情" : "WEB DETAILS",
  untitled: (isCn) => isCn ? "无题网页" : "Untitled Web",
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
};

// Field labels for components
export const fieldLabelsForComponents = {
  web_url: { en: 'Web URL', cn: '网页链接' },
  tag_en: { en: 'Tag (EN)', cn: '标签 (英文)' },
  tag_cn: { en: 'Tag (CN)', cn: '标签 (中文)' },
  type: { en: 'Type', cn: '类型' },
  caption_en: { en: 'Caption (EN)', cn: '说明 (英文)' },
  caption_cn: { en: 'Caption (CN)', cn: '说明 (中文)' },
  mark: { en: 'Mark', cn: '标记' },
  tag_source: { en: 'Tag Source', cn: '标签来源' },
  order: { en: 'Order', cn: '顺序' },
};

// Delete dialog labels
export const deleteDialogLabels = {
  delete_dialog_this_item_en: "this web",
  delete_dialog_this_item_cn: "该网页",
  confirmDeleteWeb_en: "Are you sure you want to delete this web?",
  confirmDeleteWeb_cn: "确定要删除该网页吗？",
  thisWeb_en: "this web",
  thisWeb_cn: "该网页",
};

// Additional labels
export const additionalLabels = {
  // Placeholder and description labels
  selectTag_en: "Select Tag",
  selectTag_cn: "选择标签",
  enterTag_en: "Enter tag",
  enterTag_cn: "输入标签",
  selectType_en: "Select Type",
  selectType_cn: "选择类型",
  enterTypeName_en: "Enter type name",
  enterTypeName_cn: "输入类型名称",
  selectTagSource_en: "Select Tag Source",
  selectTagSource_cn: "选择标签来源",
  
  // Entity and collection labels
  no_webs_en: "No webs found",
  no_webs_cn: "未找到网页",
  
  // Search and filter labels
  searchWebs_en: "Search webs",
  searchWebs_cn: "搜索网页",
  
  // Status and error labels
  noFeaturedWebs_en: "No featured webs available",
  noFeaturedWebs_cn: "暂无精选网页",
  noMatchingWebs_en: "No matching webs found",
  noMatchingWebs_cn: "没有找到符合条件的网页",
};

// UI Text Configuration
export const UI_TEXT = {
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  webManagement: { en: 'Web Management', cn: '网页管理' },
  noData: { en: 'No webs available', cn: '暂无网页数据' },
  noMatchingWebs: { en: 'No matching webs found', cn: '未找到匹配的网页' },
  all: { en: 'All', cn: '全部' },
  totalCount: { en: 'Total', cn: '总计' },
  exportSuccess: { en: 'Export successful', cn: '导出成功' },
  exportError: { en: 'Export failed', cn: '导出失败' },
  exportInProgress: { en: 'Exporting...', cn: '导出中...' }
};

// Combined labels object for easy access
export const webLabels = {
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
export const getWebLabel = (key, language = 'en') => {
  if (!key) return '';
  
  // Try direct field labels first
  if (fieldLabels[key]) {
    return fieldLabels[key][language] || fieldLabels[key]['en'] || key;
  }
  
  // Try labels with language suffix
  const labelKey = `${key}_${language}`;
  if (webLabels[labelKey]) {
    return webLabels[labelKey];
  }
  
  // Fallback to English if Chinese not found
  if (language === 'cn') {
    const englishKey = `${key}_en`;
    if (webLabels[englishKey]) {
      return webLabels[englishKey];
    }
  }
  
  return key;
};

// Helper function to get UI text
export const getWebUIText = (key, language = 'en') => {
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
export default webLabels;