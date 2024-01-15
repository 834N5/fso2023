const logger = require("./logger");

function errorHandler(error, request, response, next)
{
	logger.error(error.name);
	logger.error(error.message);

	switch (error.name) {
		case "ValidationError":
		case "TypeError":
			return response.status(400).json({error: error.message});
			break;
		default:
			return response.status(500).end();
	}
}

module.exports = {
	errorHandler
};
