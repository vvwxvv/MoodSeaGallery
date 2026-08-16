"use client";
import React, { useMemo } from "react";
import { eventSchemaConfig } from "@/components/pages/manager/config/eventSchemaConfig";

import ManagerStructureLayout from "@/components/pages/manager/layouts/ManagerStructureLayout";

export default function EventManagerPage() {
  const managerSchemaConfig = useMemo(() => {
    return {
      ...eventSchemaConfig,
      dataConfig: {
        ...eventSchemaConfig.dataConfig,
        defaultSort: { field: "order", direction: "asc" },
        groupConfig: {
          enabled: true,
          field: "type",
          applyTo: ["grid", "list"],
          sortGroups: true,
          emptyLabel: "Ungrouped",
        },
      },
    };
  }, []);

  return <ManagerStructureLayout managerSchemaConfig={managerSchemaConfig} />;
}