const express = require("express");
const path = require("path");

const app = express();

const indexRouter = require("./routes/indexRouter");
// const newMessageRouter = require("./routes/newMessageRouter");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use("/new", newMessageRouter);
app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Start server on PORT: " + PORT)
})