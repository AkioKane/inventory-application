const db = require("../db/quaries");

async function getItems(req, res) {
  const items = await db.getAllItems();
  console.log("Items: ", items)
  return items
}

async function indexRouterGet(req, res) {
  const arr = await getItems();
  res.render("index", {title: "Home", items: arr})
}

module.exports = {
  indexRouterGet
}