const express = require("express");
const path = require("path");

const app = express();

const indexRouter = require("./routes/indexRouter");

const assetsPathPublic = path.join(__dirname, "public");
const assetsPathAssets = path.join(__dirname, "assets");
const assetsPathFonts = path.join(__dirname, "fonts")

app.use("/public", express.static(assetsPathPublic));
app.use("/assets", express.static(assetsPathAssets));
app.use("/fonts", express.static(assetsPathFonts));

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Start server on PORT: " + PORT)
})