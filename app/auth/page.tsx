import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { AuthForm } from "@/auth/components/AuthForm/AuthForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const AuthPage = async () => {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		redirect("/");
	}

	return (
		<div className="mx-auto flex min-h-screen w-[90%] max-w-[440px] flex-col justify-center">
			<div className="relative">
				<Image
					src="/images/logo-devlinks-large.svg"
					height="40"
					width="182"
					alt="Devlinks"
					className="absolute -top-16 md:-top-20 md:left-1/2 md:-translate-x-1/2 "
				/>
				<AuthForm />
			</div>
		</div>
	);
};

export default AuthPage;
