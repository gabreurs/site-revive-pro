// Perfis de localidade para gerar conteúdo realmente diferente em cada
// página /terraplanagem-<slug>. Cada perfil define introduções, textos por
// serviço, FAQ e contexto de obra próprios. O mapeamento NAME_TO_PROFILE
// associa cada bairro/cidade a um perfil. Slugs não mapeados caem em
// "residential" (padrão urbano).

export type ProfileKey =
  | "central"
  | "residential"
  | "corporativo"
  | "metropolitan"
  | "expansao"
  | "interior";

export interface FaqItem { q: string; a: string }

export interface LocationProfile {
  key: ProfileKey;
  h1Suffix: string;
  descSuffix: string;
  heroLead: (phrase: string) => string;
  introProfile: string;
  workContext: string;
  accessConcern: string;
  atendimento: string;
  service: {
    terraplanagem: (phrase: string) => string;
    limpeza: (phrase: string) => string;
    demolicao: (phrase: string) => string;
    nivelamento: (phrase: string) => string;
    movimentacao: (phrase: string) => string;
    preparo: (phrase: string) => string;
  };
  faq: (name: string, phrase: string) => FaqItem[];
}

const commonFaqPrice = (phrase: string) =>
  `O valor depende do tamanho da área, volume de terra a movimentar, necessidade de demolição, retirada de entulho, condições de acesso e tipo de equipamento. Por isso, o orçamento de terraplanagem ${phrase} é feito após uma avaliação do terreno e do escopo da obra.`;

export const PROFILES: Record<ProfileKey, LocationProfile> = {
  // ────────────────────────────────────────────────────────────
  central: {
    key: "central",
    h1Suffix: "com frota própria para obras comerciais, reformas e retrofits",
    descSuffix: "obras comerciais, reformas e terrenos urbanos",
    heroLead: (p) =>
      `Terraplanagem ${p} para obras comerciais, reformas e adequação de terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em serviços de movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.`,
    introProfile:
      "região urbana consolidada do Centro de São Paulo, com lotes compactos, prédios antigos, retrofits, demolições pontuais e adequação de imóveis em áreas já ocupadas",
    workContext:
      "obras comerciais, reformas estruturais, adequação de lotes urbanos, estacionamentos e pequenos empreendimentos",
    accessConcern:
      "planejamento de acesso de máquinas, retirada de entulho e organização do canteiro em vias urbanas com circulação intensa",
    atendimento: "Obras comerciais, reformas, demolições, terrenos urbanos e adequação de áreas",
    service: {
      terraplanagem: (p) =>
        `A terraplanagem ${p} costuma envolver lotes urbanos compactos, ruas estreitas e obras com restrições de horário. A SMS Terraplenagem planeja a operação levando em conta o acesso de máquinas, o tipo de imóvel já existente e a necessidade de remoção controlada de material. O serviço inclui regularização do terreno, pequenos cortes, ajustes de nível e preparação da área para a próxima etapa da obra, o que ajuda construtoras e proprietários a destravar projetos em regiões já adensadas do Centro de São Paulo.`,
      limpeza: (p) =>
        `A limpeza de terreno ${p} é especialmente comum em lotes urbanos com entulho acumulado, restos de reforma, mato e materiais deixados de obras anteriores. Nessa região, o serviço exige caçambas adequadas, retirada organizada e descarte conforme as normas, já que o acesso costuma ser limitado. A SMS executa a limpeza com equipe própria, deixando a área pronta para receber demolição, escavação ou início de uma nova fase da obra, sem comprometer a logística do entorno.`,
      demolicao: (p) =>
        `A demolição ${p} é, na maioria das vezes, demolição controlada de imóveis antigos, partes de prédios em retrofit ou estruturas internas em reformas. A SMS atua com escavadeira hidráulica equipada com rompedor, isolamento da área, controle de poeira e retirada de entulho em caçambas. Por se tratar de uma região central, o trabalho é planejado para reduzir impacto a vizinhos, comércio e via pública, mantendo a obra dentro do cronograma e em conformidade com as normas locais.`,
      nivelamento: (p) =>
        `O nivelamento de terreno ${p} é indicado para preparar pisos de estacionamento, áreas externas comerciais, terrenos onde será feita uma nova fundação ou pequenas áreas internas após demolição. Em lotes urbanos compactos do Centro, o serviço utiliza equipamentos compatíveis com o espaço disponível, garantindo a cota e a compactação previstas em projeto. Isso evita retrabalho nas fundações, pisos e acabamentos das próximas etapas da obra.`,
      movimentacao: (p) =>
        `A movimentação de terra ${p} envolve volumes menores quando comparada a obras industriais, mas exige logística cuidadosa: poucos caminhões por vez, janelas curtas de carga e descarga e respeito a vias movimentadas. A SMS combina escavadeira e caminhões basculantes próprios para fazer corte, aterro e remoção de material com previsibilidade, sem deixar a obra parada por falta de equipamento ou destinação adequada do solo.`,
      preparo: (p) =>
        `O preparo de terreno para obra ${p} exige atenção ao espaço disponível, acesso de máquinas e retirada organizada de materiais, especialmente em lotes urbanos, reformas, retrofits e adequações de imóveis já existentes. A SMS atua nessa etapa inicial reunindo limpeza, demolição quando necessária, escavação, corte, aterro, compactação e nivelamento. Com frota própria, é possível organizar melhor a sequência das frentes de trabalho e entregar uma área pronta para receber as próximas etapas da construção.`,
    },
    faq: (name, p) => [
      { q: `A SMS faz terraplanagem ${p}?`, a: `Sim. A SMS Terraplenagem atende ${p} com serviços de movimentação de terra, nivelamento, limpeza de terreno, demolição e preparo de solo. Por ser uma região urbana consolidada, a avaliação considera acesso ao terreno, retirada de materiais e condições para entrada de máquinas.` },
      { q: `A SMS atende reformas e retrofits ${p}?`, a: `Sim. A SMS pode atuar em etapas iniciais de reformas, retrofits e adequações de imóveis, especialmente quando há necessidade de demolição, remoção de entulho, limpeza da área ou preparação do terreno para uma nova fase da obra.` },
      { q: `Quanto custa terraplanagem ${p}?`, a: commonFaqPrice(p) },
      { q: `A SMS faz demolição controlada ${p}?`, a: `Sim. Trabalhamos com demolição controlada de imóveis antigos e estruturas internas ${p}, com escavadeira hidráulica equipada com rompedor, isolamento da área e retirada de entulho em caçambas, reduzindo impacto a vizinhos e via pública.` },
      { q: `Como a SMS lida com acesso difícil de máquinas ${p}?`, a: `O Centro tem ruas estreitas, vias movimentadas e horários restritos para caminhões. A SMS planeja janelas de carga e descarga, escolhe o porte de equipamento adequado ao lote e organiza a sequência de máquinas para não travar a obra nem a vizinhança.` },
      { q: `A SMS atende ${name} para obras comerciais e corporativas?`, a: `Sim. Atendemos obras comerciais, corporativas, lojas, edifícios em retrofit e estacionamentos ${p} e em bairros próximos do Centro de São Paulo.` },
      { q: `Como solicitar orçamento ${p}?`, a: `Basta enviar uma mensagem pelo WhatsApp com endereço, tipo de obra e o que precisa ser feito (limpeza, demolição, nivelamento, movimentação de terra). Retornamos com a avaliação e o orçamento ${p}.` },
    ],
  },

  // ────────────────────────────────────────────────────────────
  residential: {
    key: "residential",
    h1Suffix: "com frota própria para obras comerciais e terrenos urbanos",
    descSuffix: "obras comerciais e terrenos urbanos",
    heroLead: (p) =>
      `Terraplanagem ${p} para obras comerciais, residenciais e adequação de terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.`,
    introProfile:
      "região urbana de uso misto, com bairros residenciais consolidados, eixos comerciais ativos, terrenos para empreendimentos médios e necessidade frequente de adequação de áreas existentes",
    workContext:
      "obras comerciais, prediais, terrenos urbanos, estacionamentos, reformas estruturais e adequação de áreas em vias movimentadas",
    accessConcern:
      "acesso de máquinas em ruas residenciais e comerciais, controle de horário de operação e logística de caminhões em vias movimentadas",
    atendimento: "Obras comerciais, residenciais, estacionamentos, terrenos urbanos e adequação de áreas",
    service: {
      terraplanagem: (p) =>
        `A terraplanagem ${p} costuma atender lotes urbanos médios, terrenos para empreendimentos prediais, áreas comerciais e adequações em obras já em andamento. A SMS Terraplenagem atua com frota própria, ajustando o porte das máquinas ao tamanho do terreno e à condição da rua de acesso. O serviço prepara o solo para a próxima etapa da obra, com corte, aterro, regularização e compactação executados de forma coordenada para não comprometer a vizinhança e o cronograma da construção.`,
      limpeza: (p) =>
        `A limpeza de terreno ${p} envolve, com frequência, lotes que estão parados há tempos, terrenos com vegetação alta, entulho de obras anteriores e materiais descartados. A SMS faz a retirada com equipe própria, organização do canteiro, separação básica de resíduos e descarte conforme as normas. O resultado é uma área pronta para receber a próxima etapa, seja escavação, demolição complementar ou início direto da obra comercial ou residencial.`,
      demolicao: (p) =>
        `A demolição ${p} atende imóveis residenciais antigos, pequenos prédios comerciais, galpões em desuso e estruturas que precisam dar lugar a um novo empreendimento. O trabalho é feito com escavadeira hidráulica e rompedor, isolamento da área, retirada de entulho em caçambas e limpeza final do terreno. Em bairros movimentados, a SMS planeja a operação para reduzir ruído, poeira e impacto à vizinhança, sempre dentro das regras locais.`,
      nivelamento: (p) =>
        `O nivelamento de terreno ${p} é indicado para áreas que vão receber fundação, piso de estacionamento, área externa comercial, pátio, quadra ou base para galpão de pequeno e médio porte. Com motoniveladora, trator e rolo compactador, a SMS entrega o terreno na cota e na compactação previstas em projeto, evitando recalque, infiltração e retrabalho nas próximas etapas da obra.`,
      movimentacao: (p) =>
        `A movimentação de terra ${p} envolve volumes variáveis, dependendo do tipo de obra: terreno residencial, lote comercial ou área para empreendimento maior. A SMS combina escavadeira, retroescavadeira e caminhões basculantes próprios para executar corte, aterro e transporte com cronograma controlado. Isso reduz paradas na obra, melhora a previsibilidade dos prazos e ajuda a manter a produtividade do canteiro mesmo em bairros movimentados.`,
      preparo: (p) =>
        `O preparo de terreno para obra ${p} reúne limpeza, demolição quando necessária, escavação, corte, aterro, compactação e nivelamento da área. Em bairros residenciais e comerciais consolidados, o trabalho exige planejamento de acesso, escolha do porte das máquinas e organização da logística de caminhões. A SMS coordena essas frentes com frota própria, entregando o terreno pronto para receber fundação, piso ou estrutura do empreendimento.`,
    },
    faq: (name, p) => [
      { q: `A SMS faz terraplanagem ${p}?`, a: `Sim. Atendemos obras comerciais, residenciais e prediais ${p} com serviços de movimentação de terra, nivelamento, limpeza de terreno, demolição e preparo de solo. A avaliação considera tamanho do lote, acesso e condições do entorno.` },
      { q: `A SMS atende obras comerciais e prediais ${p}?`, a: `Sim. Atendemos lojas, prédios, salas comerciais, galpões de pequeno e médio porte, estacionamentos e adequações de áreas externas ${p} e bairros próximos.` },
      { q: `Quanto custa terraplanagem ${p}?`, a: commonFaqPrice(p) },
      { q: `A SMS faz limpeza de terreno ${p}?`, a: `Sim. A limpeza de terreno ${p} inclui remoção de vegetação, entulho e resíduos, com descarte conforme as normas, deixando a área pronta para a próxima etapa da obra.` },
      { q: `A SMS faz demolição ${p}?`, a: `Sim. Executamos demolição controlada ${p} de imóveis antigos, galpões e pequenas estruturas, com isolamento da área, escavadeira hidráulica com rompedor e retirada de entulho.` },
      { q: `A SMS atende bairros próximos de ${name}?`, a: `Sim. Além de ${name}, atendemos bairros vizinhos da mesma região, o que facilita deslocamento de máquinas, agilidade na visita técnica e melhor cronograma de obra.` },
      { q: `Como solicitar orçamento de terraplanagem ${p}?`, a: `Envie uma mensagem pelo WhatsApp com endereço, tipo de obra e descrição do serviço necessário. Retornamos com a avaliação e o orçamento ${p}.` },
    ],
  },

  // ────────────────────────────────────────────────────────────
  corporativo: {
    key: "corporativo",
    h1Suffix: "para obras comerciais, industriais e galpões",
    descSuffix: "obras comerciais, industriais, galpões e áreas corporativas",
    heroLead: (p) =>
      `Terraplanagem ${p} para obras comerciais, industriais, galpões e áreas corporativas é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.`,
    introProfile:
      "região com forte presença de condomínios empresariais, galpões logísticos, áreas industriais, terrenos maiores e obras corporativas que dependem de cronograma operacional bem planejado",
    workContext:
      "terrenos amplos, áreas externas, galpões, estacionamentos, pátios de manobra, obras corporativas e implantação de áreas industriais",
    accessConcern:
      "organização de máquinas pesadas, logística de entrada e saída de caminhões basculantes e controle do cronograma das frentes de obra",
    atendimento: "Obras corporativas, galpões, áreas industriais, estacionamentos e terrenos de maior porte",
    service: {
      terraplanagem: (p) =>
        `A terraplanagem ${p} costuma envolver áreas maiores: terrenos para galpões, condomínios empresariais, pátios, estacionamentos comerciais e obras industriais. A SMS Terraplenagem atua com escavadeiras de diferentes portes, motoniveladora, rolo compactador e caminhões basculantes próprios, ajustando a frota ao volume de corte e aterro previsto em projeto. O serviço é planejado em frentes simultâneas, com logística de caminhões e cronograma operacional definidos junto à construtora ou ao gestor do empreendimento.`,
      limpeza: (p) =>
        `A limpeza de terreno ${p} é uma etapa importante em áreas industriais, terrenos para galpões e lotes maiores que ficaram parados. O serviço inclui remoção de vegetação, retirada de entulho, demolição de pequenas estruturas remanescentes e organização do canteiro. A SMS executa com equipe própria e dimensiona caçambas, equipamentos e turnos conforme o volume da área, deixando o terreno pronto para topografia, marcação e início das frentes de movimentação de terra.`,
      demolicao: (p) =>
        `A demolição ${p} costuma atender galpões antigos, pequenas estruturas industriais, muros, lajes externas e construções que precisam dar lugar a uma nova implantação. O trabalho é feito de forma controlada, com escavadeira hidráulica equipada com rompedor, isolamento da área e retirada de entulho em caçambas. Em regiões empresariais, a operação é planejada para conviver com a rotina dos demais empreendimentos no entorno, mantendo segurança e prazo.`,
      nivelamento: (p) =>
        `O nivelamento de terreno ${p} é fundamental em obras corporativas e industriais, especialmente em áreas que vão receber piso de galpão, estacionamento, pátio de manobra ou base para estrutura metálica. A SMS utiliza motoniveladora, trator de esteira e rolo compactador para entregar a cota e a compactação previstas em projeto, evitando recalque, problemas no piso industrial e retrabalho na próxima etapa do empreendimento.`,
      movimentacao: (p) =>
        `A movimentação de terra ${p} envolve volumes maiores, com necessidade de cronograma firme de carga, transporte e descarte. A SMS combina escavadeiras, retroescavadeiras e frota própria de caminhões basculantes para sustentar o ritmo da obra. O planejamento define rotas de saída, janelas de operação e pontos de descarte, o que dá previsibilidade à construtora e reduz paradas no canteiro durante o corte, o aterro e a regularização da área.`,
      preparo: (p) =>
        `O preparo de terreno para obra ${p} costuma envolver áreas comerciais, corporativas, galpões, estacionamentos, condomínios e terrenos com maior exigência de planejamento operacional. A SMS atua na organização inicial da área com limpeza, movimentação de terra, nivelamento, demolição quando necessária e preparação do solo para as próximas etapas da construção. Contar com frota própria ajuda a controlar deslocamento de máquinas, retirada de materiais e sequência de execução no canteiro.`,
    },
    faq: (name, p) => [
      { q: `A SMS faz terraplanagem ${p} para galpões e obras comerciais?`, a: `Sim. A SMS Terraplenagem atende ${p} em obras comerciais, corporativas, galpões, estacionamentos, áreas industriais e pátios que precisam de movimentação de terra, nivelamento, limpeza de terreno ou preparo de solo.` },
      { q: `A SMS atende terrenos maiores ${p}?`, a: `Sim. Em regiões com áreas empresariais, condomínios, galpões e terrenos de maior porte, a frota própria da SMS ajuda a organizar a operação, o deslocamento de máquinas e o ritmo das frentes de obra.` },
      { q: `Quanto custa terraplanagem ${p}?`, a: commonFaqPrice(p) },
      { q: `A SMS faz movimentação de terra em volume alto ${p}?`, a: `Sim. Trabalhamos com escavadeiras e caminhões basculantes próprios, o que permite manter ritmo de carga, transporte e descarte adequado para obras industriais, galpões e condomínios empresariais ${p}.` },
      { q: `A SMS faz demolição de galpões e estruturas industriais ${p}?`, a: `Sim. Executamos demolição controlada de galpões antigos, muros, lajes externas e pequenas estruturas industriais ${p}, com escavadeira hidráulica equipada com rompedor, isolamento da área e retirada de entulho.` },
      { q: `A SMS atende empresas e construtoras ${p}?`, a: `Sim. Trabalhamos com construtoras, gerenciadoras e empresas que precisam de previsibilidade no cronograma de terraplanagem ${p}, com contato direto, frota própria e equipe técnica para acompanhar a obra.` },
      { q: `Como solicitar orçamento de terraplanagem ${p}?`, a: `Envie uma mensagem pelo WhatsApp com endereço da obra, tipo de empreendimento e escopo (limpeza, demolição, movimentação, nivelamento). Retornamos com a avaliação e o orçamento ${p}.` },
    ],
  },

  // ────────────────────────────────────────────────────────────
  metropolitan: {
    key: "metropolitan",
    h1Suffix: "para obras comerciais e industriais na Grande São Paulo",
    descSuffix: "obras comerciais e industriais na Região Metropolitana",
    heroLead: (p) =>
      `Terraplanagem ${p} para obras comerciais e industriais é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo na Região Metropolitana de São Paulo.`,
    introProfile:
      "cidade da Região Metropolitana de São Paulo, com mistura de áreas industriais, comerciais, residenciais e terrenos para novos empreendimentos que demandam terraplanagem com deslocamento de frota e planejamento de cronograma",
    workContext:
      "obras comerciais e industriais, galpões, áreas externas, terrenos urbanos médios e empreendimentos novos em municípios da Grande São Paulo",
    accessConcern:
      "deslocamento da frota até a cidade, logística de caminhões basculantes, planejamento de visita técnica e cronograma alinhado ao gestor da obra",
    atendimento: "Obras comerciais, industriais, prediais e terrenos urbanos na Grande São Paulo",
    service: {
      terraplanagem: (p) =>
        `A terraplanagem ${p} atende obras comerciais e industriais em municípios da Grande São Paulo, com necessidade de deslocamento da frota e planejamento de cronograma. A SMS Terraplenagem combina escavadeiras, motoniveladora, rolo e caminhões basculantes próprios para atuar em terrenos médios e grandes, fazendo corte, aterro, regularização e compactação. O trabalho é planejado em conjunto com a construtora ou o gestor para reduzir paradas, manter previsibilidade e entregar a área pronta para as próximas etapas.`,
      limpeza: (p) =>
        `A limpeza de terreno ${p} envolve áreas em diferentes condições: lotes parados, terrenos com vegetação alta, restos de obras antigas e materiais acumulados. A SMS organiza a operação de acordo com o volume, define caçambas, equipamentos e equipe necessária e executa o descarte conforme as normas. Em cidades da Grande São Paulo, isso significa uma área pronta para topografia, demolição complementar ou início de movimentação de terra sem improviso.`,
      demolicao: (p) =>
        `A demolição ${p} atende imóveis antigos, pequenas estruturas comerciais, galpões e construções que precisam dar lugar a um novo empreendimento na Grande SP. A SMS atua com escavadeira hidráulica e rompedor, isolamento da área, retirada de entulho em caçambas e limpeza final do terreno. O cronograma é planejado em conjunto com a obra, considerando deslocamento da equipe e janelas de operação na cidade.`,
      nivelamento: (p) =>
        `O nivelamento de terreno ${p} é indicado para áreas que vão receber fundação, piso de galpão, estacionamento, pátio ou base de estrutura. Com motoniveladora, trator de esteira e rolo compactador, a SMS entrega o terreno na cota e na compactação de projeto. Em cidades da Região Metropolitana, esse serviço dá segurança ao piso e à fundação do empreendimento, evitando recalque e retrabalho nas próximas etapas.`,
      movimentacao: (p) =>
        `A movimentação de terra ${p} envolve corte, aterro e transporte de material em diferentes volumes. A frota própria de caminhões basculantes da SMS dá ritmo à operação, com planejamento de rotas, janelas de descarga e pontos de descarte. Esse controle ajuda construtoras e empresas que tocam obras na Grande São Paulo a manter o cronograma e reduzir custos com paralisação ou contratações emergenciais de transporte.`,
      preparo: (p) =>
        `O preparo de terreno para obra ${p} reúne limpeza, demolição quando necessária, escavação, corte, aterro, compactação e nivelamento. Em cidades da Grande São Paulo, esse trabalho exige deslocamento planejado da equipe, escolha de máquinas adequadas ao porte do empreendimento e logística de caminhões. A SMS coordena essas frentes com frota própria, entregando o terreno pronto para receber a fundação, o piso ou a estrutura do projeto.`,
    },
    faq: (name, p) => [
      { q: `A SMS faz terraplanagem ${p}?`, a: `Sim. Atendemos obras comerciais, industriais e empreendimentos novos ${p} com movimentação de terra, nivelamento, limpeza de terreno, demolição e preparo de solo. A frota própria facilita o deslocamento e o cronograma da obra.` },
      { q: `A SMS atende obras industriais e galpões ${p}?`, a: `Sim. Trabalhamos em terrenos para galpões, áreas industriais, condomínios empresariais e estacionamentos ${p}, com equipamentos adequados ao porte do empreendimento.` },
      { q: `Quanto custa terraplanagem ${p}?`, a: commonFaqPrice(p) },
      { q: `A SMS atende construtoras e gerenciadoras ${p}?`, a: `Sim. Atendemos construtoras, gerenciadoras e empresas que tocam obras na Grande São Paulo, com contato direto, frota própria e cronograma alinhado ao gestor da obra ${p}.` },
      { q: `A SMS faz demolição ${p}?`, a: `Sim. Executamos demolição controlada ${p} de imóveis antigos, galpões e pequenas estruturas comerciais, com isolamento da área, escavadeira hidráulica equipada com rompedor e retirada de entulho.` },
      { q: `A SMS atende cidades vizinhas de ${name}?`, a: `Sim. Além de ${name}, atendemos cidades próximas da Região Metropolitana, o que facilita deslocamento de máquinas, agilidade na visita técnica e melhor planejamento da obra.` },
      { q: `Como solicitar orçamento de terraplanagem ${p}?`, a: `Envie uma mensagem pelo WhatsApp com endereço, tipo de obra e escopo dos serviços. Retornamos com a avaliação e o orçamento ${p}.` },
    ],
  },

  // ────────────────────────────────────────────────────────────
  expansao: {
    key: "expansao",
    h1Suffix: "para terrenos em expansão, obras comerciais e residenciais",
    descSuffix: "terrenos em expansão, obras comerciais e residenciais",
    heroLead: (p) =>
      `Terraplanagem ${p} para terrenos em expansão, obras comerciais e residenciais é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.`,
    introProfile:
      "região de expansão urbana de São Paulo, com terrenos maiores, lotes em formação, obras residenciais e comerciais em crescimento e necessidade frequente de corte, aterro e limpeza de áreas mais amplas",
    workContext:
      "terrenos em expansão, obras residenciais e comerciais médias, áreas externas, preparação de lotes e limpeza de terrenos parados",
    accessConcern:
      "acesso por vias secundárias, planejamento de entrada de máquinas pesadas e retirada de material em áreas com menor infraestrutura urbana",
    atendimento: "Obras residenciais e comerciais, terrenos em expansão, áreas externas e preparação de lotes",
    service: {
      terraplanagem: (p) =>
        `A terraplanagem ${p} costuma envolver terrenos maiores, áreas em expansão urbana e lotes com relevo irregular, em obras residenciais, comerciais e pequenos empreendimentos. A SMS Terraplenagem atua com frota própria — escavadeira, retroescavadeira, motoniveladora, rolo e caminhões basculantes — fazendo corte, aterro, regularização e compactação dentro do volume previsto em projeto. O serviço é planejado considerando o acesso por vias secundárias e a logística de entrada de máquinas pesadas na região.`,
      limpeza: (p) =>
        `A limpeza de terreno ${p} atende lotes que ficaram parados, terrenos com vegetação alta, entulho e materiais acumulados. Em áreas de expansão urbana, esse serviço é o primeiro passo para destravar a obra. A SMS executa com equipe própria, retirando vegetação, fazendo capina, removendo resíduos e organizando o canteiro, com descarte conforme as normas. O terreno fica pronto para a próxima etapa, seja topografia, demolição complementar ou início da movimentação de terra.`,
      demolicao: (p) =>
        `A demolição ${p} atende pequenas construções, muros, lajes, galpões antigos e estruturas que precisam dar lugar a uma nova obra. O trabalho é executado de forma controlada, com escavadeira hidráulica equipada com rompedor, isolamento da área, retirada de entulho em caçambas e limpeza final do terreno. Em regiões de expansão, o serviço costuma vir junto com a limpeza do lote e a preparação para o início da nova construção.`,
      nivelamento: (p) =>
        `O nivelamento de terreno ${p} prepara a área para receber fundação, piso, área externa, pátio ou base de estrutura. A SMS utiliza motoniveladora, trator de esteira e rolo compactador para entregar a cota e a compactação previstas em projeto, mesmo em terrenos maiores ou com relevo irregular comum em áreas em expansão. Isso evita recalque, infiltração e retrabalho nas próximas etapas da obra.`,
      movimentacao: (p) =>
        `A movimentação de terra ${p} costuma envolver volumes médios e grandes, com corte e aterro para nivelar lotes maiores em região em expansão urbana. A frota própria de caminhões basculantes da SMS sustenta o ritmo da operação, com planejamento de rotas, janelas de carga e descarga e pontos de descarte. Isso reduz paradas no canteiro e dá previsibilidade ao prazo da obra residencial ou comercial.`,
      preparo: (p) =>
        `O preparo de terreno para obra ${p} reúne limpeza, demolição quando necessária, escavação, corte, aterro, compactação e nivelamento. Em regiões de expansão urbana, esse serviço atende lotes maiores, terrenos parados há tempos e obras residenciais ou comerciais que precisam destravar. A SMS coordena as frentes com frota própria, entregando o terreno pronto para fundação, piso ou estrutura.`,
    },
    faq: (name, p) => [
      { q: `A SMS faz terraplanagem ${p}?`, a: `Sim. Atendemos terrenos em expansão urbana, obras residenciais e comerciais ${p} com movimentação de terra, nivelamento, limpeza, demolição e preparo de solo.` },
      { q: `A SMS atende terrenos maiores ${p}?`, a: `Sim. Em regiões de expansão, é comum encontrar lotes maiores e áreas irregulares. A SMS tem frota e equipe adequadas para esse tipo de terreno ${p}.` },
      { q: `Quanto custa terraplanagem ${p}?`, a: commonFaqPrice(p) },
      { q: `A SMS faz limpeza de lotes parados ${p}?`, a: `Sim. A limpeza de terreno ${p} inclui retirada de vegetação alta, entulho, resíduos e materiais acumulados, com descarte conforme as normas, deixando o lote pronto para iniciar a obra.` },
      { q: `A SMS faz corte e aterro ${p}?`, a: `Sim. Executamos corte e aterro ${p} com escavadeiras e caminhões basculantes próprios, mantendo cronograma e previsibilidade na obra.` },
      { q: `A SMS atende bairros próximos de ${name}?`, a: `Sim. Além de ${name}, atendemos bairros vizinhos da região de expansão, o que facilita deslocamento de máquinas e planejamento da obra.` },
      { q: `Como solicitar orçamento de terraplanagem ${p}?`, a: `Envie uma mensagem pelo WhatsApp com endereço, tipo de obra e escopo dos serviços. Retornamos com a avaliação e o orçamento ${p}.` },
    ],
  },

  // ────────────────────────────────────────────────────────────
  interior: {
    key: "interior",
    h1Suffix: "para obras comerciais e industriais em cidades fora da capital",
    descSuffix: "obras comerciais e industriais em cidades do interior e litoral paulista",
    heroLead: (p) =>
      `Terraplanagem ${p} para obras comerciais e industriais é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo, com deslocamento programado para cidades fora da capital.`,
    introProfile:
      "cidade fora da Região Metropolitana, onde a SMS Terraplenagem atua com deslocamento programado de equipe e frota para atender obras comerciais, industriais e empreendimentos de maior porte",
    workContext:
      "obras comerciais e industriais, galpões, condomínios, áreas externas, empreendimentos novos e preparação de áreas em cidades do interior e litoral",
    accessConcern:
      "deslocamento da equipe e da frota, planejamento de cronograma, escolha de equipamentos compatíveis com o porte da obra e logística de caminhões",
    atendimento: "Obras comerciais, industriais e empreendimentos médios e grandes fora da capital",
    service: {
      terraplanagem: (p) =>
        `A terraplanagem ${p} é atendida pela SMS Terraplenagem com deslocamento programado de equipe e frota para fora da capital. O serviço atende terrenos médios e grandes, com corte, aterro, regularização e compactação executados conforme o projeto. O planejamento considera o tempo de deslocamento, a sequência das frentes e o cronograma do empreendimento, mantendo previsibilidade para a construtora ou o gestor da obra.`,
      limpeza: (p) =>
        `A limpeza de terreno ${p} atende lotes maiores e áreas que ficaram paradas, com retirada de vegetação, entulho e resíduos. A SMS organiza a operação dimensionando equipe, caçambas e equipamentos conforme o volume, com descarte conforme as normas. É a primeira etapa antes da topografia, da demolição complementar ou do início da movimentação de terra.`,
      demolicao: (p) =>
        `A demolição ${p} atende imóveis antigos, galpões e pequenas estruturas em obras de implantação ou ampliação de empreendimentos. O serviço é feito com escavadeira hidráulica equipada com rompedor, isolamento da área, retirada de entulho em caçambas e limpeza final do terreno, com cronograma compatível com o deslocamento da equipe até a cidade.`,
      nivelamento: (p) =>
        `O nivelamento de terreno ${p} é indicado para áreas que vão receber fundação, piso de galpão, estacionamento, pátio ou base de estrutura. A SMS utiliza motoniveladora, trator de esteira e rolo compactador para entregar o terreno na cota e na compactação previstas em projeto, mantendo segurança e durabilidade do piso e da fundação.`,
      movimentacao: (p) =>
        `A movimentação de terra ${p} envolve corte, aterro e transporte de material, em volumes variáveis. A frota própria de caminhões basculantes da SMS dá ritmo à operação, com rotas planejadas e pontos de descarte definidos. Isso é especialmente importante em obras fora da capital, onde a logística de transporte costuma pesar no cronograma.`,
      preparo: (p) =>
        `O preparo de terreno para obra ${p} reúne limpeza, demolição quando necessária, escavação, corte, aterro, compactação e nivelamento, com a equipe e a frota deslocadas para o local. A SMS organiza as frentes em conjunto com a construtora, entregando o terreno pronto para fundação, piso ou estrutura do empreendimento.`,
    },
    faq: (name, p) => [
      { q: `A SMS faz terraplanagem ${p}?`, a: `Sim. A SMS Terraplenagem atende ${p} com deslocamento programado de equipe e frota própria, em serviços de movimentação de terra, nivelamento, limpeza, demolição e preparo de solo.` },
      { q: `A SMS atende obras industriais e galpões ${p}?`, a: `Sim. Trabalhamos em terrenos para galpões, áreas industriais e empreendimentos comerciais ${p}, com equipamentos compatíveis com o porte da obra.` },
      { q: `Quanto custa terraplanagem ${p}?`, a: commonFaqPrice(p) },
      { q: `A SMS desloca equipe e frota até ${name}?`, a: `Sim. Para obras fora da capital, a SMS planeja o deslocamento da equipe e da frota com base no cronograma e no porte do empreendimento ${p}.` },
      { q: `A SMS atende construtoras e gerenciadoras ${p}?`, a: `Sim. Trabalhamos com construtoras, gerenciadoras e empresas que tocam obras fora da Grande São Paulo, com contato direto e cronograma alinhado.` },
      { q: `A SMS faz limpeza e demolição ${p}?`, a: `Sim. Executamos limpeza de terreno, demolição controlada e retirada de entulho ${p}, com escavadeira hidráulica equipada com rompedor e equipe própria.` },
      { q: `Como solicitar orçamento de terraplanagem ${p}?`, a: `Envie uma mensagem pelo WhatsApp com endereço, tipo de obra e escopo dos serviços. Retornamos com a avaliação e o orçamento ${p}.` },
    ],
  },
};

// Mapeamento NOME → perfil. Nomes não listados caem em "residential".
const PROFILE_BY_NAME: Record<string, ProfileKey> = {
  // Central
  "Aclimação": "central", "Anhanguera": "expansao", "Bela Vista": "central", "Bom Retiro": "central",
  "Brás": "central", "Cambuci": "central", "Campos Elíseos": "central", "Consolação": "central",
  "Higienópolis": "central", "Jardins": "central", "Liberdade": "central", "Pacaembu": "central",
  "Pari": "central", "República": "central", "Santa Cecília": "central", "Santa Efigênia": "central",
  "Sé": "central", "Vila Buarque": "central", "Avenida Paulista": "central",

  // Residential / urbano de uso misto
  "Tatuapé": "residential", "Mooca": "residential", "Ipiranga": "residential", "Santana": "residential",
  "Butantã": "residential", "Morumbi": "residential", "Pinheiros": "residential", "Perdizes": "residential",
  "Vila Madalena": "residential", "Lapa": "residential", "Vila Mariana": "residential", "Moema": "residential",
  "Saúde": "residential", "Vila Olímpia": "residential", "Itaim Bibi": "residential", "Brooklin": "residential",
  "Campo Belo": "residential", "Jabaquara": "residential", "Vila Sônia": "residential", "Penha": "residential",
  "Vila Carrão": "residential", "Vila Formosa": "residential", "Jardim Anália Franco": "residential",
  "Belém": "residential", "Vila Prudente": "residential", "Vila Matilde": "residential",
  "Alto da Lapa": "residential", "Alto de Pinheiros": "residential", "Pompéia": "residential",
  "Vila Leopoldina": "residential", "Vila Romana": "residential", "Barra Funda": "residential",
  "Água Branca": "residential", "Jardim América": "residential", "Jardim Europa": "residential",
  "Cidade Jardim": "residential", "Ibirapuera": "residential", "Paraíso": "residential",
  "Vila Nova Conceição": "residential", "Vila Clementino": "residential", "Vila Gumercindo": "residential",
  "Mirandópolis": "residential", "Chácara Klabin": "residential", "Bosque da Saúde": "residential",
  "Casa Verde": "residential", "Mandaqui": "residential", "Tucuruvi": "residential", "Tremembé": "residential",
  "Água Fria": "residential", "Parada Inglesa": "residential", "Imirim": "residential",
  "Vila Maria": "residential", "Vila Guilherme": "residential", "Horto Florestal": "residential",

  // Industrial / logística
  "Alphaville": "corporativo", "Barueri": "corporativo", "Cajamar": "corporativo", "Osasco": "corporativo",
  "Cumbica": "corporativo", "Aeroporto": "corporativo", "Santana de Parnaíba": "corporativo",
  "Jaguaré": "corporativo", "Presidente Altino": "corporativo", "Vila Jaguara": "corporativo",
  "Vila dos Remédios": "corporativo", "Carapicuíba": "corporativo",

  // Metropolitana
  "Guarulhos": "metropolitan", "Santo André": "metropolitan", "São Bernardo do Campo": "metropolitan",
  "São Caetano do Sul": "metropolitan", "Diadema": "metropolitan", "Mauá": "metropolitan",
  "Ribeirão Pires": "metropolitan", "Taboão da Serra": "metropolitan", "Embu das Artes": "metropolitan",
  "Embu Guaçu": "metropolitan", "Suzano": "metropolitan", "Mogi das Cruzes": "metropolitan",
  "Itaquaquecetuba": "metropolitan", "Ferraz de Vasconcelos": "metropolitan", "Poá": "metropolitan",
  "Itapevi": "metropolitan", "Jandira": "metropolitan", "Franco da Rocha": "metropolitan",
  "Cotia": "metropolitan", "Granja Viana": "metropolitan", "Vargem Grande Paulista": "metropolitan",
  "Itapecerica da Serra": "metropolitan", "Abc Paulista": "metropolitan",

  // Peripheral / expansão
  "Perus": "expansao", "Pirituba": "expansao", "Jaraguá": "expansao", "Brasilândia": "expansao",
  "Freguesia do Ó": "expansao", "Bairro do Limão": "expansao", "Vila Nova Cachoeirinha": "expansao",
  "Lauzane Paulista": "expansao", "Jardim Peri Peri": "expansao", "Jaçanã": "expansao",
  "Vila Medeiros": "expansao", "José Bonifácio": "expansao", "Santa Terezinha": "expansao",
  "Cidade Tiradentes": "expansao", "Itaim Paulista": "expansao", "Guaianases": "expansao",
  "São Miguel Paulista": "expansao", "São Mateus": "expansao", "Itaquera": "expansao",
  "Cidade Líder": "expansao", "Cidade Patriarca": "expansao", "Ermelino Matarazzo": "expansao",
  "Arthur Alvim": "expansao", "Iguatemi": "expansao", "Americanópolis": "expansao",
  "Cangaíba": "expansao", "Jardim Helena": "expansao", "Parque do Carmo": "expansao",
  "Ponte Rasa": "expansao", "São Lucas": "expansao", "Sapopemba": "expansao",
  "Vila Curuçá": "expansao", "Vila Jacuí": "expansao", "Jardim Aricanduva": "expansao",
  "Vila Zelina": "expansao", "Lajeado": "expansao",
  "Parelheiros": "expansao", "Marsilac": "expansao", "Grajaú": "expansao", "M'Boi Mirim": "expansao",
  "Capão Redondo": "expansao", "Campo Limpo": "expansao", "Jardim Ângela": "expansao",
  "Jardim São Luís": "expansao", "Cidade Ademar": "expansao", "Cidade Dutra": "expansao",
  "Cidade Avelino": "expansao", "Capela do Socorro": "expansao", "Pedreira": "expansao",
  "Heliópolis": "expansao", "Paraisópolis": "expansao", "Jurubatuba": "expansao",
  "Interlagos": "expansao", "Água Funda": "expansao", "Cursino": "expansao",
  "Sacomã": "expansao", "Vila Andrade": "expansao", "Vila Mascote": "expansao",
  "Vila das Mêrces": "expansao", "Vila Santa Catarina": "expansao", "Panamby": "expansao",
  "Real Parque": "expansao", "São Judas": "expansao", "São Rafael": "expansao",
  "Alto da Boa Vista": "expansao", "Chácara Flora": "expansao", "Chácara Santo Antônio": "expansao",
  "Granja Julieta": "expansao", "Horto do Ipê": "expansao", "Jardim Ipanema": "expansao",
  "Jardim Marajoara": "expansao", "Jardim Paulista": "expansao", "Jardim Sul": "expansao",
  "Campo Grande": "expansao", "Santo Amaro": "residential",
  "Sumaré": "expansao", "Rio Pequeno": "expansao", "Caxingui": "expansao",
  "Raposo Tavares": "expansao", "Quitaúna": "expansao", "Parque dos Príncipes": "expansao",
  "Parque São Domingos": "expansao", "Amador Bueno": "expansao", "Vila São Francisco": "expansao",

  // Interior / litoral / fora da Grande SP
  "Campinas": "interior", "Jundiaí": "interior", "Sorocaba": "interior", "Indaiatuba": "interior",
  "Hortolândia": "interior", "Vinhedo": "interior", "Bauru": "interior", "Marília": "interior",
  "Araraquara": "interior", "Limeira": "interior", "Piracicaba": "interior", "Bragança Paulista": "interior",
  "Americana": "interior", "Araçariguama": "interior", "Franca": "interior", "Itu": "interior",
  "Jacareí": "interior", "Monte Mor": "interior", "Presidente Prudente": "interior",
  "São Carlos": "interior", "São José do Rio Preto": "interior", "São José dos Campos": "interior",
  "Taubaté": "interior",
  // Litoral
  "Santos": "interior", "Praia Grande": "interior", "Guarujá": "interior", "São Vicente": "interior",
  "Itanhaém": "interior", "Mongaguá": "interior", "Peruíbe": "interior", "Vila Caiçara": "interior",
  "Serra da Cantareira": "expansao",
};

export function getProfileByName(name: string, regionKey?: string): LocationProfile {
  const explicit = PROFILE_BY_NAME[name];
  if (explicit) return PROFILES[explicit];
  if (regionKey === "outras") return PROFILES.metropolitan;
  if (regionKey === "centro") return PROFILES.central;
  return PROFILES.residential;
}

export function googleMapsLink(name: string, city: string): string {
  const q = encodeURIComponent(`${name} ${city}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

// ────────────────────────────────────────────────────────────
// VARIANTES POR SERVIÇO — quebram a duplicação dentro de cada perfil.
// Escolha determinística por slug (mesmo slug sempre vê o mesmo texto),
// porém slugs diferentes do mesmo perfil tendem a ver textos diferentes.

type ServiceKeyLocal = "terraplanagem" | "limpeza" | "demolicao" | "nivelamento" | "movimentacao" | "preparo";
type ServiceFnLocal = (phrase: string) => string;

const SERVICE_VARIANTS_B: Record<ProfileKey, Record<ServiceKeyLocal, ServiceFnLocal>> = {
  central: {
    terraplanagem: (p) => `Fazer terraplanagem ${p} costuma exigir mais planejamento do que máquina. A SMS combina escavadeira de porte adequado, retirada de entulho em caçambas e cronograma compatível com a rotina do entorno — comércio, residências e via pública dividindo o mesmo quarteirão. O serviço entrega o terreno regularizado, com cota e compactação prontas para fundação, piso ou nova estrutura.`,
    limpeza: (p) => `Em lotes do Centro, a limpeza de terreno ${p} resolve um problema clássico: imóvel parado, vegetação crescida, resto de reforma e materiais largados que travam qualquer evolução da obra. A SMS chega com equipe, faz a triagem, retira o que precisa sair e devolve o terreno limpo, com descarte em local autorizado e sem confusão com a vizinhança.`,
    demolicao: (p) => `A demolição ${p} normalmente é parcial — uma laje interna, um anexo, um muro, um trecho de prédio em retrofit. A SMS atua com escavadeira hidráulica e rompedor, isola a frente de trabalho, controla poeira com umidificação e remove o entulho em caçambas no mesmo dia, mantendo a operação dentro do horário permitido para a região.`,
    nivelamento: (p) => `Para nivelamento de terreno ${p} em pequenos lotes urbanos, o ganho vem da máquina certa: motoniveladora compacta, rolo adequado ao espaço e equipe que entende o projeto. A SMS entrega a cota prevista, com compactação que segura piso, estacionamento ou base de fundação sem recalque depois.`,
    movimentacao: (p) => `Movimentar terra ${p} significa girar caminhão em rua movimentada, respeitar janelas de carga e descarga e evitar interferir no fluxo. A SMS opera com frota própria de basculantes, programa as viagens e mantém o canteiro alimentado sem acumular caçamba na calçada.`,
    preparo: (p) => `O preparo de terreno para obra ${p} junta tudo o que vem antes da fundação: limpar, demolir o que precisa sair, escavar, cortar, aterrar e nivelar. Em lotes centrais, a vantagem é coordenar essas frentes na mesma equipe — menos terceiros, menos repasse, mais previsibilidade.`,
  },
  residential: {
    terraplanagem: (p) => `A terraplanagem ${p} costuma atender obra residencial ou comercial em rua movimentada, com vizinhos próximos e cronograma curto. A SMS dimensiona a máquina ao lote, coordena entrada e saída de caminhão e executa corte, aterro e regularização sem deixar a obra parada esperando equipamento.`,
    limpeza: (p) => `Limpeza de terreno ${p} costuma vir antes da topografia ou da fundação. A SMS retira vegetação, entulho de reforma anterior e materiais soltos, organiza o canteiro e entrega o lote pronto para a próxima etapa, com descarte conforme as normas.`,
    demolicao: (p) => `A demolição ${p} atende casa antiga, comércio fechado ou pequeno galpão que vai dar lugar a um empreendimento novo. O serviço é planejado para reduzir ruído, poeira e impacto na vizinhança, com escavadeira hidráulica equipada com rompedor e retirada de entulho organizada.`,
    nivelamento: (p) => `Nivelamento de terreno ${p} aparece quando o lote vai receber fundação, piso de estacionamento, área externa comercial ou base para galpão. A SMS entrega a cota e a compactação previstas em projeto, evitando recalque e retrabalho na fundação.`,
    movimentacao: (p) => `A movimentação de terra ${p} é executada com escavadeira e caminhão basculante próprios. Isso permite ajustar o ritmo das viagens ao cronograma da obra, mantendo o canteiro produtivo e evitando paradas por falta de equipamento.`,
    preparo: (p) => `Preparar terreno para obra ${p} envolve limpeza, demolição quando necessária, escavação, corte, aterro e nivelamento. A SMS coordena essas frentes com frota própria, entregando a área pronta para fundação, piso ou estrutura do empreendimento.`,
  },
  corporativo: {
    terraplanagem: (p) => `A terraplanagem ${p} costuma atender áreas maiores — galpão, condomínio empresarial, estacionamento corporativo, pátio de manobra. A SMS atua com frota de diferentes portes, abre frentes simultâneas e mantém ritmo de corte, aterro e regularização compatível com o cronograma do empreendimento.`,
    limpeza: (p) => `Limpeza de terreno ${p} antes de uma implantação corporativa exige equipe e volume. A SMS dimensiona caçambas, máquinas e turnos conforme a área, retira vegetação e restos de estruturas antigas e devolve o lote pronto para topografia e marcação.`,
    demolicao: (p) => `A demolição ${p} normalmente envolve galpão antigo, muro perimetral, laje externa ou estrutura que vai dar lugar a uma nova implantação. O trabalho é controlado, com escavadeira hidráulica e rompedor, isolamento da área e retirada de entulho dentro da janela combinada com o gestor.`,
    nivelamento: (p) => `Nivelamento de terreno ${p} é etapa crítica em piso de galpão, pátio e base de estrutura metálica. A SMS entrega cota e compactação previstas em projeto, com motoniveladora, trator de esteira e rolo, evitando recalque no piso industrial.`,
    movimentacao: (p) => `Movimentação de terra ${p} em obra corporativa exige cronograma firme: rota planejada, janela de descarga definida, ponto de descarte combinado. A frota própria da SMS dá previsibilidade ao corte, ao aterro e à retirada do material.`,
    preparo: (p) => `O preparo de terreno para obra ${p} costuma envolver áreas amplas, condomínios e empreendimentos com maior exigência de planejamento. A SMS organiza limpeza, demolição, movimentação de terra e nivelamento como frentes coordenadas, entregando a área pronta para a próxima etapa.`,
  },
  metropolitan: {
    terraplanagem: (p) => `A terraplanagem ${p} atende obra comercial e industrial em municípios da Grande SP. A SMS desloca equipe e frota com cronograma definido, opera em terreno médio e grande e executa corte, aterro, regularização e compactação conforme o projeto, mantendo previsibilidade para a construtora.`,
    limpeza: (p) => `Limpeza de terreno ${p} costuma envolver lote parado, vegetação alta e material acumulado. A SMS dimensiona equipe e caçambas conforme o volume, retira o que precisa sair e descarta conforme as normas, deixando a área pronta para a próxima etapa.`,
    demolicao: (p) => `A demolição ${p} atende imóvel antigo, galpão ou pequena estrutura comercial que vai dar lugar a um novo empreendimento. Trabalhamos com escavadeira hidráulica e rompedor, isolamento da frente, retirada de entulho e limpeza final do terreno.`,
    nivelamento: (p) => `Nivelamento de terreno ${p} prepara fundação, piso de galpão, estacionamento ou base de estrutura. A SMS entrega cota e compactação previstas em projeto, dando segurança ao piso e à fundação do empreendimento.`,
    movimentacao: (p) => `Movimentação de terra ${p} envolve corte, aterro e transporte em volume variável. A frota própria de basculantes sustenta o ritmo, com rota e ponto de descarte planejados — fator que pesa especialmente em obras fora da capital.`,
    preparo: (p) => `O preparo de terreno para obra ${p} reúne limpeza, demolição, escavação, corte, aterro, compactação e nivelamento. A SMS coordena as frentes com equipe deslocada, entregando o lote pronto para fundação, piso ou estrutura.`,
  },
  expansao: {
    terraplanagem: (p) => `Terraplanagem ${p} envolve, com frequência, terreno maior e relevo irregular. A SMS atua com escavadeira, retroescavadeira, motoniveladora, rolo e basculantes próprios, fazendo corte, aterro e regularização dentro do volume previsto em projeto, com acesso planejado por vias secundárias.`,
    limpeza: (p) => `Limpeza de terreno ${p} costuma ser o primeiro passo para destravar a obra: vegetação alta, entulho, materiais largados. A SMS executa a retirada com equipe e descarte conforme as normas, entregando o lote pronto para topografia ou movimentação de terra.`,
    demolicao: (p) => `A demolição ${p} atende pequena construção, muro, laje, galpão antigo ou estrutura que precisa sair antes da nova obra. O trabalho é controlado, com escavadeira hidráulica e rompedor, isolamento e retirada de entulho organizada.`,
    nivelamento: (p) => `Nivelamento de terreno ${p} prepara a área para fundação, piso ou base de estrutura. Em lotes maiores e relevo irregular típico de áreas em expansão, a SMS entrega cota e compactação previstas em projeto com motoniveladora, trator e rolo.`,
    movimentacao: (p) => `Movimentação de terra ${p} costuma envolver volume médio ou grande, com corte e aterro para nivelar lote amplo. A frota própria da SMS sustenta o ritmo, com rota e ponto de descarte planejados.`,
    preparo: (p) => `O preparo de terreno para obra ${p} reúne limpeza, demolição quando necessária, escavação, corte, aterro, compactação e nivelamento. Em áreas em expansão, é etapa que destrava lote parado e dá início real à obra.`,
  },
  interior: {
    terraplanagem: (p) => `Terraplanagem ${p} é atendida com deslocamento programado de equipe e frota. A SMS opera em terreno médio e grande, executa corte, aterro, regularização e compactação conforme o projeto e ajusta a sequência das frentes ao cronograma do empreendimento.`,
    limpeza: (p) => `Limpeza de terreno ${p} envolve, em geral, lote maior e área parada há tempos. A SMS dimensiona equipe e caçambas conforme o volume, faz a retirada e o descarte conforme as normas, deixando o terreno pronto para a próxima etapa.`,
    demolicao: (p) => `A demolição ${p} atende imóvel antigo, galpão ou pequena estrutura, com escavadeira hidráulica e rompedor, isolamento da área e retirada de entulho, em cronograma compatível com o deslocamento da equipe até a cidade.`,
    nivelamento: (p) => `Nivelamento de terreno ${p} prepara fundação, piso de galpão, estacionamento ou base de estrutura, com cota e compactação previstas em projeto.`,
    movimentacao: (p) => `Movimentação de terra ${p} envolve corte, aterro e transporte em volume variável, com rota e ponto de descarte planejados — operação que costuma pesar no cronograma de obra fora da capital.`,
    preparo: (p) => `Preparo de terreno para obra ${p} reúne limpeza, demolição, escavação, corte, aterro, compactação e nivelamento, com a equipe deslocada para o local e cronograma combinado com a construtora.`,
  },
};

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function getServiceText(profile: LocationProfile, key: ServiceKeyLocal, slug: string, phrase: string): string {
  const variantIndex = hashString(slug) % 2;
  if (variantIndex === 0) return profile.service[key](phrase);
  return SERVICE_VARIANTS_B[profile.key][key](phrase);
}

// ────────────────────────────────────────────────────────────
// OVERRIDES POR LOCALIDADE — title, meta description e primeira frase
// únicos para slugs prioritários (alvo de Ads/SEO). Slugs ausentes
// recebem fallback gerado pelo perfil.

export interface LocationOverride {
  title?: string;
  metaDescription?: string;
  firstSentence?: string;
  introSentence?: string;
  /** Frase locativa explícita: usar para nomes ambíguos (ex: "em Anhanguera" em vez de "no Anhanguera"). */
  phrase?: string;
  /** Parágrafo extra com contexto local específico (avenidas, perfil de obra, vizinhança). */
  localContext?: string;
}

export const LOCATION_OVERRIDES: Record<string, LocationOverride> = {
  // ─────────── ZONA LESTE ───────────
  "tatuape": {
    title: "Terraplanagem no Tatuapé | Obras Comerciais e Prediais — SMS",
    metaDescription: "Terraplanagem no Tatuapé para obras comerciais, prédios residenciais e estacionamentos. Demolição, limpeza de terreno, nivelamento e movimentação de terra com frota própria.",
    firstSentence: "Terraplanagem no Tatuapé para obras comerciais, prédios residenciais e adequação de terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "O Tatuapé é um dos polos comerciais e residenciais mais adensados da Zona Leste de São Paulo, com obras frequentes em lotes urbanos cercados por prédios, comércio e fluxo intenso.",
    localContext: "Obras na região tendem a ficar próximas de eixos movimentados como a Avenida Celso Garcia, Radial Leste e Rua Tuiuti, o que pede janelas combinadas para entrada de caminhões basculantes e remoção de entulho. Em demolições parciais e preparações de lote no Tatuapé, o cuidado costuma estar mais em organizar acesso, isolamento e descarte do que no volume de terra propriamente dito.",
  },
  "mooca": {
    title: "Terraplanagem na Mooca | Reformas, Galpões e Obras Comerciais — SMS",
    metaDescription: "Terraplanagem na Mooca para obras comerciais, retrofit de galpões e prédios residenciais. Demolição controlada, limpeza, nivelamento e movimentação de terra.",
    firstSentence: "Terraplanagem na Mooca para obras comerciais, retrofit de galpões e preparação de terrenos urbanos é com a SMS Terraplenagem, que atende a região com frota própria em demolição, limpeza de terreno, nivelamento e movimentação de terra.",
    introSentence: "A Mooca mistura galpões antigos, novos empreendimentos residenciais e comércio tradicional, e muita obra começa pela retirada de estruturas, demolição parcial e regularização do lote.",
    localContext: "Por estar próxima da Rua da Mooca, Avenida Paes de Barros e Avenida Alcântara Machado, a operação considera horários de circulação, vizinhança residencial e logística para caçambas. Em retrofits de galpão, limpeza de terreno e nivelamento costumam vir junto da demolição, e a frota própria evita ter de coordenar terceiros entre as frentes de trabalho.",
  },
  "penha": {
    title: "Terraplanagem na Penha | Obras e Reformas — SMS Terraplenagem",
    metaDescription: "Terraplanagem na Penha para obras comerciais, reformas e adequação de terrenos urbanos. Limpeza, demolição, nivelamento e preparo de solo com frota própria.",
    firstSentence: "Terraplanagem na Penha para obras comerciais, reformas e preparação de terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "A Penha é uma região consolidada da Zona Leste, com comércio forte, lotes urbanos compactos e obras que normalmente envolvem reforma, demolição parcial e adequação de áreas já edificadas.",
    localContext: "Próximo à Avenida Penha de França e ao eixo da Radial Leste, o trabalho considera vias com tráfego pesado e ruas estreitas no entorno residencial. Na maioria das obras, o volume de terra é menor, mas a operação exige planejamento para retirada de entulho e janelas para entrada de máquina.",
  },

  // ─────────── CENTRO ───────────
  "aclimacao": {
    title: "Terraplanagem na Aclimação | Reformas e Retrofits — SMS",
    metaDescription: "Terraplanagem na Aclimação para reformas, retrofits e obras comerciais em terrenos urbanos. Demolição controlada, limpeza de terreno, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem na Aclimação para reformas, retrofits e adequação de terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em demolição controlada, limpeza de terreno, nivelamento e preparo de solo.",
    introSentence: "A Aclimação é uma região central de São Paulo formada por ruas tranquilas, prédios antigos e lotes compactos, com muitas obras de retrofit e adequação predial em vez de novas construções de grande porte.",
    localContext: "Por ficar próxima do Parque da Aclimação, Avenida Lacerda Franco e da região da Liberdade, as obras costumam pedir demolição controlada, isolamento bom e horários combinados com a vizinhança. Equipamentos de porte compatível com lote urbano e remoção organizada de entulho são, na prática, o que destrava obras na Aclimação.",
  },
  "bras": {
    title: "Terraplanagem no Brás | Demolição e Reformas Comerciais — SMS",
    metaDescription: "Terraplanagem no Brás para obras comerciais, demolição controlada e retrofit de galpões. Limpeza de terreno, movimentação de terra e preparo de solo com frota própria.",
    firstSentence: "Terraplanagem no Brás para obras comerciais, demolição controlada e retrofit de galpões é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento e preparo de solo.",
    introSentence: "O Brás é uma região central de comércio intenso, com galpões antigos, lojas e prédios que muitas vezes passam por demolição parcial antes de receber uma nova ocupação.",
    localContext: "Próximo à Avenida do Estado, Rua Oriente e ao eixo da Marginal Tietê, o trabalho exige planejamento de janelas para caminhão, isolamento bom e descarte regular de entulho. A combinação demolição + limpeza + nivelamento costuma resolver a maior parte das obras no Brás.",
  },
  "bela-vista": {
    title: "Terraplanagem na Bela Vista | Reformas e Retrofit — SMS",
    metaDescription: "Terraplanagem na Bela Vista para reformas, retrofit predial e obras comerciais em terrenos urbanos. Demolição controlada, limpeza, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem na Bela Vista para reformas, retrofit predial e obras comerciais em terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em demolição controlada, limpeza de terreno, nivelamento e preparo de solo.",
    introSentence: "A Bela Vista é uma região central consolidada, com prédios antigos, comércio tradicional e lotes apertados, onde as obras costumam ser retrofits e adequações em vez de novas construções.",
    localContext: "Próxima da Avenida Paulista, da Avenida 9 de Julho e do eixo Brigadeiro, a região tem ruas estreitas e horários restritos para caminhão. Em obras na Bela Vista, demolição controlada, retirada de entulho em caçambas e bom isolamento da frente costumam ser mais críticos que o volume de terra movimentado.",
  },
  "liberdade": {
    title: "Terraplanagem na Liberdade | Obras Comerciais e Reformas — SMS",
    metaDescription: "Terraplanagem na Liberdade para reformas, obras comerciais e adequação de terrenos urbanos. Limpeza de terreno, demolição, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem na Liberdade para reformas, obras comerciais e adequação de terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "A Liberdade reúne comércio intenso, prédios antigos e lotes compactos no Centro de São Paulo, com obras que pedem acesso planejado de máquinas e retirada controlada de entulho.",
    localContext: "Próxima da Avenida Liberdade, Praça da Sé e do eixo central, a região tem trânsito denso e horários restritos para caminhões pesados. Demolição controlada, limpeza e ajuste de nível costumam ser as etapas mais frequentes em obras da Liberdade.",
  },

  // ─────────── ZONA SUL / OESTE — PRIORIDADE ───────────
  "vila-mariana": {
    title: "Terraplanagem na Vila Mariana | Obras Comerciais e Prediais — SMS",
    metaDescription: "Terraplanagem na Vila Mariana para obras comerciais, prédios residenciais e adequação de terrenos urbanos. Demolição, limpeza, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem na Vila Mariana para obras comerciais, prédios residenciais e adequação de terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em demolição, limpeza de terreno, nivelamento e movimentação de terra.",
    introSentence: "A Vila Mariana é uma região residencial e comercial consolidada da Zona Sul de São Paulo, com prédios novos, escolas, comércio e lotes urbanos onde muita obra começa por adequação ou demolição parcial.",
    localContext: "Próxima da Avenida 23 de Maio, Rua Vergueiro e do eixo do metrô, a operação considera ruas residenciais, horários combinados e logística para caçambas. Em obras na Vila Mariana, a frota própria ajuda principalmente em encadear demolição, limpeza e nivelamento sem deixar a frente parada entre etapas.",
  },
  "moema": {
    title: "Terraplanagem em Moema | Obras Residenciais e Comerciais — SMS",
    metaDescription: "Terraplanagem em Moema para obras residenciais de alto padrão, comerciais e adequação de terrenos. Demolição, limpeza, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem em Moema para obras residenciais de alto padrão, comerciais e adequação de terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em demolição, limpeza de terreno, nivelamento e movimentação de terra.",
    introSentence: "Moema é uma região nobre da Zona Sul de São Paulo, com prédios residenciais, comércio sofisticado e ruas arborizadas, onde a maior parte das obras envolve adequação, demolição parcial e preparação de lote.",
    localContext: "Próximo da Avenida Ibirapuera, Avenida dos Bandeirantes e do Parque do Ibirapuera, o trabalho exige cuidado com vizinhança, vias residenciais e horários restritos. Em Moema, demolição controlada com pouco impacto, limpeza organizada e nivelamento preciso costumam ser os pontos críticos da operação.",
  },
  "itaim-bibi": {
    title: "Terraplanagem no Itaim Bibi | Obras Corporativas e Reformas — SMS",
    metaDescription: "Terraplanagem no Itaim Bibi para obras corporativas, edifícios comerciais e retrofits. Demolição controlada, limpeza, nivelamento e preparo de solo com frota própria.",
    firstSentence: "Terraplanagem no Itaim Bibi para obras corporativas, edifícios comerciais e retrofits é com a SMS Terraplenagem, que atua com frota própria em demolição controlada, limpeza de terreno, nivelamento e preparo de solo.",
    introSentence: "O Itaim Bibi é um dos principais polos corporativos de São Paulo, com edifícios comerciais, restaurantes e obras de retrofit em prédios que precisam ser preparados para novas ocupações.",
    localContext: "Próximo da Avenida Brigadeiro Faria Lima, Avenida Juscelino Kubitschek e do eixo da Vila Olímpia, a operação considera trânsito corporativo, horários restritos para caminhões e exigências de isolamento. Em obras no Itaim Bibi, demolição controlada e logística rigorosa de entulho costumam ser mais críticas que o volume de terra.",
  },
  "brooklin": {
    title: "Terraplanagem no Brooklin | Obras Comerciais e Corporativas — SMS",
    metaDescription: "Terraplanagem no Brooklin para obras comerciais, edifícios corporativos e adequação de terrenos. Demolição, limpeza, nivelamento e movimentação de terra.",
    firstSentence: "Terraplanagem no Brooklin para obras comerciais, edifícios corporativos e adequação de terrenos é com a SMS Terraplenagem, que atua com frota própria em demolição, limpeza de terreno, nivelamento e movimentação de terra.",
    introSentence: "O Brooklin é um polo corporativo e residencial da Zona Sul de São Paulo, com prédios comerciais, novos empreendimentos residenciais e obras frequentes de adequação predial.",
    localContext: "Próximo da Avenida das Nações Unidas, Avenida Engenheiro Luís Carlos Berrini e da Marginal Pinheiros, a região concentra escritórios e tem trânsito corporativo intenso. Em obras no Brooklin, a frota própria ajuda principalmente em demolição organizada, retirada controlada de entulho e nivelamento preciso para fundação.",
  },
  "pinheiros": {
    title: "Terraplanagem em Pinheiros | Reformas e Obras Comerciais — SMS",
    metaDescription: "Terraplanagem em Pinheiros para reformas, retrofits e obras comerciais em terrenos urbanos. Demolição controlada, limpeza, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem em Pinheiros para reformas, retrofits e obras comerciais em terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em demolição controlada, limpeza de terreno, nivelamento e preparo de solo.",
    introSentence: "Pinheiros é uma região consolidada da Zona Oeste de São Paulo, com casarões antigos, prédios novos, comércio forte e muitas obras de retrofit, demolição parcial e adequação de imóveis.",
    localContext: "Próxima da Avenida Brigadeiro Faria Lima, Rua dos Pinheiros, Rua Teodoro Sampaio e da Marginal Pinheiros, a região tem ruas estreitas, lotes apertados e trânsito intenso. Em obras em Pinheiros, demolição controlada e logística organizada de caminhões geralmente importam mais que o volume bruto de terra.",
  },
  "morumbi": {
    title: "Terraplanagem no Morumbi | Obras Residenciais e Comerciais — SMS",
    metaDescription: "Terraplanagem no Morumbi para obras residenciais de alto padrão, comerciais e adequação de terrenos com relevo. Corte, aterro, demolição, limpeza e nivelamento.",
    firstSentence: "Terraplanagem no Morumbi para obras residenciais de alto padrão, comerciais e adequação de terrenos com relevo é com a SMS Terraplenagem, que atua com frota própria em corte, aterro, demolição, limpeza e nivelamento.",
    introSentence: "O Morumbi é uma região da Zona Sul com terrenos de relevo acentuado, residências de alto padrão e empreendimentos comerciais, onde corte e aterro costumam ser parte importante da obra.",
    localContext: "Próximo da Avenida Giovanni Gronchi, Avenida Morumbi e do eixo da Marginal Pinheiros, muitas obras envolvem terrenos em desnível, contenções e preparação cuidadosa do lote. A frota própria de escavadeira, motoniveladora e basculantes ajuda a sequenciar corte, aterro e nivelamento sem depender de terceiros entre etapas.",
  },
  "butanta": {
    title: "Terraplanagem no Butantã | Obras Comerciais e Prediais — SMS",
    metaDescription: "Terraplanagem no Butantã para obras comerciais, prédios residenciais e adequação de terrenos urbanos. Limpeza, demolição, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem no Butantã para obras comerciais, prédios residenciais e adequação de terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "O Butantã mistura áreas residenciais consolidadas, eixos comerciais e novos empreendimentos na Zona Oeste de São Paulo, com obras que pedem planejamento de acesso de máquinas.",
    localContext: "Próximo da Avenida Vital Brasil, Avenida Corifeu de Azevedo Marques e da Marginal Pinheiros, o trabalho considera vias movimentadas e ruas residenciais estreitas. Em obras no Butantã, a operação encadeia limpeza, demolição parcial e nivelamento conforme o porte do lote.",
  },
  "ipiranga": {
    title: "Terraplanagem no Ipiranga | Reformas e Retrofit de Galpões — SMS",
    metaDescription: "Terraplanagem no Ipiranga para obras comerciais, retrofit de galpões e prédios residenciais. Demolição, limpeza de terreno, nivelamento e movimentação de terra.",
    firstSentence: "Terraplanagem no Ipiranga para obras comerciais, retrofit de galpões e prédios residenciais é com a SMS Terraplenagem, que atua com frota própria em demolição, limpeza de terreno, nivelamento e movimentação de terra.",
    introSentence: "O Ipiranga mistura áreas comerciais, galpões antigos em retrofit e prédios residenciais novos na Zona Sul de São Paulo, com obras frequentes de demolição parcial e preparação de lote.",
    localContext: "Próximo da Avenida do Estado, Rua Silva Bueno e do eixo do Museu do Ipiranga, a operação considera vias movimentadas, vizinhança residencial e logística para caçambas. Em retrofits de galpão, demolição controlada e limpeza costumam vir juntas antes do nivelamento.",
  },

  // ─────────── ZONA NORTE / OESTE / EXPANSÃO ───────────
  "santana": {
    title: "Terraplanagem em Santana | Obras Comerciais na Zona Norte — SMS",
    metaDescription: "Terraplanagem em Santana para obras comerciais, prédios residenciais e adequação de terrenos na Zona Norte de São Paulo. Demolição, limpeza, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem em Santana para obras comerciais, prédios residenciais e adequação de terrenos urbanos na Zona Norte é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "Santana é um polo comercial e residencial consolidado da Zona Norte de São Paulo, com prédios novos, comércio tradicional e obras urbanas em ruas de grande circulação.",
    localContext: "Próximo da Avenida Cruzeiro do Sul, Avenida Braz Leme e do eixo do metrô, a operação considera trânsito intenso e vizinhança residencial densa. Em Santana, demolição parcial, limpeza e nivelamento costumam encadear a maioria das obras urbanas.",
  },
  "perus": {
    title: "Terraplanagem em Perus | Terrenos e Áreas em Expansão — SMS",
    metaDescription: "Terraplanagem em Perus para terrenos, obras comerciais e áreas em expansão urbana na Zona Norte. Movimentação de terra, limpeza, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem em Perus para terrenos, obras comerciais e áreas em expansão urbana é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "Perus, no extremo noroeste da capital, tem terrenos maiores e áreas em expansão, com obras que normalmente começam por limpeza do lote, corte, aterro e preparação do solo.",
    localContext: "Próximo da Rodovia Anhanguera e da Avenida Raimundo Pereira de Magalhães, a região recebe obras com volume maior de terra e logística de caminhão facilitada por eixos rodoviários. Em Perus, corte, aterro e nivelamento costumam ser as etapas mais importantes.",
  },
  "anhanguera": {
    title: "Terraplanagem em Anhanguera | Terrenos Amplos e Obras em Expansão — SMS",
    metaDescription: "Terraplanagem em Anhanguera (bairro/distrito da Zona Noroeste de São Paulo) para terrenos amplos, obras comerciais e áreas em expansão. Limpeza, movimentação de terra, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem em Anhanguera para terrenos amplos, obras comerciais e áreas em expansão urbana é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "Anhanguera, distrito da Zona Noroeste de São Paulo, tem terrenos maiores, áreas em expansão e obras que pedem corte, aterro e preparação completa do solo antes da construção.",
    localContext: "Esta página trata do distrito/região Anhanguera, na capital — não da Rodovia Anhanguera nem de instituições de mesmo nome. Próximo da Rodovia Anhanguera e da divisa com Perus e Caieiras, a operação se beneficia de eixos rodoviários para logística de caminhões e de lotes mais amplos para escavação e movimentação de terra.",
    phrase: "em Anhanguera", // override desambigua: nunca "no Anhanguera"
  },
  "casa-verde": {
    title: "Terraplanagem na Casa Verde | Obras Comerciais e Prediais — SMS",
    metaDescription: "Terraplanagem na Casa Verde para obras comerciais, prédios residenciais e adequação de terrenos urbanos na Zona Norte. Demolição, limpeza, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem na Casa Verde para obras comerciais, prédios residenciais e adequação de terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em demolição, limpeza de terreno, nivelamento e movimentação de terra.",
    introSentence: "A Casa Verde é uma região consolidada da Zona Norte de São Paulo, com comércio forte, áreas residenciais e obras urbanas que costumam pedir adequação predial.",
    localContext: "Próxima da Avenida Braz Leme, Avenida Casa Verde e do eixo da Marginal Tietê, a operação considera vias movimentadas e ruas residenciais. Em obras na Casa Verde, limpeza, demolição parcial e nivelamento encadeiam a maioria das frentes.",
  },

  // ─────────── REGIÃO METROPOLITANA / CORPORATIVO ───────────
  "alphaville": {
    title: "Terraplanagem em Alphaville | Galpões, Empresas e Condomínios — SMS",
    metaDescription: "Terraplanagem em Alphaville para condomínios empresariais, galpões, áreas corporativas e residenciais. Limpeza, demolição, nivelamento e preparo de solo com frota própria.",
    firstSentence: "Terraplanagem em Alphaville para condomínios empresariais, galpões, áreas corporativas e empreendimentos residenciais é com a SMS Terraplenagem, que atua com frota própria em limpeza de terreno, movimentação de terra, nivelamento, demolição e preparo de solo.",
    introSentence: "Alphaville reúne condomínios empresariais, parques corporativos, condomínios residenciais de alto padrão e terrenos amplos na divisa de Barueri e Santana de Parnaíba.",
    localContext: "Próximo da Rodovia Castello Branco, Alameda Rio Negro e do eixo da Rodovia Tenente Marques, a região concentra terrenos maiores, exigências de cronograma operacional firme e obras que combinam corporativo, comercial e residencial. Em Alphaville, a frota própria ajuda a sequenciar limpeza, corte, aterro e nivelamento conforme o porte do projeto, sem depender de terceiros.",
  },
  "osasco": {
    title: "Terraplanagem em Osasco | Obras Comerciais e Industriais — SMS",
    metaDescription: "Terraplanagem em Osasco para obras comerciais, industriais e terrenos urbanos. Limpeza de terreno, demolição, nivelamento e preparo de solo com frota própria.",
    firstSentence: "Terraplanagem em Osasco para obras comerciais, industriais e terrenos urbanos é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "Osasco une eixos comerciais movimentados, áreas industriais e bairros residenciais consolidados na Região Metropolitana de São Paulo, com obras que pedem planejamento de acesso e logística de caminhões.",
    localContext: "Próximo da Rodovia Castello Branco, Rodovia Anhanguera e da Marginal Tietê, a região tem boa logística rodoviária e obras variadas, de retrofit comercial a preparação de galpão. A frota própria ajuda a manter cronograma firme entre demolição, limpeza e nivelamento.",
  },
  "barueri": {
    title: "Terraplanagem em Barueri | Empresas, Galpões e Corporativo — SMS",
    metaDescription: "Terraplanagem em Barueri para parques empresariais, galpões e áreas corporativas. Limpeza, movimentação de terra, nivelamento e preparo de solo com frota própria.",
    firstSentence: "Terraplanagem em Barueri para parques empresariais, galpões, áreas corporativas e empreendimentos comerciais é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "Barueri concentra parques empresariais, condomínios corporativos e áreas industriais na Região Metropolitana de São Paulo, com obras que pedem cronograma operacional firme.",
    localContext: "Próximo da Rodovia Castello Branco e do eixo de Alphaville, a região recebe obras de porte com terrenos maiores e logística rodoviária favorável. Em Barueri, corte, aterro e nivelamento costumam ser as frentes mais relevantes em galpões e edifícios corporativos.",
  },
  "cajamar": {
    title: "Terraplanagem em Cajamar | Galpões Logísticos e Indústria — SMS",
    metaDescription: "Terraplanagem em Cajamar para galpões logísticos, condomínios industriais e terrenos amplos. Movimentação de terra, limpeza, nivelamento e preparo de solo com frota própria.",
    firstSentence: "Terraplanagem em Cajamar para galpões logísticos, condomínios industriais e terrenos amplos é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "Cajamar concentra galpões logísticos, condomínios industriais e terrenos amplos próximos à Rodovia Anhanguera, com obras que demandam frota de porte e cronograma de caminhões bem dimensionado.",
    localContext: "Por estar conectada à Rodovia Anhanguera e à Rodovia dos Bandeirantes, Cajamar é um eixo logístico forte da Região Metropolitana. Em obras na região, corte, aterro e nivelamento de áreas grandes para galpão e pátio são, normalmente, o coração da operação.",
  },
  "guarulhos": {
    title: "Terraplanagem em Guarulhos | Indústria, Comércio e Galpões — SMS",
    metaDescription: "Terraplanagem em Guarulhos para obras industriais, galpões e terrenos comerciais. Limpeza, demolição, nivelamento e preparo de solo com frota própria.",
    firstSentence: "Terraplanagem em Guarulhos para obras industriais, galpões e terrenos comerciais é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "Guarulhos tem forte presença industrial, áreas logísticas e bairros consolidados, com obras que pedem frota de porte e cronograma alinhado.",
    localContext: "Próximo da Rodovia Presidente Dutra, Rodovia Fernão Dias e do eixo do Aeroporto de Guarulhos, a região tem logística rodoviária privilegiada para obras industriais e galpões. Em Guarulhos, a operação costuma combinar limpeza, corte, aterro e nivelamento em terrenos amplos.",
  },
  "santo-andre": {
    title: "Terraplanagem em Santo André | Obras Comerciais e Industriais no ABC — SMS",
    metaDescription: "Terraplanagem em Santo André para obras comerciais e industriais no ABC paulista. Limpeza de terreno, demolição, nivelamento e preparo de solo com frota própria.",
    firstSentence: "Terraplanagem em Santo André para obras comerciais e industriais no ABC paulista é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "Santo André tem polos industriais, eixos comerciais e bairros residenciais consolidados, com obras que pedem deslocamento de frota e cronograma firme.",
    localContext: "Próximo da Avenida dos Estados, Rodovia Anchieta e do eixo do ABC, a região recebe obras industriais, comerciais e prediais. A frota própria reduz dependência de terceiros entre demolição, limpeza e nivelamento.",
  },
  "sao-bernardo-do-campo": {
    title: "Terraplanagem em São Bernardo do Campo | Indústria e Galpões — SMS",
    metaDescription: "Terraplanagem em São Bernardo do Campo para obras comerciais e industriais no ABC. Limpeza, demolição, movimentação de terra, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem em São Bernardo do Campo para obras comerciais e industriais no ABC paulista é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "São Bernardo do Campo concentra indústria automotiva, galpões logísticos e empreendimentos comerciais no ABC, com obras que pedem planejamento de caminhões e equipe deslocada.",
    localContext: "Próximo da Rodovia Anchieta, Rodovia Imigrantes e do eixo da Avenida dos Estados, a região tem logística rodoviária forte e obras de porte. Em São Bernardo, corte, aterro e nivelamento de áreas industriais costumam guiar a operação.",
  },
  "diadema": {
    title: "Terraplanagem em Diadema | Obras Comerciais e Industriais — SMS",
    metaDescription: "Terraplanagem em Diadema para obras comerciais e industriais no ABC paulista. Limpeza, demolição, movimentação de terra, nivelamento e preparo de solo.",
    firstSentence: "Terraplanagem em Diadema para obras comerciais e industriais no ABC paulista é com a SMS Terraplenagem, que atua com frota própria em movimentação de terra, limpeza de terreno, nivelamento, demolição e preparo de solo.",
    introSentence: "Diadema mistura indústria, comércio e bairros densos no ABC, com obras que pedem planejamento de acesso e cronograma firme de caminhões.",
    localContext: "Próximo da Avenida Piraporinha e do eixo da Rodovia dos Imigrantes, a região recebe obras industriais e comerciais com terrenos variados. Em Diadema, encadear limpeza, demolição e nivelamento com frota própria evita gargalos entre etapas.",
  },
};

export function getLocationOverride(slug: string): LocationOverride {
  return LOCATION_OVERRIDES[slug] || {};
}
