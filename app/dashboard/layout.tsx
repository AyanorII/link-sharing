import Image from "next/image";
import { BsEye } from "react-icons/bs";

import {
	Button,
	Card,
	CardContent,
	Container,
	Tabs,
	TabsList,
	TabsTrigger,
} from "@/components/ui";
import { DashboardTab } from "@/lib/dashboard/types";

import { DASHBOARD_TABS } from "@/lib/dashboard/constants";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Tabs defaultValue={DashboardTab.Links}>
			<Container className="max-w-none px-0 sm:max-w-[90%] sm:px-4">
				<Card className="rounded-none bg-white sm:my-6 sm:rounded-lg">
					<CardContent className="px-6 py-4">
						<nav className="flex items-center justify-between">
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
							<Button variant="outline">
								<BsEye className="md:hidden" size={20} />
								<span className="hidden md:block">Preview</span>
							</Button>
						</nav>
					</CardContent>
				</Card>
			</Container>
			{children}
		</Tabs>
	);
}
