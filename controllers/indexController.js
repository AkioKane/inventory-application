const db = require("../db/quaries");

async function getItems(req, res) {
  const items = await db.getAllItems();
  // console.log("Items: ", items);
  return items;
}

async function indexRouterGet(req, res, next) {
  try {
    const arr = await getItems();

    if (Object.keys(req.query).length > 0) {
      let search;
      if (req.query.quality) {
        search = await db.searchItem({ quality: req.query.quality });
      } else if (req.query.category) {
        search = await db.searchItem({ category: req.query.category });
      } else if (req.query.rarity) {
        search = await db.searchItem({ rarity: req.query.rarity });
      } else if (req.query.name) {
        search = await db.searchItem(req.query.name);
      }

      if(req.query.delete) {
        if (req.query.delete <= 4) {
          return res.redirect("/");
        }
        
        await db.deleteItem(req.query.delete);
        return res.redirect("/");
      }

      await res.render("index", {title: "Home", items: search});
    } else {
      await res.render("index", {title: "Home", items: arr});
    }
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