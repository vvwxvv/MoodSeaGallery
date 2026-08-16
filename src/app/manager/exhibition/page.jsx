"use client";

import React, { useMemo } from "react";
import { exhibitionSchemaConfig } from "@/components/pages/manager/config/exhibitionSchemaConfig";
import ManagerStructureLayout from "@/components/pages/manager/layouts/ManagerStructureLayout";

export default function ExhibitionManagerPage() {
  const managerSchemaConfig = useMemo(() => {
    return {
      ...exhibitionSchemaConfig,
      dataConfig: {
        ...exhibitionSchemaConfig.dataConfig,
        defaultSort: { field: "order", direction: "asc" },
        groupConfig: {
          enabled: true,
          field: "year",
          applyTo: ["grid", "list"],
          sortGroups: true,
          emptyLabel: "Ungrouped",
        },
      },
    };
  }, []);

  return <ManagerStructureLayout managerSchemaConfig={managerSchemaConfig} />;
}
