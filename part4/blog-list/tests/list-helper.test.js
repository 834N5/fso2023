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
	test("Return undefined when there are no blogs", () => {
		const result = listHelper.favoriteBlog(noBlogs);
		expect(result).toEqual(undefined);
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

describe("Author with most blogs", () => {
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
	const blogsA = [
		{
			_id: "91354786267",
			title: "something",
			author: "someone",
			url: "https://example.com",
			likes: 1124,
			__v: 0
		},
		{
			_id: "23654876586512",
			title: "something else",
			author: "someone",
			url: "https://example.com",
			likes: 1321,
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
			_id: "231114656987928734",
			title: "title",
			author: "anon",
			url: "https://nothing7b7sBsdgFBTtsdt7b2sdgG.onion",
			likes: 8,
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
	const blogsB = [
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
			_id: "231114656987928734",
			title: "title",
			author: "anon",
			url: "https://nothing7b7sBsdgFBTtsdt7b2sdgG.onion",
			likes: 8,
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
	test("Return undefined when there are no blogs", () => {
		const result = listHelper.mostBlogs(noBlogs);
		expect(result).toEqual(undefined);
	});
	test("Return the single author when there is 1 blog in a list", () => {
		const result = listHelper.mostBlogs(oneBlog);
		expect(result).toEqual({author: "Eric Carle", blogs: 1});
	});
	test("Return correct author when there are multiple blogs (test 1)", () => {
		const result = listHelper.mostBlogs(blogsA);
		const expected = [
			{author: "anon", blogs: 2},
			{author: "someone", blogs: 2}
		];
		expect(expected).toContainEqual(result);
	});
	test("Return correct author when there are multiple blogs (test 2)", () => {
		const result = listHelper.mostBlogs(blogsB);
		expect(result).toEqual({author: "anon", blogs: 2});
	});
});

describe("Author with most likes", () => {
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
	const blogsA = [
		{
			_id: "91354786267",
			title: "something",
			author: "someone",
			url: "https://example.com",
			likes: 4,
			__v: 0
		},
		{
			_id: "1236612676586512",
			title: "something else",
			author: "someone",
			url: "https://example.com",
			likes: 2,
			__v: 0
		},
		{
			_id: "23654876586512",
			title: "another one",
			author: "someone",
			url: "https://example.com",
			likes: 4,
			__v: 0
		},
		{
			_id: "0-399-22690-7",
			title: "The Very Hungry Caterpillar",
			author: "Eric Carle",
			url: "https://www.goodreads.com/book/show/4948.The_Very_Hungry_Caterpillar",
			likes: 1,
			__v: 0
		},
		{
			_id: "231114656987928734",
			title: "title",
			author: "anon",
			url: "https://nothing7b7sBsdgFBTtsdt7b2sdgG.onion",
			likes: 8,
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
	const blogsB = [
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
			_id: "231114656987928734",
			title: "title",
			author: "anon",
			url: "https://nothing7b7sBsdgFBTtsdt7b2sdgG.onion",
			likes: 1984,
			__v: 0
		},
		{
			_id: "234656987928734",
			title: "another title",
			author: "anon",
			url: "https://something23JHGYgufas7234basdfVa.onion",
			likes: 1337,
			__v: 0
		}
	];
	test("Return undefined when there are no blogs", () => {
		const result = listHelper.mostLikes(noBlogs);
		expect(result).toEqual(undefined);
	});
	test("Return the likes of single author when there is 1 blog in a list", () => {
		const result = listHelper.mostLikes(oneBlog);
		expect(result).toEqual({author: "Eric Carle", likes: 1969});
	});
	test("Return correct author when there are multiple blogs (test 1)", () => {
		const result = listHelper.mostLikes(blogsA);
		const expected = [
			{author: "anon", likes: 10},
			{author: "someone", likes: 10}
		];
		expect(expected).toContainEqual(result);
	});
	test("Return correct author when there are multiple blogs (test 2)", () => {
		const result = listHelper.mostLikes(blogsB);
		expect(result).toEqual({author: "anon", likes: 3321});
	});
});
