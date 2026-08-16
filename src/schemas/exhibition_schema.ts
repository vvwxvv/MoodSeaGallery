// exhibitionSchema.js — 适配 Prisma Exhibition 模型（含 related_gallery_artist）
import { z } from 'zod';

// Exhibition schema – 与 Prisma Exhibition 模型完全匹配
export const exhibitionSchema = z.object({
  // 自动生成的 ID（对应 Prisma 中的 _id）
  id: z.string().optional(),

  // 核心字段
  cover_img_url: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  type: z.string().optional(),
  date_start: z.string().optional(),
  date_end: z.string().optional(),
  opening_date: z.string().optional(),
  year: z.string().optional(),
  venue: z.string().optional(),
  location: z.string().optional(),
  curator: z.string().optional(),
  organiser: z.string().optional(),
  participating_artists: z.string().optional(),

  // 文本内容（数组字段）
  caption: z.string().optional(),
  description: z.string().optional(),
  introduction: z.array(z.string()).optional(),
  press_release: z.array(z.string()).optional(),
  related_artwork_title: z.array(z.string()).optional(),
  related_gallery_artist: z.array(z.string()).optional(), // 新增

  // 媒体链接
  video_url: z.string().optional(),
  web_url: z.string().optional(),

  // 系统/管理字段
  order: z.string().optional(),
  mark: z.string().optional(),
  language: z.string().optional(),
  status: z.string().optional(),

  // 更新时间（由 Prisma 自动维护）
  updatedAt: z.string().optional(), // API 返回 ISO 字符串
});

export type Exhibition = z.infer<typeof exhibitionSchema>;

// 创建展览时，省略自动生成的 id 和 updatedAt
export const createExhibitionSchema = exhibitionSchema.omit({ id: true, updatedAt: true });

export type CreateExhibitionInput = z.infer<typeof createExhibitionSchema>;

// 更新展览时，id 必须提供，其他字段均为可选
export const updateExhibitionSchema = exhibitionSchema.partial().required({ id: true });

export type UpdateExhibitionInput = z.infer<typeof updateExhibitionSchema>;