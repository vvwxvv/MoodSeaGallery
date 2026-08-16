// enquireBatchEditUtils.js
// Utilities for Enquire model:
//   id, name, email, phone, message, related_gallery_artist, 
//   related_artwork_title, createdAt, status

import { exportToCSV } from "@/components/pages/manager/utils/batchEditCommonUtils";

// ── normalizeRow ──────────────────────────────────────────────────────────
export function normalizeRow(raw = {}) {
  return {
    id:  raw.id  ?? raw._id ?? `temp_${Date.now()}_${Math.random()}`,
    _id: raw._id ?? raw.id  ?? null,
    isNew: raw.isNew ?? false,

    name:                   raw.name                   ?? "",
    email:                  raw.email                  ?? "",
    phone:                  raw.phone                  ?? "",
    message:                raw.message                ?? "",
    related_gallery_artist: raw.related_gallery_artist ?? "",
    related_artwork_title:  raw.related_artwork_title  ?? "",
    status:                 raw.status                 ?? "Pending",
    createdAt:              raw.createdAt              ?? "",
  };
}

// ── getEnquireFieldGroups ─────────────────────────────────────────────────
export const getEnquireFieldGroups = (isCn) => {
  const groupKeyLabels = {
    core:    isCn ? "核心信息" : "Core Info",
    contact: isCn ? "联系方式" : "Contact Details",
    message: isCn ? "留言内容" : "Message",
    related: isCn ? "相关信息" : "Related Info",
    system:  isCn ? "系统信息" : "System",
  };

  return {
    core:    ["name", "email"],
    contact: ["phone"],
    message: ["message"],
    related: ["related_gallery_artist", "related_artwork_title"],
    system:  ["status", "createdAt"],
    groupKeyLabels,
  };
};

// ── getEnquireSchemaFields ────────────────────────────────────────────────
export const getEnquireSchemaFields = () => [
  { name: "name",                   labelKey: "name",                 label: "Name" },
  { name: "email",                  labelKey: "email",                label: "Email" },
  { name: "phone",                  labelKey: "phone",                label: "Phone" },
  { name: "message",                labelKey: "message",              label: "Message" },
  { name: "related_gallery_artist", labelKey: "relatedGalleryArtist", label: "Related Artist" },
  { name: "related_artwork_title",  labelKey: "relatedArtworkTitle",  label: "Related Artwork" },
  { name: "status",                 labelKey: "status",               label: "Status" },
  { name: "createdAt",              labelKey: "createdAt",            label: "Created At" },
];

// ── getEnquireFieldTypes ──────────────────────────────────────────────────
export const getEnquireFieldTypes = () => ({
  arrayFields:     [],
  multilineFields: ["message"],
});

// ── exportEnquireToCSV ────────────────────────────────────────────────────
export const exportEnquireToCSV = (data, filename) => {
  const headers = [
    "name",
    "email",
    "phone",
    "message",
    "related_gallery_artist",
    "related_artwork_title",
    "status",
    "createdAt",
  ];
  exportToCSV(data, headers, filename || `enquiry_${new Date().toISOString().slice(0, 10)}.csv`);
};