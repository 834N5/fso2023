import axios from 'axios';

const url = "https://fso-phonebook-backend-lv99.onrender.com/api/persons";

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

function change(personsObj, id)
{
	return(
		axios.put(`${url}/${id}`, personsObj)
			.then(response => response.data)
	);
}

const personsServices = {getAll, add, remove, change};
export default personsServices;
