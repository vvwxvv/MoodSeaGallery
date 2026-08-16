"use client";

import React, { useMemo } from "react";
import { bibliographySchemaConfig } from "@/components/pages/manager/config/bibliographySchemaConfig";
import ManagerStructureLayout from "@/components/pages/manager/layouts/ManagerStructureLayout";

export default function bibliographyManagerPage() {
  const managerSchemaConfig = useMemo(() => {
    return {
      ...bibliographySchemaConfig,
      dataConfig: {
        ...bibliographySchemaConfig.dataConfig,
        defaultSort: { field: "order", direction: "asc" },
        groupConfig: {
          enabled: true,
          field: "artist",
          applyTo: ["grid", "list"],
          sortGroups: true,
          emptyLabel: "Ungrouped",
        },
      },
    };
  }, []);

  return <ManagerStructureLayout managerSchemaConfig={managerSchemaConfig} />;
}