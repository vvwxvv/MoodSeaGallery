// Field labels based on Video Prisma model
export const fieldLabels = {
  // Core fields
  video_url: "Video URL / 视频链接",
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
    EN: "Video Management",
    CN: "视频管理",
  },
  
  // Item Name
  itemName: {
    EN: "Video",
    CN: "视频",
  },
  
  // Create Button Tooltip
  createTooltip: {
    EN: "Create New Video",
    CN: "创建新视频",
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
    sortByOrderTooltip: { EN: "Sort videos by order", CN: "按顺序排序视频" },
    sortByUpdate: { EN: "Sort by Update", CN: "按更新排序" },
    sortByUpdateTooltip: { EN: "Sort by update date", CN: "按更新日期排序" },
    exportData: { EN: "Export Data", CN: "导出数据" },
    exportDataTooltip: { EN: "Export video data", CN: "导出视频数据" },
  },
  
  // Field Labels
  fields: {
    videoUrl: { EN: "Video URL", CN: "视频链接" },
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
    noData: { EN: "No videos found", CN: "暂无视频" },
    noMatchingVideos: { EN: "No matching videos", CN: "没有匹配的视频" },
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
    videos: { EN: "videos", CN: "个视频" },
  },
};

// Action labels
export const actionLabels = {
  create_en: "Create Video",
  create_cn: "创建视频",
  edit_en: "Edit Video",
  edit_cn: "编辑视频",
  delete_en: "Delete Video",
  delete_cn: "删除视频",
  export_en: "Export Videos",
  export_cn: "导出视频",
  import_en: "Import Videos",
  import_cn: "导入视频",
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
  video_en: "Video",
  video_cn: "视频",
  videos_en: "Videos",
  videos_cn: "视频",
  untitledVideo_en: "Untitled Video",
  untitledVideo_cn: "无题视频",
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
  title_en: "Video Management",
  title_cn: "视频管理",
  description_en: "Manage and organize video content",
  description_cn: "管理和组织视频内容",
};

// UI Text labels
export const uiTextLabels = {
  pageTitle: { en: 'Video Index', cn: '视频索引' },
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
  noVideosFound: { 
    en: 'No videos found matching the criteria', 
    cn: '没有找到符合条件的视频' 
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
  emptyMessage: (isCn) => isCn ? '没有可显示的视频' : 'No videos to display',
  noMatchMessage: (isCn) => isCn ? '未找到匹配的视频' : 'No matching videos found',
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
  listTitle: (isCn) => isCn ? "视频列表" : "VIDEO LIST",
  detailsLabel: (isCn) => isCn ? "视频详情" : "VIDEO DETAILS",
  untitled: (isCn) => isCn ? "无题视频" : "Untitled Video",
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
  video_url: { en: 'Video URL', cn: '视频链接' },
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
  delete_dialog_this_item_en: "this video",
  delete_dialog_this_item_cn: "该视频",
  confirmDeleteVideo_en: "Are you sure you want to delete this video?",
  confirmDeleteVideo_cn: "确定要删除该视频吗？",
  thisVideo_en: "this video",
  thisVideo_cn: "该视频",
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
  no_videos_en: "No videos found",
  no_videos_cn: "未找到视频",
  
  // Search and filter labels
  searchVideos_en: "Search videos",
  searchVideos_cn: "搜索视频",
  
  // Status and error labels
  noFeaturedVideos_en: "No featured videos available",
  noFeaturedVideos_cn: "暂无精选视频",
  noMatchingVideos_en: "No matching videos found",
  noMatchingVideos_cn: "没有找到符合条件的视频",
};

// UI Text Configuration
export const UI_TEXT = {
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  videoManagement: { en: 'Video Management', cn: '视频管理' },
  noData: { en: 'No videos available', cn: '暂无视频数据' },
  noMatchingVideos: { en: 'No matching videos found', cn: '未找到匹配的视频' },
  all: { en: 'All', cn: '全部' },
  totalCount: { en: 'Total', cn: '总计' },
  exportSuccess: { en: 'Export successful', cn: '导出成功' },
  exportError: { en: 'Export failed', cn: '导出失败' },
  exportInProgress: { en: 'Exporting...', cn: '导出中...' }
};

// Combined labels object for easy access
export const videoLabels = {
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
export const getVideoLabel = (key, language = 'en') => {
  if (!key) return '';
  
  // Try direct field labels first
  if (fieldLabels[key]) {
    return fieldLabels[key][language] || fieldLabels[key]['en'] || key;
  }
  
  // Try labels with language suffix
  const labelKey = `${key}_${language}`;
  if (videoLabels[labelKey]) {
    return videoLabels[labelKey];
  }
  
  // Fallback to English if Chinese not found
  if (language === 'cn') {
    const englishKey = `${key}_en`;
    if (videoLabels[englishKey]) {
      return videoLabels[englishKey];
    }
  }
  
  return key;
};

// Helper function to get UI text
export const getVideoUIText = (key, language = 'en') => {
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
export default videoLabels;