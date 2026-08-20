"use client";

import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { DeviceContext } from "@/components/contexts/DeviceContext";
import useFont from "@/hooks/useFont";
import { useReverseTheme } from "@/hooks/useReverseTheme";
import PageSkeleton, { SkeletonBlock, SkeletonLine } from "@/components/skeletons/PageSkeleton";
import AlertInfo from "@/components/alerts/AlertInfo";
import useBibliographyData from "@/components/pages/news/hooks/useBibliographyData";

// ============================================================================
// UI CONFIGURATION
// ============================================================================
const CONFIG = {
  PAGE: {
    PADDING_LEFT_DESKTOP: 100,
    PADDING_RIGHT_DESKTOP: 50,
    PADDING_LEFT_MOBILE: 50,
    PADDING_RIGHT_MOBILE: 20,
    PADDING_TOP_DESKTOP: 30,
    PADDING_TOP_MOBILE: 24,
    PADDING_BOTTOM: 120,
    OFFSET_TOP: -10,
  },

  HEADING: {
    FONT_SIZE_DESKTOP: "30px",
    FONT_SIZE_MOBILE: "20px",
    FONT_WEIGHT: 500,
    LETTER_SPACING: "0.01em",
    OFFSET_LEFT: 0,
    OFFSET_TOP: 50,
    OFFSET_LEFT_MOBILE: 0,
    OFFSET_TOP_MOBILE: 0,
    ALIGN: "left",
    OFFSET_RIGHT: 0,
    TO_LIST_GAP_DESKTOP: 70,
    TO_LIST_GAP_MOBILE: 40,
  },

  LIST: {
    COLUMN_WIDTH: "100%",
    OFFSET_TOP: 50,
    ITEM_GAP_DESKTOP: 10,
    ITEM_GAP_MOBILE: 10,
    ITEM_FONT_SIZE_DESKTOP: "17px",
    ITEM_FONT_SIZE_MOBILE: "15px",
    ITEM_FONT_WEIGHT: 347,
    ITEM_LINE_HEIGHT: 1.4,
    ITEM_LETTER_SPACING: "0.02em",
    ITEM_COLOR: null,
    ITEM_COLOR_ACTIVE: null,
    UNDERLINE_COLOR: null,
    UNDERLINE_DURATION: 0.3,
    // 类型和关联艺术家的字体大小（与主标题相同或略小，此处统一）
    META_FONT_SIZE_DESKTOP: "15px",
    META_FONT_SIZE_MOBILE: "13px",
    META_OPACITY: 0.7,
  },

  EMPTY_STATE: {
    FONT_SIZE: "13px",
    OPACITY: 0.3,
    LETTER_SPACING: "0.1em",
  },

  TEXT: {
    HEADING: { en: "News", cn: "新闻" },
    EMPTY: { en: "No news", cn: "暂无新闻" },
    ERROR_MESSAGE: { en: "Loading Failed", cn: "加载失败" },
    RETRY_BUTTON: { en: "Retry", cn: "重试" },
  },
};

// ============================================================================
// Helpers
// ============================================================================
const pick = (isCn, pair) => (isCn ? pair.cn : pair.en);

const getSafeHref = (item) => {
  if (item.web_url) return item.web_url;
  if (item.pdf_url) return item.pdf_url;
  if (item.video_url) return item.video_url;
  return "#";
};

const resolveListColors = (themeText) => {
  const base = CONFIG.LIST.ITEM_COLOR || themeText;
  const active = CONFIG.LIST.ITEM_COLOR_ACTIVE || base;
  const underline = CONFIG.LIST.UNDERLINE_COLOR || active;
  return { base, active, underline };
};

const HEADING_ALIGN_RIGHT = CONFIG.HEADING.ALIGN === "right";

// ============================================================================
// 书目条目 — 单行，无标签，艺术家+标题+类型，悬停下划线
// ============================================================================
const BibliographyItem = React.memo(function BibliographyItem({
  item,
  index,
  isMobile,
  listColors,
  fontFamily,
}) {
  const href = getSafeHref(item);
  const isExternal = href !== "#" && (href.startsWith("http") || href.startsWith("//"));

  const itemGap = isMobile
    ? CONFIG.LIST.ITEM_GAP_MOBILE
    : CONFIG.LIST.ITEM_GAP_DESKTOP;

  const metaFontSize = isMobile
    ? CONFIG.LIST.META_FONT_SIZE_MOBILE
    : CONFIG.LIST.META_FONT_SIZE_DESKTOP;

  // 关联艺术家：取 related_gallery_exhibition 第一个，或全部用逗号连接
  const relatedArtists = item.related_gallery_exhibition && item.related_gallery_exhibition.length > 0
    ? item.related_gallery_exhibition.join(", ")
    : null;

  // 构建显示内容：艺术家（如果有） + 标题 + 类型（如果有）
  const displayParts = [];
  if (relatedArtists) displayParts.push(relatedArtists);
  displayParts.push(item.title || "Untitled");
  if (item.type) displayParts.push(item.type);

  // 用分隔符连接：艺术家 · 标题 · 类型
  const displayText = displayParts.join(" · ");

  // 为标题部分添加下划线动画，但整行都可以点击（如果href有效）
  // 为了下划线只出现在标题下，我们需要分离标题部分，但用户要求整行内容在同一行，
  // 且下划线动画仅作用于标题（而不是整个行）。我们可以将标题包裹在带下划线的span中，
  // 其他部分（艺术家、类型）普通显示。
  // 如果href无效，则整个为纯文本，无下划线。
  // 为了简化，我们将标题单独提取出来用于下划线，其他部分保持普通样式。

  // 解析显示文本，分割出标题部分，但更好的方式是用独立元素。
  // 我们直接构建JSX，分别渲染三部分：
  // 1. 艺术家（如果有）
  // 2. 标题（可点击，带下划线动画）
  // 3. 类型（如果有）

  const titleContent = item.title || "Untitled";

  // 标题的链接样式（带下划线动画）
  const titleLinkStyle = {
    display: "inline-block",
    textDecoration: "none",
    color: listColors.base,
    transition: "color 0.2s ease",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
    position: "relative",
    padding: "2px 0",
  };

  const titleSpan = href !== "#" ? (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={titleLinkStyle}
      onMouseEnter={(e) => { e.currentTarget.style.color = listColors.active; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = listColors.base; }}
    >
      {titleContent}
      {/* 下划线动画 */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleX: 1 }} // 始终显示下划线？用户希望悬停时出现，所以初始为0，悬停时变为1
        // 但我们希望悬停时出现，所以用 whileHover 更好，但这里用父元素的 hover 控制。
        // 因为父元素是 a，我们用 a 的 hover 来控制子元素。
        // 但 motion 不支持 whileHover 直接应用在子元素上，我们可以用 useAnimation 或 CSS。
        // 简便方法：使用 CSS hover + transition，或使用 motion 的 whileHover。
        // 这里我们使用 motion 的 whileHover 在 a 上传递到子元素，或者直接使用 CSS。
        // 为了简洁，我们使用 CSS 实现：a:hover span { transform: scaleX(1); }
        // 但为保持一致性，我们用 motion 的 animate 配合父元素 hover 状态。
        // 更好的方案：用 React useState 控制 hover，或直接用 CSS。
        // 此处采用 CSS 方案更简单。
        // 我们直接写在 style 中，用 CSS 类。
      />
    </a>
  ) : (
    <span style={{ color: listColors.base, padding: "2px 0" }}>{titleContent}</span>
  );

  // 由于需要在悬停时显示下划线，我们可以用CSS实现，而不引入额外的状态。
  // 定义样式对象，包含下划线动画的CSS。
  // 我们在 a 标签内嵌入一个 span，初始 scaleX 0，a:hover 时 scaleX 1。
  // 使用纯CSS，我们不用 motion，直接使用 transition。
  // 为了保持与原有设计一致，我改用CSS方案。

  // 重新设计标题部分，使用普通的 a 和 span，用 CSS transition。
  const titleWithUnderline = href !== "#" ? (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{
        display: "inline-block",
        textDecoration: "none",
        color: listColors.base,
        transition: "color 0.2s ease",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        position: "relative",
        padding: "2px 0",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = listColors.active; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = listColors.base; }}
    >
      {titleContent}
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "1px",
          backgroundColor: listColors.underline,
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: `transform ${CONFIG.LIST.UNDERLINE_DURATION}s ease`,
          pointerEvents: "none",
        }}
        className="underline-bar"
      />
    </a>
  ) : (
    <span style={{ color: listColors.base, padding: "2px 0" }}>{titleContent}</span>
  );

  // 我们需要在 a 的 hover 时改变 .underline-bar 的 scaleX，可以用 CSS 或直接在 a 上添加 onMouseEnter 控制。
  // 简单方法：使用 CSS 全局样式，但这里我们用内联 + 动态类，但比较麻烦。
  // 更优雅：使用 React 的 state 控制 hover，但会影响性能。
  // 由于我们只需要 hover 时下划线出现，可以使用 CSS 的 a:hover .underline-bar { transform: scaleX(1); }
  // 但内联样式无法做到，我们可以在组件内添加一个 style 标签，或使用 css-in-js。
  // 鉴于我们已有全局样式，我们可以添加一个简单的 CSS 类在全局，但为了封装，可以添加一个内联 style 标签。
  // 或者我们使用 motion 的 whileHover，但 motion 需要父元素是 motion 组件。
  // 为了简单，我使用 motion 的 `motion.a` 和 `motion.span`，并设置 whileHover 对 span 进行动画。
  // 这样更符合原代码风格。

  // 改为使用 motion 版本：
  const MotionA = motion.a;
  const MotionSpan = motion.span;

  const titleWithUnderlineMotion = href !== "#" ? (
    <MotionA
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{
        display: "inline-block",
        textDecoration: "none",
        color: listColors.base,
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        position: "relative",
        padding: "2px 0",
        cursor: "pointer",
      }}
      whileHover={{ color: listColors.active }}
      transition={{ duration: 0.2 }}
    >
      {titleContent}
      <MotionSpan
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "1px",
          backgroundColor: listColors.underline,
          transformOrigin: "left",
          pointerEvents: "none",
        }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: CONFIG.LIST.UNDERLINE_DURATION, ease: "easeInOut" }}
      />
    </MotionA>
  ) : (
    <span style={{ color: listColors.base, padding: "2px 0" }}>{titleContent}</span>
  );

  // 整行内容
  const content = (
    <>
      {relatedArtists && (
        <span style={{ opacity: CONFIG.LIST.META_OPACITY, fontSize: metaFontSize }}>
          {relatedArtists}
          <span style={{ margin: "0 4px" }}>·</span>
        </span>
      )}
      {titleWithUnderlineMotion}
      {item.type && (
        <span style={{ opacity: CONFIG.LIST.META_OPACITY, fontSize: metaFontSize, marginLeft: "4px" }}>
          <span style={{ margin: "0 4px" }}>·</span>
          {item.type}
        </span>
      )}
    </>
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: isMobile ? 0 : index * 0.04,
        duration: 0.45,
        ease: "easeOut",
      }}
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        textAlign: "left",
        marginBottom: `${itemGap}px`,
        fontSize: isMobile
          ? CONFIG.LIST.ITEM_FONT_SIZE_MOBILE
          : CONFIG.LIST.ITEM_FONT_SIZE_DESKTOP,
        lineHeight: CONFIG.LIST.ITEM_LINE_HEIGHT,
        letterSpacing: CONFIG.LIST.ITEM_LETTER_SPACING,
        fontWeight: CONFIG.LIST.ITEM_FONT_WEIGHT,
        fontFamily,
        color: listColors.base,
      }}
    >
      {content}
    </motion.li>
  );
});

// ============================================================================
// 书目列表
// ============================================================================
const BibliographyList = React.memo(function BibliographyList({
  items,
  isMobile,
  listColors,
  fontFamily,
}) {
  return (
    <ul
      style={{
        width: "100%",
        margin: 0,
        padding: 0,
        position: "relative",
        top: `${CONFIG.LIST.OFFSET_TOP}px`,
        listStyle: "none",
      }}
    >
      {items.map((item, i) => (
        <BibliographyItem
          key={item.id}
          item={item}
          index={i}
          isMobile={isMobile}
          listColors={listColors}
          fontFamily={fontFamily}
        />
      ))}
    </ul>
  );
});

// ============================================================================
// 空状态
// ============================================================================
const EmptyState = React.memo(function EmptyState({ isCn, fontFamily, text }) {
  return (
    <p
      style={{
        fontFamily,
        fontSize: CONFIG.EMPTY_STATE.FONT_SIZE,
        color: text,
        opacity: CONFIG.EMPTY_STATE.OPACITY,
        letterSpacing: CONFIG.EMPTY_STATE.LETTER_SPACING,
        textTransform: "uppercase",
        marginTop: `${CONFIG.HEADING.TO_LIST_GAP_DESKTOP}px`,
      }}
    >
      {pick(isCn, CONFIG.TEXT.EMPTY)}
    </p>
  );
});

// ============================================================================
// 骨架屏
// ============================================================================
function BibliographyListSkeleton({ isMobile, bgColor }) {
  return (
    <PageSkeleton bgColor={bgColor}>
      <div
        style={{
          paddingTop: isMobile ? CONFIG.PAGE.PADDING_TOP_MOBILE : CONFIG.PAGE.PADDING_TOP_DESKTOP,
          paddingLeft: isMobile ? CONFIG.PAGE.PADDING_LEFT_MOBILE : CONFIG.PAGE.PADDING_LEFT_DESKTOP,
          paddingRight: isMobile ? CONFIG.PAGE.PADDING_RIGHT_MOBILE : CONFIG.PAGE.PADDING_RIGHT_DESKTOP,
          paddingBottom: CONFIG.PAGE.PADDING_BOTTOM,
          marginTop: CONFIG.PAGE.OFFSET_TOP,
        }}
      >
        <SkeletonLine
          width="120px"
          height={30}
          style={{ marginLeft: 0, marginBottom: isMobile ? CONFIG.HEADING.TO_LIST_GAP_MOBILE : CONFIG.HEADING.TO_LIST_GAP_DESKTOP }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonLine key={i} width={`${55 + Math.random() * 40}%`} height={17} />
            ))}
          </div>
        </div>
      </div>
    </PageSkeleton>
  );
}

// ============================================================================
// 主页面组件
// ============================================================================
export default function BibliographyPageComponent() {
  const { isCn } = useContext(LanguageContext);
  const { isMobile } = useContext(DeviceContext);
  const { fontFamily } = useFont();
  const { colors } = useReverseTheme();

  const text = colors.text;
  const bg = colors.background;

  const { data: items = [], isLoading, error, handleRetry } = useBibliographyData();

  const listColors = useMemo(() => resolveListColors(text), [text]);

  if (isLoading) {
    return <BibliographyListSkeleton isMobile={isMobile} bgColor={bg} />;
  }

  if (error) {
    return (
      <AlertInfo
        message={pick(isCn, CONFIG.TEXT.ERROR_MESSAGE)}
        buttonText={pick(isCn, CONFIG.TEXT.RETRY_BUTTON)}
        onBack={handleRetry}
        isCn={isCn}
      />
    );
  }

  return (
    <div
      style={{
        backgroundColor: bg,
        color: text,
        minHeight: "100vh",
        boxSizing: "border-box",
        fontFamily,
        paddingTop: isMobile ? CONFIG.PAGE.PADDING_TOP_MOBILE : CONFIG.PAGE.PADDING_TOP_DESKTOP,
        paddingLeft: isMobile ? CONFIG.PAGE.PADDING_LEFT_MOBILE : CONFIG.PAGE.PADDING_LEFT_DESKTOP,
        paddingRight: isMobile ? CONFIG.PAGE.PADDING_RIGHT_MOBILE : CONFIG.PAGE.PADDING_RIGHT_DESKTOP,
        paddingBottom: CONFIG.PAGE.PADDING_BOTTOM,
        marginTop: CONFIG.PAGE.OFFSET_TOP,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          fontFamily,
          fontSize: isMobile
            ? CONFIG.HEADING.FONT_SIZE_MOBILE
            : CONFIG.HEADING.FONT_SIZE_DESKTOP,
          fontWeight: CONFIG.HEADING.FONT_WEIGHT,
          letterSpacing: CONFIG.HEADING.LETTER_SPACING,
          color: text,
          margin: 0,
          position: "relative",
          textAlign: HEADING_ALIGN_RIGHT ? "right" : "left",
          top: isMobile ? CONFIG.HEADING.OFFSET_TOP_MOBILE : CONFIG.HEADING.OFFSET_TOP,
          left: HEADING_ALIGN_RIGHT
            ? undefined
            : (isMobile ? CONFIG.HEADING.OFFSET_LEFT_MOBILE : CONFIG.HEADING.OFFSET_LEFT),
          right: HEADING_ALIGN_RIGHT ? CONFIG.HEADING.OFFSET_RIGHT : undefined,
        }}
      >
        {pick(isCn, CONFIG.TEXT.HEADING)}
      </motion.h1>

      {items.length === 0 ? (
        <EmptyState isCn={isCn} fontFamily={fontFamily} text={text} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: isMobile
              ? CONFIG.HEADING.TO_LIST_GAP_MOBILE
              : CONFIG.HEADING.TO_LIST_GAP_DESKTOP,
            width: "100%",
          }}
        >
          <BibliographyList
            items={items}
            isMobile={isMobile}
            listColors={listColors}
            fontFamily={fontFamily}
          />
        </div>
      )}
    </div>
  );
}
