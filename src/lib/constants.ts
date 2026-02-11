export const WHATSAPP_NUMBER = "5511943521043";

export function buildWhatsAppUrl(phone: string, text?: string): string {
  let url = `https://api.whatsapp.com/send?phone=${phone}`;
  if (text && text.trim()) {
    url += `&text=${encodeURIComponent(text)}`;
  }
  return url;
}

export const WHATSAPP_URL = buildWhatsAppUrl(WHATSAPP_NUMBER);

export const COMPANY_INFO = {
  name: "SMS Terraplenagem",
  phone: "(11) 94352-1043",
  email: "contato@smsterraplenagem.com.br",
  address: "São Paulo - SP",
  hoursWeekday: "Segunda a Sexta: 7h às 18h",
  hoursSaturday: "Sábado: 7h às 12h",
  hours: "Segunda a Sexta: 7h às 18h | Sábado: 7h às 12h",
};

export function getWhatsAppUrl(message?: string) {
  return buildWhatsAppUrl(WHATSAPP_NUMBER, message);
}

// Google Ads conversion helper
export function trackWhatsAppConversion() {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event: "whatsapp_click" });
  }
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: "AW-17287450407/vWT2CP6t_5sbEKeeprNA",
      value: 1.0,
      currency: "BRL",
    });
  }
}

export const SERVICES = [
  {
    id: "limpeza-de-terreno",
    slug: "limpeza-de-terreno",
    title: "Limpeza de Terreno",
    shortDescription: "Remoção de vegetação, entulhos e preparação inicial do solo para início das obras.",
    fullDescription: "A limpeza de terreno é o primeiro passo fundamental para qualquer projeto de construção. Nossa equipe realiza a remoção completa de vegetação, entulhos, resíduos e qualquer material que possa interferir no início das obras. Utilizamos equipamentos modernos e mão de obra qualificada para garantir um terreno limpo e preparado para as próximas etapas do seu projeto.",
    whoIsItFor: "Construtoras, incorporadoras, proprietários de terrenos urbanos e rurais que precisam preparar o solo antes do início de obras residenciais, comerciais ou industriais.",
    howWeExecute: ["Visita técnica e avaliação do terreno", "Planejamento da limpeza", "Remoção de vegetação e entulhos", "Nivelamento inicial", "Descarte adequado dos resíduos"],
    equipment: ["Escavadeira hidráulica", "Retroescavadeira", "Caminhão basculante", "Roçadeira industrial"],
    benefits: ["Preparação adequada do solo", "Remoção segura de entulhos", "Equipe especializada", "Equipamentos modernos", "Descarte correto de resíduos"],
    faq: [
      { q: "Quanto tempo leva a limpeza de terreno?", a: "Depende do tamanho e complexidade do terreno. Terrenos urbanos simples podem ser limpos em 1-3 dias." },
      { q: "Vocês fazem o descarte dos resíduos?", a: "Sim, realizamos o descarte adequado de todos os resíduos conforme as normas ambientais vigentes." },
    ],
    seoTitle: "Limpeza de Terreno em SP | SMS Terraplenagem",
    seoDescription: "Serviço de limpeza de terreno em São Paulo. Remoção de vegetação, entulhos e preparo do solo. Equipamento próprio. Solicite orçamento!",
    seoKeyword: "limpeza de terreno em sp",
    image: "limpeza-terreno",
  },
  {
    id: "demolicao",
    slug: "demolicao",
    title: "Demolição",
    shortDescription: "Derrubada de estruturas com escavadeiras e equipamento pesado de grande porte.",
    fullDescription: "Realizamos demolições de estruturas de todos os portes com total segurança e eficiência. Nossa frota de escavadeiras hidráulicas e equipamentos pesados está preparada para demolir desde pequenas construções até grandes edificações. Trabalhamos com planejamento detalhado para garantir a segurança da equipe e do entorno.",
    whoIsItFor: "Empresas e proprietários que precisam demolir construções antigas, galpões, casas ou estruturas para novos empreendimentos.",
    howWeExecute: ["Análise estrutural e planejamento", "Isolamento e sinalização da área", "Demolição controlada com maquinário", "Retirada e transporte de entulhos", "Limpeza final do terreno"],
    equipment: ["Escavadeira hidráulica com rompedor", "Retroescavadeira", "Caminhões basculantes", "Equipamentos de segurança"],
    benefits: ["Demolição controlada e segura", "Equipamentos de grande porte", "Planejamento detalhado", "Retirada de entulhos inclusa", "Licenças e documentação"],
    faq: [
      { q: "É necessário licença para demolição?", a: "Sim, a demolição requer alvará da prefeitura. Podemos orientá-lo sobre a documentação necessária." },
      { q: "Vocês fazem demolição parcial?", a: "Sim, realizamos demolição parcial ou total conforme a necessidade do projeto." },
    ],
    seoTitle: "Demolição em SP | SMS Terraplenagem",
    seoDescription: "Serviço de demolição em São Paulo. Demolição controlada com equipamento pesado. Segurança garantida. Peça seu orçamento!",
    seoKeyword: "demolição em sp",
    image: "demolicao",
  },
  {
    id: "escavacao",
    slug: "escavacao",
    title: "Escavação",
    shortDescription: "Abertura de terreno e retirada de solo para fundações e infraestrutura subterrânea.",
    fullDescription: "A escavação é essencial para a preparação de fundações, instalação de infraestrutura subterrânea e nivelamento de terrenos. Contamos com escavadeiras hidráulicas de diferentes portes para atender projetos de qualquer escala. Nossa equipe trabalha com precisão para garantir as medidas e profundidades especificadas no projeto.",
    whoIsItFor: "Construtoras, empreiteiras e engenheiros que necessitam abertura de valas, fundações e infraestrutura subterrânea para projetos civis.",
    howWeExecute: ["Levantamento topográfico", "Demarcação das áreas de escavação", "Escavação mecânica com precisão", "Transporte do material excedente", "Verificação das cotas do projeto"],
    equipment: ["Escavadeira hidráulica (vários portes)", "Mini escavadeira", "Caminhão basculante", "Retroescavadeira"],
    benefits: ["Escavação para fundações", "Abertura de valas", "Preparação de subsolo", "Diferentes profundidades", "Precisão nas medidas"],
    faq: [
      { q: "Qual a profundidade máxima de escavação?", a: "Com nossos equipamentos, realizamos escavações de diversas profundidades, sempre conforme o projeto de engenharia." },
      { q: "Vocês transportam o material escavado?", a: "Sim, realizamos o transporte e descarte adequado de todo material escavado." },
    ],
    seoTitle: "Escavação em SP | SMS Terraplenagem",
    seoDescription: "Serviço de escavação em São Paulo. Abertura de valas e fundações com equipamento próprio. Orçamento rápido!",
    seoKeyword: "escavação em sp",
    image: "escavacao",
  },
  {
    id: "movimentacao-de-terra-corte-e-aterro",
    slug: "movimentacao-de-terra-corte-e-aterro",
    title: "Movimentação de Terra (Corte e Aterro)",
    shortDescription: "Redistribuição de solo para nivelamento e ajuste de topografia conforme o projeto.",
    fullDescription: "A movimentação de terra envolve operações de corte e aterro para nivelar o terreno conforme o projeto de engenharia. Utilizamos tratores, motoniveladoras e outros equipamentos para redistribuir o solo de forma eficiente. Esse serviço é fundamental para preparar o terreno para construções, estacionamentos e áreas industriais.",
    whoIsItFor: "Construtoras, loteadoras e proprietários que precisam nivelar terrenos para construção de edifícios, condomínios, galpões e áreas industriais.",
    howWeExecute: ["Análise topográfica do terreno", "Planejamento de corte e aterro", "Movimentação mecânica do solo", "Compactação do aterro", "Verificação de nível e cota final"],
    equipment: ["Motoniveladora", "Trator de esteira", "Rolo compactador", "Pá carregadeira", "Caminhões basculantes"],
    benefits: ["Corte e aterro precisos", "Nivelamento de terrenos", "Ajuste de topografia", "Compactação do solo", "Conformidade com projeto"],
    faq: [
      { q: "Qual a diferença entre corte e aterro?", a: "Corte é a retirada de terra de um local, enquanto aterro é o preenchimento com terra. Ambos visam nivelar o terreno conforme o projeto." },
      { q: "Vocês fazem compactação do solo?", a: "Sim, a compactação é parte essencial do processo e realizamos com equipamentos adequados." },
    ],
    seoTitle: "Movimentação de Terra em SP | Corte e Aterro | SMS Terraplenagem",
    seoDescription: "Movimentação de terra, corte e aterro em São Paulo. Nivelamento e ajuste de topografia com equipamento próprio. Solicite orçamento!",
    seoKeyword: "movimentação de terra grande são paulo",
    image: "movimentacao-terra",
  },
  {
    id: "perfuracao",
    slug: "perfuracao",
    title: "Perfuração",
    shortDescription: "Execução de furos para sondagem geotécnica, instalação de estacas e fundações profundas.",
    fullDescription: "Oferecemos serviços de perfuração para sondagem geotécnica, instalação de estacas e execução de fundações profundas. Nossos equipamentos de perfuração são adequados para diferentes tipos de solo e profundidades. A perfuração é essencial para garantir a estabilidade e segurança das estruturas a serem construídas.",
    whoIsItFor: "Engenheiros, construtoras e empresas que necessitam sondagem do solo, instalação de estacas ou fundações profundas para obras de grande porte.",
    howWeExecute: ["Análise prévia do solo", "Posicionamento do equipamento", "Perfuração conforme especificações", "Coleta de amostras (sondagem)", "Relatório técnico"],
    equipment: ["Perfuratriz rotativa", "Perfuratriz de estacas", "Caminhão munck", "Equipamentos de sondagem SPT"],
    benefits: ["Sondagem geotécnica", "Estacas e fundações", "Diferentes profundidades", "Análise do solo", "Relatórios técnicos"],
    faq: [
      { q: "O que é sondagem SPT?", a: "Sondagem SPT (Standard Penetration Test) é um ensaio para determinar a resistência e composição do solo em diferentes profundidades." },
      { q: "Qual profundidade máxima de perfuração?", a: "A profundidade depende do equipamento utilizado e do tipo de solo. Consulte-nos para avaliar seu projeto." },
    ],
    seoTitle: "Perfuração em SP | Sondagem e Estacas | SMS Terraplenagem",
    seoDescription: "Perfuração para sondagem geotécnica e fundações em São Paulo. Estacas e fundações profundas. Peça orçamento!",
    seoKeyword: "perfuração em sp",
    image: "perfuracao",
  },
  {
    id: "transportes-e-locacao-de-maquinas",
    slug: "transportes-e-locacao-de-maquinas",
    title: "Transportes e Locação de Máquinas",
    shortDescription: "Disponibilização de equipamentos e transporte para execução das obras terrestres.",
    fullDescription: "Além da execução de serviços, oferecemos locação de máquinas e equipamentos para sua obra. Nossa frota inclui escavadeiras, retroescavadeiras, tratores, caminhões basculantes e muito mais. Também realizamos o transporte de materiais e equipamentos para qualquer região da Grande São Paulo.",
    whoIsItFor: "Construtoras, empreiteiras e proprietários que precisam de máquinas e equipamentos para execução de obras por conta própria.",
    howWeExecute: ["Avaliação da necessidade", "Seleção do equipamento adequado", "Transporte até o local da obra", "Operação com operador qualificado", "Manutenção durante o período de locação"],
    equipment: ["Escavadeira hidráulica", "Retroescavadeira", "Pá carregadeira", "Caminhão basculante", "Trator de esteira", "Rolo compactador"],
    benefits: ["Frota própria diversificada", "Máquinas modernas", "Operadores qualificados", "Transporte incluso", "Flexibilidade de locação"],
    faq: [
      { q: "A locação inclui operador?", a: "Sim, oferecemos locação com ou sem operador, conforme sua necessidade." },
      { q: "Qual o prazo mínimo de locação?", a: "Trabalhamos com locação por hora, dia, semana ou mês. Consulte-nos para a melhor opção." },
    ],
    seoTitle: "Locação de Máquinas em SP | Transporte de Equipamentos | SMS Terraplenagem",
    seoDescription: "Locação de máquinas para terraplanagem em São Paulo. Escavadeiras, retroescavadeiras, caminhões. Frota própria. Orçamento rápido!",
    seoKeyword: "locação de máquinas em sp",
    image: "transporte-locacao",
  },
];

export const COVERAGE_AREAS = [
  { region: "Capital São Paulo", areas: "Todas as zonas (Norte, Sul, Leste, Oeste, Centro)", icon: "📍" },
  { region: "Região Norte", areas: "Guarulhos, Franco da Rocha, Caieiras, Mairiporã", icon: "📍" },
  { region: "Região Oeste", areas: "Osasco, Barueri, Carapicuíba, Cotia", icon: "📍" },
  { region: "Grande ABC", areas: "Santo André, São Bernardo, São Caetano, Diadema", icon: "📍" },
  { region: "Região Sul", areas: "Embu, Itapecerica, Taboão da Serra", icon: "📍" },
  { region: "Outras Cidades", areas: "Consulte disponibilidade para sua região", icon: "📍" },
];

export const TESTIMONIALS = [
  {
    name: "Claudinei Mendes",
    text: "Excelente empresa e atendimento, sempre fomos muito bem atendido pela Srta. Tainá, Sr. Sidney e Sr. Yarley… Empresa sensacional, comprometida, responsável e honesta!!! Super indicamos!!!",
  },
  {
    name: "Alex Gaida",
    text: "Tanto o Sidney, quanto a atendente Thainá estão de parabéns pelo atendimento e atenção ao cliente, fiquei muito satisfeito, pois não se preocuparam em apenas atender, mas em ajudar!",
  },
  {
    name: "Roberto Silva",
    text: "Melhor empresa de terraplanagem que existe. Eficiente, atendimento diferenciado e com melhor preço que cotei… super indico!",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Quanto tempo leva para fazer a terraplanagem?",
    answer: "O tempo de execução da terraplanagem em São Paulo dependerá das condições do solo. Se ele é muito grande e acidentado ou se tem muitas complexidades, mais tempo será preciso. Fatores como limpeza, nível de chuvas e atmosfera da região também influenciam no processo.",
  },
  {
    question: "Qual o preço médio de uma terraplanagem?",
    answer: "O preço médio depende de alguns fatores: tamanho e características do terreno, tipo do solo, quantidade de terra necessária para o aterro, entre outros. Entre em contato para um orçamento personalizado.",
  },
  {
    question: "Quais são as máquinas utilizadas para terraplanagem?",
    answer: "Utilizamos diversos equipamentos: escavadeira hidráulica (para escavação e carregamento), pá carregadeira, retroescavadeira, motoniveladora (para nivelar o terreno), rolo compactador (para compactar o solo) e caminhões basculantes.",
  },
  {
    question: "Quais são os benefícios da limpeza de terreno?",
    answer: "A limpeza de terreno proporciona uma base limpa e segura, preparando o ambiente para a construção. Facilita a preparação eficiente do terreno, oferece um ambiente seguro para as próximas fases e otimiza recursos.",
  },
  {
    question: "Em qual momento da obra preciso realizar a terraplanagem?",
    answer: "A terraplanagem é realizada após a conclusão do levantamento topográfico e do projeto de engenharia. Antes de começar, é importante obter as devidas autorizações legais e licenças.",
  },
];

export const DIFFERENTIALS = [
  { title: "Equipamento Próprio", desc: "Frota completa de máquinas modernas e bem mantidas para qualquer porte de obra." },
  { title: "Segurança Garantida", desc: "Protocolos rígidos de segurança em todas as etapas, conforme normas vigentes." },
  { title: "Prazo e Compromisso", desc: "Resposta rápida, início ágil e cumprimento dos prazos acordados." },
  { title: "Preço Justo", desc: "Orçamentos transparentes e condições de pagamento flexíveis." },
  { title: "Equipe Experiente", desc: "Profissionais qualificados com anos de atuação no mercado." },
  { title: "Atendimento Personalizado", desc: "Cada projeto é único. Oferecemos soluções sob medida para sua obra." },
];

export const BLOG_CATEGORIES = [
  { slug: "terraplanagem", label: "Terraplanagem" },
  { slug: "maquinas", label: "Máquinas" },
  { slug: "dicas", label: "Dicas" },
  { slug: "seguranca", label: "Segurança" },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "como-funciona-a-terraplanagem",
    title: "Como Funciona a Terraplanagem: Guia Completo",
    excerpt: "Entenda o processo de terraplanagem, desde o levantamento topográfico até a compactação final do solo.",
    category: "terraplanagem",
    date: "2025-12-10",
    readTime: "5 min",
    coverImage: "",
    content: `## O que é Terraplanagem?\n\nA terraplanagem é o conjunto de operações de escavação, transporte, compactação e nivelamento de terra, com o objetivo de preparar o terreno para receber uma construção, estrada ou qualquer outro tipo de obra civil.\n\n## Etapas da Terraplanagem\n\n### 1. Levantamento Topográfico\nAntes de qualquer movimentação, é essencial realizar o levantamento topográfico do terreno. Esse estudo identifica as características do solo, relevo e define os volumes de corte e aterro necessários.\n\n### 2. Limpeza do Terreno\nA etapa seguinte envolve a remoção de vegetação, entulhos e qualquer obstáculo que possa interferir nos trabalhos.\n\n### 3. Corte e Aterro\nO corte consiste na retirada de terra dos pontos mais altos, enquanto o aterro é o preenchimento das áreas mais baixas. O objetivo é nivelar o terreno conforme o projeto.\n\n### 4. Compactação\nApós o nivelamento, o solo é compactado com rolos compactadores para garantir estabilidade e resistência.\n\n## Quanto custa a terraplanagem em SP?\n\nO custo varia conforme o tamanho do terreno, volume de terra a ser movimentado, tipo de solo e acessibilidade do local. Solicite um orçamento personalizado com a SMS Terraplenagem.`,
  },
  {
    slug: "locacao-de-maquinas-para-obras",
    title: "Locação de Máquinas para Obras: Quando Vale a Pena?",
    excerpt: "Descubra quando é mais vantajoso alugar máquinas para sua obra ao invés de comprar.",
    category: "maquinas",
    date: "2025-11-25",
    readTime: "4 min",
    coverImage: "",
    content: `## Locação vs. Compra de Máquinas\n\nA decisão entre locar ou comprar máquinas para obras depende de diversos fatores. Neste artigo, ajudamos você a entender quando a locação é a melhor opção.\n\n## Vantagens da Locação\n\n- **Sem custo de manutenção:** A responsabilidade de manter os equipamentos em dia é da locadora.\n- **Flexibilidade:** Alugue apenas pelo período necessário.\n- **Acesso a equipamentos modernos:** Máquinas sempre atualizadas e bem mantidas.\n- **Sem depreciação:** O equipamento não perde valor no seu patrimônio.\n\n## Quando Locar?\n\n1. Obras pontuais ou de curta duração\n2. Quando não se justifica o investimento em compra\n3. Necessidade de equipamentos especializados\n4. Projetos com variação de demanda\n\n## Máquinas Disponíveis na SMS Terraplenagem\n\nOferecemos escavadeiras, retroescavadeiras, pás carregadeiras, caminhões basculantes e muito mais. Todos com operadores qualificados.`,
  },
  {
    slug: "eficiencia-na-movimentacao-de-terra",
    title: "Como Aumentar a Eficiência na Movimentação de Terra",
    excerpt: "Técnicas e boas práticas para otimizar a movimentação de terra e reduzir custos na sua obra.",
    category: "dicas",
    date: "2025-11-15",
    readTime: "6 min",
    coverImage: "",
    content: `## Eficiência na Movimentação de Terra\n\nA movimentação de terra é uma das etapas mais importantes e custosas de uma obra. Otimizar esse processo pode gerar economia significativa.\n\n## Planejamento é Fundamental\n\nUm bom projeto de terraplenagem considera:\n- Volume de corte e aterro balanceado\n- Distância de transporte minimizada\n- Aproveitamento do solo do próprio terreno\n- Condições climáticas favoráveis\n\n## Escolha dos Equipamentos\n\nUtilizar o equipamento adequado para cada tipo de solo e volume de terra faz toda a diferença. Equipamentos superdimensionados geram custos desnecessários, enquanto subdimensionados atrasam o cronograma.\n\n## Dicas Práticas\n\n1. **Planeje antes de executar:** Invista em levantamento topográfico detalhado\n2. **Monitore o clima:** Evite movimentações em períodos de chuva intensa\n3. **Controle de qualidade:** Verifique a compactação regularmente\n4. **Equipe qualificada:** Operadores experientes aumentam a produtividade`,
  },
  {
    slug: "licencas-para-terraplanagem-sp",
    title: "Licenças Necessárias para Terraplanagem em SP",
    excerpt: "Conheça as principais licenças e autorizações exigidas para realizar terraplanagem em São Paulo.",
    category: "terraplanagem",
    date: "2025-10-20",
    readTime: "5 min",
    coverImage: "",
    content: `## Licenças para Terraplanagem em São Paulo\n\nAntes de iniciar qualquer obra de terraplanagem em SP, é fundamental estar em conformidade com a legislação. Conheça as principais licenças necessárias.\n\n## Alvará de Execução\n\nO alvará é emitido pela prefeitura e autoriza a realização dos serviços de terraplanagem. Para obtê-lo, é necessário apresentar o projeto aprovado e a ART (Anotação de Responsabilidade Técnica).\n\n## Licença Ambiental\n\nEm terrenos com vegetação significativa ou próximos a áreas de preservação, pode ser necessária licença ambiental da CETESB.\n\n## CTR (Controle de Transporte de Resíduos)\n\nPara o transporte de terra e entulhos, é obrigatório o CTR, que documenta a origem e destino dos materiais.\n\n## Documentação Necessária\n\n- Projeto de terraplenagem aprovado\n- ART do engenheiro responsável\n- Alvará de execução\n- Licença ambiental (quando aplicável)\n- CTR para transporte de materiais\n\nA SMS Terraplenagem orienta seus clientes sobre toda a documentação necessária.`,
  },
  {
    slug: "seguranca-em-obras-de-terraplanagem",
    title: "Segurança em Obras de Terraplanagem: Normas e Boas Práticas",
    excerpt: "As principais normas de segurança e boas práticas para garantir a integridade da equipe e da obra.",
    category: "seguranca",
    date: "2025-10-05",
    readTime: "5 min",
    coverImage: "",
    content: `## Segurança em Terraplanagem\n\nA segurança é prioridade absoluta em qualquer obra de terraplanagem. Conheça as principais normas e práticas que adotamos.\n\n## Normas Regulamentadoras\n\n### NR-18 - Condições e Meio Ambiente de Trabalho\nEstabelece diretrizes de segurança para a indústria da construção, incluindo escavações e movimentação de terra.\n\n### NR-11 - Transporte e Movimentação de Materiais\nRegula a operação de equipamentos de transporte e movimentação de materiais.\n\n## Boas Práticas de Segurança\n\n1. **EPIs obrigatórios:** Capacete, botinas, luvas, óculos e protetor auricular\n2. **Sinalização:** Isolamento adequado da área de trabalho\n3. **Manutenção preventiva:** Equipamentos sempre revisados\n4. **Treinamento:** Operadores certificados e atualizados\n5. **Comunicação:** Rádios e sinalizadores para coordenação\n\n## Compromisso SMS\n\nNa SMS Terraplenagem, segurança não é opcional. Seguimos rigorosamente todas as normas e investimos continuamente em treinamento.`,
  },
  {
    slug: "corte-e-aterro-como-funciona",
    title: "Corte e Aterro: Como Funciona e Quando é Necessário",
    excerpt: "Entenda a técnica de corte e aterro utilizada na terraplanagem e sua importância para obras civis.",
    category: "terraplanagem",
    date: "2025-09-18",
    readTime: "4 min",
    coverImage: "",
    content: `## O que é Corte e Aterro?\n\nCorte e aterro é a técnica de terraplanagem que consiste em retirar terra de locais mais elevados (corte) e depositá-la em locais mais baixos (aterro), com o objetivo de nivelar o terreno.\n\n## Quando é Necessário?\n\n- Terrenos com topografia irregular\n- Preparação para loteamentos\n- Construção de estradas e acessos\n- Implantação de áreas industriais\n- Construção de edifícios em terrenos acidentados\n\n## O Processo\n\n### 1. Estudo Topográfico\nIdentifica os volumes de corte e aterro necessários para atingir o nível desejado.\n\n### 2. Planejamento de Volumes\nO ideal é equilibrar os volumes de corte e aterro, minimizando a necessidade de importar ou exportar terra.\n\n### 3. Execução\nMáquinas como escavadeiras e motoniveladoras realizam a movimentação, enquanto rolos compactadores garantem a firmeza do aterro.\n\n### 4. Controle de Qualidade\nEnsaios de compactação verificam se o solo atingiu a resistência especificada no projeto.\n\nA SMS Terraplenagem executa serviços de corte e aterro em toda a Grande São Paulo.`,
  },
];
