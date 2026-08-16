"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Edit2, Trash2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ImageZoomModal from "@/components/images/ImageZoomModal";
import RedDotToggleForSold from "@/components/buttons/RedDotToggleForSold";
import SliderDotToggleForMark from "@/components/buttons/SliderDotToggleForMark";
import DividerLine from "@/components/others/DividerLine";
import EditAndDeleteButtonOnManagerCard from "@/components/buttons/EditAndDeleteButtonOnManagerCard";
import useAppType from "@/hooks/useAppType";
import CardMediaPreview from "@/components/images/CardMediaPreview";
import UnderlineTitleAnimation from "@/components/animations/UnderlineTitleAnimation";
import ExpandButton from "@/components/buttons/ExpandButton";
import VideoPlayer from "@/components/videos/VideoPlayer";

// ============================================================
// Animation Variants
// ============================================================
const ANIMATION_VARIANTS = {
  underline: {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { type: "spring", stiffness: 300, damping: 20, duration: 0.3 },
  },
  card: {
    hover: { y: -2, transition: { duration: 0.2 } },
  },
  button: {
    tap: { scale: 0.95 },
    hover: { scale: 1.05 },
  },
  fadeIn: {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
    transition: { duration: 0.25 },
  },
  expand: {
    initial: { height: 0, opacity: 0 },
    animate: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.25, delay: 0.1 },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  },
  accordion: {
    initial: { height: 0, opacity: 0 },
    animate: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
};

// ============================================================
// Default Config
// ============================================================
const DEFAULT_CONFIG = {
  ui: {
    borderStyle: "border-2 border-black dark:border-white",
    shadowStyle: "shadow-md hover:shadow-xl",
    backgroundColor: "bg-white dark:bg-black",
    hoverTransition: "transition-all duration-300 ease-out",
    roundedCorners: "rounded-lg",
    cardHeight: "min-h-[480px] h-auto",
    accordionCardHeight: "min-h-[120px] h-auto",
    spacing: { cardPadding: "p-4", cardMargin: "mb-4" },
  },
  typography: {
    title: {
      className: "font-bold text-black dark:text-white",
      style: { fontSize: "18px", lineHeight: "1.4" },
    },
    sub: {
      className: "text-black dark:text-white",
      style: { fontSize: "13px", lineHeight: "1.3" },
    },
  },
  buttons: {
    expand:
      "p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200",
  },
};

// ============================================================
// Helper function to detect if URL is a video
// ============================================================
const isVideoUrl = (url) => {
  if (!url) return false;
  const videoFormats = [
    ".mp4",
    ".webm",
    ".ogg",
    ".mov",
    ".avi",
    ".mkv",
    ".m3u8",
    "/iframe",
    "/watch",
  ];
  const urlLower = url.toLowerCase();
  return (
    videoFormats.some((format) => urlLower.includes(format)) ||
    urlLower.includes("youtube.com") ||
    urlLower.includes("youtu.be") ||
    urlLower.includes("vimeo.com") ||
    urlLower.includes("cloudflarestream.com")
  );
};

// ============================================================
// Helper function to detect if a field is image-related
// ============================================================
const isImageField = (key) => {
  if (!key) return false;
  const lowerKey = key.toString().toLowerCase();
  return (
    lowerKey.includes("image") ||
    lowerKey.includes("img") ||
    lowerKey.includes("photo") ||
    lowerKey.includes("picture") ||
    lowerKey.includes("avatar") ||
    lowerKey.includes("portrait") ||
    lowerKey.includes("cover")
  );
};

// ============================================================
// Helper function to format field values
// ============================================================
const formatFieldValue = (
  value,
  fieldKey,
  onImageClick,
  isInlineDisplay = false
) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (isImageField(fieldKey) && typeof value === "string" && value.trim()) {
    if (isInlineDisplay) {
      return null;
    }
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "4px",
        }}
      >
        <img
          src={value}
          alt={fieldKey}
          onClick={(e) => {
            e.stopPropagation();
            if (onImageClick) onImageClick(value);
          }}
          onError={(e) => {
            e.target.src = "/error.png";
          }}
          style={{
            width: "64px",
            height: "64px",
            objectFit: "cover",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          className="hover:opacity-80"
        />
        <span
          onClick={(e) => {
            e.stopPropagation();
            if (onImageClick) onImageClick(value);
          }}
          style={{
            fontSize: "11px",
            cursor: "pointer",
            textDecoration: "none",
          }}
          className="hover:underline"
        >
          Click to view
        </span>
      </div>
    );
  }

  if (Array.isArray(value)) {
    const filtered = value.filter(
      (item) => item !== null && item !== undefined && item !== ""
    );
    if (filtered.length === 0) return null;

    return filtered.map((item, index) => (
      <div
        key={index}
        style={{ display: "flex", gap: "8px", marginBottom: "4px" }}
      >
        <div
          style={{
            width: "3px",
            backgroundColor: "var(--text-primary, #000000)",
            flexShrink: 0,
            minHeight: "1em",
          }}
        />
        <div style={{ flex: 1 }} className="break-all max-w-full">
          {String(item)}
        </div>
      </div>
    ));
  }

  return String(value);
};

// ============================================================
// Component to render inline image fields as card images
// ============================================================
const InlineImageDisplay = ({
  fields,
  item,
  onImageClick,
  imageKey,
  videoKey,
  useOriginalSize,
  objectFit,
  maxHeight,
  minHeight,
  customHeight,
  customWidth,
  isCn,
}) => {
  const imageFields = fields.filter(
    (f) =>
      isImageField(f.key) &&
      item[f.key] &&
      typeof item[f.key] === "string" &&
      item[f.key].trim() &&
      f.key !== imageKey &&
      f.key !== videoKey
  );

  if (imageFields.length === 0) return null;

  return (
    <>
      {imageFields.map((field) => (
        <CardMediaPreview
          key={field.key}
          hasVideo={false}
          hasImage={true}
          videoUrl={null}
          imageUrl={item[field.key]}
          altText={field.label}
          onPreview={(e) => {
            e.stopPropagation();
            onImageClick(item[field.key]);
          }}
          isCn={isCn}
          useOriginalSize={useOriginalSize}
          customHeight={customHeight}
          customWidth={customWidth}
          maxHeight={maxHeight}
          minHeight={minHeight}
          objectFit={objectFit}
        />
      ))}
    </>
  );
};

// ============================================================
// Shared sub-components to avoid duplication
// ============================================================

/** Title + underline animation */
const CardTitle = ({ titleValue, isHovered, setIsHovered, merged }) => (
  <div
    className="relative mb-3 inline-block w-full"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <UnderlineTitleAnimation
      title={titleValue}
      isHovered={isHovered}
      className={merged.typography.title.className}
      style={{
        ...merged.typography.title.style,
        position: "relative",
        display: "inline-block",
      }}
    />
  </div>
);

/** Summary row – with word break for long text */
const SummaryRow = ({ summaryFields, item, merged, handleInlineImageClick }) => {
  if (summaryFields.length === 0) return null;
  return (
    <div
      className="flex items-center gap-2 flex-wrap w-full mb-3 text-black dark:text-white"
      style={merged.typography.sub.style}
    >
      {summaryFields.map((f, index, arr) => {
        const value = formatFieldValue(
          item[f.key],
          f.key,
          handleInlineImageClick,
          true
        );
        if (!value) return null;

        return (
          <React.Fragment key={f.key}>
            <span>
              <span className="font-medium">{f.label}:</span>{" "}
              <span className="break-all max-w-full inline-block">
                {value}
              </span>
            </span>
            {index < arr.length - 1 && (
              <span className="text-gray-400"> / </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/** Expanded detail section (video + fields) – with word break */
const ExpandedDetails = ({
  expanded,
  hasDetailFields,
  hasVideo,
  validVideoUrl,
  detailFields,
  item,
  handleInlineImageClick,
}) => (
  <AnimatePresence>
    {expanded && (hasDetailFields || hasVideo) && (
      <motion.div
        variants={ANIMATION_VARIANTS.expand}
        initial="initial"
        animate="animate"
        exit="exit"
        className="mb-4 w-full"
      >
        {hasVideo && validVideoUrl && (
          <div
            className="w-full aspect-video mb-4 rounded overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <VideoPlayer
              videoUrl={validVideoUrl}
              controls={true}
              className="w-full h-full"
            />
          </div>
        )}

        {hasDetailFields && (
          <>
            <DividerLine />
            <div className="max-h-64 overflow-y-auto pr-2 w-full">
              {detailFields.map((f) => {
                const value = formatFieldValue(
                  item[f.key],
                  f.key,
                  handleInlineImageClick,
                  true
                );
                if (!value) return null;

                return (
                  <motion.div
                    key={f.key}
                    className="text-black dark:text-white mb-2 w-full"
                    style={{ fontSize: "12px" }}
                    variants={ANIMATION_VARIANTS.fadeIn}
                  >
                    <span className="font-medium">{f.label}:</span>{" "}
                    <div
                      className={`${
                        Array.isArray(item[f.key]) ? "mt-1" : "inline"
                      } break-all max-w-full`}
                    >
                      {value}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

/** Edit/Delete action buttons */
const ActionButtons = ({ showActions, onEdit, onDelete, item, isCn }) => {
  if (!showActions) return null;
  return (
    <div className="mt-auto mb-4 flex items-center justify-center gap-4">
      <EditAndDeleteButtonOnManagerCard
        icon={Edit2}
        onClick={(e) => {
          e?.stopPropagation?.();
          onEdit(item._id || item.id);
        }}
        label={isCn ? "编辑" : "Edit"}
        isEdit
      />
      <DividerLine />
      <EditAndDeleteButtonOnManagerCard
        icon={Trash2}
        onClick={(e) => {
          e?.stopPropagation?.();
          onDelete(item);
        }}
        label={isCn ? "删除" : "Delete"}
        danger
      />
    </div>
  );
};

/** Order number badge */
const OrderBadge = ({ orderNumber, item }) => {
  if (!orderNumber && !item.order) return null;
  return (
    <motion.div
      className="absolute bottom-2 left-2 z-20 text-black dark:text-white font-mono text-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ fontSize: "11px", fontWeight: "500" }}
    >
      {orderNumber || item.order}
    </motion.div>
  );
};

/** Sold dot badge */
const SoldBadge = ({ item }) => {
  if (
    typeof item.sold === "undefined" ||
    item.sold === null ||
    item.sold === ""
  )
    return null;
  return (
    <div className="absolute bottom-2 right-2 z-20">
      <RedDotToggleForSold sold={item.sold} />
    </div>
  );
};

// ============================================================
// Main Component
// ============================================================
const ManagerCard = ({
  item = {},
  fields = [],
  titleField,
  imageKey = "img_url",
  videoKey = "video_url",
  showActions = true,
  summaryFieldCount = 2,
  isCn = false,
  style = {},
  config = DEFAULT_CONFIG,
  orderNumber = null,
  onEdit,
  onDelete,
  onCardClick,
  onImageClick,
  // --- Flexible image sizing props ---
  useOriginalSize = false,
  customHeight = null,
  customWidth = null,
  maxHeight = 800,
  minHeight = 0,
  objectFit = "cover",
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const isArtistweb = useAppType();

  const merged = useMemo(
    () => ({
      ...DEFAULT_CONFIG,
      ...config,
      ui: { ...DEFAULT_CONFIG.ui, ...config.ui },
      typography: { ...DEFAULT_CONFIG.typography, ...config.typography },
    }),
    [config]
  );

  // ---------- Derived ----------
  const videoUrl = item[videoKey];
  const imageUrl = item[imageKey];

  const hasVideo = useMemo(() => isVideoUrl(videoUrl), [videoUrl]);
  const hasImage = !!imageUrl;
  const hasMedia = hasVideo || hasImage;

  const hasVideoOnly = hasVideo && !hasImage;

  const validImageUrl = hasImage ? imageUrl : "/placeholder.png";
  const validVideoUrl = hasVideo ? videoUrl : null;

  const titleValue = useMemo(() => {
    if (titleField && item[titleField]) return item[titleField];
    const first = fields.find((f) => item[f.key]);
    return first ? item[first.key] : "Untitled";
  }, [titleField, item, fields]);

  const titleFieldKey = useMemo(() => {
    if (titleField) return titleField;
    const firstFieldWithValue = fields.find((f) => item[f.key]);
    return firstFieldWithValue?.key || null;
  }, [titleField, fields, item]);

  const displayFields = useMemo(() => {
    return fields.filter((f) => {
      if (f.key === titleFieldKey) return false;
      if (f.key === imageKey || f.key === videoKey) return false;

      const value = item[f.key];

      if (Array.isArray(value)) {
        const filtered = value.filter(
          (v) => v !== null && v !== undefined && v !== ""
        );
        return filtered.length > 0;
      }

      return value !== null && value !== undefined && value !== "";
    });
  }, [fields, titleFieldKey, item, imageKey, videoKey]);

  const summaryFields = useMemo(
    () => displayFields.slice(0, summaryFieldCount),
    [displayFields, summaryFieldCount]
  );

  const detailFields = useMemo(
    () => displayFields.slice(summaryFieldCount),
    [displayFields, summaryFieldCount]
  );

  const hasDetailFields = detailFields.length > 0;
  const hasExpandableContent = hasVideoOnly ? true : hasDetailFields;

  const handlePreview = useCallback(
    (e) => {
      e.stopPropagation();
      if (hasVideo) return;
      if (onImageClick) onImageClick(validImageUrl);
      else {
        setPreviewImageUrl(validImageUrl);
        setShowPreview(true);
      }
    },
    [hasVideo, validImageUrl, onImageClick]
  );

  const handleToggleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const handleAccordionClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (hasExpandableContent) {
        setExpanded((prev) => !prev);
      }
    },
    [hasExpandableContent]
  );

  const handleInlineImageClick = useCallback(
    (imgUrl) => {
      if (onImageClick) {
        onImageClick(imgUrl);
      } else {
        setPreviewImageUrl(imgUrl);
        setShowPreview(true);
      }
    },
    [onImageClick]
  );

  const handleClosePreview = useCallback(() => {
    setShowPreview(false);
    setPreviewImageUrl(null);
  }, []);

  // Shared media sizing props
  const mediaSizingProps = {
    useOriginalSize,
    customHeight,
    customWidth,
    maxHeight,
    minHeight,
    objectFit,
  };

  // ============================================================
  // ACCORDION CARD (No Media OR Video-Only)
  // ============================================================
  if (!hasMedia || hasVideoOnly) {
    return (
      <motion.div
        className={`
          ${merged.ui.backgroundColor}
          ${merged.ui.borderStyle}
          ${merged.ui.shadowStyle}
          ${merged.ui.hoverTransition}
          ${merged.ui.roundedCorners}
          ${merged.ui.accordionCardHeight}
          ${merged.ui.spacing.cardMargin}
          overflow-hidden relative flex flex-col w-full
        `}
        style={style}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Mark Toggle Dot */}
        <SliderDotToggleForMark mark={item.mark} isCn={isCn} />

        {/* Inline Image Fields Display */}
        <InlineImageDisplay
          fields={fields}
          item={item}
          onImageClick={handleInlineImageClick}
          imageKey={imageKey}
          videoKey={videoKey}
          isCn={isCn}
          {...mediaSizingProps}
        />

        <div
          className={`${merged.ui.spacing.cardPadding} flex flex-col flex-grow relative w-full`}
        >
          {/* Accordion Header */}
          <div
            className={`flex items-center justify-between group w-full ${
              hasExpandableContent ? "cursor-pointer" : ""
            }`}
            onClick={handleAccordionClick}
          >
            <div
              className="relative flex-grow"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <UnderlineTitleAnimation
                title={titleValue}
                isHovered={isHovered}
                className={merged.typography.title.className}
                style={{
                  ...merged.typography.title.style,
                  position: "relative",
                  display: "inline-block",
                }}
              />
            </div>

            {hasExpandableContent && (
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-4 text-black dark:text-white flex-shrink-0"
              >
                <ChevronDown size={24} />
              </motion.div>
            )}
          </div>

          {/* Summary Row – with break-all and max-width */}
          {summaryFields.length > 0 && (
            <div
              className="flex items-center gap-2 flex-wrap w-full mt-3 text-black dark:text-white"
              style={merged.typography.sub.style}
            >
              {summaryFields.map((f, index, arr) => {
                const value = formatFieldValue(
                  item[f.key],
                  f.key,
                  handleInlineImageClick,
                  true
                );
                if (!value) return null;

                return (
                  <React.Fragment key={f.key}>
                    <span>
                      <span className="font-medium">{f.label}:</span>{" "}
                      <span className="break-all max-w-full inline-block">
                        {value}
                      </span>
                    </span>
                    {index < arr.length - 1 && (
                      <span className="text-gray-400"> / </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Expanded Content */}
          <AnimatePresence>
            {expanded && hasExpandableContent && (
              <motion.div
                variants={ANIMATION_VARIANTS.accordion}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-4 w-full"
              >
                {hasVideoOnly && validVideoUrl && (
                  <div
                    className="w-full aspect-video mb-4 rounded overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <VideoPlayer
                      videoUrl={validVideoUrl}
                      controls={true}
                      className="w-full h-full"
                    />
                  </div>
                )}

                {hasDetailFields && (
                  <>
                    <DividerLine />
                    <div className="max-h-96 overflow-y-auto pr-2 mt-3 w-full">
                      {detailFields.map((f) => {
                        const value = formatFieldValue(
                          item[f.key],
                          f.key,
                          handleInlineImageClick,
                          true
                        );
                        if (!value) return null;

                        return (
                          <motion.div
                            key={f.key}
                            className="text-black dark:text-white mb-3 w-full"
                            style={{ fontSize: "12px" }}
                            variants={ANIMATION_VARIANTS.fadeIn}
                          >
                            <span className="font-medium">{f.label}:</span>{" "}
                            <div
                              className={`${
                                Array.isArray(item[f.key]) ? "mt-1" : "inline"
                              } break-all max-w-full`}
                            >
                              {value}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Edit/Delete inside expanded */}
                <ActionButtons
                  showActions={showActions}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  item={item}
                  isCn={isCn}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit/Delete when collapsed */}
          {showActions && !expanded && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <EditAndDeleteButtonOnManagerCard
                icon={Edit2}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item._id || item.id);
                }}
                label={isCn ? "编辑" : "Edit"}
                isEdit
              />
              <DividerLine />
              <EditAndDeleteButtonOnManagerCard
                icon={Trash2}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                }}
                label={isCn ? "删除" : "Delete"}
                danger
              />
            </div>
          )}

          <OrderBadge orderNumber={orderNumber} item={item} />
        </div>

        <ImageZoomModal
          isOpen={showPreview}
          onClose={handleClosePreview}
          imageUrl={previewImageUrl}
          title={titleValue}
          enableGifRestart
        />
      </motion.div>
    );
  }

  // ============================================================
  // STANDARD CARD (With Image — may also have video)
  // ============================================================

  // Shared card body content (title, summary, expand, actions, badges)
  const renderCardBody = () => (
    <div
      className={`${merged.ui.spacing.cardPadding} flex flex-col flex-grow relative w-full`}
    >
      <CardTitle
        titleValue={titleValue}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        merged={merged}
      />

      <SummaryRow
        summaryFields={summaryFields}
        item={item}
        merged={merged}
        handleInlineImageClick={handleInlineImageClick}
      />

      <ExpandedDetails
        expanded={expanded}
        hasDetailFields={hasDetailFields}
        hasVideo={hasVideo}
        validVideoUrl={validVideoUrl}
        detailFields={detailFields}
        item={item}
        handleInlineImageClick={handleInlineImageClick}
      />

      {/* Expand Button */}
      {(hasDetailFields || hasVideo) && (
        <div
          className="flex justify-center mb-2"
          onClick={(e) => e.stopPropagation()}
        >
          <ExpandButton
            expanded={expanded}
            isCn={isCn}
            onToggle={handleToggleExpand}
          />
        </div>
      )}

      <ActionButtons
        showActions={showActions}
        onEdit={onEdit}
        onDelete={onDelete}
        item={item}
        isCn={isCn}
      />

      <OrderBadge orderNumber={orderNumber} item={item} />
      <SoldBadge item={item} />
    </div>
  );

  return (
    <>
      <motion.div
        className={`
          ${merged.ui.backgroundColor}
          ${merged.ui.borderStyle}
          ${merged.ui.shadowStyle}
          ${merged.ui.hoverTransition}
          ${merged.ui.roundedCorners}
          ${merged.ui.spacing.cardMargin}
          overflow-hidden relative cursor-pointer flex flex-col w-full
          ${useOriginalSize ? "items-center" : ""}
        `}
        style={{
          // When useOriginalSize: no min-height constraint, let image dictate size
          // When NOT useOriginalSize: use the default cardHeight min-h
          ...(useOriginalSize
            ? { height: "auto", width: customWidth || "100%" }
            : {}),
          ...style,
        }}
        data-original-size={useOriginalSize ? "true" : "false"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onCardClick}
        whileHover={ANIMATION_VARIANTS.card.hover}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {useOriginalSize ? (
          /* ── Original-size layout (like SeriesCard) ── */
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Image at original resolution */}
            <CardMediaPreview
              hasVideo={false}
              hasImage={hasImage}
              videoUrl={null}
              imageUrl={validImageUrl}
              altText={titleValue}
              onPreview={handlePreview}
              isCn={isCn}
              {...mediaSizingProps}
            />

            <InlineImageDisplay
              fields={fields}
              item={item}
              onImageClick={handleInlineImageClick}
              imageKey={imageKey}
              videoKey={videoKey}
              isCn={isCn}
              {...mediaSizingProps}
            />

            <SliderDotToggleForMark mark={item.mark} isCn={isCn} />

            {renderCardBody()}
          </div>
        ) : (
          /* ── Fixed-height layout (default) ── */
          <>
            <CardMediaPreview
              hasVideo={false}
              hasImage={hasImage}
              videoUrl={null}
              imageUrl={validImageUrl}
              altText={titleValue}
              onPreview={handlePreview}
              isCn={isCn}
              {...mediaSizingProps}
            />

            <InlineImageDisplay
              fields={fields}
              item={item}
              onImageClick={handleInlineImageClick}
              imageKey={imageKey}
              videoKey={videoKey}
              isCn={isCn}
              {...mediaSizingProps}
            />

            <SliderDotToggleForMark mark={item.mark} isCn={isCn} />

            {renderCardBody()}
          </>
        )}
      </motion.div>

      <ImageZoomModal
        isOpen={showPreview}
        onClose={handleClosePreview}
        imageUrl={previewImageUrl || validImageUrl}
        title={titleValue}
        enableGifRestart
      />
    </>
  );
};

export default React.memo(ManagerCard);
export { DEFAULT_CONFIG };