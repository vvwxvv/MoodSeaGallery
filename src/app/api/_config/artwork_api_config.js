export const artworkApiConfig = {
  // Basic configuration
  collectionName: 'Artwork',

  // Pagination settings
  enablePagination: false,
  defaultPageSize: 10000,
  maxPageSize: 10000,

  // Feature flags
  enableSearch: true,
  enableSorting: true,
  enableSoftDelete: false,
  enableBulkOperations: false,
  enableAutoFillArtist: false,

  // Sorting
  defaultSortField: 'order',
  defaultSortOrder: 1,

  // Schema configuration — fully matches Prisma Artwork model
  requiredFields: [],
  uniqueFields: [],
  searchableFields: ['title', 'artist', 'caption', 'type', 'medium', 'series'],
  arrayFields: ['introduction', 'related_gallery_exhibition'],   // 添加了 related_gallery_exhibition
  validFields: [
    'id',                                // 改为 id（原 _id 为数据库映射名，Prisma 字段名为 id）
    'cover_img_url',
    'related_gallery_exhibition',        // 新增缺失字段
    'artist',
    'title',
    'type',
    'medium',
    'year',
    'size',
    'series',
    'caption',
    'duration',
    'credits',
    'special_thanks',
    'introduction',
    'video_url',
    'web_url',
    'work_value',
    'sold',
    'order',
    'mark',
    'language',
    'updatedAt',
  ],

  // Custom validation
  customValidation: async (data, operation) => {
    return { valid: true };
  },

  // Before hooks
  beforeCreate: async (data) => {
    return data;
  },

  beforeUpdate: async (id, data, existing) => {
    return data;
  },

  // Response transform
  transformResponse: async (data) => {
    return data;
  },
};