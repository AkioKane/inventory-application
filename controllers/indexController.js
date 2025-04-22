const db = require("../db/quaries");

async function getItems(req, res) {
  const items = await db.getAllItems();
  return items;
}

async function indexRouterGet(req, res, next) {
  try {
    const arr = await getItems();
    res.render("index", {title: "Home", items: arr});
  } catch (err) {
    next(err);
  }
}

async function sellRouterPost(req, res, next) {
  try {
    const { name, gun, cost, category, rarity, quality } = req.body;
    const imgURL = `public/uploads/${req.file.filename}`;

    await db.insertItem(name, gun, cost, category, rarity, quality, imgURL)

    res.redirect("/")
  } catch (err) {
    next(err);
  }
}

module.exports = {
  indexRouterGet,
  sellRouterPost
}