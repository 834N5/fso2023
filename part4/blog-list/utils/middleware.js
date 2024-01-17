const logger = require("./logger");

function errorHandler(error, request, response, next)
{
	logger.error(error.name);
	logger.error(error.message);

	switch (error.name) {
		case "ValidationError":
		case "TypeError":
			return response.status(400).json({error: error.message});
		case "JsonWebTokenError":
		case "TokenExpiredError":
			return response.status(401).json({error: error.message});
		default:
			return response.status(500).end();
	}
}

function tokenExtractor(request, response, next)
{
	const token = request.get("Authorization");
	if (token && token.startsWith("Bearer ")) {
		request.token = token.replace("Bearer ", "");
	}
	next();
}

module.exports = {
	errorHandler,
	tokenExtractor
};
