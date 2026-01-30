export const WHATSAPP_NUMBER = "5511943521043";
export const WHATSAPP_MESSAGE = "Olá, gostaria de receber um orçamento!";
export const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const COMPANY_INFO = {
  name: "SMS Terraplenagem",
  phone: "(11) 94352-1043",
  email: "contato@smsterraplenagem.com.br",
  address: "São Paulo - SP",
  hours: "Segunda a Sexta: 7h às 18h | Sábado: 7h às 12h",
};

export const SERVICES = [
  {
    id: "limpeza-de-terreno",
    title: "Limpeza de Terreno",
    shortDescription: "Remoção de vegetação, entulhos e preparação inicial do solo para início das obras.",
    fullDescription: "A limpeza de terreno é o primeiro passo fundamental para qualquer projeto de construção. Nossa equipe realiza a remoção completa de vegetação, entulhos, resíduos e qualquer material que possa interferir no início das obras. Utilizamos equipamentos modernos e mão de obra qualificada para garantir um terreno limpo e preparado para as próximas etapas do seu projeto.",
    benefits: [
      "Preparação adequada do solo",
      "Remoção segura de entulhos",
      "Equipe especializada",
      "Equipamentos modernos",
      "Descarte correto de resíduos",
    ],
    image: "limpeza-terreno",
  },
  {
    id: "demolicao",
    title: "Demolição",
    shortDescription: "Derrubada de estruturas com escavadeiras e equipamento pesado de grande porte.",
    fullDescription: "Realizamos demolições de estruturas de todos os portes com total segurança e eficiência. Nossa frota de escavadeiras hidráulicas e equipamentos pesados está preparada para demolir desde pequenas construções até grandes edificações. Trabalhamos com planejamento detalhado para garantir a segurança da equipe e do entorno.",
    benefits: [
      "Demolição controlada e segura",
      "Equipamentos de grande porte",
      "Planejamento detalhado",
      "Retirada de entulhos inclusa",
      "Licenças e documentação",
    ],
    image: "demolicao",
  },
  {
    id: "escavacao",
    title: "Escavação",
    shortDescription: "Abertura de terreno e retirada de solo para fundações e infraestrutura subterrânea.",
    fullDescription: "A escavação é essencial para a preparação de fundações, instalação de infraestrutura subterrânea e nivelamento de terrenos. Contamos com escavadeiras hidráulicas de diferentes portes para atender projetos de qualquer escala. Nossa equipe trabalha com precisão para garantir as medidas e profundidades especificadas no projeto.",
    benefits: [
      "Escavação para fundações",
      "Abertura de valas",
      "Preparação de subsolo",
      "Diferentes profundidades",
      "Precisão nas medidas",
    ],
    image: "escavacao",
  },
  {
    id: "movimentacao-de-terra",
    title: "Movimentação de Terra",
    shortDescription: "Redistribuição de solo para nivelamento e ajuste de topografia conforme o projeto.",
    fullDescription: "A movimentação de terra envolve operações de corte e aterro para nivelar o terreno conforme o projeto de engenharia. Utilizamos tratores, motoniveladoras e outros equipamentos para redistribuir o solo de forma eficiente. Esse serviço é fundamental para preparar o terreno para construções, estacionamentos e áreas industriais.",
    benefits: [
      "Corte e aterro precisos",
      "Nivelamento de terrenos",
      "Ajuste de topografia",
      "Compactação do solo",
      "Conformidade com projeto",
    ],
    image: "movimentacao-terra",
  },
  {
    id: "perfuracao",
    title: "Perfuração",
    shortDescription: "Execução de furos para sondagem geotécnica, instalação de estacas e fundações profundas.",
    fullDescription: "Oferecemos serviços de perfuração para sondagem geotécnica, instalação de estacas e execução de fundações profundas. Nossos equipamentos de perfuração são adequados para diferentes tipos de solo e profundidades. A perfuração é essencial para garantir a estabilidade e segurança das estruturas a serem construídas.",
    benefits: [
      "Sondagem geotécnica",
      "Estacas e fundações",
      "Diferentes profundidades",
      "Análise do solo",
      "Relatórios técnicos",
    ],
    image: "perfuracao",
  },
  {
    id: "transporte-e-locacao",
    title: "Transporte e Locação de Máquinas",
    shortDescription: "Disponibilização de equipamentos e transporte para execução das obras terrestres.",
    fullDescription: "Além da execução de serviços, oferecemos locação de máquinas e equipamentos para sua obra. Nossa frota inclui escavadeiras, retroescavadeiras, tratores, caminhões basculantes e muito mais. Também realizamos o transporte de materiais e equipamentos para qualquer região da Grande São Paulo.",
    benefits: [
      "Frota própria diversificada",
      "Máquinas modernas",
      "Operadores qualificados",
      "Transporte incluso",
      "Flexibilidade de locação",
    ],
    image: "transporte-locacao",
  },
];

export const COVERAGE_AREAS = [
  { region: "Capital São Paulo", areas: "Todas as zonas (Norte, Sul, Leste, Oeste, Centro)" },
  { region: "Região Norte", areas: "Guarulhos, Franco da Rocha, Caieiras, Mairiporã" },
  { region: "Região Oeste", areas: "Osasco, Barueri, Carapicuíba, Cotia" },
  { region: "Grande ABC", areas: "Santo André, São Bernardo, São Caetano, Diadema" },
  { region: "Região Sul", areas: "Embu, Itapecerica, Taboão da Serra" },
  { region: "Outras Cidades", areas: "Consulte disponibilidade para sua região" },
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
