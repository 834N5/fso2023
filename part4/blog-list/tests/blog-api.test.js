const config = require("../utils/config");
const Blog = require("../models/blog");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

//console.log(config.MONGO_URL);
const initBlogs = [
	{
		"title": "a title",
		"author": "an author",
		"url": "https://nothing.com",
		"likes": 39
	},
	{
		"title": "another title",
		"author": "anon",
		"url": "https://something.com",
		"likes": 59
	},
	{
		"title": "not a title",
		"author": "author",
		"url": "https://arstneio.com",
		"likes": 9
	},
	{
		"title": "BIG TITS",
		"author": "arthur",
		"url": "https://example.com",
		"likes": 1
	}
];

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(initBlogs);
});

test("api returns correct amount of blog posts", async () => {
	const response = await api.get("/api/blogs");
	expect(response.body).toHaveLength(initBlogs.length);
});

test("blog posts returned by api all have an id property", async () => {
	const response = await api.get("/api/blogs");
	response.body.forEach((blog) => expect(blog.id).toBeDefined());
});

test("post request successfully creates a new blog post", async () => {
	await api.post("/api/blogs").send(
		{
			"title": "green eggs and ham",
			"author": "sam",
			"url": "https://sam.com",
			"likes": 2
		}
	);
	const response = await api.get("/api/blogs");
	expect(response.body).toHaveLength(initBlogs.length+1);
	expect(response.body).toEqual(
		expect.arrayContaining([
			expect.objectContaining(
				{
					"title": "green eggs and ham",
					"author": "sam",
					"url": "https://sam.com",
					"likes": 2
				}
			)
		])
	);
});

test("likes will default to 0 when excluded from request", async () => {
	const response = await api.post("/api/blogs").send(
		{
			"title": "I LOVE CHEESEBURGER",
			"author": "CHEESEBURGERLOVER223",
			"url": "https://cheeseburger.com",
		}
	);
	expect(response.body.likes).toBe(0);
});
