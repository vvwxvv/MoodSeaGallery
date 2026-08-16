/**
 * Get images filtered by mark field
 * @param {Array} filteredImages - Pre-filtered image list
 * @param {string|string[]} mark - Mark value(s) to match (e.g. 'slider', 'featured', ['slider', 'banner'])
 * @param {number} max - Maximum number of images to return
 * @returns {Array} matched images
 */
export const getMarkedImages = (filteredImages, mark = 'slider', max = 20) => {
    const marks = Array.isArray(mark)
      ? mark.map((m) => m.toLowerCase())
      : [mark.toLowerCase()];
  
    return filteredImages
      .filter((img) => marks.includes((img.mark || '').toLowerCase()))
      .slice(0, max);
  };
  
  // Convenience alias for backward compatibility
  export const getSliderImages = (filteredImages, max) =>
    getMarkedImages(filteredImages, 'slider', max);