type Props = {
	title: string;
	description: string;
};

export const TabHeader = ({ title, description }: Props) => {
	return (
		<div>
			<h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
				{title}
			</h1>
			<p className="font-light text-gray-500">{description}</p>
		</div>
	);
};
