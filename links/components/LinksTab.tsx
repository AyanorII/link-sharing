import { getPlatforms } from "@/platforms/actions";

import { getSupabaseServerClient } from "@/lib/supabase/utils";

import { getLinks } from "../actions";
import { LinkForm } from "./LinkForm";

export const LinksTab = async () => {
	const supabase = getSupabaseServerClient("component");

	const [{ data: platforms }, { data: links }] = await Promise.all([
		getPlatforms(),
		getLinks(),
	]);

	const linksWithPlatforms =
		links?.map((link) => ({
			...link,
			platform:
				platforms?.find((platform) => platform.id === link.platform_id) ||
				link.platform,
		})) || [];

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	return (
		<LinkForm
			user={user}
			platforms={platforms || []}
			links={linksWithPlatforms || []}
		/>
	);
};
