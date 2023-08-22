"use server";

import { revalidatePath } from "next/cache";

import { getSupabaseServerClient } from "@/lib/supabase/utils";

import { InsertLink, LinkWithPlatform } from "../types";

const createSupabaseClient = () => {
	const supabase = getSupabaseServerClient("actions");

	return supabase;
};

export const getLinks = async () => {
	const supabase = createSupabaseClient();

	const links = await supabase
		.from("links")
		.select("*, platform:platform_id(*)")
		.order("created_at", { ascending: false })
		.returns<LinkWithPlatform[]>();

	return links;
};

export const saveLink = async (links: InsertLink[]) => {
	const supabase = createSupabaseClient();

	const result = await supabase
		.from("links")
		.upsert(links, { onConflict: "id" })
		.select();

	if (result.data) {
		revalidatePath("/dashboard");
	}

	return result;
};

export const deleteLink = async (id: string) => {
	const supabase = createSupabaseClient();

	const result = await supabase.from("links").delete().eq("id", id).select("*");

	revalidatePath("/dashboard");

	return result;
};
