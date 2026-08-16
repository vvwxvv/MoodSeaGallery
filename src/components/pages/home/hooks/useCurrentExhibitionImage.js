import { useMemo } from "react";
import useExhibitionListData from "@/components/pages/exhibition/hooks/useExhibitionListData";

/**
 * 获取首页 Hero 区域需要展示的"当前展览"封面图片
 * Resolves the single "current exhibition" to feature as the home page
 * hero image.
 *
 * 设计说明：
 * 复用 Exhibitions 页面已有的 current/past 判定逻辑（useExhibitionListData），
 * 避免在首页重复实现"什么算作当前展览"这一业务规则 —— 保证首页 Hero
 * 展示的展览与 Exhibitions 页面"Current"区块展示的展览始终保持一致。
 *
 * @param {boolean} isCn - 语言标志
 * @returns {{
 *   currentExhibition: object|null,
 *   coverImageUrl: string|null,
 *   isLoading: boolean,
 *   hasError: boolean,
 *   refetch: () => void,
 * }}
 */
export default function useCurrentExhibitionImage(isCn) {
  const { current, isLoading, hasError, refetch } = useExhibitionListData(isCn);

  // 取"当前展览"列表中最新的一个作为首页封面来源。
  // 做一次防御性排序（按 start_date / year 倒序），
  // 保证即使 current 数组未预排序，也总是拿到最新的那一个。
  const currentExhibition = useMemo(() => {
    if (!current || current.length === 0) return null;
    if (current.length === 1) return current[0];

    const getSortValue = (ex) => {
      const raw = ex?.start_date ?? ex?.startDate ?? ex?.date ?? ex?.year;
      const parsed = raw ? new Date(raw) : null;
      return parsed && !isNaN(parsed.getTime()) ? parsed.getTime() : 0;
    };

    return [...current].sort((a, b) => getSortValue(b) - getSortValue(a))[0];
  }, [current]);

  const coverImageUrl = currentExhibition?.cover_img_url || null;

  return {
    currentExhibition,
    coverImageUrl,
    isLoading,
    hasError,
    refetch,
  };
}