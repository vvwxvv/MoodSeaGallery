export const fairApiConfig = {
  collectionName: 'Fair',

  enablePagination: false,
  defaultPageSize: 10000,
  maxPageSize: 10000,

  enableSearch: true,
  enableSorting: true,
  enableSoftDelete: false,
  enableBulkOperations: false,
  enableAutoFillArtist: false, // Fair 无 artist 字段

  defaultSortField: 'order',
  defaultSortOrder: -1,

  requiredFields: [],
  uniqueFields: [],
  searchableFields: [
    'title',
    'section',
    'type',
    'venue',
    'location',
    'organiser',
    'curator',
    'participating_artists',
    'caption',
    'mark',
    'year'
  ],
  arrayFields: [
    'press_release',
    'related_artwork_title',
    'related_gallery_artist'
  ],
  objectIdArrayFields: [], // 模型无 ObjectId 数组字段
  dateFields: [
    'date_start',
    'date_end',
    'vip_preview_date'
  ],
  validFields: [
    '_id',
    'title',
    'section',
    'type',
    'date_start',
    'date_end',
    'vip_preview_date',
    'year',
    'booth',
    'venue',
    'location',
    'organiser',
    'curator',
    'participating_artists',
    'caption',
    'press_release',
    'related_artwork_title',
    'related_gallery_artist',
    'cover_img_url',
    'web_url',
    'video_url',
    'language',
    'order',
    'mark',
    'status'
  ],

  customValidation: async (data, operation) => {
    // 语言校验
    if (data.language && !['EN', 'CN'].includes(data.language)) {
      return { valid: false, error: 'Language must be either EN or CN' };
    }
    // URL 校验（cover_img_url, web_url, video_url）
    const urlFields = ['cover_img_url', 'web_url', 'video_url'];
    for (const field of urlFields) {
      if (data[field] && data[field] !== null && String(data[field]).trim() !== '') {
        const url = String(data[field]).trim();
        if (url.match(/^https?:\/\//)) {
          try {
            new URL(url);
          } catch {
            return { valid: false, error: `Invalid URL format for ${field}` };
          }
        }
        if (url.length > 2048) {
          return { valid: false, error: `${field} cannot exceed 2048 characters` };
        }
      }
    }
    // 数组字段长度限制（示例：限制每个数组最多 100 项）
    const arrayFields = ['press_release', 'related_artwork_title', 'related_gallery_artist'];
    for (const field of arrayFields) {
      if (data[field] && Array.isArray(data[field]) && data[field].length > 100) {
        return { valid: false, error: `${field} cannot have more than 100 items` };
      }
    }
    return { valid: true };
  },

  processObjectIdArray: (value) => {
    // 本模型无 ObjectId 数组字段，保留但不使用
    if (!value) return [];
    if (Array.isArray(value)) {
      return value
        .filter(item => item !== null && item !== undefined && item !== '')
        .map(item => String(item).trim())
        .filter(item => item.length === 24 && item.match(/^[0-9a-fA-F]{24}$/));
    }
    if (typeof value === 'string' && value.trim() !== '') {
      return value
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length === 24 && item.match(/^[0-9a-fA-F]{24}$/));
    }
    return [];
  },

  beforeCreate: async (data) => {
    // 统一处理 URL 字段
    const urlFields = ['cover_img_url', 'web_url', 'video_url'];
    for (const field of urlFields) {
      if (data[field] !== undefined && data[field] !== null) {
        if (typeof data[field] === 'string') {
          data[field] = data[field].trim();
          if (data[field] && !data[field].match(/^https?:\/\//)) {
            data[field] = `https://${data[field]}`;
          }
          if (data[field] === 'https://' || data[field] === '') {
            data[field] = null;
          }
        }
      } else if (data[field] === '') {
        data[field] = null;
      }
    }

    // 处理所有字符串字段（trim 或 null）
    const stringFields = [
      'title', 'section', 'type', 'date_start', 'date_end',
      'vip_preview_date', 'year', 'booth', 'venue', 'location',
      'organiser', 'curator', 'participating_artists', 'caption',
      'language', 'order', 'mark', 'status'
    ];
    for (const field of stringFields) {
      if (data[field] !== undefined) {
        if (typeof data[field] === 'string') {
          data[field] = data[field].trim() || null;
        } else if (data[field] === '') {
          data[field] = null;
        }
      }
    }

    // 处理数组字段（去空）
    const arrayFields = ['press_release', 'related_artwork_title', 'related_gallery_artist'];
    for (const field of arrayFields) {
      if (data[field] !== undefined) {
        if (Array.isArray(data[field])) {
          data[field] = data[field]
            .filter(item => item !== null && item !== undefined && item !== '')
            .map(item => String(item).trim())
            .filter(item => item.length > 0);
        } else if (typeof data[field] === 'string' && data[field].trim() !== '') {
          // 如果是字符串，可按分隔符拆分为数组，这里简单按逗号分割（示例）
          data[field] = data[field]
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);
        } else {
          data[field] = [];
        }
      }
    }

    // 设置默认语言
    if (!data.language) {
      data.language = 'EN';
    }

    // 设置默认 order
    if (!data.order || data.order === '') {
      data.order = '0';
    } else {
      data.order = String(data.order);
    }

    return data;
  },

  beforeUpdate: async (id, data, existing) => {
    // 与 beforeCreate 逻辑一致，但仅更新传入的字段
    const urlFields = ['cover_img_url', 'web_url', 'video_url'];
    for (const field of urlFields) {
      if (data[field] !== undefined) {
        if (typeof data[field] === 'string') {
          data[field] = data[field].trim();
          if (data[field] && !data[field].match(/^https?:\/\//)) {
            data[field] = `https://${data[field]}`;
          }
          if (data[field] === 'https://' || data[field] === '') {
            data[field] = null;
          }
        } else if (data[field] === '') {
          data[field] = null;
        }
      }
    }

    const stringFields = [
      'title', 'section', 'type', 'date_start', 'date_end',
      'vip_preview_date', 'year', 'booth', 'venue', 'location',
      'organiser', 'curator', 'participating_artists', 'caption',
      'language', 'order', 'mark', 'status'
    ];
    for (const field of stringFields) {
      if (data[field] !== undefined) {
        if (typeof data[field] === 'string') {
          data[field] = data[field].trim() || null;
        } else if (data[field] === '') {
          data[field] = null;
        }
      }
    }

    const arrayFields = ['press_release', 'related_artwork_title', 'related_gallery_artist'];
    for (const field of arrayFields) {
      if (data[field] !== undefined) {
        if (Array.isArray(data[field])) {
          data[field] = data[field]
            .filter(item => item !== null && item !== undefined && item !== '')
            .map(item => String(item).trim())
            .filter(item => item.length > 0);
        } else if (typeof data[field] === 'string' && data[field].trim() !== '') {
          data[field] = data[field]
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);
        } else {
          data[field] = [];
        }
      }
    }

    if (data.order !== undefined && data.order !== null && data.order !== '') {
      data.order = String(data.order);
    } else if (data.order === '') {
      data.order = '0';
    }

    return data;
  }
};