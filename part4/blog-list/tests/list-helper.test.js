const listHelper = require("../utils/list-helper.js");

test("Dummy returns 1", () => {
	const blogs = [];
	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe("total likes", () => {
	const noBlogs = [];
	const oneBlog = [
		{
			_id: "0-399-22690-7",
			title: "The Very Hungry Caterpillar",
			author: "Eric Carle",
			url: "https://www.goodreads.com/book/show/4948.The_Very_Hungry_Caterpillar",
			likes: 1969,
			__v: 0
		}
	];
	const blogs = [
		{
			_id: "91354786267",
			title: "something",
			author: "someone",
			url: "https://example.com",
			likes: 1124,
			__v: 0
		},
		{
			_id: "0-399-22690-7",
			title: "The Very Hungry Caterpillar",
			author: "Eric Carle",
			url: "https://www.goodreads.com/book/show/4948.The_Very_Hungry_Caterpillar",
			likes: 1969,
			__v: 0
		},
		{
			_id: "234656987928734",
			title: "another title",
			author: "anon",
			url: "https://something23JHGYgufas7234basdfVa.onion",
			likes: 2,
			__v: 0
		}
	];
	test("Return 0 when there are no blogs", () => {
		const result = listHelper.totalLikes(noBlogs);
		expect(result).toBe(0);
	});
	test("Return the amount of likes in the singular blog when there is only 1 blog in a list", () => {
		const result = listHelper.totalLikes(oneBlog);
		expect(result).toBe(1969);
	});
	test("Return correct amount of likes when there are multiple blogs", () => {
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(3095);
	});
});

describe("Blog with most likes", () => {
	const noBlogs = [];
	const oneBlog = [
		{
			_id: "0-399-22690-7",
			title: "The Very Hungry Caterpillar",
			author: "Eric Carle",
			url: "https://www.goodreads.com/book/show/4948.The_Very_Hungry_Caterpillar",
			likes: 1969,
			__v: 0
		}
	];
	const blogs = [
		{
			_id: "91354786267",
			title: "something",
			author: "someone",
			url: "https://example.com",
			likes: 1124,
			__v: 0
		},
		{
			_id: "0-399-22690-7",
			title: "The Very Hungry Caterpillar",
			author: "Eric Carle",
			url: "https://www.goodreads.com/book/show/4948.The_Very_Hungry_Caterpillar",
			likes: 1969,
			__v: 0
		},
		{
			_id: "234656987928734",
			title: "another title",
			author: "anon",
			url: "https://something23JHGYgufas7234basdfVa.onion",
			likes: 2,
			__v: 0
		}
	];
	test("Return null when there are no blogs", () => {
		const result = listHelper.favoriteBlog(noBlogs);
		expect(result).toEqual(null);
	});
	test("Return the amount of likes in the singular blog when there is only 1 blog in a list", () => {
		const result = listHelper.favoriteBlog(oneBlog);
		expect(result).toEqual(oneBlog[0]);
	});
	test("Return correct amount of likes when there are multiple blogs", () => {
		const result = listHelper.favoriteBlog(blogs);
		expect(result).toEqual(blogs[1]);
	});
});
