// Geração dinâmica de páginas de bairro/cidade — terraplanagem em SP e Grande SP.
// Estrutura: regiões (ordem fixa) + bairros em cada uma (ordem fixa).

export type RegionKey =
  | "zona-norte"
  | "centro"
  | "zona-oeste"
  | "zona-leste"
  | "zona-sul"
  | "outras";

export interface RegionInfo {
  key: RegionKey;
  label: string;
  intro: string; // contexto regional usado nas páginas de bairro
  bairros: string[];
}

export const REGIONS: RegionInfo[] = [
  {
    key: "zona-norte",
    label: "Zona Norte",
    intro:
      "A Zona Norte de São Paulo concentra bairros de relevo acidentado, próximos à Serra da Cantareira, com terrenos que exigem cortes, aterros e contenções bem dimensionados antes do início da obra.",
    bairros: [
      "Perus","Freguesia do Ó","Casa Verde","Bairro do Limão","Vila Maria","Vila Nova Cachoeirinha",
      "Vila Guilherme","Santana","Parada Inglesa","Brasilândia","Água Fria","Lauzane Paulista","Mandaqui",
      "Jardim Peri Peri","Imirim","Jaçanã","Tremembé","Tucuruvi","Vila Medeiros","José Bonifácio",
      "Horto Florestal","Santa Terezinha",
    ],
  },
  {
    key: "centro",
    label: "Centro de São Paulo",
    intro:
      "O Centro de São Paulo combina obras de retrofit, demolição controlada e adequação de terrenos em lotes urbanos compactos, onde logística de acesso, ruído e remoção de entulho precisam de planejamento minucioso.",
    bairros: [
      "Aclimação","Anhanguera","Bela Vista","Bom Retiro","Brás","Cambuci","Campos Elíseos","Consolação",
      "Higienópolis","Jardins","Liberdade","Pacaembu","Pari","República","Santa Cecília","Santa Efigênia",
      "Sé","Vila Buarque","Avenida Paulista",
    ],
  },
  {
    key: "zona-oeste",
    label: "Zona Oeste",
    intro:
      "A Zona Oeste mistura bairros consolidados de São Paulo e cidades vizinhas como Osasco, Barueri e Cotia, com obras residenciais, comerciais e industriais que demandam terraplanagem, escavação e movimentação de terra em diferentes escalas.",
    bairros: [
      "Água Branca","Alphaville","Alto da Lapa","Alto de Pinheiros","Amador Bueno","Barra Funda","Barueri",
      "Butantã","Carapicuíba","Caxingui","Cotia","Embu das Artes","Granja Viana","Itapevi","Jaguaré",
      "Jandira","Jaraguá","Lapa","Osasco","Parque dos Príncipes","Parque São Domingos","Perdizes",
      "Pinheiros","Pirituba","Pompéia","Presidente Altino","Quitaúna","Raposo Tavares","Rio Pequeno",
      "Santana de Parnaíba","Sumaré","Taboão da Serra","Vila dos Remédios","Vila Jaguara","Vila Leopoldina",
      "Vila Madalena","Vila Romana","Vila São Francisco",
    ],
  },
  {
    key: "zona-leste",
    label: "Zona Leste",
    intro:
      "A Zona Leste é uma das regiões com maior volume de obras de São Paulo, com terrenos que variam de áreas planas a regiões com declives e necessidade de compactação reforçada para empreendimentos residenciais e logísticos.",
    bairros: [
      "Tatuapé","Ermelino Matarazzo","Jardim Anália Franco","Mooca","Penha","Vila Carrão","Vila Formosa",
      "Arthur Alvim","Belém","Iguatemi","Americanópolis","Cangaíba","Cidade Líder","Cidade Patriarca",
      "Cidade Tiradentes","Guaianases","Itaim Paulista","Itaquera","Jardim Helena","Parque do Carmo",
      "Ponte Rasa","São Lucas","São Mateus","São Miguel Paulista","Sapopemba","Vila Curuçá","Vila Jacuí",
      "Vila Matilde","Vila Prudente","Jardim Aricanduva","Vila Zelina","Lajeado",
    ],
  },
  {
    key: "zona-sul",
    label: "Zona Sul",
    intro:
      "A Zona Sul reúne bairros nobres, áreas industriais e regiões em expansão da capital, com obras que exigem terraplanagem precisa em terrenos urbanos, condomínios fechados e projetos próximos a APPs.",
    bairros: [
      "Jardim América","Jardim Europa","Cidade Jardim","Brooklin","Ibirapuera","Ipiranga","Morumbi",
      "Panamby","Paraíso","Paraisópolis","Parelheiros","Sacomã","Santo Amaro","Vila Olímpia","Vila Sônia",
      "Vila Mariana","Vila Gumercindo","Saúde","Interlagos","Água Funda","Alto da Boa Vista",
      "Bosque da Saúde","Campo Belo","Campo Grande","Campo Limpo","Capela do Socorro","Capão Redondo",
      "Chácara Flora","Chácara Santo Antônio","Chácara Klabin","Cidade Ademar","Cidade Avelino",
      "Cidade Dutra","Cursino","Grajaú","Granja Julieta","Heliópolis","Horto do Ipê","Itaim Bibi",
      "Itapecerica da Serra","Jabaquara","Jardim Ângela","Jardim Ipanema","Jardim Marajoara",
      "Jardim Paulista","Jardim São Luís","Jardim Sul","Jurubatuba","Marsilac","M'Boi Mirim",
      "Mirandópolis","Moema","Pedreira","Real Parque","São Judas","São Rafael","Vila Andrade",
      "Vila Clementino","Vila das Mêrces","Vila Mascote","Vila Nova Conceição","Vila Santa Catarina",
    ],
  },
  {
    key: "outras",
    label: "Outras Regiões",
    intro:
      "Atendemos também cidades da Grande São Paulo, interior e litoral paulista, levando equipe própria, frota completa e logística adequada para obras fora da capital com o mesmo padrão de qualidade.",
    bairros: [
      "Cajamar","Campinas","Aeroporto","Cumbica","Guarulhos","Jundiaí","Abc Paulista","Americana",
      "Araçariguama","Araraquara","Bauru","Bragança Paulista","Diadema","Embu Guaçu","Ferraz de Vasconcelos",
      "Franca","Franco da Rocha","Guarujá","Hortolândia","Indaiatuba","Itanhaém","Itaquaquecetuba","Itu",
      "Jacareí","Limeira","Marília","Mauá","Mogi das Cruzes","Mongaguá","Monte Mor","Peruíbe","Piracicaba",
      "Poá","Praia Grande","Presidente Prudente","Ribeirão Pires","Santo André","Santos",
      "São Bernardo do Campo","São Caetano do Sul","São Carlos","São José do Rio Preto","São José dos Campos",
      "São Vicente","Serra da Cantareira","Sorocaba","Suzano","Taubaté","Vargem Grande Paulista",
      "Vila Caiçara","Vinhedo",
    ],
  },
];

export function slugifyBairro(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface BairroEntry {
  name: string;
  slug: string;
  region: RegionInfo;
  path: string;
}

export const ALL_BAIRROS: BairroEntry[] = REGIONS.flatMap((r) =>
  r.bairros.map((name) => {
    const slug = slugifyBairro(name);
    return { name, slug, region: r, path: `/terraplanagem-${slug}` };
  })
);

export function findBairroBySlug(slug: string): BairroEntry | undefined {
  return ALL_BAIRROS.find((b) => b.slug === slug);
}
