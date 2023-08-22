"use client";

import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

import { UpdateProfile } from "@/profiles/types";

import { ArrayField, UpsertLinkWithPlatform } from "../../links/types";

export const PreviewContext = createContext<{
	links: ArrayField<UpsertLinkWithPlatform>[];
	setLinks: Dispatch<SetStateAction<ArrayField<UpsertLinkWithPlatform>[]>>;
	profile: UpdateProfile;
	setProfile: Dispatch<SetStateAction<UpdateProfile>>;
} | null>(null);

export const usePreviewContext = () => {
	const context = useContext(PreviewContext);
	if (!context) {
		throw new Error(`usePreviewContext must be used within a PreviewProvider`);
	}
	return context;
};

export const PreviewProvider = ({
	children,
	links,
	profile: userProfile,
}: {
	children: React.ReactNode;
	links?: ArrayField<UpsertLinkWithPlatform>[];
	profile: UpdateProfile;
}) => {
	const [linkList, setLinkList] = useState<
		ArrayField<UpsertLinkWithPlatform>[]
	>(links || []);
	const [profile, setProfile] = useState<UpdateProfile>(userProfile);

	useEffect(() => {
		if (links) {
			setLinkList(links);
		}
	}, [links]);

	return (
		<PreviewContext.Provider
			value={{ links: linkList, setLinks: setLinkList, profile, setProfile }}
		>
			{children}
		</PreviewContext.Provider>
	);
};
