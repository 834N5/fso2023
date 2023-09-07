const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Successfully connected to MongoDB");
	}).catch(error => {
		console.log(error);
	});
const phonebookSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		required: true
	},
});
phonebookSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model("Person", phonebookSchema);
