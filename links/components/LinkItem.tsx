"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { LiaGripLinesSolid } from "react-icons/lia";

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Input,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Platform } from "@/platforms/types";

type Props = {
	index: number;
	platforms: Platform[];
	onRemove: () => void;
};

export const LinkItem = ({ index, platforms, onRemove }: Props) => {
	const { control } = useFormContext();

	return (
		<Card className="bg-gray-100">
			<CardHeader>
				<div className="flex items-center justify-between gap-2">
					<LiaGripLinesSolid />
					<span className="block grow font-bold text-gray-600">
						Link #{index + 1}
					</span>
					<Button
						variant="ghost"
						className="pr-0 font-thin text-gray-500 hover:bg-transparent hover:shadow-none"
						type="button"
						onClick={onRemove}
					>
						Remove
					</Button>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-5">
				<FormField
					control={control}
					name={`links.${index}.platform_id`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Platform</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value as string}
								>
									<SelectTrigger className="w-full">
										<SelectValue
											placeholder="Select a platform"
											className="opacity-50"
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{platforms.map(({ name, id }) => (
												<SelectItem key={id} value={id}>
													<Image
														src={`/images/icon-${name
															.replaceAll(/\s/g, "-")
															.replaceAll(/[^\w-]/g, "")
															.toLowerCase()}.svg`}
														alt={name}
														width={24}
														height={24}
													/>
													{name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name={`links.${index}.url`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Link</FormLabel>
							<FormControl>
								<Input {...field} placeholder="e.g. https://www.github.com/" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
};
