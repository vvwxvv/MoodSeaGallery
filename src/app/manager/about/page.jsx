"use client";
import React, { useMemo } from "react";
import { aboutSchemaConfig } from "@/components/pages/manager/config/aboutSchemaConfig";

import ManagerStructureLayout from "@/components/pages/manager/layouts/ManagerStructureLayout";

export default function AboutManagerPage() {
  const managerSchemaConfig = useMemo(() => {
    return {
      ...aboutSchemaConfig,
      dataConfig: {
        ...aboutSchemaConfig.dataConfig,
      },
    };
  }, []);

  return (
<ManagerStructureLayout managerSchemaConfig={managerSchemaConfig} />
  );
}