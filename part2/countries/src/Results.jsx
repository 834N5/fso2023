function Results({countries, query}) {
	if (!countries)
		return(<p>Getting data from server...</p>);
	console.log(countries);
	console.log(query);
	console.log(countries[4]);
	const countryResults = countries.filter((country, index) =>
		country.name.common.toLowerCase().includes(query) ||
		country.name.official.toLowerCase().includes(query)
	);
	return(
		<>
			{countryResults.map((country, index)=> <p key={index}>{country.name.common}</p>)}
		</>
	);
}

export default Results
