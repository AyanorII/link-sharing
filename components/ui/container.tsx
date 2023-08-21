import { twMerge } from "tailwind-merge";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const Container = ({ children, className, ...props }: Props) => {
	const BASE_CLASS_NAME =
		"container mx-auto px-4 sm:max-w-[90%] md:max-w-[85%]";

	return (
		<div {...props} className={twMerge([BASE_CLASS_NAME, className])}>
			{children}
		</div>
	);
};
