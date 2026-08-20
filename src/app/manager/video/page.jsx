"use client";

import React, { useMemo } from "react";
import { videoSchemaConfig } from "@/components/pages/manager/config/videoSchemaConfig";
import ManagerStructureLayout from "@/components/pages/manager/layouts/ManagerStructureLayout";

export default function VideoManagerPage() {
  const managerSchemaConfig = useMemo(() => {
    return {
      ...videoSchemaConfig,
      dataConfig: {
        ...videoSchemaConfig.dataConfig,
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
