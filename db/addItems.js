const { name } = require("ejs");
const { Client } = require("pg");
require('dotenv').config();

const items = [
  {
    name: "Head-Shot",
    gun: "AK-47",
    cost: "641",
    category: "Rifles",
    rarity: "Covert",
    quality: "Field-Tested",
    imgURL: "/assets/ak47_headshot.png"
  },
  {
    name: "Head-Shot",
    gun: "AK-47",
    cost: "641",
    category: "Rifles",
    rarity: "Covert",
    quality: "Field-Tested",
    imgURL: "/assets/ak47_headshot.png"
  },
  {
    name: "Head-Shot",
    gun: "AK-47",
    cost: "641",
    category: "Rifles",
    rarity: "Covert",
    quality: "Field-Tested",
    imgURL: "/assets/ak47_headshot.png"
  },
  {
    name: "Head-Shot",
    gun: "AK-47",
    cost: "641",
    category: "Rifles",
    rarity: "Covert",
    quality: "Field-Tested",
    imgURL: "/assets/ak47_headshot.png"
  }
]

const SQL = `
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  gun TEXT,
  cost TEXT,
  category TEXT,
  rarity TEXT,
  quality TEXT,
  imgURL TEXT
);

INSERT INTO items (name, gun, cost, category, rarity, quality, imgURL)
VALUES
  ('${items[0].name}', '${items[0].gun}', '${items[0].cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}', '${items[0].category}', '${items[0].rarity}', '${items[0].quality}', '${items[0].imgURL}'),
  ('${items[1].name}', '${items[1].gun}', '${items[1].cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}', '${items[1].category}', '${items[1].rarity}', '${items[1].quality}', '${items[1].imgURL}'),
  ('${items[2].name}', '${items[2].gun}', '${items[2].cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}', '${items[2].category}', '${items[2].rarity}', '${items[2].quality}', '${items[2].imgURL}'),
  ('${items[3].name}', '${items[3].gun}', '${items[3].cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}', '${items[3].category}', '${items[3].rarity}', '${items[3].quality}', '${items[3].imgURL}');
`;

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