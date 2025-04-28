const db = require("../db/quaries");

function searchCategory(gun) {
  const rifle = [
    "Ak-47", 
    "AUG", 
    "FAMAS",  
    "Galil AR",
    "M4A1-S",
    "M4A4",
    "SG 553",
  ];

  const sniperRifle = [
    "AWP",
    "G3SG1",
    "SCAR-20",
    "SSG 08"
  ];

  const pistols = [
    "CZ75-Auto",
    "Desert Eagle",
    "Dual Berettas",
    "Five-SeveN",
    "Glock-18",
    "P2000",
    "P250",
    "R8 Revolver",
    "Tec-9",
    "USP-S",
    "Zeus X27"
  ];
  
  const shotgun = [
    "MAG-7",
    "Nova",
    "Sawed-Off",
    "XM1014"
  ];

  const smg = [
    "MAC-10",
    "MP5-SD",
    "MP7",
    "MP9",
    "P90",
    "PP-Bizon",
    "UMP-45"
  ];

  const knife = ["Knife"];
  const gloves = ["Gloves"];
  const stickers = ["Stickers"];

  const machinegun = [
    "M249",
    "Negev",
  ];

  const container = [
    "Case",
    "Sticker Capsule",
    "Graffiti Box",
  ];

  const other = [
    "Music Kits",
    "Name Tags",
    "Agent",
    "Graffiti",
    "Pass",
    "Pathes"
  ];

  if (rifle.includes(gun)) {
    return "Rifles";
  } else if (pistols.includes(gun)) {
    return "Pistols";
  } else if (shotgun.includes(gun)) {
    return "Shotguns";
  } else if (sniperRifle.includes(gun)) {
    return "Sniper Rifles";
  } else if (smg.includes(gun)) {
    return "SMG";
  } else if (machinegun.includes(gun)) {
    return "Machineguns";
  } else if (container.includes(gun)) {
    return "Containers";
  } else if (other.includes(gun)) {
    return "Others";
  } else if (knife.includes(gun)) {
    return "Knifes";
  } else if (gloves.includes(gun)) {
    return "Gloves";
  } else if (stickers.includes(gun)) {
    return "Stickers";
  }

  return null;
}

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
    const { name, gun, cost, rarity, quality } = req.body;
    const imgURL = `public/uploads/${req.file.filename}`;

    const category = searchCategory(gun);

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