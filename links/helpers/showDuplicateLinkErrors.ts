import { toast } from "react-toastify";

import { Platform } from "@/platforms/types";

import { Link, UpsertLink } from "../types";

export const showDuplicateLinkErrors = (
	duplicateLinks: (Link | UpsertLink)[],
	platforms: Platform[]
) => {
	duplicateLinks.forEach((link) => {
		const platform = platforms.find(({ id }) => id === link.platform_id);
		toast.error(`You already have ${platform?.name}'s link with this URL.`);
	});
};
