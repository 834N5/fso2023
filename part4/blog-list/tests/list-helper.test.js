const listHelper = require("../utils/list-helper.js");

test("Dummy returns 1", () => {
	const blogs = [];
	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});
