import {useState, useEffect} from "react";
import personsService from "./services/persons";
import Notification from "./Notification";
import Search from "./Search";
import PhonebookForm from "./PhonebookForm";
import People from "./People";

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
	const [message, setMessage] = useState(null);

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
		/* id automatically allocated by json-server */
		let personsObj = {
			name: newName.trim(),
			number: newNumber.trim(),
		}
		setNewName(personsObj.name);
		setNewNumber(personsObj.number);
		if (!personsObj.name)
			alert("Name must not be empty");
		else if (!personsObj.number)
			alert("Number must not be empty");
		else if (persons.some((person) => person.number === personsObj.number))
			alert(`The number: ${personsObj.number} has already been used.`);
		/* Edit number */
		else if (persons.some((person) => person.name === personsObj.name)) {
			if (window.confirm(`${personsObj.name} has already been added to the phonebook.\nWould you like to replace the phone number?`)) {
				let id = persons.find(person => person.name === personsObj.name).id;
				personsService.change(personsObj, id).then(response => {
					setPersons(persons.map(person =>
						person.id === response.id ? response : person)
					);
					setNewName("");
					setNewNumber("");
					setMessage(`${response.name} has been edited.`);
					console.log("ok");
					setTimeout(() => setMessage(null), 5000);
					/* TODO
					 * use a FIFO queue to add and remove messages
					 * use .map in Notification.js to render an array
					 * of objects including the message and type (success, error)
					 */
				});
			}
		}
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
			<Notification message={message} />
			<Search search={search} onChange={handleSearchChange} />
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
