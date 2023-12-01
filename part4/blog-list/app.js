const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

mongoose.connect(config.MONGO_URL);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

app.use(middleware.errorHandler);

module.exports = app;
