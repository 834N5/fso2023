const Blog = require("../models/blog");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const api = supertest(app);

const initBlogs = [
	{
		title: "a title",
		author: "an author",
		url: "https://nothing.com",
		likes: 39
	},
	{
		title: "another title",
		author: "anon",
		url: "https://something.com",
		likes: 59
	},
	{
		title: "not a title",
		author: "author",
		url: "https://arstneio.com",
		likes: 9
	},
	{
		title: "BIG TITS",
		author: "arthur",
		url: "https://example.com",
		likes: 1
	}
];

let token;

beforeEach(async () => {
	await User.deleteMany({});
	const user = await api.post("/api/users").send(
		{
			username: "AzureDiamond",
			name: "hunter",
			password: "hunter2"
		}
	);
	const login = await api.post("/api/login").send(
		{
			username: "AzureDiamond",
			password: "hunter2"
		}
	);
	token = "Bearer " + login.body.token;
	const mongooseObjectId = (await User.findById(user.body.id))._id;
	initBlogs.forEach(blog => blog.user = mongooseObjectId);
	await Blog.deleteMany({});
	await Blog.insertMany(initBlogs);
}, 10000);

describe("GETing blogs", () => {
	test("api returns correct amount of blog posts", async () => {
		const response = await api.get("/api/blogs");
		expect(response.body).toHaveLength(initBlogs.length);
	});

	test("blog posts returned by api have an id property", async () => {
		const response = await api.get("/api/blogs");
		response.body.forEach((blog) => expect(blog.id).toBeDefined());
	});
});
describe("POSTing blogs", () => {
	test("post request successfully creates a new blog post", async () => {
		await api.post("/api/blogs").send(
			{
				title: "green eggs and ham",
				author: "sam",
				url: "https://sam.com",
				likes: 2
			}
		).set("Authorization", token);
		const response = await api.get("/api/blogs");
		expect(response.body).toHaveLength(initBlogs.length+1);
		expect(response.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining(
					{
						title: "green eggs and ham",
						author: "sam",
						url: "https://sam.com",
						likes: 2
					}
				)
			])
		);
	});

	test("likes default to 0 when excluded from request", async () => {
		const response = await api.post("/api/blogs").send(
			{
				title: "I LOVE CHEESEBURGER",
				author: "CHEESEBURGERLOVER223",
				url: "https://cheeseburger.com"
			}
		).set("Authorization", token);
		expect(response.body.likes).toBe(0);
	});

	test("api returns 400 when title or url are missing", async () => {
		const response1 = await api.post("/api/blogs").send(
			{
				author: "CHEESEBURGERLOVER223",
				url: "https://cheeseburger.com",
				likes: 3
			}
		).set("Authorization", token);
		expect(response1.statusCode).toBe(400);

		const response2 = await api.post("/api/blogs").send(
			{
				title: "I LOVE CHEESEBURGER",
				author: "CHEESEBURGERLOVER223",
				likes: 3
			}
		).set("Authorization", token);
		expect(response2.statusCode).toBe(400);
	});
});

describe("DELETEing blogs", () => {
	test("delete blog", async () => {
		const id = (await api.get("/api/blogs")).body[0].id;
		await api.delete(`/api/blogs/${id}`).set("Authorization", token);
		const response = await api.get("/api/blogs");

		expect(response.body).toHaveLength(initBlogs.length-1);
		expect(response.body).toEqual(
			expect.arrayContaining([
				expect.not.objectContaining({id: id})
			])
		);
	});
});

afterAll(async () => {
	await mongoose.connection.close()
});
