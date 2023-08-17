import { z } from "zod";

export const createLinkSchema = z.object({
	platformId: z.string().uuid(),
	url: z.string().url(),
	profileId: z.string().uuid(),
});

export type CreateLinkSchema = z.infer<typeof createLinkSchema>;
