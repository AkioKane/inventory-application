const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
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

async function searchItem({
  name=null,
  category=null,
  rarity=null,
  quality=null
}) {
  let query = 'SELECT * FROM items';
  let value;
  let condition;

  if (name) {
    condition = 'name ILIKE $1';
    value = name;
  } else if (category) {
    condition = 'category ILIKE $1';
    value = category;
  } else if (rarity) {
    condition = 'rarity ILIKE $1';
    value = rarity;
  } else if (quality) {
    condition = 'quality ILIKE $1';
    value = quality;
  } else {
    return [];
  }

  query += ` WHERE ${condition}`;
  const result = await pool.query(query, [value]);
  return result.rows;
}

async function deleteItem(id) {
  await pool.query(`
      DELETE FROM items 
      WHERE id=$1;
    `, [id]
  );
}

module.exports = {
  getAllItems,
  insertItem,
  deleteItem,
  searchItem
};