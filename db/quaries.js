const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  console.log(rows);
  return rows;
}

async function insertItem(
  name,
  gun,
  cost,
  category,
  rarity,
  quality,
  imgURL
) {
  await pool.query(`
    INSERT INTO items (name, gun, cost, category, rarity, quality, imgURL)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [name, gun, cost, category, rarity, quality, imgURL]
  );
}

async function deleteItem(
  name,
  gun,
  cost,
  category,
  rarity,
  quality,
) {
  await pool.query(`
      DELETE FROM items 
      WHERE name LIKE $1
        AND gun LIKE $2
        AND cost LIKE $3
        AND category LIKE $4
        AND rarity LIKE $5
        AND quality LIKE $6;
    `,
    [name, gun, cost, category, rarity, quality]
  );
}

module.exports = {
  getAllItems,
  insertItem,
  deleteItem
};