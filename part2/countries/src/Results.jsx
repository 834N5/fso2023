function Results({countries, query}) {
	if (!countries)
		return(<p>Getting data from server...</p>);

	if (!query)
		return(<p>Search for a country!</p>);

	const countryResults = countries.filter((country, index) =>
		country.name.common.toLowerCase().includes(query) ||
		country.name.official.toLowerCase().includes(query)
	);
	if (countryResults.length > 10)
		return(<p>Too many matches, please make your query more specific.</p>);

	if (countryResults.length === 1)
		return(
			<>
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
			</>
		);

	return(
		<>
			{countryResults.map((country, index) => <p key={index}>{country.name.common}</p>)}
		</>
	);
}

export default Results
