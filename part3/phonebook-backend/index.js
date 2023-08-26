const express = require("express")
const app = express()

const PORT = 3001;

let persons = [
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
	console.log("request received!");
	console.log(request);
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find(person => person.id === id);
	if (person)
		response.json(person);
	else
		response.status(404).end()
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const idIndex = persons.findIndex(person => person.id === id);
	if(idIndex !== -1) {
		persons.splice(idIndex, 1);
		response.status(204).end()
	} else
		response.status(404).end()
});
