import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 *
 * @param hex Hex color code
 * @returns #000 if the color is light, #FFF if the color is dark
 */
export const getContrastColor = (hex: string): string => {
	// Convert hex to RGB
	const red: number = parseInt(hex.substring(1, 3), 16) / 255;
	const green: number = parseInt(hex.substring(3, 5), 16) / 255;
	const blue: number = parseInt(hex.substring(5, 7), 16) / 255;

	// Calculate the luminance value
	const luminance: number = 0.299 * red + 0.587 * green + 0.114 * blue;

	// Return contrast color based on luminance
	return luminance > 0.75 ? "#000" : "#FFF";
};
