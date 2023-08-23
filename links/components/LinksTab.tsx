import { getPlatforms } from "@/platforms/actions";
import { getProfile } from "@/profiles/actions";

import { getSupabaseServerClient } from "@/lib/supabase/utils";

import { LinkForm } from "./LinkForm";

export const LinksTab = async () => {
	const supabase = getSupabaseServerClient("component");

	const { data: platforms } = await getPlatforms();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const profile = await getProfile(user!.id);

	if (!user) {
		return null;
	}

	return (
		<LinkForm
			user={user}
			platforms={platforms || []}
			links={profile.links || []}
		/>
	);
};
