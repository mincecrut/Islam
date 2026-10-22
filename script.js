"use strict";

/* ================= Данные ================= */

const AYAT = [
  { ar: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا", ru: "Поистине, вместе с трудностью — облегчение. Поистине, вместе с трудностью — облегчение.", ref: "Сура 94 «Аш-Шарх», 5–6" },
  { ar: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ", ru: "Поистине, поминанием Аллаха успокаиваются сердца.", ref: "Сура 13 «Ар-Раад», 28" },
  { ar: "فَٱذْكُرُونِىٓ أَذْكُرْكُمْ", ru: "Поминайте Меня, и Я буду поминать вас.", ref: "Сура 2 «Аль-Бакара», 152" },
  { ar: "وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥٓ", ru: "Кто уповает на Аллаха, того Он избавит от нужды.", ref: "Сура 65 «Ат-Таляк», 3" },
  { ar: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا", ru: "Аллах не возлагает на душу сверх её возможностей.", ref: "Сура 2 «Аль-Бакара», 286" },
];

const HADITHS = [
  { t: "Дела оцениваются по намерениям, и каждому человеку достанется лишь то, что он намеревался обрести.", ref: "аль-Бухари, Муслим" },
  { t: "Никто из вас не уверует по-настоящему, пока не будет желать своему брату того, чего желает самому себе.", ref: "аль-Бухари, Муслим" },
  { t: "Лучший из вас — тот, кто изучает Коран и обучает ему других.", ref: "аль-Бухари" },
  { t: "Тот, кто верует в Аллаха и в Последний день, пусть говорит благое или молчит.", ref: "аль-Бухари, Муслим" },
  { t: "Самые любимые Аллахом дела — те, что постоянны, даже если их мало.", ref: "аль-Бухари, Муслим" },
  { t: "Облегчайте и не затрудняйте, радуйте людей и не отталкивайте их.", ref: "аль-Бухари, Муслим" },
  { t: "Улыбка, обращённая к брату твоему, — это садака (милостыня).", ref: "ат-Тирмизи" },
];

const DHIKR = [
  { ar: "سُبْحَانَ ٱللَّهِ", ru: "Субханаллах — «Пречист Аллах»", short: "Субханаллах" },
  { ar: "ٱلْحَمْدُ لِلَّهِ", ru: "Альхамдулиллах — «Хвала Аллаху»", short: "Альхамдулиллах" },
  { ar: "ٱللَّهُ أَكْبَرُ", ru: "Аллаху акбар — «Аллах велик»", short: "Аллаху акбар" },
  { ar: "لَا إِلَٰهَ إِلَّا ٱللَّهُ", ru: "Ла иляха илля-Ллах — «Нет божества, кроме Аллаха»", short: "Ла иляха илля-Ллах" },
  { ar: "أَسْتَغْفِرُ ٱللَّهَ", ru: "Астагфируллах — «Прошу прощения у Аллаха»", short: "Астагфируллах" },
];

const DUAS = [
  { ar: "رَبَّنَآ ءَاتِنَا فِى ٱلدُّنْيَا حَسَنَةً وَفِى ٱلْـَٔاخِرَةِ حَسَنَةً وَقِنَا عَذَابَ ٱلنَّارِ", ru: "Господи наш! Даруй нам добро в этом мире и добро в Последней жизни и защити нас от мучений Огня.", ref: "Аль-Бакара, 201" },
  { ar: "رَّبِّ زِدْنِى عِلْمًا", ru: "Господи, приумножь мне знание.", ref: "Та Ха, 114" },
  { ar: "رَبِّ ٱشْرَحْ لِى صَدْرِى ۝ وَيَسِّرْ لِىٓ أَمْرِى", ru: "Господи, раскрой мне грудь и облегчи мне мои дела.", ref: "Та Ха, 25–26" },
  { ar: "رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا", ru: "Господи наш! Не наказывай нас, если мы забыли или ошиблись.", ref: "Аль-Бакара, 286" },
];

const PRAYERS = [
  ["Fajr", "Фаджр"], ["Sunrise", "Восход"], ["Dhuhr", "Зухр"],
  ["Asr", "Аср"], ["Maghrib", "Магриб"], ["Isha", "Иша"],
];

const HIJRI_MONTHS = [
  "Мухаррам", "Сафар", "Раби аль-авваль", "Раби ас-сани", "Джумада аль-уля", "Джумада ас-сания",
  "Раджаб", "Шаабан", "Рамадан", "Шавваль", "Зуль-каада", "Зуль-хиджжа",
];

const API = "https://api.alquran.cloud/v1";
const AUDIO = (n) => `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${n}.mp3`;

/* ================= Утилиты ================= */

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function store(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch (e) { return null; }
}
function storeJSON(key, fallback) {
  try { return JSON.parse(store(key)) ?? fallback; } catch (e) { return fallback; }
}
function dayOfYear() {
  const now = new Date();
  return Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
}

/* ================= Аят и хадис дня ================= */

let ayahIndex = dayOfYear() % AYAT.length;
function showAyah() {
  const a = AYAT[ayahIndex];
  $("ayah-ar").textContent = a.ar;
  $("ayah-ru").textContent = a.ru;
  $("ayah-ref").textContent = a.ref;
}
$("ayah-next").addEventListener("click", () => { ayahIndex = (ayahIndex + 1) % AYAT.length; showAyah(); });
showAyah();

let hadithIndex = dayOfYear() % HADITHS.length;
function showHadith() {
  const h = HADITHS[hadithIndex];
  $("hadith-text").textContent = "«" + h.t + "»";
  $("hadith-ref").textContent = h.ref;
}
$("hadith-next").addEventListener("click", () => { hadithIndex = (hadithIndex + 1) % HADITHS.length; showHadith(); });
showHadith();

/* ================= Дуа ================= */

$("dua-list").innerHTML = DUAS.map((d) => `
  <article class="card">
    <p class="ar" lang="ar" dir="rtl">${d.ar}</p>
    <p>${d.ru}</p>
    <span class="ref">${d.ref}</span>
  </article>`).join("");

/* ================= Тасбих ================= */

let dhikrIdx = Number(store("dhikr")) || 0;
if (dhikrIdx >= DHIKR.length) dhikrIdx = 0;
let count = Number(store("count_" + dhikrIdx)) || 0;
let target = Number(store("target")) || 33;
$("target").value = String(target);

function renderDhikr() {
  $("dhikr-pick").innerHTML = DHIKR.map((d, i) =>
    `<button type="button" data-i="${i}" class="${i === dhikrIdx ? "on" : ""}">${d.short}</button>`).join("");
  $("dhikr-ar").textContent = DHIKR[dhikrIdx].ar;
  $("dhikr-ru").textContent = DHIKR[dhikrIdx].ru;
  renderCount();
}
function renderCount() {
  $("count").textContent = count;
  $("target-info").textContent = target ? `Цель: ${target}` : "Без цели";
}
$("dhikr-pick").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  dhikrIdx = Number(b.dataset.i);
  store("dhikr", String(dhikrIdx));
  count = Number(store("count_" + dhikrIdx)) || 0;
  renderDhikr();
});
$("counter").addEventListener("click", () => {
  count++;
  store("count_" + dhikrIdx, String(count));
  renderCount();
  if (navigator.vibrate) navigator.vibrate(target && count % target === 0 ? [80, 50, 80] : 15);
});
$("reset").addEventListener("click", () => {
  count = 0;
  store("count_" + dhikrIdx, "0");
  renderCount();
});
$("target").addEventListener("change", (e) => {
  target = Number(e.target.value);
  store("target", String(target));
  renderCount();
});
renderDhikr();

/* ================= Кибла ================= */

const KAABA = { lat: 21.4225, lng: 39.8262 };
let qibla = null;
let heading = 0;
let compassOn = false;

function qiblaBearing(lat, lng) {
  const rad = Math.PI / 180;
  const f1 = lat * rad, f2 = KAABA.lat * rad;
  const dl = (KAABA.lng - lng) * rad;
  const y = Math.sin(dl) * Math.cos(f2);
  const x = Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl);
  return (Math.atan2(y, x) / rad + 360) % 360;
}
function angDiff(a, b) { return ((a - b + 540) % 360) - 180; }
function setDial() {
  $("dial").setAttribute("transform", `rotate(${-heading} 100 100)`);
  if (qibla !== null) $("qarrow").setAttribute("transform", `rotate(${qibla} 100 100)`);
  if (compassOn) {
    const diff = qibla === null ? 180 : Math.abs(angDiff(qibla, heading));
    $("compass").classList.toggle("aligned", diff < 5);
    $("compass-read").textContent = `Телефон смотрит на ${Math.round(heading)}°` +
      (qibla !== null ? (diff < 5 ? " — вы смотрите в сторону киблы" : `, до киблы ${Math.round(diff)}°`) : "");
  }
}
function updateQibla(lat, lng, label) {
  qibla = qiblaBearing(lat, lng);
  $("qibla-deg").textContent = `${Math.round(qibla)}°`;
  $("qibla-note").textContent = `Направление на Каабу для ${label}: отсчёт от севера по часовой стрелке.`;
  setDial();
}
/* Азимут телефона с учётом наклона.
   Телефон лежит плашмя — берём направление верхнего края, стоит вертикально — направление задней стороны.
   Простое «360 − alpha» верно только когда телефон лежит строго горизонтально. */
function tiltHeading(alpha, beta, gamma) {
  const r = Math.PI / 180;
  const z = alpha * r, x = beta * r, y = gamma * r;
  const cX = Math.cos(x), cY = Math.cos(y), cZ = Math.cos(z);
  const sX = Math.sin(x), sY = Math.sin(y), sZ = Math.sin(z);
  // задняя сторона (восток, север)
  const rearE = -cZ * sY - sZ * sX * cY;
  const rearN = -sZ * sY + cZ * sX * cY;
  // верхний край (восток, север)
  const topE = -sZ * cX;
  const topN = cZ * cX;
  const useRear = Math.hypot(rearE, rearN) > Math.hypot(topE, topN);
  const e = useRear ? rearE : topE, n = useRear ? rearN : topN;
  return (Math.atan2(e, n) / r + 360) % 360;
}
let gotReading = false;
let smooth = null;
function onOrient(e) {
  let h = null;
  if (typeof e.webkitCompassHeading === "number") {
    h = e.webkitCompassHeading; // iOS: уже с учётом наклона
  } else if ((e.type === "deviceorientationabsolute" || e.absolute) &&
             typeof e.alpha === "number" && typeof e.beta === "number" && typeof e.gamma === "number") {
    h = tiltHeading(e.alpha, e.beta, e.gamma);
  }
  if (h === null) return;
  gotReading = true;
  smooth = smooth === null ? h : (smooth + angDiff(h, smooth) * 0.2 + 360) % 360; // сглаживание дрожания
  heading = smooth;
  setDial();
}
$("compass-btn").addEventListener("click", async () => {
  if (compassOn) return;
  try {
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
      const r = await DeviceOrientationEvent.requestPermission();
      if (r !== "granted") throw new Error("denied");
    }
    if (!("DeviceOrientationEvent" in window)) throw new Error("unsupported");
    window.addEventListener("deviceorientationabsolute", onOrient, true);
    window.addEventListener("deviceorientation", onOrient, true);
    compassOn = true;
    $("compass-btn").textContent = "Компас включён";
    setTimeout(() => {
      if (!gotReading) {
        $("compass-read").textContent = "Датчик не отвечает. Откройте сайт в Chrome (Android) или Safari (iPhone) по https и ориентируйтесь по градусам.";
      }
    }, 2500);
  } catch (err) {
    $("qibla-note").textContent = "Не удалось включить компас: нет доступа к датчику. Ориентируйтесь по градусам от севера.";
  }
});

/* ================= Время намаза ================= */

function nowInZone(tz) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour").value) % 24;
  const m = Number(parts.find((p) => p.type === "minute").value);
  return h * 60 + m;
}
const toMin = (s) => { const [h, m] = s.slice(0, 5).split(":").map(Number); return h * 60 + m; };

let ramadanChecked = false;
async function showRamadan(hj) {
  if (ramadanChecked || !hj) return;
  ramadanChecked = true;
  const year = Number(hj.year);
  const month = Number(hj.month.number);
  const box = $("ramadan-stat");
  if (month === 9) {
    $("ramadan-days").textContent = "Идёт";
    box.querySelector("span").textContent = "месяц Рамадан";
    box.hidden = false;
    return;
  }
  const y = month < 9 ? year : year + 1;
  try {
    const res = await fetch(`https://api.aladhan.com/v1/hToG/01-09-${y}`);
    const json = await res.json();
    const [d, m, yy] = json.data.gregorian.date.split("-").map(Number);
    const start = new Date(yy, m - 1, d);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const days = Math.round((start - today) / 86400000);
    if (days > 0) {
      $("ramadan-days").textContent = days;
      box.hidden = false;
    }
  } catch (e) { /* необязательная информация */ }
}

function renderTimes(data, label) {
  const t = data.timings;
  const tz = data.meta.timezone;
  const now = nowInZone(tz);

  let nextKey = null;
  for (const [key] of PRAYERS) {
    if (toMin(t[key]) > now) { nextKey = key; break; }
  }
  const wrapped = !nextKey;
  if (wrapped) nextKey = "Fajr";

  $("times").innerHTML = PRAYERS.map(([key, name]) => `
    <div class="time ${key === nextKey ? "next" : ""}">
      <div class="n">${name}</div>
      <div class="t">${esc(t[key].slice(0, 5))}</div>
    </div>`).join("");

  const nextName = PRAYERS.find(([k]) => k === nextKey)[1];
  let diff = toMin(t[nextKey]) - now;
  if (diff <= 0) diff += 1440;
  const h = Math.floor(diff / 60), m = diff % 60;
  $("next-prayer").textContent =
    `Ближайший: ${nextName} в ${t[nextKey].slice(0, 5)} — через ${h ? h + " ч " : ""}${m} мин` +
    (wrapped ? " (завтра)" : "");

  const hj = data.date.hijri;
  if (hj) {
    const mn = HIJRI_MONTHS[Number(hj.month.number) - 1] || hj.month.en;
    $("hijri-date").textContent = `${hj.day} ${mn} ${hj.year} г. х.`;
    showRamadan(hj);
  }

  const lat = Number(data.meta.latitude), lng = Number(data.meta.longitude);
  if (!Number.isNaN(lat) && !Number.isNaN(lng)) updateQibla(lat, lng, label);
}

async function loadTimes(url, label) {
  const err = $("times-error");
  err.hidden = true;
  $("next-prayer").textContent = "Загрузка…";
  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.code !== 200) throw new Error(json.data || "Ошибка запроса");
    renderTimes(json.data, label);
  } catch (e) {
    $("next-prayer").textContent = "";
    $("times").innerHTML = "";
    err.textContent = "Не удалось получить время намаза. Проверьте название города и страны (латиницей) и интернет.";
    err.hidden = false;
  }
}

function byCity() {
  const cityRaw = $("city").value.trim();
  const city = encodeURIComponent(cityRaw);
  const country = encodeURIComponent($("country").value.trim());
  const method = $("method").value;
  store("city", cityRaw);
  store("country", $("country").value.trim());
  store("method", method);
  loadTimes(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`, `города ${cityRaw}`);
}

$("city-form").addEventListener("submit", (e) => { e.preventDefault(); byCity(); });

$("geo").addEventListener("click", () => {
  if (!navigator.geolocation) {
    $("times-error").textContent = "Геолокация недоступна в этом браузере.";
    $("times-error").hidden = false;
    return;
  }
  $("next-prayer").textContent = "Определяю местоположение…";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      loadTimes(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${$("method").value}`, "вашего местоположения");
    },
    () => {
      $("next-prayer").textContent = "";
      $("times-error").textContent = "Не удалось определить местоположение. Введите город вручную.";
      $("times-error").hidden = false;
    }
  );
});

const savedCity = store("city"), savedCountry = store("country"), savedMethod = store("method");
if (savedCity) $("city").value = savedCity;
if (savedCountry) $("country").value = savedCountry;
if (savedMethod) $("method").value = savedMethod;
byCity();

/* ================= 99 имён Аллаха ================= */

(async function loadAsma() {
  try {
    const res = await fetch("https://api.aladhan.com/v1/asmaAlHusna");
    const json = await res.json();
    if (json.code !== 200) throw new Error();
    $("asma-list").innerHTML = json.data.map((n) => `
      <div class="nm">
        <span class="no">${esc(n.number)}</span>
        <span class="ar" lang="ar" dir="rtl">${esc(n.name)}</span>
        <span class="tr">${esc(n.transliteration)}</span>
        <span class="mn">${esc(n.en && n.en.meaning)}</span>
      </div>`).join("");
  } catch (e) {
    $("asma-list").textContent = "Не удалось загрузить имена. Проверьте интернет и обновите страницу.";
  }
})();

/* ================= Коран ================= */

let SURAHS = [];
const surahCache = new Map();
let current = null; // { n, ayahCount }

const norm = (s) => s
  .replace(/[ً-ٰٟۖ-ۭـ﻿]/g, "")
  .replace(/ٱ/g, "ا");

function stripBismillah(text) {
  const words = text.trim().split(/\s+/);
  if (words.length > 4 && norm(words.slice(0, 4).join(" ")) === "بسم الله الرحمن الرحيم") {
    return words.slice(4).join(" ");
  }
  return text;
}

function surahMeta(n) {
  return SURAHS[n - 1] || { number: n, englishName: "Сура " + n, englishNameTranslation: "", numberOfAyahs: 0, revelationType: "", name: "" };
}
const arName = (s) => (s.name || "").replace(/^\S+\s+/, "");

function renderSurahList(filter) {
  const q = (filter || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  const items = SURAHS.filter((s) => {
    if (!q) return true;
    if (String(s.number) === q) return true;
    const hay = (s.englishName + s.englishNameTranslation).toLowerCase().replace(/[^a-z0-9]/g, "");
    return hay.includes(q);
  });
  $("q-list").innerHTML = items.length ? items.map((s) => `
    <button class="q-item ${current && current.n === s.number ? "on" : ""}" data-n="${s.number}">
      <span class="num">${s.number}</span>
      <span class="nm">${esc(s.englishName)}<small>${esc(s.englishNameTranslation)} · ${s.numberOfAyahs} ай.</small></span>
      <span class="ar" lang="ar">${esc(arName(s))}</span>
    </button>`).join("") : "Ничего не найдено.";
}

async function loadSurahList() {
  try {
    const res = await fetch(`${API}/surah`);
    const json = await res.json();
    if (json.code !== 200) throw new Error();
    SURAHS = json.data;
    renderSurahList("");
    renderBookmarks();
    renderContinue();
  } catch (e) {
    $("q-list").textContent = "Не удалось загрузить список сур. Проверьте интернет и обновите страницу.";
  }
}

async function fetchSurah(n) {
  if (surahCache.has(n)) return surahCache.get(n);
  const res = await fetch(`${API}/surah/${n}/editions/quran-uthmani,ru.kuliev`);
  const json = await res.json();
  if (json.code !== 200 || !Array.isArray(json.data)) throw new Error("bad response");
  const ar = json.data.find((d) => d.edition && d.edition.identifier === "quran-uthmani") || json.data[0];
  const ru = json.data.find((d) => d.edition && d.edition.identifier === "ru.kuliev") || json.data[1];
  const ayahs = ar.ayahs.map((a, i) => ({
    n: a.numberInSurah,
    ar: a.text,
    ru: ru && ru.ayahs[i] ? ru.ayahs[i].text : "",
  }));
  surahCache.set(n, ayahs);
  return ayahs;
}

function getBookmarks() { return storeJSON("q_bm", []); }
function isBookmarked(s, a) { return getBookmarks().some((b) => b.s === s && b.a === a); }
function toggleBookmark(s, a) {
  let list = getBookmarks();
  if (list.some((b) => b.s === s && b.a === a)) list = list.filter((b) => !(b.s === s && b.a === a));
  else list.push({ s, a });
  store("q_bm", JSON.stringify(list));
  renderBookmarks();
}
function renderBookmarks() {
  const list = getBookmarks();
  const box = $("q-bookmarks");
  box.hidden = !list.length;
  box.innerHTML = list.map((b) =>
    `<button data-s="${b.s}" data-a="${b.a}">★ ${esc(surahMeta(b.s).englishName)} ${b.s}:${b.a}</button>`).join("");
}
function renderContinue() {
  const last = storeJSON("q_last", null);
  const btn = $("q-continue");
  if (!last || !last.s) { btn.hidden = true; return; }
  btn.hidden = false;
  btn.textContent = `Продолжить: ${surahMeta(last.s).englishName} ${last.s}:${last.a || 1}`;
}

async function openSurah(n, ayah) {
  n = Math.min(114, Math.max(1, Number(n) || 1));
  const meta = surahMeta(n);
  current = { n, count: meta.numberOfAyahs };
  const reader = $("q-reader");
  reader.hidden = false;
  $("q-title").textContent = `${n}. ${meta.englishName}` + (meta.name ? ` — ${arName(meta)}` : "");
  const type = meta.revelationType === "Meccan" ? "Мекканская" : meta.revelationType === "Medinan" ? "Мединская" : "";
  $("q-meta").textContent = [meta.englishNameTranslation, type, meta.numberOfAyahs ? meta.numberOfAyahs + " аятов" : ""].filter(Boolean).join(" · ");
  $("q-ayahs").innerHTML = "";
  $("q-bismillah").hidden = true;
  $("q-status").textContent = "Загрузка…";
  $("q-prev").disabled = n === 1;
  $("q-next").disabled = n === 114;

  const audio = $("q-audio");
  audio.pause();
  audio.src = AUDIO(n);

  renderSurahList($("q-search").value);
  reader.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    const ayahs = await fetchSurah(n);
    if (!current || current.n !== n) return; // пользователь уже открыл другую суру
    const showBism = n !== 1 && n !== 9;
    $("q-bismillah").hidden = !showBism;
    const last = storeJSON("q_last", null);
    $("q-ayahs").innerHTML = ayahs.map((a, i) => {
      const text = i === 0 && showBism ? stripBismillah(a.ar) : a.ar;
      const read = last && last.s === n && last.a === a.n;
      return `
        <div class="q-ayah ${read ? "read" : ""}" id="a-${a.n}" data-a="${a.n}">
          <div class="row">
            <p class="ar" lang="ar" dir="rtl">${esc(text)}</p>
            <div class="side">
              <span class="no">${a.n}</span>
              <button class="bm ${isBookmarked(n, a.n) ? "on" : ""}" data-bm="${a.n}" aria-label="Закладка">${isBookmarked(n, a.n) ? "★" : "☆"}</button>
            </div>
          </div>
          <p class="tr">${esc(a.ru)}</p>
        </div>`;
    }).join("");
    $("q-status").textContent = "";
    store("q_last", JSON.stringify({ s: n, a: (last && last.s === n && last.a) || 1 }));
    renderContinue();
    if (ayah) {
      const el = $("a-" + ayah);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("flash");
        setTimeout(() => el.classList.remove("flash"), 2500);
      }
    }
  } catch (e) {
    $("q-status").textContent = "Не удалось загрузить суру. Проверьте интернет и попробуйте ещё раз.";
  }
}

/* обработчики Корана */
$("q-list").addEventListener("click", (e) => {
  const b = e.target.closest(".q-item");
  if (b) openSurah(Number(b.dataset.n));
});
$("q-search").addEventListener("input", (e) => renderSurahList(e.target.value));
$("q-bookmarks").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) openSurah(Number(b.dataset.s), Number(b.dataset.a));
});
$("q-continue").addEventListener("click", () => {
  const last = storeJSON("q_last", null);
  if (last) openSurah(last.s, last.a);
});
$("q-prev").addEventListener("click", () => current && openSurah(current.n - 1));
$("q-next").addEventListener("click", () => current && openSurah(current.n + 1));
$("q-close").addEventListener("click", () => {
  $("q-audio").pause();
  $("q-reader").hidden = true;
  current = null;
  renderSurahList($("q-search").value);
  $("quran").scrollIntoView({ behavior: "smooth" });
});
$("q-tr").addEventListener("change", (e) => {
  $("q-reader").classList.toggle("no-tr", !e.target.checked);
  store("q_tr", e.target.checked ? "1" : "0");
});
$("q-size").addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--ar-size", e.target.value + "px");
  store("q_size", e.target.value);
});
$("q-ayahs").addEventListener("click", (e) => {
  const row = e.target.closest(".q-ayah");
  if (!row || !current) return;
  const a = Number(row.dataset.a);
  if (e.target.closest(".bm")) {
    toggleBookmark(current.n, a);
    const on = isBookmarked(current.n, a);
    const btn = e.target.closest(".bm");
    btn.classList.toggle("on", on);
    btn.textContent = on ? "★" : "☆";
    return;
  }
  document.querySelectorAll(".q-ayah.read").forEach((x) => x.classList.remove("read"));
  row.classList.add("read");
  store("q_last", JSON.stringify({ s: current.n, a }));
  renderContinue();
});
document.querySelectorAll("[data-open]").forEach((b) => {
  b.addEventListener("click", () => openSurah(Number(b.dataset.open), Number(b.dataset.ayah) || undefined));
});

/* сохранённые настройки чтения */
(function restoreQuranPrefs() {
  const size = store("q_size");
  if (size) {
    $("q-size").value = size;
    document.documentElement.style.setProperty("--ar-size", size + "px");
  }
  if (store("q_tr") === "0") {
    $("q-tr").checked = false;
    $("q-reader").classList.add("no-tr");
  }
})();

loadSurahList();
