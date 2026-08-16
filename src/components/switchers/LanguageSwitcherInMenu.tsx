"use client";

import React, { useCallback, useContext, useState } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../contexts/LanguageContext";
import useFont from "@/hooks/useFont";
import useSwitcher from "@/hooks/useSwitcher";

// ============================================================================
// 🎨 LANGUAGE SWITCHER DESIGN CONFIGURATION
// Core visual parameters are now at the top level for quick tuning.
// ============================================================================
const SWITCHER_CONFIG = {
  POSITION: {
    TOP: "20px",
    RIGHT: "55px",
    Z_INDEX: 12000,
  },

  GAP: "6px", // space between "中文", divider, and "EN"

  // --- Top-level style knobs (easily accessible) ---
  FONT_SIZE: "12px",
  COLOR_ACTIVE: "var(--text-active, #000)",
  COLOR_INACTIVE: "var(--text-muted, #999)",
  COLOR_DEFAULT: "var(--text-primary, #666)", // applied to the container

  ENTRANCE_ANIMATION: {
    INITIAL_OPACITY: 0,
    INITIAL_Y: -5,
    DURATION: 0.4,
    EASING: "easeOut",
  },

  LABEL: {
    LINE_HEIGHT: "12px",
    LETTER_SPACING: "0px",
    FONT_WEIGHT_ACTIVE: 600,
    FONT_WEIGHT_INACTIVE: 400,
    TRANSITION: "color 0.2s ease",
  },

  DIVIDER: {
    CHAR: "|",
    COLOR: "var(--border-color, #ccc)",
    FONT_SIZE: "11px",
    FONT_WEIGHT: 300,
  },
};

type LangOption = "cn" | "en";

const LABELS: Record<LangOption, string> = {
  cn: "中文",
  en: "EN",
};

const LanguageSwitcherInMenu: React.FC = () => {
  const { isCn, toggleLanguage } = useContext(LanguageContext);
  const { fontFamily } = useFont("languageSwitcher");

  const { shouldHide } = useSwitcher({
    hideOnSlugOf: ["artists", "artworks", "exhibitions", "events"],
    extraHidePaths: [],
    onlyUnderPath: null,
  });

  const [hoveredLang, setHoveredLang] = useState<LangOption | null>(null);

  const activeLang: LangOption = isCn ? "cn" : "en";

  const selectLanguage = useCallback(
    (lang: LangOption) => {
      if (lang !== activeLang) toggleLanguage();
    },
    [activeLang, toggleLanguage]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, lang: LangOption) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectLanguage(lang);
      }
    },
    [selectLanguage]
  );

  if (shouldHide) return null;

  const labelStyle = (isActive: boolean): React.CSSProperties => ({
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    font: "inherit",
    fontWeight: isActive
      ? SWITCHER_CONFIG.LABEL.FONT_WEIGHT_ACTIVE
      : SWITCHER_CONFIG.LABEL.FONT_WEIGHT_INACTIVE,
    color: isActive ? SWITCHER_CONFIG.COLOR_ACTIVE : SWITCHER_CONFIG.COLOR_INACTIVE,
    transition: SWITCHER_CONFIG.LABEL.TRANSITION,
  });

  const renderOption = (lang: LangOption) => {
    const isActive = lang === activeLang;
    const isHovered = hoveredLang === lang;

    // 悬停时使用 ACTIVATE 色（即使非激活态也变亮，可按需调整）
    const color =
      isActive || isHovered
        ? SWITCHER_CONFIG.COLOR_ACTIVE
        : SWITCHER_CONFIG.COLOR_INACTIVE;

    return (
      <button
        key={lang}
        type="button"
        onClick={() => selectLanguage(lang)}
        onKeyDown={(e) => handleKeyDown(e, lang)}
        onMouseEnter={() => setHoveredLang(lang)}
        onMouseLeave={() => setHoveredLang(null)}
        aria-pressed={isActive}
        aria-label={`Switch to ${lang === "cn" ? "Chinese" : "English"}`}
        style={{
          ...labelStyle(isActive),
          color, // 覆盖 labelStyle 中的颜色，实现悬停变色
        }}
      >
        {LABELS[lang]}
      </button>
    );
  };

  return (
    <motion.div
      initial={{
        opacity: SWITCHER_CONFIG.ENTRANCE_ANIMATION.INITIAL_OPACITY,
        y: SWITCHER_CONFIG.ENTRANCE_ANIMATION.INITIAL_Y,
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: SWITCHER_CONFIG.ENTRANCE_ANIMATION.DURATION,
        ease: SWITCHER_CONFIG.ENTRANCE_ANIMATION.EASING,
      }}
      role="group"
      aria-label="Language switcher"
      style={{
        position: "fixed",
        top: SWITCHER_CONFIG.POSITION.TOP,
        right: SWITCHER_CONFIG.POSITION.RIGHT,
        zIndex: SWITCHER_CONFIG.POSITION.Z_INDEX,
        display: "flex",
        alignItems: "center",
        gap: SWITCHER_CONFIG.GAP,
        color: SWITCHER_CONFIG.COLOR_DEFAULT,
        fontFamily,
        fontSize: SWITCHER_CONFIG.FONT_SIZE,
        lineHeight: SWITCHER_CONFIG.LABEL.LINE_HEIGHT,
        letterSpacing: SWITCHER_CONFIG.LABEL.LETTER_SPACING,
        userSelect: "none",
      }}
    >
      {renderOption("cn")}

      <span
        aria-hidden="true"
        style={{
          color: SWITCHER_CONFIG.DIVIDER.COLOR,
          fontSize: SWITCHER_CONFIG.DIVIDER.FONT_SIZE,
          fontWeight: SWITCHER_CONFIG.DIVIDER.FONT_WEIGHT,
        }}
      >
        {SWITCHER_CONFIG.DIVIDER.CHAR}
      </span>

      {renderOption("en")}
    </motion.div>
  );
};

export default LanguageSwitcherInMenu;