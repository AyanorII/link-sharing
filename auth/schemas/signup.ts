import { z } from "zod";

import { loginSchema } from "./login";

export const signUpSchema = loginSchema
	.extend({
		passwordConfirmation: z.string().min(8, { message: "Too short" }),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords do not match",
		path: ["passwordConfirmation"],
	});

export type SignUpSchema = z.infer<typeof signUpSchema>;
