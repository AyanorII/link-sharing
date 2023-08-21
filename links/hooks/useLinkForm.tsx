import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { deleteLink, saveLink } from "../actions";
import { getNewAndDuplicateLinks } from "../helpers";
import { showDuplicateLinkErrors } from "../helpers/showDuplicateLinkErrors";
import { InsertLink, UpsertLink } from "../types";

export const useLinkForm = (
	methods: UseFormReturn<{ links: UpsertLink[] }>,
	fieldArrayMethods: UseFieldArrayReturn<
		{ links: UpsertLink[] },
		"links",
		"fieldId"
	>
) => {
	const {
		formState: { dirtyFields, defaultValues },
		handleSubmit,
	} = methods;

	const { fields, remove } = fieldArrayMethods;

	const supabase = createClientComponentClient<Database>();

	const saveLinks = handleSubmit(async (data) => {
		const existingLinks = (defaultValues?.links || []) as UpsertLink[];
		const incomingLinks = data.links;
		const { newLinks, duplicateLinks } = getNewAndDuplicateLinks(
			incomingLinks,
			existingLinks,
			dirtyFields
		);

		if (duplicateLinks.length > 0) {
			const { data: platforms } = await supabase.from("platforms").select("*");
			showDuplicateLinkErrors(duplicateLinks, platforms!);
			return;
		}

		try {
			const { error } = await saveLink(newLinks as InsertLink[]);

			if (error) return toast.error(error.message);

			toast.success("Links saved.");
		} catch (error) {
			toast.error("Something went wrong.");
		}
	});

	const removeLink = async (index: number) => {
		try {
			const { id } = fields[index];
			const isLinkPersisted = Boolean(id);

			if (isLinkPersisted) {
				const { error } = await deleteLink(id!);
				if (error) return toast.error(error.message);

				toast.success("Link removed.");
			}

			remove(index);
		} catch (error) {
			toast.error("Something went wrong.");
		}
	};

	return { saveLinks, removeLink };
};
