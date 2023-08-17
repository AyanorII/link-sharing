import Image from "next/image";

import { Card, CardContent, Container } from "@/components/ui";

export const NoLinks = () => {
	return (
		<Card className="bg-gray-100">
			<CardContent className="p-0">
				<Container className="py-12 md:py-16">
					<div className="flex flex-col items-center text-center">
						<Image
							src="/images/illustration-empty.svg"
							width="250"
							height="160"
							alt="No links added"
							className="mb-10"
						/>
						<h2 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
							Let&apos;s get you started
						</h2>
						<p className="max-w-[50ch] font-light text-gray-500">
							Use the “Add new link” button to get started. Once you have more
							than one link, you can reorder and edit them. We’re here to help
							you share your profiles with everyone!
						</p>
					</div>
				</Container>
			</CardContent>
		</Card>
	);
};
