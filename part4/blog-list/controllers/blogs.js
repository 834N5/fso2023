const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response, next) => {
	const blogs = await Blog.find({})
	response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
	const blog = new Blog(request.body);
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

module.exports = blogRouter;
