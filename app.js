const express = require("express");
const path = require("path");

const indexRouter = require("./routes/indexRouter");
const sellRouter = require("./routes/sellRouter");

const app = express();

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
app.use("/sell", sellRouter)

app.use((req, res, next) => {
  res.status(404).render("404", {
    title: "Page not found!", 
    text: "Try returning to the home page..."
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Start server on PORT: " + PORT)
})