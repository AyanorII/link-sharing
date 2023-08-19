import { Container, TabsContent } from "@/components/ui";

import { DASHBOARD_TABS } from "@/lib/dashboard/constants";

export default function DashboardPage() {
	return (
		<Container className="mt-4 md:mt-10">
			<div className="mt-4 md:mt-10">
				{DASHBOARD_TABS.map(({ name, content }) => (
					<TabsContent key={name} value={name}>
						{content}
					</TabsContent>
				))}
			</div>
		</Container>
	);
}
