// galleryContactLabels.js
// Field labels based on GalleryContact Prisma model

export const fieldLabels = {
  // Core fields
  gallery_name: "Gallery Name / 画廊名称",
  opening_time: "Opening Hours / 营业时间",
  email: "Email / 邮箱",
  phone: "Phone / 电话",
  address: "Address / 地址",
  social_media: "Social Media / 社交媒体",
  web_url: "Website URL / 网站链接",
  language: "Language / 语言",
  order: "Order / 顺序",
  
  // Timestamps
  updatedAt: "Last Updated / 最后更新",
};

// Page text labels
export const PAGE_TEXT = {
  // Page Title
  pageTitle: {
    EN: "Gallery Contact Management",
    CN: "画廊联系信息管理",
  },
  
  // Item Name
  itemName: {
    EN: "Gallery Contact",
    CN: "画廊联系信息",
  },
  
  // Create Button Tooltip
  createTooltip: {
    EN: "Create New Gallery Contact",
    CN: "创建新画廊联系信息",
  },
  
  // Filter Labels
  filters: {
    language: { EN: "Language", CN: "语言" },
    gallery_name: { EN: "Gallery Name", CN: "画廊名称" },
  },
  
  // Control Panel
  controlPanel: {
    sortByOrder: { EN: "Sort by Order", CN: "按顺序排序" },
    sortByOrderTooltip: { EN: "Sort contacts by order", CN: "按顺序排序联系信息" },
    sortByName: { EN: "Sort by Name", CN: "按名称排序" },
    sortByNameTooltip: { EN: "Sort by gallery name", CN: "按画廊名称排序" },
    exportData: { EN: "Export Data", CN: "导出数据" },
    exportDataTooltip: { EN: "Export gallery contact data", CN: "导出画廊联系数据" },
  },
  
  // Field Labels
  fields: {
    galleryName: { EN: "Gallery Name", CN: "画廊名称" },
    openingTime: { EN: "Opening Hours", CN: "营业时间" },
    email: { EN: "Email", CN: "邮箱" },
    phone: { EN: "Phone", CN: "电话" },
    address: { EN: "Address", CN: "地址" },
    socialMedia: { EN: "Social Media", CN: "社交媒体" },
    webUrl: { EN: "Website URL", CN: "网站链接" },
    language: { EN: "Language", CN: "语言" },
    order: { EN: "Order", CN: "顺序" },
    updatedAt: { EN: "Updated At", CN: "更新时间" },
  },
  
  // Empty State Messages
  emptyState: {
    noData: { EN: "No gallery contacts found", CN: "暂无画廊联系信息" },
    noMatchingEntries: { EN: "No matching contacts", CN: "没有匹配的联系信息" },
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
    entries: { EN: "contacts", CN: "个联系信息" },
  },
};

// Action labels
export const actionLabels = {
  create_en: "Create Gallery Contact",
  create_cn: "创建画廊联系信息",
  edit_en: "Edit Gallery Contact",
  edit_cn: "编辑画廊联系信息",
  delete_en: "Delete Gallery Contact",
  delete_cn: "删除画廊联系信息",
  export_en: "Export Gallery Contact Data",
  export_cn: "导出画廊联系数据",
  import_en: "Import Gallery Contact Data",
  import_cn: "导入画廊联系数据",
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
  galleryContact_en: "Gallery Contact",
  galleryContact_cn: "画廊联系信息",
  galleryContacts_en: "Gallery Contacts",
  galleryContacts_cn: "画廊联系信息列表",
  untitled_en: "Untitled Contact",
  untitled_cn: "未命名联系信息",
};

// Filter labels
export const filterLabels = {
  all_languages_en: "All Languages",
  all_languages_cn: "全部语言",
  all_galleries_en: "All Galleries",
  all_galleries_cn: "全部画廊",
};

// Sort labels
export const sortLabels = {
  sort_by_order_en: "Sort by Order",
  sort_by_order_cn: "按顺序排序",
  sort_by_name_en: "Sort by Name",
  sort_by_name_cn: "按名称排序",
};

// Page labels
export const pageLabels = {
  title_en: "Gallery Contact Management",
  title_cn: "画廊联系信息管理",
  description_en: "Manage gallery contact information",
  description_cn: "管理画廊联系信息",
};

// UI Text labels
export const uiTextLabels = {
  pageTitle: { en: 'Gallery Contacts', cn: '画廊联系信息' },
  galleryName: { en: 'Gallery Name', cn: '画廊名称' },
  email: { en: 'Email', cn: '邮箱' },
  phone: { en: 'Phone', cn: '电话' },
  language: { en: 'Language', cn: '语言' },
  all: { en: 'All', cn: '全部' },
  noItemsFound: { 
    en: 'No items found matching the criteria', 
    cn: '没有找到符合条件的项目' 
  },
  noEntriesFound: { 
    en: 'No gallery contacts found matching the criteria', 
    cn: '没有找到符合条件的画廊联系信息' 
  },
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  fields: {
    gallery_name: { en: 'Gallery Name', cn: '画廊名称' },
    email: { en: 'Email', cn: '邮箱' },
    phone: { en: 'Phone', cn: '电话' },
    language: { en: 'Language', cn: '语言' },
  }
};

// Display labels
export const displayLabels = {
  detailButtonText: (isCn) => isCn ? '查看详情' : 'See Details',
  emptyMessage: (isCn) => isCn ? '没有可显示的联系信息' : 'No gallery contacts to display',
  noMatchMessage: (isCn) => isCn ? '未找到匹配的联系信息' : 'No matching contacts found',
  loadingMessage: (isCn) => isCn ? '加载中...' : 'Loading...',
  errorMessage: (isCn) => isCn ? '加载失败' : 'Failed to load',
};

// Control panel labels
export const controlPanelLabels = {
  language: '语言',
  galleryName: '画廊名称',
  sortByOrder: '按顺序排序',
  sortByOrderTooltip: 'Sort by Order',
  sortByName: '按名称排序',
  sortByNameTooltip: 'Sort by Name',
  galleryNameLabel_en: "Gallery Name",
  galleryNameLabel_cn: "画廊名称",
  languageLabel_en: "Language",
  languageLabel_cn: "语言",
};

// Default content labels
export const defaultContentLabels = {
  listTitle: (isCn) => isCn ? "联系信息列表" : "CONTACT LIST",
  detailsLabel: (isCn) => isCn ? "联系信息详情" : "CONTACT DETAILS",
  untitled: (isCn) => isCn ? "未命名联系信息" : "Untitled Contact",
  noDescription: (isCn) => isCn ? '暂无描述' : 'No description available',
  back: (isCn) => isCn ? "返回" : "BACK",
};

// Field group labels
export const fieldGroupLabels = {
  basic: {
    title: (isCn) => isCn ? "基本信息" : "Basic Info",
  },
  contact: {
    title: (isCn) => isCn ? "联系方式" : "Contact Details",
  },
  classification: {
    title: (isCn) => isCn ? "分类" : "Classification",
  },
};

// Field labels for components (object with en/cn)
export const fieldLabelsForComponents = {
  gallery_name: { en: 'Gallery Name', cn: '画廊名称' },
  opening_time: { en: 'Opening Hours', cn: '营业时间' },
  email: { en: 'Email', cn: '邮箱' },
  phone: { en: 'Phone', cn: '电话' },
  address: { en: 'Address', cn: '地址' },
  social_media: { en: 'Social Media', cn: '社交媒体' },
  web_url: { en: 'Website URL', cn: '网站链接' },
  language: { en: 'Language', cn: '语言' },
  order: { en: 'Order', cn: '顺序' },
};

// Delete dialog labels
export const deleteDialogLabels = {
  delete_dialog_this_item_en: "this gallery contact",
  delete_dialog_this_item_cn: "该画廊联系信息",
  confirmDeleteEntry_en: "Are you sure you want to delete this gallery contact?",
  confirmDeleteEntry_cn: "确定要删除该画廊联系信息吗？",
  thisEntry_en: "this contact",
  thisEntry_cn: "该联系信息",
};

// Additional labels (placeholders, etc.)
export const additionalLabels = {
  // Placeholder and description labels
  selectLanguage_en: "Select Language",
  selectLanguage_cn: "选择语言",
  selectGallery_en: "Select Gallery",
  selectGallery_cn: "选择画廊",
  galleryNamePlaceholder_en: "Enter gallery name",
  galleryNamePlaceholder_cn: "输入画廊名称",
  openingTimePlaceholder_en: "Enter opening hours (e.g., Mon-Fri 9am-6pm)",
  openingTimePlaceholder_cn: "输入营业时间（例如：周一至周五 9:00-18:00）",
  emailPlaceholder_en: "Enter email address",
  emailPlaceholder_cn: "输入邮箱地址",
  phonePlaceholder_en: "Enter phone number",
  phonePlaceholder_cn: "输入电话号码",
  addressPlaceholder_en: "Enter address (one per line)",
  addressPlaceholder_cn: "输入地址（每行一个）",
  socialMediaPlaceholder_en: "Enter social media accounts (e.g., instagram:myacc, facebook:myfb)",
  socialMediaPlaceholder_cn: "输入社交媒体账号（例如：instagram:myacc, facebook:myfb）",
  webUrlPlaceholder_en: "Enter website URL",
  webUrlPlaceholder_cn: "输入网站链接",
  
  // Address labels
  address_en: "Address",
  address_cn: "地址",
  addressSummary_en: "Address Lines",
  addressSummary_cn: "地址行",
  addressDescription_en: "Add address lines (one per line).",
  addressDescription_cn: "添加地址行（每行一个）。",
  addAddressButton_en: "Add Address Line",
  addAddressButton_cn: "添加地址行",
  removeAddressButton_en: "Remove",
  removeAddressButton_cn: "移除",
  
  // Social media labels
  social_media_en: "Social Media",
  social_media_cn: "社交媒体",
  socialMediaSummary_en: "Social Media Accounts",
  socialMediaSummary_cn: "社交媒体账号",
  socialMediaDescription_en: "Add social media accounts with platform, account name, and URL.",
  socialMediaDescription_cn: "添加社交媒体账号（平台、账号名和链接）。",
  addSocialMediaButton_en: "Add Account",
  addSocialMediaButton_cn: "添加账号",
  removeSocialMediaButton_en: "Remove",
  removeSocialMediaButton_cn: "移除",
  platformPlaceholder_en: "Platform (e.g., instagram)",
  platformPlaceholder_cn: "平台（例如：instagram）",
  accountPlaceholder_en: "Account name",
  accountPlaceholder_cn: "账号名",
  urlPlaceholder_en: "Profile URL",
  urlPlaceholder_cn: "个人链接",
  
  // Entity and collection labels
  no_entries_en: "No gallery contacts found",
  no_entries_cn: "未找到画廊联系信息",
  
  // Search and filter labels
  searchEntries_en: "Search gallery contacts",
  searchEntries_cn: "搜索画廊联系信息",
  
  // Status and error labels
  noFeaturedEntries_en: "No featured gallery contacts available",
  noFeaturedEntries_cn: "暂无精选画廊联系信息",
  noMatchingEntries_en: "No matching gallery contacts found",
  noMatchingEntries_cn: "没有找到符合条件的画廊联系信息",
};

// UI Text Configuration (compact error/message strings)
export const UI_TEXT = {
  loadingError: { en: 'Connection Failed', cn: '连接失败' },
  systemError: { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain: { en: 'Try Again', cn: '重试' },
  galleryContactManagement: { en: 'Gallery Contact Management', cn: '画廊联系信息管理' },
  noData: { en: 'No gallery contacts available', cn: '暂无画廊联系信息' },
  noMatchingEntries: { en: 'No matching gallery contacts found', cn: '未找到匹配的画廊联系信息' },
  all: { en: 'All', cn: '全部' },
  totalCount: { en: 'Total', cn: '总计' },
  exportSuccess: { en: 'Export successful', cn: '导出成功' },
  exportError: { en: 'Export failed', cn: '导出失败' },
  exportInProgress: { en: 'Exporting...', cn: '导出中...' }
};

// Combined labels object for easy access
export const galleryContactLabels = {
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
export const getGalleryContactLabel = (key, language = 'en') => {
  if (!key) return '';
  
  // Try direct field labels first (slash format string)
  if (fieldLabels[key]) {
    // fieldLabels[key] is like "Gallery Name / 画廊名称"
    if (language === 'en') {
      return fieldLabels[key].split('/')[0].trim();
    } else {
      return fieldLabels[key].split('/')[1]?.trim() || fieldLabels[key];
    }
  }
  
  // Try labels with language suffix
  const labelKey = `${key}_${language}`;
  if (galleryContactLabels[labelKey]) {
    return galleryContactLabels[labelKey];
  }
  
  // Fallback to English if Chinese not found
  if (language === 'cn') {
    const englishKey = `${key}_en`;
    if (galleryContactLabels[englishKey]) {
      return galleryContactLabels[englishKey];
    }
  }
  
  return key;
};

// Helper function to get UI text
export const getGalleryContactUIText = (key, language = 'en') => {
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
export default galleryContactLabels;