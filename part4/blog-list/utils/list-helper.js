function dummy(blogs) {
	return 1;
}

function totalLikes(blogs) {
	const sum = blogs.reduce((acc, curr) => acc + curr.likes, 0);
	return sum;
}

function favoriteBlog(blogs) {
	if (blogs.length === 0)
		return null;
	let topBlog = blogs[0];
	blogs.forEach(blog => {
		if (topBlog.likes < blog.likes)
			topBlog = blog;
	});
	return topBlog;
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
};
