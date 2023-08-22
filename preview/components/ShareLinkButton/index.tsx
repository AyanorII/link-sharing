"use client";

import { toast } from "react-toastify";

import { Button } from "@/components/ui";

export const ShareLinkButton = () => {
	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.success("Link copied to clipboard!");
		} catch (error) {
			toast.error("Failed to copy link to clipboard :(");
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	return <Button onClick={copyLink}>Share Link</Button>;
};
