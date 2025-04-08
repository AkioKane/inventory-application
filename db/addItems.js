const { Client } = require("pg");
require('dotenv').config();

const items = [
  {
    category: "Rifle",
    rarity: "Cover",
    quality: "Field-Tested",
    imgURL: "/assets/logo.png"
  },
  {
    category: "Rifle",
    rarity: "Cover",
    quality: "Field-Tested",
    imgURL: "/assets/logo.png"
  },
  {
    category: "Rifle",
    rarity: "Cover",
    quality: "Field-Tested",
    imgURL: "/assets/logo.png"
  },
  {
    category: "Rifle",
    rarity: "Cover",
    quality: "Field-Tested",
    imgURL: "/assets/logo.png"
  }
]

const SQL = `
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category TEXT,
  rarity TEXT,
  quality TEXT,
  imgURL TEXT
);

INSERT INTO items (category, rarity, quality, imgURL)
VALUES
  ('${items[0].category}', '${items[0].rarity}', '${items[0].quality}', '${items[0].imgURL}'),
  ('${items[1].category}', '${items[1].rarity}', '${items[1].quality}', '${items[1].imgURL}'),
  ('${items[2].category}', '${items[2].rarity}', '${items[2].quality}', '${items[2].imgURL}'),
  ('${items[3].category}', '${items[3].rarity}', '${items[3].quality}', '${items[3].imgURL}');
`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();