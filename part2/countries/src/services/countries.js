import axios from 'axios';

const url = "https://studies.cs.helsinki.fi/restcountries/api/";

function getAll()
{
	return(
		axios.get(`${url}all`).then(response => response.data)
	);
}
function getCountry(country)
{
		console.log("TODO");
}

const countryServices = {getAll, getCountry};
export default countryServices;
