"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

import { ProfileLink } from "@/links/components/ProfileLink";
import {
	ArrayField,
	LinkWithPlatform,
	UpsertLinkWithPlatform,
} from "@/links/types";
import { twMerge } from "tailwind-merge";

import { Profile } from "../types";

const LinkSkeleton = () => {
	return <div className="h-[54px] w-full rounded bg-[#EEE]" />;
};

const Avatar = ({ avatar, alt }: { avatar?: string | null; alt: string }) => {
	return avatar ? (
		<Image
			src={avatar}
			alt={alt}
			width={104}
			height={104}
			className="aspect-square rounded-full border-4 border-primary object-cover"
		/>
	) : (
		<div className="aspect-square h-[96px] w-[96px] rounded-full bg-[#EEE]" />
	);
};

const FullName = ({
	firstName,
	lastName,
}: {
	firstName?: string | null;
	lastName?: string | null;
}) => {
	const fullName = `${firstName ?? ""} ${lastName ?? ""}`;

	return fullName.trim() ? (
		<span className="mt-6 text-center text-lg font-semibold text-gray-700 ">
			{fullName}
		</span>
	) : (
		<div className="mt-6 h-4 w-1/2 rounded-lg bg-[#EEE]" />
	);
};

const Email = ({ email }: { email?: string | null }) => {
	return email ? (
		<span className="mt-2 text-center text-sm text-gray-500">{email}</span>
	) : (
		<div className="mt-2 h-4 w-1/4 rounded-lg bg-[#EEE]" />
	);
};

type Props = {
	links: (LinkWithPlatform | ArrayField<UpsertLinkWithPlatform>)[];
	profile: Partial<Profile>;
};

export const ProfilePreview = ({ links, profile }: Props) => {
	const { avatar, first_name, last_name, email } = profile;

	const fullName = `${first_name} ${last_name}`;

	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const [showIcon, setShowIcon] = useState(false);

	const checkScroll = () => {
		if (!scrollContainerRef.current) return;

		const container = scrollContainerRef.current;
		// Check if user has reached the bottom
		const isBottom =
			container.scrollHeight - container.scrollTop === container.clientHeight;
		setShowIcon(!isBottom);
	};

	useEffect(() => {
		// Initial check for the icon visibility
		checkScroll();
		// Add event listener
		scrollContainerRef.current?.addEventListener("scroll", checkScroll);

		// Cleanup the event listener on component unmount
		return () => {
			scrollContainerRef.current?.removeEventListener("scroll", checkScroll);
		};
	}, []);

	return (
		<div className="relative p-8">
			<div className="flex flex-col items-center">
				<Avatar avatar={avatar} alt={fullName} />
				<FullName firstName={first_name} lastName={last_name} />
				<Email email={email} />
			</div>
			<div
				className="no-scrollbar mt-6 flex max-h-[350px] flex-col gap-4 overflow-auto py-6"
				ref={scrollContainerRef}
			>
				{links.map((link, index) =>
					link ? (
						<ProfileLink
							key={
								link.id || (link as ArrayField<UpsertLinkWithPlatform>).fieldId
							}
							link={link}
						/>
					) : (
						<LinkSkeleton key={index} />
					)
				)}
			</div>
			{
				<div
					className={twMerge([
						"absolute bottom-1 left-[47%] animate-bounce text-gray-500 transition-all",
						showIcon ? "opacity-100" : "opacity-0",
					])}
				>
					<AiOutlineArrowDown />
				</div>
			}
		</div>
	);
};
