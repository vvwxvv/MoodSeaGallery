export const imageApiConfig = {
  collectionName: 'Image',

  enablePagination: false,
  defaultPageSize: 10000,
  maxPageSize: 10000,

  enableSearch: true,
  enableSorting: true,
  enableSoftDelete: false,
  enableBulkOperations: true,

  defaultSortField: 'order',
  defaultSortOrder: 1,

  requiredFields: [],
  uniqueFields: [],
  searchableFields: ['img_url', 'type', 'tag_en', 'tag_cn', 'caption_en', 'caption_cn', 'mark', 'tag_source', 'order'],
  arrayFields: [],
  objectIdArrayFields: [],
  dateFields: [],
  validFields: [
    '_id',
    'img_url',
    'type',
    'tag_en',
    'tag_cn',
    'caption_en',
    'caption_cn',
    'mark',
    'tag_source',
    'order',
  ],

  validTypes: [
    'artwork', 'photo', 'sketch', 'digital', 'painting',
    'sculpture', 'installation', 'performance', 'documentation', 'other',
  ],

  customValidation: async (data, operation) => {
    return { valid: true };
  },

  processObjectIdArray: (value) => {
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
    const validFieldsSet = new Set(imageApiConfig.validFields);
    const cleanedData = {};
    for (const key of Object.keys(data)) {
      if (validFieldsSet.has(key) || key === 'id') {
        cleanedData[key] = data[key];
      }
    }
    data = cleanedData;

    if (data.img_url !== undefined) {
      if (data.img_url === '' || data.img_url === null) {
        data.img_url = null;
      } else if (typeof data.img_url === 'string') {
        data.img_url = data.img_url.trim();
        if (data.img_url === '') {
          data.img_url = null;
        } else if (!data.img_url.match(/^https?:\/\//)) {
          data.img_url = `https://${data.img_url}`;
        }
      }
    }

    const stringFields = ['type', 'tag_en', 'tag_cn', 'caption_en', 'caption_cn', 'mark'];
    for (const field of stringFields) {
      if (data[field] !== undefined) {
        if (data[field] === '' || data[field] === null) {
          data[field] = null;
        } else if (typeof data[field] === 'string') {
          data[field] = data[field].trim();
          if (data[field] === '') {
            data[field] = null;
          }
        }
      }
    }

    if (!data.order || data.order === '') {
      data.order = '0';
    } else {
      data.order = String(data.order);
    }

    return data;
  },

  beforeUpdate: async (id, data, existing) => {
    const validFieldsSet = new Set(imageApiConfig.validFields);
    const cleanedData = {};
    for (const key of Object.keys(data)) {
      if (validFieldsSet.has(key) || key === 'id' || key === '_id') {
        cleanedData[key] = data[key];
      }
    }
    data = cleanedData;

    if (data.img_url !== undefined) {
      if (data.img_url === '' || data.img_url === null) {
        data.img_url = null;
      } else if (typeof data.img_url === 'string') {
        data.img_url = data.img_url.trim();
        if (data.img_url === '') {
          data.img_url = null;
        } else if (!data.img_url.match(/^https?:\/\//)) {
          data.img_url = `https://${data.img_url}`;
        }
      }
    }

    const stringFields = ['type', 'tag_en', 'tag_cn', 'caption_en', 'caption_cn', 'mark'];
    for (const field of stringFields) {
      if (data[field] !== undefined) {
        if (data[field] === '' || data[field] === null) {
          data[field] = null;
        } else if (typeof data[field] === 'string') {
          data[field] = data[field].trim();
          if (data[field] === '') {
            data[field] = null;
          }
        }
      }
    }

    if (data.order !== undefined) {
      if (data.order === null || data.order === '') {
        data.order = '0';
      } else {
        data.order = String(data.order);
      }
    }

    return data;
  },

  beforeBatchUpdate: async (items) => {
    return items.map(item => {
      if (item.order !== undefined && item.order !== null) {
        item.order = String(item.order);
      }
      return item;
    });
  },

  beforeDelete: async (id) => {
    return null;
  },

  afterDelete: async (id, result) => {},
};
