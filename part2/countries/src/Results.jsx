import {useState, useRef} from "react";
import weatherServices from "./services/weather.js";

function Results({countries, query, detail, setDetail}) {
	const [weather, setWeather] = useState(null);
	const weatherCountry = useRef(null);

	if (!countries)
		return(<p>Getting data from server...</p>);

	if (!query)
		return(<p>Search for a country!</p>);

	const filter = detail ?
		country => country.name.common === detail :
		country =>
			country.name.common.toLowerCase().includes(query.toLowerCase()) ||
			country.name.official.toLowerCase().includes(query.toLowerCase())

	const countryResults = countries.filter((country, index) => filter(country));

	if (!detail && countryResults.length > 10)
		return(<p>Too many matches, please make your query more specific.</p>);

	if (countryResults.length === 1) {
		if (countryResults[0].name.common != weatherCountry.current) {
			weatherCountry.current = countryResults[0].name.common
			setWeather(null);
			weatherServices.getWeather(weatherCountry.current)
				.then(response => setWeather(response))
				.catch(() => {
					setWeather("Couldn't fetch weather");
				});
		}
		console.log(weather);
		return(
			<>
				<button onClick={() => {
					setDetail(null)
					if (weather === "Couldn't fetch weather")
						weatherCountry.current = null;
				}}>Back</button>
				<h1>{countryResults[0].name.common}</h1>
				<h2>Official name: {countryResults[0].name.official}</h2>
				<h3>Population: </h3>
				<p>{countryResults[0].population} people</p>
				<h3>Capital city</h3>
				{countryResults[0].capital.map((city, index) =>
					<p key={index}>{city}</p>
				)}
				<h3>Area</h3>
				<p>{countryResults[0].area} km²</p>
				<h3>Languages spoken</h3>
				{Object.values(countryResults[0].languages)
					.map((language, index) =>
						<p key={index}>{language}</p>
					)
				}
				<h3>Flag</h3>
				<img src={countryResults[0].flags.png}
				     alt={`${countryResults[0].name.common} flag`}
				/>
				<h2>Weather</h2>
				{weather ? <pre>{weather}</pre> : <p>Fetching Weather...</p>}
			</>
		);
	}

	return(
		<>
			{countryResults.map((country, index) =>
				<div key={index}>
					{country.name.common}
					<button onClick={() => setDetail(country.name.common)}>Show details</button>
				</div>
			)}
		</>
	);
}

export default Results
