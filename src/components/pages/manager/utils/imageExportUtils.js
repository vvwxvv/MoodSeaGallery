/**
 * Image Export Utilities
 * Handles data formatting and export for Image entities
 * Matches Prisma Image model fields
 */

/**
 * Formats image data for CSV/Excel export with proper field mapping
 * Based on Image Prisma model:
 * - img_url
 * - tag_en
 * - tag_cn
 * - type
 * - caption_en
 * - caption_cn
 * - mark
 * - tag_source
 * - order
 * - updatedAt
 * 
 * @param {Array} images - Array of image objects
 * @param {boolean} isCn - Whether to use Chinese labels
 * @returns {Array} Formatted data ready for export
 */
export function formatImageDataForCSV(images, isCn = false) {
  if (!Array.isArray(images) || images.length === 0) {
    return [];
  }

  // Field mappings matching Image Prisma model
  const fieldMappings = {
    img_url: isCn ? '图片链接' : 'Image URL',
    tag_en: isCn ? '标签(英)' : 'Tag (EN)',
    tag_cn: isCn ? '标签(中)' : 'Tag (CN)',
    type: isCn ? '类型' : 'Type',
    caption_en: isCn ? '说明(英)' : 'Caption (EN)',
    caption_cn: isCn ? '说明(中)' : 'Caption (CN)',
    mark: isCn ? '标记' : 'Mark',
    tag_source: isCn ? '标签来源' : 'Tag Source',
    order: isCn ? '顺序' : 'Order',
    updatedAt: isCn ? '更新时间' : 'Updated At',
  };

  return images.map(image => {
    const formattedImage = {};

    // Map each field with proper formatting
    Object.keys(fieldMappings).forEach(key => {
      const label = fieldMappings[key];
      let value = image[key];
      
      // Handle special formatting for specific fields
      switch (key) {
        case 'updatedAt':
          // Format DateTime field
          if (value) {
            try {
              const date = new Date(value);
              value = date.toISOString().split('T')[0] + ' ' + 
                      date.toTimeString().split(' ')[0];
            } catch (e) {
              value = '';
            }
          } else {
            value = '';
          }
          break;
          
        default:
          // Handle null/undefined values
          value = value !== null && value !== undefined ? value : '';
      }
      
      formattedImage[label] = value;
    });

    return formattedImage;
  });
}

/**
 * Creates a comprehensive image export with all available fields
 * @param {Array} images - Array of image objects
 * @param {boolean} isCn - Whether to use Chinese labels
 * @returns {Array} Comprehensive formatted data
 */
export function createComprehensiveImageExport(images, isCn = false) {
  return formatImageDataForCSV(images, isCn);
}

/**
 * Creates a simplified image export with essential fields only
 * Based on Image Prisma model essential fields
 * @param {Array} images - Array of image objects
 * @param {boolean} isCn - Whether to use Chinese labels
 * @returns {Array} Simplified formatted data
 */
export function createSimplifiedImageExport(images, isCn = false) {
  if (!Array.isArray(images) || images.length === 0) {
    return [];
  }

  // Essential fields from Image Prisma model
  const essentialFields = {
    img_url: isCn ? '图片链接' : 'Image URL',
    tag_en: isCn ? '标签(英)' : 'Tag (EN)',
    tag_cn: isCn ? '标签(中)' : 'Tag (CN)',
    type: isCn ? '类型' : 'Type',
    order: isCn ? '顺序' : 'Order',
    updatedAt: isCn ? '更新时间' : 'Updated At',
  };

  return images.map(image => {
    const simplifiedImage = {};

    Object.keys(essentialFields).forEach(key => {
      const label = essentialFields[key];
      let value = image[key];
      
      switch (key) {
        case 'updatedAt':
          if (value) {
            try {
              const date = new Date(value);
              value = date.toISOString().split('T')[0];
            } catch (e) {
              value = '';
            }
          } else {
            value = '';
          }
          break;
          
        default:
          value = value || '';
      }
      
      simplifiedImage[label] = value;
    });

    return simplifiedImage;
  });
}

/**
 * Creates a language-specific image export
 * Based on Image Prisma model bilingual fields
 * @param {Array} images - Array of image objects
 * @param {boolean} isCn - Whether to use Chinese content
 * @returns {Array} Language-specific formatted data
 */
export function createLanguageSpecificImageExport(images, isCn = false) {
  if (!Array.isArray(images) || images.length === 0) {
    return [];
  }

  // Language-specific fields from Image Prisma model
  const languageFields = isCn ? {
    img_url: '图片链接',
    tag_cn: '标签',
    caption_cn: '说明',
    type: '类型',
    order: '顺序',
  } : {
    img_url: 'Image URL',
    tag_en: 'Tag',
    caption_en: 'Caption',
    type: 'Type',
    order: 'Order',
  };

  return images.map(image => {
    const languageImage = {};

    Object.keys(languageFields).forEach(key => {
      const label = languageFields[key];
      const value = image[key] || '';
      languageImage[label] = value;
    });

    return languageImage;
  });
}

/**
 * Creates a bilingual combined export (merges EN and CN into single columns)
 * Based on Image Prisma model bilingual fields
 * @param {Array} images - Array of image objects
 * @param {boolean} isCn - Whether to use Chinese labels
 * @returns {Array} Bilingual combined formatted data
 */
export function createBilingualCombinedImageExport(images, isCn = false) {
  if (!Array.isArray(images) || images.length === 0) {
    return [];
  }

  // Combined bilingual field mappings
  const combinedFields = {
    img_url: isCn ? '图片链接' : 'Image URL',
    tag: isCn ? '标签' : 'Tag',
    caption: isCn ? '说明' : 'Caption',
    type: isCn ? '类型' : 'Type',
    tag_source: isCn ? '标签来源' : 'Tag Source',
    order: isCn ? '顺序' : 'Order',
    mark: isCn ? '标记' : 'Mark',
    updatedAt: isCn ? '更新时间' : 'Updated At',
  };

  return images.map(image => {
    const combinedImage = {};

    Object.keys(combinedFields).forEach(key => {
      const label = combinedFields[key];
      let value = '';

      switch (key) {
        case 'tag':
        case 'caption':
          // Combine bilingual fields with separator
          const cnValue = image[`${key}_cn`] || '';
          const enValue = image[`${key}_en`] || '';
          if (cnValue && enValue) {
            value = `${cnValue} | ${enValue}`;
          } else {
            value = cnValue || enValue;
          }
          break;

        case 'updatedAt':
          if (image[key]) {
            try {
              const date = new Date(image[key]);
              value = date.toISOString().split('T')[0];
            } catch (e) {
              value = '';
            }
          }
          break;

        default:
          value = image[key] || '';
      }

      combinedImage[label] = value;
    });

    return combinedImage;
  });
}

/**
 * Creates an image export grouped by tag
 * Based on Image Prisma model tag fields
 * @param {Array} images - Array of image objects
 * @param {boolean} isCn - Whether to use Chinese labels
 * @returns {Array} Formatted data grouped by tag
 */
export function createGroupedByTagImageExport(images, isCn = false) {
  if (!Array.isArray(images) || images.length === 0) {
    return [];
  }

  // Group images by tag
  const groupedImages = images.reduce((acc, image) => {
    const tag = (isCn ? image.tag_cn : image.tag_en) || 
                (isCn ? '未分类' : 'Uncategorized');
    if (!acc[tag]) {
      acc[tag] = [];
    }
    acc[tag].push(image);
    return acc;
  }, {});

  // Format grouped data
  const formattedData = [];
  Object.keys(groupedImages).sort().forEach(tag => {
    // Add tag header
    formattedData.push({
      [isCn ? '标签' : 'Tag']: tag,
      [isCn ? '数量' : 'Count']: groupedImages[tag].length.toString()
    });

    // Add images for this tag
    groupedImages[tag].forEach(image => {
      formattedData.push({
        [isCn ? '类型' : 'Type']: image.type || '',
        [isCn ? '图片链接' : 'Image URL']: image.img_url || '',
        [isCn ? '顺序' : 'Order']: image.order || ''
      });
    });

    // Add empty row for separation
    formattedData.push({});
  });

  return formattedData;
}

/**
 * Creates an image export grouped by type
 * Based on Image Prisma model type field
 * @param {Array} images - Array of image objects
 * @param {boolean} isCn - Whether to use Chinese labels
 * @returns {Array} Formatted data grouped by type
 */
export function createGroupedByTypeImageExport(images, isCn = false) {
  if (!Array.isArray(images) || images.length === 0) {
    return [];
  }

  // Group images by type
  const groupedImages = images.reduce((acc, image) => {
    const type = image.type || (isCn ? '未分类' : 'Uncategorized');
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(image);
    return acc;
  }, {});

  // Format grouped data
  const formattedData = [];
  Object.keys(groupedImages).sort().forEach(type => {
    // Add type header
    formattedData.push({
      [isCn ? '类型' : 'Type']: type,
      [isCn ? '数量' : 'Count']: groupedImages[type].length.toString()
    });

    // Add images for this type
    groupedImages[type].forEach(image => {
      formattedData.push({
        [isCn ? '标签' : 'Tag']: (isCn ? image.tag_cn : image.tag_en) || '',
        [isCn ? '图片链接' : 'Image URL']: image.img_url || '',
        [isCn ? '顺序' : 'Order']: image.order || ''
      });
    });

    // Add empty row for separation
    formattedData.push({});
  });

  return formattedData;
}

/**
 * Creates an image export grouped by tag source
 * Based on Image Prisma model tag_source field
 * @param {Array} images - Array of image objects
 * @param {boolean} isCn - Whether to use Chinese labels
 * @returns {Array} Formatted data grouped by tag source
 */
export function createGroupedByTagSourceImageExport(images, isCn = false) {
  if (!Array.isArray(images) || images.length === 0) {
    return [];
  }

  // Group images by tag source
  const groupedImages = images.reduce((acc, image) => {
    const tagSource = image.tag_source || (isCn ? '未知来源' : 'Unknown Source');
    if (!acc[tagSource]) {
      acc[tagSource] = [];
    }
    acc[tagSource].push(image);
    return acc;
  }, {});

  // Format grouped data
  const formattedData = [];
  Object.keys(groupedImages).sort().forEach(tagSource => {
    // Add tag source header
    formattedData.push({
      [isCn ? '标签来源' : 'Tag Source']: tagSource,
      [isCn ? '数量' : 'Count']: groupedImages[tagSource].length.toString()
    });

    // Add images for this tag source
    groupedImages[tagSource].forEach(image => {
      formattedData.push({
        [isCn ? '标签' : 'Tag']: (isCn ? image.tag_cn : image.tag_en) || '',
        [isCn ? '类型' : 'Type']: image.type || '',
        [isCn ? '图片链接' : 'Image URL']: image.img_url || ''
      });
    });

    // Add empty row for separation
    formattedData.push({});
  });

  return formattedData;
}

/**
 * Get Image statistics for export
 * Based on Image Prisma model fields
 * @param {Array} images - Array of image objects
 * @param {boolean} isCn - Whether to use Chinese labels
 * @returns {Object} Statistics object
 */
export function getImageStatistics(images, isCn = false) {
  if (!Array.isArray(images) || images.length === 0) {
    return {};
  }

  const stats = {
    total: images.length,
    byType: {},
    byTag: {},
    byTagSource: {},
    withCaptions: images.filter(i => i.caption_en || i.caption_cn).length,
    withTags: images.filter(i => i.tag_en || i.tag_cn).length,
    withUrls: images.filter(i => i.img_url).length,
    withMark: images.filter(i => i.mark).length,
    withOrder: images.filter(i => i.order).length,
  };

  // Count by type
  images.forEach(image => {
    const type = image.type || (isCn ? '未分类' : 'Uncategorized');
    stats.byType[type] = (stats.byType[type] || 0) + 1;
  });

  // Count by tag
  images.forEach(image => {
    const tag = (isCn ? image.tag_cn : image.tag_en) || 
                (isCn ? '无标签' : 'No Tag');
    stats.byTag[tag] = (stats.byTag[tag] || 0) + 1;
  });

  // Count by tag source
  images.forEach(image => {
    const tagSource = image.tag_source || (isCn ? '未知来源' : 'Unknown Source');
    stats.byTagSource[tagSource] = (stats.byTagSource[tagSource] || 0) + 1;
  });

  return stats;
}

/**
 * Create a statistics export
 * Based on Image Prisma model
 * @param {Array} images - Array of image objects
 * @param {boolean} isCn - Whether to use Chinese labels
 * @returns {Array} Statistics formatted for export
 */
export function createImageStatisticsExport(images, isCn = false) {
  const stats = getImageStatistics(images, isCn);

  if (!stats.total) {
    return [];
  }

  const formattedStats = [
    {
      [isCn ? '统计项' : 'Metric']: isCn ? '总数' : 'Total',
      [isCn ? '数值' : 'Value']: stats.total.toString()
    },
    {
      [isCn ? '统计项' : 'Metric']: isCn ? '包含图片链接' : 'With Image URLs',
      [isCn ? '数值' : 'Value']: stats.withUrls.toString()
    },
    {
      [isCn ? '统计项' : 'Metric']: isCn ? '包含说明' : 'With Captions',
      [isCn ? '数值' : 'Value']: stats.withCaptions.toString()
    },
    {
      [isCn ? '统计项' : 'Metric']: isCn ? '包含标签' : 'With Tags',
      [isCn ? '数值' : 'Value']: stats.withTags.toString()
    },
    {
      [isCn ? '统计项' : 'Metric']: isCn ? '包含标记' : 'With Mark',
      [isCn ? '数值' : 'Value']: stats.withMark.toString()
    },
    {
      [isCn ? '统计项' : 'Metric']: isCn ? '包含顺序' : 'With Order',
      [isCn ? '数值' : 'Value']: stats.withOrder.toString()
    },
    {}
  ];

  // Add type breakdown
  formattedStats.push({
    [isCn ? '统计项' : 'Metric']: isCn ? '类型分布' : 'Type Distribution',
    [isCn ? '数值' : 'Value']: ''
  });

  Object.keys(stats.byType).sort().forEach(type => {
    formattedStats.push({
      [isCn ? '统计项' : 'Metric']: `  ${type}`,
      [isCn ? '数值' : 'Value']: stats.byType[type].toString()
    });
  });

  formattedStats.push({});

  // Add tag breakdown
  formattedStats.push({
    [isCn ? '统计项' : 'Metric']: isCn ? '标签分布' : 'Tag Distribution',
    [isCn ? '数值' : 'Value']: ''
  });

  Object.keys(stats.byTag).sort().forEach(tag => {
    formattedStats.push({
      [isCn ? '统计项' : 'Metric']: `  ${tag}`,
      [isCn ? '数值' : 'Value']: stats.byTag[tag].toString()
    });
  });

  formattedStats.push({});

  // Add tag source breakdown
  formattedStats.push({
    [isCn ? '统计项' : 'Metric']: isCn ? '标签来源分布' : 'Tag Source Distribution',
    [isCn ? '数值' : 'Value']: ''
  });

  Object.keys(stats.byTagSource).sort().forEach(source => {
    formattedStats.push({
      [isCn ? '统计项' : 'Metric']: `  ${source}`,
      [isCn ? '数值' : 'Value']: stats.byTagSource[source].toString()
    });
  });

  return formattedStats;
}

/**
 * Normalizes a row for Image data
 * @param {Object} row - Raw image data row
 * @returns {Object} Normalized image object
 */
export const normalizeRow = (row) => {
  let mongoId = row._id?.$oid || row._id || row.id;
  if (mongoId && typeof mongoId === "object") {
    mongoId = mongoId.$oid || JSON.stringify(mongoId);
  }

  return {
    id: mongoId ? String(mongoId) : `temp_${Date.now()}_${Math.random()}`,
    _id: mongoId,
    img_url: row.img_url || "",
    tag_en: row.tag_en || "",
    tag_cn: row.tag_cn || "",
    type: row.type || "",
    caption_en: row.caption_en || "",
    caption_cn: row.caption_cn || "",
    mark: row.mark || "",
    tag_source: row.tag_source || "",
    order: row.order || "",
    updatedAt: row.updatedAt || new Date().toISOString(),
    isNew: row.isNew || false,
  };
};