import {useState, useEffect} from "react";
import personsService from "./services/persons";
import People from "./People";
import PhonebookForm from "./PhonebookForm";
import Search from "./Search";

function App()
{
	const [persons, setPersons] = useState([]);
	useEffect(() => {
		personsService.getAll().then(response => setPersons(response))
			.catch(() => alert("Database was unable to be reached"));
	}, []);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");

	function removePersons(id, name)
	{
		if (window.confirm(`Delete ${name}?`)) {
			personsService.remove(id)
			.then(() => setPersons(persons.filter(person => person.id !== id)))
			.catch(() => alert(`${name} could not be deleted`));
		}
	}

	function addNumber(event)
	{
		event.preventDefault();
		/* id automatically allocated my json-server */
		let personsObj = {
			name: newName.trim(),
			number: newNumber.trim(),
			id: 0
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
			personsService.add(personsObj)
			.then(response => {
				setPersons(persons.concat(response));
				setNewName("");
				setNewNumber("");
			})
			.catch(() => alert("Name was unable to be added"));
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
			<People people={persons} search={search} remove={removePersons} />
		</>
	);
}

export default App;
