'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { countriesApi } from '../../services';

export default function Country() {
	const name = 'Brazil';
	const params = useParams();

	const [id, setId] = useState<string | null>(null);
	const [country, setCountry] = useState<Country>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (params?.id && params.id !== id) {
			setId(params.id as string);
		}
	}, [params, id]);

	useEffect(() => {
		const fetchCountries = async () => {
			const [response, error] = await countriesApi.getCountry(id);
			setLoading(false);

			if (error) {
				setError(error);
				return;
			}

			setCountry(response);
		};

		if (id) {
			fetchCountries();
		}
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>(error)</div>;

	console.log(country);

	return (
		<>
			<div className="mb-8">
				<Link href="/">
					<button className="bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded">
						Back
					</button>
				</Link>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
				<div className="w-full md:max-w-[400px]">
					<Image
						src={'/placeholder.svg'}
						alt={`Flag of ${name}`}
						className="w-full h-full"
						width={500}
						height={300}
					/>
				</div>
				<div className="flex flex-col just p-6 text-sm text-gray-600">
					<h2 className="text-xl font-semibold mb-4">Brazil ({id})</h2>
					<div className="space-y-2">
						<div className="flex items-center gap-1">
							<span className="font-semibold">Capital: </span>
							<span>Brasilia</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="font-semibold">Region: </span>
							<span>South America</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="font-semibold">Population: </span>
							<span>214056456</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="font-semibold">Languages: </span>
							<span>Portuguese</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="font-semibold">Currencies: </span>
							<span>BRL</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="font-semibold">Top Level Domains: </span>
							<span>.br</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="font-semibold">Borders: </span>
							<span>ARG, BOL, COL, URG...</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
