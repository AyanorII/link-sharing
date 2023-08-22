import Image from "next/image";

import { ProfileLink } from "@/links/components/ProfileLink";
import {
	ArrayField,
	LinkWithPlatform,
	UpsertLinkWithPlatform,
} from "@/links/types";

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

	return (
		<div className="p-8">
			<div className="flex flex-col items-center">
				<Avatar avatar={avatar} alt={fullName} />
				<FullName firstName={first_name} lastName={last_name} />
				<Email email={email} />
			</div>
			<div className="no-scrollbar mt-9 flex max-h-[350px] flex-col gap-4 overflow-auto">
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
		</div>
	);
};
