import { z } from "zod";

export const updateLinkSchema = z.object({
	id: z.string().uuid(),
	platformId: z.string().uuid().optional(),
	url: z.string().url().optional(),
});

export type UpdateLinkSchema = z.infer<typeof updateLinkSchema>;
