"use client";

import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

import { ArrayField, UpsertLinkWithPlatform } from "../../links/types";

export const PreviewContext = createContext<{
	links: ArrayField<UpsertLinkWithPlatform>[];
	setLinks: Dispatch<SetStateAction<ArrayField<UpsertLinkWithPlatform>[]>>;
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
}: {
	children: React.ReactNode;
	links?: ArrayField<UpsertLinkWithPlatform>[];
}) => {
	const [linkList, setLinkList] = useState<
		ArrayField<UpsertLinkWithPlatform>[]
	>(links || []);

	useEffect(() => {
		if (links) {
			setLinkList(links);
		}
	}, [links]);

	return (
		<PreviewContext.Provider value={{ links: linkList, setLinks: setLinkList }}>
			{children}
		</PreviewContext.Provider>
	);
};
