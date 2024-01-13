const logger = require("./logger");

function errorHandler(error, request, response, next)
{
	logger.error(error.name);
	logger.error(error.message);
	if (error.name === "ValidationError")
		return response.status(400).json({error: error.message});
	else
		return response.status(500).end();
}

module.exports = {
	errorHandler
};
