// Serviços expandidos para landing pages locais (one-page por bairro/cidade).
// Cada item gera uma seção própria com H2 contendo a keyword + preposição correta.

import limpezaImg from "@/assets/limpeza-terreno.jpg";
import demolicaoImg from "@/assets/demolicao.jpg";
import escavacaoImg from "@/assets/escavacao.jpg";
import movimentacaoImg from "@/assets/movimentacao-terra.jpg";
import transporteImg from "@/assets/transporte-locacao.jpg";
import heroImg from "@/assets/hero-terraplanagem.jpg";

export interface LocalServiceTemplate {
  key: string;
  title: string; // ex: "Terraplanagem"
  image: string;
  alt: (loc: string) => string;
  linkTo: string; // rota interna
  paragraph: (loc: string, phrase: string, context: string) => string;
}

export const LOCAL_SERVICES: LocalServiceTemplate[] = [
  {
    key: "terraplanagem",
    title: "Terraplanagem",
    image: heroImg,
    alt: (loc) => `Serviço de terraplanagem ${loc} executado pela SMS Terraplenagem`,
    linkTo: "/servicos",
    paragraph: (loc, phrase, ctx) =>
      `A terraplanagem ${phrase} é indicada para terrenos que precisam de regularização, corte, aterro, adequação de nível ou preparação antes do início da obra. A SMS Terraplenagem atua com frota própria e equipe preparada para atender ${ctx}, ajudando a organizar o terreno para as próximas etapas da construção sem comprometer prazo e logística.`,
  },
  {
    key: "limpeza",
    title: "Limpeza de terreno",
    image: limpezaImg,
    alt: (loc) => `Limpeza de terreno ${loc} com remoção de vegetação e entulho`,
    linkTo: "/servicos/limpeza-de-terreno",
    paragraph: (loc, phrase, ctx) =>
      `A limpeza de terreno ${phrase} é uma etapa importante para liberar a área antes da movimentação de terra, demolição ou início da obra. O serviço envolve retirada de entulho, vegetação, resíduos e materiais que dificultam o acesso das máquinas ou comprometem o planejamento do canteiro. Atendemos ${ctx} com destinação adequada dos resíduos.`,
  },
  {
    key: "demolicao",
    title: "Demolição",
    image: demolicaoImg,
    alt: (loc) => `Demolição controlada ${loc} realizada com escavadeira hidráulica`,
    linkTo: "/servicos/demolicao",
    paragraph: (loc, phrase, ctx) =>
      `A demolição ${phrase} é executada de forma controlada, com escavadeiras hidráulicas equipadas com rompedor e equipe responsável pelo isolamento da área, retirada de entulho e limpeza final do terreno. Trabalhamos em ${ctx}, sempre priorizando segurança, organização do canteiro e respeito ao entorno.`,
  },
  {
    key: "nivelamento",
    title: "Nivelamento de terreno",
    image: movimentacaoImg,
    alt: (loc) => `Nivelamento de terreno ${loc} com motoniveladora e rolo compactador`,
    linkTo: "/servicos/movimentacao-de-terra-corte-e-aterro",
    paragraph: (loc, phrase, ctx) =>
      `O nivelamento de terreno ${phrase} prepara a área para receber fundações, estacionamentos, galpões ou áreas externas. Utilizamos motoniveladora, trator de esteira e rolo compactador para entregar o terreno na cota e na compactação previstas em projeto, evitando retrabalho nas etapas seguintes da obra ${ctx}.`,
  },
  {
    key: "movimentacao",
    title: "Movimentação de terra",
    image: escavacaoImg,
    alt: (loc) => `Movimentação de terra ${loc} com escavadeira e caminhões basculantes`,
    linkTo: "/servicos/movimentacao-de-terra-corte-e-aterro",
    paragraph: (loc, phrase, ctx) =>
      `A movimentação de terra ${phrase} envolve corte, aterro e transporte de material para ajustar a topografia do terreno conforme o projeto. Com caminhões basculantes próprios e escavadeiras de diferentes portes, conseguimos atender desde lotes urbanos até áreas maiores ${ctx}, com logística planejada para reduzir paradas na obra.`,
  },
  {
    key: "preparo",
    title: "Preparo de terreno para obra",
    image: transporteImg,
    alt: (loc) => `Preparo de terreno para obra ${loc} com frota da SMS Terraplenagem`,
    linkTo: "/servicos",
    paragraph: (loc, phrase, ctx) =>
      `O preparo de terreno para obra ${phrase} reúne todas as etapas anteriores ao início da construção: limpeza, demolição quando necessária, escavação, corte, aterro e compactação. A SMS organiza o cronograma dessas frentes de forma integrada, entregando o terreno pronto para receber a obra ${ctx}.`,
  },
];

// Contexto comercial por região (usado nos parágrafos das seções).
export const REGION_CONTEXT: Record<string, string> = {
  "zona-norte":
    "obras residenciais, comerciais e industriais em região com relevo acidentado, próximo à Serra da Cantareira",
  "centro":
    "obras de retrofit, reformas e adequação de terrenos em lotes urbanos compactos no Centro de São Paulo",
  "zona-oeste":
    "obras residenciais, comerciais e industriais em uma das regiões mais aquecidas da capital e da Grande SP",
  "zona-leste":
    "obras comerciais, industriais e logísticas em uma das regiões com maior volume de construção da capital",
  "zona-sul":
    "obras em bairros residenciais nobres, áreas comerciais e regiões industriais da Zona Sul",
  "outras":
    "obras comerciais, industriais e logísticas em cidades da Grande São Paulo e interior, com equipe e frota deslocadas para o local",
};

// FAQ dinâmica regional — usa preposição e nome local.
export function buildLocalFaq(name: string, phrase: string) {
  return [
    {
      q: `A SMS faz terraplanagem ${phrase}?`,
      a: `Sim. A SMS Terraplenagem atende obras ${phrase} e região com serviços de terraplanagem, movimentação de terra, nivelamento, limpeza de terreno e preparo de solo. O orçamento depende das condições do terreno, acesso, volume de material e tipo de obra.`,
    },
    {
      q: `A SMS atende obras comerciais e industriais ${phrase}?`,
      a: `Sim. Atendemos obras comerciais, industriais, galpões, estacionamentos e áreas externas ${phrase}, com frota própria adequada para diferentes portes de projeto.`,
    },
    {
      q: `Quanto custa terraplanagem ${phrase}?`,
      a: `O valor da terraplanagem ${phrase} depende do tamanho do terreno, das condições do solo, do volume de corte e aterro e da logística de acesso. Após a avaliação, enviamos um orçamento detalhado pelo WhatsApp, sem compromisso.`,
    },
    {
      q: `A SMS faz limpeza de terreno ${phrase}?`,
      a: `Sim. A limpeza de terreno ${phrase} inclui remoção de vegetação, entulho e resíduos, com descarte conforme as normas, deixando a área pronta para as próximas etapas da obra.`,
    },
    {
      q: `A SMS faz demolição ${phrase}?`,
      a: `Sim. Executamos demolição controlada ${phrase} com escavadeiras hidráulicas, isolamento da área, retirada de entulho e limpeza final do terreno.`,
    },
    {
      q: `A SMS atende bairros próximos de ${name}?`,
      a: `Sim. Além de ${name}, atendemos diversos bairros e cidades próximas com a mesma equipe e frota, facilitando deslocamento e prazo.`,
    },
    {
      q: `Como solicitar orçamento de terraplanagem ${phrase}?`,
      a: `Basta enviar uma mensagem pelo WhatsApp informando o endereço, tipo de obra e o que precisa ser feito (limpeza, demolição, nivelamento, movimentação de terra). Retornamos com a avaliação e o orçamento ${phrase}.`,
    },
    {
      q: `A SMS possui frota própria para atendimento ${phrase}?`,
      a: `Sim. Trabalhamos com escavadeiras, retroescavadeiras, motoniveladora, rolo compactador e caminhões basculantes próprios, o que dá mais controle de prazo no atendimento ${phrase}.`,
    },
  ];
}
