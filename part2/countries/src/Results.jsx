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

	return(
		<>
			{countryResults.map((country, index)=> <p key={index}>{country.name.common}</p>)}
		</>
	);
}

export default Results
