const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.MONGO_URL

if (!dbUrl) {
	console.log("Mongodb url not found");
	process.exit(1);
}

mongoose.connect(dbUrl);
const phonebookSchema = new mongoose.Schema({
	name: String,
	number: String
});
const Person = mongoose.model("Person", phonebookSchema)

if (process.argv.length === 2) {
	Person.find({}).then(result => {
		console.log("Phonebook:");
		result.forEach(person => {
			console.log(person.name, person.number);
		});
		mongoose.connection.close()
	})
} else if (process.argv.length === 4) {
	const person = new Person({
		name: process.argv[2],
		number: process.argv[3],
	});

	person.save().then(result => {
		console.log(`Added "${result.name}", number: "${result.number}" to phonebook`);
		mongoose.connection.close();
	});
}
