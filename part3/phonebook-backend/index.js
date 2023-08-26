const express = require("express")
const app = express()

const PORT = 3001;

app.use(express.json());

function generateID(arr)
{
	for (let i = 0; i < arr.length; ++i)
		while (arr[i] < arr.length && arr[i] > 0 && arr[i] !== i)
			[ arr[arr[i]], arr[i] ] = [ arr[i], arr[arr[i]] ];
	for (let i = 1; i < arr.length; ++i)
		if (arr[i] !== i)
			return(i);
	return(arr.length+1);
}

const persons = [
	{
		"id": 1,
		"name": "Arto Hellas", 
		"number": "040-123456"
	},
	{ 
		"id": 2,
		"name": "Ada Lovelace", 
		"number": "39-44-5323523"
	},
	{ 
		"id": 3,
		"name": "Dan Abramov", 
		"number": "12-43-234345"
	},
	{ 
		"id": 4,
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122"
	}
];

app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
});

app.get("/info", (request, response) => {
	response.send(`
		<p>Phonebook has info for ${persons.length} people</p>
		<p>${new Date()}</p>
	`);
});

/* api requests */
app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find(person => person.id === id);
	if (person)
		response.json(person);
	else
		response.status(404).end();
});

app.post("/api/persons", (request, response) => {
	const id = generateID(persons.map(person => person.id));
	const newPerson = {...request.body, id};
	console.log(newPerson);
	if (!newPerson.name || !newPerson.number) {
		response.status(400).json({error: "parameter missing"});
	} else if (persons.findIndex(person =>
		person.name === newPerson.name) != -1) {
		response.status(422).json({error: "name must be unique"});
	} else
		persons.push(newPerson);
		response.json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const idIndex = persons.findIndex(person => person.id === id);
	if(idIndex !== -1) {
		persons.splice(idIndex, 1);
		response.status(204).end();
	} else
		response.status(404).end();
});
