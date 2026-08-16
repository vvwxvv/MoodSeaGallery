export const enquireApiConfig = {
  collectionName: "Enquire",
  enablePagination: false,
  defaultPageSize: 1000,
  maxPageSize: 1000,
  enableSearch: true,
  enableSorting: true,
  enableSoftDelete: false,
  enableBulkOperations: false,
  requiredFields: ["name", "email"],
  searchableFields: ["name", "email", "phone", "message", "related_artwork_title", "related_gallery_artist"],
  arrayFields: [],
  validFields: [
    "_id",
    "name",
    "email",
    "phone",
    "message",
    "related_artwork_title",
    "related_gallery_artist",
    "status",
    "createdAt",
    "updatedAt",
  ],
  defaultSortField: "createdAt",
  defaultSortOrder: -1,

  beforeCreate: async (data) => {
    data.createdAt = new Date().toISOString();
    data.status = data.status || "Pending";
    return data;
  },
};
