const express = require("express");
const logger = require("./Config/logger")
require("dotenv").config();
const app = express();
app.use(express.json());

const userRouter = require("./api/users/userRouter");

app.use("/", userRouter);

let port = process.env.PORT
app.listen(port, () => {
    logger.log('info', `Server is running on ${port} port....`)
})