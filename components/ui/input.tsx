import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Label } from "./label";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: string;
	error?: boolean;
	errorMessage?: string;
	label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, icon, error, errorMessage, label, ...props }, ref) => {
		return (
			<div>
				{label && <Label htmlFor={props.id}>{label}</Label>}
				<div className="relative flex w-full bg-background">
					{icon && (
						<Image
							src={icon}
							width="16"
							height="16"
							alt="icon"
							className="absolute left-4 top-1/2 -translate-y-1/2"
						/>
					)}
					<input
						type={type}
						className={cn(
							"border bg-transparent relative z-10 focus:outline-none focus:ring-2 px-4 py-3 transition-all w-full focus:ring-primary focus:border-transparent rounded-md shadow-sm focus:shadow-md focus:shadow-[0_1px_15px_-4px_#633CFF] disabled:cursor-not-allowed disabled:opacity-50",
							error
								? "border-red-500 border-2 focus:shadow-none focus:ring-red-500"
								: "border-[#D9D9D9]",
							icon ? "pl-11" : "pl-4",
							className
						)}
						ref={ref}
						{...props}
					/>
					{error && (
						<p className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-red-500">
							{errorMessage}
						</p>
					)}
				</div>
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
