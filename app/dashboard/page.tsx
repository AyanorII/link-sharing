import { Card, CardContent, Container, TabsContent } from "@/components/ui";
import { getLinks } from "@/links/actions";
import { PhoneMockup } from "@/links/components/PhoneMockup";
import { getPlatforms } from "@/platforms/actions";

import { DASHBOARD_TABS } from "@/lib/dashboard/constants";

export default async function DashboardPage() {
	const [{ data: platforms }, { data: links }] = await Promise.all([
		getPlatforms(),
		getLinks(),
	]);

	const linksWithPlatforms =
		links?.map((link) => ({
			...link,
			platform:
				platforms?.find((platform) => platform.id === link.platform_id) ||
				link.platform,
		})) || [];

	return (
		<Container className="mt-4 md:mt-10">
			<div className="my-4 mb-10 flex gap-4 md:my-10">
				<Card className="sticky top-16 hidden max-w-[358px] grow justify-center p-6  lg:flex">
					<CardContent className="p-0">
						<PhoneMockup links={linksWithPlatforms || []} />
					</CardContent>
				</Card>
				{DASHBOARD_TABS.map(({ name, content }) => (
					<TabsContent key={name} value={name} className="mt-0 grow">
						{content}
					</TabsContent>
				))}
			</div>
		</Container>
	);
}
