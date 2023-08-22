import { z } from "zod";

export const updateProfileSchema = z.object({
	id: z.string().uuid(),
	avatar: z.string().nullable(),
	first_name: z.string(),
	last_name: z.string(),
	email: z.string().email(),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
