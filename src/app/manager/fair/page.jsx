"use client";

import React, { useMemo } from "react";
import { fairSchemaConfig } from "@/components/pages/manager/config/fairSchemaConfig";
import ManagerStructureLayout from "@/components/pages/manager/layouts/ManagerStructureLayout";

export default function FairManagerPage() {
  const managerSchemaConfig = useMemo(() => {
    return {
      ...fairSchemaConfig,
      dataConfig: {
        ...fairSchemaConfig.dataConfig,
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