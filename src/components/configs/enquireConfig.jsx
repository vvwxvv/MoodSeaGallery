// enquireConfig.js — matches Prisma Enquire model
import { ANIMATION_VARIANTS } from './general_config';

// ============================================================
// LABELS CONFIGURATION
// ============================================================
export const enquireLabels = {
  page: {
    title: { en: 'Enquiries', cn: '咨询' },
    subtitle: { en: 'Enquiry Management', cn: '咨询管理' },
    description: { en: 'Manage customer enquiries and requests', cn: '管理客户咨询与请求' },
  },

  fields: {
    name: { en: 'Name', cn: '姓名' },
    email: { en: 'Email', cn: '邮箱' },
    phone: { en: 'Phone', cn: '电话' },
    message: { en: 'Message', cn: '留言' },
    related_gallery_artist: { en: 'Related Artist', cn: '相关艺术家' },
    related_artwork_title: { en: 'Related Artwork', cn: '相关作品' },
    createdAt: { en: 'Created At', cn: '创建时间' },
    status: { en: 'Status', cn: '状态' },
  },

  UI_TEXT: {
    enquireManagement: { en: 'Enquiry Management', cn: '咨询管理' },
    create: { en: 'Create New', cn: '新建咨询' },
    edit: { en: 'Edit', cn: '编辑' },
    delete: { en: 'Delete', cn: '删除' },
    save: { en: 'Save', cn: '保存' },
    cancel: { en: 'Cancel', cn: '取消' },
    confirmDelete: { en: 'Confirm Delete', cn: '确认删除' },
    noData: { en: 'No enquiries available', cn: '暂无咨询数据' },
    statusPending: { en: 'Pending', cn: '待处理' },
    statusResponded: { en: 'Responded', cn: '已回复' },
    statusClosed: { en: 'Closed', cn: '已关闭' },
  },
};

export const getEnquireLabel = (key, language = 'en') => {
  const lang = language === 'cn' ? 'cn' : 'en';
  if (enquireLabels.fields[key]) return enquireLabels.fields[key][lang];
  if (enquireLabels.UI_TEXT[key]) return enquireLabels.UI_TEXT[key][lang];
  if (enquireLabels.page[key]) return enquireLabels.page[key][lang];
  return key;
};

// ============================================================
// MAIN CONFIGURATION
// ============================================================
export const enquireConfig = {
  itemUrl: "enquire",
  schemaName: "Enquire",

  api: {
    endpoints: {
      base: '/api/enquire',
      create: '/api/enquire',
      update: (id) => `/api/enquire/${id}`,
      delete: (id) => `/api/enquire/${id}`,
      list: '/api/enquire',
      detail: (id) => `/api/enquire/${id}`,
      bulk: '/api/enquire/bulk',
    },
    methods: {
      create: 'POST', update: 'PUT', delete: 'DELETE',
      list: 'GET', detail: 'GET', bulk: 'POST',
    },
    headers: { 'Content-Type': 'application/json' },
    languageParam: 'language',
    defaultLimit: 50,
    config: {
      enableSoftDelete: false,
      enablePagination: true,
      enableSearch: true,
      enableSorting: true,
      defaultPageSize: 50,
      maxPageSize: 1000,
      defaultSortOrder: -1, // -1 for descending (newest first)
      defaultSortField: 'createdAt',
      collectionName: 'Enquire',
    },
  },

  page: {
    title: enquireLabels.page.title,
    subtitle: enquireLabels.page.subtitle,
    description: enquireLabels.page.description,
    animationVariants: ANIMATION_VARIANTS?.container || {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1, y: 0,
        transition: { delayChildren: 0.15, staggerChildren: 0.08 },
      },
    },
  },

  fields: {
    imagesField: [],
    urlField: [],
    arrayFields: [],
    requiredFields: ['name', 'email'],
    searchableFields: ['name', 'email', 'phone', 'message', 'related_gallery_artist', 'related_artwork_title', 'status'],
    sortableFields: ['createdAt', 'status', 'name'],
    filterableFields: ['status'],
    mainFields: ['name', 'email', 'status', 'createdAt'],
    expandedFields: ['phone', 'message', 'related_gallery_artist', 'related_artwork_title'],
    dataField: [
      'name', 'email', 'phone', 'message', 'related_gallery_artist',
      'related_artwork_title', 'status'
    ],
    fieldShowOrder: [
      'name', 'email', 'phone', 'status', 'related_gallery_artist', 
      'related_artwork_title', 'message', 'createdAt'
    ],
    validFields: [
      '_id', 'id', 'name', 'email', 'phone', 'message', 
      'related_gallery_artist', 'related_artwork_title', 'createdAt', 'status'
    ],
  },

  components: {},

  settings: {
    useLanguage: false, // Enquiries typically don't need multi-language toggles for the data itself
    pagination: {
      defaultPageSize: 50,
      pageSizeOptions: [20, 50, 100, 200],
    },
    validation: {
      maxMessageLength: 5000,
    },
    display: {
      showFieldLabels: true,
      showExpandArrow: true,
      showDetailButton: true,
    },
  },

  labels: enquireLabels,
  statusOptions: [
    { value: 'Pending', label_en: 'Pending', label_cn: '待处理' },
    { value: 'Responded', label_en: 'Responded', label_cn: '已回复' },
    { value: 'Closed', label_en: 'Closed', label_cn: '已关闭' },
  ],
};

export default enquireConfig;