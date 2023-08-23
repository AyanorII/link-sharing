import { NextResponse, type NextRequest } from "next/server";

import type { Database } from "@/lib/database.types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
	// Reference: https://github.com/vercel/next.js/issues/43704#issuecomment-1411186664
	const requestHeaders = new Headers(req.headers);
	requestHeaders.set("x-pathname", req.nextUrl.pathname);

	const res = NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});

	const supabase = createMiddlewareClient<Database>({ req, res });
	await supabase.auth.getSession();

	return res;
}
