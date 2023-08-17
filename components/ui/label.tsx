import React from "react";

import { cn } from "@/lib/utils";

type Props = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, Props>(
	({ className, children, ...rest }, ref) => {
		return (
			<label
				{...rest}
				ref={ref}
				className={cn("mb-1 block text-sm text-gray-600", className)}
			>
				{children}
			</label>
		);
	}
);

Label.displayName = "Label";
