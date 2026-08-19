"use client";

import React, {
  useContext,
  useState,
  useCallback,
  useMemo,
  memo,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { DeviceContext } from "@/components/contexts/DeviceContext";
import { ManagerContext } from "@/components/contexts/ManagerContext";
import { useReverseTheme } from "@/hooks/useReverseTheme";
import menuItems from "@/data/menuItems.json";
import useFont from "@/hooks/useFont";
import MenuIconButton from "@/components/buttons/MenuIconButton";
import { useAsyncAction } from "@/hooks/useAsyncAction";

// ═════════════════════════════════════════════════════════════════════
// 🎨 NAVIGATION CONFIGURATION — single source of truth for ALL visuals
// ═════════════════════════════════════════════════════════════════════
//
// Everything the nav renders — font, spacing, color, timing, shadows —
// is set here. Nothing visual should be hardcoded further down; if you
// need to tweak how the nav looks, this is the only block to touch.
//
// FONT FAMILY specifically: this component doesn't hardcode a font file.
// It reads `FONT.ROLE` below and hands it to useFont(), which looks the
// role up in lib/typography.js to pick the actual font FILE per language
// (see FONT_FACES / TYPE_SCALE there). To change which typography role
// this nav uses, edit FONT.ROLE. To change what font FILE that role
// resolves to, edit lib/typography.js — not this file.
//
const NAV_CONFIG = {
  // ── Font ─────────────────────────────────────────────────────────
  FONT: {
    ROLE: "navLink", // must match a key in TYPE_SCALE (lib/typography.js)
    FALLBACK_FAMILY: "sans-serif", // used only if the role/hook ever fails to resolve
  },

  // ── Top bar ──────────────────────────────────────────────────────
  BAR: {
    HEIGHT: 70,
    PADDING_HORIZONTAL_DESKTOP: 50,
    PADDING_HORIZONTAL_MOBILE: 20,
    Z_INDEX: 1300,
    SHOW_BORDER: false,
    BORDER_WIDTH: "1px",
    BORDER_COLOR: null, // null → falls back to theme border color
    BACKGROUND_TRANSITION: "background-color 0.3s ease, border-color 0.3s ease",
  },

  // ── Logo ─────────────────────────────────────────────────────────
  LOGO: {
    SRC: "/moodsea_gallery_logo.png",
    ALT: "MOODSEA GALLERY",
    WIDTH_DESKTOP: "300px",
    WIDTH_MOBILE: "200px",
    HEIGHT_DESKTOP: "65px",
    HEIGHT_MOBILE: "55px",
    LEFT_DESKTOP: "28px",
    LEFT_MOBILE: "0px",
    TOP_DESKTOP: "-10px",
    TOP_MOBILE: "0px",
  },

  // ── Desktop nav links ────────────────────────────────────────────
  LINK: {
    FONT_SIZE: "18px",
    FONT_WEIGHT: 500,
    LINE_HEIGHT: "16px",
    LETTER_SPACING: "0.04em",
    TEXT_TRANSFORM: "none",
    GAP: "clamp(16px, 2.5vw, 32px)",
    COLOR: null, // null → falls back to theme text color
    COLOR_ACTIVE: null, // null → falls back to COLOR
    OPACITY_DEFAULT: 0.7,
    OPACITY_ACTIVE: 1,
    HOVER_TRANSITION: "opacity 0.2s ease, color 0.2s ease",

    UNDERLINE: {
      ENABLED: true,
      SHOW_ON_ACTIVE: true,
      HEIGHT: "1px",
      COLOR: null, // null → falls back to LINK.COLOR_ACTIVE
      MARGIN_TOP: "7px",
      ANIM_TYPE: "tween", // "tween" | "spring"
      ANIM_DURATION: 0.2,
      ANIM_EASING: "easeInOut",
      SPRING_STIFFNESS: 300,
      SPRING_DAMPING: 30,
    },
  },

  // ── Mobile drawer ────────────────────────────────────────────────
  DRAWER: {
    WIDTH: "280px",
    MAX_WIDTH: "85vw",
    Z_INDEX: 1500,
    PADDING: "64px 24px 24px",
    CONTENT_GAP: "4px",
    BOX_SHADOW: "2px 0 12px rgba(0,0,0,0.15)",
    ANIM_DURATION: 0.25,
    ANIM_EASING: "tween",

    BACKDROP_COLOR: "rgba(0,0,0,0.5)",
    BACKDROP_Z_OFFSET: 100, // backdrop z-index = DRAWER.Z_INDEX - this
    BACKDROP_FADE_DURATION: 0.2,

    LINK_FONT_SIZE: "24px",
    LINK_FONT_WEIGHT: 600,
    LINK_LETTER_SPACING: "0.02em",
    LINK_LINE_HEIGHT: "1.4",
    LINK_TEXT_TRANSFORM: "none",
    LINK_COLOR: null, // null → falls back to theme text color
    LINK_PADDING: "14px 0",
    SHOW_ITEM_DIVIDER: true,
    DIVIDER_COLOR: null, // null → falls back to theme border color
  },
};

// ----------------------------------------------------------------------------
// Pure helpers — read from NAV_CONFIG, never hardcode a visual value here
// ----------------------------------------------------------------------------

function buildUnderlineTransition(cfg) {
  if (cfg.ANIM_TYPE === "spring") {
    return {
      type: "spring",
      stiffness: cfg.SPRING_STIFFNESS,
      damping: cfg.SPRING_DAMPING,
    };
  }
  return { type: "tween", duration: cfg.ANIM_DURATION, ease: cfg.ANIM_EASING };
}

function buildBaseLinkStyle(navFontFamily) {
  return {
    textDecoration: "none",
    fontFamily: navFontFamily,
    whiteSpace: "nowrap",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: NAV_CONFIG.LINK.HOVER_TRANSITION,
  };
}

function buildDesktopLinkStyle({ baseLinkStyle, isActiveOrHovered, linkColor, linkColorActive }) {
  return {
    ...baseLinkStyle,
    color: isActiveOrHovered ? linkColorActive : linkColor,
    opacity: isActiveOrHovered
      ? NAV_CONFIG.LINK.OPACITY_ACTIVE
      : NAV_CONFIG.LINK.OPACITY_DEFAULT,
    fontSize: NAV_CONFIG.LINK.FONT_SIZE,
    fontWeight: NAV_CONFIG.LINK.FONT_WEIGHT,
    lineHeight: NAV_CONFIG.LINK.LINE_HEIGHT,
    letterSpacing: NAV_CONFIG.LINK.LETTER_SPACING,
    textTransform: NAV_CONFIG.LINK.TEXT_TRANSFORM,
  };
}

function buildDrawerLinkStyle({ baseLinkStyle, drawerLinkColor, drawerDividerColor }) {
  return {
    ...baseLinkStyle,
    color: drawerLinkColor,
    opacity: 1,
    fontSize: NAV_CONFIG.DRAWER.LINK_FONT_SIZE,
    fontWeight: NAV_CONFIG.DRAWER.LINK_FONT_WEIGHT,
    lineHeight: NAV_CONFIG.DRAWER.LINK_LINE_HEIGHT,
    letterSpacing: NAV_CONFIG.DRAWER.LINK_LETTER_SPACING,
    textTransform: NAV_CONFIG.DRAWER.LINK_TEXT_TRANSFORM,
    padding: NAV_CONFIG.DRAWER.LINK_PADDING,
    borderBottom: NAV_CONFIG.DRAWER.SHOW_ITEM_DIVIDER
      ? `1px solid ${drawerDividerColor}`
      : "none",
  };
}

// ----------------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------------

const Logo = memo(function Logo({ isMobile }) {
  return (
    <Link
      href="/"
      style={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        flexShrink: 0,
        position: "relative",
        marginLeft: isMobile ? NAV_CONFIG.LOGO.LEFT_MOBILE : NAV_CONFIG.LOGO.LEFT_DESKTOP,
        top: isMobile ? NAV_CONFIG.LOGO.TOP_MOBILE : NAV_CONFIG.LOGO.TOP_DESKTOP,
      }}
    >
      <img
        src={NAV_CONFIG.LOGO.SRC}
        alt={NAV_CONFIG.LOGO.ALT}
        style={{
          width: isMobile ? NAV_CONFIG.LOGO.WIDTH_MOBILE : NAV_CONFIG.LOGO.WIDTH_DESKTOP,
          maxHeight: isMobile ? NAV_CONFIG.LOGO.HEIGHT_MOBILE : NAV_CONFIG.LOGO.HEIGHT_DESKTOP,
          height: "auto",
          objectFit: "contain",
        }}
      />
    </Link>
  );
});

const DesktopNavLink = memo(function DesktopNavLink({
  item,
  isHovered,
  isActive,
  onMouseEnter,
  onMouseLeave,
  baseLinkStyle,
  linkColor,
  linkColorActive,
  underlineColor,
  underlineTransition,
  onLinkClick,
}) {
  const showUnderline =
    NAV_CONFIG.LINK.UNDERLINE.ENABLED &&
    (isHovered || (isActive && NAV_CONFIG.LINK.UNDERLINE.SHOW_ON_ACTIVE));

  const linkStyle = useMemo(
    () =>
      buildDesktopLinkStyle({
        baseLinkStyle,
        isActiveOrHovered: isHovered || isActive,
        linkColor,
        linkColorActive,
      }),
    [baseLinkStyle, isHovered, isActive, linkColor, linkColorActive]
  );

  return (
    <div
      style={{ display: "inline-flex", flexDirection: "column" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link href={item.href} style={linkStyle} onClick={onLinkClick}>
        {item.label}
      </Link>

      {NAV_CONFIG.LINK.UNDERLINE.ENABLED && (
        <motion.div
          initial={false}
          animate={{ scaleX: showUnderline ? 1 : 0 }}
          transition={underlineTransition}
          style={{
            marginTop: NAV_CONFIG.LINK.UNDERLINE.MARGIN_TOP,
            width: "100%",
            height: NAV_CONFIG.LINK.UNDERLINE.HEIGHT,
            backgroundColor: underlineColor,
            transformOrigin: "left center",
          }}
        />
      )}
    </div>
  );
});

function DesktopNav({
  menuList,
  pathname,
  hoveredHref,
  setHoveredHref,
  baseLinkStyle,
  linkColor,
  linkColorActive,
  underlineColor,
  underlineTransition,
  onLinkClick,
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: NAV_CONFIG.LINK.GAP }}>
      {menuList.map((item) => (
        <DesktopNavLink
          key={item.href}
          item={item}
          isHovered={hoveredHref === item.href}
          isActive={pathname === item.href}
          onMouseEnter={() => setHoveredHref(item.href)}
          onMouseLeave={() => setHoveredHref(null)}
          baseLinkStyle={baseLinkStyle}
          linkColor={linkColor}
          linkColorActive={linkColorActive}
          underlineColor={underlineColor}
          underlineTransition={underlineTransition}
          onLinkClick={onLinkClick}
        />
      ))}
    </div>
  );
}

const DrawerLink = memo(function DrawerLink({ item, onClick, linkStyle }) {
  return (
    <Link href={item.href} onClick={onClick} style={linkStyle}>
      {item.label}
    </Link>
  );
});

function MobileDrawer({ menuList, isOpen, onClose, colors, drawerLinkStyle, onLinkClick }) {
  const { DRAWER } = NAV_CONFIG;
  const panelTransition = useMemo(
    () => ({ type: DRAWER.ANIM_EASING, duration: DRAWER.ANIM_DURATION }),
    [DRAWER.ANIM_EASING, DRAWER.ANIM_DURATION]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DRAWER.BACKDROP_FADE_DURATION }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: DRAWER.Z_INDEX - DRAWER.BACKDROP_Z_OFFSET,
              backgroundColor: DRAWER.BACKDROP_COLOR,
            }}
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={panelTransition}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: DRAWER.WIDTH,
              maxWidth: DRAWER.MAX_WIDTH,
              zIndex: DRAWER.Z_INDEX,
              backgroundColor: colors.background,
              padding: DRAWER.PADDING,
              display: "flex",
              flexDirection: "column",
              gap: DRAWER.CONTENT_GAP,
              boxShadow: DRAWER.BOX_SHADOW,
            }}
          >
            {menuList.map((item) => (
              <DrawerLink
                key={item.href}
                item={item}
                onClick={() => {
                  onClose();
                  onLinkClick();
                }}
                linkStyle={drawerLinkStyle}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ----------------------------------------------------------------------------
// Main component
// ----------------------------------------------------------------------------

export default function MainNav() {
  const { isCn } = useContext(LanguageContext);
  const { isMobile, isTablet } = useContext(DeviceContext);
  const { isManager } = useContext(ManagerContext);
  const { colors } = useReverseTheme();
  const { fontFamily: resolvedFontFamily } = useFont(NAV_CONFIG.FONT.ROLE);
  const navFontFamily = resolvedFontFamily || NAV_CONFIG.FONT.FALLBACK_FAMILY;
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState(null);

  // Fires on every link click; kept lightweight (throttleMs: 0) since the
  // page may navigate away immediately after. Wire up analytics/prefetch
  // logic inside this function.
  const { execute: onLinkClick } = useAsyncAction(
    async () => {
      console.log("Link clicked – async action triggered");
    },
    { throttleMs: 0, onSuccess: () => {}, onError: (err) => console.error(err) }
  );

  const isHome = pathname === "/";
  const languageKey = isCn ? "cn" : "en";
  const useDrawer = isMobile || isTablet;

  const menuList = useMemo(() => {
    const source = isManager ? menuItems.managerMenu : menuItems.mainMenu;
    return source[languageKey];
  }, [isManager, languageKey]);

  // Resolve configured colors against the theme fallback once per render.
  const linkColor = NAV_CONFIG.LINK.COLOR ?? colors.text;
  const linkColorActive = NAV_CONFIG.LINK.COLOR_ACTIVE ?? linkColor;
  const underlineColor = NAV_CONFIG.LINK.UNDERLINE.COLOR ?? linkColorActive;
  const barBorderColor = NAV_CONFIG.BAR.BORDER_COLOR ?? colors.border;
  const drawerLinkColor = NAV_CONFIG.DRAWER.LINK_COLOR ?? colors.text;
  const drawerDividerColor = NAV_CONFIG.DRAWER.DIVIDER_COLOR ?? colors.border;

  const underlineTransition = useMemo(
    () => buildUnderlineTransition(NAV_CONFIG.LINK.UNDERLINE),
    []
  );

  const baseLinkStyle = useMemo(() => buildBaseLinkStyle(navFontFamily), [navFontFamily]);

  const drawerLinkStyle = useMemo(
    () => buildDrawerLinkStyle({ baseLinkStyle, drawerLinkColor, drawerDividerColor }),
    [baseLinkStyle, drawerLinkColor, drawerDividerColor]
  );

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((v) => !v), []);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: NAV_CONFIG.BAR.Z_INDEX,
          height: NAV_CONFIG.BAR.HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `0 ${
            isMobile ? NAV_CONFIG.BAR.PADDING_HORIZONTAL_MOBILE : NAV_CONFIG.BAR.PADDING_HORIZONTAL_DESKTOP
          }px`,
          backgroundColor: isHome ? "transparent" : colors.background,
          borderBottom:
            NAV_CONFIG.BAR.SHOW_BORDER && !isHome
              ? `${NAV_CONFIG.BAR.BORDER_WIDTH} solid ${barBorderColor}`
              : "none",
          transition: NAV_CONFIG.BAR.BACKGROUND_TRANSITION,
        }}
      >
        <Logo isMobile={isMobile} />

        {!useDrawer && (
          <DesktopNav
            menuList={menuList}
            pathname={pathname}
            hoveredHref={hoveredHref}
            setHoveredHref={setHoveredHref}
            baseLinkStyle={baseLinkStyle}
            linkColor={linkColor}
            linkColorActive={linkColorActive}
            underlineColor={underlineColor}
            underlineTransition={underlineTransition}
            onLinkClick={onLinkClick}
          />
        )}

        {useDrawer && (
          <div style={{ background: "transparent", flexShrink: 0 }}>
            <MenuIconButton
              colors={{ ...colors, text: colors.text }}
              onClick={toggleDrawer}
              style={{
                background: "transparent",
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
              }}
            />
          </div>
        )}
      </nav>

      {useDrawer && (
        <MobileDrawer
          menuList={menuList}
          isOpen={drawerOpen}
          onClose={closeDrawer}
          colors={colors}
          drawerLinkStyle={drawerLinkStyle}
          onLinkClick={onLinkClick}
        />
      )}
    </>
  );
}
