"use client";
import React, { useMemo } from "react";
import { galleryContactSchemaConfig } from "@/components/pages/manager/config/galleryContactSchemaConfig";

import ManagerStructureLayout from "@/components/pages/manager/layouts/ManagerStructureLayout";

export default function GallerygalleryContactManagerPage() {
  const managerSchemaConfig = useMemo(() => {
    return {
      ...galleryContactSchemaConfig,
      dataConfig: {
        ...galleryContactSchemaConfig.dataConfig,
      },
    };
  }, []);

  return (
<ManagerStructureLayout managerSchemaConfig={managerSchemaConfig} />
  );
}