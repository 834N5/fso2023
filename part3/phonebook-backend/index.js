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


app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
});

app.get("/info", (request, response, next) => {
	Person.countDocuments({})
		.then(count => {
			response.send(`
				<p>Phonebook has info for ${count} people</p>
				<p>${new Date()}</p>
			`);
		})
		.catch(error => next(error));
});

/* api requests */
app.get("/api/persons", (request, response, next) => {
	Person.find({})
		.then(result => {
			response.json(result);
		})
		.catch(error => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then(result => {
			if (result)
				response.json(result)
			else
				response.status(404).end();
		})
		.catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
	const person = new Person({...request.body});
	person.save()
		.then(result => {
			response.json(result);
		})
		.catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const person = {
		name: request.body.name,
		number: request.body.number
	};
	Person.findByIdAndUpdate(
		request.params.id,
		person,
		{new: true, runValidators: true, context: "query"}
	)
		.then(result => {
			if (result)
				response.json(result)
			else
				response.status(404).end();
		})
		.catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			if (result)
				response.status(204).end();
			else
				response.status(404).end();
		})
		.catch(error => next(error));
});


function errorHandler(error, request, response, next)
{
	console.error(error.name);
	console.error(error.message);
	if (error.name === "CastError")
		return response.status(400).json({error: "malformatted id"});
	if (error.name === "ValidationError")
		return response.status(400).json({error: error.message});
	if (error.name === "MongooseError")
		return response.status(500).end();
	else {
		return response.status(500).end();
	}

	next(error);
}
app.use(errorHandler);
