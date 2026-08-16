// artworkConfig.js — fully matches Prisma Artwork model
import { ANIMATION_VARIANTS } from './general_config';

// ============================================================
// LABELS CONFIGURATION
// ============================================================
export const artworkLabels = {
  page: {
    title: { en: 'Artworks', cn: '作品' },
    subtitle: { en: 'Artwork Management', cn: '作品管理' },
    description: { en: 'Manage artwork collection', cn: '管理作品集' },
  },

  fields: {
    cover_img_url: { en: 'Cover Image', cn: '封面图片' },
    related_gallery_exhibition: { en: 'Related Gallery Exhibition', cn: '相关画廊展览' }, // 新增
    artist: { en: 'Artist', cn: '艺术家' },
    title: { en: 'Title', cn: '标题' },
    type: { en: 'Type', cn: '类型' },
    medium: { en: 'Medium', cn: '媒介' },
    year: { en: 'Year', cn: '年份' },
    size: { en: 'Size', cn: '尺寸' },
    series: { en: 'Series', cn: '系列' },
    caption: { en: 'Caption', cn: '说明' },
    duration: { en: 'Duration', cn: '时长' },
    credits: { en: 'Credits', cn: '鸣谢' },
    special_thanks: { en: 'Special Thanks', cn: '特别感谢' },
    introduction: { en: 'Introduction', cn: '介绍' },
    video_url: { en: 'Video URL', cn: '视频链接' },
    web_url: { en: 'Web URL', cn: '网页链接' },
    work_value: { en: 'Value', cn: '价值' },
    sold: { en: 'Sold', cn: '售出状态' },
    order: { en: 'Order', cn: '排序' },
    mark: { en: 'Mark', cn: '标记' },
    language: { en: 'Language', cn: '语言' },
  },

  UI_TEXT: {
    artworkManagement: { en: 'Artwork Management', cn: '作品管理' },
    create: { en: 'Create New', cn: '创建新作品' },
    edit: { en: 'Edit', cn: '编辑' },
    delete: { en: 'Delete', cn: '删除' },
    save: { en: 'Save', cn: '保存' },
    cancel: { en: 'Cancel', cn: '取消' },
    confirmDelete: { en: 'Confirm Delete', cn: '确认删除' },
    noData: { en: 'No artworks available', cn: '暂无作品数据' },
  },
};

export const getArtworkLabel = (key, language = 'en') => {
  const lang = language === 'cn' ? 'cn' : 'en';
  if (artworkLabels.fields[key]) return artworkLabels.fields[key][lang];
  if (artworkLabels.UI_TEXT[key]) return artworkLabels.UI_TEXT[key][lang];
  if (artworkLabels.page[key]) return artworkLabels.page[key][lang];
  return key;
};

// ============================================================
// MAIN CONFIGURATION
// ============================================================
export const artworkConfig = {
  itemUrl: "artwork",
  schemaName: "Artwork",

  api: {
    endpoints: {
      base: '/api/artwork',
      create: '/api/artwork',
      update: (id) => `/api/artwork/${id}`,
      delete: (id) => `/api/artwork/${id}`,
      list: '/api/artwork',
      detail: (id) => `/api/artwork/${id}`,
      upload: '/api/upload',
      bulk: '/api/artwork/bulk',
      reorder: '/api/artwork/reorder',
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
      collectionName: 'Artwork',
    },
  },

  page: {
    title: artworkLabels.page.title,
    subtitle: artworkLabels.page.subtitle,
    description: artworkLabels.page.description,
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
    arrayFields: ['introduction', 'related_gallery_exhibition'],               // 添加 related_gallery_exhibition
    requiredFields: [],
    searchableFields: ['title', 'artist', 'caption', 'type', 'medium', 'series'],
    sortableFields: ['order', 'year', 'title', 'artist'],
    filterableFields: ['type', 'medium', 'series', 'mark', 'language'],
    mainFields: ['title', 'artist', 'year', 'type'],
    expandedFields: ['caption', 'introduction', 'credits', 'size', 'medium'],
    dataField: [
      'cover_img_url', 'related_gallery_exhibition',  // 新增
      'artist', 'title', 'type', 'medium', 'year',
      'size', 'series', 'caption', 'duration', 'credits', 'special_thanks',
      'introduction', 'video_url', 'web_url', 'work_value', 'sold',
      'order', 'mark', 'language',
    ],
    fieldShowOrder: [
      'cover_img_url', 'related_gallery_exhibition',  // 新增，位置可根据需要调整
      'title', 'artist', 'type', 'medium', 'year',
      'size', 'series', 'caption', 'duration', 'credits', 'special_thanks',
      'introduction', 'video_url', 'web_url', 'work_value', 'sold',
      'order', 'mark', 'language',
    ],
    validFields: [
      'id',                  // 仅保留 Prisma 字段名，移除 _id
      'cover_img_url',
      'related_gallery_exhibition',  // 新增
      'artist', 'title', 'type', 'medium', 'year',
      'size', 'series', 'caption', 'duration', 'credits',
      'special_thanks', 'introduction', 'video_url', 'web_url',
      'work_value', 'sold', 'order', 'mark', 'language', 'updatedAt',
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
      uploadPath: '/uploads/artworks/',
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

  labels: artworkLabels,
  typeOptions: [],
  languageOptions: [
    { value: 'CN', label_en: 'Chinese', label_cn: '中文' },
    { value: 'EN', label_en: 'English', label_cn: '英文' },
  ],
};

export default artworkConfig;