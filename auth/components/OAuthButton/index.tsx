"use client";

import { toast } from "react-toastify";

import { Button } from "@/components/ui";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SignInWithOAuthCredentials } from "@supabase/supabase-js";
import { twMerge } from "tailwind-merge";

type Props = { icon: React.ReactElement } & SignInWithOAuthCredentials &
	React.HTMLAttributes<HTMLButtonElement>;

export const OAuthButton = ({
	provider,
	options,
	icon,
	className,
	...rest
}: Props) => {
	const supabase = createClientComponentClient();

	const handleClick = async () => {
		try {
			const response = await supabase.auth.signInWithOAuth({
				provider,
				options,
			});

			response.error && toast.error(response.error.message);
		} catch (error) {
			toast.error("Something went wrong. Please try again.");
		}
	};

	return (
		<Button
			{...rest}
			variant="ghost"
			className={twMerge("rounded-full px-2 py-3", className)}
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			onClick={handleClick}
		>
			{icon}
		</Button>
	);
};
