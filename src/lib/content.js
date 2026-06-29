// All visible text for the landing page.
// Update here to change copy without touching component logic.

export const SITE = {
  name: 'EmroGrain Commodities',
  email: 'comercial@emrograin.com.br',
  phone: '+55 (99) 98408-0468',
  phoneHref: 'tel:+5599984080468',
  address: '',
  hours: 'Seg–Sex · 8h às 18h',
  tagline: 'Conectando o campo ao mercado. Gerando valor para o futuro.',
  social: {
    instagram: '#',
    linkedin: '#',
    whatsapp: 'https://wa.me/5599984080468',
  },
};

export const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#commodities', label: 'Commodities' },
  { href: '#processo', label: 'Como atuamos' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#contato', label: 'Contato' },
];

export const HERO = {
  eyebrow: { idx: '01', text: 'Compra · Venda · Intermediação' },
  headline: 'Do campo brasileiro',
  headlineEmPrefix: 'ao ',
  headlineEm: 'mercado certo',
  headlineSuffix: '.',
  lead: 'Intermediamos soja e milho — do produtor aos grandes compradores, com transparência e condições que cabem na sua safra.',
  cta: { href: '#contato', label: 'Falar com o comercial' },
  ctaSecondary: { href: '#commodities', label: 'Nossas commodities' },
  stats: [
    { num: '+3', unit: ' Mi', label: 'Toneladas movimentadas' },
    { num: '24', unit: 'h', label: 'Resposta comercial' },
  ],
};

export const MARKET_PANEL = {
  heading: 'Mercado · agora',
  rows: [
    { sym: 'EURBRL', label: 'EURO · EUR-BRL', unit: 'por 1 EUR' },
    { sym: 'CNYBRL', label: 'YUAN · CHINA',   unit: 'por 1 CNY' },
  ],
  heroUsdUnit: 'por 1 USD',
  footer: 'Câmbio ao vivo · atualização contínua',
};

export const TICKER_ITEMS = [
  { sym: 'USDBRL', label: 'DÓLAR',        unit: 'por 1 USD' },
  { sym: 'EURBRL', label: 'EURO',         unit: 'por 1 EUR' },
  { sym: 'CNYBRL', label: 'YUAN · CHINA', unit: 'por 1 CNY' },
];

export const MARQUEE_ITEMS = [
  { text: 'Soja',          out: false },
  { text: 'Milho',         out: true  },
  { text: 'Farelo',        out: false },
  { text: 'Originação',    out: true  },
  { text: 'Intermediação', out: false },
];

export const SOBRE = {
  eyebrow: { idx: '02', text: 'Sobre a EmroGrain' },
  headline: 'Gente do campo,',
  headlineSub: 'alcance global.',
  lead: 'Nascemos para encurtar a distância entre quem produz e quem compra. Intermediamos a compra e a venda de soja e milho — sempre ao lado do produtor, com transparência em cada etapa.',
  bentoStat1: { label: 'Movimentação', num: '+3', unit: ' Mi', sub: 'Toneladas de grãos' },
  bentoFeature: {
    text: ['Não existe fórmula fixa: estruturamos ', 'cada negócio', ' do jeito que faz mais sentido para a sua safra.'],
    bold: 'cada negócio',
    foot: 'Compra · Venda · Intermediação',
  },
  bentoStat2: { label: 'Operação', countTo: 100, unit: '%', sub: 'Rastreabilidade da carga' },
  values: [
    {
      idx: '01',
      title: 'Originação próxima',
      body: 'Estamos onde o grão nasce. Compra ágil, classificação transparente e pagamento sem burocracia.',
      icon: 'pin',
    },
    {
      idx: '02',
      title: 'Relação de confiança',
      body: 'Construímos parcerias de longo prazo com produtores e cooperativas, safra após safra.',
      icon: 'shield',
    },
    {
      idx: '03',
      title: 'Grandes compradores',
      body: 'Conectamos sua produção aos melhores compradores do mercado nacional, com negociação direta e transparente.',
      icon: 'globe',
    },
  ],
};

export const COMMODITIES = {
  eyebrow: { idx: '03', text: 'O que negociamos' },
  headline: 'Soja e milho, do campo ao comprador.',
  lead: 'As duas principais commodities do agronegócio brasileiro — compradas, vendidas e conectadas diretamente aos grandes compradores do mercado nacional.',
  items: [
    {
      slug: 'soja',
      imgAlt: 'Grãos de soja dourados em close — close-up macro',
      imgTag: 'foto: grãos de soja em macro',
      tag: 'Grão · Farelo',
      market: 'Mercado interno',
      name: 'Soja',
      body: 'A base da nossa operação. Grão e farelo conectados aos maiores compradores do mercado nacional.',
      specs: [
        { k: 'Formas',      v: 'Grão · Farelo' },
        { k: 'Mercados',    v: 'Mercado interno' },
        { k: 'Modalidades', v: 'À vista · A fixar · Barter' },
      ],
      chips: ['Em grão', 'Farelo', 'Mercado interno'],
    },
    {
      slug: 'milho',
      imgAlt: 'Grãos de milho dourado durante colheita',
      imgTag: 'foto: espigas e grãos de milho',
      tag: 'Grão · Indústria · Ração',
      market: 'Mercado interno',
      name: 'Milho',
      body: 'Milho em grão para a indústria e a produção de ração — com originação no campo e escoamento eficiente pelo mercado interno.',
      specs: [
        { k: 'Formas',      v: 'Grão a granel' },
        { k: 'Destinos',    v: 'Ração · Indústria' },
        { k: 'Modalidades', v: 'À vista · A fixar · Barter' },
      ],
      chips: ['Em grão', 'Ração e indústria', 'Mercado interno'],
    },
  ],
};

export const PROCESSO = {
  eyebrow: { idx: '04', text: 'Como atuamos' },
  headline: 'Intermediação que se adapta à sua safra.',
  lead: 'Conectamos quem produz a quem compra — e montamos cada negócio do jeito que faz mais sentido para você. Sem fórmula fixa.',
  ctaLabel: 'Montar minha proposta',
  steps: [
    {
      idx: '01',
      title: 'Intermediação de compra e venda',
      body: 'Atuamos como a ponte entre você e o mercado: encontramos o comprador certo e negociamos as melhores condições para a sua soja e o seu milho.',
      icon: 'arrows',
    },
    {
      idx: '02',
      title: 'Pagamento antecipado',
      body: 'Precisa de capital antes da entrega? Avaliamos a antecipação do pagamento da sua safra. Com ou sem antecipação — você escolhe o que cabe no seu momento.',
      icon: 'clock',
    },
    {
      idx: '03',
      title: 'Compra e estocagem',
      body: 'Quando vale a pena, compramos a sua produção e assumimos a armazenagem — você vende com segurança e nós aguardamos o melhor momento de mercado.',
      icon: 'warehouse',
    },
  ],
  banner: {
    title: 'Cada negócio é único.',
    body: 'À vista ou a prazo, com antecipação ou na entrega, intermediação ou compra direta — desenhamos junto com você a melhor estrutura para a sua safra.',
    chips: ['À vista', 'A prazo', 'Antecipação', 'Intermediação', 'Compra & estocagem'],
    cta: 'Falar com o comercial',
  },
};

export const DEPOIMENTOS = {
  eyebrow: { idx: '05', text: 'Quem produz com a gente' },
  headline: 'Confiança que se constrói safra após safra.',
  items: [
    {
      quote: 'Negociar com a EmroGrain é direto e transparente. O pagamento sempre em dia me dá segurança para planejar a próxima safra.',
      name: 'João Mendes',
      role: 'Produtor de soja · Balsas/MA',
      initials: 'JM',
      featured: true,
    },
    {
      quote: 'A logística deles tirou um peso enorme da nossa cooperativa. Menos perda e mais resultado para o cooperado.',
      name: 'Marina Reis',
      role: 'Coop. Agro Vale · Tasso Fragoso/MA',
      initials: 'MR',
    },
    {
      quote: 'Com a proteção de preço e câmbio consegui travar um bom negócio e dormir tranquilo. Parceria de verdade.',
      name: 'Antônio Prado',
      role: 'Produtor · São Raimundo das Mangabeiras/MA',
      initials: 'AP',
    },
  ],
};

export const CTA_BAND = {
  eyebrow: 'Vamos negociar a sua safra',
  headline: 'Receba uma proposta sob medida.',
  lead: 'Conte sobre a sua produção e o nosso time comercial retorna em até 24 horas úteis — sem intermediários.',
  cta: { href: '#contato', label: 'Negociar minha safra agora' },
  ctaSecondary: { href: '#commodities', label: 'Ver commodities' },
};

export const CONTATO = {
  eyebrow: { idx: '06', text: 'Vamos conversar' },
  headline: 'Fale com o nosso time comercial.',
  lead: 'Conte sobre a sua safra e receba uma proposta sob medida. Atendimento direto, sem intermediários.',
  legal: 'Ao enviar, você concorda em ser contatado pelo time comercial da EmroGrain.',
  volumeOptions: [
    'Até 500 toneladas',
    '500 a 2.000 toneladas',
    '2.000 a 10.000 toneladas',
    'Acima de 10.000 toneladas',
  ],
};

export const FOOTER_COLS = [
  {
    title: 'Navegação',
    links: NAV_LINKS.map(({ href, label }) => ({ href, label })),
  },
  {
    title: 'Commodities',
    links: [
      { href: '#commodities', label: 'Soja em grão' },
      { href: '#commodities', label: 'Milho em grão' },
      { href: '#commodities', label: 'Farelo de soja' },
    ],
  },
];
