const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (request, response, next) => {
	const { username, password } = request.body;

	try {
		const user = await User.findOne({username});

		if (!password) {
			response.status(400).json(
				{ error: "Path `password` is required." }
			);
			return;
		}
		const passwordCorrect = (user
			? await bcrypt.compare(
				password, user.passwordHash
			)
			: false
		);
		if(user && passwordCorrect) {
			response.status(200).end();
		} else {
			response.status(401).json(
				{error: 'invalid username or password'}
			);
		}

	} catch(exception) {
		next(exception);
	}
});

module.exports = loginRouter;
