require("dotenv").config()
if (process.env.MONGO_PASS)
	console.log(process.env.MONGO_PASS);
else
	console.log("MONGO_PASS is not set");
	process.exit(1);
