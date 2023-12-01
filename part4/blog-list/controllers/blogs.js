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

module.exports = blogRouter;
