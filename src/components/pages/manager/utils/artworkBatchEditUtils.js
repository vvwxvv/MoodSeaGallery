// artworkBatchEditUtils.js
// Utilities for Artwork model (Prisma) including related_gallery_exhibition
// Fields:
//   id, cover_img_url, related_gallery_exhibition, artist, title, type, medium,
//   year, size, series, caption, duration, credits, special_thanks, introduction[],
//   video_url, web_url, work_value, sold, order, mark, language, updatedAt

import { exportToCSV } from "@/components/pages/manager/utils/batchEditCommonUtils";

// ── normalizeRow ──────────────────────────────────────────────────────────
export function normalizeRow(raw = {}) {
  // Normalize related_gallery_exhibition: ensure array
  let relatedGallery = raw.related_gallery_exhibition;
  if (Array.isArray(relatedGallery)) {
    // keep as is
  } else if (typeof relatedGallery === "string" && relatedGallery.trim() !== "") {
    // If it's a string, split by common delimiters (; or ,) -> fallback to single item
    relatedGallery = relatedGallery.split(/[;,]\s*/).filter(Boolean);
  } else {
    relatedGallery = [];
  }

  return {
    id:  raw.id  ?? raw._id ?? `temp_${Date.now()}_${Math.random()}`,
    _id: raw._id ?? raw.id  ?? null,
    isNew: raw.isNew ?? false,

    cover_img_url:  raw.cover_img_url  ?? "",
    artist:         raw.artist         ?? "",
    title:          raw.title          ?? "",
    type:           raw.type           ?? "",
    medium:         raw.medium         ?? "",
    year:           raw.year           ?? "",
    size:           raw.size           ?? "",
    series:         raw.series         ?? "",
    caption:        raw.caption        ?? "",
    duration:       raw.duration       ?? "",
    credits:        raw.credits        ?? "",
    special_thanks: raw.special_thanks ?? "",

    introduction: Array.isArray(raw.introduction)
      ? raw.introduction
      : raw.introduction
        ? [raw.introduction]
        : [],

    related_gallery_exhibition: relatedGallery,

    video_url:  raw.video_url  ?? "",
    web_url:    raw.web_url    ?? "",
    work_value: raw.work_value ?? "",
    sold:       raw.sold       ?? "",
    order:      raw.order      ?? "",
    mark:       raw.mark       ?? "",
    language:   raw.language   ?? "",
  };
}

// ── getArtworkFieldGroups ─────────────────────────────────────────────────
export const getArtworkFieldGroups = (isCn) => {
  const groupKeyLabels = {
    core:           isCn ? "核心信息" : "Core Info",
    content:        isCn ? "内容"     : "Content",
    details:        isCn ? "作品详情" : "Artwork Details",
    links:          isCn ? "链接"     : "Links",
    classification: isCn ? "分类"     : "Classification",
  };

  return {
    core:           ["artist", "title", "cover_img_url"],
    content:        ["introduction", "caption", "credits", "special_thanks"],
    details:        [
      "type", "medium", "year", "size", "series", "duration",
      "work_value", "sold", "related_gallery_exhibition"   // <-- added here
    ],
    links:          ["video_url", "web_url"],
    classification: ["language", "order", "mark"],
    groupKeyLabels,
  };
};

// ── getArtworkSchemaFields ────────────────────────────────────────────────
export const getArtworkSchemaFields = () => [
  { name: "cover_img_url",  labelKey: "coverImageUrl",  label: "Cover Image URL"  },
  { name: "artist",         labelKey: "artist",         label: "Artist"           },
  { name: "title",          labelKey: "title",          label: "Title"            },
  { name: "type",           labelKey: "type",           label: "Type"             },
  { name: "medium",         labelKey: "medium",         label: "Medium"           },
  { name: "year",           labelKey: "year",           label: "Year"             },
  { name: "size",           labelKey: "size",           label: "Size"             },
  { name: "series",         labelKey: "series",         label: "Series"           },
  { name: "caption",        labelKey: "caption",        label: "Caption"          },
  { name: "duration",       labelKey: "duration",       label: "Duration"         },
  { name: "credits",        labelKey: "credits",        label: "Credits"          },
  { name: "special_thanks", labelKey: "specialThanks",  label: "Special Thanks"   },
  { name: "introduction",   labelKey: "introduction",   label: "Introduction"     },
  { name: "related_gallery_exhibition", labelKey: "relatedGallery", label: "Related Gallery/Exhibition" }, // <-- new
  { name: "video_url",      labelKey: "videoUrl",       label: "Video URL"        },
  { name: "web_url",        labelKey: "webUrl",         label: "Web URL"          },
  { name: "work_value",     labelKey: "workValue",      label: "Work Value"       },
  { name: "sold",           labelKey: "sold",           label: "Sold"             },
  { name: "order",          labelKey: "order",          label: "Order"            },
  { name: "mark",           labelKey: "mark",           label: "Mark"             },
  { name: "language",       labelKey: "language",       label: "Language"         },
];

// ── getArtworkFieldTypes ──────────────────────────────────────────────────
export const getArtworkFieldTypes = () => ({
  arrayFields:     ["introduction", "related_gallery_exhibition"],  // <-- added
  multilineFields: ["caption", "credits", "special_thanks"],
});

// ── exportArtworkToCSV ────────────────────────────────────────────────────
export const exportArtworkToCSV = (data, filename) => {
  const headers = [
    "cover_img_url",
    "artist",
    "title",
    "type",
    "medium",
    "year",
    "size",
    "series",
    "caption",
    "duration",
    "credits",
    "special_thanks",
    "introduction",
    "related_gallery_exhibition",   // <-- added
    "video_url",
    "web_url",
    "work_value",
    "sold",
    "order",
    "mark",
    "language",
  ];

  // Convert array fields to semicolon‑separated strings for CSV readability
  const arrayFields = ["introduction", "related_gallery_exhibition"];
  const exportData = data.map((item) => {
    const record = { ...item };
    for (const field of arrayFields) {
      if (Array.isArray(record[field])) {
        record[field] = record[field].join("; ");
      } else if (record[field] && typeof record[field] !== "string") {
        record[field] = String(record[field]);
      }
    }
    return record;
  });

  exportToCSV(exportData, headers, filename || `artwork_${new Date().toISOString().slice(0, 10)}.csv`);
};