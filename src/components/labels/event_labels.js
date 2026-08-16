// Field labels based on Event Prisma model
export const fieldLabels = {
  // Core fields
  cover_img_url: { en: "Cover Image", cn: "封面图片" },
  title: { en: "Title", cn: "标题" },
  subtitle: { en: "Subtitle", cn: "副标题" },
  year: { en: "Year", cn: "年份" },
  date_time: { en: "Date & Time", cn: "日期与时间" },
  type: { en: "Type", cn: "类型" },
  host: { en: "Host", cn: "主办方" },
  support: { en: "Support", cn: "支持单位" },
  special_thanks: { en: "Special Thanks", cn: "特别鸣谢" },
  venue: { en: "Venue", cn: "场地" },
  address: { en: "Address", cn: "地址" },
  caption: { en: "Caption", cn: "说明" },
  introduction: { en: "Introduction", cn: "介绍" },
  related_artist: { en: "Related Artist", cn: "相关艺术家" },
  web_url: { en: "Website URL", cn: "网站链接" },
  video_url: { en: "Video URL", cn: "视频链接" },

  // Metadata fields
  order: { en: "Order", cn: "排序" },
  mark: { en: "Mark", cn: "标记" },
  language: { en: "Language", cn: "语言" },

  // Timestamps
  updatedAt: { en: "Last Updated", cn: "最后更新" },
};

// Page text labels
export const PAGE_TEXT = {
  // Page Title
  pageTitle: {
    EN: "Event Management",
    CN: "活动管理",
  },

  // Item Name
  itemName: {
    EN: "Event",
    CN: "活动",
  },

  // Create Button Tooltip
  createTooltip: {
    EN: "Create New Event",
    CN: "创建新活动",
  },

  // Filter Labels
  filters: {
    title: { EN: "Title", CN: "标题" },
    type: { EN: "Type", CN: "类型" },
    year: { EN: "Year", CN: "年份" },
    date_time: { EN: "Date & Time", CN: "日期与时间" },
    venue: { EN: "Venue", CN: "场地" },
    language: { EN: "Language", CN: "语言" },
    mark: { EN: "Mark", CN: "标记" },
    order: { EN: "Order", CN: "排序" },
    host: { EN: "Host", CN: "主办方" },
    support: { EN: "Support", CN: "支持单位" },
  },

  // Control Panel
  controlPanel: {
    sortByDate: { EN: "Sort by Date & Time", CN: "按日期时间排序" },
    sortByDateTooltip: { EN: "Sort events by date & time", CN: "按日期时间排序活动" },
    sortByOrder: { EN: "Sort by Order", CN: "按顺序排序" },
    sortByOrderTooltip: { EN: "Sort events by order", CN: "按顺序排序活动" },
    sortByUpdate: { EN: "Sort by Update", CN: "按更新排序" },
    sortByUpdateTooltip: { EN: "Sort by update date", CN: "按更新日期排序活动" },
    exportData: { EN: "Export Data", CN: "导出数据" },
    exportDataTooltip: { EN: "Export event data", CN: "导出活动数据" },
  },

  // Field Labels
  fields: {
    coverImageUrl: { EN: "Cover Image", CN: "封面图片" },
    title: { EN: "Title", CN: "标题" },
    subtitle: { EN: "Subtitle", CN: "副标题" },
    year: { EN: "Year", CN: "年份" },
    date_time: { EN: "Date & Time", CN: "日期与时间" },
    type: { EN: "Type", CN: "类型" },
    host: { EN: "Host", CN: "主办方" },
    support: { EN: "Support", CN: "支持单位" },
    special_thanks: { EN: "Special Thanks", CN: "特别鸣谢" },
    venue: { EN: "Venue", CN: "场地" },
    address: { EN: "Address", CN: "地址" },
    caption: { EN: "Caption", CN: "说明" },
    introduction: { EN: "Introduction", CN: "介绍" },
    related_artist: { EN: "Related Artist", CN: "相关艺术家" },
    web_url: { EN: "Website URL", CN: "网站链接" },
    video_url: { EN: "Video URL", CN: "视频链接" },
    order: { EN: "Order", CN: "排序" },
    mark: { EN: "Mark", CN: "标记" },
    language: { EN: "Language", CN: "语言" },
    updatedAt: { EN: "Updated At", CN: "更新时间" },
  },

  // Empty State Messages
  emptyState: {
    noData: { EN: "No events found", CN: "暂无活动" },
    noMatchingEvents: { EN: "No matching events", CN: "没有匹配的活动" },
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
    events: { EN: "events", CN: "个活动" },
  },
};

// Action labels
export const actionLabels = {
  create_en: "Create Event",
  create_cn: "创建活动",
  edit_en: "Edit Event",
  edit_cn: "编辑活动",
  delete_en: "Delete Event",
  delete_cn: "删除活动",
  export_en: "Export Events",
  export_cn: "导出活动",
  import_en: "Import Events",
  import_cn: "导入活动",
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
  event_en: "Event",
  event_cn: "活动",
  events_en: "Events",
  events_cn: "活动",
  untitledEvent_en: "Untitled Event",
  untitledEvent_cn: "无题活动",
};

// Filter labels
export const filterLabels = {
  all_titles_en: "All Titles",
  all_titles_cn: "全部标题",
  all_types_en: "All Types",
  all_types_cn: "全部类型",
  all_years_en: "All Years",
  all_years_cn: "全部年份",
  all_venues_en: "All Venues",
  all_venues_cn: "全部场地",
  all_marks_en: "All Marks",
  all_marks_cn: "全部标记",
  all_languages_en: "All Languages",
  all_languages_cn: "全部语言",
  all_hosts_en: "All Hosts",
  all_hosts_cn: "全部主办方",
  all_supports_en: "All Support",
  all_supports_cn: "全部支持单位",
};

// Sort labels
export const sortLabels = {
  sort_by_title_en: "Sort by Title",
  sort_by_title_cn: "按标题排序",
  sort_by_date_en: "Sort by Date",
  sort_by_date_cn: "按日期排序",
  sort_by_year_en: "Sort by Year",
  sort_by_year_cn: "按年份排序",
  sort_by_type_en: "Sort by Type",
  sort_by_type_cn: "按类型排序",
  sort_by_venue_en: "Sort by Venue",
  sort_by_venue_cn: "按场地排序",
  sort_by_order_en: "Sort by Order",
  sort_by_order_cn: "按顺序排序",
  sort_by_update_en: "Sort by Update",
  sort_by_update_cn: "按更新排序",
};

// Page labels
export const pageLabels = {
  title_en: "Event Management",
  title_cn: "活动管理",
  description_en: "Manage and organize event content",
  description_cn: "管理和组织活动内容",
};

// UI Text labels
export const uiTextLabels = {
  pageTitle: { en: 'Event Index', cn: '活动索引' },
  title: { en: 'Title', cn: '标题' },
  subtitle: { en: 'Subtitle', cn: '副标题' },
  type: { en: 'Type', cn: '类型' },
  year: { en: 'Year', cn: '年份' },
  date_time: { en: 'Date & Time', cn: '日期与时间' },
  host: { en: 'Host', cn: '主办方' },
  support: { en: 'Support', cn: '支持单位' },
  special_thanks: { en: 'Special Thanks', cn: '特别鸣谢' },
  venue: { en: 'Venue', cn: '场地' },
  address: { en: 'Address', cn: '地址' },
  order: { en: 'Order', cn: '排序' },
  mark: { en: 'Mark', cn: '标记' },
  language: { en: 'Language', cn: '语言' },
  all: { en: 'All', cn: '全部' },
  other: { en: 'Other', cn: '其他' },
  noItemsFound: {
    en: 'No items found matching the criteria',
    cn: '没有找到符合条件的项目'
  },
  noEventsFound: {
    en: 'No events found matching the criteria',
    cn: '没有找到符合条件的活动'
  },
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  fields: {
    title: { en: 'Title', cn: '标题' },
    subtitle: { en: 'Subtitle', cn: '副标题' },
    type: { en: 'Type', cn: '类型' },
    year: { en: 'Year', cn: '年份' },
    date_time: { en: 'Date & Time', cn: '日期与时间' },
    host: { en: 'Host', cn: '主办方' },
    support: { en: 'Support', cn: '支持单位' },
    special_thanks: { en: 'Special Thanks', cn: '特别鸣谢' },
    venue: { en: 'Venue', cn: '场地' },
    address: { en: 'Address', cn: '地址' },
    order: { en: 'Order', cn: '排序' },
  }
};

// Display labels
export const displayLabels = {
  detailButtonText: (isCn) => isCn ? '查看详情' : 'See Details',
  emptyMessage: (isCn) => isCn ? '没有可显示的活动' : 'No events to display',
  noMatchMessage: (isCn) => isCn ? '未找到匹配的活动' : 'No matching events found',
  loadingMessage: (isCn) => isCn ? '加载中...' : 'Loading...',
  errorMessage: (isCn) => isCn ? '加载失败' : 'Failed to load',
};

// Control panel labels
export const controlPanelLabels = {
  title: (isCn) => isCn ? '标题' : 'Title',
  type: (isCn) => isCn ? '类型' : 'Type',
  year: (isCn) => isCn ? '年份' : 'Year',
  date_time: (isCn) => isCn ? '日期与时间' : 'Date & Time',
  venue: (isCn) => isCn ? '场地' : 'Venue',
  order: (isCn) => isCn ? '排序' : 'Order',
  language: (isCn) => isCn ? '语言' : 'Language',
  mark: (isCn) => isCn ? '标记' : 'Mark',
  host: (isCn) => isCn ? '主办方' : 'Host',
  support: (isCn) => isCn ? '支持单位' : 'Support',
  sortByTitle: (isCn) => isCn ? '按标题排序' : 'Sort by Title',
  sortByTitleTooltip: (isCn) => isCn ? '按标题排序活动' : 'Sort events by title',
  sortByDate: (isCn) => isCn ? '按日期时间排序' : 'Sort by Date & Time',
  sortByDateTooltip: (isCn) => isCn ? '按日期时间排序活动' : 'Sort events by date & time',
  sortByOrder: (isCn) => isCn ? '按顺序排序' : 'Sort by Order',
  sortByOrderTooltip: (isCn) => isCn ? '按顺序排序活动' : 'Sort events by order',
  sortByUpdate: (isCn) => isCn ? '按更新排序' : 'Sort by Update',
  sortByUpdateTooltip: (isCn) => isCn ? '按更新日期排序' : 'Sort by update date',
  // Backwards compatibility
  titleLabel_en: "Title",
  titleLabel_cn: "标题",
  typeLabel_en: "Type",
  typeLabel_cn: "类型",
  yearLabel_en: "Year",
  yearLabel_cn: "年份",
  venueLabel_en: "Venue",
  venueLabel_cn: "场地",
  orderLabel_en: "Order",
  orderLabel_cn: "排序",
  languageLabel_en: "Language",
  languageLabel_cn: "语言",
  markLabel_en: "Mark",
  markLabel_cn: "标记",
  hostLabel_en: "Host",
  hostLabel_cn: "主办方",
  supportLabel_en: "Support",
  supportLabel_cn: "支持单位",
};

// Default content labels
export const defaultContentLabels = {
  listTitle: (isCn) => isCn ? "活动列表" : "EVENT LIST",
  detailsLabel: (isCn) => isCn ? "活动详情" : "EVENT DETAILS",
  untitled: (isCn) => isCn ? "无题活动" : "Untitled Event",
  noDescription: (isCn) => isCn ? '暂无描述' : 'No description available',
  back: (isCn) => isCn ? "返回" : "BACK",
};

// Field group labels — matches eventConfig fieldGroups: BASIC, ADDITIONAL, IMAGES
export const fieldGroupLabels = {
  basic: {
    title: (isCn) => isCn ? "基本信息" : "Basic Info",
  },
  additional: {
    title: (isCn) => isCn ? "附加信息" : "Additional Info",
  },
  images: {
    title: (isCn) => isCn ? "图片" : "Images",
  },
  // Legacy aliases
  location: {
    title: (isCn) => isCn ? "位置信息" : "Location Details",
  },
  content: {
    title: (isCn) => isCn ? "内容" : "Content",
  },
};

// Field labels for components — all Prisma Event fields
export const fieldLabelsForComponents = {
  cover_img_url: { en: 'Cover Image', cn: '封面图片' },
  title: { en: 'Title', cn: '标题' },
  subtitle: { en: 'Subtitle', cn: '副标题' },
  type: { en: 'Type', cn: '类型' },
  year: { en: 'Year', cn: '年份' },
  date_time: { en: 'Date & Time', cn: '日期与时间' },
  host: { en: 'Host', cn: '主办方' },
  support: { en: 'Support', cn: '支持单位' },
  special_thanks: { en: 'Special Thanks', cn: '特别鸣谢' },
  venue: { en: 'Venue', cn: '场地' },
  address: { en: 'Address', cn: '地址' },
  caption: { en: 'Caption', cn: '说明' },
  introduction: { en: 'Introduction', cn: '介绍' },
  related_artist: { en: 'Related Artist', cn: '相关艺术家' },
  web_url: { en: 'Website URL', cn: '网站链接' },
  video_url: { en: 'Video URL', cn: '视频链接' },
  order: { en: 'Order', cn: '排序' },
  mark: { en: 'Mark', cn: '标记' },
  language: { en: 'Language', cn: '语言' },
};

// Delete dialog labels
export const deleteDialogLabels = {
  delete_dialog_this_item_en: "this event",
  delete_dialog_this_item_cn: "该活动",
  confirmDeleteEvent_en: "Are you sure you want to delete this event?",
  confirmDeleteEvent_cn: "确定要删除该活动吗？",
  thisEvent_en: "this event",
  thisEvent_cn: "该活动",
};

// Additional labels
export const additionalLabels = {
  // Placeholder and description labels
  selectTitle_en: "Select Title",
  selectTitle_cn: "选择标题",
  enterTitle_en: "Enter event title",
  enterTitle_cn: "输入活动标题",
  selectType_en: "Select Type",
  selectType_cn: "选择类型",
  enterTypeName_en: "Enter type name",
  enterTypeName_cn: "输入类型名称",
  selectVenue_en: "Select Venue",
  selectVenue_cn: "选择场地",
  selectOrder_en: "Select Order",
  selectOrder_cn: "选择排序",
  selectLanguage_en: "Select Language",
  selectLanguage_cn: "选择语言",
  selectHost_en: "Select Host",
  selectHost_cn: "选择主办方",
  selectSupport_en: "Select Support",
  selectSupport_cn: "选择支持单位",

  // Introduction labels
  introduction_en: "Introduction",
  introduction_cn: "介绍",
  introductionSummary_en: "Introduction",
  introductionSummary_cn: "介绍",
  introductionDescription_en: "Add introduction paragraphs.",
  introductionDescription_cn: "添加介绍段落。",
  addIntroductionButton_en: "Add Paragraph",
  addIntroductionButton_cn: "添加段落",
  removeIntroductionButton_en: "Remove",
  removeIntroductionButton_cn: "移除",

  // Entity and collection labels
  no_events_en: "No events found",
  no_events_cn: "未找到活动",

  // Search and filter labels
  searchEvents_en: "Search events",
  searchEvents_cn: "搜索活动",

  // Status and error labels
  noFeaturedEvents_en: "No featured events available",
  noFeaturedEvents_cn: "暂无精选活动",
  noMatchingEvents_en: "No matching events found",
  noMatchingEvents_cn: "没有找到符合条件的活动",

  // Order labels
  order_en: "Order",
  order_cn: "排序",
};

// UI Text Configuration
export const UI_TEXT = {
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  eventManagement: { en: 'Event Management', cn: '活动管理' },
  noData: { en: 'No events available', cn: '暂无活动数据' },
  noMatchingEvents: { en: 'No matching events found', cn: '未找到匹配的活动' },
  all: { en: 'All', cn: '全部' },
  totalCount: { en: 'Total', cn: '总计' },
  exportSuccess: { en: 'Export successful', cn: '导出成功' },
  exportError: { en: 'Export failed', cn: '导出失败' },
  exportInProgress: { en: 'Exporting...', cn: '导出中...' }
};

// Combined labels object for easy access
export const eventLabels = {
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
export const getEventLabel = (key, language = 'en') => {
  if (!key) return '';

  // Try direct field labels first (now bilingual objects)
  if (fieldLabels[key]) {
    if (typeof fieldLabels[key] === 'object') {
      return fieldLabels[key][language] || fieldLabels[key]['en'] || key;
    }
    return fieldLabels[key];
  }

  // Try fieldLabelsForComponents
  if (fieldLabelsForComponents[key]) {
    return fieldLabelsForComponents[key][language] || fieldLabelsForComponents[key]['en'] || key;
  }

  // Try labels with language suffix
  const labelKey = `${key}_${language}`;
  if (eventLabels[labelKey]) {
    return eventLabels[labelKey];
  }

  // Fallback to English if Chinese not found
  if (language === 'cn') {
    const englishKey = `${key}_en`;
    if (eventLabels[englishKey]) {
      return eventLabels[englishKey];
    }
  }

  return key;
};

// Helper function to get UI text
export const getEventUIText = (key, language = 'en') => {
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
export default eventLabels;