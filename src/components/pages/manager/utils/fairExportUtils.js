/**
 * ----------------------------------------------------------------------------
 * Fair Export Utilities – Compatible with Prisma Fair model
 * ----------------------------------------------------------------------------
 * Model fields used:
 *   id, title, section, type, date_start, date_end, vip_preview_date, year,
 *   booth, venue, location, organiser, curator, participating_artists, caption,
 *   press_release[], related_artwork_title[], related_gallery_artist[],
 *   cover_img_url, web_url, video_url, language, order, mark, status, updatedAt
 * ----------------------------------------------------------------------------
 */

/**
 * Creates a comprehensive export with all fields from the Fair model.
 * @param {Array} fairData - Array of fair objects (as per Prisma model)
 * @param {boolean} isCn - If true, uses Chinese column labels; otherwise English
 * @returns {Array} Formatted data for CSV/export
 */
export function createComprehensiveFairExport(fairData, isCn) {
  if (!Array.isArray(fairData)) return [];

  return fairData.map((item) => ({
    ID: item.id || "",
    Title: item.title || "",
    Section: item.section || "",
    Type: item.type || "",
    "Start Date": item.date_start || "",
    "End Date": item.date_end || "",
    "VIP Preview Date": item.vip_preview_date || "",
    Year: item.year || "",
    Booth: item.booth || "",
    Venue: item.venue || "",
    Location: item.location || "",
    Organiser: item.organiser || "",
    Curator: item.curator || "",
    "Participating Artists": item.participating_artists || "",
    Caption: item.caption || "",
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
 * Formats Fair data for CSV export with all fields, using dynamic column headers.
 * @param {Array} fairData - Array of fair objects
 * @param {boolean} isCn - Whether to use Chinese labels
 * @returns {Array} Formatted data
 */
export function formatFairDataForCSV(fairData, isCn = false) {
  if (!Array.isArray(fairData) || fairData.length === 0) return [];

  const fieldMappings = {
    id: isCn ? "ID" : "ID",
    title: isCn ? "标题" : "Title",
    section: isCn ? "板块" : "Section",
    type: isCn ? "类型" : "Type",
    date_start: isCn ? "开始日期" : "Start Date",
    date_end: isCn ? "结束日期" : "End Date",
    vip_preview_date: isCn ? "VIP预览日期" : "VIP Preview Date",
    year: isCn ? "年份" : "Year",
    booth: isCn ? "展位" : "Booth",
    venue: isCn ? "场馆" : "Venue",
    location: isCn ? "地点" : "Location",
    organiser: isCn ? "主办方" : "Organiser",
    curator: isCn ? "策展人" : "Curator",
    participating_artists: isCn ? "参展艺术家" : "Participating Artists",
    caption: isCn ? "说明" : "Caption",
    press_release: isCn ? "新闻稿" : "Press Release",
    related_artwork_title: isCn ? "关联作品标题" : "Related Artwork Title",
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
    "press_release",
    "related_artwork_title",
    "related_gallery_artist",
  ];

  return fairData.map((fair) => {
    const formatted = {};
    for (const [key, label] of Object.entries(fieldMappings)) {
      let value = fair[key];
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
 * Normalize an incoming row (from CSV or external source) to match the Prisma Fair model.
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
    section: row.section || "",
    type: row.type || "",
    date_start: row.date_start || "",
    date_end: row.date_end || "",
    vip_preview_date: row.vip_preview_date || "",
    year: row.year || "",
    booth: row.booth || "",
    venue: row.venue || "",
    location: row.location || "",
    organiser: row.organiser || "",
    curator: row.curator || "",
    participating_artists: row.participating_artists || "",
    caption: row.caption || "",
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