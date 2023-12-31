import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

import { twMerge } from "tailwind-merge";

import { getContrastColor } from "@/lib/utils";

import { PlatformIcon } from "@/platforms/constants";

import { LinkWithPlatform, UpsertLinkWithPlatform } from "../types";

type Props = {
	link: LinkWithPlatform | UpsertLinkWithPlatform;
};

export const ProfileLink = ({ link }: Props) => {
	return (
		<Link
			href={link.url || ""}
			className={twMerge([
				"flex w-full items-center gap-2 rounded-lg p-4",
				getContrastColor(link.platform?.color) === "#FFF"
					? "text-white"
					: "text-gray-700 border border-gray-300",
			])}
			style={{ backgroundColor: link.platform?.color }}
		>
			{PlatformIcon[link.platform?.name as keyof typeof PlatformIcon]}
			<span className="grow text-sm">{link.platform?.name}</span>
			<AiOutlineArrowRight />
		</Link>
	);
};
