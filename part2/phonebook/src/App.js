import {useState} from "react"

function People({people})
{
	return(
		<>
			{people.map(people =>
				<p key={people.id}>{people.name} {people.number}</p>
			)}
		</>
	);
}
function App()
{
	const [persons, setPersons] = useState([
		{name: "Arto Hellas", number: "1234567890", id: 0}
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	function addNumber(event)
	{
		event.preventDefault()
		let name = newName.trim()
		let number = newNumber.trim()
		setNewName(name);
		setNewNumber(number);
		if (!name)
			alert("Name must not be empty");
		else if (!number)
			alert("Number must not be empty");
		else if (persons.some((person) => person.name === name))
			alert(`${name} has already been added to the phonebook.`);
		else if (persons.some((person) => person.number === number))
			alert(`The number: ${number} has already been used.`);
		else {
			setPersons(persons.concat({name: name, number: number, id: persons.length}));
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

	return(
		<>
			<h1>Phonebook</h1>
			<form onSubmit={addNumber}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h1>Numbers</h1>
			<People people={persons} />
		</>
	);
}

export default App;
