"use client";

import React, { useMemo } from "react";
import { enquireSchemaConfig } from "@/components/pages/manager/config/enquireSchemaConfig";
import ManagerStructureLayout from "@/components/pages/manager/layouts/ManagerStructureLayout";

export default function EnquireManagerPage() {
  const managerSchemaConfig = useMemo(() => {
    return {
      ...enquireSchemaConfig,
      dataConfig: {
        ...enquireSchemaConfig.dataConfig,
        // Default sort to newest inquiries first
        defaultSort: { field: "createdAt", direction: "desc" },
        groupConfig: {
          enabled: true,
          // Grouping by status makes the most sense for enquiries (Pending, Responded, Closed)
          field: "status",
          applyTo: ["grid", "list"],
          sortGroups: true,
          emptyLabel: "Uncategorized",
        },
      },
    };
  }, []);

  return <ManagerStructureLayout managerSchemaConfig={managerSchemaConfig} />;
}