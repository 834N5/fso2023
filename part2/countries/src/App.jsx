import {useEffect, useState, useRef} from "react";
import axios from "axios";
import countryServices from "./services/countries.js";
import Results from "./Results.jsx";

function App() {
	const [search, setSearch] = useState("");
	const [countries, setCountries] = useState(null);

	useEffect(() => {
		countryServices.getAll()
			.then(response => setCountries(response))
			.catch(() => console.log("error"));
	}, []);

	function handleSearchChange(event)
	{
		setSearch(event.target.value);
	}

	return(
		<>
			<p>Search for a country: <input value={search} onChange={handleSearchChange}/></p>
			<Results countries={countries} query={search} />
		</>
	);
}

export default App
