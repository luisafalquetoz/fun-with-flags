import { Card, Footer, Grid, Header } from "./components";

const countries = [
	{
		id: 1,
		country: "Brazil",
		capital: "Brasília",
		region: "South America",
		population: "214300000",
	},
	{
		id: 2,
		country: "Japan",
		capital: "Brasília",
		region: "South America",
		population: "214300000",
	},
	{
		id: 3,
		country: "United States",
		capital: "Brasília",
		region: "South America",
		population: "214300000",
	},
	{
		id: 4,
		country: "Germany",
		capital: "Brasília",
		region: "South America",
		population: "214300000",
	},
];

export default function Home() {
	return (
		<>
			<Header />
			<main className="flex-1">
				<Grid>
					{countries.map(({ id, country, capital, region, population }) => (
						<Card
							key={id}
							country={country}
							capital={capital}
							region={region}
							population={population}
						/>
					))}
				</Grid>
			</main>
			<Footer />
		</>
	);
}
