"use client";
import React, { useMemo } from "react";
import {imageSchemaConfig } from "@/components/pages/manager/config/imageSchemaConfig";

import ManagerStructureLayout from "@/components/pages/manager/layouts/ManagerStructureLayout";

export default function ImageSManagerPage() {
  const managerSchemaConfig = useMemo(() => {
    return {
      ...imageSchemaConfig,
      dataConfig: {
        ...imageSchemaConfig.dataConfig,
        groupConfig: {
          enabled: true,
          field: "tag_en",                // base name (uses series_en / series_cn)
          bilingual: "both",             // ← shows both languages
          bilingualSeparator: " / ",     // optional, defaults to " / "
          applyTo: ["grid", "list"],
          sortGroups: true,
          emptyLabel: { EN: "Ungrouped", CN: "未分组" },
        },
  
      },
    };
  }, []);

  return (
    <ManagerStructureLayout managerSchemaConfig={managerSchemaConfig} />
  );
}