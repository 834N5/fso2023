require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

const PORT = 3001;
const dbUrl = process.env.MONGO_URL;
const Person = require("./models/person");

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
	if (!request.body.name || !request.body.number) {
		response.status(400).json({error: "parameter missing"});
	} else {
		const person = new Person({...request.body});
		person.save().then(result => {
			response.json(result);
		});
	}
});

app.delete("/api/persons/:id", (request, response) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end();
		})
		.catch(error => {
			console.log(error);
			response.status(404).end();
		});
});
