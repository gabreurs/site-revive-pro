// Auditoria SEO local — roda com:
//   bunx tsx scripts/seo-audit.ts
// Avalia title/meta/H1/primeira frase de cada slug, mede similaridade
// par a par (Jaccard sobre tokens) e imprime GREEN/YELLOW/RED.

import { ALL_BAIRROS } from "../src/lib/bairros";
import { getPreposition } from "../src/lib/preposition";
import {
  getProfileByName,
  getServiceText,
  getLocationOverride,
} from "../src/data/locationProfiles";

type Row = {
  slug: string;
  name: string;
  title: string;
  meta: string;
  h1: string;
  first: string;
  serviceTexts: string[];
  prep: string;
};

function tokens(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  const inter = new Set([...a].filter((x) => b.has(x)));
  const uni = new Set([...a, ...b]);
  return uni.size === 0 ? 0 : inter.size / uni.size;
}

const rows: Row[] = ALL_BAIRROS.map((b) => {
  const prep = getPreposition(b.name);
  const phrase = `${prep} ${b.name}`;
  const profile = getProfileByName(b.name, b.region.key);
  const ov = getLocationOverride(b.slug);
  const title = ov.title || `Terraplanagem ${phrase} | SMS Terraplenagem`;
  const meta = ov.metaDescription || `Terraplanagem ${phrase} para ${profile.descSuffix}. Limpeza de terreno, demolição, nivelamento, movimentação de terra e preparo de solo com frota própria.`;
  const h1 = `Terraplanagem ${phrase} ${profile.h1Suffix}`;
  const first = ov.firstSentence || profile.heroLead(phrase);
  const serviceTexts = (["terraplanagem", "limpeza", "demolicao", "nivelamento", "movimentacao", "preparo"] as const).map(
    (k) => getServiceText(profile, k, b.slug, phrase),
  );
  return { slug: b.slug, name: b.name, title, meta, h1, first, serviceTexts, prep };
});

// Duplicação global de title/meta/H1
const titleDupe = new Map<string, number>();
const metaDupe = new Map<string, number>();
rows.forEach((r) => {
  titleDupe.set(r.title, (titleDupe.get(r.title) || 0) + 1);
  metaDupe.set(r.meta, (metaDupe.get(r.meta) || 0) + 1);
});

// Similaridade entre páginas (compara concatenação de serviços)
const sims: Array<{ a: string; b: string; sim: number }> = [];
const docs = rows.map((r) => tokens([r.first, ...r.serviceTexts].join(" ")));
for (let i = 0; i < rows.length; i++) {
  let maxSim = 0;
  let maxOther = "";
  for (let j = 0; j < rows.length; j++) {
    if (i === j) continue;
    const s = jaccard(docs[i], docs[j]);
    if (s > maxSim) { maxSim = s; maxOther = rows[j].slug; }
  }
  sims.push({ a: rows[i].slug, b: maxOther, sim: maxSim });
}

// Critérios
const ALERT_SIM = 0.6;
const PRIORITY = [
  "tatuape", "mooca", "aclimacao", "alphaville", "perus", "cajamar",
  "osasco", "bras", "anhanguera", "santo-andre", "diadema", "barueri",
  "guarulhos", "bela-vista", "morumbi", "butanta", "santana", "ipiranga",
];

let red = 0, yellow = 0, green = 0;
const issues: string[] = [];

rows.forEach((r, i) => {
  const flags: string[] = [];
  if ((titleDupe.get(r.title) || 0) > 1) flags.push("title duplicado");
  if ((metaDupe.get(r.meta) || 0) > 1 && !PRIORITY.includes(r.slug)) flags.push("meta duplicada");
  const sim = sims[i].sim;
  if (sim > ALERT_SIM) flags.push(`similar a /${sims[i].b} (${(sim * 100).toFixed(0)}%)`);
  const focusOK = r.first.toLowerCase().startsWith(`terraplanagem ${r.prep}`.toLowerCase());
  if (!focusOK) flags.push("primeira frase sem keyword foco");
  if (!r.title.toLowerCase().startsWith("terraplanagem")) flags.push("title não começa com keyword");

  const level = flags.length === 0 ? "GREEN" : flags.length <= 1 ? "YELLOW" : "RED";
  if (level === "GREEN") green++;
  else if (level === "YELLOW") yellow++;
  else red++;
  if (flags.length) issues.push(`[${level}] ${r.slug} — ${flags.join("; ")}`);
});

console.log(`\n=== SEO Audit — ${rows.length} páginas locais ===`);
console.log(`GREEN: ${green}   YELLOW: ${yellow}   RED: ${red}`);
console.log(`Títulos únicos: ${titleDupe.size}/${rows.length}`);
console.log(`Metas únicas:   ${metaDupe.size}/${rows.length}`);
console.log("\n--- Prioritárias ---");
PRIORITY.forEach((slug) => {
  const i = rows.findIndex((r) => r.slug === slug);
  if (i < 0) { console.log(`  ${slug}: NÃO ENCONTRADA`); return; }
  const r = rows[i];
  const sim = sims[i].sim;
  console.log(`  ${slug.padEnd(28)} sim=${(sim * 100).toFixed(0)}% (vs ${sims[i].b})  title="${r.title.slice(0, 60)}"`);
});
if (issues.length) {
  console.log("\n--- Issues ---");
  issues.slice(0, 50).forEach((l) => console.log("  " + l));
  if (issues.length > 50) console.log(`  ... e mais ${issues.length - 50}`);
}
