import { FormStateProxy } from "react-hook-form";

import { Link, UpsertLink } from "../types";

export const getNewAndDuplicateLinks = (
	incomingLinks: UpsertLink[],
	existingLinks: UpsertLink[],
	dirtyFields: FormStateProxy<{ links: Link[] }>["dirtyFields"]
) => {
	const newLinks: UpsertLink[] = [];
	const duplicateLinks: UpsertLink[] = [];

	incomingLinks.forEach((incomingLink, index) => {
		const hasBeenChanged =
			dirtyFields?.links?.[index]?.url ||
			dirtyFields?.links?.[index]?.platform_id;

		if (hasBeenChanged) {
			const isDuplicateLink = existingLinks.some(
				(existingLink) =>
					existingLink?.platform_id === incomingLink.platform_id &&
					existingLink?.url === incomingLink.url
			);

			if (isDuplicateLink) {
				duplicateLinks.push(incomingLink);
			} else {
				newLinks.push(incomingLink);
			}
		}
	});

	return { newLinks, duplicateLinks };
};
