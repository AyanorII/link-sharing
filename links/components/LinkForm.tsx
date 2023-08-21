"use client";

import { useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui";
import { Form } from "@/components/ui/form";
import { Platform } from "@/platforms/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";

import { useLinkForm } from "../hooks/useLinkForm";
import { upsertLinkSchema } from "../schemas";
import { LinkWithPlatform, UpsertLink } from "../types";
import { LinkFormHeader } from "./LinkFormHeader";
import { LinkItem } from "./LinkItem";
import { NoLinks } from "./NoLinks";
import { PhoneMockup } from "./PhoneMockup";

type Props = {
	user: User;
	platforms: Platform[];
	links: LinkWithPlatform[];
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
		<div className="mb-10 flex items-start gap-4">
			<Card className="sticky top-16 hidden max-w-[358px] grow justify-center p-6  lg:flex">
				<CardContent className="p-0">
					<PhoneMockup links={links || []} />
				</CardContent>
			</Card>
			<Card className="grow">
				<Form {...methods}>
					{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
					<form onSubmit={handleSubmit}>
						<CardHeader className="md:p-10">
							<LinkFormHeader onClick={appendItemCard} />
						</CardHeader>
						<CardContent className="flex flex-col gap-6 md:p-10 md:pt-0">
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
						</CardContent>
						<CardFooter className="border-t pt-6 md:p-10">
							<Button
								type="submit"
								className="w-full"
								disabled={fields.length === 0 || isSubmitting}
							>
								Save
							</Button>
						</CardFooter>
						{/* <DevTool control={control} /> */}
					</form>
				</Form>
			</Card>
		</div>
	);
};
