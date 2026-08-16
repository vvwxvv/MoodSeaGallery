// Subscribe Labels - Centralized label management for subscribe-related components

// Field labels
export const fieldLabels = {
  name_en: "Name",
  name_cn: "姓名",
  email_en: "Email",
  email_cn: "邮箱",
  isActive_en: "Active",
  isActive_cn: "激活状态",
  createdAt_en: "Created At",
  createdAt_cn: "创建时间",
  yourName_en: "Your name",
  yourName_cn: "您的姓名",
  enterEmail_en: "your@email.com",
  enterEmail_cn: "请输入邮箱",
};

// Action labels
export const actionLabels = {
  create_en: "Create Subscribe",
  create_cn: "创建订阅",
  edit_en: "Edit Subscribe",
  edit_cn: "编辑订阅",
  delete_en: "Delete Subscribe",
  delete_cn: "删除订阅",
  export_en: "Export Subscribes",
  export_cn: "导出订阅",
  import_en: "Import Subscribes",
  import_cn: "导入订阅",
  subscribe_en: "Subscribe",
  subscribe_cn: "订阅",
  subscribing_en: "Subscribing...",
  subscribing_cn: "订阅中...",
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

// Validation labels
export const validationLabels = {
  required_en: "This field is required",
  required_cn: "此字段为必填项",
  invalid_email_en: "Please enter a valid email address",
  invalid_email_cn: "请输入有效的邮箱地址",
};

// Entity labels
export const entityLabels = {
  subscribe_en: "Subscribe",
  subscribe_cn: "订阅",
  subscribes_en: "Subscribes",
  subscribes_cn: "订阅",
  newsletter_en: "Newsletter",
  newsletter_cn: "新闻通讯",
};

// Form labels
export const formLabels = {
  submitButton_en: "Subscribe",
  submitButton_cn: "订阅",
  submittingButton_en: "Subscribing...",
  submittingButton_cn: "订阅中...",
  successMessage_en: "Successfully subscribed to newsletter!",
  successMessage_cn: "成功订阅新闻通讯！",
  errorMessage_en: "Failed to subscribe",
  errorMessage_cn: "订阅失败",
  formErrorsMessage_en: "Please fix the form errors",
  formErrorsMessage_cn: "请修复表单错误",
  submissionErrorMessage_en: "Network error occurred",
  submissionErrorMessage_cn: "发生网络错误",
};

// Filter labels
export const filterLabels = {
  all_statuses_en: "All Statuses",
  all_statuses_cn: "全部状态",
  search_en: "Search",
  search_cn: "搜索",
  search_placeholder_en: "Search subscriptions...",
  search_placeholder_cn: "搜索订阅...",
};

// Sort labels
export const sortLabels = {
  sort_by_created_at_en: "Sort by Created Date",
  sort_by_created_at_cn: "按创建日期排序",
  sort_by_name_en: "Sort by Name",
  sort_by_name_cn: "按姓名排序",
  sort_by_email_en: "Sort by Email",
  sort_by_email_cn: "按邮箱排序",
  sort_by_status_en: "Sort by Status",
  sort_by_status_cn: "按状态排序",
};

// Page labels
export const pageLabels = {
  title_cn: "订阅管理",
  title_en: "Subscribe Management",
  description_cn: "管理新闻通讯订阅",
  description_en: "Manage newsletter subscriptions",
  itemName_cn: "订阅",
  itemName_en: "Subscribe",
  page_title_en: "Subscribe Management",
  page_title_cn: "订阅管理",
};

// Display labels
export const displayLabels = {
  detailButtonText: (isCn) => isCn ? '查看详情' : 'See Details',
  emptyMessage: (isCn) => isCn ? '没有可显示的订阅' : 'No subscriptions to display',
  noMatchMessage: (isCn) => isCn ? '未找到匹配的订阅' : 'No matching subscriptions found',
  loadingMessage: (isCn) => isCn ? '加载中...' : 'Loading...',
  errorMessage: (isCn) => isCn ? '加载失败' : 'Failed to load',
  imageErrorText: 'Image unavailable',
};

// Default content labels
export const defaultContentLabels = {
  listTitle: (isCn) => isCn ? "订阅列表" : "SUBSCRIBE LIST",
  detailsLabel: (isCn) => isCn ? "订阅详情" : "SUBSCRIBE DETAILS",
  noName: (isCn) => isCn ? "无名称" : "No Name",
  noEmail: (isCn) => isCn ? "无邮箱" : "No Email",
  back: (isCn) => isCn ? "返回" : "BACK",
};

// Field group labels
export const fieldGroupLabels = {
  basic: {
    title: (isCn) => isCn ? "基本信息" : "Basic Info",
  },
};

// Field labels for components
export const fieldLabelsForComponents = {
  name: { en: 'Name', cn: '姓名' },
  email: { en: 'Email', cn: '邮箱' },
  isActive: { en: 'Active', cn: '激活状态' },
  createdAt: { en: 'Created At', cn: '创建时间' },
  yourName: { en: 'Your name', cn: '您的姓名' },
  enterEmail: { en: 'your@email.com', cn: '请输入邮箱' }
};

// Delete dialog labels
export const deleteDialogLabels = {
  delete_dialog_this_item_en: "this subscription",
  delete_dialog_this_item_cn: "该订阅",
};

// Newsletter popup labels
export const newsletterPopupLabels = {
  yourName_en: "Your name",
  yourName_cn: "您的姓名",
  enterEmail_en: "your@email.com",
  enterEmail_cn: "请输入邮箱",
  subscribing_en: "Subscribing...",
  subscribing_cn: "订阅中...",
  subscribe_en: "Subscribe",
  subscribe_cn: "订阅",
};

// Status options for static filter options
export const statusOptions = [
  { value: true, label_en: 'Active', label_cn: '激活' },
  { value: false, label_en: 'Inactive', label_cn: '未激活' }
];

// Combined labels object for easy access
export const subscribeLabels = {
  ...fieldLabels,
  ...actionLabels,
  ...statusLabels,
  ...validationLabels,
  ...entityLabels,
  ...formLabels,
  ...filterLabels,
  ...sortLabels,
  ...pageLabels,
  ...deleteDialogLabels,
  ...newsletterPopupLabels,
  display: displayLabels,
  defaultContent: defaultContentLabels,
  fieldGroups: fieldGroupLabels,
  fieldLabels: fieldLabelsForComponents,
  statusOptions: statusOptions,
};

// Helper function to get labels
export const getSubscribeLabel = (key, language = 'en') => {
  if (!key) return '';
  
  // Try direct field labels first
  if (fieldLabelsForComponents[key]) {
    return fieldLabelsForComponents[key][language] || fieldLabelsForComponents[key]['en'] || key;
  }
  
  // Try labels with language suffix
  const labelKey = `${key}_${language}`;
  if (subscribeLabels[labelKey]) {
    return subscribeLabels[labelKey];
  }
  
  // Fallback to English if Chinese not found
  if (language === 'cn') {
    const englishKey = `${key}_en`;
    if (subscribeLabels[englishKey]) {
      return subscribeLabels[englishKey];
    }
  }
  
  return key;
};

// Helper function to get field group labels
export const getSubscribeFieldGroupLabel = (groupKey, language = 'en') => {
  if (!groupKey || !fieldGroupLabels[groupKey]) return '';
  
  return fieldGroupLabels[groupKey].title(language === 'cn');
};

// Helper function to get static filter options
export const getStaticFilterOptions = (filterField, language = 'en') => {
  if (filterField === 'isActive') {
    return statusOptions.map(option => ({
      value: option.value,
      label: language === 'cn' ? option.label_cn : option.label_en
    }));
  }
  
  return [];
};

// Default export
export default subscribeLabels;
