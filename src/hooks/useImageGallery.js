import { useMemo } from "react";
import IMAGE_GALLERY_ENTITY_CONFIG from "@/data/image_gallery_entity_config.json";

const DEFAULT_ID_FIELD = "_id";
const DEFAULT_TITLE_FIELD = "title";
const DEFAULT_COVER_FIELD = "cover_img_url";

/**
 * Match images to a single entity. Safe against null/undefined inputs.
 */
export const useSingleEntityImagesMaching = (allImages, entity, entityType = "artwork", isCn) => {
  return useMemo(() => {
    if (!Array.isArray(allImages) || !allImages.length || !entity) {
      return { matchedImages: [], coverImage: null };
    }

    const config = IMAGE_GALLERY_ENTITY_CONFIG?.[entityType] || {};
    const idField = config.idField || DEFAULT_ID_FIELD;
    const titleField = config.titleField || DEFAULT_TITLE_FIELD;
    const coverField = config.coverField || DEFAULT_COVER_FIELD;

    const entityId = entity[idField] || entity._id || entity.id;
    const entityTitle = entity[titleField] || "";

    const matchedImages = allImages
      .filter((img) => {
        if (!img) return false;
        if (img.artworkId && img.artworkId === entityId) return true;
        if (img.eventId && img.eventId === entityId) return true;
        if (img.entityId && img.entityId === entityId) return true;

        const tagEn = (img.tag_en || "").toLowerCase();
        const tagCn = (img.tag_cn || "").toLowerCase();
        const titleLower = entityTitle.toLowerCase();

        return (tagEn && tagEn === titleLower) || (tagCn && tagCn === titleLower);
      })
      .map((img) => ({
        ...img,
        id: img.id || img._id,
        img_url: img.img_url,
        caption_en: img.caption_en || "",
        caption_cn: img.caption_cn || "",
        tag_en: img.tag_en || "",
        tag_cn: img.tag_cn || "",
        order: img.order || 0,
      }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const coverImage =
      entity[coverField] || (matchedImages.length > 0 ? matchedImages[0].img_url : null);

    return { matchedImages, coverImage };
  }, [allImages, entity, entityType]);
};

const FALLBACK_IMAGE = "/no-image.png";

const useImageGallery = (images, item, isCn, options = {}) => {
  const {
    imageUrlField = "img_url",
    coverImageField = "cover_img_url",
    fallbackImage = FALLBACK_IMAGE,
    entityType = "artwork",
  } = options;

  const { matchedImages } = useSingleEntityImagesMaching(images, item, entityType, isCn);

  const uniqueImages = useMemo(() => {
    if (!Array.isArray(matchedImages) || matchedImages.length === 0) return [];
    const seen = new Set();
    return matchedImages.filter((image) => {
      if (!image?.[imageUrlField]?.trim()) return false;
      if (seen.has(image[imageUrlField])) return false;
      seen.add(image[imageUrlField]);
      return true;
    });
  }, [matchedImages, imageUrlField]);

  const mainImageUrl = useMemo(() => {
    if (uniqueImages.length > 0) return uniqueImages[0][imageUrlField];
    if (item?.[coverImageField]?.trim()) return item[coverImageField];
    return fallbackImage;
  }, [uniqueImages, item, coverImageField, imageUrlField, fallbackImage]);

  const galleryImages = useMemo(() => uniqueImages.slice(1), [uniqueImages]);

  return { mainImageUrl, galleryImages, uniqueImages };
};

export default useImageGallery;
