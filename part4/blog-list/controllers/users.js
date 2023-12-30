const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response, next) => {
	const users = await User.find({})
	response.json(users);
});

userRouter.post("/", async (request, response, next) => {
	const user = new User(request.body);
	try {
		const result = await user.save()
		response.status(201).json(result);
	} catch(exception) {
		next(exception);
	}
});

module.exports = userRouter;
