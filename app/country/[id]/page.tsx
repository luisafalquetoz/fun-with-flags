'use client';

import { Error, Loading } from '@/components';
import { countriesApi } from '@/services';
import { formatPopulation } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type DetailedCountry = {
	cca3: string;
	flags: {
		svg: string;
	};
	name: {
		common: string;
		official: string;
	};
	capital: string[];
	region: string;
	population: number;
	languages: Record<string, string>;
	currencies: Record<string, { name: string; symbol: string }>;
	tld: string[];
	borders: string[];
};

export default function Country() {
	const params = useParams();

	const [id, setId] = useState<string | null>(null);
	const [country, setCountry] = useState<DetailedCountry>();
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

	if (loading) return <Loading text="Visiting country..." />;
	if (error) return <Error text={error} />;

	const {
		flags,
		name,
		capital,
		region,
		population,
		languages,
		currencies,
		tld,
		borders,
	} = country ?? {};

	const { svg: flag } = flags ?? {};
	const { common: countryName, official: officialName } = name ?? {};
	const [capitalName] = capital ?? [];
	const languagesNames = Object.values(languages ?? {}).join(', ');
	const currenciesName = Object.values(currencies ?? {})
		.map(({ name, symbol }) => `${name} (${symbol})`)
		.join(', ');
	const [topLevelDomain] = tld ?? [];
	const bordersId = borders ?? [];

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
				<div className="flex items-center md:max-w-[400px]">
					<Image
						src={flag || '/placeholder.svg'}
						alt={`Flag of ${countryName}`}
						className="max-h-80 object-cover rounded-lg"
						width={500}
						height={300}
						priority
					/>
				</div>
				<div className="flex flex-col just p-6 text-sm text-gray-600">
					<h2 className="text-xl font-semibold mb-4">
						{countryName} ({id})
					</h2>
					<div className="space-y-2">
						<div>
							<span className="font-semibold">Official Name: </span>{' '}
							{officialName}
						</div>
						<div>
							<span className="font-semibold">Capital: </span> {capitalName}
						</div>
						<div>
							<span className="font-semibold">Region: </span> {region}
						</div>
						<div>
							<span className="font-semibold">Population: </span>{' '}
							{formatPopulation(population)}
						</div>
						<div>
							<span className="font-semibold">Languages: </span>{' '}
							{languagesNames}
						</div>
						<div>
							<span className="font-semibold">Currencies: </span>{' '}
							{currenciesName}
						</div>
						<div>
							<span className="font-semibold">Top Level Domains: </span>{' '}
							{topLevelDomain}
						</div>
						<div className="md:max-w-80">
							<span className="font-semibold">Borders: </span>{' '}
							{bordersId.length > 0
								? bordersId.map((bordersId) => (
										<Link key={bordersId} href={`/country/${bordersId}`}>
											<button className="bg-gray-200 hover:bg-gray-300 text-xs mb-[6px] mr-[6px] px-[6px] p-y[1.5px] rounded">
												{bordersId}
											</button>
										</Link>
									))
								: 'None'}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
