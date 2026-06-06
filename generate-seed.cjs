const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "src", "utils", "mockData.js");
const outputPath = path.join(__dirname, "robopulse-seed-data.json");

let code = fs.readFileSync(inputPath, "utf8");

code = code
  .replace(/export const ROBOTS = /g, "const ROBOTS = ")
  .replace(/export const REVIEWS = /g, "const REVIEWS = ")
  .replace(/export const NEWS = /g, "const NEWS = ")
  .replace(/export const PRICE_TRACKER = /g, "const PRICE_TRACKER = ")
  .replace(/export const CATEGORIES = /g, "const CATEGORIES = ")
  .replace(/export const GUIDES = /g, "const GUIDES = ")
  .replace(/export const TICKER_ITEMS = /g, "const TICKER_ITEMS = ")
  .replace(/export const SCORE_METRICS = /g, "const SCORE_METRICS = ");

const sandbox = {};

const wrapper = `
${code}

sandbox.ROBOTS = ROBOTS;
sandbox.REVIEWS = REVIEWS;
sandbox.NEWS = NEWS;
sandbox.GUIDES = GUIDES;
`;

const fn = new Function("sandbox", wrapper);
fn(sandbox);

const seedData = {
  robots: sandbox.ROBOTS,
  reviews: sandbox.REVIEWS,
  news: sandbox.NEWS,
  guides: sandbox.GUIDES,
};

fs.writeFileSync(outputPath, JSON.stringify(seedData, null, 2), "utf8");

console.log("robopulse-seed-data.json generated successfully.");
console.log(`Robots: ${seedData.robots.length}`);
console.log(`Reviews: ${seedData.reviews.length}`);
console.log(`News: ${seedData.news.length}`);
console.log(`Guides: ${seedData.guides.length}`);