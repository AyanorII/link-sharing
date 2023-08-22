"use server";

import { getSupabaseServerClient } from "@/lib/supabase/utils";

import { UpdateProfile } from "../types";

export const getProfile = async (id: string) => {
	const supabase = getSupabaseServerClient("actions");

	const { data } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", id)
		.limit(1)
		.single();

	return data;
};

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
