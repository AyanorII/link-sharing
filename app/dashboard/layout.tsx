import Image from "next/image";
import Link from "next/link";
import { BsEye } from "react-icons/bs";

import { Tabs, TabsList, TabsTrigger, buttonVariants } from "@/components/ui";
import { Navbar } from "@/components/ui/navbar";
import { DashboardTab } from "@/lib/dashboard/types";

import { getSupabaseServerClient } from "@/lib/supabase/utils";

import { DASHBOARD_TABS } from "@/lib/dashboard/constants";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = getSupabaseServerClient("component");
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<Tabs defaultValue={DashboardTab.Links}>
			<Navbar>
				<div>
					<Image
						src="/images/logo-devlinks-small.svg"
						width="26"
						height="26"
						className="md:hidden"
						alt="Devlinks"
					/>
					<Image
						src="/images/logo-devlinks-large.svg"
						width="140"
						height="26"
						className="hidden md:block"
						alt="Devlinks"
					/>
				</div>
				<TabsList>
					{DASHBOARD_TABS.map(({ name, icon }) => (
						<TabsTrigger key={name} value={name} icon={icon}>
							<span className="hidden md:block">{name}</span>
						</TabsTrigger>
					))}
				</TabsList>
				<Link
					href={`/preview/${user!.id}`}
					className={buttonVariants({ variant: "outline" })}
				>
					<BsEye className="md:hidden" size={20} />
					<span className="hidden md:block">Preview</span>
				</Link>
			</Navbar>
			{children}
		</Tabs>
	);
}
