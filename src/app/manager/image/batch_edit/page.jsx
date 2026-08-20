"use client";

import React, { useCallback } from "react";
import { Typography, Divider, Box } from "@mui/material";
import BatchEditLayout  from "@/components/pages/manager/batch_edit/BatchEditLayout";
import BatchGroupList from "@/components/pages/manager/batch_edit/components/BatchGroupList";
import { PAGE_CONFIGS } from "@/components/pages/manager/config/schemaBatchGroupConfig";
import { normalizeRow } from "@/components/pages/manager/utils/imageExportUtils";
import {
  getImageFieldGroups,
  getImageSchemaFields,
  getImageFieldTypes,
} from "@/components/pages/manager/utils/imageBatchEditUtils";
import batch_text_labels from "@/components/labels/batch_text_labels";

// ── Change this one line to switch group-by field ──────────────────────────
const ACTIVE_CONFIG = PAGE_CONFIGS.image;   // groups by tag_en / tag_cn
// ──────────────────────────────────────────────────────────────────────────

export default function ImageBatchEditPage() {
  const csvHeaders = [
    "img_url",
    "tag_en",    "tag_cn",
    "type",
    "caption_en","caption_cn",
    "mark",      "tag_source", "order",
  ];

  const renderDeleteRow = useCallback(
    (row, index, selectedRowsData, labelFontStyle, getLabel, isCn) => {
      const t   = isCn ? batch_text_labels.CN : batch_text_labels.EN;
      const tag = row.tag_cn || row.tag_en || t.UNTITLED || "Untitled";
      return (
        <React.Fragment key={row.id ?? index}>
          <Box sx={{ py: 0.75, px: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, ...labelFontStyle }}>
              {tag}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", ...labelFontStyle }}>
              {[row.type, row.caption_cn || row.caption_en].filter(Boolean).join(" · ")}
            </Typography>
          </Box>
          {index < selectedRowsData.length - 1 && <Divider />}
        </React.Fragment>
      );
    },
    []
  );

  const renderList = useCallback(
    (rows, isCn, labelFontStyle, { onCellUpdate, selectedRows = [], onSelectRow, onSelectAll, columns = [], getLabel } = {}) => (
      <BatchGroupList
        config={ACTIVE_CONFIG}
        rows={rows}
        isCn={isCn}
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
      entityName="image"
      apiEndpoint="/api/image"
      normalizeRow={normalizeRow}
      getFieldGroups={getImageFieldGroups}
      getSchemaFields={getImageSchemaFields}
      getFieldTypes={getImageFieldTypes}
      alphabetField="tag_en"
      csvHeaders={csvHeaders}
      renderDeleteRow={renderDeleteRow}
      renderList={renderList}
      titles={{ en: "Image Batch Edit", cn: "图片批量编辑" }}
      defaultFieldGroup="core"
    />
  );
}