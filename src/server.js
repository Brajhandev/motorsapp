require("dotenv").config();
const app = require("./app");
const { db } = require("./database/config");

db.authenticate()
  .then((res) => console.log("db auth 😀"))
  .catch((err) => console.log(err));
db.sync()
  .then((res) => console.log("db sync 😛"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Running port: ${PORT}🐱‍🏍`);
});
