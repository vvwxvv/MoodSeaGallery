/**
 * fairBatchEditUtils.js
 * Utilities for Fair model:
 *   id, title, section, type, date_start, date_end, vip_preview_date, year,
 *   booth, venue, location, organiser, curator, participating_artists, caption,
 *   press_release[], related_artwork_title[], related_gallery_artist[],
 *   cover_img_url, web_url, video_url, language, order, mark, status, updatedAt
 */

import { exportToCSV } from "@/components/pages/manager/utils/batchEditCommonUtils";

// ── normalizeRow ──────────────────────────────────────────────────────────
export function normalizeRow(raw = {}) {
  return {
    id: raw.id ?? raw._id ?? `temp_${Date.now()}_${Math.random()}`,
    _id: raw._id ?? raw.id ?? null,
    isNew: raw.isNew ?? false,

    title: raw.title ?? "",
    section: raw.section ?? "",
    type: raw.type ?? "",
    date_start: raw.date_start ?? "",
    date_end: raw.date_end ?? "",
    vip_preview_date: raw.vip_preview_date ?? "",
    year: raw.year ?? "",
    booth: raw.booth ?? "",
    venue: raw.venue ?? "",
    location: raw.location ?? "",
    organiser: raw.organiser ?? "",
    curator: raw.curator ?? "",
    participating_artists: raw.participating_artists ?? "",
    caption: raw.caption ?? "",

    press_release: Array.isArray(raw.press_release)
      ? raw.press_release
      : raw.press_release
        ? [raw.press_release]
        : [],

    related_artwork_title: Array.isArray(raw.related_artwork_title)
      ? raw.related_artwork_title
      : raw.related_artwork_title
        ? [raw.related_artwork_title]
        : [],

    related_gallery_artist: Array.isArray(raw.related_gallery_artist)
      ? raw.related_gallery_artist
      : raw.related_gallery_artist
        ? [raw.related_gallery_artist]
        : [],

    cover_img_url: raw.cover_img_url ?? "",
    web_url: raw.web_url ?? "",
    video_url: raw.video_url ?? "",
    language: raw.language ?? "",
    order: raw.order ?? "",
    mark: raw.mark ?? "",
    status: raw.status ?? "",
  };
}

// ── getFairFieldGroups ──────────────────────────────────────────────────
export const getFairFieldGroups = (isCn) => {
  const groupKeyLabels = {
    basic: isCn ? "基础信息" : "Basic Info",
    dates: isCn ? "日期信息" : "Date Info",
    location: isCn ? "位置信息" : "Location",
    people: isCn ? "人员信息" : "People",
    content: isCn ? "内容" : "Content",
    relations: isCn ? "关联关系" : "Relations",
    links: isCn ? "链接" : "Links",
    classification: isCn ? "分类" : "Classification",
  };

  return {
    basic: ["title", "section", "type", "year", "cover_img_url"],
    dates: ["date_start", "date_end", "vip_preview_date"],
    location: ["venue", "location", "booth"],
    people: ["organiser", "curator", "participating_artists"],
    content: ["caption", "press_release"],
    relations: ["related_artwork_title", "related_gallery_artist"],
    links: ["web_url", "video_url"],
    classification: ["language", "order", "mark", "status"],
    groupKeyLabels,
  };
};

// ── getFairSchemaFields ──────────────────────────────────────────────────
export const getFairSchemaFields = () => [
  { name: "title", labelKey: "title", label: "Title" },
  { name: "section", labelKey: "section", label: "Section" },
  { name: "type", labelKey: "type", label: "Type" },
  { name: "date_start", labelKey: "dateStart", label: "Start Date" },
  { name: "date_end", labelKey: "dateEnd", label: "End Date" },
  { name: "vip_preview_date", labelKey: "vipPreviewDate", label: "VIP Preview Date" },
  { name: "year", labelKey: "year", label: "Year" },
  { name: "booth", labelKey: "booth", label: "Booth" },
  { name: "venue", labelKey: "venue", label: "Venue" },
  { name: "location", labelKey: "location", label: "Location" },
  { name: "organiser", labelKey: "organiser", label: "Organiser" },
  { name: "curator", labelKey: "curator", label: "Curator" },
  { name: "participating_artists", labelKey: "participatingArtists", label: "Participating Artists" },
  { name: "caption", labelKey: "caption", label: "Caption" },
  { name: "press_release", labelKey: "pressRelease", label: "Press Release" },
  { name: "related_artwork_title", labelKey: "relatedArtworkTitle", label: "Related Artwork Title" },
  { name: "related_gallery_artist", labelKey: "relatedGalleryArtist", label: "Related Gallery Artist" },
  { name: "cover_img_url", labelKey: "coverImageUrl", label: "Cover Image URL" },
  { name: "web_url", labelKey: "webUrl", label: "Web URL" },
  { name: "video_url", labelKey: "videoUrl", label: "Video URL" },
  { name: "language", labelKey: "language", label: "Language" },
  { name: "order", labelKey: "order", label: "Order" },
  { name: "mark", labelKey: "mark", label: "Mark" },
  { name: "status", labelKey: "status", label: "Status" },
];

// ── getFairFieldTypes ────────────────────────────────────────────────────
export const getFairFieldTypes = () => ({
  arrayFields: [
    "press_release",
    "related_artwork_title",
    "related_gallery_artist",
  ],
  multilineFields: ["caption", "participating_artists"],
});

// ── exportFairToCSV ──────────────────────────────────────────────────────
export const exportFairToCSV = (data, filename) => {
  const headers = [
    "title",
    "section",
    "type",
    "date_start",
    "date_end",
    "vip_preview_date",
    "year",
    "booth",
    "venue",
    "location",
    "organiser",
    "curator",
    "participating_artists",
    "caption",
    "press_release",
    "related_artwork_title",
    "related_gallery_artist",
    "cover_img_url",
    "web_url",
    "video_url",
    "language",
    "order",
    "mark",
    "status",
  ];
  exportToCSV(data, headers, filename || `fair_${new Date().toISOString().slice(0, 10)}.csv`);
};

// ── checkForChanges ──────────────────────────────────────────────────────
export const checkForChanges = (currentData, origData) => {
  const newItems = currentData.filter(
    (item) => item.isNew && (!item._id || item.id.startsWith("temp"))
  );
  if (newItems.length > 0) return true;

  const existingItems = currentData.filter(
    (item) => item._id && !item.id.startsWith("temp") && !item.isNew
  );
  const modifiedItems = existingItems.filter((item) => {
    const original = origData.find((orig) => orig._id === item._id);
    if (!original) return false;
    return Object.keys(item).some((key) => {
      if (key === "id" || key === "_id" || key === "isNew") return false;
      return JSON.stringify(item[key]) !== JSON.stringify(original[key]);
    });
  });

  return modifiedItems.length > 0;
};

// ── hasNewRowsInData ──────────────────────────────────────────────────────
export const hasNewRowsInData = (data) => {
  return data.some(
    (item) => item.isNew && (!item._id || item.id?.startsWith("temp"))
  );
};

// ── calculateChanges ──────────────────────────────────────────────────────
export const calculateChanges = (data, originalData) => {
  const newItems = data.filter(
    (item) => item.isNew && (!item._id || item.id.startsWith("temp"))
  );
  const existingItems = data.filter(
    (item) => item._id && !item.id.startsWith("temp") && !item.isNew
  );
  const modifiedItems = existingItems.filter((item) => {
    const original = originalData.find((orig) => orig._id === item._id);
    if (!original) return false;
    return Object.keys(item).some((key) => {
      if (key === "id" || key === "_id" || key === "isNew") return false;
      return JSON.stringify(item[key]) !== JSON.stringify(original[key]);
    });
  });
  return {
    newCount: newItems.length,
    modifiedCount: modifiedItems.length,
  };
};

// ── filterBySearchTerm ────────────────────────────────────────────────────
export const filterBySearchTerm = (data, searchTerm) => {
  if (!searchTerm) return data;

  return data.filter((item) => {
    if (!item) return true;
    try {
      const searchLower = searchTerm.toLowerCase();
      return Object.values(item).some((value) => {
        if (Array.isArray(value)) {
          return value.some((v) =>
            String(v).toLowerCase().includes(searchLower)
          );
        }
        return value && String(value).toLowerCase().includes(searchLower);
      });
    } catch {
      return true;
    }
  });
};

// ── sortDataByColumn ──────────────────────────────────────────────────────
export const sortDataByColumn = (data, orderBy, order, columns) => {
  if (!orderBy) return data;

  return [...data].sort((a, b) => {
    const column = columns.find((col) => col.field === orderBy);
    const isNumeric = column?.fieldType === "number" || column?.type === "number";
    let aValue = a[orderBy];
    let bValue = b[orderBy];

    if (isNumeric) {
      aValue = parseFloat(aValue) || 0;
      bValue = parseFloat(bValue) || 0;
      return order === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      aValue = String(aValue || "").toLowerCase();
      bValue = String(bValue || "").toLowerCase();
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });
};

// ── pluralize ─────────────────────────────────────────────────────────────
export const pluralize = (count, singular, plural) => {
  return count === 1 ? singular : plural;
};