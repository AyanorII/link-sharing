import { Provider } from "@supabase/supabase-js";
import { twMerge } from "tailwind-merge";

import { OAuthButton } from "../OAuthButton";

type Props = {
	providers: {
		provider: Provider;
		icon: JSX.Element;
	}[];
	className?: string;
};

export const OAuth = ({ providers, className }: Props) => {
	const redirectPath = `${location.origin}/auth/callback`;

	return (
		<div className={twMerge("flex gap-2", className)}>
			{providers.map((provider) => (
				<OAuthButton
					key={provider.provider}
					options={{ redirectTo: redirectPath }}
					{...provider}
				/>
			))}
		</div>
	);
};
