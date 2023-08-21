import { cookies } from "next/headers";

import {
	createRouteHandlerClient,
	createServerActionClient,
	createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "../database.types";

export const getSupabaseServerClient = (
	type: "component" | "actions" | "route"
) => {
	const cookiesStore = cookies();
	const options = { cookies: () => cookiesStore };

	switch (type) {
		case "component":
			return createServerComponentClient<Database>(options);
		case "actions":
			return createServerActionClient<Database>(options);
		case "route":
			return createRouteHandlerClient<Database>(options);
	}
};
