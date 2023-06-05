const cors = require("cors");
const express = require("express");
const usersRouter = require("./routes/users.routes");
const repairRouter = require("./routes/repairs.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/repair", repairRouter);

module.exports = app;
