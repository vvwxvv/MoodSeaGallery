import { useContext } from 'react';
import { LanguageContext } from '@/components/contexts/LanguageContext';
/**
 * createBasePageText
 * ─────────────────────────────────────────────────────────────
 * Produces the normalised PageText object expected by ManagerStructureLayout,
 * pre-filled with sensible defaults.
 *
 * Each schema only needs to spread-override the keys it cares about.
 *
 * @example
 *   pageText: createBasePageText({
 *     createTooltip: { EN: "Add Writing", CN: "添加文章" },
 *     deleteDialog: { title: { EN: "Delete Writing", CN: "删除文章" }, ... }
 *   })
 *
 * @param {Partial<PageText>} overrides
 * @returns {PageText}
 */
export const createBasePageText = (overrides = {}) => ({
  createTooltip: { EN: "Create New",          CN: "新建"     },

  export: {
    success: { EN: "Export successful",       CN: "导出成功" },
    items:   { EN: "items",                   CN: "条目"     },
    error:   { EN: "Export failed",           CN: "导出失败" },
  },

  emptyState: {
    noData:          { EN: "No items found",      CN: "暂无数据"     },
    noMatchingItems: { EN: "No matching results", CN: "暂无匹配结果" },
  },

  errors: {
    loadingError: { EN: "Failed to load data",   CN: "数据加载失败" },
    systemError:  { EN: "System error occurred", CN: "系统错误"     },
    tryAgain:     { EN: "Try Again",             CN: "重试"         },
    pleaseRetry:  { EN: "Please try again",      CN: "请重试"       },
    ok:           { EN: "OK",                    CN: "确定"         },
  },

  deleteDialog: {
    title:   { EN: "Confirm Delete", CN: "确认删除" },
    confirm: { EN: "Delete",         CN: "删除"     },
    cancel:  { EN: "Cancel",         CN: "取消"     },
  },

  // Deep-merge overrides so partial overrides are safe
  ...overrides,
  export:      { success: { EN: "Export successful", CN: "导出成功" },
                 items:   { EN: "items",              CN: "条目"     },
                 error:   { EN: "Export failed",      CN: "导出失败" },
                 ...(overrides.export ?? {}) },
  emptyState:  { noData: { EN: "No items found", CN: "暂无数据" },
                 noMatchingItems: { EN: "No matching results", CN: "暂无匹配结果" },
                 ...(overrides.emptyState ?? {}) },
  errors:      { loadingError: { EN: "Failed to load data",   CN: "数据加载失败" },
                 systemError:  { EN: "System error occurred", CN: "系统错误"     },
                 tryAgain:     { EN: "Try Again",             CN: "重试"         },
                 pleaseRetry:  { EN: "Please try again",      CN: "请重试"       },
                 ok:           { EN: "OK",                    CN: "确定"         },
                 ...(overrides.errors ?? {}) },
  deleteDialog:{ title:   { EN: "Confirm Delete", CN: "确认删除" },
                 confirm: { EN: "Delete",         CN: "删除"     },
                 cancel:  { EN: "Cancel",         CN: "取消"     },
                 ...(overrides.deleteDialog ?? {}) },
});

export const systemLabels = {
  // ===========================================
  // COMMON FORM ACTIONS
  // ===========================================
  submitButton_en: "Submit",
  submitButton_cn: "提交",
  submittingButton_en: "Submitting...",
  submittingButton_cn: "提交中...",
  updateButton_en: "Update",
  updateButton_cn: "更新",
  updatingButton_en: "Updating...",
  updatingButton_cn: "更新中...",
  cancel_en: "Cancel",
  cancel_cn: "取消",
  confirm_en: "Confirm",
  confirm_cn: "确认",
  delete_en: "Delete",
  delete_cn: "删除",
  save_en: "Save All Changes",
  save_cn: "保存所有更改",
  saving_en: "Saving...",
  saving_cn: "保存中...",
  refresh_cn : "刷新",
  refresh_en: "Refresh",
  updateAt_en: "Update At",
  updateAt_cn: "更新时间",

  // ===========================================
  // UNIVERSAL MANAGEMENT LABELS
  // ===========================================
  page_title_en: "Management",
  page_title_cn: "管理",
  create_en: "Create",
  create_cn: "创建",
  edit_en: "Edit",
  edit_cn: "编辑",
  batch_edit_en: "Batch Edit",
  batch_edit_cn: "批量编辑",
  batchPageTitle_en: "Batch Edit",
  batchPageTitle_cn: "批量编辑",
  instructions_en: "Edit data directly in the table. Changes are saved when you click Save.",
  instructions_cn: "直接在表格中编辑数据。点击保存时更改将被保存。",
  addRow_en: "Add Row",
  addRow_cn: "添加行",
  deleteSelected_en: "Delete Selected",
  deleteSelected_cn: "删除选中",
  noMatchingData_en: "No matching data found",
  noMatchingData_cn: "未找到匹配数据",
  confirmDelete_en: "Confirm Delete",
  confirmDelete_cn: "确认删除",
  confirmDeleteMessage_en: "Are you sure you want to delete the selected items? This action cannot be undone.",
  confirmDeleteMessage_cn: "您确定要删除选中的项目吗？此操作无法撤销。",
  untitled_en: "Untitled",
  untitled_cn: "无标题",
  confirmSave_en: "Confirm Save",
  confirmSave_cn: "确认保存",
  saveSuccess_en: "Data saved successfully",
  saveSuccess_cn: "数据保存成功",
  saveFailed_en: "Failed to save data",
  saveFailed_cn: "保存数据失败",
  export_data_en: "Export Data",
  export_data_cn: "导出数据",
  refresh_en: "Refresh",
  refresh_cn: "刷新",

  // ===========================================
  // UNIVERSAL STATUS LABELS
  // ===========================================
  success_en: "Operation completed successfully",
  success_cn: "操作成功完成",
  error_en: "An error occurred",
  error_cn: "发生错误",
  loading_en: "Loading...",
  loading_cn: "加载中...",
  no_data_en: "No data available",
  no_data_cn: "暂无数据",
  no_image_en: "No Image",
  no_image_cn: "无图片",

  // ===========================================
  // UNIVERSAL FORM LABELS
  // ===========================================
  required_en: "This field is required",
  required_cn: "此字段为必填项",

  // ===========================================
  // UNIVERSAL DIALOG LABELS
  // ===========================================
  delete_dialog_title_en: "Confirm Delete",
  delete_dialog_title_cn: "确认删除",
  delete_dialog_text_en: "Are you sure you want to delete?",
  delete_dialog_text_cn: "确定要删除吗？",
  delete_dialog_cancel_en: "Cancel",
  delete_dialog_cancel_cn: "取消",
  delete_dialog_confirm_en: "Delete",
  delete_dialog_confirm_cn: "删除",

  // ===========================================
  // UNIVERSAL FILTER LABELS
  // ===========================================
  all_en: "All",
  all_cn: "全部",
  search_en: "Search",
  search_cn: "搜索",
  search_placeholder_en: "Search...",
  search_placeholder_cn: "搜索...",
  filter_en: "Filter",
  filter_cn: "筛选",
  reset_filters_en: "Reset Filters",
  reset_filters_cn: "重置筛选",

  // ===========================================
  // UNIVERSAL SORT LABELS
  // ===========================================
  sort_en: "Sort",
  sort_cn: "排序",
  sort_by_title_en: "Sort by Title",
  sort_by_title_cn: "按标题排序",
  sort_asc_en: "Ascending",
  sort_asc_cn: "升序",
  sort_desc_en: "Descending",
  sort_desc_cn: "降序",
  sort_by_en: "Sort by",
  sort_by_cn: "排序方式",

  // ===========================================
  // FORM VALIDATION & MESSAGES
  // ===========================================
  formErrorsMessage_en: "Please fix the form errors before submitting",
  formErrorsMessage_cn: "提交前请修正表单错误",
  saveSuccess_en: "Changes saved successfully",
  saveSuccess_cn: "保存成功",
  saveFailed_en: "Failed to save changes, please try again",
  saveFailed_cn: "保存失败，请重试",
  successMessage_en: "Successfully submitted!",
  successMessage_cn: "提交成功！",
  errorMessage_en: "An error occurred, please try again",
  errorMessage_cn: "发生错误，请重试",
  submissionErrorMessage_en: "Failed to submit form, please try again",
  submissionErrorMessage_cn: "表单提交失败，请重试",
  updateSuccessMessage_en: "Updated successfully!",
  updateSuccessMessage_cn: "更新成功！",
  updateErrorMessage_en: "Failed to update, please try again",
  updateErrorMessage_cn: "更新失败，请重试",
  serverErrorMessage_en: "Server error",
  serverErrorMessage_cn: "服务器错误",

  // ===========================================
  // CRUD OPERATIONS
  // ===========================================
  addButton_en: "Add",
  addButton_cn: "添加",
  removeButton_en: "Remove",
  removeButton_cn: "移除",
  addRow_en: "Add Row",
  addRow_cn: "添加新行",
  deleteSelected_en: "Delete Selected",
  deleteSelected_cn: "删除选中",

  // ===========================================
  // CREATE OPERATIONS
  // ===========================================
  create_artwork_en: "Create Artwork",
  create_artwork_cn: "创建作品",
  create_event_en: "Create Event",
  create_event_cn: "创建事件",
  create_video_en: "Create Video",
  create_video_cn: "创建影像",
  create_image_en: "Create Image",
  create_image_cn: "创建图片",
  create_paragraph_en: "Create Paragraph",
  create_paragraph_cn: "创建段落",
  create_about_en: "Create About",
  create_about_cn: "创建关于",
  about_create_en: "Create About",
  about_create_cn: "创建关于",

  // ===========================================
  // MANAGEMENT PAGE TITLES
  // ===========================================
  artworkManagement_en: "Artwork Management",
  artworkManagement_cn: "作品管理",
  eventManagement_en: "Event Management",
  eventManagement_cn: "活动管理",
  videoManagement_en: "Video Management",
  videoManagement_cn: "影像管理",
  imageManagement_en: "Image Management",
  imageManagement_cn: "图片管理",
  paragraphManagement_en: "Paragraph Management",
  paragraphManagement_cn: "段落管理",
  aboutManagement_en: "About Management",
  aboutManagement_cn: "关于管理",

  // ===========================================
  // TABLE & DATA MANAGEMENT
  // ===========================================
  batchPageTitle_en: "Batch Edit Records",
  batchPageTitle_cn: "批量编辑记录",
  eventBatchEdit_en: "Event Batch Edit",
  eventBatchEdit_cn: "事件批量编辑",
  instructions_en: "Double-click any cell to edit, click away or press Enter to save",
  instructions_cn: "双击单元格进行编辑，点击其他地方或按Enter保存",
  batchEditInstructions_en: "Double-click any cell to edit, click away or press Enter to save",
  batchEditInstructions_cn: "双击单元格进行编辑，点击其他地方或按Enter保存",
  exportData_en: "Export Data",
  exportData_cn: "导出数据",

  // ===========================================
  // DATA STATES & FEEDBACK
  // ===========================================
  noData_en: "No data available",
  noData_cn: "暂无数据",
  noMatchingData_en: "No matching data found",
  noMatchingData_cn: "没有找到匹配的数据",
  noItemsFound_en: "No items found",
  noItemsFound_cn: "未找到项目",

  // ===========================================
  // CONFIRMATION DIALOGS
  // ===========================================
  confirmDelete_en: "Confirm Delete",
  confirmDelete_cn: "确认删除",
  confirmDeleteMessage_en: "Are you sure you want to delete the selected records?",
  confirmDeleteMessage_cn: "您确定要删除选中的记录吗？",
  deleteWarning_en: "This action will permanently delete the following records",
  deleteWarning_cn: "此操作将永久删除以下记录",
  confirmSave_en: "Confirm Save",
  confirmSave_cn: "确认保存",
  confirmSaveMessage_en: "Are you sure you want to save all changes?",
  confirmSaveMessage_cn: "确定要保存所有更改吗？",

  // ===========================================
  // RECORD MANAGEMENT
  // ===========================================
  selectedRecords_en: "Selected Records",
  selectedRecords_cn: "选中的记录",
  recordsToDelete_en: "records will be deleted",
  recordsToDelete_cn: "条记录将被删除",
  changesSummary_en: "Changes Summary",
  changesSummary_cn: "更改摘要",
  newRecords_en: "New Records",
  newRecords_cn: "新增记录",
  modifiedRecords_en: "Modified Records",
  modifiedRecords_cn: "修改记录",

  // ===========================================
  // FORM SECTIONS & SUMMARIES
  // ===========================================
  moreInfoSummary_en: "More Information",
  moreInfoSummary_cn: "更多信息",
  imageInfoSummary_en: "Image Information",
  imageInfoSummary_cn: "图片信息",
  arrayInfoSummary_en: "Multi-item Information",
  arrayInfoSummary_cn: "多列信息",
  urlInfoSummary_en: "URL Information",
  urlInfoSummary_cn: "链接信息",
  basic_info_section_en: "Basic Info",
  basic_info_section_cn: "基本信息",
  additional_info_section_en: "Additional Info",
  additional_info_section_cn: "附加信息",
  array_info_section_en: "Array Info",
  array_info_section_cn: "数组信息",
  moreInformation_en: "More Information",
  moreInformation_cn: "更多信息",

  // ===========================================
  // NAVIGATION
  // ===========================================
  backToListButton_en: "Back to List",
  backToListButton_cn: "返回列表",

  // ===========================================
  // FORM FIELDS - COMMON
  // ===========================================
  formTitle_en: "Form",
  formTitle_cn: "表单",
  image_en: "Image",
  image_cn: "图片",
  img_url_en: "Image URL",
  img_url_cn: "图片链接",
  manualUrlInput_en: "Manual URL Input",
  manualUrlInput_cn: "手动输入链接",
  untitled_en: "Untitled",
  untitled_cn: "无标题",
  back_to_list_en: "Back to List",
  back_to_list_cn: "返回列表",
  view_details_en: "View Details",
  view_details_cn: "查看详情",
  caption_en: "Caption (English)",
  caption_cn: "标题 (英文)",
  caption_cn_en: "Caption (Chinese)",
  caption_cn_cn: "标题 (中文)",

  // ===========================================
  // FORM FIELD PLACEHOLDERS & DESCRIPTIONS
  // ===========================================
  none_en: "None",
  none_cn: "无",
  no_en: "No",
  no_cn: "无",
  chooseInstruction_en: "Select Image URL or Upload",
  chooseInstruction_cn: "选择图片URL或上传",
  imageUrlPlaceholder_en: "Enter image URL...",
  imageUrlPlaceholder_cn: "请输入图片URL...",

  // ===========================================
  // FILE UPLOAD LABELS
  // ===========================================
  typeNotAllowed_en: "File type not allowed",
  typeNotAllowed_cn: "不支持的文件类型",
  sizeExceeded_en: "File size exceeds {maxSize}MB (current: {fileSize}MB)",
  sizeExceeded_cn: "文件大小超过 {maxSize}MB (当前: {fileSize}MB)",
  emptyFile_en: "File is empty",
  emptyFile_cn: "文件为空",
  uploadFailed_en: "Upload failed",
  uploadFailed_cn: "上传失败",
  uploadTimeout_en: "Upload timeout",
  uploadTimeout_cn: "上传超时",
  uploading_en: "Uploading...",
  uploading_cn: "上传中...",
  uploadSuccessful_en: "Upload successful",
  uploadSuccessful_cn: "上传成功",
  uploadFailedStatus_en: "Upload failed",
  uploadFailedStatus_cn: "上传失败",
  dropOrClick_en: "Drop files here or click to select",
  dropOrClick_cn: "拖拽文件到此处或点击选择",
  chooseFile_en: "Choose File",
  chooseFile_cn: "选择文件",
  uploadAnother_en: "Upload Another",
  uploadAnother_cn: "上传其他文件",
  requirements_en: "File Requirements",
  requirements_cn: "文件要求",
  maxSize_en: "Maximum size",
  maxSize_cn: "最大大小",
  allowedFormats_en: "Allowed formats",
  allowedFormats_cn: "允许的格式",
  secureUpload_en: "Secure upload",
  secureUpload_cn: "安全上传",
  dragAndDrop_en: "Drag and drop supported",
  dragAndDrop_cn: "支持拖拽上传",
  file_en: "File",
  file_cn: "文件",
  fileUrl_en: "File URL",
  fileUrl_cn: "文件链接",
  clickToCopy_en: "Click to copy",
  clickToCopy_cn: "点击复制",
  copied_en: "Copied!",
  copied_cn: "已复制！",
  startUpload_en: "Start Upload",
  startUpload_cn: "开始上传",
  cancelSelection_en: "Cancel Selection",
  cancelSelection_cn: "取消选择",
  readyToUpload_en: "Ready to upload",
  readyToUpload_cn: "准备上传",
  clickUploadButton_en: "Click upload button to start",
  clickUploadButton_cn: "点击上传按钮开始",
  multipleFilesSupported_en: "Multiple files supported",
  multipleFilesSupported_cn: "支持多文件上传",
  imageUpload_en: "Image Upload",
  imageUpload_cn: "图片上传",

  // ===========================================
  // TAGS & SELECTIONS
  // ===========================================
  selectTag_en: "Select a tag",
  selectTag_cn: "选择标签",
  selectOption_en: "Select Option",
  selectOption_cn: "选择选项",
  noOptionSelected_en: "No option selected",
  noOptionSelected_cn: "未选择选项",
  customTag_en: "Custom Tag",
  customTag_cn: "自定义标签",
  customTagsDescription_en: "Add custom tags if no existing options are available",
  customTagsDescription_cn: "如无可用选项，可添加自定义标签",
  addCustomTagButton_en: "Add Custom Tag",
  addCustomTagButton_cn: "添加自定义标签",
  removeCustomTagButton_en: "Remove",
  removeCustomTagButton_cn: "移除",
  tagSource_en: "Tag Source",
  tagSource_cn: "标签来源",
  tagSourceLabel_en: "Tag Source:",
  tagSourceLabel_cn: "标签来源：",
  selectTagSource_en: "Select tag source",
  selectTagSource_cn: "选择标签来源",
  tag_en: "Tag (English)",
  tag_cn: "标签 (英文)",
  tag_cn_en: "Tag (Chinese)",
  tag_cn_cn: "标签 (中文)",
  tag_en_en: "Tag (English)",
  tag_en_cn: "标签 (英文)",

  // ===========================================
  // VIDEO SPECIFIC LABELS
  // ===========================================
  video_url_en: "Video URL",
  video_url_cn: "视频链接",
  searchVideos_en: "Search videos",
  searchVideos_cn: "搜索视频",
  reorderVideos_en: "Reorder Videos",
  reorderVideos_cn: "视频排序",

  // ===========================================
  // SERIES & TYPE LABELS
  // ===========================================
  enterSeriesName_en: "Enter series name",
  enterSeriesName_cn: "输入系列名称",
  enterTypeName_en: "Enter type name",
  enterTypeName_cn: "输入类型名称",

  // ===========================================
  // INTRODUCTION LABELS
  // ===========================================
  addIntroduction_en: "Add Introduction",
  addIntroduction_cn: "添加介绍",
  introduction_en: "introduction",
  introduction_cn: "介绍",

  // ===========================================
  // COMMON FIELD LABELS
  // ===========================================
  artist_en: "Artist",
  artist_cn: "艺术家",
  type_en: "Type",
  type_cn: "类型",
  language_en: "Language",
  language_cn: "语言",
  typePlaceholder_en: "Select type...",
  typePlaceholder_cn: "选择类型...",
  caption_en: "Caption",
  caption_cn: "标题",
  order_en: "Order",
  order_cn: "排序",
  introduction_en: "Introduction",
  introduction_cn: "介绍",
  author_en: "Author",
  author_cn: "作者",
  subtitle_en: "Subtitle",
  subtitle_cn: "副标题",
  summary_en: "Summary",
  summary_cn: "摘要",
  content_en: "Content",
  content_cn: "正文",
  read_time_en: "Read Time",
  read_time_cn: "阅读时长",
  view_count_en: "View Count",
  view_count_cn: "浏览量",
  status_en: "Status",
  status_cn: "状态",
  published_at_en: "Published Date",
  published_at_cn: "发布日期",
  is_published_en: "Published",
  is_published_cn: "已发布",
  keywords_en: "Keywords",
  keywords_cn: "关键词",
  addKeyword_en: "Add Keyword",
  addKeyword_cn: "添加关键词",
  addTag_en: "Add Tag",
  addTag_cn: "添加标签",
  addParagraph_en: "Add Paragraph",
  addParagraph_cn: "添加段落",
  paragraphs_en: "Paragraphs",
  paragraphs_cn: "段落",
  tags_en: "Tags",
  tags_cn: "标签",
  created_at_en: "Created At",
  created_at_cn: "创建时间",
  updated_at_en: "Updated At",
  updated_at_cn: "更新时间",
  cover_image_url_en: "Cover Image URL",
  cover_image_url_cn: "封面图片链接",
  mark_en: "Mark",
  mark_cn: "标记",
  orderAutoOrderDescription_en: "Images can be ordered by this number.",
  orderAutoOrderDescription_cn: "图片可以按此数字排序。",
  title_en: "Title",
  title_cn: "标题",
  artwork_title_en: "Artwork Title",
  artwork_title_cn: "作品标题",
  year_en: "Year",
  year_cn: "年份",
  medium_en: "Medium",
  medium_cn: "媒介",
  size_en: "Size",
  size_cn: "尺寸",
  venue_en: "Venue",
  venue_cn: "场地",
  address_en: "Address",
  address_cn: "地址",
  city_en: "City",
  city_cn: "城市",
  country_en: "Country",
  country_cn: "国家",
  tag_source_en: "Tag Source",
  tag_source_cn: "标签来源",

  // ===========================================
  // TIMESTAMPS
  // ===========================================
  createdAt_en: "Created At",
  createdAt_cn: "创建时间",

  resume_management_en: "Resume Management",
  resume_management_cn: "简历管理",

  // ===========================================
  // GENERIC ACTIONS
  // ===========================================
  general_en: "General",
  general_cn: "一般",
  create_one_en: "Create One",
  create_one_cn: "创建一个",
  unknown_en: "Unknown",
  unknown_cn: "未知",

  // ===========================================
  // VIEW MODE LABELS
  // ===========================================
  grid_view_en: "Grid View",
  grid_view_cn: "网格视图",
  list_view_en: "List View",
  list_view_cn: "列表视图",
  switch_to_grid_en: "Switch to Grid View",
  switch_to_grid_cn: "切换到网格视图",
  switch_to_list_en: "Switch to List View",
  switch_to_list_cn: "切换到列表视图",


  // ===========================================
  // IMAGE REORDER SPECIFIC LABELS
  // ===========================================
  orderSaved_en: "Order saved successfully",
  orderSaved_cn: "排序保存成功",
  pageTitle_en: "Image Reorder",
  pageTitle_cn: "图片排序",
  unsavedTitle_en: "Unsaved Changes",
  unsavedTitle_cn: "未保存的更改",
  unsavedContent_en: "You have unsaved changes. Are you sure you want to leave?",
  unsavedContent_cn: "您有未保存的更改。确定要离开吗？",
  leave_en: "Leave",
  leave_cn: "离开",
  imageOrderManagement_en: "Image Order Management",
  imageOrderManagement_cn: "图片排序管理",
  saveOrder_en: "Save Order",
  saveOrder_cn: "保存排序",
  reset_en: "Reset",
  reset_cn: "重置",
  refreshData_en: "Refresh Data",
  refreshData_cn: "刷新数据",
  previous_en: "Previous",
  previous_cn: "上一页",
  next_en: "Next",
  next_cn: "下一页",

  // ===========================================
  // EVENT REORDER SPECIFIC LABELS
  // ===========================================
  eventOrderManagement_en: "Event Order Management",
  eventOrderManagement_cn: "事件排序管理",
  reorderEvents_en: "Reorder Events",
  reorderEvents_cn: "事件排序",
  searchEvents_en: "Search events...",
  searchEvents_cn: "搜索事件...",
  sortByVenue_en: "Sort by Venue",
  sortByVenue_cn: "按场地排序",
  groupByType_en: "Group by Type",
  groupByType_cn: "按类型分组",
  groupByVenue_en: "Group by Venue",
  groupByVenue_cn: "按场地分组",

  // ===========================================
  // ABOUT SPECIFIC FIELD LABELS
  // ===========================================
  about_management_en: "About Management",
  about_management_cn: "关于管理",
  about_page_title_en: "About Management",
  about_page_title_cn: "关于管理",
  about_create_en: "Create About",
  about_create_cn: "创建关于",
  about_batch_edit_en: "Batch Edit",
  about_batch_edit_cn: "批量编辑",
  about_export_data_en: "Export Data",
  about_export_data_cn: "导出数据",
  about_refresh_en: "Refresh",
  about_refresh_cn: "刷新",
  about_no_items_en: "No about items available",
  about_no_items_cn: "暂无关于数据",
  about_no_matching_items_en: "No matching items found",
  about_no_matching_items_cn: "未找到匹配的项目",
  about_system_empty_en: "SYSTEM EMPTY",
  about_system_empty_cn: "系统为空",
  about_artist_en: "Artist",
  about_artist_cn: "艺术家",
  about_caption_en: "Caption",
  about_caption_cn: "标题",
  about_language_en: "Language",
  about_language_cn: "语言",
  about_order_en: "Order",
  about_order_cn: "排序",
  about_mark_en: "Mark",
  about_mark_cn: "标记",
  about_introduction_en: "introduction",
  about_introduction_cn: "介绍",

  delete_dialog_this_item_en: "this item",
  delete_dialog_this_item_cn: "该项目",

  // Clear filters label
  clear_filters_en: "Clear Filters",
  clear_filters_cn: "清除筛选",

  // ===========================================
  // DELETE ITEM DETAILS LABELS
  // ===========================================
  loading_en: "Loading...",
  loading_cn: "加载中...",

  // ===========================================
  // CONTROL PANEL LABELS
  // ===========================================
  total_en: "Total",
  total_cn: "总数",
  select_en: "Select...",
  select_cn: "选择...",

  // ===========================================
  // BUTTON PANEL LABELS
  // ===========================================
  reorderImages_en: "Reorder Images",
  reorderImages_cn: "图片排序",
  searchImages_en: "Search images...",
  searchImages_cn: "搜索图片...",
  searchEvents_en: "Search events...",
  searchEvents_cn: "搜索事件...",
  searchAbout_en: "Search about...",
  searchAbout_cn: "搜索关于...",
  reorderArtwork_en: "Reorder Artwork",
  reorderArtwork_cn: "作品排序",

  // ===========================================
  // ARTWORK DETAIL LABELS
  // ===========================================
  relatedImages_en: "Related Images",
  relatedImages_cn: "相关图片",
  untitledArtwork_en: "Untitled Artwork",
  untitledArtwork_cn: "无题作品",

  // ===========================================
  // EXHIBITION LABELS
  // ===========================================
  noExhibitionsAvailable_en: "No exhibitions available",
  noExhibitionsAvailable_cn: "暂无展览活动",

  // ===========================================
  // GENERAL PAGE LABELS
  // ===========================================
  connectionFailed_en: "Connection Failed",
  connectionFailed_cn: "连接失败",
  systemUnavailable_en: "System temporarily unavailable",
  systemUnavailable_cn: "系统暂时不可用",
  tryAgain_en: "Try Again",
  tryAgain_cn: "重试",
  noArtworks_en: "No artworks available",
  noArtworks_cn: "暂无艺术作品",
  noEvents_en: "No events available",
  noEvents_cn: "暂无活动",
  series_en: "Series",
  series_cn: "系列",
  type_en: "Type",
  type_cn: "类型",
  all_en: "All",
  all_cn: "全部",
  artworkIndex_en: "Artwork Index",
  artworkIndex_cn: "作品索引",
  viewArtworkIndex_en: "View Artwork Index",
  viewArtworkIndex_cn: "查看作品索引",
  exhibitions_en: "Exhibitions",
  exhibitions_cn: "展览活动",

  // ===========================================
  // SORT NAVIGATION LABELS
  // ===========================================
  sort_en: "Sort",
  sort_cn: "排序",
  sort_by_artist_en: "Sort by Artist",
  sort_by_artist_cn: "按艺术家排序",
  ascendingClickDescending_en: "Ascending - Click for descending",
  ascendingClickDescending_cn: "升序 - 点击切换为降序",
  descendingClickAscending_en: "Descending - Click for ascending",
  descendingClickAscending_cn: "降序 - 点击切换为升序",

  // ===========================================
  // PREVIEW MODAL LABELS
  // ===========================================
  closePreview_en: "Close preview",
  closePreview_cn: "关闭预览",

  // ===========================================
  // LIST WITH EXPAND INFO LABELS
  // ===========================================
  clickToView_en: "Click to view",
  clickToView_cn: "点击查看",
  imageNotAvailable_en: "Image not available",
  imageNotAvailable_cn: "图片加载失败",
  collapseDetails_en: "Collapse details",
  collapseDetails_cn: "收起详情",
  expandDetails_en: "Expand details",
  expandDetails_cn: "展开详情",
  na_en: "N/A",
  na_cn: "无",
  edit_en: "Edit",
  edit_cn: "编辑",
  delete_en: "Delete",
  delete_cn: "删除",

  // ===========================================
  // LAYOUT LABELS
  // ===========================================
  noContentToDisplay_en: "No content to display",
  noContentToDisplay_cn: "没有可显示的内容",
  pieces_en: "pieces",
  pieces_cn: "件",
  noItemsFoundCriteria_en: "No items found matching the criteria",
  noItemsFoundCriteria_cn: "没有找到符合条件的内容",

  // ===========================================
  // IMAGE LABELS
  // ===========================================
  imageUnavailable_en: "Image unavailable",
  imageUnavailable_cn: "图片无法加载",
  noImagesAvailable_en: "No images available",
  noImagesAvailable_cn: "没有可用的图片",

  // ===========================================
  // FORM ALERT LABELS
  // ===========================================
  operationSuccess_en: "Operation completed successfully",
  operationSuccess_cn: "操作成功完成",

  // ===========================================
  // CONTACT MODAL LABELS
  // ===========================================
  contactInformation_en: "Contact Information",
  contactInformation_cn: "联系信息",
  email_en: "Email",
  email_cn: "邮箱",
  instagram_en: "Instagram",
  instagram_cn: "Instagram",
  xiaohongshu_en: "Xiaohongshu",
  xiaohongshu_cn: "小红书",
  facebook_en: "Facebook",
  facebook_cn: "Facebook",
  wechat_en: "WeChat",
  wechat_cn: "微信",
  phone_en: "Phone",
  phone_cn: "电话",
  web_en: "web",
  web_cn: "网站",
  xiaohongshuHomepage_en: "Xiaohongshu Homepage",
  xiaohongshuHomepage_cn: "小红书主页",
  facebookHomepage_en: "Facebook Homepage",
  facebookHomepage_cn: "Facebook主页",
  contact_en: "Contact",
  contact_cn: "联系",
  contactUs_en: "Contact Us",
  contactUs_cn: "联系我们",

  // ===========================================
  // ARTISTS PAGE LABELS
  // ===========================================
  noArtistsFound_en: "No artists data available",
  noArtistsFound_cn: "暂无艺术家数据",
  artist_en: "Artist",
  artist_cn: "艺术家",

  // ===========================================
  // ARTWORK REORDER SPECIFIC LABELS
  // ===========================================
  artworkReorderManager_en: "Artwork Reorder Manager",
  artworkReorderManager_cn: "作品排序管理器",
  showingLanguageArtworks_en: "Showing {language} artworks only",
  showingLanguageArtworks_cn: "仅显示{language}作品",
  chineseArtworks_en: "Chinese",
  chineseArtworks_cn: "中文",
  englishArtworks_en: "English", 
  englishArtworks_cn: "英文",
  sortByYear_en: "Sort by Year",
  sortByYear_cn: "按年份排序",
  sortByType_en: "Sort by Type",
  sortByType_cn: "按类型排序",
  sortBySeries_en: "Sort by Series",
  sortBySeries_cn: "按系列排序",
  groupBySeries_en: "Group by Series",
  groupBySeries_cn: "按系列分组",
  oldestFirst_en: "Oldest First",
  oldestFirst_cn: "最早优先",
  newestFirst_en: "Newest First",
  newestFirst_cn: "最新优先",
  aToZ_en: "A-Z",
  aToZ_cn: "A-Z",
  zToA_en: "Z-A",
  zToA_cn: "Z-A",
  dragGroups_en: "Drag groups",
  dragGroups_cn: "拖拽分组",
  resetToOriginalOrder_en: "Reset to Original Order",
  resetToOriginalOrder_cn: "重置为原始顺序",
  groupedBySeries_en: "✓ Grouped by series (drag series groups)",
  groupedBySeries_cn: "✓ 已按系列分组（拖拽系列组）",
  sortedByYearOldest_en: "✓ Sorted by year (oldest to newest)",
  sortedByYearOldest_cn: "✓ 已按年份排序（从早到晚）",
  sortedByYearNewest_en: "✓ Sorted by year (newest to oldest)",
  sortedByYearNewest_cn: "✓ 已按年份排序（从晚到早）",
  sortedByTypeAZ_en: "✓ Sorted by type (A to Z)",
  sortedByTypeAZ_cn: "✓ 已按类型排序（A到Z）",
  sortedByTypeZA_en: "✓ Sorted by type (Z to A)",
  sortedByTypeZA_cn: "✓ 已按类型排序（Z到A）",
  sortedBySeriesAZ_en: "✓ Sorted by series (A to Z)",
  sortedBySeriesAZ_cn: "✓ 已按系列排序（A到Z）",
  sortedBySeriesZA_en: "✓ Sorted by series (Z to A)",
  sortedBySeriesZA_cn: "✓ 已按系列排序（Z到A）",
  orderSavedSuccessfully_en: "Order saved successfully!",
  orderSavedSuccessfully_cn: "排序保存成功！",
  savingOrder_en: "Saving order...",
  savingOrder_cn: "保存排序中...",
  seriesGroups_en: "Series Groups",
  seriesGroups_cn: "系列分组",
  draggableArtworks_en: "Draggable Artworks",
  draggableArtworks_cn: "可拖拽作品",
  seriesArtworksCount_en: "Series: {series} ({count} artworks)",
  seriesArtworksCount_cn: "系列：{series}（{count}件作品）",
  noLanguageArtworksFound_en: "No {language} artworks found. Please add some artworks first.",
  noLanguageArtworksFound_cn: "未找到{language}作品。请先添加一些作品。",
  currentOrder_en: "Current Order:",
  currentOrder_cn: "当前顺序：",
  untitledByArtist_en: "Untitled by {artist}",
  untitledByArtist_cn: "无题作品，作者：{artist}",
  unknownArtist_en: "Unknown Artist",
  unknownArtist_cn: "未知艺术家",
  editArtwork_en: "Edit artwork",
  editArtwork_cn: "编辑作品",

  // ===========================================
  // GENERIC REORDER COMPONENT LABELS
  // ===========================================
  editItem_en: "Edit item",
  editItem_cn: "编辑项目",
  errorLoadingItems_en: "Error Loading Items",
  errorLoadingItems_cn: "加载项目时出错",
  retry_en: "Retry",
  retry_cn: "重试",
  showingLanguageItems_en: "Showing {language} items only",
  showingLanguageItems_cn: "仅显示{language}项目",
  chineseItems_en: "Chinese",
  chineseItems_cn: "中文",
  englishItems_en: "English",
  englishItems_cn: "英文",
  ascending_en: "Ascending",
  ascending_cn: "升序",
  descending_en: "Descending",
  descending_cn: "降序",
  itemGroups_en: "Item Groups",
  itemGroups_cn: "项目分组",
  draggableItems_en: "Draggable Items",
  draggableItems_cn: "可拖拽项目",
  noLanguageItemsFound_en: "No {language} items found. Please add some items first.",
  noLanguageItemsFound_cn: "未找到{language}项目。请先添加一些项目。",

  // ===========================================
  // IMAGE REORDER SPECIFIC LABELS
  // ===========================================
  imageOrderManagement_en: "Image Order Management",
  imageOrderManagement_cn: "图片排序管理",
  sortByType_en: "Sort by Type",
  sortByType_cn: "按类型排序",
  sortByTag_en_en: "Sort by Tag (English)",
  sortByTag_en_cn: "按英文标签排序",
  sortByTag_cn_en: "Sort by Tag (Chinese)",
  sortByTag_cn_cn: "按中文标签排序",
  groupByType_en: "Group by Type",
  groupByType_cn: "按类型分组",

  // ===========================================
  // VIDEO REORDER SPECIFIC LABELS
  // ===========================================
  videoOrderManagement_en: "Video Order Management",
  videoOrderManagement_cn: "视频排序管理",

};

/**
 * Helper function to get the current language context
 * Safely retrieves language preference from React Context
 * Falls back to English if not in a React component context
 *
 * @returns {boolean} - Returns true for Chinese, false for English
 */
function getIsCnFromContext() {
  try {
    // Only works within a React component context
    return useContext(LanguageContext)?.isCn;
  } catch {
    // Not in a React component context, fallback to English
    return false;
  }
}

/**
 * Get system label by key and language preference
 *
 * @param {string} key - The label key (without language suffix)
 * @param {boolean} [isCn] - Language preference (true for Chinese, false for English)
 *                           If not provided, will use context or default to English
 * @returns {string} - The localized label text or the key if not found
 */
export const getSystemLabel = (key, isCn) => {
  // Determine language preference
  let lang = isCn;
  if (typeof lang === 'undefined') {
    lang = getIsCnFromContext();
  }

  // Construct the full key with language suffix
  const fullKey = lang ? `${key}_cn` : `${key}_en`;

  // Return the label or fall back to the original key
  return systemLabels[fullKey] || key;
};

// Default export for convenience
export default {
  systemLabels,
  getSystemLabel,
};