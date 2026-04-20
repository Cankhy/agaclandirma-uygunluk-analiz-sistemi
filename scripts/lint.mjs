import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const files = {
  html: path.join(root, "index.html"),
  css: path.join(root, "style.css"),
  js: path.join(root, "script.js"),
  geojson: path.join(root, "data", "afforestation-sites.geojson"),
  readme: path.join(root, "README.md"),
  manifest: path.join(root, "site.webmanifest"),
  favicon: path.join(root, "assets", "favicon.svg"),
  robots: path.join(root, "robots.txt"),
  sitemap: path.join(root, "sitemap.xml")
};

let failed = false;

function read(file) {
  if (!fs.existsSync(file)) {
    failed = true;
    console.error(`FAIL Missing file: ${path.relative(root, file)}`);
    return "";
  }
  return fs.readFileSync(file, "utf8");
}

function ok(message) {
  console.log(`OK   ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`FAIL ${message}`);
}

const html = read(files.html);
const css = read(files.css);
const js = read(files.js);
const readme = read(files.readme);
const manifest = JSON.parse(read(files.manifest));
let geojson;

try {
  geojson = JSON.parse(read(files.geojson));
} catch (error) {
  fail(`GeoJSON parse error: ${error.message}`);
}

if (html.includes('id="leaflet-map"') && html.includes('id="species-list"') && html.includes('id="report-preview"')) {
  ok("HTML includes map, species recommendation, and report modules");
} else {
  fail("HTML must include map, species recommendation, and report modules");
}

if (html.includes("<link rel=\"canonical\"") && html.includes("<link rel=\"icon\"") && html.includes("<link rel=\"manifest\"")) {
  ok("HTML includes publishing metadata");
} else {
  fail("HTML must include canonical, favicon, and manifest metadata");
}

if (html.includes("Ağaçlandırma") && html.includes("Uygunluk") && html.includes("Tür öneri motoru")) {
  ok("HTML Turkish copy is present");
} else {
  fail("HTML Turkish copy is missing expected phrases");
}

if (css.includes(".leaflet-map") && css.includes(".score-ring") && css.includes(".species-card")) {
  ok("CSS includes map, score, and species styles");
} else {
  fail("CSS is missing expected styles");
}

try {
  new vm.Script(js, { filename: "script.js" });
  ok("JavaScript parses successfully");
} catch (error) {
  fail(`JavaScript parse error: ${error.message}`);
}

if (geojson?.type === "FeatureCollection" && Array.isArray(geojson.features) && geojson.features.length >= 6) {
  ok("GeoJSON includes candidate afforestation sites");
} else {
  fail("GeoJSON must include at least 6 candidate sites");
}

if (js.includes('fetch("data/afforestation-sites.geojson")') && js.includes("speciesCatalog") && js.includes("calculateSite")) {
  ok("JavaScript loads local data and includes suitability logic");
} else {
  fail("JavaScript must load GeoJSON and include suitability logic");
}

if (readme.includes("Ağaçlandırma Uygunluk Analiz Sistemi") && readme.includes("npm run lint")) {
  ok("README describes the project and verification command");
} else {
  fail("README must describe the project and lint command");
}

if (manifest?.name && Array.isArray(manifest.icons) && fs.existsSync(files.favicon)) {
  ok("Manifest and favicon are present");
} else {
  fail("Manifest and favicon must be configured");
}

if (read(files.robots).includes("Allow: /") && read(files.sitemap).includes("https://cankhy.github.io/agaclandirma-uygunluk-analiz-sistemi/")) {
  ok("Robots and sitemap files are present");
} else {
  fail("Robots and sitemap files must reference the live site");
}

if (failed) process.exit(1);

console.log("Lint completed successfully.");
