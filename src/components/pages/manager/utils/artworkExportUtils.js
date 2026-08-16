/**
 * ----------------------------------------------------------------------------
 * Artwork Export Utilities – Fully compatible with Prisma Artwork model
 * ----------------------------------------------------------------------------
 * Model fields (Prisma):
 *   id, cover_img_url, related_gallery_exhibition, artist, title, type,
 *   medium, year, size, series, caption, duration, credits, special_thanks,
 *   introduction[], video_url, web_url, work_value, sold, order, mark,
 *   language, updatedAt
 * ----------------------------------------------------------------------------
 */

// ============ 统一标签配置 ============
const FIELD_LABELS = {
  en: {
    id: "ID",
    artist: "Artist",
    title: "Title",
    type: "Type",
    medium: "Medium",
    year: "Year",
    size: "Size",
    series: "Series",
    caption: "Caption",
    duration: "Duration",
    credits: "Credits",
    special_thanks: "Special Thanks",
    introduction: "Introduction",
    related_gallery_exhibition: "Related Gallery/Exhibition",
    work_value: "Work Value",
    sold: "Sold",
    order: "Order",
    cover_img_url: "Cover Image URL",
    video_url: "Video URL",
    web_url: "Web URL",
    mark: "Mark",
    language: "Language",
    updatedAt: "Updated At",
  },
  zh: {
    id: "ID",
    artist: "艺术家",
    title: "标题",
    type: "类型",
    medium: "媒介",
    year: "年份",
    size: "尺寸",
    series: "系列",
    caption: "说明",
    duration: "时长",
    credits: "鸣谢",
    special_thanks: "特别感谢",
    introduction: "介绍",
    related_gallery_exhibition: "关联画廊/展览",
    work_value: "作品价值",
    sold: "已售",
    order: "排序",
    cover_img_url: "封面图片",
    video_url: "视频链接",
    web_url: "网页链接",
    mark: "标记",
    language: "语言",
    updatedAt: "更新时间",
  },
};

// ============ 工具函数 ============
function getLabels(isCn) {
  return isCn ? FIELD_LABELS.zh : FIELD_LABELS.en;
}

function formatArrayField(value) {
  return Array.isArray(value) ? value.join("; ") : "";
}

function formatIntroduction(value) {
  return Array.isArray(value) ? value.join(" | ") : "";
}

function formatDateTime(value) {
  if (!value) return "";
  try {
    const date = new Date(value);
    return date.toISOString().split("T")[0] + " " + date.toTimeString().split(" ")[0];
  } catch {
    return "";
  }
}

// ============ 1. 综合导出（所有字段） ============
export function createComprehensiveArtworkExport(artworkData, isCn = false) {
  if (!Array.isArray(artworkData)) return [];
  const labels = getLabels(isCn);

  return artworkData.map((item) => ({
    [labels.id]: item.id || "",
    [labels.artist]: item.artist || "",
    [labels.title]: item.title || "",
    [labels.type]: item.type || "",
    [labels.medium]: item.medium || "",
    [labels.year]: item.year || "",
    [labels.size]: item.size || "",
    [labels.series]: item.series || "",
    [labels.caption]: item.caption || "",
    [labels.duration]: item.duration || "",
    [labels.credits]: item.credits || "",
    [labels.special_thanks]: item.special_thanks || "",
    [labels.introduction]: formatIntroduction(item.introduction),
    [labels.related_gallery_exhibition]: formatArrayField(item.related_gallery_exhibition),
    [labels.work_value]: item.work_value || "",
    [labels.sold]: item.sold || "",
    [labels.order]: item.order || "",
    [labels.cover_img_url]: item.cover_img_url || "",
    [labels.video_url]: item.video_url || "",
    [labels.web_url]: item.web_url || "",
    [labels.mark]: item.mark || "",
    [labels.language]: item.language || "",
    [labels.updatedAt]: formatDateTime(item.updatedAt),
  }));
}

// ============ 2. CSV 格式化（使用统一标签） ============
export function formatArtworkDataForCSV(artworkData, isCn = false) {
  if (!Array.isArray(artworkData) || artworkData.length === 0) return [];
  const labels = getLabels(isCn);

  return artworkData.map((artwork) => {
    const formatted = {};
    for (const [key, label] of Object.entries(labels)) {
      let value = artwork[key];
      if (key === "introduction") {
        value = formatIntroduction(value);
      } else if (key === "related_gallery_exhibition") {
        value = formatArrayField(value);
      } else if (key === "updatedAt") {
        value = formatDateTime(value);
      } else {
        value = value ?? "";
      }
      formatted[label] = value;
    }
    return formatted;
  });
}

// ============ 3. 简化导出（仅核心字段） ============
export function createSimplifiedArtworkExport(artworkData, isCn = false) {
  if (!Array.isArray(artworkData)) return [];
  const labels = getLabels(isCn);
  const essential = ["artist", "title", "year", "cover_img_url", "language"];

  return artworkData.map((artwork) => {
    const simplified = {};
    for (const key of essential) {
      simplified[labels[key]] = artwork[key] ?? "";
    }
    return simplified;
  });
}

// ============ 4. 语言专用导出（主要艺术信息） ============
export function createLanguageSpecificArtworkExport(artworkData, isCn = false) {
  if (!Array.isArray(artworkData)) return [];
  const labels = getLabels(isCn);
  const fields = [
    "artist",
    "title",
    "type",
    "medium",
    "size",
    "series",
    "caption",
    "introduction",
    "year",
    "cover_img_url",
  ];

  return artworkData.map((artwork) => {
    const result = {};
    for (const key of fields) {
      let value = artwork[key];
      if (key === "introduction") {
        value = formatIntroduction(value);
      } else {
        value = value ?? "";
      }
      result[labels[key]] = value;
    }
    return result;
  });
}

// ============ 5. 双语合并（保留原始字段，实际与综合导出相同） ============
export function createBilingualCombinedArtworkExport(artworkData, isCn = false) {
  return createComprehensiveArtworkExport(artworkData, isCn);
}

// ============ 6. 媒体 URL 验证 ============
export function validateMediaUrls(artworkData) {
  return artworkData.map((artwork) => ({
    ...artwork,
    cover_img_valid:
      artwork.cover_img_url &&
      (artwork.cover_img_url.startsWith("http://") || artwork.cover_img_url.startsWith("https://"))
        ? "Valid"
        : "Invalid",
    video_url_valid:
      artwork.video_url &&
      (artwork.video_url.startsWith("http://") || artwork.video_url.startsWith("https://"))
        ? "Valid"
        : "Invalid",
  }));
}

// ============ 7. 详细导出（含验证状态） ============
export function createDetailedArtworkExport(artworkData, isCn = false) {
  if (!Array.isArray(artworkData)) return [];
  const validated = validateMediaUrls(artworkData);
  const labels = getLabels(isCn);

  // 定义详细导出的字段（含额外状态字段）
  const detailFields = [
    "artist",
    "title",
    "cover_img_url",
    "video_url",
    "type",
    "medium",
    "year",
    "size",
    "work_value",
    "sold",
    "order",
    "mark",
    "language",
    "updatedAt",
  ];

  return validated.map((artwork) => {
    const detailed = {};
    // 基础字段
    for (const key of detailFields) {
      let value = artwork[key];
      if (key === "updatedAt") {
        value = formatDateTime(value);
      } else {
        value = value ?? "";
      }
      detailed[labels[key]] = value;
    }
    // 状态字段
    detailed[isCn ? "封面图片状态" : "Cover Image Status"] =
      artwork.cover_img_valid === "Valid" ? (isCn ? "有效" : "Valid") : isCn ? "无效" : "Invalid";
    detailed[isCn ? "视频链接状态" : "Video URL Status"] =
      artwork.video_url_valid === "Valid" ? (isCn ? "有效" : "Valid") : isCn ? "无效" : "Invalid";
    return detailed;
  });
}

// ============ 8. 统计数据 ============
export function getArtworkStatistics(artworkData, isCn = false) {
  if (!Array.isArray(artworkData) || artworkData.length === 0) return {};
  const validated = validateMediaUrls(artworkData);

  return {
    total: artworkData.length,
    validCoverUrls: validated.filter((a) => a.cover_img_valid === "Valid").length,
    invalidCoverUrls: validated.filter((a) => a.cover_img_valid === "Invalid").length,
    validVideoUrls: validated.filter((a) => a.video_url_valid === "Valid").length,
    invalidVideoUrls: validated.filter((a) => a.video_url_valid === "Invalid").length,
    withArtist: validated.filter((a) => a.artist).length,
    withTitle: validated.filter((a) => a.title).length,
    withYear: validated.filter((a) => a.year).length,
    withType: validated.filter((a) => a.type).length,
    withMedium: validated.filter((a) => a.medium).length,
    withSeries: validated.filter((a) => a.series).length,
    withIntroduction: validated.filter((a) => a.introduction && a.introduction.length > 0).length,
    withRelatedGallery: validated.filter(
      (a) => a.related_gallery_exhibition && a.related_gallery_exhibition.length > 0
    ).length,
    sold: validated.filter((a) => a.sold && a.sold.toLowerCase() === "yes").length,
    withVideo: validated.filter((a) => a.video_url).length,
    withCoverImage: validated.filter((a) => a.cover_img_url).length,
    languages: [...new Set(validated.map((a) => a.language).filter(Boolean))],
  };
}

// ============ 9. 统计导出为行数组 ============
export function createArtworkStatisticsExport(artworkData, isCn = false) {
  const stats = getArtworkStatistics(artworkData, isCn);
  if (!stats.total) return [];

  const rows = [
    { metric: isCn ? "总数" : "Total", value: stats.total },
    { metric: isCn ? "有效封面链接" : "Valid Cover URLs", value: stats.validCoverUrls },
    { metric: isCn ? "无效封面链接" : "Invalid Cover URLs", value: stats.invalidCoverUrls },
    { metric: isCn ? "有效视频链接" : "Valid Video URLs", value: stats.validVideoUrls },
    { metric: isCn ? "无效视频链接" : "Invalid Video URLs", value: stats.invalidVideoUrls },
    { metric: isCn ? "包含艺术家" : "With Artist", value: stats.withArtist },
    { metric: isCn ? "包含标题" : "With Title", value: stats.withTitle },
    { metric: isCn ? "包含年份" : "With Year", value: stats.withYear },
    { metric: isCn ? "包含类型" : "With Type", value: stats.withType },
    { metric: isCn ? "包含媒介" : "With Medium", value: stats.withMedium },
    { metric: isCn ? "包含系列" : "With Series", value: stats.withSeries },
    { metric: isCn ? "包含介绍" : "With Introduction", value: stats.withIntroduction },
    {
      metric: isCn ? "包含关联画廊/展览" : "With Related Gallery/Exhibition",
      value: stats.withRelatedGallery,
    },
    { metric: isCn ? "已售出" : "Sold", value: stats.sold },
    { metric: isCn ? "包含视频" : "With Video", value: stats.withVideo },
    { metric: isCn ? "包含封面图片" : "With Cover Image", value: stats.withCoverImage },
    { metric: isCn ? "语言分布" : "Languages", value: stats.languages.join(", ") },
  ];

  return rows.map((row) => ({
    [isCn ? "统计项" : "Metric"]: row.metric,
    [isCn ? "数值" : "Value"]: row.value.toString(),
  }));
}

// ============ 10. 文件名生成 ============
export function getArtworkExportFilename(isCn = false, exportType = "comprehensive") {
  const timestamp = new Date().toISOString().split("T")[0];
  const prefix = isCn ? "作品数据" : "artwork_data";
  const types = {
    comprehensive: isCn ? "_完整" : "_comprehensive",
    simplified: isCn ? "_简化" : "_simplified",
    language: isCn ? "_语言" : "_language",
    bilingual: isCn ? "_双语" : "_bilingual",
    detailed: isCn ? "_详细" : "_detailed",
    statistics: isCn ? "_统计" : "_statistics",
  };
  const suffix = types[exportType] || "";
  return `${prefix}${suffix}_${timestamp}`;
}

// ============ 11. 格式化辅助（保留原有接口） ============
export function formatArtworkTitle(title, _titleCn, isCn = false) {
  return title || "";
}

export function formatArtworkArtist(artist, _artistCn, isCn = false) {
  return artist || "";
}

export function formatArtworkIntroduction(introduction, _introductionCn, isCn = false) {
  return Array.isArray(introduction) ? introduction.join("\n\n") : "";
}

export function isValidMediaUrl(url) {
  return !!(url && (url.startsWith("http://") || url.startsWith("https://")));
}

// ============ 12. 数据规范化（含新字段） ============
export const normalizeRow = (row) => {
  let mongoId = row._id?.$oid || row._id || row.id;
  if (mongoId && typeof mongoId === "object") {
    mongoId = mongoId.$oid || JSON.stringify(mongoId);
  }

  return {
    id: mongoId ? String(mongoId) : `temp_${Date.now()}_${Math.random()}`,
    _id: mongoId,
    artist: row.artist || "",
    title: row.title || "",
    type: row.type || "",
    medium: row.medium || "",
    year: row.year || "",
    size: row.size || "",
    series: row.series || "",
    caption: row.caption || "",
    duration: row.duration || "",
    credits: row.credits || "",
    special_thanks: row.special_thanks || "",
    introduction: Array.isArray(row.introduction) ? row.introduction : [],
    related_gallery_exhibition: Array.isArray(row.related_gallery_exhibition)
      ? row.related_gallery_exhibition
      : [],
    video_url: row.video_url || "",
    web_url: row.web_url || "",
    work_value: row.work_value || "",
    sold: row.sold || "",
    order: row.order || "",
    cover_img_url: row.cover_img_url || "",
    mark: row.mark || "",
    language: row.language || "",
    updatedAt: row.updatedAt || "",
    isNew: row.isNew || false,
  };
};