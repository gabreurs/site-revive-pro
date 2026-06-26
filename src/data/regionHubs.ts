// Mapeamento entre região (RegionKey de lib/bairros.ts) e a página hub
// /onde-atuamos/<slug>. Mantém breadcrumb, JSON-LD e nav sempre consistentes.

import type { RegionKey } from "@/lib/bairros";

export interface RegionHub {
  key: RegionKey;
  slug: string;            // segmento depois de /onde-atuamos/
  label: string;           // label visível (breadcrumb, nav)
  shortLabel: string;      // versão curta p/ chips/menus
  h1: string;
  title: string;
  metaDescription: string;
  intro: string;           // 1 parágrafo curto, sem inventar dados
}

export const REGION_HUBS: Record<RegionKey, RegionHub> = {
  "zona-norte": {
    key: "zona-norte",
    slug: "zona-norte",
    label: "Zona Norte de São Paulo",
    shortLabel: "Zona Norte",
    h1: "Terraplanagem na Zona Norte de São Paulo",
    title: "Terraplanagem na Zona Norte de São Paulo | SMS Terraplenagem",
    metaDescription: "Terraplanagem na Zona Norte de São Paulo para obras comerciais, prédios e terrenos urbanos. Limpeza, demolição, nivelamento e movimentação de terra com frota própria.",
    intro:
      "A SMS Terraplenagem atende bairros da Zona Norte de São Paulo com frota própria para obras comerciais, prédios residenciais e adequação de terrenos urbanos. Veja abaixo as localidades atendidas e os serviços disponíveis na região.",
  },
  "centro": {
    key: "centro",
    slug: "centro-de-sao-paulo",
    label: "Centro de São Paulo",
    shortLabel: "Centro",
    h1: "Terraplanagem no Centro de São Paulo",
    title: "Terraplanagem no Centro de São Paulo | SMS Terraplenagem",
    metaDescription: "Terraplanagem no Centro de São Paulo para reformas, retrofits e obras comerciais em terrenos urbanos. Demolição controlada, limpeza, nivelamento e preparo de solo.",
    intro:
      "No Centro de São Paulo, a SMS Terraplenagem atua principalmente em reformas, retrofits e demolição controlada de imóveis em lotes urbanos compactos. Confira as localidades atendidas na região.",
  },
  "zona-oeste": {
    key: "zona-oeste",
    slug: "zona-oeste",
    label: "Zona Oeste e Região Metropolitana Oeste",
    shortLabel: "Zona Oeste",
    h1: "Terraplanagem na Zona Oeste de São Paulo e região",
    title: "Terraplanagem na Zona Oeste de São Paulo | SMS Terraplenagem",
    metaDescription: "Terraplanagem na Zona Oeste de São Paulo, Osasco, Barueri e Alphaville para obras comerciais, galpões, corporativo e residencial. Limpeza, demolição, nivelamento e preparo de solo.",
    intro:
      "A Zona Oeste e a região metropolitana a oeste de São Paulo reúnem bairros urbanos consolidados, áreas corporativas e cidades como Osasco, Barueri e Alphaville. Veja abaixo as localidades atendidas.",
  },
  "zona-leste": {
    key: "zona-leste",
    slug: "zona-leste",
    label: "Zona Leste de São Paulo",
    shortLabel: "Zona Leste",
    h1: "Terraplanagem na Zona Leste de São Paulo",
    title: "Terraplanagem na Zona Leste de São Paulo | SMS Terraplenagem",
    metaDescription: "Terraplanagem na Zona Leste de São Paulo para obras comerciais, prédios residenciais e terrenos urbanos. Limpeza, demolição, nivelamento e movimentação de terra com frota própria.",
    intro:
      "Na Zona Leste de São Paulo, a SMS Terraplenagem atende bairros consolidados e áreas em expansão, com obras comerciais, prediais e terrenos urbanos. Veja as localidades atendidas e os serviços disponíveis.",
  },
  "zona-sul": {
    key: "zona-sul",
    slug: "zona-sul",
    label: "Zona Sul de São Paulo",
    shortLabel: "Zona Sul",
    h1: "Terraplanagem na Zona Sul de São Paulo",
    title: "Terraplanagem na Zona Sul de São Paulo | SMS Terraplenagem",
    metaDescription: "Terraplanagem na Zona Sul de São Paulo para obras comerciais, residenciais de alto padrão e terrenos urbanos. Demolição, limpeza, nivelamento e preparo de solo com frota própria.",
    intro:
      "A Zona Sul de São Paulo reúne bairros nobres, polos corporativos e áreas residenciais. A SMS atende a região em obras comerciais, prédios e adequação de terrenos. Confira as localidades atendidas.",
  },
  "outras": {
    key: "outras",
    slug: "grande-sao-paulo",
    label: "Grande São Paulo e interior",
    shortLabel: "Grande SP e interior",
    h1: "Terraplanagem na Grande São Paulo e interior paulista",
    title: "Terraplanagem na Grande São Paulo e interior | SMS Terraplenagem",
    metaDescription: "Terraplanagem na Grande São Paulo, ABC paulista e interior para obras industriais, galpões e empreendimentos comerciais. Limpeza, demolição, nivelamento e preparo de solo.",
    intro:
      "A SMS Terraplenagem atende cidades da Grande São Paulo, ABC paulista e interior, com deslocamento de frota e equipe para obras industriais, galpões e empreendimentos comerciais. Veja as cidades atendidas.",
  },
};

export function getRegionHub(key: RegionKey): RegionHub {
  return REGION_HUBS[key];
}

export function getRegionHubBySlug(slug: string): RegionHub | undefined {
  return Object.values(REGION_HUBS).find((r) => r.slug === slug);
}

export const REGION_HUB_LIST: RegionHub[] = [
  REGION_HUBS["centro"],
  REGION_HUBS["zona-norte"],
  REGION_HUBS["zona-sul"],
  REGION_HUBS["zona-leste"],
  REGION_HUBS["zona-oeste"],
  REGION_HUBS["outras"],
];
