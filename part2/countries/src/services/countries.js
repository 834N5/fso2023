import axios from 'axios';

const url = "https://studies.cs.helsinki.fi/restcountries/api/";

function getAll()
{
	return(
		axios.get(`${url}all`).then(response => response.data)
	);
}

const countryServices = {getAll};
export default countryServices;
