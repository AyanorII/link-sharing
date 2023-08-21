import { getSupabaseServerClient } from "@/lib/supabase/utils";

export const getPlatforms = async () => {
	const supabase = getSupabaseServerClient("actions");

	const platforms = await supabase.from("platforms").select("*");
	return platforms;
};
