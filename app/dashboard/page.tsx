import { Card, CardContent, Container, TabsContent } from "@/components/ui";
import { PhoneMockup } from "@/links/components/PhoneMockup";
import { PreviewProvider } from "@/preview/providers";

import { DASHBOARD_TABS } from "@/lib/dashboard/constants";

export default function DashboardPage() {
	return (
		<PreviewProvider>
			<Container className="mt-4 md:mt-10">
				<div className="my-4 mb-10 flex gap-4 md:my-10">
					<Card className="sticky top-16 hidden max-w-[358px] grow justify-center p-6  lg:flex">
						<CardContent className="p-0">
							<PhoneMockup />
						</CardContent>
					</Card>
					{DASHBOARD_TABS.map(({ name, content }) => (
						<TabsContent key={name} value={name} className="mt-0 grow">
							{content}
						</TabsContent>
					))}
				</div>
			</Container>
		</PreviewProvider>
	);
}
