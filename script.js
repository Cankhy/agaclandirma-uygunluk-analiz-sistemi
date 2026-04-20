const inputs = {
  scenarioSelect: document.querySelector("#scenario-select"),
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
  totalSites: document.querySelector("#total-sites"),
  highCount: document.querySelector("#high-count"),
  avgScore: document.querySelector("#avg-score"),
  prioritySpecies: document.querySelector("#priority-species"),
  riskCount: document.querySelector("#risk-count"),
  liveDataGrid: document.querySelector("#live-data-grid"),
  ogmGrid: document.querySelector("#ogm-grid"),
  executiveGrid: document.querySelector("#executive-grid"),
  resultTitle: document.querySelector("#result-title"),
  scoreValue: document.querySelector("#score-value"),
  classValue: document.querySelector("#class-value"),
  scoreRing: document.querySelector("#score-ring"),
  recommendation: document.querySelector("#recommendation"),
  factorList: document.querySelector("#factor-list"),
  speciesList: document.querySelector("#species-list"),
  siteTable: document.querySelector("#site-table"),
  costGrid: document.querySelector("#cost-grid"),
  timelineList: document.querySelector("#timeline-list"),
  compareGrid: document.querySelector("#compare-grid"),
  scenarioGrid: document.querySelector("#scenario-grid"),
  qualityGrid: document.querySelector("#quality-grid"),
  reportPreview: document.querySelector("#report-preview"),
  downloadReport: document.querySelector("#download-report"),
  downloadPdf: document.querySelector("#download-pdf"),
  printReport: document.querySelector("#print-report")
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
let activeLayer = "suitability";
let liveWeatherBySite = {};
let soilDataBySite = {};
let liveDataState = { weather: "loading", soil: "waiting", updatedAt: null };
let ogmForestAssets = [];

const scenarioConfig = {
  normal: { label: "Normal yıl", rainfall: 0, score: 0, note: "Uzun dönem ortalamalarına yakın saha koşulları." },
  dry: { label: "Kurak yıl", rainfall: -90, score: -7, note: "Kuraklık baskısı tür seçimini ve bakım ihtiyacını artırır." },
  wet: { label: "Yüksek yağış yılı", rainfall: 80, score: 4, note: "Nem avantajı tutunmayı artırır; erozyon kontrolü ayrıca izlenir." }
};

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
  if (score >= 76) return { label: "Yüksek uygunluk", tone: "high", color: "#2f80ed" };
  if (score >= 58) return { label: "Koşullu uygun", tone: "medium", color: "#64748b" };
  return { label: "Düşük uygunluk", tone: "low", color: "#b86b35" };
}

function applyScenario(site) {
  const scenario = scenarioConfig[inputs.scenarioSelect.value] ?? scenarioConfig.normal;
  return {
    ...site,
    rainfall: clamp(Number(site.rainfall) + scenario.rainfall, 150, 1600),
    scenarioScoreBoost: scenario.score,
    scenarioLabel: scenario.label,
    scenarioNote: scenario.note
  };
}

function getSiteCentroid(site) {
  const ring = site.geometry?.[0] ?? [];
  const totals = ring.reduce((sum, point) => ({ lon: sum.lon + point[0], lat: sum.lat + point[1] }), { lon: 0, lat: 0 });
  return {
    lon: totals.lon / Math.max(ring.length, 1),
    lat: totals.lat / Math.max(ring.length, 1)
  };
}

async function cachedJson(url, cacheKey, ttlMinutes = 60) {
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.timestamp < ttlMinutes * 60 * 1000) return parsed.value;
  }
  const response = await fetch(url);
  const value = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), value }));
  return value;
}

function getWeatherAdjustment(site) {
  const weather = liveWeatherBySite[site.id];
  if (!weather) return 0;
  const heatPenalty = weather.temperature >= 34 ? -3 : weather.temperature >= 30 ? -1 : 0;
  const humidityPenalty = weather.humidity <= 25 ? -3 : weather.humidity <= 35 ? -1 : 0;
  const rainBoost = weather.precipitation >= 1 ? 2 : 0;
  return heatPenalty + humidityPenalty + rainBoost;
}

function calculateSite(site) {
  const scenarioSite = applyScenario(site);
  const factors = {
    Topografya: Math.round((normalizeSlope(scenarioSite.slope) + Number(scenarioSite.aspect)) / 2),
    İklim: Math.round(normalizeRainfall(scenarioSite.rainfall)),
    Toprak: Math.round((normalizeSoil(scenarioSite.soilDepth) + Number(scenarioSite.erosion)) / 2),
    Erişim: Math.round(normalizeAccess(scenarioSite.roadDistance))
  };
  const weights = {
    Topografya: Number(inputs.wTopography.value),
    İklim: Number(inputs.wClimate.value),
    Toprak: Number(inputs.wSoil.value),
    Erişim: Number(inputs.wAccess.value)
  };
  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0);
  const weightedScore = Math.round(Object.entries(factors).reduce((sum, [key, value]) => sum + value * weights[key], 0) / totalWeight);
  const score = clamp(weightedScore + scenarioSite.scenarioScoreBoost + getWeatherAdjustment(scenarioSite), 18, 98);
  return { ...scenarioSite, factors, weights, score, classInfo: classify(score) };
}

function calculateSiteForScenario(site, scenarioKey) {
  const scenario = scenarioConfig[scenarioKey] ?? scenarioConfig.normal;
  const scenarioSite = {
    ...site,
    rainfall: clamp(Number(site.rainfall) + scenario.rainfall, 150, 1600),
    scenarioScoreBoost: scenario.score,
    scenarioLabel: scenario.label,
    scenarioNote: scenario.note
  };
  const factors = {
    Topografya: Math.round((normalizeSlope(scenarioSite.slope) + Number(scenarioSite.aspect)) / 2),
    İklim: Math.round(normalizeRainfall(scenarioSite.rainfall)),
    Toprak: Math.round((normalizeSoil(scenarioSite.soilDepth) + Number(scenarioSite.erosion)) / 2),
    Erişim: Math.round(normalizeAccess(scenarioSite.roadDistance))
  };
  const weights = {
    Topografya: Number(inputs.wTopography.value),
    İklim: Number(inputs.wClimate.value),
    Toprak: Number(inputs.wSoil.value),
    Erişim: Number(inputs.wAccess.value)
  };
  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0);
  const weightedScore = Math.round(Object.entries(factors).reduce((sum, [key, value]) => sum + value * weights[key], 0) / totalWeight);
  const score = clamp(weightedScore + scenario.score + getWeatherAdjustment(scenarioSite), 18, 98);
  return { ...scenarioSite, factors, weights, score, classInfo: classify(score), scenarioKey };
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
  const riskCount = calculatedSites.filter((site) => site.score < 58 || Number(site.erosion) < 50).length;
  const avg = Math.round(calculatedSites.reduce((sum, site) => sum + site.score, 0) / calculatedSites.length);
  const species = getRecommendedSpecies(active)[0];
  elements.heroScore.textContent = active.score;
  elements.heroSummary.textContent = `${active.name}, ${active.classInfo.label.toLowerCase()} sınıfında değerlendiriliyor. ${active.scenarioLabel} senaryosu aktif. Ana baskı: ${active.pressure}.`;
  elements.totalSites.textContent = calculatedSites.length;
  elements.highCount.textContent = highCount;
  elements.avgScore.textContent = avg;
  elements.prioritySpecies.textContent = species?.name ?? "-";
  elements.riskCount.textContent = riskCount;
}

function renderLiveData(active) {
  const weather = liveWeatherBySite[active.id];
  const soil = soilDataBySite[active.id];
  const updatedAt = liveDataState.updatedAt
    ? new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit" }).format(liveDataState.updatedAt)
    : "bekleniyor";
  elements.liveDataGrid.innerHTML = `
    <article class="live-data-card"><span class="table-head">Hava verisi</span><strong>${weather ? `${weather.temperature}°C` : "Bekleniyor"}</strong><p>${weather ? `%${weather.humidity} nem · ${weather.precipitation} mm yağış · ${weather.wind} km/sa rüzgâr` : "Open-Meteo bağlantısı kuruluyor."}</p></article>
    <article class="live-data-card"><span class="table-head">Toprak tahmini</span><strong>${soil ? `pH ${soil.ph}` : "Bekleniyor"}</strong><p>${soil ? `Kil ${soil.clay} g/kg · kum ${soil.sand} g/kg · organik karbon ${soil.soc} dg/kg` : "Aktif saha için SoilGrids sorgusu hazırlanıyor."}</p></article>
    <article class="live-data-card"><span class="table-head">Güncelleme</span><strong>${updatedAt}</strong><p>Canlı değerler erişilemezse yerel GeoJSON modeli güvenli yedek olarak kullanılır.</p></article>
  `;
}

function renderOgmAssets() {
  if (!elements.ogmGrid) return;
  if (!ogmForestAssets.length) {
    elements.ogmGrid.innerHTML = "<p>OGM açık veri referansı yükleniyor.</p>";
    return;
  }
  elements.ogmGrid.innerHTML = ogmForestAssets.map((record) => {
    const degradedRatio = Math.round((record.degradedClosedHa / record.totalHa) * 100);
    return `
      <article class="ogm-card">
        <span class="table-head">${record.region}</span>
        <strong>${record.totalHa.toLocaleString("tr-TR")} ha</strong>
        <p>Normal kapalı: ${record.normalClosedHa.toLocaleString("tr-TR")} ha · Boşluklu kapalı: ${record.degradedClosedHa.toLocaleString("tr-TR")} ha</p>
        <p>Rehabilitasyon önceliği için boşluklu kapalı oranı: %${degradedRatio}</p>
        <a href="${record.sourceUrl}" target="_blank" rel="noreferrer">OGM kaynağı</a>
      </article>
    `;
  }).join("");
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
  elements.scoreRing.style.background = `conic-gradient(${active.classInfo.color} ${degrees}deg, #d7e0ec 0deg)`;
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

function getFeasibility(active) {
  const terrainDifficulty = clamp(Math.round(active.slope * 1.4 + (100 - normalizeAccess(active.roadDistance)) * 0.45), 12, 100);
  const maintenanceNeed = clamp(Math.round((100 - active.factors.İklim) * 0.48 + (100 - active.factors.Toprak) * 0.42 + (100 - Number(active.erosion)) * 0.3), 10, 100);
  const costIndex = clamp(Math.round(terrainDifficulty * 0.42 + maintenanceNeed * 0.36 + active.roadDistance * 2.2), 10, 100);
  const riskLabel = costIndex >= 70 ? "Yüksek zorluk" : costIndex >= 45 ? "Orta zorluk" : "Düşük zorluk";
  return { terrainDifficulty, maintenanceNeed, costIndex, riskLabel };
}

function getQualityAssessment(active) {
  const feasibility = getFeasibility(active);
  const hasWeather = Boolean(liveWeatherBySite[active.id]);
  const hasSoil = Boolean(soilDataBySite[active.id]);
  const hasOgm = ogmForestAssets.length >= 6;
  const sourceScore = (hasWeather ? 28 : 12) + (hasSoil ? 28 : 12) + (hasOgm ? 24 : 8) + 20;
  const survivalScore = clamp(Math.round(active.score * 0.72 + (100 - feasibility.maintenanceNeed) * 0.28), 18, 96);
  const maintenanceClass = feasibility.maintenanceNeed >= 70 ? "Yoğun bakım" : feasibility.maintenanceNeed >= 45 ? "Kontrollü bakım" : "Standart bakım";
  const auditNote = hasWeather && hasSoil && hasOgm
    ? "Canlı hava, SoilGrids ve OGM açık veri referansları birlikte okunuyor."
    : "Canlı servislerden biri beklemede; yerel GeoJSON modeli güvenli yedek olarak çalışıyor.";
  return {
    sourceScore: clamp(sourceScore, 0, 100),
    survivalScore,
    maintenanceClass,
    auditNote,
    fieldRisk: active.score >= 76 ? "Düşük saha riski" : active.score >= 58 ? "Orta saha riski" : "Yüksek saha riski"
  };
}

function renderCost(active) {
  const feasibility = getFeasibility(active);
  const weather = liveWeatherBySite[active.id];
  const liveNote = weather ? `Canlı sıcaklık ${weather.temperature}°C ve nem %${weather.humidity}.` : active.scenarioNote;
  elements.costGrid.innerHTML = `
    <article class="cost-card"><span class="table-head">Uygulama endeksi</span><strong>${feasibility.costIndex}/100</strong><p>${feasibility.riskLabel}</p></article>
    <article class="cost-card"><span class="table-head">Arazi zorluğu</span><strong>${feasibility.terrainDifficulty}/100</strong><p>Eğim ve yol erişimi birlikte hesaplandı.</p></article>
    <article class="cost-card"><span class="table-head">Bakım ihtiyacı</span><strong>${feasibility.maintenanceNeed}/100</strong><p>İklim, toprak ve erozyon baskısına göre üretildi.</p></article>
    <article class="cost-card"><span class="table-head">Öncelik kararı</span><strong>${active.score >= 76 ? "Programla" : active.score >= 58 ? "İyileştir" : "Beklet"}</strong><p>${liveNote}</p></article>
  `;
}

function renderTimeline(active) {
  const feasibility = getFeasibility(active);
  const careYear = feasibility.maintenanceNeed >= 65 ? "3 yıl yoğun bakım" : "2 yıl standart bakım";
  const erosionStep = Number(active.erosion) < 50 ? "Erozyon kırıcı teras ve yüzey örtüsü öncelikli." : "Standart toprak hazırlığı yeterli.";
  const steps = [
    ["Ön etüt", "Saha sınırı, eğim ve mevcut örtü kontrol edilir."],
    ["Toprak hazırlığı", erosionStep],
    ["Dikim penceresi", `${active.scenarioLabel} koşullarına göre tür karışımı ve dikim yoğunluğu netleştirilir.`],
    ["Bakım ve izleme", `${careYear}; tutma başarısı ve erozyon etkisi periyodik takip edilir.`]
  ];
  elements.timelineList.innerHTML = steps.map(([title, text], index) => `
    <article class="timeline-item">
      <span>${index + 1}</span>
      <div><strong>${title}</strong><p>${text}</p></div>
    </article>
  `).join("");
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

function renderCompare(calculatedSites) {
  elements.compareGrid.innerHTML = calculatedSites.slice(0, 3).map((site) => {
    const species = getRecommendedSpecies(site)[0];
    const feasibility = getFeasibility(site);
    return `
      <article class="compare-card">
        <span class="eyebrow">${site.district}</span>
        <strong>${site.name}</strong>
        <div class="compare-metrics">
          <p><span>Skor</span>${site.score}/100</p>
          <p><span>Sınıf</span>${site.classInfo.label}</p>
          <p><span>Zorluk</span>${feasibility.costIndex}/100</p>
          <p><span>Tür</span>${species?.name ?? "-"}</p>
        </div>
      </article>
    `;
  }).join("");
}

function renderScenarioComparison(active) {
  if (!elements.scenarioGrid) return;
  const baseSite = getActiveInputSite();
  const normalScore = calculateSiteForScenario(baseSite, "normal").score;
  elements.scenarioGrid.innerHTML = Object.entries(scenarioConfig).map(([key, scenario]) => {
    const result = calculateSiteForScenario(baseSite, key);
    const delta = result.score - normalScore;
    const deltaLabel = delta === 0 ? "Referans" : `${delta > 0 ? "+" : ""}${delta} puan`;
    return `
      <button class="scenario-card ${key === inputs.scenarioSelect.value ? "is-active" : ""}" type="button" data-scenario-card="${key}">
        <span class="eyebrow">${scenario.label}</span>
        <strong>${result.score}/100</strong>
        <p>${result.classInfo.label} · yağış ${result.rainfall} mm</p>
        <p>${scenario.note}</p>
        <span class="scenario-delta">${deltaLabel}</span>
        <span class="card-action">Bu senaryoyu uygula</span>
      </button>
    `;
  }).join("");
}

function renderQualityPanel(active) {
  if (!elements.qualityGrid) return;
  const quality = getQualityAssessment(active);
  const feasibility = getFeasibility(active);
  elements.qualityGrid.innerHTML = `
    <button class="quality-card" type="button" data-scroll-target="data-panel">
      <span class="eyebrow">Kaynak güveni</span>
      <strong>${quality.sourceScore}/100</strong>
      <div class="quality-meter"><span style="width:${quality.sourceScore}%"></span></div>
      <p>${quality.auditNote}</p>
      <span class="card-action">Veri kaynaklarına git</span>
    </button>
    <button class="quality-card" type="button" data-scroll-target="report-panel">
      <span class="eyebrow">Tutma başarısı</span>
      <strong>${quality.survivalScore}/100</strong>
      <div class="quality-meter"><span style="width:${quality.survivalScore}%"></span></div>
      <p>Skor ve bakım ihtiyacına göre ilk üç yıl başarı beklentisi.</p>
      <span class="card-action">Raporda incele</span>
    </button>
    <button class="quality-card" type="button" data-scroll-target="analysis-panel">
      <span class="eyebrow">Bakım sınıfı</span>
      <strong>${quality.maintenanceClass}</strong>
      <p>Bakım ihtiyacı ${feasibility.maintenanceNeed}/100. Sulama, tamamlama ve ot alma programı buna göre planlanır.</p>
      <span class="card-action">Model girdilerini değiştir</span>
    </button>
    <button class="quality-card" type="button" data-scroll-target="map-panel">
      <span class="eyebrow">Saha riski</span>
      <strong>${quality.fieldRisk}</strong>
      <p>Erozyon, erişim, toprak derinliği ve iklim duyarlılığı birlikte değerlendirilir.</p>
      <span class="card-action">Haritada gör</span>
    </button>
  `;
}

function renderReport(active) {
  const species = getRecommendedSpecies(active)[0];
  const weather = liveWeatherBySite[active.id];
  const soil = soilDataBySite[active.id];
  const quality = getQualityAssessment(active);
  elements.reportPreview.innerHTML = `
    <strong>${active.name} için uygulama değerlendirmesi</strong>
    <p>${active.district} hattında yer alan saha ${active.score}/100 uygunluk skoru ile ${active.classInfo.label.toLowerCase()} sınıfındadır.</p>
    <div class="report-grid">
      <article class="report-row"><span>Makro bölge</span><strong>${active.macroRegion}</strong></article>
      <article class="report-row"><span>Yağış</span><strong>${active.rainfall} mm</strong></article>
      <article class="report-row"><span>Toprak</span><strong>${active.soilDepth} cm</strong></article>
      <article class="report-row"><span>Önerilen tür</span><strong>${species?.name ?? "-"}</strong></article>
      <article class="report-row"><span>Canlı hava</span><strong>${weather ? `${weather.temperature}°C / %${weather.humidity}` : "Bekleniyor"}</strong></article>
      <article class="report-row"><span>SoilGrids</span><strong>${soil ? `pH ${soil.ph}` : "Bekleniyor"}</strong></article>
      <article class="report-row"><span>Kaynak güveni</span><strong>${quality.sourceScore}/100</strong></article>
      <article class="report-row"><span>Tutma başarısı</span><strong>${quality.survivalScore}/100</strong></article>
    </div>
  `;
}

function getReportText() {
  const active = calculateSite(getActiveInputSite());
  const species = getRecommendedSpecies(active);
  const quality = getQualityAssessment(active);
  const factors = Object.entries(active.factors).map(([name, value]) => `${name}: ${value}/100`).join("\n");
  const scenarioRows = Object.keys(scenarioConfig)
    .map((key) => {
      const result = calculateSiteForScenario(getActiveInputSite(), key);
      return `${result.scenarioLabel}: ${result.score}/100 - ${result.classInfo.label}`;
    })
    .join("\n");
  return [
    "Ağaçlandırma Uygunluk Analiz Sistemi",
    `Üretim zamanı: ${new Intl.DateTimeFormat("tr-TR", { dateStyle: "long", timeStyle: "short" }).format(new Date())}`,
    "",
    `Saha: ${active.name}`,
    `Konum: ${active.district}`,
    `Makro bölge: ${active.macroRegion}`,
    `Uygunluk skoru: ${active.score}/100`,
    `Sınıf: ${active.classInfo.label}`,
    `Ana baskı: ${active.pressure}`,
    "",
    "Kriter skorları:",
    factors,
    "",
    "Senaryo kıyaslaması:",
    scenarioRows,
    "",
    "Önerilen türler:",
    ...species.map((item, index) => `${index + 1}. ${item.name} - uyum ${Math.round(item.fit)}/100 - ${item.note}`),
    "",
    "Fizibilite:",
    `Uygulama zorluğu: ${getFeasibility(active).costIndex}/100`,
    `Bakım ihtiyacı: ${getFeasibility(active).maintenanceNeed}/100`,
    `Kaynak güveni: ${quality.sourceScore}/100`,
    `Tutma başarısı tahmini: ${quality.survivalScore}/100`,
    `Bakım sınıfı: ${quality.maintenanceClass}`,
    `Senaryo: ${active.scenarioLabel}`,
    `Canlı hava: ${liveWeatherBySite[active.id] ? `${liveWeatherBySite[active.id].temperature}°C, %${liveWeatherBySite[active.id].humidity} nem` : "veri bekleniyor"}`,
    `SoilGrids: ${soilDataBySite[active.id] ? `pH ${soilDataBySite[active.id].ph}, kil ${soilDataBySite[active.id].clay} g/kg` : "veri bekleniyor"}`,
    "",
    "Uygulama notu:",
    active.classInfo.tone === "high"
      ? "Saha öncelikli uygulama havuzuna alınabilir."
      : active.classInfo.tone === "medium"
        ? "Saha koşullu uygundur; iyileştirme önlemleriyle desteklenmelidir."
        : "Saha düşük uygunluk göstermektedir; ön hazırlık ve alternatif senaryolar incelenmelidir."
  ].join("\n");
}

function downloadReport() {
  const blob = new Blob([getReportText()], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "agaclandirma-uygunluk-raporu.txt";
  link.click();
  URL.revokeObjectURL(url);
}

function downloadPdfReport() {
  const JsPdf = window.jspdf?.jsPDF;
  if (!JsPdf) {
    window.print();
    return;
  }
  const active = calculateSite(getActiveInputSite());
  const quality = getQualityAssessment(active);
  const species = getRecommendedSpecies(active)[0];
  const doc = new JsPdf({ unit: "pt", format: "a4" });
  const lines = doc.splitTextToSize(getReportText(), 500);
  doc.setFillColor(23, 32, 51);
  doc.rect(0, 0, 595, 96, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Agaclandirma Uygunluk Analiz Raporu", 48, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Saha: ${active.name}`, 48, 62);
  doc.text(`Skor: ${active.score}/100 · Kaynak guveni: ${quality.sourceScore}/100 · Tur: ${species?.name ?? "-"}`, 48, 78);
  doc.setTextColor(23, 32, 51);
  doc.text(lines, 48, 126);
  doc.save("agaclandirma-uygunluk-raporu.pdf");
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
        color: getLayerColor(feature.properties),
        weight: feature.properties.id === activeSiteId ? 4 : 2,
        fillColor: getLayerColor(feature.properties),
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

function getLayerColor(site) {
  if (activeLayer === "erosion") {
    if (Number(site.erosion) < 50) return "#b86b35";
    if (Number(site.erosion) < 75) return "#64748b";
    return "#2f80ed";
  }
  if (activeLayer === "rainfall") {
    if (site.rainfall < 420) return "#b86b35";
    if (site.rainfall < 650) return "#64748b";
    return "#2f80ed";
  }
  if (activeLayer === "access") {
    if (site.roadDistance > 7) return "#b86b35";
    if (site.roadDistance > 4) return "#64748b";
    return "#2f80ed";
  }
  return site.classInfo.color;
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
  renderLiveData(active);
  renderOgmAssets();
  renderExecutive(active, calculatedSites);
  renderScore(active);
  renderCost(active);
  renderTimeline(active);
  renderSpecies(active);
  renderTable(calculatedSites);
  renderCompare(calculatedSites);
  renderScenarioComparison(active);
  renderQualityPanel(active);
  renderReport(active);
  renderMap(calculatedSites);
}

async function loadLiveWeather() {
  try {
    const centroids = sites.map((site) => getSiteCentroid(site));
    const params = new URLSearchParams({
      latitude: centroids.map((point) => point.lat.toFixed(5)).join(","),
      longitude: centroids.map((point) => point.lon.toFixed(5)).join(","),
      current: "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m",
      timezone: "Europe/Istanbul"
    });
    const payload = await cachedJson(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, "au-weather-cache", 30);
    const rows = Array.isArray(payload) ? payload : [payload];
    liveWeatherBySite = Object.fromEntries(rows.map((row, index) => [
      sites[index].id,
      {
        temperature: Math.round(row.current?.temperature_2m ?? 0),
        humidity: Math.round(row.current?.relative_humidity_2m ?? 0),
        precipitation: Number(row.current?.precipitation ?? 0),
        wind: Math.round(row.current?.wind_speed_10m ?? 0)
      }
    ]));
    liveDataState.weather = "ready";
    liveDataState.updatedAt = new Date();
  } catch (error) {
    console.warn("Open-Meteo verisi alınamadı:", error);
    liveDataState.weather = "error";
  }
}

function extractSoilValue(payload, property) {
  const layer = payload?.properties?.layers?.find((item) => item.name === property);
  return layer?.depths?.[0]?.values?.mean ?? null;
}

async function loadSoilDataForActiveSite() {
  const active = sites.find((site) => site.id === activeSiteId);
  if (!active || soilDataBySite[active.id]) return;
  liveDataState.soil = "loading";
  try {
    const centroid = getSiteCentroid(active);
    const params = new URLSearchParams({
      lon: centroid.lon.toFixed(5),
      lat: centroid.lat.toFixed(5),
      property: "phh2o,clay,sand,soc",
      depth: "0-5cm",
      value: "mean"
    });
    const payload = await cachedJson(`https://rest.isric.org/soilgrids/v2.0/properties/query?${params.toString()}`, `au-soil-cache-${active.id}`, 1440);
    soilDataBySite[active.id] = {
      ph: ((extractSoilValue(payload, "phh2o") ?? 700) / 100).toFixed(1),
      clay: extractSoilValue(payload, "clay") ?? "-",
      sand: extractSoilValue(payload, "sand") ?? "-",
      soc: extractSoilValue(payload, "soc") ?? "-"
    };
    liveDataState.soil = "ready";
  } catch (error) {
    console.warn("SoilGrids verisi alınamadı:", error);
    liveDataState.soil = "error";
  }
}

async function loadOgmForestAssets() {
  try {
    const payload = await cachedJson("data/ogm-public-forest-assets.json", "au-ogm-assets-cache", 1440);
    ogmForestAssets = payload.records ?? [];
  } catch (error) {
    console.warn("OGM açık veri referansı yüklenemedi:", error);
  }
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
      loadSoilDataForActiveSite().then(renderAll);
    }
    renderAll();
  });
});

elements.downloadReport?.addEventListener("click", downloadReport);
elements.downloadPdf?.addEventListener("click", downloadPdfReport);
elements.printReport?.addEventListener("click", () => window.print());

document.querySelectorAll("[data-layer]").forEach((button) => {
  button.addEventListener("click", () => {
    activeLayer = button.dataset.layer;
    document.querySelectorAll("[data-layer]").forEach((item) => item.classList.toggle("is-active", item === button));
    renderAll();
  });
});

document.addEventListener("click", (event) => {
  const scenarioCard = event.target.closest("[data-scenario-card]");
  if (scenarioCard) {
    inputs.scenarioSelect.value = scenarioCard.dataset.scenarioCard;
    renderAll();
    document.getElementById("analysis-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const scrollCard = event.target.closest("[data-scroll-target]");
  if (scrollCard) {
    document.getElementById(scrollCard.dataset.scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
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
  await loadOgmForestAssets();
  renderAll();
  await loadLiveWeather();
  await loadSoilDataForActiveSite();
  renderAll();
}

init();
