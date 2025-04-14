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

module.exports = {
  indexRouterGet
}