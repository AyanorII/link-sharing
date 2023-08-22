import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent, Navbar, buttonVariants } from "@/components/ui";
import { ShareLinkButton } from "@/preview/components";
import { getProfile } from "@/profiles/actions";
import { ProfilePreview } from "@/profiles/components/ProfilePreview";

import { getSupabaseServerClient } from "@/lib/supabase/utils";

type Params = {
	params: {
		profileId: string;
	};
};

export const generateMetadata = async ({
	params: { profileId },
}: Params): Promise<Metadata> => {
	const profile = await getProfile(profileId);

	return {
		title: `${profile?.first_name} ${profile?.last_name} | Link Sharing`,
	};
};

const PreviewPage = async ({ params }: Params) => {
	const { profileId } = params;

	const supabase = getSupabaseServerClient("component");

	const profile = await getProfile(profileId);
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!profile) {
		return notFound();
	}

	return (
		<div>
			<div className="absolute top-0 h-[40dvh] w-full rounded-b-3xl bg-primary" />
			<Navbar>
				{user?.id === profile.id && (
					<Link
						href="/dashboard"
						className={buttonVariants({ variant: "outline" })}
					>
						Back to Editor
					</Link>
				)}
				<div className="ml-auto">
					<ShareLinkButton />
				</div>
			</Navbar>
			<Card className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl">
				<CardContent className="min-w-[350px] p-0">
					<ProfilePreview profile={profile} links={profile.links} />
				</CardContent>
			</Card>
		</div>
	);
};

export default PreviewPage;
