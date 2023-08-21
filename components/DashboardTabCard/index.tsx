import { twMerge } from "tailwind-merge";

import { Card, CardContent, CardFooter, CardHeader } from "../ui";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export const TabCard = ({ children, className }: Props) => {
	return <Card className={twMerge(["grow", className])}>{children}</Card>;
};

export const TabCardHeader = ({ children, className }: Props) => {
	return (
		<CardHeader className={twMerge(["gap-10 md:p-10", className])}>
			{children}
		</CardHeader>
	);
};

export const TabCardContent = ({ children, className }: Props) => {
	return (
		<CardContent
			className={twMerge(["flex flex-col gap-6 md:p-10 md:pt-0", className])}
		>
			{children}
		</CardContent>
	);
};

export const TabCardFooter = ({ children, className }: Props) => {
	return (
		<CardFooter
			className={twMerge(["border-t pt-6 md:p-10 lg:py-4", className])}
		>
			{children}
		</CardFooter>
	);
};

TabCard.Header = TabCardHeader;
TabCard.Content = TabCardContent;
TabCard.Footer = TabCardFooter;
