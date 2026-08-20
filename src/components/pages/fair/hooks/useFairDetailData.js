import useData from "@/hooks/useData";
import useImageGallery from "@/hooks/useImageGallery";
import useWebGallery from "@/hooks/useWebGallery";
import { useWebMatching } from "@/hooks/useWebMatching";
import useFairSlugData from "@/components/pages/fair/hooks/useFairSlugData";   // fair slug hook
import useZoomControl from "@/hooks/useZoomControl";
import useImageModal from "@/hooks/useImageModal";

import { imageConfig } from "@/components/configs/imageConfig";
import { webConfig } from "@/components/configs/webConfig";
import { videoConfig } from "@/components/configs/videoConfig";

const FALLBACK_IMAGE = "/no-image.png";
const ZOOM_CONFIG = {
  STEP: 0.1,
  MIN: 1,
  MAX: 3,
};

export default function useFairDetailData(slug, isCn) {
  // Resolve slug to fair record
  const { fair, loading, error: fairError } = useFairSlugData(slug, isCn);

  // Fetch images data
  const { data: images, isLoading: imagesLoading, error: imagesError } = useData(
    imageConfig.api.endpoints.list,
    null,
    isCn
  );

  // Fetch web data
  const { data: webs, isLoading: websLoading, error: websError } = useData(
    webConfig.api.endpoints.list,
    null,
    isCn
  );

  // Fetch videos data
  const { data: videos, isLoading: videosLoading, error: videosError } = useData(
    videoConfig.api.endpoints.list,
    null,
    isCn
  );

  // Image matching (uses cover_img_url field, common to both exhibition and fair)
  const { mainImageUrl, galleryImages } = useImageGallery(images, fair, isCn, {
    imageUrlField: "img_url",
    coverImageField: "cover_img_url",
    fallbackImage: FALLBACK_IMAGE,
  });

  // Web matching (uses web_url field, common)
  const { galleryWebs } = useWebGallery(webs, fair, isCn, {
    webUrlField: "web_url",
  });

  const matchedWebs = useWebMatching(webs, fair, isCn);

  // Zoom & modal
  const { zoomLevel, handleImageWheel } = useZoomControl(mainImageUrl, ZOOM_CONFIG);
  const { enlargedImage, modalOpen, handleImageClick, handleModalClose } = useImageModal(FALLBACK_IMAGE);

  // Aggregate loading & errors
  const isLoading = loading || imagesLoading || websLoading || videosLoading;
  const errors = [fairError, imagesError, websError, videosError].filter(Boolean);
  const hasError = errors.length > 0;
  const firstError = errors[0] || null;

  return {
    fair,                      // renamed from exhibition
    isLoading,
    hasError,
    firstError,
    errors,
    mainImageUrl,
    galleryImages,
    videos,
    galleryWebs,
    matchedWebs,
    zoomLevel,
    handleImageWheel,
    enlargedImage,
    modalOpen,
    handleImageClick,
    handleModalClose,
  };
}