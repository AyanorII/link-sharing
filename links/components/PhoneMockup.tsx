import { LinkWithPlatform } from "../types";
import { ProfileLink } from "./ProfileLink";

const LinkSkeleton = () => {
	return <div className="h-[54px] w-full rounded bg-[#EEE]" />;
};

type Props = {
	links: LinkWithPlatform[];
};

export const PhoneMockup = ({ links }: Props) => {
	const MAX_LINKS_ON_SCREEN = 5;

	const linkList = new Array(MAX_LINKS_ON_SCREEN)
		.fill(null)
		.map((_, i) => links[i]);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="308"
			height="632"
			fill="none"
			viewBox="0 0 308 632"
		>
			<path
				stroke="#737373"
				d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
			/>
			<path
				fill="#fff"
				stroke="#737373"
				d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
			/>
			<circle cx="153.5" cy="112" r="48" fill="#EEE" />
			<rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
			<rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
			<foreignObject x="35" y="278" width="237" height="500">
				<div className="flex flex-col gap-4">
					{linkList.map((link, index) =>
						link ? (
							<ProfileLink key={link.id} link={link} />
						) : (
							<LinkSkeleton key={index} />
						)
					)}
				</div>
			</foreignObject>
		</svg>
	);
};
