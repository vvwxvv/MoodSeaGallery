import { matchImagesByTagSource } from "@/utils/matchImagesByTagSource";
  /**
   * Attach matched images to each item and sort by `order`.
   * @param {Array} items - Array of parent items.
   * @param {Array} images - Array of image objects.
   * @returns {Array} Items with `matchedImages`, sorted by `order`.
   */
  export function attachImagesAndSort(items, images) {
    if (!Array.isArray(items) || !items.length) return [];
    const withImages = items.map((item) => ({
      ...item,
      matchedImages: matchImagesByTagSource(images, item),
    }));
    return withImages.slice().sort((a, b) => {
      const ao = Number(a?.order) || 0;
      const bo = Number(b?.order) || 0;
      return ao - bo;
    });
  }