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
import { useAsyncAction } from "@/hooks/useAsyncAction"; // 新增导入

// ============================================================================
// 🎨 NAVIGATION DESIGN CONFIGURATION
// (保持不变)
// ============================================================================
const NAV_CONFIG = {
  FONT_SIZE: "18px",
  LETTER_SPACING: "0.04em",

  BAR: {
    HEIGHT: 70,
    PADDING_HORIZONTAL_DESKTOP: 50,
    PADDING_HORIZONTAL_MOBILE: 20,
    Z_INDEX: 1300,
    SHOW_BORDER: false,
    BORDER_WIDTH: "1px",
    BORDER_COLOR: null,
  },

  LOGO: {
    WIDTH_DESKTOP: "300px",
    WIDTH_MOBILE: "200px",
    HEIGHT_DESKTOP: "65px",
    HEIGHT_MOBILE: "55px",
    LEFT_DESKTOP: "28px",
    LEFT_MOBILE: "0px",
    TOP_DESKTOP: "-10px",
    TOP_MOBILE: "0px",
  },

  LINK: {
    FONT_SIZE: "18px",
    FONT_WEIGHT: 500,
    LINE_HEIGHT: "16px",
    TEXT_TRANSFORM: "none",
    GAP: "clamp(16px, 2.5vw, 32px)",
    COLOR: null,
    COLOR_ACTIVE: null,
    OPACITY_DEFAULT: 0.7,
    OPACITY_ACTIVE: 1,

    UNDERLINE: {
      ENABLED: true,
      SHOW_ON_ACTIVE: true,
      HEIGHT: "1px",
      COLOR: null,
      MARGIN_TOP: "7px",
      ANIM_TYPE: "tween",
      ANIM_DURATION: 0.2,
      ANIM_EASING: "easeInOut",
      SPRING_STIFFNESS: 300,
      SPRING_DAMPING: 30,
    },
  },

  DRAWER: {
    WIDTH: "280px",
    Z_INDEX: 1500,
    LINK_FONT_SIZE: "24px",
    LINK_FONT_WEIGHT: 600,
    LINK_LETTER_SPACING: "0.02em",
    LINK_LINE_HEIGHT: "1.4",
    LINK_TEXT_TRANSFORM: "none",
    LINK_COLOR: null,
    SHOW_ITEM_DIVIDER: true,
    DIVIDER_COLOR: null,
  },
};

// ----------------------------------------------------------------------------
// Pure helpers
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
    transition: "opacity 0.2s ease, color 0.2s ease",
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
    letterSpacing: NAV_CONFIG.LETTER_SPACING,
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
    padding: "14px 0",
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
        src="/moodsea_gallery_logo.png"
        alt="MOODSEA GALLERY"
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
  onLinkClick, // 新增：点击处理函数
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
  onLinkClick, // 新增
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
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: NAV_CONFIG.DRAWER.Z_INDEX - 100,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: NAV_CONFIG.DRAWER.WIDTH,
              maxWidth: "85vw",
              zIndex: NAV_CONFIG.DRAWER.Z_INDEX,
              backgroundColor: colors.background,
              padding: "64px 24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              boxShadow: "2px 0 12px rgba(0,0,0,0.15)",
            }}
          >
            {menuList.map((item) => (
              <DrawerLink
                key={item.href}
                item={item}
                onClick={() => {
                  onClose();      // 关闭抽屉
                  onLinkClick();  // 执行点击增强逻辑
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
  const { fontFamily: navFontFamily } = useFont("navLink");
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState(null);

  // 集成 useAsyncAction，设置 throttleMs = 0 实现无延迟点击响应
  const { execute: onLinkClick } = useAsyncAction(
    async () => {
      // 在这里放置您希望在点击链接时执行的异步逻辑（例如埋点、预加载等）
      // 当前为空函数，仅用于演示；您可以根据需要替换。
      // 注意：由于页面可能很快跳转，此处的异步操作应轻量或使用 sendBeacon 等方式。
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
          transition: "background-color 0.3s ease, border-color 0.3s ease",
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