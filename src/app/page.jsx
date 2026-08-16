"use client";
import HomePage from "@/components/pages/home/HomePage";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // 保存原始样式，以便恢复
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // 禁止滚动（同时锁定 body 和 html）
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // 组件卸载时恢复滚动
      document.body.style.overflow = originalBodyOverflow || "";
      document.documentElement.style.overflow = originalHtmlOverflow || "";
    };
  }, []);

  return <HomePage />;
}