import { z } from "zod";

export const upsertLinkSchema = z.object({
	links: z.array(
		z.object({
			id: z.string().uuid({ message: "Invalid link id" }).optional(),
			platform_id: z.string().uuid({ message: "Invalid platform " }),
			url: z.string().url(),
			profile_id: z.string().uuid(),
		})
	),
});

export type UpsertLinkSchema = z.infer<typeof upsertLinkSchema>;
