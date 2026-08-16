"use client";

import React, { useContext, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { DeviceContext } from "@/components/contexts/DeviceContext";
import useFont from "@/hooks/useFont";
import { useReverseTheme } from "@/hooks/useReverseTheme";
import useData from "@/hooks/useData";
import { filterByLanguage } from "@/utils/filterByLanguage";
import { normalizeName } from "@/components/pages/artists/hooks/useArtistDetailData";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import AlertInfo from "@/components/alerts/AlertInfo";
import EnquirePopup from "@/components/popups/EnquirePopup";

const EDGE = 50;
const PORTRAIT_MAX_WIDTH = 480;

// Cover video behavior — same convention as ArtworkPageComponent.jsx.
// Portrait hero autoplays immediately (no hover needed); the works grid
// plays on hover, matching the artwork page.
const PORTRAIT_VIDEO_AUTOPLAY_MODE = "always";
const WORK_VIDEO_AUTOPLAY_MODE = "hover";

function ArtworkCell({ artwork, index, text, isCn, isMobile, onEnquire }) {
  const { fontFamily: fallbackFont } = useFont("artworkCardFallback");
  const { fontFamily: artistFont } = useFont("artworkCardArtist");
  const { fontFamily: captionFont } = useFont("artworkCardCaption");
  const { fontFamily: metaFont } = useFont("artworkCardMeta");
  const { fontFamily: enquireFont } = useFont("artworkCardEnquire");

  const slug = String(artwork.title || artwork._id || artwork.id || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\p{L}\p{N}_-]/gu, "");
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const autoplayAlways = WORK_VIDEO_AUTOPLAY_MODE === "always";

  const handleMediaEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    if (!autoplayAlways && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };
  const handleMediaLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    if (!autoplayAlways && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: isMobile ? 0 : (index % 12) * 0.03, duration: 0.4 }}
      style={{ breakInside: "avoid", marginBottom: "48px" }}
    >
      <Link
        href={`/artworks/${slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        <div style={{ width: "100%", paddingBottom: "100%", position: "relative", overflow: "hidden", backgroundColor: "rgba(0,0,0,0.03)" }}>
          {artwork.cover_video_url ? (
            <video
              ref={videoRef}
              src={artwork.cover_video_url}
              poster={artwork.cover_img_url || undefined}
              autoPlay={autoplayAlways}
              muted
              loop
              playsInline
              preload="metadata"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
              onMouseEnter={handleMediaEnter}
              onMouseLeave={handleMediaLeave}
            />
          ) : artwork.cover_img_url ? (
            <img
              src={artwork.cover_img_url}
              alt={artwork.title || ""}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
              onMouseEnter={handleMediaEnter}
              onMouseLeave={handleMediaLeave}
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: fallbackFont, fontSize: "10px", color: text, opacity: 0.2, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {isCn ? "无图片" : "No Image"}
              </span>
            </div>
          )}
        </div>

        <div style={{ marginTop: "16px" }}>
          <p style={{ fontFamily: artistFont, fontSize: isMobile ? "12px" : "14px", fontWeight: 400, color: text, margin: "0 0 12px" }}>
            {artwork.artist || (isCn ? "佚名" : "Unknown")}
          </p>

          <p style={{ fontFamily: captionFont, fontSize: isMobile ? "11px" : "12px", fontWeight: 300, color: text, margin: "0 0 4px", opacity: 0.7 }}>
            <span style={{ position: "relative", display: "inline" }}>
              <span style={{ fontStyle: "italic" }}>{artwork.title || (isCn ? "无题" : "Untitled")}</span>
              <motion.span
                aria-hidden
                initial={false}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  backgroundColor: text,
                  transformOrigin: "left",
                  pointerEvents: "none",
                }}
              />
            </span>
            {artwork.year && `, ${artwork.year}`}
          </p>

          <p style={{ fontFamily: metaFont, fontSize: isMobile ? "11px" : "12px", color: text, margin: "0 0 16px", opacity: 0.7, fontWeight: 300 }}>
            {[artwork.medium, artwork.size].filter(Boolean).join("\n")}
          </p>

          <div style={{ display: "inline-block" }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                onEnquire(artwork);
              }}
              style={{
                background: "transparent",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                padding: "2px 0",
                margin: 0,
                fontFamily: enquireFont,
                fontSize: isMobile ? "11px" : "12px",
                color: text,
                cursor: "pointer",
                fontWeight: 300,
                opacity: 0.85,
                position: "relative",
                WebkitAppearance: "none",
              }}
            >
              {isCn ? "咨询" : "Enquire"}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  backgroundColor: text,
                  transformOrigin: "left",
                }}
              />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ArtistDetailPageComponent() {
  const { slug } = useParams();
  const { isCn } = useContext(LanguageContext);
  const { isMobile } = useContext(DeviceContext);
  const { fontFamily: nameFont } = useFont("artistName");
  const { fontFamily: bioFont } = useFont("artistBio");
  const { fontFamily: worksHeadingFont } = useFont("artistWorksHeading");
  const { fontFamily: bodyFont } = useFont("bodyText");
  const { colors } = useReverseTheme();

  const text = colors.text;
  const bg = colors.background;
  const pad = isMobile ? 20 : EDGE;

  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const portraitVideoRef = useRef(null);
  const portraitAutoplayAlways = PORTRAIT_VIDEO_AUTOPLAY_MODE === "always";

  const handlePortraitEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.02)";
    if (!portraitAutoplayAlways && portraitVideoRef.current) {
      portraitVideoRef.current.currentTime = 0;
      portraitVideoRef.current.play().catch(() => {});
    }
  };
  const handlePortraitLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    if (!portraitAutoplayAlways && portraitVideoRef.current) {
      portraitVideoRef.current.pause();
    }
  };

  const artistName = slug
    ? decodeURIComponent(slug).replace(/[-_]/g, " ")
    : "";

  // ── Same data-fetching pattern as useArtistDetailData ──
  const {
    data: rawAbouts = [],
    isLoading: aboutLoading,
    error: aboutError,
    refetch: refetchAbout,
  } = useData("/api/about");
  const {
    data: rawWorks = [],
    isLoading: worksLoading,
    refetch: refetchWorks,
  } = useData("/api/artwork");

  const isLoading = aboutLoading || worksLoading;
  const hasError = !!(aboutError || (artistName && !rawAbouts.length && !isLoading));

  const refetch = () => {
    refetchAbout?.();
    refetchWorks?.();
  };

  // Language-filter artworks
  const works = useMemo(() => {
    const filtered = filterByLanguage(rawWorks, isCn);
    if (!artistName) return filtered.sort((a, b) => (Number(a?.order) || 0) - (Number(b?.order) || 0));
    const key = normalizeName(artistName);
    return filtered
      .filter((w) => normalizeName(w?.artist) === key)
      .sort((a, b) => (Number(a?.order) || 0) - (Number(b?.order) || 0));
  }, [rawWorks, isCn, artistName]);

  // Resolve artist from About records (same logic as useArtistDetailData)
  const artist = useMemo(() => {
    if (!artistName) return null;
    const abouts = filterByLanguage(rawAbouts, isCn);
    const key = normalizeName(artistName);
    const about = abouts.find((a) => normalizeName(a?.artist) === key);
    if (!about) return null;
    return {
      name: about.artist || "",
      name_cn: about.artist || "",
      name_en: about.artist || "",
      bio: [about.caption, ...(about.introductions || [])].filter(Boolean).join("\n"),
      bio_cn: [about.caption, ...(about.introductions || [])].filter(Boolean).join("\n"),
      bio_en: [about.caption, ...(about.introductions || [])].filter(Boolean).join("\n"),
      portrait_img_url: about.portrait_image_url || null,
      portrait_video_url: null,
    };
  }, [rawAbouts, isCn, artistName]);

  if (isLoading) return <LoadingAnimation isLoading />;
  if (hasError) {
    return <AlertInfo message={isCn ? "加载失败" : "Loading Failed"} buttonText={isCn ? "重试" : "Retry"} onBack={refetch} isCn={isCn} />;
  }
  if (!artist && artistName) {
    return <AlertInfo message={isCn ? "未找到艺术家" : "Artist not found"} isCn={isCn} />;
  }

  const name = isCn
    ? artist?.name_cn || artist?.name || artistName
    : artist?.name_en || artist?.name || artistName;
  const bio = isCn
    ? artist?.bio_cn || artist?.bio || ""
    : artist?.bio_en || artist?.bio || "";
  const cols = isMobile ? 1 : 3;

  return (
    <div style={{ backgroundColor: bg, color: text, minHeight: "100vh", padding: `${isMobile ? 24 : 40}px ${pad}px 120px` }}>
      {/* Portrait — video plays in front of / instead of the still image when portrait_video_url is set */}
      {artist && (artist.portrait_video_url || artist.portrait_img_url) && (
        <div style={{ width: "100%", maxWidth: PORTRAIT_MAX_WIDTH, paddingBottom: `${PORTRAIT_MAX_WIDTH * 1.25}px`, height: 0, position: "relative", overflow: "hidden", backgroundColor: "rgba(0,0,0,0.03)", marginBottom: isMobile ? "24px" : "40px" }}>
          {artist.portrait_video_url ? (
            <video
              ref={portraitVideoRef}
              src={artist.portrait_video_url}
              poster={artist.portrait_img_url || undefined}
              autoPlay={portraitAutoplayAlways}
              muted
              loop
              playsInline
              preload="metadata"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
              onMouseEnter={handlePortraitEnter}
              onMouseLeave={handlePortraitLeave}
            />
          ) : (
            <img
              src={artist.portrait_img_url}
              alt={name || ""}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
              onMouseEnter={handlePortraitEnter}
              onMouseLeave={handlePortraitLeave}
            />
          )}
        </div>
      )}

      {/* Name */}
      <p style={{ fontFamily: nameFont, fontSize: isMobile ? "30px" : "56px", lineHeight: isMobile ? "38px" : "67.2px", letterSpacing: "0.1em", color: text, margin: `0 0 ${isMobile ? "16px" : "24px"}` }}>
        {name}
      </p>

      {/* Bio */}
      {bio && (
        <p style={{ fontFamily: bioFont, fontSize: isMobile ? "13px" : "15px", lineHeight: isMobile ? "22px" : "26px", opacity: 0.8, maxWidth: "640px", whiteSpace: "pre-wrap", color: text, margin: `0 0 ${isMobile ? "40px" : "56px"}` }}>
          {bio}
        </p>
      )}

      {/* Works */}
      {!worksLoading && works.length > 0 && (
        <>
          <p style={{ fontFamily: worksHeadingFont, fontSize: isMobile ? "10px" : "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: text, margin: `0 0 ${isMobile ? "16px" : "24px"}` }}>
            {isCn ? "作品" : "Works"}
          </p>

          <div style={{ columnCount: cols, columnGap: isMobile ? "16px" : "32px" }}>
            {works.map((aw, i) => (
              <ArtworkCell
                key={aw._id || aw.id || i}
                artwork={aw}
                index={i}
                text={text}
                isCn={isCn}
                isMobile={isMobile}
                onEnquire={setSelectedArtwork}
              />
            ))}
          </div>
        </>
      )}

      {!worksLoading && works.length === 0 && (
        <p style={{ fontFamily: bodyFont, fontSize: "13px", color: text, opacity: 0.3, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {isCn ? "暂无作品" : "No works"}
        </p>
      )}

      <EnquirePopup
        isOpen={!!selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        artwork={selectedArtwork}
        isCn={isCn}
        fontFamily={bodyFont}
        colors={colors}
      />
    </div>
  );
}