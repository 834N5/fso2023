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
