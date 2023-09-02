const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

const PORT = 3001;
const dbUrl = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
morgan.token("tinyData", (tokens, req, res) => {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, "content-length"), "-",
		tokens["response-time"](req, res), "ms",
		JSON.stringify(req.body)
	].join(" ");
});
app.use(morgan("tinyData"));
app.use(express.static("../../part2/phonebook/build/"));

mongoose.connect(dbUrl);

const phonebookSchema = new mongoose.Schema({
        name: String,
        number: String
});
const Person = mongoose.model("Person", phonebookSchema);

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
	Person.find({}).then(result => {
		response.json(result);
	});
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
	if (!newPerson.name || !newPerson.number) {
		response.status(400).json({error: "parameter missing"});
	} else if (persons.findIndex(person =>
		person.name === newPerson.name) != -1) {
		response.status(422).json({error: "name must be unique"});
	} else {
		persons.push(newPerson);
		response.json(newPerson);
	}
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
