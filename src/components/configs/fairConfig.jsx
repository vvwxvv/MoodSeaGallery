// fairConfig.js — fully matches Prisma Fair model
import { ANIMATION_VARIANTS } from './general_config';

// ============================================================
// LABELS CONFIGURATION
// ============================================================
export const fairLabels = {
  page: {
    title: { en: 'Fairs', cn: '博览会' },
    subtitle: { en: 'Fair Management', cn: '博览会管理' },
    description: { en: 'Manage art fairs and exhibitions', cn: '管理艺术博览会与展览' },
  },

  fields: {
    cover_img_url: { en: 'Cover Image', cn: '封面图片' },
    title: { en: 'Title', cn: '标题' },
    section: { en: 'Section', cn: '板块' },
    type: { en: 'Type', cn: '类型' },
    date_start: { en: 'Start Date', cn: '开始日期' },
    date_end: { en: 'End Date', cn: '结束日期' },
    vip_preview_date: { en: 'VIP Preview Date', cn: 'VIP预览日期' },
    year: { en: 'Year', cn: '年份' },
    booth: { en: 'Booth', cn: '展位' },
    venue: { en: 'Venue', cn: '场馆' },
    location: { en: 'Location', cn: '地点' },
    organiser: { en: 'Organiser', cn: '主办方' },
    curator: { en: 'Curator', cn: '策展人' },
    participating_artists: { en: 'Participating Artists', cn: '参展艺术家' },
    caption: { en: 'Caption', cn: '说明' },
    press_release: { en: 'Press Release', cn: '新闻稿' },
    related_artwork_title: { en: 'Related Artwork Titles', cn: '相关作品标题' },
    related_gallery_artist: { en: 'Related Gallery Artists', cn: '相关画廊艺术家' },
    web_url: { en: 'Web URL', cn: '网页链接' },
    video_url: { en: 'Video URL', cn: '视频链接' },
    language: { en: 'Language', cn: '语言' },
    order: { en: 'Order', cn: '排序' },
    mark: { en: 'Mark', cn: '标记' },
    status: { en: 'Status', cn: '状态' },
  },

  UI_TEXT: {
    fairManagement: { en: 'Fair Management', cn: '博览会管理' },
    create: { en: 'Create New', cn: '创建新博览会' },
    edit: { en: 'Edit', cn: '编辑' },
    delete: { en: 'Delete', cn: '删除' },
    save: { en: 'Save', cn: '保存' },
    cancel: { en: 'Cancel', cn: '取消' },
    confirmDelete: { en: 'Confirm Delete', cn: '确认删除' },
    noData: { en: 'No fairs available', cn: '暂无博览会数据' },
  },
};

export const getFairLabel = (key, language = 'en') => {
  const lang = language === 'cn' ? 'cn' : 'en';
  if (fairLabels.fields[key]) return fairLabels.fields[key][lang];
  if (fairLabels.UI_TEXT[key]) return fairLabels.UI_TEXT[key][lang];
  if (fairLabels.page[key]) return fairLabels.page[key][lang];
  return key;
};

// ============================================================
// MAIN CONFIGURATION
// ============================================================
export const fairConfig = {
  itemUrl: "fair",
  schemaName: "Fair",

  api: {
    endpoints: {
      base: '/api/fair',
      create: '/api/fair',
      update: (id) => `/api/fair/${id}`,
      delete: (id) => `/api/fair/${id}`,
      list: '/api/fair',
      detail: (id) => `/api/fair/${id}`,
      upload: '/api/upload',
      bulk: '/api/fair/bulk',
      reorder: '/api/fair/reorder',
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
      defaultSortOrder: -1,      // 与之前 fairApiConfig 一致，按 order 降序
      defaultSortField: 'order',
      collectionName: 'Fair',
    },
  },

  page: {
    title: fairLabels.page.title,
    subtitle: fairLabels.page.subtitle,
    description: fairLabels.page.description,
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
    arrayFields: ['press_release', 'related_artwork_title', 'related_gallery_artist'],
    requiredFields: [],
    searchableFields: [
      'title', 'section', 'type', 'venue', 'location',
      'organiser', 'curator', 'participating_artists', 'caption', 'mark', 'year'
    ],
    sortableFields: ['order', 'year', 'title', 'date_start', 'date_end'],
    filterableFields: ['type', 'section', 'language', 'status', 'year'],
    mainFields: ['title', 'venue', 'year', 'type'],
    expandedFields: ['caption', 'press_release', 'participating_artists', 'curator'],
    dataField: [
      'cover_img_url', 'title', 'section', 'type', 'date_start', 'date_end',
      'vip_preview_date', 'year', 'booth', 'venue', 'location', 'organiser',
      'curator', 'participating_artists', 'caption', 'press_release',
      'related_artwork_title', 'related_gallery_artist', 'web_url', 'video_url',
      'language', 'order', 'mark', 'status',
    ],
    fieldShowOrder: [
      'cover_img_url', 'title', 'section', 'type', 'year',
      'date_start', 'date_end', 'vip_preview_date', 'booth', 'venue',
      'location', 'organiser', 'curator', 'participating_artists',
      'caption', 'press_release', 'related_artwork_title',
      'related_gallery_artist', 'web_url', 'video_url',
      'language', 'order', 'mark', 'status',
    ],
    validFields: [
      'id',                  // Prisma 字段名（映射自 _id）
      'cover_img_url', 'title', 'section', 'type',
      'date_start', 'date_end', 'vip_preview_date', 'year', 'booth',
      'venue', 'location', 'organiser', 'curator', 'participating_artists',
      'caption', 'press_release', 'related_artwork_title',
      'related_gallery_artist', 'web_url', 'video_url',
      'language', 'order', 'mark', 'status', 'updatedAt',
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
      uploadPath: '/uploads/fairs/',
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

  labels: fairLabels,
  typeOptions: [],
  languageOptions: [
    { value: 'CN', label_en: 'Chinese', label_cn: '中文' },
    { value: 'EN', label_en: 'English', label_cn: '英文' },
  ],
};

export default fairConfig;