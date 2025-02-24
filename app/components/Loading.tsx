import { ArrowPathIcon } from "@heroicons/react/16/solid";

type LoadingProps = {
	text: string;
};

const Loading = ({text}: LoadingProps) => {
	return (
		<div className="flex flex-col items-center m-auto gap-2">
			<ArrowPathIcon className="size-6 animate-[spin_1.5s_linear_infinite]"/>
			<span className="text-sm">{text}</span>
		</div>
	);
};

export default Loading;