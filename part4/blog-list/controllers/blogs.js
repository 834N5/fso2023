const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response, next) => {
	const blogs = await Blog.find({}).populate(
		"user",
		["username", "name"]
	);
	response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
	const { title, author, url, likes } = request.body;
	const users = await User.aggregate([{$sample: {size: 1}}]);
	const blog = new Blog({ title, author, url, likes, user: users[0]._id});

	try {
		const result = await blog.save();
		console.log(result);
		await User.findByIdAndUpdate(
			users[0]._id,
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
		const result = await Blog.findByIdAndRemove(request.params.id);
		if (result)
			response.status(204).end();
		else
			response.status(404).end();
	} catch(exception) {
		next(exception);
	}
});

blogRouter.put("/:id", async (request, response, next) => {
	const blog = {
		"title": request.body.title,
		"author": request.body.author,
		"url": request.body.url,
		"likes": request.body.likes
	};
	try {
		const result = await Blog.findByIdAndUpdate(
			request.params.id,
			blog,
			{new: true, runValidators: true, context: "query"}
		);
		if (result)
			response.status(200).json(result);
		else
			response.status(404).end();
	} catch(exception) {
		next(exception);
	}
});

module.exports = blogRouter;
