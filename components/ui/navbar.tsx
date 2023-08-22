import React from "react";

import { Card, CardContent, Container } from "@/components/ui";

export const Navbar = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container className="relative max-w-none px-0 sm:max-w-[90%] sm:px-4">
			<Card className="rounded-none bg-white sm:my-6 sm:rounded-lg">
				<CardContent className="px-6 py-4">
					<nav className="flex items-center justify-between">{children}</nav>
				</CardContent>
			</Card>
		</Container>
	);
};
