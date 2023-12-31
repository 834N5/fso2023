import {useState, useEffect, useRef} from "react";
import personsService from "./services/persons";
import Notification from "./Notification";
import Search from "./Search";
import PhonebookForm from "./PhonebookForm";
import People from "./People";

function App()
{
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");
	const [messages, setMessages] = useState([]);
	const messagesRef = useRef(messages);
	messagesRef.current = messages;

	/* Some things I learnt
	 * passing a function to setTHING will get the latest THING
	 * Referencing THING directly in setTimeout didn't get the latest.
	 * using a function is more reliable from my testing
	 *
	 * This happens because setTimeout makes a closure over THING
	 * One way to avoid this issue is to use useRef to hold the value of THING
	 * I had to use messagesRef in the function. When I waited for the
	 * previous messages to delete before submitting window.confirm,
	 * messages would be in the previous state of messages of when the add button was pressed.
	 * I'm not too sure why.
	 */
	function addMessage(message, type, timeout = 5000)
	{
		/* Get lowest missing positive int */
		let keys = (messagesRef.current.map(messages => messages.key));
		let key = 0;
		for (let i = 0; i < keys.length; ++i)
			while(keys[i] < keys.length && keys[i] !== i)
				[ keys[keys[i]], keys[i] ] = [ keys[i], keys[keys[i]] ];
		for (key = 0; key < keys.length; ++key)
			if (keys[key] !== key)
				break;

		setMessages(messages => [...messages, {message, type, key}]);
		if (timeout)
			setTimeout(() => setMessages(messages => messages.slice(1)), timeout)
	}

	useEffect(() => {
		personsService.getAll().then(response => setPersons(response))
			.catch(() => addMessage("Database was unable to be reached", "error", 0));
	}, []);

	function removePersons(id, name)
	{
		if (window.confirm(`Delete ${name}?`)) {
			personsService.remove(id)
			.then(() => setPersons(persons.filter(person => person.id !== id)))
			.catch(() => addMessage(`${name} could not be deleted`, "error"));
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
			addMessage("Name must not be empty", "error");
		else if (!personsObj.number)
			addMessage("Number must not be empty", "error");
		else if (persons.some((person) => person.number === personsObj.number))
			addMessage(`The number: ${personsObj.number} has already been used.`, "error");
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
					addMessage(`${response.name} has been edited.`, "success");
				})
					.catch(error => {
						console.log(error.response.data.error);
						addMessage(`${personsObj.name} could not be edited`, "error")
					});
			}
		}
		else {
			personsService.add(personsObj)
			.then(response => {
				setPersons(persons.concat(response));
				setNewName("");
				setNewNumber("");
				addMessage(`${response.name} has been added.`, "success");
			})
			.catch(error => {
				console.log(error.response.data.error);
				addMessage("Name was unable to be added", "error");
			});
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
			<Notification messages={messages} />
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
