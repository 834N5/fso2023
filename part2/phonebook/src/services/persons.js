import axios from 'axios';

const url = "http://localhost:3001/persons";

function getAll()
{
	return(
		axios.get(url).then(response => response.data)
	);
}

function add(personsObj)
{
	return(
		axios.post(url, personsObj).then(response => response.data)
	);
}

function remove(id)
{
	return(
		axios.delete(`${url}/${id}`)
	);
}

const personsServices = {getAll, add, remove};
export default personsServices;
