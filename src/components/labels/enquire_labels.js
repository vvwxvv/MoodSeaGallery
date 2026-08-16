// ─────────────────────────────────────────────
// enquire_labels.js
// Matches Prisma Enquire model fields exactly
// ─────────────────────────────────────────────

// Core field labels (bilingual objects)
export const fieldLabels = {
    name:                   { en: 'Name',           cn: '姓名' },
    email:                  { en: 'Email',          cn: '邮箱' },
    phone:                  { en: 'Phone',          cn: '电话' },
    message:                { en: 'Message',        cn: '留言' },
    related_gallery_artist: { en: 'Related Artist', cn: '相关艺术家' },
    related_artwork_title:  { en: 'Related Artwork',cn: '相关作品' },
    createdAt:              { en: 'Created At',     cn: '创建时间' },
    status:                 { en: 'Status',         cn: '状态' },
  };
  
  // ─────────────────────────────────────────────
  // Page text labels
  // ─────────────────────────────────────────────
  export const PAGE_TEXT = {
    pageTitle: {
      EN: 'Enquiry Management',
      CN: '咨询管理',
    },
  
    itemName: {
      EN: 'Enquiry',
      CN: '咨询',
    },
  
    createTooltip: {
      EN: 'Create New Enquiry',
      CN: '创建新咨询',
    },
  
    filters: {
      name:                   { EN: 'Name',           CN: '姓名' },
      email:                  { EN: 'Email',          CN: '邮箱' },
      status:                 { EN: 'Status',         CN: '状态' },
      related_gallery_artist: { EN: 'Related Artist', CN: '相关艺术家' },
      related_artwork_title:  { EN: 'Related Artwork',CN: '相关作品' },
    },
  
    controlPanel: {
      sortByName:         { EN: 'Sort by Name',      CN: '按姓名排序' },
      sortByNameTooltip:  { EN: 'Sort enquiries by name', CN: '按姓名排序咨询' },
      sortByDate:         { EN: 'Sort by Date',      CN: '按日期排序' },
      sortByDateTooltip:  { EN: 'Sort enquiries by date', CN: '按日期排序咨询' },
      sortByStatus:       { EN: 'Sort by Status',    CN: '按状态排序' },
      sortByStatusTooltip:{ EN: 'Sort enquiries by status', CN: '按状态排序咨询' },
      exportData:         { EN: 'Export Data',       CN: '导出数据' },
      exportDataTooltip:  { EN: 'Export enquiry data', CN: '导出咨询数据' },
    },
  
    fields: {
      name:                   { EN: 'Name',           CN: '姓名' },
      email:                  { EN: 'Email',          CN: '邮箱' },
      phone:                  { EN: 'Phone',          CN: '电话' },
      message:                { EN: 'Message',        CN: '留言' },
      related_gallery_artist: { EN: 'Related Artist', CN: '相关艺术家' },
      related_artwork_title:  { EN: 'Related Artwork',CN: '相关作品' },
      createdAt:              { EN: 'Created At',     CN: '创建时间' },
      status:                 { EN: 'Status',         CN: '状态' },
    },
  
    emptyState: {
      noData:            { EN: 'No enquiries found',    CN: '暂无咨询' },
      noMatchingEnquiries:{ EN: 'No matching enquiries',CN: '没有匹配的咨询' },
    },
  
    deleteDialog: {
      title:   { EN: 'Confirm Delete', CN: '确认删除' },
      confirm: { EN: 'Delete',         CN: '删除' },
      cancel:  { EN: 'Cancel',         CN: '取消' },
    },
  
    errors: {
      loadingError: { EN: 'Error loading data',    CN: '加载数据错误' },
      systemError:  { EN: 'System error occurred', CN: '系统错误' },
      tryAgain:     { EN: 'Try Again',             CN: '重试' },
      deleteError:  { EN: 'Delete failed',         CN: '删除失败' },
      pleaseRetry:  { EN: 'Please try again',      CN: '请重试' },
      ok:           { EN: 'OK',                    CN: '确定' },
    },
  
    export: {
      success:   { EN: 'Export successful', CN: '导出成功' },
      error:     { EN: 'Export failed',     CN: '导出失败' },
      enquiries: { EN: 'enquiries',         CN: '条咨询' },
    },
  };
  
  // ─────────────────────────────────────────────
  // Action labels
  // ─────────────────────────────────────────────
  export const actionLabels = {
    create_en: 'Create Enquiry',
    create_cn: '创建咨询',
    edit_en:   'Edit Enquiry',
    edit_cn:   '编辑咨询',
    delete_en: 'Delete Enquiry',
    delete_cn: '删除咨询',
    export_en: 'Export Enquiries',
    export_cn: '导出咨询',
    import_en: 'Import Enquiries',
    import_cn: '导入咨询',
  };
  
  // ─────────────────────────────────────────────
  // Status labels
  // ─────────────────────────────────────────────
  export const statusLabels = {
    success_en: 'Operation completed successfully',
    success_cn: '操作成功完成',
    error_en:   'An error occurred',
    error_cn:   '发生错误',
    loading_en: 'Loading...',
    loading_cn: '加载中...',
    saving_en:  'Saving...',
    saving_cn:  '保存中...',
  };
  
  // ─────────────────────────────────────────────
  // Entity labels
  // ─────────────────────────────────────────────
  export const entityLabels = {
    enquiry_en:         'Enquiry',
    enquiry_cn:         '咨询',
    enquiries_en:       'Enquiries',
    enquiries_cn:       '咨询',
    untitledEnquiry_en: 'Untitled Enquiry',
    untitledEnquiry_cn: '无标题咨询',
  };
  
  // ─────────────────────────────────────────────
  // Filter labels
  // ─────────────────────────────────────────────
  export const filterLabels = {
    all_names_en:    'All Names',    all_names_cn:    '全部姓名',
    all_emails_en:   'All Emails',   all_emails_cn:   '全部邮箱',
    all_statuses_en: 'All Statuses', all_statuses_cn: '全部状态',
    all_artists_en:  'All Artists',  all_artists_cn:  '全部艺术家',
    all_artworks_en: 'All Artworks', all_artworks_cn: '全部作品',
  };
  
  // ─────────────────────────────────────────────
  // Sort labels
  // ─────────────────────────────────────────────
  export const sortLabels = {
    sort_by_date_en:   'Sort by Date',   sort_by_date_cn:   '按日期排序',
    sort_by_name_en:   'Sort by Name',   sort_by_name_cn:   '按姓名排序',
    sort_by_status_en: 'Sort by Status', sort_by_status_cn: '按状态排序',
  };
  
  // ─────────────────────────────────────────────
  // Page labels
  // ─────────────────────────────────────────────
  export const pageLabels = {
    title_en:      'Enquiry Management',
    title_cn:      '咨询管理',
    description_en:'Manage customer enquiries and requests',
    description_cn:'管理客户咨询与请求',
  };
  
  // ─────────────────────────────────────────────
  // UI Text labels
  // ─────────────────────────────────────────────
  export const uiTextLabels = {
    pageTitle:              { en: 'Enquiry Index',    cn: '咨询索引' },
    name:                   { en: 'Name',             cn: '姓名' },
    email:                  { en: 'Email',            cn: '邮箱' },
    phone:                  { en: 'Phone',            cn: '电话' },
    message:                { en: 'Message',          cn: '留言' },
    related_gallery_artist: { en: 'Related Artist',   cn: '相关艺术家' },
    related_artwork_title:  { en: 'Related Artwork',  cn: '相关作品' },
    createdAt:              { en: 'Created At',       cn: '创建时间' },
    status:                 { en: 'Status',           cn: '状态' },
    all:                    { en: 'All',              cn: '全部' },
    other:                  { en: 'Other',            cn: '其他' },
    noItemsFound: {
      en: 'No items found matching the criteria',
      cn: '没有找到符合条件的项目',
    },
    noEnquiriesFound: {
      en: 'No enquiries found matching the criteria',
      cn: '没有找到符合条件的咨询',
    },
    loadingError: { en: 'Connection Failed',              cn: '连接失败' },
    systemError:  { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
    tryAgain:     { en: 'Try Again',                      cn: '重试' },
    fields: {
      name:                   { en: 'Name',           cn: '姓名' },
      email:                  { en: 'Email',          cn: '邮箱' },
      phone:                  { en: 'Phone',          cn: '电话' },
      message:                { en: 'Message',        cn: '留言' },
      related_gallery_artist: { en: 'Related Artist', cn: '相关艺术家' },
      related_artwork_title:  { en: 'Related Artwork',cn: '相关作品' },
      createdAt:              { en: 'Created At',     cn: '创建时间' },
      status:                 { en: 'Status',         cn: '状态' },
    },
  };
  
  // ─────────────────────────────────────────────
  // Display labels
  // ─────────────────────────────────────────────
  export const displayLabels = {
    detailButtonText: (isCn) => isCn ? '查看详情'    : 'See Details',
    emptyMessage:     (isCn) => isCn ? '没有可显示的咨询' : 'No enquiries to display',
    noMatchMessage:   (isCn) => isCn ? '未找到匹配的咨询' : 'No matching enquiries found',
    loadingMessage:   (isCn) => isCn ? '加载中...'   : 'Loading...',
    errorMessage:     (isCn) => isCn ? '加载失败'    : 'Failed to load',
  };
  
  // ─────────────────────────────────────────────
  // Control panel labels
  // ─────────────────────────────────────────────
  export const controlPanelLabels = {
    name:           (isCn) => isCn ? '姓名'   : 'Name',
    email:          (isCn) => isCn ? '邮箱'   : 'Email',
    status:         (isCn) => isCn ? '状态'   : 'Status',
    createdAt:      (isCn) => isCn ? '时间'   : 'Date',
  
    sortByName:          (isCn) => isCn ? '按姓名排序' : 'Sort by Name',
    sortByNameTooltip:   (isCn) => isCn ? '按姓名排序咨询' : 'Sort enquiries by name',
    sortByDate:          (isCn) => isCn ? '按日期排序' : 'Sort by Date',
    sortByDateTooltip:   (isCn) => isCn ? '按日期排序咨询' : 'Sort enquiries by date',
    sortByStatus:        (isCn) => isCn ? '按状态排序' : 'Sort by Status',
    sortByStatusTooltip: (isCn) => isCn ? '按状态排序咨询' : 'Sort enquiries by status',
  
    // Backwards compatibility flat strings
    nameLabel_en:    'Name',     nameLabel_cn:    '姓名',
    emailLabel_en:   'Email',    emailLabel_cn:   '邮箱',
    statusLabel_en:  'Status',   statusLabel_cn:  '状态',
    dateLabel_en:    'Date',     dateLabel_cn:    '时间',
  };
  
  // ─────────────────────────────────────────────
  // Default content labels
  // ─────────────────────────────────────────────
  export const defaultContentLabels = {
    listTitle:     (isCn) => isCn ? '咨询列表'  : 'ENQUIRY LIST',
    detailsLabel:  (isCn) => isCn ? '咨询详情'  : 'ENQUIRY DETAILS',
    untitled:      (isCn) => isCn ? '无名氏'    : 'Unknown Sender',
    noDescription: (isCn) => isCn ? '暂无留言'  : 'No message provided',
    back:          (isCn) => isCn ? '返回'      : 'BACK',
  };
  
  // ─────────────────────────────────────────────
  // Field group labels
  // ─────────────────────────────────────────────
  export const fieldGroupLabels = {
    contact: {
      title: (isCn) => isCn ? '联系方式' : 'Contact Info',
    },
    message: {
      title: (isCn) => isCn ? '留言内容' : 'Message Details',
    },
    related: {
      title: (isCn) => isCn ? '相关信息' : 'Related Information',
    },
    system: {
      title: (isCn) => isCn ? '系统信息' : 'System Info',
    },
  };
  
  // ─────────────────────────────────────────────
  // Field labels for components — all Prisma Enquire fields
  // ─────────────────────────────────────────────
  export const fieldLabelsForComponents = {
    name:                   { en: 'Name',           cn: '姓名' },
    email:                  { en: 'Email',          cn: '邮箱' },
    phone:                  { en: 'Phone',          cn: '电话' },
    message:                { en: 'Message',        cn: '留言' },
    related_gallery_artist: { en: 'Related Artist', cn: '相关艺术家' },
    related_artwork_title:  { en: 'Related Artwork',cn: '相关作品' },
    createdAt:              { en: 'Created At',     cn: '创建时间' },
    status:                 { en: 'Status',         cn: '状态' },
  };
  
  // ─────────────────────────────────────────────
  // Delete dialog labels
  // ─────────────────────────────────────────────
  export const deleteDialogLabels = {
    delete_dialog_this_item_en: 'this enquiry',
    delete_dialog_this_item_cn: '该咨询',
    confirmDeleteEnquiry_en:    'Are you sure you want to delete this enquiry?',
    confirmDeleteEnquiry_cn:    '确定要删除该咨询吗？',
    thisEnquiry_en:             'this enquiry',
    thisEnquiry_cn:             '该咨询',
  };
  
  // ─────────────────────────────────────────────
  // Additional labels
  // ─────────────────────────────────────────────
  export const additionalLabels = {
    // Placeholder and description labels
    enterName_en:        'Enter name',        enterName_cn:        '输入姓名',
    enterEmail_en:       'Enter email',       enterEmail_cn:       '输入邮箱',
    enterPhone_en:       'Enter phone',       enterPhone_cn:       '输入电话',
    selectStatus_en:     'Select Status',     selectStatus_cn:     '选择状态',
  
    // Enum values for status
    status_pending_en:   'Pending',           status_pending_cn:   '待处理',
    status_responded_en: 'Responded',         status_responded_cn: '已回复',
    status_closed_en:    'Closed',            status_closed_cn:    '已关闭',
  
    // Entity / collection
    no_enquiries_en: 'No enquiries found',
    no_enquiries_cn: '未找到咨询',
  
    // Search and filter
    searchEnquiries_en: 'Search enquiries',
    searchEnquiries_cn: '搜索咨询',
  
    // Status and error
    noMatchingEnquiries_en:  'No matching enquiries found',
    noMatchingEnquiries_cn:  '没有找到符合条件的咨询',
  };
  
  // ─────────────────────────────────────────────
  // UI Text Configuration
  // ─────────────────────────────────────────────
  export const UI_TEXT = {
    loadingError:     { en: 'Connection Failed',              cn: '连接失败' },
    systemError:      { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
    tryAgain:         { en: 'Try Again',                      cn: '重试' },
    enquiryManagement:{ en: 'Enquiry Management',             cn: '咨询管理' },
    noData:           { en: 'No enquiries available',         cn: '暂无咨询数据' },
    noMatchingEnquiries:{ en: 'No matching enquiries found',  cn: '未找到匹配的咨询' },
    all:              { en: 'All',                            cn: '全部' },
    totalCount:       { en: 'Total',                          cn: '总计' },
    exportSuccess:    { en: 'Export successful',              cn: '导出成功' },
    exportError:      { en: 'Export failed',                  cn: '导出失败' },
    exportInProgress: { en: 'Exporting...',                   cn: '导出中...' },
  };
  
  // ─────────────────────────────────────────────
  // Combined labels object
  // ─────────────────────────────────────────────
  export const enquireLabels = {
    ...fieldLabels,
    ...actionLabels,
    ...statusLabels,
    ...entityLabels,
    ...filterLabels,
    ...sortLabels,
    ...pageLabels,
    ...deleteDialogLabels,
    ...additionalLabels,
    uiText:         uiTextLabels,
    display:        displayLabels,
    controlPanel:   controlPanelLabels,
    defaultContent: defaultContentLabels,
    UI_TEXT,
    PAGE_TEXT,
  };
  
  // ─────────────────────────────────────────────
  // Helper: get field label
  // ─────────────────────────────────────────────
  export const getEnquireLabel = (key, language = 'en') => {
    if (!key) return '';
  
    // Try direct fieldLabels first (bilingual objects)
    if (fieldLabels[key]) {
      if (typeof fieldLabels[key] === 'object') {
        return fieldLabels[key][language] || fieldLabels[key]['en'] || key;
      }
      return fieldLabels[key];
    }
  
    // Try fieldLabelsForComponents
    if (fieldLabelsForComponents[key]) {
      return fieldLabelsForComponents[key][language]
        || fieldLabelsForComponents[key]['en']
        || key;
    }
  
    // Try flat key with language suffix
    const labelKey = `${key}_${language}`;
    if (enquireLabels[labelKey]) return enquireLabels[labelKey];
  
    // Fallback: English when CN not found
    if (language === 'cn') {
      const englishKey = `${key}_en`;
      if (enquireLabels[englishKey]) return enquireLabels[englishKey];
    }
  
    return key;
  };
  
  // ─────────────────────────────────────────────
  // Helper: get UI text
  // ─────────────────────────────────────────────
  export const getEnquireUIText = (key, language = 'en') => {
    if (!key) return '';
  
    if (uiTextLabels[key]) {
      return uiTextLabels[key][language] || uiTextLabels[key]['en'] || key;
    }
  
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (uiTextLabels[parent]?.[child]) {
        return uiTextLabels[parent][child][language]
          || uiTextLabels[parent][child]['en']
          || key;
      }
    }
  
    return key;
  };
  
  export default enquireLabels;