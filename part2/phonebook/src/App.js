import {useState, useEffect} from "react";
import axios from 'axios';
import People from "./People";
import PhonebookForm from "./PhonebookForm";
import Search from "./Search";

function App()
{
	const [persons, setPersons] = useState([]);
	useEffect(() => {
		axios.get("http://localhost:3001/persons")
		.then(response => setPersons(response.data))
	}, []);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");

	function addNumber(event)
	{
		event.preventDefault();
		let personsObj = {
			name: newName.trim(),
			number: newNumber.trim(),
			id: persons.length
		}
		setNewName(personsObj.name);
		setNewNumber(personsObj.number);
		if (!personsObj.name)
			alert("Name must not be empty");
		else if (!personsObj.number)
			alert("Number must not be empty");
		else if (persons.some((person) => person.name === personsObj.name))
			alert(`${personsObj.name} has already been added to the phonebook.`);
		else if (persons.some((person) => person.number === personsObj.number))
			alert(`The number: ${personsObj.number} has already been used.`);
		else {
			axios.post("http://localhost:3001/persons", personsObj)
			.then(response => console.log(response));
			setPersons(persons.concat(personsObj));
			setNewName("");
			setNewNumber("");
		}
	}

	function handleNameChange(event)
	{
		setNewName(event.target.value);
	}
	function handleNumberChange(event)
	{
		setNewNumber(event.target.value);
	}
	function handleSearchChange(event)
	{
		setSearch(event.target.value);
	}


	return(
		<>
			<h1>Phonebook</h1>
			<Search search={search} onChange={handleSearchChange}/>
			<h1>Add new number</h1>
			<PhonebookForm
				onSubmit={addNumber}
				name={newName}
				onNameChange={handleNameChange}
				number={newNumber}
				onNumberChange={handleNumberChange}
			/>
			<h1>Numbers</h1>
			<People people={persons} search={search} />
		</>
	);
}

export default App;
