"use server";

import { LinkWithPlatform } from "@/links/types";

import { getSupabaseServerClient } from "@/lib/supabase/utils";

import { Profile, UpdateProfile } from "../types";

export const getProfile = async (id: string) => {
	const supabase = getSupabaseServerClient("actions");

	const result = await supabase
		.from("profiles")
		.select("*, links(*, platform:platforms(*))")
		.eq("id", id)
		.limit(1)
		.single();

	return result.data as Profile & { links: LinkWithPlatform[] };
};

export type GetProfile = Awaited<ReturnType<typeof getProfile>>;

export const updateProfile = async (id: string, profile: UpdateProfile) => {
	const { first_name, last_name, avatar, email } = profile;

	const supabase = getSupabaseServerClient("actions");

	const result = await supabase
		.from("profiles")
		.update({
			first_name,
			last_name,
			avatar,
			email,
		})
		.eq("id", id)
		.select();

	return result;
};
