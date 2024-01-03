const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response, next) => {
	const blogs = await Blog.find({})
	response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
	const blog = new Blog({
		"title": request.body.title,
		"author": request.body.author,
		"url": request.body.url,
		"likes": request.body.likes
	});
	try {
		const result = await blog.save()
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
