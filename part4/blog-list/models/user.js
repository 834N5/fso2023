const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, minLength: 3, unique: true},
	name: { type: String, required: true },
	passwordHash: { type: String, required: true },
	blogs: [{ type: mongoose.ObjectId, ref: "Blog"}]
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	}
});

module.exports = mongoose.model("User", userSchema);
