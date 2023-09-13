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
			title: "The Very Hungry Caterpillar ",
			author: "Eric Carle",
			url: "https://www.goodreads.com/book/show/4948.The_Very_Hungry_Caterpillar",
			likes: 1969,
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
});
