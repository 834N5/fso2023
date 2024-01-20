const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

blogRouter.get("/", async (request, response, next) => {
	const blogs = await Blog.find({}).populate(
		"user",
		["username", "name"]
	);
	response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
	const {title, author, url, likes} = request.body;

	try {
		const token = jwt.verify(request.token, config.SECRET);
		const id = await User.findById(token.id, "id");
		const blog = new Blog({title, author, url, likes, user: id});

		const result = await blog.save();
		await User.findByIdAndUpdate(
			token.id,
			{$push: {blogs: result._id}},
			{new: true, runValidators: true, context: "query"}
		);
		response.status(201).json(result);
	} catch(exception) {
		next(exception);
	}
});

blogRouter.delete("/:id", async (request, response, next) => {
	try {
		const token = jwt.verify(request.token, config.SECRET);

		const blogUserID = await Blog.findById(request.params.id, "user");
		if (token.id !== blogUserID.user.toString()) {
			response.status(401).json({error: "not authorized"});
			return;
		}

		const result = await Blog.findByIdAndDelete(request.params.id);
		if (result) {
			await User.findByIdAndUpdate(
				token.id,
				{$pull: {blogs: request.params.id}},
				{new: true, runValidators: true, context: "query"}
			);
			response.status(204).end();
		} else {
			response.status(404).end();
		}
	} catch(exception) {
		next(exception);
	}
});

blogRouter.put("/:id", async (request, response, next) => {
	const {title, author, url, likes} = request.body;
	const blog = {title, author, url, likes};
	try {
		const result = await Blog.findByIdAndUpdate(
			request.params.id,
			blog,
			{new: true, runValidators: true, context: "query"}
		);
		if (result) {
			response.status(200).json(result);
		} else {
			response.status(404).end();
		}
	} catch(exception) {
		next(exception);
	}
});

module.exports = blogRouter;
