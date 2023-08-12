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
	const [newName, setNewName] = useState("wow");

	function addName(event)
	{
		event.preventDefault()
		if (persons.some((person) => person.name === newName)) {
			alert(`${newName} has already been added to the phonebook.`);
			return;
		}
		setPersons(persons.concat({name: newName, id: persons.length}));
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
