"use client";

import { useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { TabCard } from "@/components/DashboardTabCard";
import { TabHeader } from "@/components/TabHeader";
import { Button, Form } from "@/components/ui";
import { Platform } from "@/platforms/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";

import { useLinkForm } from "../hooks/useLinkForm";
import { upsertLinkSchema } from "../schemas";
import { Link, UpsertLink } from "../types";
import { LinkItem } from "./LinkItem";
import { NoLinks } from "./NoLinks";

type Props = {
	user: User;
	platforms: Platform[];
	links: Link[];
};

export const LinkForm = ({ user, platforms, links }: Props) => {
	const methods = useForm<{
		links: UpsertLink[];
	}>({
		defaultValues: {
			links: links || [],
		},
		resolver: zodResolver(upsertLinkSchema),
	});

	const {
		control,
		formState: { isSubmitting, dirtyFields },
		reset,
	} = methods;

	useEffect(() => {
		reset({ links });
	}, [links]);

	const fieldArrayMethods = useFieldArray({
		control,
		name: "links",
		keyName: "fieldId",
	});

	const { fields, append } = fieldArrayMethods;

	const appendItemCard = () => {
		append({
			profile_id: user.id,
			platform_id: platforms.at(0)?.id || "",
			url: "",
		});
	};

	const { saveLinks, removeLink } = useLinkForm(methods, fieldArrayMethods);

	const handleSubmit = useCallback(saveLinks, [links, dirtyFields, saveLinks]);

	return (
		<TabCard>
			<Form {...methods}>
				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				<form onSubmit={handleSubmit}>
					<TabCard.Header>
						<TabHeader
							title="Customize your links"
							description="Add/edit/remove links below and then share all your profiles with the world!"
						/>
						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={appendItemCard}
						>
							+ Add new link
						</Button>
					</TabCard.Header>
					<TabCard.Content>
						{fields.map((field, index) => (
							<LinkItem
								key={field.fieldId}
								index={index}
								platforms={platforms}
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onRemove={async () => await removeLink(index)}
							/>
						))}
						{fields.length === 0 && <NoLinks />}
					</TabCard.Content>
					<TabCard.Footer>
						<Button
							type="submit"
							className="w-full lg:ml-auto lg:w-auto"
							disabled={fields.length === 0 || isSubmitting}
						>
							Save
						</Button>
					</TabCard.Footer>
					{/* <DevTool control={control} /> */}
				</form>
			</Form>
		</TabCard>
	);
};
