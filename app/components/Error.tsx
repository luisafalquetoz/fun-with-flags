import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type ErrorProps = {
	text: string;
};

const Error = ({text}: ErrorProps) => {
	return (
		<div className="flex flex-col items-center m-auto gap-2">
			<ExclamationCircleIcon className="size-6"/>
			<span className="text-sm">Ops, something went wrong!</span>
            <span className="text-sm">{text}</span>
		</div>
	);
};

export default Error;