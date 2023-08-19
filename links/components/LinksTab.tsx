import { cookies } from "next/headers";

import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { LinkForm } from "./LinkForm";

export const LinksTab = async () => {
	const supabase = createServerComponentClient<Database>({ cookies });

	const getPlatforms = supabase.from("platforms").select("*");
	const getLinks = supabase.from("links").select("*");

	const [{ data: platforms }, { data: links }] = await Promise.all([
		getPlatforms,
		getLinks,
	]);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	return (
		<LinkForm user={user} platforms={platforms || []} links={links || []} />
	);
};
