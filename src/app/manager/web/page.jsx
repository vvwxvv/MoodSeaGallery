"use client";

import React, { useMemo } from "react";
import { webSchemaConfig } from "@/components/pages/manager/config/webSchemaConfig";
import ManagerStructureLayout from "@/components/pages/manager/layouts/ManagerStructureLayout";

export default function WebManagerPage() {
  const managerSchemaConfig = useMemo(() => {
    return {
      ...webSchemaConfig,
      dataConfig: {
        ...webSchemaConfig.dataConfig,
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
