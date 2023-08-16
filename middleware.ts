import { NextResponse, type NextRequest } from "next/server";

import type { Database } from "@/lib/database.types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient<Database>({ req, res });
	await supabase.auth.getSession();
	return res;
}
