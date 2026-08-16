"use client";

import React, { useMemo } from "react";
import { writingSchemaConfig } from "@/components/pages/manager/config/writingSchemaConfig";
import ManagerStructureLayout from "@/components/pages/manager/layouts/ManagerStructureLayout";

export default function WritingManagerPage() {
  const managerSchemaConfig = useMemo(() => {
    return {
      ...writingSchemaConfig,
      dataConfig: {
        ...writingSchemaConfig.dataConfig,
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
