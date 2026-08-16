/**
 * ----------------------------------------------------------------------------
 * Exhibition Export Utilities – Compatible with Prisma Exhibition model
 * ----------------------------------------------------------------------------
 * Model fields used:
 *   id, title, subtitle, type, date_start, date_end, opening_date, year,
 *   venue, location, curator, organiser, participating_artists, caption,
 *   description, introduction[], press_release[], related_artwork_title[],
 *   related_gallery_artist[], cover_img_url, web_url, video_url, language,
 *   order, mark, status, updatedAt
 * ----------------------------------------------------------------------------
 */

/**
 * Creates a comprehensive export with all fields from the Exhibition model.
 * @param {Array} exhibitionData - Array of exhibition objects (as per Prisma model)
 * @param {boolean} isCn - If true, uses Chinese column labels; otherwise English
 * @returns {Array} Formatted data for CSV/export
 */
export function createComprehensiveExhibitionExport(exhibitionData, isCn) {
  if (!Array.isArray(exhibitionData)) return [];

  return exhibitionData.map((item) => ({
    ID: item.id || "",
    Title: item.title || "",
    Subtitle: item.subtitle || "",
    Type: item.type || "",
    "Start Date": item.date_start || "",
    "End Date": item.date_end || "",
    "Opening Date": item.opening_date || "",
    Year: item.year || "",
    Venue: item.venue || "",
    Location: item.location || "",
    Curator: item.curator || "",
    Organiser: item.organiser || "",
    "Participating Artists": item.participating_artists || "",
    Caption: item.caption || "",
    Description: item.description || "",
    Introduction: (item.introduction || []).join("; "),
    "Press Release": (item.press_release || []).join("; "),
    "Related Artwork Title": (item.related_artwork_title || []).join("; "),
    "Related Gallery Artist": (item.related_gallery_artist || []).join("; "),
    "Cover Image URL": item.cover_img_url || "",
    "Web URL": item.web_url || "",
    "Video URL": item.video_url || "",
    Language: item.language || "",
    Order: item.order || "",
    Mark: item.mark || "",
    Status: item.status || "",
    "Last Updated": item.updatedAt
      ? new Date(item.updatedAt).toLocaleDateString(isCn ? "zh-CN" : "en-US")
      : "",
  }));
}

/**
 * Formats Exhibition data for CSV export with all fields, using dynamic column headers.
 * @param {Array} exhibitionData - Array of exhibition objects
 * @param {boolean} isCn - Whether to use Chinese labels
 * @returns {Array} Formatted data
 */
export function formatExhibitionDataForCSV(exhibitionData, isCn = false) {
  if (!Array.isArray(exhibitionData) || exhibitionData.length === 0) return [];

  const fieldMappings = {
    id: isCn ? "ID" : "ID",
    title: isCn ? "标题" : "Title",
    subtitle: isCn ? "副标题" : "Subtitle",
    type: isCn ? "类型" : "Type",
    date_start: isCn ? "开始日期" : "Start Date",
    date_end: isCn ? "结束日期" : "End Date",
    opening_date: isCn ? "开幕日期" : "Opening Date",
    year: isCn ? "年份" : "Year",
    venue: isCn ? "场馆" : "Venue",
    location: isCn ? "地点" : "Location",
    curator: isCn ? "策展人" : "Curator",
    organiser: isCn ? "主办方" : "Organiser",
    participating_artists: isCn ? "参展艺术家" : "Participating Artists",
    caption: isCn ? "说明" : "Caption",
    description: isCn ? "描述" : "Description",
    introduction: isCn ? "介绍" : "Introduction",
    press_release: isCn ? "新闻稿" : "Press Release",
    related_artwork_title: isCn ? "关联作品" : "Related Artwork Title",
    related_gallery_artist: isCn ? "关联画廊艺术家" : "Related Gallery Artist",
    cover_img_url: isCn ? "封面图片" : "Cover Image URL",
    web_url: isCn ? "网页链接" : "Web URL",
    video_url: isCn ? "视频链接" : "Video URL",
    language: isCn ? "语言" : "Language",
    order: isCn ? "排序" : "Order",
    mark: isCn ? "标记" : "Mark",
    status: isCn ? "状态" : "Status",
    updatedAt: isCn ? "更新时间" : "Updated At",
  };

  const arrayFields = [
    "introduction",
    "press_release",
    "related_artwork_title",
    "related_gallery_artist",
  ];

  return exhibitionData.map((exhibition) => {
    const formatted = {};
    for (const [key, label] of Object.entries(fieldMappings)) {
      let value = exhibition[key];
      if (arrayFields.includes(key) && Array.isArray(value)) {
        value = value.join(" | ");
      } else if (key === "updatedAt" && value) {
        try {
          const date = new Date(value);
          value = date.toISOString().split("T")[0] + " " + date.toTimeString().split(" ")[0];
        } catch {
          value = "";
        }
      } else {
        value = value ?? "";
      }
      formatted[label] = value;
    }
    return formatted;
  });
}

/**
 * Normalize an incoming row (from CSV or external source) to match the Prisma Exhibition model.
 * Handles both plain objects and MongoDB `_id` wrappers.
 * @param {Object} row
 * @returns {Object}
 */
export const normalizeRow = (row) => {
  let mongoId = row._id?.$oid || row._id || row.id;
  if (mongoId && typeof mongoId === "object") {
    mongoId = mongoId.$oid || JSON.stringify(mongoId);
  }

  return {
    id: mongoId ? String(mongoId) : `temp_${Date.now()}_${Math.random()}`,
    _id: mongoId,
    title: row.title || "",
    subtitle: row.subtitle || "",
    type: row.type || "",
    date_start: row.date_start || "",
    date_end: row.date_end || "",
    opening_date: row.opening_date || "",
    year: row.year || "",
    venue: row.venue || "",
    location: row.location || "",
    curator: row.curator || "",
    organiser: row.organiser || "",
    participating_artists: row.participating_artists || "",
    caption: row.caption || "",
    description: row.description || "",
    introduction: Array.isArray(row.introduction) ? row.introduction : [],
    press_release: Array.isArray(row.press_release) ? row.press_release : [],
    related_artwork_title: Array.isArray(row.related_artwork_title) ? row.related_artwork_title : [],
    related_gallery_artist: Array.isArray(row.related_gallery_artist) ? row.related_gallery_artist : [],
    cover_img_url: row.cover_img_url || "",
    web_url: row.web_url || "",
    video_url: row.video_url || "",
    language: row.language || "",
    order: row.order || "",
    mark: row.mark || "",
    status: row.status || "",
    updatedAt: row.updatedAt || "",
    isNew: row.isNew || false,
  };
};
