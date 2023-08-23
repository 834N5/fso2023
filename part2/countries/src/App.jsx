import {useEffect, useState} from "react";
import axios from "axios";
import countryServices from "./services/countries.js";
import Results from "./Results.jsx";

function App() {
	const [search, setSearch] = useState("");
	const [countries, setCountries] = useState(null);
	const [detail, setDetail] = useState(null);

	useEffect(() => {
		countryServices.getAll()
			.then(response => setCountries(response))
			.catch(() => console.log("error"));
	}, []);

	useEffect(() => {
		setDetail(null);
	}, [search]);

	function handleSearchChange(event)
	{
		setSearch(event.target.value);
	}

	return(
		<>
			<p>Search for a country: <input value={search} onChange={handleSearchChange}/></p>
			<Results
				countries={countries}
				query={search}
				detail={detail}
				setDetail={country => setDetail(country)}
			/>
		</>
	);
}

export default App
