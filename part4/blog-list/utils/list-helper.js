const _ = require("lodash");

function dummy(blogs) {
	return 1;
}

function totalLikes(blogs) {
	const sum = blogs.reduce((acc, curr) => acc + curr.likes, 0);
	return sum;
}

function favoriteBlog(blogs) {
	if (blogs.length === 0)
		return undefined;
	let topBlog = blogs[0];
	blogs.forEach(blog => {
		if (topBlog.likes < blog.likes)
			topBlog = blog;
	});
	return topBlog;
}

function mostBlogs(blogs) {
	const topBlog = _.maxBy(
		_.map(
			_.groupBy(_.map(blogs, blog => blog.author)),
			author => ({author: author[0], blogs: author.length})
		),
		"blogs"
	);
	return topBlog;
}

function mostLikes(blogs) {
	const topBlog = _.maxBy(
		_.map(
			_.groupBy(blogs, "author"),
			author => {
				return {
					author: author[0].author,
					likes: _.sumBy(author, "likes")
				};
			}
		),
		"likes"
	);
	return topBlog;
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
};
