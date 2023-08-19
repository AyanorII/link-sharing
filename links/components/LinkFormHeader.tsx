import { Button } from "@/components/ui";

type Props = {
	onClick: () => void;
};
export const LinkFormHeader = ({ onClick }: Props) => {
	return (
		<>
			<h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
				Customize your links
			</h1>
			<p className="font-light text-gray-500">
				Add/edit/remove links below and then share all your profiles with the
				world!
			</p>
			<div className="mt-10 w-full">
				<Button
					type="button"
					variant="outline"
					className="mt-10 w-full"
					onClick={onClick}
				>
					+ Add new link
				</Button>
			</div>
		</>
	);
};
