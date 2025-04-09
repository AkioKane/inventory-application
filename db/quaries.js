const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  console.log(rows);
  return rows;
}

async function insertItem(
  category,
  rarity,
  quality,
  imgURL
) {
  await pool.query(`
    INSERT INTO items (category, rarity, quality, imgURL)
    VALUES ($1, $2, $3, $4)`,
    [category, rarity, quality, imgURL]
  );
}

module.exports = {
  getAllItems,
  insertItem
};