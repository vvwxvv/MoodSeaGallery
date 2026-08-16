// exhibitionConfig.js — matches updated Prisma Exhibition model
import { ANIMATION_VARIANTS } from './general_config';

// ============================================================
// LABELS CONFIGURATION
// ============================================================
export const exhibitionLabels = {
  page: {
    title: { en: 'Exhibitions', cn: '展览' },
    subtitle: { en: 'Exhibition Management', cn: '展览管理' },
    description: { en: 'Manage exhibition collection', cn: '管理展览集' },
  },

  fields: {
    cover_img_url:          { en: 'Cover Image', cn: '封面图片' },
    title:                  { en: 'Title', cn: '标题' },
    subtitle:               { en: 'Subtitle', cn: '副标题' },
    type:                   { en: 'Type', cn: '类型' },
    date_start:             { en: 'Start Date', cn: '开始日期' },
    date_end:               { en: 'End Date', cn: '结束日期' },
    opening_date:           { en: 'Opening Date', cn: '开幕日期' },
    year:                   { en: 'Year', cn: '年份' },
    venue:                  { en: 'Venue', cn: '场馆' },
    location:               { en: 'Location', cn: '地点' },
    curator:                { en: 'Curator', cn: '策展人' },
    organiser:              { en: 'Organiser', cn: '主办方' },
    participating_artists:  { en: 'Participating Artists', cn: '参展艺术家' },
    caption:                { en: 'Caption', cn: '说明' },
    description:            { en: 'Description', cn: '描述' },
    introduction:           { en: 'Introduction', cn: '介绍' },
    press_release:          { en: 'Press Release', cn: '新闻稿' },
    related_artwork_title:  { en: 'Related Artwork Titles', cn: '相关作品标题' },
    related_gallery_artist: { en: 'Related Gallery Artists', cn: '相关画廊艺术家' },
    video_url:              { en: 'Video URL', cn: '视频链接' },
    web_url:                { en: 'Web URL', cn: '网页链接' },
    order:                  { en: 'Order', cn: '排序' },
    mark:                   { en: 'Mark', cn: '标记' },
    language:               { en: 'Language', cn: '语言' },
    status:                 { en: 'Status', cn: '状态' },
  },

  UI_TEXT: {
    exhibitionManagement: { en: 'Exhibition Management', cn: '展览管理' },
    create:   { en: 'Create New', cn: '创建新展览' },
    edit:     { en: 'Edit', cn: '编辑' },
    delete:   { en: 'Delete', cn: '删除' },
    save:     { en: 'Save', cn: '保存' },
    cancel:   { en: 'Cancel', cn: '取消' },
    confirmDelete: { en: 'Confirm Delete', cn: '确认删除' },
    noData:   { en: 'No exhibitions available', cn: '暂无展览数据' },
  },
};

export const getExhibitionLabel = (key, language = 'en') => {
  const lang = language === 'cn' ? 'cn' : 'en';
  if (exhibitionLabels.fields[key]) return exhibitionLabels.fields[key][lang];
  if (exhibitionLabels.UI_TEXT[key]) return exhibitionLabels.UI_TEXT[key][lang];
  if (exhibitionLabels.page[key]) return exhibitionLabels.page[key][lang];
  return key;
};

// ============================================================
// MAIN CONFIGURATION
// ============================================================
export const exhibitionConfig = {
  itemUrl: "exhibition",
  schemaName: "Exhibition",

  api: {
    endpoints: {
      base: '/api/exhibition',
      create: '/api/exhibition',
      update: (id) => `/api/exhibition/${id}`,
      delete: (id) => `/api/exhibition/${id}`,
      list: '/api/exhibition',
      detail: (id) => `/api/exhibition/${id}`,
      upload: '/api/upload',
      bulk: '/api/exhibition/bulk',
      reorder: '/api/exhibition/reorder',
    },
    methods: {
      create: 'POST', update: 'PUT', delete: 'DELETE',
      list: 'GET', detail: 'GET', upload: 'POST',
      bulk: 'POST', reorder: 'PUT',
    },
    headers: { 'Content-Type': 'application/json' },
    uploadHeaders: {},
    languageParam: 'language',
    defaultLimit: 10000,
    config: {
      enableSoftDelete: false,
      enablePagination: false,
      enableSearch: true,
      enableSorting: true,
      defaultPageSize: 10000,
      maxPageSize: 10000,
      defaultSortOrder: 1,
      defaultSortField: 'order',
      collectionName: 'Exhibition',
    },
  },

  page: {
    title: exhibitionLabels.page.title,
    subtitle: exhibitionLabels.page.subtitle,
    description: exhibitionLabels.page.description,
    animationVariants: ANIMATION_VARIANTS?.container || {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1, y: 0,
        transition: { delayChildren: 0.15, staggerChildren: 0.08 },
      },
    },
  },

  fields: {
    imagesField: ['cover_img_url'],
    urlField: ['cover_img_url', 'video_url', 'web_url'],
    // 所有数组字段（与 Prisma 模型完全一致）
    arrayFields: ['introduction', 'press_release', 'related_artwork_title', 'related_gallery_artist'],
    requiredFields: [],
    searchableFields: [
      'title', 'subtitle', 'venue', 'curator', 'organiser',
      'participating_artists', 'caption', 'description',
      'related_artwork_title', 'related_gallery_artist'
    ],
    sortableFields: ['order', 'year', 'date_start', 'title'],
    filterableFields: ['type', 'status', 'mark', 'language'],
    mainFields: ['title', 'type', 'year', 'venue'],
    expandedFields: [
      'caption', 'description', 'introduction', 'press_release',
      'participating_artists', 'curator', 'organiser',
      'related_artwork_title', 'related_gallery_artist'
    ],
    // 所有数据字段（包含全部 Prisma 字段）
    dataField: [
      'cover_img_url', 'title', 'subtitle', 'type', 'date_start', 'date_end',
      'opening_date', 'year', 'venue', 'location', 'curator', 'organiser',
      'participating_artists', 'caption', 'description', 'introduction',
      'press_release', 'related_artwork_title', 'related_gallery_artist',
      'video_url', 'web_url', 'order', 'mark', 'language', 'status',
    ],
    fieldShowOrder: [
      'cover_img_url', 'title', 'subtitle', 'type', 'date_start', 'date_end',
      'opening_date', 'year', 'venue', 'location', 'curator', 'organiser',
      'participating_artists', 'caption', 'description', 'introduction',
      'press_release', 'related_artwork_title', 'related_gallery_artist',
      'video_url', 'web_url', 'order', 'mark', 'language', 'status',
    ],
    validFields: [
      '_id', 'id', 'cover_img_url', 'title', 'subtitle', 'type', 'date_start',
      'date_end', 'opening_date', 'year', 'venue', 'location', 'curator',
      'organiser', 'participating_artists', 'caption', 'description',
      'introduction', 'press_release', 'related_artwork_title',
      'related_gallery_artist', 'video_url', 'web_url', 'order',
      'mark', 'language', 'status', 'updatedAt',
    ],
  },

  components: {},

  settings: {
    useLanguage: true,
    languageField: 'language',
    pagination: {
      defaultPageSize: 20,
      pageSizeOptions: [10, 20, 50, 100],
    },
    upload: {
      maxFileSize: 10 * 1024 * 1024,
      acceptedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      uploadPath: '/uploads/exhibitions/',
    },
    validation: {
      maxDescriptionLength: 2000,
    },
    display: {
      cardImageAspectRatio: 'aspect-square',
      defaultImagePlaceholder: '/placeholder.png',
      showFieldLabels: true,
      showExpandArrow: true,
      showDetailButton: true,
    },
  },

  labels: exhibitionLabels,

  // 展览类型选项（可根据实际业务扩展）
  typeOptions: [
    { value: 'solo', label_en: 'Solo Exhibition', label_cn: '个展' },
    { value: 'group', label_en: 'Group Exhibition', label_cn: '群展' },
    { value: 'biennale', label_en: 'Biennale', label_cn: '双年展' },
    { value: 'retrospective', label_en: 'Retrospective', label_cn: '回顾展' },
    { value: 'thematic', label_en: 'Thematic Exhibition', label_cn: '主题展' },
    { value: 'online', label_en: 'Online Exhibition', label_cn: '线上展览' },
  ],

  languageOptions: [
    { value: 'CN', label_en: 'Chinese', label_cn: '中文' },
    { value: 'EN', label_en: 'English', label_cn: '英文' },
  ],

  statusOptions: [
    { value: 'upcoming', label_en: 'Upcoming', label_cn: '即将展出' },
    { value: 'ongoing',  label_en: 'Ongoing',  label_cn: '正在展出' },
    { value: 'past',     label_en: 'Past',     label_cn: '已结束' },
    { value: 'draft',    label_en: 'Draft',    label_cn: '草稿' },
  ],
};

export default exhibitionConfig;