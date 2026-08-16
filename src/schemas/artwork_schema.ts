import { z } from 'zod';

export const artworkSchema = z.object({
  id: z.string().optional(),
  cover_img_url: z.string().optional(),
  related_gallery_exhibition: z.array(z.string()).optional(), // 新增字段
  artist: z.string().optional(),
  title: z.string().optional(),
  type: z.string().optional(),
  medium: z.string().optional(),
  year: z.string().optional(),
  size: z.string().optional(),
  series: z.string().optional(),
  caption: z.string().optional(),
  duration: z.string().optional(),
  credits: z.string().optional(),
  special_thanks: z.string().optional(),
  introduction: z.array(z.string()).optional(),
  video_url: z.string().optional(),
  web_url: z.string().optional(),
  work_value: z.string().optional(),
  sold: z.string().optional(),
  order: z.string().optional(),
  mark: z.string().optional(),
  language: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Artwork = z.infer<typeof artworkSchema>;

export const createArtworkSchema = artworkSchema.omit({ id: true, updatedAt: true });
export type CreateArtworkInput = z.infer<typeof createArtworkSchema>;

export const updateArtworkSchema = artworkSchema.partial().required({ id: true });
export type UpdateArtworkInput = z.infer<typeof updateArtworkSchema>;