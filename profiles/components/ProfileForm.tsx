"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { TabCard } from "@/components/DashboardTabCard";
import { TabHeader } from "@/components/TabHeader/";
import {
	Button,
	Card,
	CardContent,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	Input,
} from "@/components/ui";
import { Database } from "@/lib/database.types";
import { usePreviewContext } from "@/preview/providers";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { StorageError } from "@supabase/storage-js";
import { PostgrestError } from "@supabase/supabase-js";

import { UploadImage } from "../../components/UploadImage/index";
import { updateProfile } from "../actions";
import {
	UpdateProfileSchema,
	updateProfileSchema,
} from "../schemas/update-profile.schema";
import { UpdateProfile } from "../types";

export const ProfileForm = () => {
	const [file, setFile] = useState<File | null>(null);
	const { profile, setProfile } = usePreviewContext();

	const methods = useForm<UpdateProfileSchema>({
		defaultValues: {
			id: profile.id,
			first_name: profile.first_name || "",
			last_name: profile.last_name || "",
			email: profile.email,
			avatar: profile.avatar || "",
		},
		resolver: zodResolver(updateProfileSchema),
	});

	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = methods;

	useEffect(() => {
		reset({
			id: profile.id,
			first_name: profile.first_name || "",
			last_name: profile.last_name || "",
			email: profile.email,
			avatar: profile.avatar || "",
		});
	}, [profile]);

	const logout = async () => {
		const supabase = createClientComponentClient<Database>();

		try {
			const { error } = await supabase.auth.signOut();

			if (error) toast.error(error.message);
		} catch (e) {
			toast.error("Something went wrong. Please try again.");
		}
	};

	const uploadAvatar = async (id: string) => {
		const supabase = createClientComponentClient<Database>();
		const key = `${id}/${file!.name}`;
		const { error } = await supabase.storage
			.from("avatars")
			.upload(key, file!, { upsert: true });

		if (error) throw new Error(error.message);

		const {
			data: { publicUrl },
		} = supabase.storage.from("avatars").getPublicUrl(key);

		return publicUrl;
	};

	const handleProfileUpdate = async (
		id: string,
		profileData: UpdateProfile
	) => {
		const { data, error } = await updateProfile(id, profileData);

		if (data?.length === 1) toast.success("Profile updated successfully.");
		if (error) {
			throw new Error(error.message);
		}
	};

	const onSubmit = handleSubmit(async (data) => {
		const { id, ...profileData } = data;
		try {
			if (data.avatar && file) {
				profileData.avatar = await uploadAvatar(id);
			}
			await handleProfileUpdate(id, profileData);
		} catch (e) {
			const error = e as PostgrestError | StorageError;
			toast.error(error.message || "Something went wrong.");
		}
	});

	return (
		<Form {...methods}>
			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<form onSubmit={onSubmit}>
				<TabCard>
					<TabCard.Header>
						<TabHeader
							title="Profile Details"
							description="Add your details to create a personal touch to your profile."
						/>
					</TabCard.Header>
					<TabCard.Content>
						<Card className="bg-gray-100">
							<CardContent className="pt-6">
								<FormField
									control={control}
									name="avatar"
									render={({ field }) => (
										<FormItem className="grid items-start md:grid-cols-[0.65fr_1fr] md:items-center lg:grid-cols-1 xl:grid-cols-[0.65fr_1fr]">
											<FormLabel>Profile picture</FormLabel>
											<div className="flex flex-col items-start gap-4 md:flex-row md:gap-6 lg:flex-col xl:flex-row xl:items-center">
												<FormControl className="grow">
													<UploadImage
														{...field}
														value={field.value as string}
														onChange={(e) => {
															field.onChange(e);
															const files = e.currentTarget?.files;

															if (files?.[0]) {
																const file = files[0];
																setFile(file);

																const blob = new Blob([file]);

																setProfile({
																	...profile,
																	avatar: URL.createObjectURL(blob),
																});
															}
														}}
													/>
												</FormControl>
												<FormDescription>
													Image must be below 1024x1024px. Use PNG or JPG
													format.
												</FormDescription>
											</div>
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
						<Card className="bg-gray-100">
							<CardContent className="flex flex-col gap-4 pt-6">
								<FormField
									control={control}
									name="first_name"
									render={({ field }) => (
										<FormItem className="grid md:grid-cols-[0.65fr_1fr] md:items-center">
											<FormLabel>First Name *</FormLabel>
											<FormControl>
												<Input
													{...field}
													// value={field.value}
													onChange={(e) => {
														setProfile({
															...profile,
															first_name: e.target.value,
														});
														field.onChange(e);
													}}
													required
													placeholder="e.g. John"
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="last_name"
									render={({ field }) => (
										<FormItem className="grid md:grid-cols-[0.65fr_1fr] md:items-center">
											<FormLabel>Last Name *</FormLabel>
											<FormControl>
												<Input
													{...field}
													onChange={(e) => {
														setProfile({
															...profile,
															last_name: e.target.value,
														});
														field.onChange(e);
													}}
													required
													placeholder="e.g. Doe"
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="email"
									render={({ field }) => (
										<FormItem className="grid md:grid-cols-[0.65fr_1fr] md:items-center">
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													onChange={(e) => {
														setProfile({
															...profile,
															email: e.target.value,
														});
														field.onChange(e);
													}}
													type="email"
													placeholder="e.g. johndoe@email.com"
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
					</TabCard.Content>
					<TabCard.Footer>
						<div className="flex w-full justify-between gap-5">
							{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
							<Button variant="destructive" type="button" onClick={logout}>
								Logout
							</Button>
							<Button
								type="submit"
								className="w-full lg:ml-auto lg:w-auto"
								disabled={isSubmitting}
							>
								Save
							</Button>
						</div>
					</TabCard.Footer>
				</TabCard>
			</form>
		</Form>
	);
};
