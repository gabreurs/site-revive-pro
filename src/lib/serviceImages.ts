// Mapeamento de cada serviço para uma FOTO REAL do acervo SMS (sem IA).
// Usado por Index, ServicoDetalhe, Bairro e Servicos.
import obraEscavadeiraPrancha from "@/assets/obras/sms-escavadeira-prancha.jpg.asset.json";
import obraDemolicaoTerreno from "@/assets/obras/sms-demolicao-terreno.jpg.asset.json";
import obraFrotaEscavadeiras from "@/assets/obras/sms-frota-escavadeiras.jpg.asset.json";
import obraCaminhaoTransporte from "@/assets/obras/sms-caminhao-transporte.jpg.asset.json";
import obraVolvoCanteiro from "@/assets/obras/sms-volvo-canteiro.jpg.asset.json";
import obraMiniEscavadeira from "@/assets/obras/sms-mini-escavadeira-sy35.jpg.asset.json";
import obraDoosanPatio from "@/assets/obras/sms-doosan-patio.jpg.asset.json";
import piscinaPoster1 from "@/assets/servicos/abertura-piscina-1-poster.jpg.asset.json";

// Por chave de imagem (campo `image` em SERVICES)
export const SERVICE_IMAGE_BY_KEY: Record<string, { src: string; alt: string }> = {
  "limpeza-terreno": {
    src: obraDemolicaoTerreno.url,
    alt: "Escavadeira da SMS removendo material e limpando terreno em obra na Grande São Paulo",
  },
  demolicao: {
    src: obraDemolicaoTerreno.url,
    alt: "Demolição controlada executada por escavadeira da SMS Terraplenagem",
  },
  escavacao: {
    src: obraMiniEscavadeira.url,
    alt: "Mini escavadeira Sany SY35U da SMS abrindo área para escavação em terreno urbano",
  },
  "movimentacao-terra": {
    src: obraVolvoCanteiro.url,
    alt: "Escavadeira Volvo EC140B da SMS em canteiro de movimentação de terra na Grande SP",
  },
  perfuracao: {
    src: obraDoosanPatio.url,
    alt: "Escavadeira Doosan no pátio próprio da SMS Terraplenagem",
  },
  "transporte-locacao": {
    src: obraCaminhaoTransporte.url,
    alt: "Caminhão prancha SMS 18-310 transportando escavadeira para obra em São Paulo",
  },
  "abertura-piscina": {
    src: piscinaPoster1.url,
    alt: "Mini escavadeira SMS executando abertura de cava para piscina em terreno residencial",
  },
};

// Hero genérico (terraplanagem) e fallback para páginas locais
export const HERO_OBRA = {
  src: obraVolvoCanteiro.url,
  alt: "Escavadeira em serviço de terraplanagem da SMS na Grande São Paulo",
};

export const SUPPORT_OBRAS = {
  frota: { src: obraFrotaEscavadeiras.url, alt: "Frota própria da SMS Terraplenagem no pátio" },
  transporte: { src: obraCaminhaoTransporte.url, alt: "Caminhão prancha SMS transportando equipamento" },
  prancha: { src: obraEscavadeiraPrancha.url, alt: "Escavadeira sendo transportada em prancha rebaixada da SMS" },
};

export function getServiceImage(key: string) {
  return SERVICE_IMAGE_BY_KEY[key] ?? HERO_OBRA;
}
