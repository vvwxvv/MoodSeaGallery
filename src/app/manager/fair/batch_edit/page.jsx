"use client";

import React, { useCallback } from "react";
import { Typography, Divider, Box } from "@mui/material";
import BatchEditLayout from "@/components/pages/manager/batch_edit/BatchEditLayout";
import BatchGroupList  from "@/components/pages/manager/batch_edit/components/BatchGroupList";
import { PAGE_CONFIGS } from "@/components/pages/manager/config/schemaBatchGroupConfig";
import batch_text_labels from "@/components/labels/batch_text_labels";

import {
  normalizeRow,
  getFairSchemaFields,
  getFairFieldGroups,
  getFairFieldTypes,
} from "@/components/pages/manager/utils/fairBatchEditUtils";

const ACTIVE_CONFIG = PAGE_CONFIGS.fair || PAGE_CONFIGS.artwork;

export default function FairBatchEditPage() {
  const csvHeaders = [
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

  const renderDeleteRow = useCallback(
    (row, index, selectedRowsData, labelFontStyle, getLabel, isCn) => {
      const t      = isCn ? batch_text_labels.CN : batch_text_labels.EN;
      const title  = row.title  || t.UNTITLED       || "Untitled";
      const venue  = row.venue  || t.UNKNOWN_VENUE  || "Unknown Venue";

      return (
        <React.Fragment key={row.id ?? index}>
          <Box sx={{ py: 0.75, px: 0 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, ...labelFontStyle }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", ...labelFontStyle }}
            >
              {[venue, row.year, row.organiser].filter(Boolean).join(" · ")}
            </Typography>
          </Box>
          {index < selectedRowsData.length - 1 && <Divider />}
        </React.Fragment>
      );
    },
    []
  );

  const renderList = useCallback(
    (
      rows,
      _isCn,
      labelFontStyle,
      {
        onCellUpdate,
        selectedRows = [],
        onSelectRow,
        onSelectAll,
        columns = [],
        getLabel,
      } = {}
    ) => (
      <BatchGroupList
        config={ACTIVE_CONFIG}
        rows={rows}
        labelFontStyle={labelFontStyle}
        columns={columns}
        selectedRows={selectedRows}
        onSelectRow={onSelectRow}
        onSelectAll={onSelectAll}
        onCellUpdate={onCellUpdate}
        getLabel={getLabel}
      />
    ),
    []
  );

  return (
    <BatchEditLayout
      entityName="fair"
      apiEndpoint="/api/fair"
      normalizeRow={normalizeRow}
      getSchemaFields={getFairSchemaFields}
      getFieldGroups={getFairFieldGroups}
      getFieldTypes={getFairFieldTypes}
      alphabetField="title"
      csvHeaders={csvHeaders}
      renderDeleteRow={renderDeleteRow}
      renderList={renderList}
      titles={{ en: "Fair Batch Edit", cn: "博览会批量编辑" }}
      defaultFieldGroup="core"
    />
  );
}