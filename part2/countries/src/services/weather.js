import axios from 'axios';

const url = "https://wttr.in/";

function getWeather(country)
{
	return(
		axios.get(`${url}${country}?0AT`).then(response => response.data)
	);
}

const weatherServices = {getWeather};
export default weatherServices;
