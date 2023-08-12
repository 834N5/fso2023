import {useState} from "react"

function People({people})
{
	return(
		<>
			{people.map(people =>
				<p key={people.id}>{people.name}</p>
			)}
		</>
	);
}
function App()
{
	const [persons, setPersons] = useState([
		{name: "Arto Hellas", id: 0}
	]);
	const [newName, setNewName] = useState("");

	function addName(event)
	{
		event.preventDefault()
		let name = newName.trim()
		setNewName(name);
		if (!name)
			alert("Name must not be empty");
		else if (persons.some((person) => person.name === name.trim()))
			alert(`${name} has already been added to the phonebook.`);
		else {
			setPersons(persons.concat({name: name.trim(), id: persons.length}));
			setNewName("");
		}
	}
	function handleNameChange(event)
	{
		setNewName(event.target.value);
	}

	return(
		<>
			<h1>Phonebook</h1>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
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
