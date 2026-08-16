// ─────────────────────────────────────────────
// artwork_labels.js
// Matches Prisma Artwork model fields exactly
// ─────────────────────────────────────────────

// Core field labels (bilingual objects)
export const fieldLabels = {
  cover_img_url:  { en: 'Cover Image',    cn: '封面图片' },
  related_gallery_exhibition: { en: 'Related Gallery Exhibition', cn: '相关画廊展览' }, // 新增
  artist:         { en: 'Artist',         cn: '艺术家' },
  title:          { en: 'Title',          cn: '标题' },
  type:           { en: 'Type',           cn: '类型' },
  medium:         { en: 'Medium',         cn: '媒介' },
  year:           { en: 'Year',           cn: '年份' },
  size:           { en: 'Size',           cn: '尺寸' },
  series:         { en: 'Series',         cn: '系列' },
  caption:        { en: 'Caption',        cn: '说明' },
  duration:       { en: 'Duration',       cn: '时长' },
  credits:        { en: 'Credits',        cn: '致谢' },
  special_thanks: { en: 'Special Thanks', cn: '特别鸣谢' },
  introduction:   { en: 'Introduction',   cn: '介绍' },
  video_url:      { en: 'Video URL',      cn: '视频链接' },
  web_url:        { en: 'Web URL',        cn: '网页链接' },
  work_value:     { en: 'Work Value',     cn: '作品价值' },
  sold:           { en: 'Sold',           cn: '已售' },
  order:          { en: 'Order',          cn: '排序' },
  mark:           { en: 'Mark',           cn: '标记' },
  language:       { en: 'Language',       cn: '语言' },
  updatedAt:      { en: 'Last Updated',   cn: '最后更新' },
};

// ─────────────────────────────────────────────
// Page text labels
// ─────────────────────────────────────────────
export const PAGE_TEXT = {
  pageTitle: {
    EN: 'Artwork Management',
    CN: '作品管理',
  },

  itemName: {
    EN: 'Artwork',
    CN: '作品',
  },

  createTooltip: {
    EN: 'Create New Artwork',
    CN: '创建新作品',
  },

  filters: {
    title:    { EN: 'Title',          CN: '标题' },
    type:     { EN: 'Type',           CN: '类型' },
    medium:   { EN: 'Medium',         CN: '媒介' },
    year:     { EN: 'Year',           CN: '年份' },
    series:   { EN: 'Series',         CN: '系列' },
    artist:   { EN: 'Artist',         CN: '艺术家' },
    sold:     { EN: 'Sold',           CN: '已售' },
    language: { EN: 'Language',       CN: '语言' },
    mark:     { EN: 'Mark',           CN: '标记' },
    order:    { EN: 'Order',          CN: '排序' },
  },

  controlPanel: {
    sortByTitle:        { EN: 'Sort by Title',   CN: '按标题排序' },
    sortByTitleTooltip: { EN: 'Sort artworks by title', CN: '按标题排序作品' },
    sortByYear:         { EN: 'Sort by Year',    CN: '按年份排序' },
    sortByYearTooltip:  { EN: 'Sort artworks by year',  CN: '按年份排序作品' },
    sortByOrder:        { EN: 'Sort by Order',   CN: '按顺序排序' },
    sortByOrderTooltip: { EN: 'Sort artworks by order', CN: '按顺序排序作品' },
    sortByUpdate:       { EN: 'Sort by Update',  CN: '按更新排序' },
    sortByUpdateTooltip:{ EN: 'Sort by update date',    CN: '按更新日期排序作品' },
    exportData:         { EN: 'Export Data',     CN: '导出数据' },
    exportDataTooltip:  { EN: 'Export artwork data',    CN: '导出作品数据' },
  },

  fields: {
    cover_img_url:  { EN: 'Cover Image',    CN: '封面图片' },
    related_gallery_exhibition: { EN: 'Related Gallery Exhibition', CN: '相关画廊展览' }, // 新增
    artist:         { EN: 'Artist',         CN: '艺术家' },
    title:          { EN: 'Title',          CN: '标题' },
    type:           { EN: 'Type',           CN: '类型' },
    medium:         { EN: 'Medium',         CN: '媒介' },
    year:           { EN: 'Year',           CN: '年份' },
    size:           { EN: 'Size',           CN: '尺寸' },
    series:         { EN: 'Series',         CN: '系列' },
    caption:        { EN: 'Caption',        CN: '说明' },
    duration:       { EN: 'Duration',       CN: '时长' },
    credits:        { EN: 'Credits',        CN: '致谢' },
    special_thanks: { EN: 'Special Thanks', CN: '特别鸣谢' },
    introduction:   { EN: 'Introduction',   CN: '介绍' },
    video_url:      { EN: 'Video URL',      CN: '视频链接' },
    web_url:        { EN: 'Web URL',        CN: '网页链接' },
    work_value:     { EN: 'Work Value',     CN: '作品价值' },
    sold:           { EN: 'Sold',           CN: '已售' },
    order:          { EN: 'Order',          CN: '排序' },
    mark:           { EN: 'Mark',           CN: '标记' },
    language:       { EN: 'Language',       CN: '语言' },
    updatedAt:      { EN: 'Updated At',     CN: '更新时间' },
  },

  emptyState: {
    noData:            { EN: 'No artworks found',    CN: '暂无作品' },
    noMatchingArtworks:{ EN: 'No matching artworks', CN: '没有匹配的作品' },
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
    success:  { EN: 'Export successful', CN: '导出成功' },
    error:    { EN: 'Export failed',     CN: '导出失败' },
    artworks: { EN: 'artworks',          CN: '件作品' },
  },
};

// ─────────────────────────────────────────────
// Action labels
// ─────────────────────────────────────────────
export const actionLabels = {
  create_en: 'Create Artwork',
  create_cn: '创建作品',
  edit_en:   'Edit Artwork',
  edit_cn:   '编辑作品',
  delete_en: 'Delete Artwork',
  delete_cn: '删除作品',
  export_en: 'Export Artworks',
  export_cn: '导出作品',
  import_en: 'Import Artworks',
  import_cn: '导入作品',
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
  artwork_en:        'Artwork',
  artwork_cn:        '作品',
  artworks_en:       'Artworks',
  artworks_cn:       '作品',
  untitledArtwork_en:'Untitled Artwork',
  untitledArtwork_cn:'无题作品',
};

// ─────────────────────────────────────────────
// Filter labels
// ─────────────────────────────────────────────
export const filterLabels = {
  all_titles_en:   'All Titles',   all_titles_cn:   '全部标题',
  all_types_en:    'All Types',    all_types_cn:    '全部类型',
  all_mediums_en:  'All Mediums',  all_mediums_cn:  '全部媒介',
  all_years_en:    'All Years',    all_years_cn:    '全部年份',
  all_series_en:   'All Series',   all_series_cn:   '全部系列',
  all_artists_en:  'All Artists',  all_artists_cn:  '全部艺术家',
  all_marks_en:    'All Marks',    all_marks_cn:    '全部标记',
  all_languages_en:'All Languages',all_languages_cn:'全部语言',
  all_sold_en:     'All',          all_sold_cn:     '全部',
};

// ─────────────────────────────────────────────
// Sort labels
// ─────────────────────────────────────────────
export const sortLabels = {
  sort_by_title_en:  'Sort by Title',  sort_by_title_cn:  '按标题排序',
  sort_by_year_en:   'Sort by Year',   sort_by_year_cn:   '按年份排序',
  sort_by_type_en:   'Sort by Type',   sort_by_type_cn:   '按类型排序',
  sort_by_medium_en: 'Sort by Medium', sort_by_medium_cn: '按媒介排序',
  sort_by_series_en: 'Sort by Series', sort_by_series_cn: '按系列排序',
  sort_by_order_en:  'Sort by Order',  sort_by_order_cn:  '按顺序排序',
  sort_by_update_en: 'Sort by Update', sort_by_update_cn: '按更新排序',
};

// ─────────────────────────────────────────────
// Page labels
// ─────────────────────────────────────────────
export const pageLabels = {
  title_en:      'Artwork Management',
  title_cn:      '作品管理',
  description_en:'Manage and organize artwork content',
  description_cn:'管理和组织作品内容',
};

// ─────────────────────────────────────────────
// UI Text labels
// ─────────────────────────────────────────────
export const uiTextLabels = {
  pageTitle:      { en: 'Artwork Index',   cn: '作品索引' },
  title:          { en: 'Title',           cn: '标题' },
  artist:         { en: 'Artist',          cn: '艺术家' },
  type:           { en: 'Type',            cn: '类型' },
  medium:         { en: 'Medium',          cn: '媒介' },
  year:           { en: 'Year',            cn: '年份' },
  size:           { en: 'Size',            cn: '尺寸' },
  series:         { en: 'Series',          cn: '系列' },
  caption:        { en: 'Caption',         cn: '说明' },
  duration:       { en: 'Duration',        cn: '时长' },
  credits:        { en: 'Credits',         cn: '致谢' },
  special_thanks: { en: 'Special Thanks',  cn: '特别鸣谢' },
  video_url:      { en: 'Video URL',       cn: '视频链接' },
  web_url:        { en: 'Web URL',         cn: '网页链接' },
  work_value:     { en: 'Work Value',      cn: '作品价值' },
  sold:           { en: 'Sold',            cn: '已售' },
  order:          { en: 'Order',           cn: '排序' },
  mark:           { en: 'Mark',            cn: '标记' },
  language:       { en: 'Language',        cn: '语言' },
  all:            { en: 'All',             cn: '全部' },
  other:          { en: 'Other',           cn: '其他' },
  noItemsFound: {
    en: 'No items found matching the criteria',
    cn: '没有找到符合条件的项目',
  },
  noArtworksFound: {
    en: 'No artworks found matching the criteria',
    cn: '没有找到符合条件的作品',
  },
  loadingError: { en: 'Connection Failed',              cn: '连接失败' },
  systemError:  { en: 'System temporarily unavailable', cn: '系统暂时不可用' },
  tryAgain:     { en: 'Try Again',                      cn: '重试' },
  fields: {
    title:          { en: 'Title',          cn: '标题' },
    related_gallery_exhibition: { en: 'Related Gallery Exhibition', cn: '相关画廊展览' }, // 新增
    artist:         { en: 'Artist',         cn: '艺术家' },
    type:           { en: 'Type',           cn: '类型' },
    medium:         { en: 'Medium',         cn: '媒介' },
    year:           { en: 'Year',           cn: '年份' },
    size:           { en: 'Size',           cn: '尺寸' },
    series:         { en: 'Series',         cn: '系列' },
    caption:        { en: 'Caption',        cn: '说明' },
    duration:       { en: 'Duration',       cn: '时长' },
    credits:        { en: 'Credits',        cn: '致谢' },
    special_thanks: { en: 'Special Thanks', cn: '特别鸣谢' },
    video_url:      { en: 'Video URL',      cn: '视频链接' },
    web_url:        { en: 'Web URL',        cn: '网页链接' },
    work_value:     { en: 'Work Value',     cn: '作品价值' },
    sold:           { en: 'Sold',           cn: '已售' },
    order:          { en: 'Order',          cn: '排序' },
  },
};

// ─────────────────────────────────────────────
// Display labels
// ─────────────────────────────────────────────
export const displayLabels = {
  detailButtonText: (isCn) => isCn ? '查看详情'    : 'See Details',
  emptyMessage:     (isCn) => isCn ? '没有可显示的作品' : 'No artworks to display',
  noMatchMessage:   (isCn) => isCn ? '未找到匹配的作品' : 'No matching artworks found',
  loadingMessage:   (isCn) => isCn ? '加载中...'   : 'Loading...',
  errorMessage:     (isCn) => isCn ? '加载失败'    : 'Failed to load',
};

// ─────────────────────────────────────────────
// Control panel labels
// ─────────────────────────────────────────────
export const controlPanelLabels = {
  title:          (isCn) => isCn ? '标题'   : 'Title',
  artist:         (isCn) => isCn ? '艺术家' : 'Artist',
  type:           (isCn) => isCn ? '类型'   : 'Type',
  medium:         (isCn) => isCn ? '媒介'   : 'Medium',
  year:           (isCn) => isCn ? '年份'   : 'Year',
  size:           (isCn) => isCn ? '尺寸'   : 'Size',
  series:         (isCn) => isCn ? '系列'   : 'Series',
  sold:           (isCn) => isCn ? '已售'   : 'Sold',
  order:          (isCn) => isCn ? '排序'   : 'Order',
  language:       (isCn) => isCn ? '语言'   : 'Language',
  mark:           (isCn) => isCn ? '标记'   : 'Mark',
  related_gallery_exhibition: (isCn) => isCn ? '相关画廊展览' : 'Related Gallery Exhibition', // 新增

  sortByTitle:         (isCn) => isCn ? '按标题排序' : 'Sort by Title',
  sortByTitleTooltip:  (isCn) => isCn ? '按标题排序作品' : 'Sort artworks by title',
  sortByYear:          (isCn) => isCn ? '按年份排序' : 'Sort by Year',
  sortByYearTooltip:   (isCn) => isCn ? '按年份排序作品' : 'Sort artworks by year',
  sortByOrder:         (isCn) => isCn ? '按顺序排序' : 'Sort by Order',
  sortByOrderTooltip:  (isCn) => isCn ? '按顺序排序作品' : 'Sort artworks by order',
  sortByUpdate:        (isCn) => isCn ? '按更新排序' : 'Sort by Update',
  sortByUpdateTooltip: (isCn) => isCn ? '按更新日期排序' : 'Sort by update date',

  // Backwards compatibility flat strings
  titleLabel_en:   'Title',    titleLabel_cn:   '标题',
  artistLabel_en:  'Artist',   artistLabel_cn:  '艺术家',
  typeLabel_en:    'Type',     typeLabel_cn:    '类型',
  mediumLabel_en:  'Medium',   mediumLabel_cn:  '媒介',
  yearLabel_en:    'Year',     yearLabel_cn:    '年份',
  seriesLabel_en:  'Series',   seriesLabel_cn:  '系列',
  soldLabel_en:    'Sold',     soldLabel_cn:    '已售',
  orderLabel_en:   'Order',    orderLabel_cn:   '排序',
  languageLabel_en:'Language', languageLabel_cn:'语言',
  markLabel_en:    'Mark',     markLabel_cn:    '标记',
};

// ─────────────────────────────────────────────
// Default content labels
// ─────────────────────────────────────────────
export const defaultContentLabels = {
  listTitle:     (isCn) => isCn ? '作品列表'  : 'ARTWORK LIST',
  detailsLabel:  (isCn) => isCn ? '作品详情'  : 'ARTWORK DETAILS',
  untitled:      (isCn) => isCn ? '无题作品'  : 'Untitled Artwork',
  noDescription: (isCn) => isCn ? '暂无描述'  : 'No description available',
  back:          (isCn) => isCn ? '返回'      : 'BACK',
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
  // Legacy aliases
  media: {
    title: (isCn) => isCn ? '媒体' : 'Media',
  },
  content: {
    title: (isCn) => isCn ? '内容' : 'Content',
  },
  commerce: {
    title: (isCn) => isCn ? '商业信息' : 'Commerce',
  },
};

// ─────────────────────────────────────────────
// Field labels for components — all Prisma Artwork fields
// ─────────────────────────────────────────────
export const fieldLabelsForComponents = {
  cover_img_url:  { en: 'Cover Image',    cn: '封面图片' },
  related_gallery_exhibition: { en: 'Related Gallery Exhibition', cn: '相关画廊展览' }, // 新增
  artist:         { en: 'Artist',         cn: '艺术家' },
  title:          { en: 'Title',          cn: '标题' },
  type:           { en: 'Type',           cn: '类型' },
  medium:         { en: 'Medium',         cn: '媒介' },
  year:           { en: 'Year',           cn: '年份' },
  size:           { en: 'Size',           cn: '尺寸' },
  series:         { en: 'Series',         cn: '系列' },
  caption:        { en: 'Caption',        cn: '说明' },
  duration:       { en: 'Duration',       cn: '时长' },
  credits:        { en: 'Credits',        cn: '致谢' },
  special_thanks: { en: 'Special Thanks', cn: '特别鸣谢' },
  introduction:   { en: 'Introduction',   cn: '介绍' },
  video_url:      { en: 'Video URL',      cn: '视频链接' },
  web_url:        { en: 'Web URL',        cn: '网页链接' },
  work_value:     { en: 'Work Value',     cn: '作品价值' },
  sold:           { en: 'Sold',           cn: '已售' },
  order:          { en: 'Order',          cn: '排序' },
  mark:           { en: 'Mark',           cn: '标记' },
  language:       { en: 'Language',       cn: '语言' },
};

// ─────────────────────────────────────────────
// Delete dialog labels
// ─────────────────────────────────────────────
export const deleteDialogLabels = {
  delete_dialog_this_item_en: 'this artwork',
  delete_dialog_this_item_cn: '该作品',
  confirmDeleteArtwork_en:    'Are you sure you want to delete this artwork?',
  confirmDeleteArtwork_cn:    '确定要删除该作品吗？',
  thisArtwork_en:             'this artwork',
  thisArtwork_cn:             '该作品',
};

// ─────────────────────────────────────────────
// Additional labels
// ─────────────────────────────────────────────
export const additionalLabels = {
  // Placeholder and description labels
  selectTitle_en:      'Select Title',      selectTitle_cn:      '选择标题',
  enterTitle_en:       'Enter artwork title',enterTitle_cn:       '输入作品标题',
  selectType_en:       'Select Type',       selectType_cn:       '选择类型',
  enterTypeName_en:    'Enter type name',   enterTypeName_cn:    '输入类型名称',
  selectMedium_en:     'Select Medium',     selectMedium_cn:     '选择媒介',
  selectSeries_en:     'Select Series',     selectSeries_cn:     '选择系列',
  selectArtist_en:     'Select Artist',     selectArtist_cn:     '选择艺术家',
  selectSold_en:       'Select Sold Status',selectSold_cn:       '选择销售状态',
  selectOrder_en:      'Select Order',      selectOrder_cn:      '选择排序',
  selectLanguage_en:   'Select Language',   selectLanguage_cn:   '选择语言',

  // Introduction labels
  introduction_en:            'Introduction',
  introduction_cn:            '介绍',
  introductionSummary_en:     'Introduction',
  introductionSummary_cn:     '介绍',
  introductionDescription_en: 'Add introduction paragraphs.',
  introductionDescription_cn: '添加介绍段落。',
  addIntroductionButton_en:   'Add Paragraph',
  addIntroductionButton_cn:   '添加段落',
  removeIntroductionButton_en:'Remove',
  removeIntroductionButton_cn:'移除',

  // Entity / collection
  no_artworks_en: 'No artworks found',
  no_artworks_cn: '未找到作品',

  // Search and filter
  searchArtworks_en: 'Search artworks',
  searchArtworks_cn: '搜索作品',

  // Status and error
  noFeaturedArtworks_en:  'No featured artworks available',
  noFeaturedArtworks_cn:  '暂无精选作品',
  noMatchingArtworks_en:  'No matching artworks found',
  noMatchingArtworks_cn:  '没有找到符合条件的作品',

  // Commerce
  work_value_en:     'Work Value',    work_value_cn:     '作品价值',
  sold_en:           'Sold',          sold_cn:           '已售',
  noWorkValue_en:    'No value set',  noWorkValue_cn:    '未设置价值',

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
  artworkManagement:{ en: 'Artwork Management',             cn: '作品管理' },
  noData:           { en: 'No artworks available',          cn: '暂无作品数据' },
  noMatchingArtworks:{ en: 'No matching artworks found',   cn: '未找到匹配的作品' },
  all:              { en: 'All',                            cn: '全部' },
  totalCount:       { en: 'Total',                          cn: '总计' },
  exportSuccess:    { en: 'Export successful',              cn: '导出成功' },
  exportError:      { en: 'Export failed',                  cn: '导出失败' },
  exportInProgress: { en: 'Exporting...',                   cn: '导出中...' },
};

// ─────────────────────────────────────────────
// Combined labels object
// ─────────────────────────────────────────────
export const artworkLabels = {
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
export const getArtworkLabel = (key, language = 'en') => {
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
  if (artworkLabels[labelKey]) return artworkLabels[labelKey];

  // Fallback: English when CN not found
  if (language === 'cn') {
    const englishKey = `${key}_en`;
    if (artworkLabels[englishKey]) return artworkLabels[englishKey];
  }

  return key;
};

// ─────────────────────────────────────────────
// Helper: get UI text
// ─────────────────────────────────────────────
export const getArtworkUIText = (key, language = 'en') => {
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

export default artworkLabels;