import { z } from 'zod';

export const imageSchema = z.object({
  id: z.string().optional(),
  img_url: z.string().optional(),
  tag_en: z.string().optional(),
  tag_cn: z.string().optional(),
  type: z.string().optional(),
  caption_en: z.string().optional(),
  caption_cn: z.string().optional(),
  mark: z.string().optional(),
  tag_source: z.string().optional(),
  order: z.string().optional(),
});

export type Image = z.infer<typeof imageSchema>;

export const createImageSchema = imageSchema.omit({ id: true });
export type CreateImageInput = z.infer<typeof createImageSchema>;

export const updateImageSchema = imageSchema.partial().required({ id: true });
export type UpdateImageInput = z.infer<typeof updateImageSchema>;
