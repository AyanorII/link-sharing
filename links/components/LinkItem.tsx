"use client";

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

import { PlatformIcon } from "@/platforms/constants";

type Props = {
	index: number;
	platforms: Platform[];
	onRemove: () => void;
	onPlatformChange: (platformId: string) => void;
};

export const LinkItem = ({
	index,
	platforms,
	onRemove,
	onPlatformChange,
}: Props) => {
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
									onValueChange={(e) => {
										field.onChange(e);
										onPlatformChange(e);
									}}
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
													{PlatformIcon[name as keyof typeof PlatformIcon]}
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
								<Input
									{...field}
									placeholder="e.g. https://www.github.com/"
									icon="/images/icon-link.svg"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
};
