const inputs = {
  siteSelect: document.querySelector("#site-select"),
  speciesGoal: document.querySelector("#species-goal"),
  slope: document.querySelector("#slope"),
  aspect: document.querySelector("#aspect"),
  rainfall: document.querySelector("#rainfall"),
  soilDepth: document.querySelector("#soil-depth"),
  erosion: document.querySelector("#erosion"),
  roadDistance: document.querySelector("#road-distance"),
  wTopography: document.querySelector("#w-topography"),
  wClimate: document.querySelector("#w-climate"),
  wSoil: document.querySelector("#w-soil"),
  wAccess: document.querySelector("#w-access")
};

const elements = {
  heroScore: document.querySelector("#hero-score"),
  heroSummary: document.querySelector("#hero-summary"),
  highCount: document.querySelector("#high-count"),
  avgScore: document.querySelector("#avg-score"),
  prioritySpecies: document.querySelector("#priority-species"),
  executiveGrid: document.querySelector("#executive-grid"),
  resultTitle: document.querySelector("#result-title"),
  scoreValue: document.querySelector("#score-value"),
  classValue: document.querySelector("#class-value"),
  scoreRing: document.querySelector("#score-ring"),
  recommendation: document.querySelector("#recommendation"),
  factorList: document.querySelector("#factor-list"),
  speciesList: document.querySelector("#species-list"),
  siteTable: document.querySelector("#site-table"),
  reportPreview: document.querySelector("#report-preview")
};

const fallbackSites = [
  {
    id: "ankara-kizilcahamam",
    name: "Kızılcahamam Rehabilitasyon Sahası",
    district: "Ankara / Kızılcahamam",
    macroRegion: "İç Anadolu geçişi",
    slope: 18,
    aspect: 92,
    rainfall: 520,
    soilDepth: 68,
    erosion: 66,
    roadDistance: 4.2,
    vegetation: "Bozuk orman ve açıklık mozaiği",
    pressure: "Orta erozyon baskısı",
    geometry: [[[32.35, 40.33], [32.58, 40.36], [32.64, 40.18], [32.42, 40.1], [32.35, 40.33]]]
  },
  {
    id: "konya-karapinar",
    name: "Karapınar Rüzgâr Erozyonu Kuşağı",
    district: "Konya / Karapınar",
    macroRegion: "Kurak iç havza",
    slope: 6,
    aspect: 76,
    rainfall: 330,
    soilDepth: 42,
    erosion: 34,
    roadDistance: 2.6,
    vegetation: "Seyrek step ve açık alan",
    pressure: "Yüksek rüzgâr erozyonu",
    geometry: [[[33.18, 37.86], [33.52, 37.9], [33.58, 37.63], [33.26, 37.56], [33.18, 37.86]]]
  },
  {
    id: "mugla-mentese",
    name: "Menteşe Kızılçam Tamamlama Sahası",
    district: "Muğla / Menteşe",
    macroRegion: "Akdeniz kıyı ardı",
    slope: 24,
    aspect: 58,
    rainfall: 760,
    soilDepth: 82,
    erosion: 66,
    roadDistance: 5.8,
    vegetation: "Kızılçam, maki ve bozuk orman",
    pressure: "Yangın sonrası tamamlama ihtiyacı",
    geometry: [[[28.18, 37.18], [28.5, 37.2], [28.58, 36.98], [28.26, 36.9], [28.18, 37.18]]]
  },
  {
    id: "erzurum-oltu",
    name: "Oltu Havza Koruma Sahası",
    district: "Erzurum / Oltu",
    macroRegion: "Doğu Anadolu",
    slope: 31,
    aspect: 92,
    rainfall: 460,
    soilDepth: 58,
    erosion: 66,
    roadDistance: 8.5,
    vegetation: "Ardıç ve sarıçam geçiş dokusu",
    pressure: "Yamaç stabilitesi ve kar yükü",
    geometry: [[[41.72, 40.72], [42.05, 40.78], [42.14, 40.54], [41.82, 40.46], [41.72, 40.72]]]
  },
  {
    id: "balikesir-edremit",
    name: "Edremit Maki Dönüşüm Sahası",
    district: "Balıkesir / Edremit",
    macroRegion: "Kuzey Ege",
    slope: 21,
    aspect: 76,
    rainfall: 690,
    soilDepth: 74,
    erosion: 90,
    roadDistance: 3.1,
    vegetation: "Maki ve bozuk kızılçam",
    pressure: "Turizm ve yerleşim baskısı",
    geometry: [[[26.82, 39.72], [27.12, 39.76], [27.18, 39.52], [26.9, 39.46], [26.82, 39.72]]]
  },
  {
    id: "mersin-mut",
    name: "Mut Mikro Havza Ağaçlandırma Sahası",
    district: "Mersin / Mut",
    macroRegion: "Toros geçişi",
    slope: 28,
    aspect: 42,
    rainfall: 540,
    soilDepth: 61,
    erosion: 34,
    roadDistance: 6.4,
    vegetation: "Kuru çalılık ve açıklık alan",
    pressure: "Yüksek yaz kuraklığı",
    geometry: [[[33.2, 36.82], [33.54, 36.88], [33.62, 36.62], [33.28, 36.54], [33.2, 36.82]]]
  }
];

const speciesCatalog = {
  resilience: [
    { name: "Kızılçam", note: "Kurak ve sıcak Akdeniz geçişlerinde hızlı tutunma sağlar.", minRain: 350 },
    { name: "Ardıç", note: "Sığ toprak ve erozyon baskısı olan yamaçlarda dayanıklıdır.", minRain: 280 },
    { name: "Badem", note: "Kurak mikro havzalarda ekonomik ve ekolojik tampon tür olabilir.", minRain: 300 }
  ],
  soil: [
    { name: "Sedir", note: "Eğimli sahalarda kök sistemiyle toprak stabilitesine katkı verir.", minRain: 450 },
    { name: "Karaçam", note: "İç kesimlerde erozyon kontrolü ve kapalı örtü oluşturma için uygundur.", minRain: 420 },
    { name: "Meşe", note: "Karışık tesislerde biyolojik çeşitlilik ve toprak gelişimini destekler.", minRain: 380 }
  ],
  production: [
    { name: "Ceviz", note: "Derin toprak ve yeterli yağış olan sahalarda gelir getirici türdür.", minRain: 550 },
    { name: "Kestane", note: "Nemli ve derin topraklarda üretim odaklı değerlendirilir.", minRain: 700 },
    { name: "Fıstık çamı", note: "Kıyı ve geçiş kuşaklarında ekonomik ormancılık potansiyeli taşır.", minRain: 450 }
  ]
};

let sites = fallbackSites;
let activeSiteId = fallbackSites[0].id;
let map;
let siteLayer;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeSlope(value) {
  if (value <= 10) return 94;
  if (value <= 28) return 94 - (value - 10) * 1.9;
  return clamp(58 - (value - 28) * 2.1, 12, 58);
}

function normalizeRainfall(value) {
  const distanceFromIdeal = Math.abs(value - 650);
  return clamp(100 - distanceFromIdeal / 7.5, 18, 98);
}

function normalizeSoil(value) {
  return clamp((value / 110) * 100, 18, 98);
}

function normalizeAccess(value) {
  return clamp(100 - value * 4, 16, 100);
}

function classify(score) {
  if (score >= 76) return { label: "Yüksek uygunluk", tone: "high", color: "#6f9b64" };
  if (score >= 58) return { label: "Koşullu uygun", tone: "medium", color: "#8aa35b" };
  return { label: "Düşük uygunluk", tone: "low", color: "#b67a49" };
}

function calculateSite(site) {
  const factors = {
    Topografya: Math.round((normalizeSlope(site.slope) + Number(site.aspect)) / 2),
    İklim: Math.round(normalizeRainfall(site.rainfall)),
    Toprak: Math.round((normalizeSoil(site.soilDepth) + Number(site.erosion)) / 2),
    Erişim: Math.round(normalizeAccess(site.roadDistance))
  };
  const weights = {
    Topografya: Number(inputs.wTopography.value),
    İklim: Number(inputs.wClimate.value),
    Toprak: Number(inputs.wSoil.value),
    Erişim: Number(inputs.wAccess.value)
  };
  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0);
  const score = Math.round(Object.entries(factors).reduce((sum, [key, value]) => sum + value * weights[key], 0) / totalWeight);
  return { ...site, factors, weights, score, classInfo: classify(score) };
}

function getActiveInputSite() {
  const base = sites.find((site) => site.id === activeSiteId) ?? sites[0];
  return {
    ...base,
    slope: Number(inputs.slope.value),
    aspect: Number(inputs.aspect.value),
    rainfall: Number(inputs.rainfall.value),
    soilDepth: Number(inputs.soilDepth.value),
    erosion: Number(inputs.erosion.value),
    roadDistance: Number(inputs.roadDistance.value)
  };
}

function getCalculatedSites() {
  return sites.map((site) => calculateSite(site)).sort((a, b) => b.score - a.score);
}

function getRecommendedSpecies(site) {
  const catalog = speciesCatalog[inputs.speciesGoal.value];
  return catalog
    .map((species) => ({
      ...species,
      fit: clamp(site.rainfall - species.minRain + site.soilDepth * 0.4 - site.slope * 0.5, 0, 100)
    }))
    .sort((a, b) => b.fit - a.fit);
}

function populateSiteSelect() {
  inputs.siteSelect.innerHTML = sites.map((site) => `<option value="${site.id}">${site.name}</option>`).join("");
  inputs.siteSelect.value = activeSiteId;
}

function syncInputsFromSite(site) {
  inputs.slope.value = site.slope;
  inputs.aspect.value = site.aspect;
  inputs.rainfall.value = site.rainfall;
  inputs.soilDepth.value = site.soilDepth;
  inputs.erosion.value = site.erosion;
  inputs.roadDistance.value = site.roadDistance;
}

function renderHero(active, calculatedSites) {
  const highCount = calculatedSites.filter((site) => site.classInfo.tone === "high").length;
  const avg = Math.round(calculatedSites.reduce((sum, site) => sum + site.score, 0) / calculatedSites.length);
  const species = getRecommendedSpecies(active)[0];
  elements.heroScore.textContent = active.score;
  elements.heroSummary.textContent = `${active.name}, ${active.classInfo.label.toLowerCase()} sınıfında değerlendiriliyor. Ana baskı: ${active.pressure}.`;
  elements.highCount.textContent = highCount;
  elements.avgScore.textContent = avg;
  elements.prioritySpecies.textContent = species?.name ?? "-";
}

function renderExecutive(active, calculatedSites) {
  const best = calculatedSites[0];
  const conditional = calculatedSites.filter((site) => site.classInfo.tone === "medium").length;
  elements.executiveGrid.innerHTML = `
    <article class="executive-card"><span class="eyebrow">Seçili saha</span><strong>${active.score}/100</strong><p>${active.classInfo.label} · ${active.district}</p></article>
    <article class="executive-card"><span class="eyebrow">En güçlü aday</span><strong>${best.name.split(" ")[0]}</strong><p>${best.score}/100 skor ile ilk uygulama havuzu için öne çıkıyor.</p></article>
    <article class="executive-card"><span class="eyebrow">Koşullu saha</span><strong>${conditional}</strong><p>Erozyon kontrolü ve tür seçimiyle geliştirilebilir aday sayısı.</p></article>
    <article class="executive-card"><span class="eyebrow">Önerilen tür</span><strong>${getRecommendedSpecies(active)[0]?.name ?? "-"}</strong><p>Hedef tür grubuna göre en uyumlu öneri.</p></article>
  `;
}

function renderScore(active) {
  const degrees = Math.round(active.score * 3.6);
  elements.resultTitle.textContent = active.name;
  elements.scoreValue.textContent = active.score;
  elements.classValue.textContent = active.classInfo.label;
  elements.scoreRing.style.background = `conic-gradient(${active.classInfo.color} ${degrees}deg, #dce8d5 0deg)`;
  elements.recommendation.textContent =
    active.classInfo.tone === "high"
      ? "Saha öncelikli ağaçlandırma programına alınabilir. Toprak hazırlığı, fidan tür karışımı ve bakım planı birlikte hazırlanmalıdır."
      : active.classInfo.tone === "medium"
        ? "Saha koşullu uygundur. Erozyon azaltma, mikro havza düzenlemesi ve dayanıklı tür seçimiyle skor yükseltilebilir."
        : "Saha düşük uygunluk göstermektedir. Önce toprak iyileştirme, erozyon kontrolü ve alternatif arazi kullanım senaryoları incelenmelidir.";
  elements.factorList.innerHTML = Object.entries(active.factors)
    .map(([name, value]) => `<article class="factor"><span>${name}</span><div class="bar"><span style="width:${value}%"></span></div><strong>${value}</strong></article>`)
    .join("");
}

function renderSpecies(active) {
  elements.speciesList.innerHTML = getRecommendedSpecies(active)
    .map((species, index) => `
      <article class="species-card">
        <span class="eyebrow">${index + 1}. öneri · uyum ${Math.round(species.fit)}/100</span>
        <strong>${species.name}</strong>
        <p>${species.note}</p>
      </article>
    `)
    .join("");
}

function renderTable(calculatedSites) {
  elements.siteTable.innerHTML = calculatedSites
    .map((site) => `
      <article>
        <div><span class="table-head">Saha</span><strong>${site.name}</strong></div>
        <div><span class="table-head">İlçe</span><span>${site.district}</span></div>
        <div><span class="table-head">Skor</span><strong>${site.score}/100</strong></div>
        <div><span class="table-head">Sınıf</span><span class="badge ${site.classInfo.tone}">${site.classInfo.label.split(" ")[0]}</span></div>
        <div><span class="table-head">Baskı</span><span>${site.pressure}</span></div>
      </article>
    `)
    .join("");
}

function renderReport(active) {
  const species = getRecommendedSpecies(active)[0];
  elements.reportPreview.innerHTML = `
    <strong>${active.name} için uygulama değerlendirmesi</strong>
    <p>${active.district} hattında yer alan saha ${active.score}/100 uygunluk skoru ile ${active.classInfo.label.toLowerCase()} sınıfındadır.</p>
    <div class="report-grid">
      <article class="report-row"><span>Makro bölge</span><strong>${active.macroRegion}</strong></article>
      <article class="report-row"><span>Yağış</span><strong>${active.rainfall} mm</strong></article>
      <article class="report-row"><span>Toprak</span><strong>${active.soilDepth} cm</strong></article>
      <article class="report-row"><span>Önerilen tür</span><strong>${species?.name ?? "-"}</strong></article>
    </div>
  `;
}

function renderMap(calculatedSites) {
  if (!map || !window.L) return;
  if (siteLayer) siteLayer.remove();
  siteLayer = L.geoJSON(
    {
      type: "FeatureCollection",
      features: calculatedSites.map((site) => ({
        type: "Feature",
        properties: site,
        geometry: { type: "Polygon", coordinates: site.geometry }
      }))
    },
    {
      style: (feature) => ({
        color: feature.properties.classInfo.color,
        weight: feature.properties.id === activeSiteId ? 4 : 2,
        fillColor: feature.properties.classInfo.color,
        fillOpacity: feature.properties.id === activeSiteId ? 0.46 : 0.28
      }),
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`<strong>${feature.properties.name}</strong><br>${feature.properties.score}/100 · ${feature.properties.classInfo.label}`);
        layer.on("click", () => {
          activeSiteId = feature.properties.id;
          inputs.siteSelect.value = activeSiteId;
          syncInputsFromSite(sites.find((site) => site.id === activeSiteId));
          renderAll();
        });
      }
    }
  ).addTo(map);
}

function createMap() {
  if (!window.L) return;
  map = L.map("leaflet-map", { scrollWheelZoom: false }).setView([38.7, 33.2], 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);
}

function renderAll() {
  const active = calculateSite(getActiveInputSite());
  const calculatedSites = getCalculatedSites();
  renderHero(active, calculatedSites);
  renderExecutive(active, calculatedSites);
  renderScore(active);
  renderSpecies(active);
  renderTable(calculatedSites);
  renderReport(active);
  renderMap(calculatedSites);
}

document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.jump)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

Object.values(inputs).forEach((input) => {
  input.addEventListener("input", () => {
    if (input === inputs.siteSelect) {
      activeSiteId = input.value;
      syncInputsFromSite(sites.find((site) => site.id === activeSiteId));
    }
    renderAll();
  });
});

async function init() {
  try {
    const response = await fetch("data/afforestation-sites.geojson");
    const geojson = await response.json();
    sites = geojson.features.map((feature) => ({ ...feature.properties, geometry: feature.geometry.coordinates }));
  } catch (error) {
    console.warn("Yerel saha verisi yüklenemedi, yedek veri kullanılıyor.", error);
  }
  populateSiteSelect();
  syncInputsFromSite(sites[0]);
  createMap();
  renderAll();
}

init();
