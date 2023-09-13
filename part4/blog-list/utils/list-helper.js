function dummy(blogs) {
	return 1;
}

function totalLikes(blogs) {
	const sum = blogs.reduce((acc, curr) => acc + curr.likes, 0);
	return sum;
}

module.exports = {
	dummy,
	totalLikes
};
