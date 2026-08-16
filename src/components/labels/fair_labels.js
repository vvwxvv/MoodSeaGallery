// ─────────────────────────────────────────────
// fair_labels.js
// Matches Prisma Fair model fields exactly
// ─────────────────────────────────────────────

// Core field labels (bilingual objects)
export const fieldLabels = {
    cover_img_url:            { en: 'Cover Image',            cn: '封面图片' },
    title:                    { en: 'Title',                  cn: '标题' },
    section:                  { en: 'Section',                cn: '板块' },
    type:                     { en: 'Type',                   cn: '类型' },
    date_start:               { en: 'Start Date',             cn: '开始日期' },
    date_end:                 { en: 'End Date',               cn: '结束日期' },
    vip_preview_date:         { en: 'VIP Preview Date',       cn: 'VIP预览日期' },
    year:                     { en: 'Year',                   cn: '年份' },
    booth:                    { en: 'Booth',                  cn: '展位' },
    venue:                    { en: 'Venue',                  cn: '场馆' },
    location:                 { en: 'Location',               cn: '地点' },
    organiser:                { en: 'Organiser',              cn: '主办方' },
    curator:                  { en: 'Curator',                cn: '策展人' },
    participating_artists:    { en: 'Participating Artists',  cn: '参展艺术家' },
    caption:                  { en: 'Caption',                cn: '说明' },
    press_release:            { en: 'Press Release',          cn: '新闻稿' },
    related_artwork_title:    { en: 'Related Artwork Titles', cn: '相关作品标题' },
    related_gallery_artist:   { en: 'Related Gallery Artists',cn: '相关画廊艺术家' },
    web_url:                  { en: 'Web URL',                cn: '网页链接' },
    video_url:                { en: 'Video URL',              cn: '视频链接' },
    language:                 { en: 'Language',               cn: '语言' },
    order:                    { en: 'Order',                  cn: '排序' },
    mark:                     { en: 'Mark',                   cn: '标记' },
    status:                   { en: 'Status',                 cn: '状态' },
    updatedAt:                { en: 'Last Updated',           cn: '最后更新' },
  };
  
  // ─────────────────────────────────────────────
  // Page text labels
  // ─────────────────────────────────────────────
  export const PAGE_TEXT = {
    pageTitle: {
      EN: 'Fair Management',
      CN: '博览会管理',
    },
  
    itemName: {
      EN: 'Fair',
      CN: '博览会',
    },
  
    createTooltip: {
      EN: 'Create New Fair',
      CN: '创建新博览会',
    },
  
    filters: {
      title:                { EN: 'Title',               CN: '标题' },
      section:              { EN: 'Section',             CN: '板块' },
      type:                 { EN: 'Type',                CN: '类型' },
      year:                 { EN: 'Year',                CN: '年份' },
      venue:                { EN: 'Venue',               CN: '场馆' },
      location:             { EN: 'Location',            CN: '地点' },
      organiser:            { EN: 'Organiser',           CN: '主办方' },
      curator:              { EN: 'Curator',             CN: '策展人' },
      participating_artists:{ EN: 'Participating Artists',CN: '参展艺术家' },
      language:             { EN: 'Language',            CN: '语言' },
      mark:                 { EN: 'Mark',                CN: '标记' },
      status:               { EN: 'Status',              CN: '状态' },
      order:                { EN: 'Order',               CN: '排序' },
    },
  
    controlPanel: {
      sortByTitle:          { EN: 'Sort by Title',        CN: '按标题排序' },
      sortByTitleTooltip:   { EN: 'Sort fairs by title',  CN: '按标题排序博览会' },
      sortByYear:           { EN: 'Sort by Year',         CN: '按年份排序' },
      sortByYearTooltip:    { EN: 'Sort fairs by year',   CN: '按年份排序博览会' },
      sortByOrder:          { EN: 'Sort by Order',        CN: '按顺序排序' },
      sortByOrderTooltip:   { EN: 'Sort fairs by order',  CN: '按顺序排序博览会' },
      sortByUpdate:         { EN: 'Sort by Update',       CN: '按更新排序' },
      sortByUpdateTooltip:  { EN: 'Sort by update date',  CN: '按更新日期排序博览会' },
      exportData:           { EN: 'Export Data',          CN: '导出数据' },
      exportDataTooltip:    { EN: 'Export fair data',     CN: '导出博览会数据' },
    },
  
    fields: {
      cover_img_url:            { EN: 'Cover Image',            CN: '封面图片' },
      title:                    { EN: 'Title',                  CN: '标题' },
      section:                  { EN: 'Section',                CN: '板块' },
      type:                     { EN: 'Type',                   CN: '类型' },
      date_start:               { EN: 'Start Date',             CN: '开始日期' },
      date_end:                 { EN: 'End Date',               CN: '结束日期' },
      vip_preview_date:         { EN: 'VIP Preview Date',       CN: 'VIP预览日期' },
      year:                     { EN: 'Year',                   CN: '年份' },
      booth:                    { EN: 'Booth',                  CN: '展位' },
      venue:                    { EN: 'Venue',                  CN: '场馆' },
      location:                 { EN: 'Location',               CN: '地点' },
      organiser:                { EN: 'Organiser',              CN: '主办方' },
      curator:                  { EN: 'Curator',                CN: '策展人' },
      participating_artists:    { EN: 'Participating Artists',  CN: '参展艺术家' },
      caption:                  { EN: 'Caption',                CN: '说明' },
      press_release:            { EN: 'Press Release',          CN: '新闻稿' },
      related_artwork_title:    { EN: 'Related Artwork Titles', CN: '相关作品标题' },
      related_gallery_artist:   { EN: 'Related Gallery Artists',CN: '相关画廊艺术家' },
      web_url:                  { EN: 'Web URL',                CN: '网页链接' },
      video_url:                { EN: 'Video URL',              CN: '视频链接' },
      language:                 { EN: 'Language',               CN: '语言' },
      order:                    { EN: 'Order',                  CN: '排序' },
      mark:                     { EN: 'Mark',                   CN: '标记' },
      status:                   { EN: 'Status',                 CN: '状态' },
      updatedAt:                { EN: 'Updated At',             CN: '更新时间' },
    },
  
    emptyState: {
      noData:           { EN: 'No fairs found',          CN: '暂无博览会' },
      noMatchingFairs:  { EN: 'No matching fairs',       CN: '没有匹配的博览会' },
    },
  
    deleteDialog: {
      title:    { EN: 'Confirm Delete',  CN: '确认删除' },
      confirm:  { EN: 'Delete',          CN: '删除' },
      cancel:   { EN: 'Cancel',          CN: '取消' },
    },
  
    errors: {
      loadingError: { EN: 'Error loading data',      CN: '加载数据错误' },
      systemError:  { EN: 'System error occurred',   CN: '系统错误' },
      tryAgain:     { EN: 'Try Again',               CN: '重试' },
      deleteError:  { EN: 'Delete failed',           CN: '删除失败' },
      pleaseRetry:  { EN: 'Please try again',        CN: '请重试' },
      ok:           { EN: 'OK',                      CN: '确定' },
    },
  
    export: {
      success:  { EN: 'Export successful',  CN: '导出成功' },
      error:    { EN: 'Export failed',      CN: '导出失败' },
      fairs:    { EN: 'fairs',              CN: '个博览会' },
    },
  };
  
  // ─────────────────────────────────────────────
  // Action labels
  // ─────────────────────────────────────────────
  export const actionLabels = {
    create_en: 'Create Fair',
    create_cn: '创建博览会',
    edit_en:   'Edit Fair',
    edit_cn:   '编辑博览会',
    delete_en: 'Delete Fair',
    delete_cn: '删除博览会',
    export_en: 'Export Fairs',
    export_cn: '导出博览会',
    import_en: 'Import Fairs',
    import_cn: '导入博览会',
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
    fair_en:        'Fair',
    fair_cn:        '博览会',
    fairs_en:       'Fairs',
    fairs_cn:       '博览会',
    untitledFair_en:'Untitled Fair',
    untitledFair_cn:'未命名博览会',
  };
  
  // ─────────────────────────────────────────────
  // Filter labels
  // ─────────────────────────────────────────────
  export const filterLabels = {
    all_titles_en:   'All Titles',    all_titles_cn:   '全部标题',
    all_sections_en: 'All Sections',  all_sections_cn: '全部板块',
    all_types_en:    'All Types',     all_types_cn:    '全部类型',
    all_years_en:    'All Years',     all_years_cn:    '全部年份',
    all_venues_en:   'All Venues',    all_venues_cn:   '全部场馆',
    all_locations_en:'All Locations', all_locations_cn:'全部地点',
    all_organisers_en:'All Organisers',all_organisers_cn:'全部主办方',
    all_curators_en: 'All Curators',  all_curators_cn: '全部策展人',
    all_marks_en:    'All Marks',     all_marks_cn:    '全部标记',
    all_languages_en:'All Languages', all_languages_cn:'全部语言',
    all_statuses_en: 'All Statuses',  all_statuses_cn: '全部状态',
  };
  
  // ─────────────────────────────────────────────
  // Sort labels
  // ─────────────────────────────────────────────
  export const sortLabels = {
    sort_by_title_en:  'Sort by Title',  sort_by_title_cn:  '按标题排序',
    sort_by_year_en:   'Sort by Year',   sort_by_year_cn:   '按年份排序',
    sort_by_type_en:   'Sort by Type',   sort_by_type_cn:   '按类型排序',
    sort_by_venue_en:  'Sort by Venue',  sort_by_venue_cn:  '按场馆排序',
    sort_by_order_en:  'Sort by Order',  sort_by_order_cn:  '按顺序排序',
    sort_by_update_en: 'Sort by Update', sort_by_update_cn: '按更新排序',
    sort_by_date_start_en: 'Sort by Start Date', sort_by_date_start_cn: '按开始日期排序',
  };
  
  // ─────────────────────────────────────────────
  // Page labels
  // ─────────────────────────────────────────────
  export const pageLabels = {
    title_en:      'Fair Management',
    title_cn:      '博览会管理',
    description_en:'Manage and organize fair content',
    description_cn:'管理和组织博览会内容',
  };
  
  // ─────────────────────────────────────────────
  // UI Text labels
  // ─────────────────────────────────────────────
  export const uiTextLabels = {
    pageTitle:          { en: 'Fair Index',           cn: '博览会索引' },
    title:              { en: 'Title',                cn: '标题' },
    section:            { en: 'Section',              cn: '板块' },
    type:               { en: 'Type',                 cn: '类型' },
    date_start:         { en: 'Start Date',           cn: '开始日期' },
    date_end:           { en: 'End Date',             cn: '结束日期' },
    vip_preview_date:   { en: 'VIP Preview Date',     cn: 'VIP预览日期' },
    year:               { en: 'Year',                 cn: '年份' },
    booth:              { en: 'Booth',                cn: '展位' },
    venue:              { en: 'Venue',                cn: '场馆' },
    location:           { en: 'Location',             cn: '地点' },
    organiser:          { en: 'Organiser',            cn: '主办方' },
    curator:            { en: 'Curator',              cn: '策展人' },
    participating_artists: { en: 'Participating Artists', cn: '参展艺术家' },
    caption:            { en: 'Caption',              cn: '说明' },
    press_release:      { en: 'Press Release',        cn: '新闻稿' },
    related_artwork_title: { en: 'Related Artwork Titles', cn: '相关作品标题' },
    related_gallery_artist:{ en: 'Related Gallery Artists',cn: '相关画廊艺术家' },
    web_url:            { en: 'Web URL',              cn: '网页链接' },
    video_url:          { en: 'Video URL',            cn: '视频链接' },
    language:           { en: 'Language',             cn: '语言' },
    order:              { en: 'Order',                cn: '排序' },
    mark:               { en: 'Mark',                 cn: '标记' },
    status:             { en: 'Status',               cn: '状态' },
    all:                { en: 'All',                  cn: '全部' },
    other:              { en: 'Other',                cn: '其他' },
    noItemsFound: {
      en: 'No items found matching the criteria',
      cn: '没有找到符合条件的项目',
    },
    noFairsFound: {
      en: 'No fairs found matching the criteria',
      cn: '没有找到符合条件的博览会',
    },
    loadingError: { en: 'Connection Failed',              cn: '连接失败' },
    systemError:  { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
    tryAgain:     { en: 'Try Again',                      cn: '重试' },
    fields: {
      title:                    { en: 'Title',                  cn: '标题' },
      section:                  { en: 'Section',                cn: '板块' },
      type:                     { en: 'Type',                   cn: '类型' },
      date_start:               { en: 'Start Date',             cn: '开始日期' },
      date_end:                 { en: 'End Date',               cn: '结束日期' },
      vip_preview_date:         { en: 'VIP Preview Date',       cn: 'VIP预览日期' },
      year:                     { en: 'Year',                   cn: '年份' },
      booth:                    { en: 'Booth',                  cn: '展位' },
      venue:                    { en: 'Venue',                  cn: '场馆' },
      location:                 { en: 'Location',               cn: '地点' },
      organiser:                { en: 'Organiser',              cn: '主办方' },
      curator:                  { en: 'Curator',                cn: '策展人' },
      participating_artists:    { en: 'Participating Artists',  cn: '参展艺术家' },
      caption:                  { en: 'Caption',                cn: '说明' },
      press_release:            { en: 'Press Release',          cn: '新闻稿' },
      related_artwork_title:    { en: 'Related Artwork Titles', cn: '相关作品标题' },
      related_gallery_artist:   { en: 'Related Gallery Artists',cn: '相关画廊艺术家' },
      web_url:                  { en: 'Web URL',                cn: '网页链接' },
      video_url:                { en: 'Video URL',              cn: '视频链接' },
      language:                 { en: 'Language',               cn: '语言' },
      order:                    { en: 'Order',                  cn: '排序' },
      mark:                     { en: 'Mark',                   cn: '标记' },
      status:                   { en: 'Status',                 cn: '状态' },
    },
  };
  
  // ─────────────────────────────────────────────
  // Display labels
  // ─────────────────────────────────────────────
  export const displayLabels = {
    detailButtonText: (isCn) => isCn ? '查看详情'    : 'See Details',
    emptyMessage:     (isCn) => isCn ? '没有可显示的博览会' : 'No fairs to display',
    noMatchMessage:   (isCn) => isCn ? '未找到匹配的博览会' : 'No matching fairs found',
    loadingMessage:   (isCn) => isCn ? '加载中...'   : 'Loading...',
    errorMessage:     (isCn) => isCn ? '加载失败'    : 'Failed to load',
  };
  
  // ─────────────────────────────────────────────
  // Control panel labels
  // ─────────────────────────────────────────────
  export const controlPanelLabels = {
    title:                (isCn) => isCn ? '标题'        : 'Title',
    section:              (isCn) => isCn ? '板块'        : 'Section',
    type:                 (isCn) => isCn ? '类型'        : 'Type',
    year:                 (isCn) => isCn ? '年份'        : 'Year',
    venue:                (isCn) => isCn ? '场馆'        : 'Venue',
    location:             (isCn) => isCn ? '地点'        : 'Location',
    organiser:            (isCn) => isCn ? '主办方'      : 'Organiser',
    curator:              (isCn) => isCn ? '策展人'      : 'Curator',
    participating_artists:(isCn) => isCn ? '参展艺术家'  : 'Participating Artists',
    status:               (isCn) => isCn ? '状态'        : 'Status',
    language:             (isCn) => isCn ? '语言'        : 'Language',
    mark:                 (isCn) => isCn ? '标记'        : 'Mark',
    order:                (isCn) => isCn ? '排序'        : 'Order',
  
    sortByTitle:          (isCn) => isCn ? '按标题排序' : 'Sort by Title',
    sortByTitleTooltip:   (isCn) => isCn ? '按标题排序博览会' : 'Sort fairs by title',
    sortByYear:           (isCn) => isCn ? '按年份排序' : 'Sort by Year',
    sortByYearTooltip:    (isCn) => isCn ? '按年份排序博览会' : 'Sort fairs by year',
    sortByOrder:          (isCn) => isCn ? '按顺序排序' : 'Sort by Order',
    sortByOrderTooltip:   (isCn) => isCn ? '按顺序排序博览会' : 'Sort fairs by order',
    sortByUpdate:         (isCn) => isCn ? '按更新排序' : 'Sort by Update',
    sortByUpdateTooltip:  (isCn) => isCn ? '按更新日期排序' : 'Sort by update date',
  
    // Backwards compatibility flat strings
    titleLabel_en:   'Title',    titleLabel_cn:   '标题',
    sectionLabel_en: 'Section',  sectionLabel_cn: '板块',
    typeLabel_en:    'Type',     typeLabel_cn:    '类型',
    yearLabel_en:    'Year',     yearLabel_cn:    '年份',
    venueLabel_en:   'Venue',    venueLabel_cn:   '场馆',
    locationLabel_en:'Location', locationLabel_cn:'地点',
    organiserLabel_en:'Organiser', organiserLabel_cn:'主办方',
    curatorLabel_en: 'Curator',  curatorLabel_cn: '策展人',
    statusLabel_en:  'Status',   statusLabel_cn:  '状态',
    languageLabel_en:'Language', languageLabel_cn:'语言',
    markLabel_en:    'Mark',     markLabel_cn:    '标记',
    orderLabel_en:   'Order',    orderLabel_cn:   '排序',
  };
  
  // ─────────────────────────────────────────────
  // Default content labels
  // ─────────────────────────────────────────────
  export const defaultContentLabels = {
    listTitle:     (isCn) => isCn ? '博览会列表'  : 'FAIR LIST',
    detailsLabel:  (isCn) => isCn ? '博览会详情'  : 'FAIR DETAILS',
    untitled:      (isCn) => isCn ? '未命名博览会': 'Untitled Fair',
    noDescription: (isCn) => isCn ? '暂无描述'    : 'No description available',
    back:          (isCn) => isCn ? '返回'        : 'BACK',
  };
  
  // ─────────────────────────────────────────────
  // Field group labels
  // ─────────────────────────────────────────────
  export const fieldGroupLabels = {
    basic: {
      title: (isCn) => isCn ? '基本信息' : 'Basic Info',
    },
    additional: {
      title: (isCn) => isCn ? '附加信息' : 'Additional Info',
    },
    images: {
      title: (isCn) => isCn ? '图片' : 'Images',
    },
    media: {
      title: (isCn) => isCn ? '媒体' : 'Media',
    },
    content: {
      title: (isCn) => isCn ? '内容' : 'Content',
    },
    dates: {
      title: (isCn) => isCn ? '日期' : 'Dates',
    },
    participants: {
      title: (isCn) => isCn ? '参与者' : 'Participants',
    },
  };
  
  // ─────────────────────────────────────────────
  // Field labels for components — all Prisma Fair fields
  // ─────────────────────────────────────────────
  export const fieldLabelsForComponents = {
    cover_img_url:            { en: 'Cover Image',            cn: '封面图片' },
    title:                    { en: 'Title',                  cn: '标题' },
    section:                  { en: 'Section',                cn: '板块' },
    type:                     { en: 'Type',                   cn: '类型' },
    date_start:               { en: 'Start Date',             cn: '开始日期' },
    date_end:                 { en: 'End Date',               cn: '结束日期' },
    vip_preview_date:         { en: 'VIP Preview Date',       cn: 'VIP预览日期' },
    year:                     { en: 'Year',                   cn: '年份' },
    booth:                    { en: 'Booth',                  cn: '展位' },
    venue:                    { en: 'Venue',                  cn: '场馆' },
    location:                 { en: 'Location',               cn: '地点' },
    organiser:                { en: 'Organiser',              cn: '主办方' },
    curator:                  { en: 'Curator',                cn: '策展人' },
    participating_artists:    { en: 'Participating Artists',  cn: '参展艺术家' },
    caption:                  { en: 'Caption',                cn: '说明' },
    press_release:            { en: 'Press Release',          cn: '新闻稿' },
    related_artwork_title:    { en: 'Related Artwork Titles', cn: '相关作品标题' },
    related_gallery_artist:   { en: 'Related Gallery Artists',cn: '相关画廊艺术家' },
    web_url:                  { en: 'Web URL',                cn: '网页链接' },
    video_url:                { en: 'Video URL',              cn: '视频链接' },
    language:                 { en: 'Language',               cn: '语言' },
    order:                    { en: 'Order',                  cn: '排序' },
    mark:                     { en: 'Mark',                   cn: '标记' },
    status:                   { en: 'Status',                 cn: '状态' },
  };
  
  // ─────────────────────────────────────────────
  // Delete dialog labels
  // ─────────────────────────────────────────────
  export const deleteDialogLabels = {
    delete_dialog_this_item_en: 'this fair',
    delete_dialog_this_item_cn: '该博览会',
    confirmDeleteFair_en:       'Are you sure you want to delete this fair?',
    confirmDeleteFair_cn:       '确定要删除该博览会吗？',
    thisFair_en:                'this fair',
    thisFair_cn:                '该博览会',
  };
  
  // ─────────────────────────────────────────────
  // Additional labels
  // ─────────────────────────────────────────────
  export const additionalLabels = {
    // Placeholder and description labels
    selectTitle_en:      'Select Title',        selectTitle_cn:      '选择标题',
    enterTitle_en:       'Enter fair title',    enterTitle_cn:       '输入博览会标题',
    selectSection_en:    'Select Section',      selectSection_cn:    '选择板块',
    selectType_en:       'Select Type',         selectType_cn:       '选择类型',
    selectVenue_en:      'Select Venue',        selectVenue_cn:      '选择场馆',
    selectLocation_en:   'Select Location',     selectLocation_cn:   '选择地点',
    selectOrganiser_en:  'Select Organiser',    selectOrganiser_cn:  '选择主办方',
    selectCurator_en:    'Select Curator',      selectCurator_cn:    '选择策展人',
    selectStatus_en:     'Select Status',       selectStatus_cn:     '选择状态',
    selectLanguage_en:   'Select Language',     selectLanguage_cn:   '选择语言',
    selectOrder_en:      'Select Order',        selectOrder_cn:      '选择排序',
  
    // Press release array
    press_release_en:            'Press Release',
    press_release_cn:            '新闻稿',
    pressReleaseDescription_en:  'Add press release paragraphs.',
    pressReleaseDescription_cn:  '添加新闻稿段落。',
    addPressReleaseButton_en:    'Add Paragraph',
    addPressReleaseButton_cn:    '添加段落',
    removePressReleaseButton_en: 'Remove',
    removePressReleaseButton_cn: '移除',
  
    // Entity / collection
    no_fairs_en: 'No fairs found',
    no_fairs_cn: '未找到博览会',
  
    // Search and filter
    searchFairs_en: 'Search fairs',
    searchFairs_cn: '搜索博览会',
  
    // Status and error
    noFeaturedFairs_en:  'No featured fairs available',
    noFeaturedFairs_cn:  '暂无精选博览会',
  
    // Dates
    date_start_en: 'Start Date',   date_start_cn: '开始日期',
    date_end_en:   'End Date',     date_end_cn:   '结束日期',
    vip_preview_en:'VIP Preview',  vip_preview_cn:'VIP预览',
    noDateSet_en:  'No date set',  noDateSet_cn:  '未设置日期',
  
    // Order
    order_en: 'Order',
    order_cn: '排序',
  };
  
  // ─────────────────────────────────────────────
  // UI Text Configuration
  // ─────────────────────────────────────────────
  export const UI_TEXT = {
    loadingError:     { en: 'Connection Failed',              cn: '连接失败' },
    systemError:      { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
    tryAgain:         { en: 'Try Again',                      cn: '重试' },
    fairManagement:   { en: 'Fair Management',                cn: '博览会管理' },
    noData:           { en: 'No fairs available',             cn: '暂无博览会数据' },
    noMatchingFairs:  { en: 'No matching fairs found',        cn: '未找到匹配的博览会' },
    all:              { en: 'All',                            cn: '全部' },
    totalCount:       { en: 'Total',                          cn: '总计' },
    exportSuccess:    { en: 'Export successful',              cn: '导出成功' },
    exportError:      { en: 'Export failed',                  cn: '导出失败' },
    exportInProgress: { en: 'Exporting...',                   cn: '导出中...' },
  };
  
  // ─────────────────────────────────────────────
  // Combined labels object
  // ─────────────────────────────────────────────
  export const fairLabels = {
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
  export const getFairLabel = (key, language = 'en') => {
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
    if (fairLabels[labelKey]) return fairLabels[labelKey];
  
    // Fallback: English when CN not found
    if (language === 'cn') {
      const englishKey = `${key}_en`;
      if (fairLabels[englishKey]) return fairLabels[englishKey];
    }
  
    return key;
  };
  
  // ─────────────────────────────────────────────
  // Helper: get UI text
  // ─────────────────────────────────────────────
  export const getFairUIText = (key, language = 'en') => {
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
  
  export default fairLabels;