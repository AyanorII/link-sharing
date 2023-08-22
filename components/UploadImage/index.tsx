import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { BsImage } from "react-icons/bs";

import { twMerge } from "tailwind-merge";

import { Input } from "../ui";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const UploadImage = ({ value, ...props }: Props) => {
	const [blob, setBlob] = useState((value as string) || "");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.currentTarget.files;

		if (files?.[0]) {
			const file = files[0];
			const blob = new Blob([file]);
			setBlob(URL.createObjectURL(blob));
		}

		props.onChange?.(e);
	};

	const baseClassName =
		"flex flex-col justify-center w-full gap-4 font-semibold cursor-pointer transition-all items-center gap-4 bg-primary-foreground text-primary";
	const withBlobClassName =
		"absolute inset-0 z-10 bg-dark opacity-0 group-hover:opacity-75 text-white";
	const withoutBlobClassName = "h-full bg-primary-foreground text-primary";

	return (
		<div
			className={twMerge([
				"group relative h-[195px] min-w-[195px] flex-col items-center overflow-hidden rounded-lg",
				blob ? "text-white" : "text-primary",
			])}
		>
			<label
				htmlFor="upload"
				className={twMerge([
					baseClassName,
					blob ? withBlobClassName : withoutBlobClassName,
				])}
			>
				<BsImage className="h-8 w-8" />
				<span>{blob ? "Change image" : "+ Upload Image"}</span>
			</label>
			{blob && (
				<Image src={blob} alt="i" fill className="object-cover object-center" />
			)}
			<Input
				type="file"
				{...props}
				onChange={handleChange}
				id="upload"
				className="hidden"
			/>
		</div>
	);
};
