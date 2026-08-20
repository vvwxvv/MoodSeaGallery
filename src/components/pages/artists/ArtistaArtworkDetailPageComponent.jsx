"use client";

import React, { useState, useContext, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { DeviceContext } from "@/components/contexts/DeviceContext";
import useFont from "@/hooks/useFont";
import { useReverseTheme } from "@/hooks/useReverseTheme";
import useData from "@/hooks/useData";
import { filterByLanguage } from "@/utils/filterByLanguage";
import LoadingLayer from "@/components/animations/LoadingLayer";
import AlertInfo from "@/components/alerts/AlertInfo";
import EnquirePopup from "@/components/popups/EnquirePopup";
import useArtworkSlugData from "@/components/pages/artists/hooks/useArtworkSlugData";

// =============================================================================
// PRODUCTION DESIGN TOKENS & CONFIGURATION
// =============================================================================
const DESIGN_TOKENS = {
  container: {
    maxWidth: "1600px",
    paddingPaddingX: { xs: "16px", sm: "32px", md: "48px" },
  },
  colors: {
    relatedText: "#4A4A4A",
    relatedTextMuted: "#737373",
    imagePlaceholderBg: "rgba(0, 0, 0, 0.04)",
    dividerBorder: "rgba(0, 0, 0, 0.1)",
  },
  relatedWorks: {
    maxItemsToShow: 6,
    gridMinColumnWidth: { mobile: "140px", desktop: "200px" },
    gridGap: { mobile: "16px", desktop: "32px" },
    thumbnailAspectRatio: "100%",
    hoverScale: 1.03,
  },
  transitions: {
    smoothEase: "0.25s ease-in-out",
    scaleEase: "0.4s ease",
  },
};

// =============================================================================
// RELATED ARTWORK THUMBNAIL COMPONENT
// =============================================================================
function RelatedArtworkThumb({ artwork, fontFamily, isCn, isMobile }) {
  if (!artwork) return null;

  const [isHovered, setIsHovered] = useState(false);

  const slug = (artwork.title || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  return (
    <Link
      href={`/artworks/${slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          width: "100%",
          paddingBottom: DESIGN_TOKENS.relatedWorks.thumbnailAspectRatio,
          position: "relative",
          overflow: "hidden",
          marginBottom: "12px",
          backgroundColor: DESIGN_TOKENS.colors.imagePlaceholderBg,
        }}
      >
        {artwork.cover_img_url ? (
          <img
            src={artwork.cover_img_url}
            alt={artwork.title || "Related Artwork"}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: isHovered
                ? `scale(${DESIGN_TOKENS.relatedWorks.hoverScale})`
                : "scale(1)",
              transition: `transform ${DESIGN_TOKENS.transitions.scaleEase}`,
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily,
                fontSize: "10px",
                color: DESIGN_TOKENS.colors.relatedTextMuted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              No Image
            </span>
          </div>
        )}
      </div>

      <p
        style={{
          fontFamily,
          fontSize: isMobile ? "10px" : "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: DESIGN_TOKENS.colors.relatedText,
          margin: "0 0 4px",
        }}
      >
        {artwork.artist || ""}
      </p>

      <div style={{ display: "inline-block", position: "relative" }}>
        <p
          style={{
            fontFamily,
            fontSize: isMobile ? "11px" : "12px",
            fontStyle: "italic",
            color: DESIGN_TOKENS.colors.relatedText,
            margin: "0 0 4px",
            lineHeight: 1.3,
          }}
        >
          {artwork.title || (isCn ? "无题" : "Untitled")}
        </p>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "2px",
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: DESIGN_TOKENS.colors.relatedText,
            transformOrigin: "left",
          }}
        />
      </div>

      <p
        style={{
          fontFamily,
          fontSize: isMobile ? "10px" : "11px",
          color: DESIGN_TOKENS.colors.relatedTextMuted,
          margin: "4px 0 0",
        }}
      >
        {[artwork.year, artwork.medium].filter(Boolean).join(", ")}
      </p>
    </Link>
  );
}

// =============================================================================
// SKELETON LOADER — 与最终页面布局完全匹配
// =============================================================================
const shimmerKeyframes = `
@keyframes awd-shimmer {
  0% { backgroundPosition: -400px 0; }
  100% { backgroundPosition: 400px 0; }
}
@keyframes awd-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
`;

const shimmerStyle = {
  background:
    "linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.15) 37%, rgba(0,0,0,0.06) 63%)",
  backgroundSize: "400px 100%",
  animation: "awd-shimmer 1.2s ease infinite",
  borderRadius: "2px",
};

function ArtworkDetailSkeleton({ isMobile, isTablet, isCn }) {
  const { fontFamily } = useFont();
  const { colors } = useReverseTheme();
  const text = colors.text;
  const bg = colors.background;

  const px = isMobile
    ? DESIGN_TOKENS.container.paddingPaddingX.xs
    : isTablet
    ? DESIGN_TOKENS.container.paddingPaddingX.sm
    : DESIGN_TOKENS.container.paddingPaddingX.md;

  useEffect(() => {
    if (!document.getElementById("awd-shimmer-style")) {
      const style = document.createElement("style");
      style.id = "awd-shimmer-style";
      style.textContent = shimmerKeyframes;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={{ backgroundColor: bg, color: text, minHeight: "100vh" }}>
      {/* 顶部加载指示条 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.3), transparent)",
          backgroundSize: "200% 100%",
          animation: "awd-shimmer 0.8s ease infinite",
          zIndex: 9999,
        }}
      />
      <LoadingLayer isLoading />
      <div
        style={{
          maxWidth: DESIGN_TOKENS.container.maxWidth,
          margin: "0 auto",
          padding: `0 ${px}`,
        }}
      >
        {/* 返回链接占位 */}
        <div style={{ paddingTop: isMobile ? "16px" : "24px" }}>
          <div
            style={{
              ...shimmerStyle,
              width: "120px",
              height: "11px",
              opacity: 0.5,
            }}
          />
        </div>

        {/* 主内容区域：图片 + 信息 */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "32px" : "48px",
            padding: `${isMobile ? "24px" : "40px"} 0 64px`,
          }}
        >
          <div style={{ flex: isMobile ? "none" : "1 1 55%", minWidth: 0 }}>
            <div
              style={{
                ...shimmerStyle,
                width: "100%",
                paddingBottom: "75%",
                borderRadius: "0",
              }}
            />
          </div>
          <div
            style={{
              flex: "1 1 45%",
              minWidth: isMobile ? "100%" : "280px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ ...shimmerStyle, width: "40%", height: "12px" }} />
            <div style={{ ...shimmerStyle, width: "80%", height: "24px" }} />
            <div style={{ ...shimmerStyle, width: "100%", height: "14px" }} />
            <div style={{ ...shimmerStyle, width: "65%", height: "14px" }} />
            <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <div style={{ ...shimmerStyle, width: "70px", height: "11px" }} />
                <div style={{ ...shimmerStyle, width: "140px", height: "11px" }} />
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <div style={{ ...shimmerStyle, width: "70px", height: "11px" }} />
                <div style={{ ...shimmerStyle, width: "100px", height: "11px" }} />
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <div style={{ ...shimmerStyle, width: "70px", height: "11px" }} />
                <div style={{ ...shimmerStyle, width: "160px", height: "11px" }} />
              </div>
            </div>
            <div style={{ ...shimmerStyle, width: "90%", height: "13px", marginTop: "8px" }} />
            <div style={{ ...shimmerStyle, width: "75%", height: "13px" }} />
            <div style={{ marginTop: "16px" }}>
              <div style={{ ...shimmerStyle, width: "80px", height: "11px" }} />
            </div>
          </div>
        </div>

        {/* 相关作品网格占位 */}
        <div
          style={{
            paddingTop: "40px",
            paddingBottom: "80px",
            borderTop: `1px solid rgba(0,0,0,0.08)`,
          }}
        >
          <div
            style={{
              ...shimmerStyle,
              width: "100px",
              height: "11px",
              marginBottom: "32px",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fill, minmax(${
                isMobile
                  ? DESIGN_TOKENS.relatedWorks.gridMinColumnWidth.mobile
                  : DESIGN_TOKENS.relatedWorks.gridMinColumnWidth.desktop
              }, 1fr))`,
              gap: isMobile
                ? DESIGN_TOKENS.relatedWorks.gridGap.mobile
                : DESIGN_TOKENS.relatedWorks.gridGap.desktop,
            }}
          >
            {Array.from({ length: isMobile ? 4 : 6 }).map((_, i) => (
              <div key={i}>
                <div
                  style={{
                    ...shimmerStyle,
                    width: "100%",
                    paddingBottom: "100%",
                    marginBottom: "12px",
                    borderRadius: "0",
                  }}
                />
                <div
                  style={{
                    ...shimmerStyle,
                    width: "60%",
                    height: "10px",
                    marginBottom: "6px",
                  }}
                />
                <div
                  style={{
                    ...shimmerStyle,
                    width: "90%",
                    height: "11px",
                    marginBottom: "4px",
                  }}
                />
                <div
                  style={{
                    ...shimmerStyle,
                    width: "45%",
                    height: "10px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN ARTWORK DETAIL PAGE COMPONENT
// =============================================================================
export default function ArtistaArtworkDetailPageComponent({
  artworkSlug,
  artistSlug,
}) {
  const { isCn } = useContext(LanguageContext);
  const { isMobile, isTablet } = useContext(DeviceContext);
  const { fontFamily } = useFont();
  const { colors } = useReverseTheme();

  const primaryText = colors.text;
  const pageBg = colors.background;

  const responsivePaddingX = isMobile
    ? DESIGN_TOKENS.container.paddingPaddingX.xs
    : isTablet
    ? DESIGN_TOKENS.container.paddingPaddingX.sm
    : DESIGN_TOKENS.container.paddingPaddingX.md;

  const [showEnquire, setShowEnquire] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  // 获取主要作品数据
  const { artwork, loading, error } = useArtworkSlugData(artworkSlug, isCn);
  // 获取所有作品用于“相关作品”
  const { data: allArtworks = [], isLoading: allArtworksLoading } = useData("/api/artwork");

  // 过滤同艺术家的相关作品
  const relatedWorks = useMemo(() => {
    if (!artwork?.artist || !Array.isArray(allArtworks)) return [];
    const filtered = filterByLanguage(allArtworks, isCn);
    const key = (artwork.artist || "").trim().toLowerCase();
    return filtered.filter(
      (item) =>
        (item.artist || "").trim().toLowerCase() === key &&
        item.title !== artwork.title
    );
  }, [allArtworks, artwork, isCn]);

  // 🔥 关键：合并加载状态，任何一部分在加载中都显示骨架
  const allLoading = loading || allArtworksLoading;

  // ----- 渲染决策（顺序很重要）-----
  // 1. 加载中 → 骨架屏
  if (allLoading) {
    return <ArtworkDetailSkeleton isMobile={isMobile} isTablet={isTablet} isCn={isCn} />;
  }

  // 2. 错误 → 错误提示
  if (error) {
    return (
      <AlertInfo
        message={isCn ? "加载失败" : "Loading Failed"}
        subMessage={isCn ? "请重试" : "Please retry"}
        buttonText={isCn ? "重试" : "Retry"}
        onBack={() => window.location.reload()}
        isCn={isCn}
      />
    );
  }

  // 3. 只有完全加载完成且无错误时，才判断数据是否存在
  //    此时如果 artwork 为空，说明确实没有找到
  if (!artwork) {
    return (
      <div
        style={{
          padding: `80px ${responsivePaddingX}`,
          textAlign: "center",
          backgroundColor: pageBg,
        }}
      >
        <p
          style={{
            fontFamily,
            fontSize: "14px",
            color: primaryText,
            opacity: 0.4,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {isCn ? "未找到作品" : "Artwork not found"}
        </p>
      </div>
    );
  }

  // ----- 正常渲染 -----
  const metadata = [
    { label: isCn ? "年份" : "Year", value: artwork.year },
    { label: isCn ? "媒介" : "Medium", value: artwork.medium },
    { label: isCn ? "尺寸" : "Size", value: artwork.size },
    { label: isCn ? "系列" : "Series", value: artwork.series },
    { label: isCn ? "时长" : "Duration", value: artwork.duration },
    { label: isCn ? "致谢" : "Credits", value: artwork.credits },
    {
      label: isCn ? "特别感谢" : "Special Thanks",
      value: artwork.special_thanks,
    },
    { label: isCn ? "作品价值" : "Work Value", value: artwork.work_value },
  ].filter((item) => item.value);

  return (
    <div style={{ backgroundColor: pageBg, color: primaryText, minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: DESIGN_TOKENS.container.maxWidth,
          margin: "0 auto",
          padding: `0 ${responsivePaddingX}`,
        }}
      >
        {/* 返回链接 */}
        <div style={{ paddingTop: isMobile ? "16px" : "24px" }}>
          <Link
            href={artistSlug ? `/artists/${artistSlug}` : "/artists"}
            style={{
              fontFamily,
              fontSize: isMobile ? "10px" : "11px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: primaryText,
              textDecoration: "none",
              opacity: 0.5,
            }}
          >
            ← {isCn ? "返回艺术家" : "Back to Artist"}
          </Link>
        </div>

        {/* 主内容 */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "32px" : "48px",
            padding: `${isMobile ? "24px" : "40px"} 0 64px`,
          }}
        >
          {/* 图片 */}
          <div style={{ flex: isMobile ? "none" : "1 1 55%", minWidth: 0 }}>
            {artwork.cover_img_url ? (
              <img
                src={artwork.cover_img_url}
                alt={artwork.title || "Artwork"}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  paddingBottom: "80%",
                  backgroundColor: DESIGN_TOKENS.colors.imagePlaceholderBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily,
                    fontSize: "11px",
                    color: primaryText,
                    opacity: 0.2,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* 元数据 */}
          <div style={{ flex: "1 1 45%", minWidth: isMobile ? "100%" : "280px" }}>
            <p
              style={{
                fontFamily,
                fontSize: isMobile ? "11px" : "12px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: primaryText,
                margin: "0 0 12px",
                opacity: 0.85,
              }}
            >
              {artwork.artist || (isCn ? "佚名" : "Unknown")}
            </p>

            <h1
              style={{
                fontFamily,
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: 400,
                color: primaryText,
                margin: "0 0 16px",
                letterSpacing: "0.02em",
                lineHeight: 1.3,
              }}
            >
              <em>{artwork.title || (isCn ? "无题" : "Untitled")}</em>
            </h1>

            {artwork.caption && (
              <p
                style={{
                  fontFamily,
                  fontSize: isMobile ? "12px" : "13px",
                  color: primaryText,
                  margin: "0 0 20px",
                  lineHeight: 1.7,
                  opacity: 0.85,
                }}
              >
                {artwork.caption}
              </p>
            )}

            {metadata.length > 0 && (
              <div
                style={{
                  marginBottom: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {metadata.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "12px",
                      fontFamily,
                      fontSize: isMobile ? "11px" : "12px",
                    }}
                  >
                    <span
                      style={{
                        opacity: 0.5,
                        minWidth: isMobile ? "60px" : "80px",
                        flexShrink: 0,
                      }}
                    >
                      {item.label}
                    </span>
                    <span style={{ opacity: 0.85 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            {artwork.introduction?.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                {artwork.introduction.map((para, idx) => (
                  <p
                    key={idx}
                    style={{
                      fontFamily,
                      fontSize: isMobile ? "12px" : "13px",
                      color: primaryText,
                      margin: "0 0 12px",
                      lineHeight: 1.7,
                      opacity: 0.8,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Enquire 按钮 */}
            <div style={{ display: "inline-block", marginTop: "8px" }}>
              <button
                onClick={() => setShowEnquire(true)}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
                style={{
                  backgroundColor: "transparent",
                  borderStyle: "none",
                  borderWidth: 0,
                  outline: "none",
                  padding: "2px 0",
                  fontFamily,
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: primaryText,
                  cursor: "pointer",
                  position: "relative",
                  WebkitAppearance: "none",
                }}
              >
                {isCn ? "咨询" : "Enquire"}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isBtnHovered ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    backgroundColor: primaryText,
                    transformOrigin: "left",
                  }}
                />
              </button>
            </div>

            {/* 外部链接 */}
            {(artwork.video_url || artwork.web_url) && (
              <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                {artwork.video_url && (
                  <a
                    href={artwork.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily,
                      fontSize: "11px",
                      color: primaryText,
                      opacity: 0.6,
                      textDecoration: "underline",
                      textUnderlineOffset: "4px",
                    }}
                  >
                    {isCn ? "视频" : "Video"}
                  </a>
                )}
                {artwork.web_url && (
                  <a
                    href={artwork.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily,
                      fontSize: "11px",
                      color: primaryText,
                      opacity: 0.6,
                      textDecoration: "underline",
                      textUnderlineOffset: "4px",
                    }}
                  >
                    {isCn ? "网站" : "Website"}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 相关作品 */}
        {relatedWorks.length > 0 && (
          <div
            style={{
              paddingTop: "40px",
              paddingBottom: "80px",
              borderTop: `1px solid ${DESIGN_TOKENS.colors.dividerBorder}`,
            }}
          >
            <p
              style={{
                fontFamily,
                fontSize: isMobile ? "10px" : "11px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: DESIGN_TOKENS.colors.relatedText,
                margin: "0 0 32px",
                paddingBottom: "8px",
                borderBottom: `2px solid ${DESIGN_TOKENS.colors.relatedText}`,
                display: "inline-block",
              }}
            >
              {isCn ? "更多作品" : "More Works"}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fill, minmax(${
                  isMobile
                    ? DESIGN_TOKENS.relatedWorks.gridMinColumnWidth.mobile
                    : DESIGN_TOKENS.relatedWorks.gridMinColumnWidth.desktop
                }, 1fr))`,
                gap: isMobile
                  ? DESIGN_TOKENS.relatedWorks.gridGap.mobile
                  : DESIGN_TOKENS.relatedWorks.gridGap.desktop,
              }}
            >
              {relatedWorks
                .slice(0, DESIGN_TOKENS.relatedWorks.maxItemsToShow)
                .map((rwItem, idx) => (
                  <motion.div
                    key={rwItem._id || rwItem.id || idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  >
                    <RelatedArtworkThumb
                      artwork={rwItem}
                      fontFamily={fontFamily}
                      isCn={isCn}
                      isMobile={isMobile}
                    />
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* 咨询弹窗 */}
      <EnquirePopup
        isOpen={showEnquire}
        onClose={() => setShowEnquire(false)}
        artwork={artwork}
        isCn={isCn}
        fontFamily={fontFamily}
        colors={colors}
      />
    </div>
  );
}