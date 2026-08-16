// exhibitionLabels.js — 适配 Prisma Exhibition 模型（含新增数组字段）
// 字段标签（基础）
export const fieldLabels = {
  // 核心字段
  cover_img_url: { en: "Cover Image", cn: "封面图片" },
  title: { en: "Title", cn: "标题" },
  subtitle: { en: "Subtitle", cn: "副标题" },
  type: { en: "Type", cn: "类型" },
  date_start: { en: "Start Date", cn: "开始日期" },
  date_end: { en: "End Date", cn: "结束日期" },
  opening_date: { en: "Opening Date", cn: "开幕日期" },
  year: { en: "Year", cn: "年份" },
  venue: { en: "Venue", cn: "场馆" },
  location: { en: "Location", cn: "地点" },
  curator: { en: "Curator", cn: "策展人" },
  organiser: { en: "Organiser", cn: "主办方" },
  participating_artists: { en: "Participating Artists", cn: "参展艺术家" },
  caption: { en: "Caption", cn: "说明" },
  description: { en: "Description", cn: "描述" },
  introduction: { en: "Introduction", cn: "介绍" },
  press_release: { en: "Press Release", cn: "新闻稿" },
  related_artwork_title: { en: "Related Artwork Titles", cn: "相关作品标题" },
  related_gallery_artist: { en: "Related Gallery Artists", cn: "相关画廊艺术家" },
  video_url: { en: "Video URL", cn: "视频链接" },
  web_url: { en: "Web URL", cn: "网页链接" },
  // 系统/管理字段
  order: { en: "Order", cn: "排序" },
  mark: { en: "Mark", cn: "标记" },
  language: { en: "Language", cn: "语言" },
  status: { en: "Status", cn: "状态" },
  // 时间戳
  updatedAt: { en: "Last Updated", cn: "最后更新" },
};

// 页面文本
export const PAGE_TEXT = {
  pageTitle: {
    EN: "Exhibition Management",
    CN: "展览管理",
  },
  itemName: {
    EN: "Exhibition",
    CN: "展览",
  },
  createTooltip: {
    EN: "Create New Exhibition",
    CN: "创建新展览",
  },
  filters: {
    title: { EN: "Title", CN: "标题" },
    type: { EN: "Type", CN: "类型" },
    year: { EN: "Year", CN: "年份" },
    venue: { EN: "Venue", CN: "场馆" },
    curator: { EN: "Curator", CN: "策展人" },
    organiser: { EN: "Organiser", CN: "主办方" },
    status: { EN: "Status", CN: "状态" },
    language: { EN: "Language", CN: "语言" },
    mark: { EN: "Mark", CN: "标记" },
    order: { EN: "Order", CN: "排序" },
  },
  controlPanel: {
    sortByDate: { EN: "Sort by Date", CN: "按日期排序" },
    sortByDateTooltip: { EN: "Sort exhibitions by start date", CN: "按开始日期排序展览" },
    sortByOrder: { EN: "Sort by Order", CN: "按顺序排序" },
    sortByOrderTooltip: { EN: "Sort exhibitions by order", CN: "按顺序排序展览" },
    sortByUpdate: { EN: "Sort by Update", CN: "按更新排序" },
    sortByUpdateTooltip: { EN: "Sort by update date", CN: "按更新日期排序展览" },
    exportData: { EN: "Export Data", CN: "导出数据" },
    exportDataTooltip: { EN: "Export exhibition data", CN: "导出展览数据" },
  },
  fields: {
    cover_img_url: { EN: "Cover Image", CN: "封面图片" },
    title: { EN: "Title", CN: "标题" },
    subtitle: { EN: "Subtitle", CN: "副标题" },
    type: { EN: "Type", CN: "类型" },
    date_start: { EN: "Start Date", CN: "开始日期" },
    date_end: { EN: "End Date", CN: "结束日期" },
    opening_date: { EN: "Opening Date", CN: "开幕日期" },
    year: { EN: "Year", CN: "年份" },
    venue: { EN: "Venue", CN: "场馆" },
    location: { EN: "Location", CN: "地点" },
    curator: { EN: "Curator", CN: "策展人" },
    organiser: { EN: "Organiser", CN: "主办方" },
    participating_artists: { EN: "Participating Artists", CN: "参展艺术家" },
    caption: { EN: "Caption", CN: "说明" },
    description: { EN: "Description", CN: "描述" },
    introduction: { EN: "Introduction", CN: "介绍" },
    press_release: { EN: "Press Release", CN: "新闻稿" },
    related_artwork_title: { EN: "Related Artwork Titles", CN: "相关作品标题" },
    related_gallery_artist: { EN: "Related Gallery Artists", CN: "相关画廊艺术家" },
    video_url: { EN: "Video URL", CN: "视频链接" },
    web_url: { EN: "Web URL", CN: "网页链接" },
    order: { EN: "Order", CN: "排序" },
    mark: { EN: "Mark", CN: "标记" },
    language: { EN: "Language", CN: "语言" },
    status: { EN: "Status", CN: "状态" },
    updatedAt: { EN: "Updated At", CN: "更新时间" },
  },
  emptyState: {
    noData: { EN: "No exhibitions found", CN: "暂无展览" },
    noMatchingEvents: { EN: "No matching exhibitions", CN: "没有匹配的展览" },
  },
  deleteDialog: {
    title: { EN: "Confirm Delete", CN: "确认删除" },
    confirm: { EN: "Delete", CN: "删除" },
    cancel: { EN: "Cancel", CN: "取消" },
  },
  errors: {
    loadingError: { EN: "Error loading data", CN: "加载数据错误" },
    systemError: { EN: "System error occurred", CN: "系统错误" },
    tryAgain: { EN: "Try Again", CN: "重试" },
    deleteError: { EN: "Delete failed", CN: "删除失败" },
    pleaseRetry: { EN: "Please try again", CN: "请重试" },
    ok: { EN: "OK", CN: "确定" },
  },
  export: {
    success: { EN: "Export successful", CN: "导出成功" },
    error: { EN: "Export failed", CN: "导出失败" },
    exhibitions: { EN: "exhibitions", CN: "个展览" },
  },
};

// 操作标签
export const actionLabels = {
  create_en: "Create Exhibition",
  create_cn: "创建展览",
  edit_en: "Edit Exhibition",
  edit_cn: "编辑展览",
  delete_en: "Delete Exhibition",
  delete_cn: "删除展览",
  export_en: "Export Exhibitions",
  export_cn: "导出展览",
  import_en: "Import Exhibitions",
  import_cn: "导入展览",
};

// 状态标签
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

// 实体标签
export const entityLabels = {
  exhibition_en: "Exhibition",
  exhibition_cn: "展览",
  exhibitions_en: "Exhibitions",
  exhibitions_cn: "展览",
  untitledExhibition_en: "Untitled Exhibition",
  untitledExhibition_cn: "无题展览",
};

// 过滤器标签
export const filterLabels = {
  all_titles_en: "All Titles",
  all_titles_cn: "全部标题",
  all_types_en: "All Types",
  all_types_cn: "全部类型",
  all_years_en: "All Years",
  all_years_cn: "全部年份",
  all_venues_en: "All Venues",
  all_venues_cn: "全部场馆",
  all_curators_en: "All Curators",
  all_curators_cn: "全部策展人",
  all_organisers_en: "All Organisers",
  all_organisers_cn: "全部主办方",
  all_statuses_en: "All Statuses",
  all_statuses_cn: "全部状态",
  all_marks_en: "All Marks",
  all_marks_cn: "全部标记",
  all_languages_en: "All Languages",
  all_languages_cn: "全部语言",
};

// 排序标签
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
  sort_by_venue_cn: "按场馆排序",
  sort_by_order_en: "Sort by Order",
  sort_by_order_cn: "按顺序排序",
  sort_by_update_en: "Sort by Update",
  sort_by_update_cn: "按更新排序",
  sort_by_status_en: "Sort by Status",
  sort_by_status_cn: "按状态排序",
};

// 页面标签
export const pageLabels = {
  title_en: "Exhibition Management",
  title_cn: "展览管理",
  description_en: "Manage and organize exhibition content",
  description_cn: "管理和组织展览内容",
};

// UI 文本标签（用于 uiText）
export const uiTextLabels = {
  pageTitle: { en: 'Exhibition Index', cn: '展览索引' },
  title: { en: 'Title', cn: '标题' },
  subtitle: { en: 'Subtitle', cn: '副标题' },
  type: { en: 'Type', cn: '类型' },
  year: { en: 'Year', cn: '年份' },
  date_start: { en: 'Start Date', cn: '开始日期' },
  date_end: { en: 'End Date', cn: '结束日期' },
  opening_date: { en: 'Opening Date', cn: '开幕日期' },
  venue: { en: 'Venue', cn: '场馆' },
  location: { en: 'Location', cn: '地点' },
  curator: { en: 'Curator', cn: '策展人' },
  organiser: { en: 'Organiser', cn: '主办方' },
  participating_artists: { en: 'Participating Artists', cn: '参展艺术家' },
  related_artwork_title: { en: 'Related Artwork Titles', cn: '相关作品标题' },
  related_gallery_artist: { en: 'Related Gallery Artists', cn: '相关画廊艺术家' },
  order: { en: 'Order', cn: '排序' },
  mark: { en: 'Mark', cn: '标记' },
  language: { en: 'Language', cn: '语言' },
  status: { en: 'Status', cn: '状态' },
  all: { en: 'All', cn: '全部' },
  other: { en: 'Other', cn: '其他' },
  noItemsFound: {
    en: 'No items found matching the criteria',
    cn: '没有找到符合条件的项目'
  },
  noExhibitionsFound: {
    en: 'No exhibitions found matching the criteria',
    cn: '没有找到符合条件的展览'
  },
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  fields: {
    title: { en: 'Title', cn: '标题' },
    subtitle: { en: 'Subtitle', cn: '副标题' },
    type: { en: 'Type', cn: '类型' },
    year: { en: 'Year', cn: '年份' },
    date_start: { en: 'Start Date', cn: '开始日期' },
    date_end: { en: 'End Date', cn: '结束日期' },
    opening_date: { en: 'Opening Date', cn: '开幕日期' },
    venue: { en: 'Venue', cn: '场馆' },
    location: { en: 'Location', cn: '地点' },
    curator: { en: 'Curator', cn: '策展人' },
    organiser: { en: 'Organiser', cn: '主办方' },
    participating_artists: { en: 'Participating Artists', cn: '参展艺术家' },
    order: { en: 'Order', cn: '排序' },
    status: { en: 'Status', cn: '状态' },
  }
};

// 展示标签（函数形式）
export const displayLabels = {
  detailButtonText: (isCn) => isCn ? '查看详情' : 'See Details',
  emptyMessage: (isCn) => isCn ? '没有可显示的展览' : 'No exhibitions to display',
  noMatchMessage: (isCn) => isCn ? '未找到匹配的展览' : 'No matching exhibitions found',
  loadingMessage: (isCn) => isCn ? '加载中...' : 'Loading...',
  errorMessage: (isCn) => isCn ? '加载失败' : 'Failed to load',
};

// 控制面板标签（函数形式）
export const controlPanelLabels = {
  title: (isCn) => isCn ? '标题' : 'Title',
  type: (isCn) => isCn ? '类型' : 'Type',
  year: (isCn) => isCn ? '年份' : 'Year',
  venue: (isCn) => isCn ? '场馆' : 'Venue',
  curator: (isCn) => isCn ? '策展人' : 'Curator',
  organiser: (isCn) => isCn ? '主办方' : 'Organiser',
  status: (isCn) => isCn ? '状态' : 'Status',
  order: (isCn) => isCn ? '排序' : 'Order',
  language: (isCn) => isCn ? '语言' : 'Language',
  mark: (isCn) => isCn ? '标记' : 'Mark',
  date_start: (isCn) => isCn ? '开始日期' : 'Start Date',
  date_end: (isCn) => isCn ? '结束日期' : 'End Date',
  opening_date: (isCn) => isCn ? '开幕日期' : 'Opening Date',
  sortByTitle: (isCn) => isCn ? '按标题排序' : 'Sort by Title',
  sortByTitleTooltip: (isCn) => isCn ? '按标题排序展览' : 'Sort exhibitions by title',
  sortByDate: (isCn) => isCn ? '按日期排序' : 'Sort by Date',
  sortByDateTooltip: (isCn) => isCn ? '按开始日期排序展览' : 'Sort exhibitions by start date',
  sortByOrder: (isCn) => isCn ? '按顺序排序' : 'Sort by Order',
  sortByOrderTooltip: (isCn) => isCn ? '按顺序排序展览' : 'Sort exhibitions by order',
  sortByUpdate: (isCn) => isCn ? '按更新排序' : 'Sort by Update',
  sortByUpdateTooltip: (isCn) => isCn ? '按更新日期排序' : 'Sort by update date',
  // 向后兼容（保留旧键名）
  titleLabel_en: "Title",
  titleLabel_cn: "标题",
  typeLabel_en: "Type",
  typeLabel_cn: "类型",
  yearLabel_en: "Year",
  yearLabel_cn: "年份",
  venueLabel_en: "Venue",
  venueLabel_cn: "场馆",
  orderLabel_en: "Order",
  orderLabel_cn: "排序",
  languageLabel_en: "Language",
  languageLabel_cn: "语言",
  markLabel_en: "Mark",
  markLabel_cn: "标记",
};

// 默认内容标签
export const defaultContentLabels = {
  listTitle: (isCn) => isCn ? "展览列表" : "EXHIBITION LIST",
  detailsLabel: (isCn) => isCn ? "展览详情" : "EXHIBITION DETAILS",
  untitled: (isCn) => isCn ? "无题展览" : "Untitled Exhibition",
  noDescription: (isCn) => isCn ? '暂无描述' : 'No description available',
  back: (isCn) => isCn ? "返回" : "BACK",
};

// 字段分组标签（用于表单分组）
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
  location: {
    title: (isCn) => isCn ? "位置与组织" : "Location & Organisers",
  },
  content: {
    title: (isCn) => isCn ? "内容" : "Content",
  },
  media: {
    title: (isCn) => isCn ? "媒体" : "Media",
  },
  settings: {
    title: (isCn) => isCn ? "设置" : "Settings",
  },
};

// 字段标签（用于组件，与 fieldLabels 重复但保留）
export const fieldLabelsForComponents = {
  cover_img_url: { en: 'Cover Image', cn: '封面图片' },
  title: { en: 'Title', cn: '标题' },
  subtitle: { en: 'Subtitle', cn: '副标题' },
  type: { en: 'Type', cn: '类型' },
  date_start: { en: 'Start Date', cn: '开始日期' },
  date_end: { en: 'End Date', cn: '结束日期' },
  opening_date: { en: 'Opening Date', cn: '开幕日期' },
  year: { en: 'Year', cn: '年份' },
  venue: { en: 'Venue', cn: '场馆' },
  location: { en: 'Location', cn: '地点' },
  curator: { en: 'Curator', cn: '策展人' },
  organiser: { en: 'Organiser', cn: '主办方' },
  participating_artists: { en: 'Participating Artists', cn: '参展艺术家' },
  caption: { en: 'Caption', cn: '说明' },
  description: { en: 'Description', cn: '描述' },
  introduction: { en: 'Introduction', cn: '介绍' },
  press_release: { en: 'Press Release', cn: '新闻稿' },
  related_artwork_title: { en: 'Related Artwork Titles', cn: '相关作品标题' },
  related_gallery_artist: { en: 'Related Gallery Artists', cn: '相关画廊艺术家' },
  video_url: { en: 'Video URL', cn: '视频链接' },
  web_url: { en: 'Web URL', cn: '网页链接' },
  order: { en: 'Order', cn: '排序' },
  mark: { en: 'Mark', cn: '标记' },
  language: { en: 'Language', cn: '语言' },
  status: { en: 'Status', cn: '状态' },
};

// 删除对话框标签
export const deleteDialogLabels = {
  delete_dialog_this_item_en: "this exhibition",
  delete_dialog_this_item_cn: "该展览",
  confirmDeleteExhibition_en: "Are you sure you want to delete this exhibition?",
  confirmDeleteExhibition_cn: "确定要删除该展览吗？",
  thisExhibition_en: "this exhibition",
  thisExhibition_cn: "该展览",
};

// 附加标签（占位符、提示等）
export const additionalLabels = {
  selectTitle_en: "Select Title",
  selectTitle_cn: "选择标题",
  enterTitle_en: "Enter exhibition title",
  enterTitle_cn: "输入展览标题",
  selectType_en: "Select Type",
  selectType_cn: "选择类型",
  enterTypeName_en: "Enter type name",
  enterTypeName_cn: "输入类型名称",
  selectVenue_en: "Select Venue",
  selectVenue_cn: "选择场馆",
  selectCurator_en: "Select Curator",
  selectCurator_cn: "选择策展人",
  selectOrganiser_en: "Select Organiser",
  selectOrganiser_cn: "选择主办方",
  selectStatus_en: "Select Status",
  selectStatus_cn: "选择状态",
  selectOrder_en: "Select Order",
  selectOrder_cn: "选择排序",
  selectLanguage_en: "Select Language",
  selectLanguage_cn: "选择语言",
  // Introduction / Press Release
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
  pressRelease_en: "Press Release",
  pressRelease_cn: "新闻稿",
  addPressReleaseButton_en: "Add Press Release",
  addPressReleaseButton_cn: "添加新闻稿",
  // 新增：相关作品和画廊艺术家的占位符/按钮（可选）
  addRelatedArtworkTitle_en: "Add Artwork Title",
  addRelatedArtworkTitle_cn: "添加作品标题",
  addRelatedGalleryArtist_en: "Add Gallery Artist",
  addRelatedGalleryArtist_cn: "添加画廊艺术家",
  // 实体和集合
  no_exhibitions_en: "No exhibitions found",
  no_exhibitions_cn: "未找到展览",
  // 搜索和筛选
  searchExhibitions_en: "Search exhibitions",
  searchExhibitions_cn: "搜索展览",
  // 状态和错误
  noFeaturedExhibitions_en: "No featured exhibitions available",
  noFeaturedExhibitions_cn: "暂无精选展览",
  noMatchingExhibitions_en: "No matching exhibitions found",
  noMatchingExhibitions_cn: "没有找到符合条件的展览",
  // 标记
  mark_en: "Mark",
  mark_cn: "标记",
  noMark_en: "No mark",
  noMark_cn: "无标记",
  // 排序
  order_en: "Order",
  order_cn: "排序",
};

// UI 文本（用于通用界面）
export const UI_TEXT = {
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  exhibitionManagement: { en: 'Exhibition Management', cn: '展览管理' },
  noData: { en: 'No exhibitions available', cn: '暂无展览数据' },
  noMatchingExhibitions: { en: 'No matching exhibitions found', cn: '未找到匹配的展览' },
  all: { en: 'All', cn: '全部' },
  totalCount: { en: 'Total', cn: '总计' },
  exportSuccess: { en: 'Export successful', cn: '导出成功' },
  exportError: { en: 'Export failed', cn: '导出失败' },
  exportInProgress: { en: 'Exporting...', cn: '导出中...' }
};

// 合并所有标签（用于便捷访问）
export const exhibitionLabels = {
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

// 辅助函数：获取字段标签
export const getExhibitionLabel = (key, language = 'en') => {
  if (!key) return '';

  // 尝试直接从 fieldLabels 获取
  if (fieldLabels[key]) {
    if (typeof fieldLabels[key] === 'object') {
      return fieldLabels[key][language] || fieldLabels[key]['en'] || key;
    }
    return fieldLabels[key];
  }

  // 尝试从 fieldLabelsForComponents 获取
  if (fieldLabelsForComponents[key]) {
    return fieldLabelsForComponents[key][language] || fieldLabelsForComponents[key]['en'] || key;
  }

  // 尝试带语言后缀的键
  const labelKey = `${key}_${language}`;
  if (exhibitionLabels[labelKey]) {
    return exhibitionLabels[labelKey];
  }

  // 如果中文没找到，尝试英文
  if (language === 'cn') {
    const englishKey = `${key}_en`;
    if (exhibitionLabels[englishKey]) {
      return exhibitionLabels[englishKey];
    }
  }

  return key;
};

// 辅助函数：获取 UI 文本
export const getExhibitionUIText = (key, language = 'en') => {
  if (!key) return '';

  // 尝试从 uiTextLabels 获取
  if (uiTextLabels[key]) {
    return uiTextLabels[key][language] || uiTextLabels[key]['en'] || key;
  }

  // 尝试嵌套路径（例如 'fields.title'）
  if (key.includes('.')) {
    const [parent, child] = key.split('.');
    if (uiTextLabels[parent] && uiTextLabels[parent][child]) {
      return uiTextLabels[parent][child][language] || uiTextLabels[parent][child]['en'] || key;
    }
  }

  return key;
};

// 默认导出
export default exhibitionLabels;