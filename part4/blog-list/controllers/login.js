const loginRouter = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
		if (!username) {
			response.status(400).json(
				{ error: "Path `username` is required." }
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
			const token = jwt.sign(
				{username: username, id: user._id},
				config.SECRET,
				{expiresIn: "1h"}
			);
			response.status(200).json({username, token});
		} else {
			response.status(401).json(
				{error: "invalid username or password"}
			);
		}

	} catch(exception) {
		next(exception);
	}
});

module.exports = loginRouter;
