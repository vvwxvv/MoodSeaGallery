// ============================================
// BILINGUAL UTILITY FUNCTIONS
// Reusable across the entire application
// ============================================

/**
 * Get bilingual label from object or string
 * @param {object|string} label - Label config { cn, en } or string
 * @returns {string} Formatted label "中文 / English" or original string
 */
export const getBilingualLabel = (label) => {
  if (typeof label === 'object' && label !== null && label.cn && label.en) {
    return `${label.cn} / ${label.en}`;
  }
  return label || '';
};

/**
 * Get single language label from bilingual object
 * @param {object|string} label - Label config { cn, en } or string
 * @param {string} lang - Language code ('cn' or 'en')
 * @returns {string} Single language label
 */
export const getSingleLangLabel = (label, lang = 'cn') => {
  if (typeof label === 'object' && label !== null) {
    return label[lang] || label.cn || label.en || '';
  }
  return label || '';
};

/**
 * Create bilingual label object
 * @param {string} cn - Chinese label
 * @param {string} en - English label
 * @returns {object} Bilingual label object
 */
export const createBilingualLabel = (cn, en) => ({ cn, en });

/**
 * Check if value is a bilingual object
 * @param {any} value - Value to check
 * @returns {boolean} True if bilingual object
 */
export const isBilingualObject = (value) => {
  return typeof value === 'object' && value !== null && ('cn' in value || 'en' in value);
};