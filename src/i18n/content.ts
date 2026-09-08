/**
 * All translatable text for the site: PT-PT (default), EN and ES.
 *
 * Covers navbar labels, page eyebrows and headings, body prose, button
 * labels, the legal disclaimer, and character role lines + bios. Add a
 * language by adding a full object below and listing it in COTL_LOCALES +
 * COTL_CONTENT.
 *
 * Only the work title "Children of the Lance" and the tagline
 * "Children versus Legacy" stay fixed in every language (see data/site.ts).
 */

export type CotlLocale = "pt" | "en" | "es";

export const COTL_LOCALES: CotlLocale[] = ["pt", "en", "es"];
export const COTL_DEFAULT_LOCALE: CotlLocale = "pt";

/** localStorage key that remembers the reader's language choice. */
export const COTL_LOCALE_STORAGE_KEY = "cotl-locale";

/** Shape every locale must fill. TypeScript flags any missing key. */
export type CotlCopy = {
  /** aria-label for the language switcher. */
  switchLabel: string;
  /** Navbar link labels, keyed by the `key` in COTL_NAV (data/site.ts). */
  nav: {
    home: string;
    historia: string;
    personagens: string;
    conflito: string;
    ler: string;
    creditos: string;
  };
  /** Mobile menu toggle button. */
  menu: { open: string; close: string };
  /** Footer meta line (shown under the disclaimer). */
  footer: { tag: string };
  /** Mandatory legal / trademark disclaimer. Footer on every page + Credits. */
  disclaimer: string;
  hero: { hook: string; ctaRead: string; ctaAbout: string };
  personagens: {
    eyebrow: string;
    h1: string;
    lead: string;
    h2Heroes: string;
    h2Supporting: string;
    h2Villains: string;
  };
  historia: {
    eyebrow: string;
    h1: string;
    /** Sentence before the italic "Children versus Legacy." on the lead line. */
    leadIntro: string;
    h2Before: string;
    before: [string, string];
    h2Premise: string;
    premise: [string, string];
    h2World: string;
    world: [string, string];
    ctaMeet: string;
  };
  conflito: {
    eyebrow: string;
    h1: string;
    lead: string;
    h2Search: string;
    silverChild: string;
    h2Knights: string;
    knights: [string, string];
    h2Legacy: string;
    /** Sentence before the italic "Children versus Legacy." tagline. */
    legacy: string;
    h2Where: string;
    whereIntro: string;
    /** Last location chip; the first three are proper nouns left untranslated. */
    ruinsOfNeraka: string;
  };
  ler: {
    eyebrow: string;
    h1: string;
    lead: string;
    comingSoon: string;
    openStory: string;
    activateNote: string;
    placeholder: string;
  };
  creditos: {
    eyebrow: string;
    h1: string;
    h2Unofficial: string;
    unofficial: string;
    h2Disclaimer: string;
    h2Credits: string;
    artworkNote: string;
    /** Inline label in the credit list: "<name> — <artworkLabel> <artist>". */
    artworkLabel: string;
    /** Label under an image on the Characters page: "<artworkBeside>: <artist>". */
    artworkBeside: string;
    noArt: string;
    h2InProgress: string;
    /** Low-key note that portraits / credits are still being added. */
    inProgress: string;
    h2Trademarks: string;
    trademarks: string;
  };
  notFound: { h1: string; lead: string; cta: string };
  /** Keyed by character id (see data/characters.ts). */
  characters: Record<string, { role: string; bio: string[] }>;
};

const pt: CotlCopy = {
  switchLabel: "Idioma",
  nav: {
    home: "Início",
    historia: "A História",
    personagens: "Personagens",
    conflito: "O Conflito",
    ler: "Ler a História",
    creditos: "Créditos",
  },
  menu: { open: "Menu", close: "Fechar" },
  footer: { tag: "Um projeto de fã" },
  disclaimer:
    "Children of the Lance é uma obra de fã não oficial. Não é afiliada, " +
    "endossada ou associada à Wizards of the Coast. Dragonlance e todas as " +
    "propriedades relacionadas são marcas registadas da Wizards of the Coast.",
  hero: {
    hook:
      "Trinta anos depois de os Heróis da Lança terem banido Takhisis, o " +
      "Império do Dragão e os seus oito Cavaleiros do Dragão cavalgam para " +
      "arrastar a Rainha das Trevas de volta ao mundo. Os filhos dos velhos " +
      "heróis têm de se encontrar uns aos outros e ocupar o lugar onde os pais " +
      "estiveram.",
    ctaRead: "Ler a História",
    ctaAbout: "Sobre a História",
  },
  personagens: {
    eyebrow: "Personagens",
    h1: "Personagens",
    lead:
      "Os herdeiros que respondem ao chamamento de Palin Majere, e os " +
      "Cavaleiros de Takhisis que cavalgam contra eles.",
    h2Heroes: "Os Filhos da Lança",
    h2Supporting: "Personagens Secundárias",
    h2Villains: "Os Vilões",
  },
  historia: {
    eyebrow: "A História",
    h1: "Sobre a História",
    leadIntro:
      "Children of the Lance é uma continuação não oficial, feita por fãs, da " +
      "trilogia Dragonlance Chronicles (1984). Passa-se no mundo de Krynn, no " +
      "continente de Ansalon, dentro do universo Dragonlance. O seu resumo em " +
      "três palavras:",
    h2Before: "O que veio antes",
    before: [
      "Antes de Children of the Lance, Krynn era um mundo sem esperança. Os " +
        "deuses tinham voltado o rosto, e os Exércitos do Dragão da Rainha das " +
        "Trevas marchavam sem oposição pelas nações livres de Ansalon.",
      "Então os deuses regressaram, e com eles um punhado de companheiros " +
        "improváveis. Os Heróis da Lança percorreram Ansalon de ponta a ponta a " +
        "combater os Exércitos do Dragão, a reunir ordens desfeitas e a chamar " +
        "os dragões bons de volta à guerra. A sua estrada terminou quando " +
        "Takhisis foi detida à porta do mundo mortal e atirada de novo para o " +
        "Abismo.",
    ],
    h2Premise: "A premissa",
    premise: [
      "Passaram trinta anos dessa paz difícil. Agora o Império do Dragão " +
        "ergue-se no seu lugar, e os seus oito Cavaleiros do Dragão, cada um " +
        "ligado a um dragão poderoso, cavalgam com um só propósito: escancarar " +
        "a porta que os velhos heróis fecharam e trazer Takhisis de volta ao " +
        "mundo.",
      "Os filhos e descendentes dos Heróis da Lança originais estão espalhados " +
        "por Ansalon, na maioria estranhos uns aos outros. Para terem alguma " +
        "hipótese de deter o Império, têm primeiro de se encontrar e depois " +
        "decidir se seguem a estrada que os pais seguiram ou se abrem uma nova.",
    ],
    h2World: "O mundo: Krynn e Ansalon",
    world: [
      "Krynn é um mundo de deuses e dragões, onde Takhisis e Paladine estão em " +
        "lados opostos de todas as guerras, e onde kenders, minotauros, elfos, " +
        "humanos, anões e gnomos se apinham no mesmo mapa. As classes clássicas " +
        "de Dungeons & Dragons enchem as suas fileiras, de magos e feiticeiros a " +
        "guerreiros.",
      "Lugares conhecidos regressam, todos mudados por trinta anos: a vila de " +
        "Solace, o reino élfico de Qualinesti, a grande cidade de Palanthas e as " +
        "ruínas de Neraka, onde a última guerra se perdeu e se ganhou.",
    ],
    ctaMeet: "Conhecer as Personagens",
  },
  conflito: {
    eyebrow: "O Conflito",
    h1: "O Conflito",
    lead:
      "Tudo gira em torno da Criança de Prata, nascida de um dragão e de um " +
      "mortal. Os dois lados perseguem a criança por toda a Ansalon, e só um " +
      "deles pode chegar primeiro.",
    h2Search: "A busca da Criança de Prata",
    silverChild:
      "Os Oito Cavaleiros de Takhisis precisam da Criança de Prata para a obra " +
      "sombria de trazer a sua Rainha de volta, e gastarão exércitos para a " +
      "encontrar. Os Filhos da Lança têm de chegar primeiro à criança e " +
      "mantê-la fora do alcance do Império, antes que a porta do Abismo seja " +
      "forçada uma segunda vez.",
    h2Knights: "Os Oito Cavaleiros de Takhisis",
    knights: [
      "Oito Cavaleiros do Dragão comandam o Império do Dragão, cada um ligado a " +
        "um dragão poderoso. Respondem a Ariakan Ariakas, o Cavaleiro do Dragão " +
        "Vermelho e filho do antigo Imperador do Dragão, Duulket Ariakas. Entre " +
        "eles move-se o misterioso Zorath, o Cavaleiro do Dragão Púrpura, cujas " +
        "ordens nunca são postas por escrito.",
      "Mais velho e mais frio do que qualquer um deles, Lord Soth, o Cavaleiro " +
        "da Rosa Negra, cavalga com os Oito como uma lenda que regressou, aliado " +
        "à causa deles ou a inclinando em silêncio para fins próprios.",
    ],
    h2Legacy: "Children versus Legacy",
    legacy:
      "Por baixo da perseguição, esta é uma história sobre herança. Cada um dos " +
      "Filhos nasceu dentro de um legado: um nome célebre, uma velha profecia, a " +
      "guerra inacabada de um pai ou de uma mãe. A pergunta que o livro não " +
      "larga é se estão presos a seguir o caminho que lhes foi traçado ou " +
      "livres para forjar algo novo.",
    h2Where: "Onde se desenrola",
    whereIntro:
      "A caça atravessa Ansalon por lugares que a trilogia Chronicles original " +
      "tornou famosos, todos eles mudados nos trinta anos que passaram:",
    ruinsOfNeraka: "As ruínas de Neraka",
  },
  ler: {
    eyebrow: "Ler a História",
    h1: "Ler a História",
    lead:
      "Children of the Lance vai ser publicada online como obra de fã. O link " +
      "de leitura fica aqui.",
    comingSoon: "Link de leitura em breve",
    openStory: "Abrir a história",
    activateNote:
      "Para ativar este botão, define COTL_READ_URL em src/data/site.ts com o " +
      "teu link do AO3 ou do Wattpad.",
    placeholder:
      "Página provisória — substitui este texto quando a história estiver " +
      "publicada.",
  },
  creditos: {
    eyebrow: "Créditos e Aviso Legal",
    h1: "Créditos e Aviso Legal",
    h2Unofficial: "Obra de fã não oficial",
    unofficial:
      "Children of the Lance é uma continuação sem fins comerciais, feita por " +
      "fãs, das Dragonlance Chronicles. É feita por fãs, para fãs, e não gera " +
      "qualquer dinheiro. Não é um produto oficial de Dragonlance.",
    h2Disclaimer: "Aviso legal",
    h2Credits: "Créditos de ilustração",
    artworkNote:
      "Qualquer ilustração oficial de Dragonlance usada neste site é creditada " +
      "ao artista original mesmo ao lado da imagem, e de novo na lista abaixo.",
    artworkLabel: "arte:",
    artworkBeside: "Arte",
    noArt:
      "Ainda não há ilustrações de terceiros creditadas. Acrescenta o nome do " +
      "artista a cada entrada em data/characters.ts e ele aparece aqui e ao " +
      "lado da imagem na página de Personagens.",
    h2InProgress: "Em construção",
    inProgress:
      "Alguns retratos de personagens e créditos de ilustração ainda estão a " +
      "ser adicionados.",
    h2Trademarks: "Marcas registadas",
    trademarks:
      "Dragonlance, as suas personagens, lugares e propriedades relacionadas " +
      "são marcas registadas da Wizards of the Coast. Não se pretende contestar " +
      "essa titularidade.",
  },
  notFound: {
    h1: "Esta página perdeu-se em Ansalon",
    lead: "O caminho que seguiste não leva a lado nenhum.",
    cta: "Voltar ao início",
  },
  characters: {
    "palin-majere": {
      role: "Mago do Manto Branco · Filho de Caramon",
      bio: [
        "Palin Majere é o coração dos Filhos da Lança e aquele que os reúne. " +
          "Mago do Manto Branco, passou a vida à sombra da própria família, o " +
          "leal Caramon e o terrível Raistlin, e aprendeu com ambos que o poder " +
          "sem propósito devora quem o empunha.",
        "Enquanto outros esperam que uma profecia aponte um salvador, Palin " +
          "percorre a estrada de Solace a Palanthas a juntar os herdeiros dos " +
          "velhos heróis, insistindo que a herança não é um guião a cumprir mas " +
          "uma escolha a fazer. Se Ansalon for salvo uma segunda vez, acredita " +
          "ele, será porque os seus filhos escolheram salvá-lo. Não fala da " +
          "aprendiza que outrora partilhou essa convicção antes de deixar " +
          "Wayreth sem uma palavra, e ensinou-se a não olhar para trás nessa " +
          "estrada.",
      ],
    },
    "karst-uth-matar": {
      role: "Desertor do Império do Dragão · Filho secreto de Kitiara",
      bio: [
        "Karst Uth Matar foi criado como soldado do Império do Dragão, ensinado " +
          "nos seus ritmos e nas suas crueldades antes de ter idade para os " +
          "questionar. Só mais tarde soube de quem era o sangue que corria nas " +
          "suas veias: Kitiara uth Matar, cuja ambição e traição ainda ecoam em " +
          "todas as histórias de guerra contadas em Krynn.",
        "Desertou com os planos do Império na cabeça e a marca do Império nas " +
          "costas, e agora combate a máquina que o formou, na esperança de que " +
          "uma vida gasta a desfazê-la possa pesar contra o nome que lhe deram. " +
          "Os outros Filhos não sabem se hão de confiar nele. Ele próprio, na " +
          "maioria dos dias, também não.",
      ],
    },
    gryff: {
      role: "Jovem Minotauro · O Corno Partido",
      bio: [
        "Gryff é um jovem minotauro que traz a vergonha no rosto: um corno " +
          "partido rente, num povo que lê um corno partido como um guerreiro " +
          "deixado por acabar. O mundo lá fora olha uma vez e espera menos dele, " +
          "e ele construiu toda a sua curta vida em torno de desmentir esse " +
          "olhar.",
        "Entre os Filhos da Lança encontrou algo que os da sua espécie nunca " +
          "lhe deram, companheiros que o medem pelo que faz e não pelo que lhe " +
          "falta. Não o diria em voz alta, mas começou a lutar por eles e já " +
          "não só pelo seu nome.",
      ],
    },
    "usha-dithon": {
      role: "Maga do Manto Prateado · Guardiã das Linhas de Energia",
      bio: [
        "Usha DiThon nasceu filha de um erudito e de uma maga e cresceu entre " +
          "os arquivos de Thonvil. O seu dom levou-a dos pântanos de Ergoth do " +
          "Norte à Torre de Wayreth, onde uma mente aguçada e matemática a " +
          "marcou como um prodígio da magia. Ali viveu um romance discreto com " +
          "outro aprendiz, Palin Majere, e os dois partilhavam uma só " +
          "convicção: que a magia podia ser dobrada em favor da paz.",
        "A sua Prova da Alta Feitiçaria quebrou essa convicção. Perante a " +
          "verdade das linhas de energia instáveis de Krynn e da escuridão que " +
          "se juntava por trás delas, a sua magia afastou-se da feitiçaria " +
          "comum e virou-se para algo mais frio e mais absoluto, uma espécie de " +
          "ordem divina. Fugiu de Wayreth sem explicação, deixou Palin para " +
          "trás e comprometeu-se com os contestados Mantos Prateados; hoje vive " +
          "fechada nas bibliotecas do pai, em Thonvil, a vigiar as linhas de " +
          "energia do mundo a fracturarem-se por detrás de uma máscara de dever.",
      ],
    },
    "ariakan-ariakas": {
      role: "Cavaleiro do Dragão Vermelho · Líder dos Oito Cavaleiros de Takhisis",
      bio: [
        "Ariakan Ariakas é o rosto que o Império do Dragão mostra ao mundo: um " +
          "Cavaleiro do Dragão Vermelho de armadura dourada, nascido para mandar " +
          "e certo do seu direito a isso. O pai, Duulket Ariakas, usou a coroa " +
          "de Imperador do Dragão e mesmo assim não conseguiu trazer a Rainha " +
          "das Trevas ao reino mortal; o filho tenciona conseguir onde o pai " +
          "ficou aquém.",
        "Comanda os Oito Cavaleiros de Takhisis com disciplina fria e fé " +
          "verdadeira, e não duvida por um instante de que Takhisis " +
          "recompensará a mão que lhe abrir a porta do regresso. Para Ariakan, " +
          "os Filhos da Lança são menos um inimigo do que um incómodo que " +
          "sobrou de uma guerra que a sua família já perdeu uma vez.",
      ],
    },
    zorath: {
      role: "O Cavaleiro do Dragão Púrpura",
      bio: [
        "Zorath, o Cavaleiro do Dragão Púrpura, cavalga entre os Oito e não se " +
          "confia a nenhum deles. Enquanto os outros Cavaleiros comandam " +
          "exércitos à vista de todos, Zorath mantém-se nas margens da " +
          "história, e as ordens que o Cavaleiro Púrpura carrega são as que o " +
          "Império nunca põe no papel.",
        "O que Zorath quer, e de onde Zorath veio, são perguntas que até " +
          "Ariakan deixou de fazer em voz alta.",
      ],
    },
    "lord-soth": {
      role: "Cavaleiro da Rosa Negra · Cavaleiro da Morte",
      bio: [
        "Lord Soth foi outrora um Cavaleiro de Solâmnia, e poderia ter ficado " +
          "na memória como o maior de todos, se não tivesse quebrado o seu " +
          "juramento pelo amor de uma sacerdotisa elfa e deixado o orgulho " +
          "desviá-lo da estrada da redenção. Por esse falhanço foi amaldiçoado " +
          "quando o Cataclismo caiu, condenado à não-morte nas ruínas do seu " +
          "castelo, a mulher e o filho por nascer mortos por escolha sua.",
        "Agora é o Cavaleiro da Rosa Negra: um cavaleiro da morte que mata com " +
          "uma palavra de poder, cujo toque é a morte, e que cavalga à frente " +
          "de guerreiros esqueléticos e carpideiras uivantes. Em Children of " +
          "the Lance regressa como uma lenda que os heróis rezaram ser apenas " +
          "história, movendo-se ao lado dos Oito Cavaleiros de Takhisis, e " +
          "ninguém sabe dizer se serve a causa deles ou se a inclina em " +
          "silêncio para um desígnio próprio.",
      ],
    },
  },
};

const en: CotlCopy = {
  switchLabel: "Language",
  nav: {
    home: "Home",
    historia: "The Story",
    personagens: "Characters",
    conflito: "The Conflict",
    ler: "Read the Story",
    creditos: "Credits",
  },
  menu: { open: "Menu", close: "Close" },
  footer: { tag: "A fan project" },
  disclaimer:
    "Children of the Lance is an unofficial fan work. It is not affiliated " +
    "with, endorsed by, or associated with Wizards of the Coast. Dragonlance " +
    "and all related properties are trademarks of Wizards of the Coast.",
  hero: {
    hook:
      "Thirty years after the Heroes of the Lance banished Takhisis, the Dragon " +
      "Empire and its eight Dragon Knights ride to drag the Queen of Darkness " +
      "back into the world. The children of the old heroes must find one " +
      "another and stand where their parents stood.",
    ctaRead: "Read the Story",
    ctaAbout: "About the Story",
  },
  personagens: {
    eyebrow: "Characters",
    h1: "Characters",
    lead:
      "The heirs who answer Palin Majere's call, and the Knights of Takhisis " +
      "who ride against them.",
    h2Heroes: "The Children of the Lance",
    h2Supporting: "Supporting Characters",
    h2Villains: "The Villains",
  },
  historia: {
    eyebrow: "The Story",
    h1: "About the Story",
    leadIntro:
      "Children of the Lance is an unofficial fan continuation of the " +
      "Dragonlance Chronicles trilogy (1984). It unfolds on the world of Krynn, " +
      "on the continent of Ansalon, within the Dragonlance universe. Its " +
      "three-word summary:",
    h2Before: "What happened before",
    before: [
      "Before Children of the Lance, Krynn was a world without hope. The gods " +
        "had turned their faces away, and the Dragonarmies of the Queen of " +
        "Darkness marched unopposed across the free nations of Ansalon.",
      "Then the gods returned, and with them a handful of unlikely companions. " +
        "The Heroes of the Lance travelled the length of Ansalon fighting the " +
        "Dragonarmies, drawing shattered orders back together and calling the " +
        "good dragons home to the war. Their road ended when Takhisis was " +
        "stopped at the threshold of the mortal world and cast back down into " +
        "the Abyss.",
    ],
    h2Premise: "The premise",
    premise: [
      "Thirty years of that hard-won peace have passed. Now the Dragon Empire " +
        "rises in its place, and its eight Dragon Knights, each bound to a " +
        "powerful dragon, ride with a single purpose: to tear open the door the " +
        "old heroes closed and bring Takhisis back into the world.",
      "The children and descendants of the original Heroes of the Lance are " +
        "scattered across Ansalon, most of them strangers to one another. To " +
        "have any hope of stopping the Empire, they must first find one " +
        "another, and then decide whether to walk the road their parents walked " +
        "or cut a new one of their own.",
    ],
    h2World: "The world: Krynn and Ansalon",
    world: [
      "Krynn is a world of gods and dragons, where Takhisis and Paladine stand " +
        "on opposite sides of every war, and where kender, minotaurs, elves, " +
        "humans, dwarves and gnomes all crowd the same map. Classic Dungeons & " +
        "Dragons callings fill its ranks, from wizards and sorcerers to " +
        "fighters.",
      "Familiar places return, all of them changed by thirty years: the town " +
        "of Solace, the elven realm of Qualinesti, the great city of Palanthas, " +
        "and the ruins of Neraka where the last war was lost and won.",
    ],
    ctaMeet: "Meet the Characters",
  },
  conflito: {
    eyebrow: "The Conflict",
    h1: "The Conflict",
    lead:
      "Everything turns on the Silver Child, born of a dragon and a mortal. " +
      "Both sides are hunting the child across Ansalon, and only one of them " +
      "can be allowed to reach it first.",
    h2Search: "The search for the Silver Child",
    silverChild:
      "The Eight Knights of Takhisis need the Silver Child for the dark work " +
      "of bringing their Queen home, and they will spend armies to find it. " +
      "The Children of the Lance have to reach the child first and keep it " +
      "beyond the Empire's grasp, before the door to the Abyss is forced open " +
      "a second time.",
    h2Knights: "The Eight Knights of Takhisis",
    knights: [
      "Eight Dragon Knights lead the Dragon Empire, each bound to a powerful " +
        "dragon. They answer to Ariakan Ariakas, the Red Dragon Knight and son " +
        "of the former Dragon Emperor Duulket Ariakas. Among them moves the " +
        "mysterious Zorath, the Purple Dragon Knight, whose orders are never " +
        "written down.",
      "Older and colder than any of them, Lord Soth, the Knight of the Black " +
        "Rose, rides with the Eight as a returning legend, allied with their " +
        "cause or quietly bending it toward ends of his own.",
    ],
    h2Legacy: "Children versus Legacy",
    legacy:
      "Underneath the chase, this is a story about legacy. Every one of the " +
      "Children was born into an inheritance: a famous name, an old prophecy, " +
      "a parent's unfinished war. The question the book keeps asking is whether " +
      "they are bound to follow the path laid down for them, or free to forge " +
      "something new.",
    h2Where: "Where it plays out",
    whereIntro:
      "The hunt crosses Ansalon through places the original Chronicles trilogy " +
      "made famous, all of them changed in the thirty years since:",
    ruinsOfNeraka: "The ruins of Neraka",
  },
  ler: {
    eyebrow: "Read the Story",
    h1: "Read the Story",
    lead:
      "Children of the Lance will be published online as a fan work. The " +
      "reading link goes here.",
    comingSoon: "Reading link coming soon",
    openStory: "Open the story",
    activateNote:
      "To activate this button, set COTL_READ_URL in src/data/site.ts to your " +
      "AO3 or Wattpad link.",
    placeholder: "Placeholder page — replace this copy once the story is live.",
  },
  creditos: {
    eyebrow: "Credits & Disclaimer",
    h1: "Credits & Disclaimer",
    h2Unofficial: "Unofficial fan work",
    unofficial:
      "Children of the Lance is a non-commercial, fan-made continuation of the " +
      "Dragonlance Chronicles. It is made by fans, for fans, and earns no " +
      "money. It is not an official Dragonlance product.",
    h2Disclaimer: "Legal disclaimer",
    h2Credits: "Artwork credits",
    artworkNote:
      "Any official Dragonlance artwork used on this site is credited to its " +
      "original artist directly beside the image, and again in the list below.",
    artworkLabel: "artwork:",
    artworkBeside: "Artwork",
    noArt:
      "No borrowed artwork credited yet. Add the artist's name to each entry " +
      "in data/characters.ts and it appears here and beside the image on the " +
      "Characters page.",
    h2InProgress: "Still in progress",
    inProgress:
      "Some character portraits and artwork credits are still being added.",
    h2Trademarks: "Trademarks",
    trademarks:
      "Dragonlance, its characters, places and related properties are " +
      "trademarks of Wizards of the Coast. No challenge to their ownership is " +
      "intended.",
  },
  notFound: {
    h1: "This page is lost somewhere in Ansalon",
    lead: "The road you followed leads nowhere.",
    cta: "Back to the start",
  },
  characters: {
    "palin-majere": {
      role: "White Robe Mage · Son of Caramon",
      bio: [
        "Palin Majere is the heart of the Children of the Lance and the one " +
          "who calls them together. A mage of the White Robes, he has spent his " +
          "life in the long shadow of his family, the steadfast Caramon and the " +
          "terrible Raistlin, and he has learned from both that power without " +
          "purpose devours the one who wields it.",
        "While others wait for a prophecy to name a saviour, Palin rides from " +
          "Solace to Palanthas gathering the heirs of the old heroes, arguing " +
          "that legacy is not a script to be performed but a choice to be made. " +
          "If Ansalon is saved a second time, he believes, it will be because " +
          "its children chose to save it. He does not speak of the apprentice " +
          "who once shared that belief before she left Wayreth without a word, " +
          "and he has taught himself not to look back down that road.",
      ],
    },
    "karst-uth-matar": {
      role: "Deserter of the Dragon Empire · Secret Son of Kitiara",
      bio: [
        "Karst Uth Matar was raised a soldier of the Dragon Empire, taught its " +
          "cadences and its cruelties before he was old enough to question " +
          "them. Only later did he learn whose blood he carried: Kitiara uth " +
          "Matar, whose ambition and betrayal still echo through every war " +
          "story told on Krynn.",
        "He deserted with the Empire's plans in his head and its mark on his " +
          "back, and now he fights the machine that made him, hoping a life " +
          "spent tearing it down might weigh against the name he was given. The " +
          "other Children do not know whether to trust him. Neither, most days, " +
          "does he.",
      ],
    },
    gryff: {
      role: "Young Minotaur · The Broken Horn",
      bio: [
        "Gryff is a young minotaur who carries his shame on his face: a horn " +
          "snapped clean, in a people who read a broken horn as a warrior left " +
          "unfinished. The wider world takes one look and expects less of him, " +
          "and he has built his whole young life around proving that look " +
          "wrong.",
        "Among the Children of the Lance he has found something his own kind " +
          "never offered him, companions who measure him by what he does rather " +
          "than what he lacks. He would not say it aloud, but he has begun to " +
          "fight for them rather than only for his name.",
      ],
    },
    "usha-dithon": {
      role: "Silver Robe Mage · Watcher of the Leylines",
      bio: [
        "Usha DiThon was born to a scholar and a mage and raised among the " +
          "archives of Thonvil. Her gift carried her from the marshes of " +
          "Northern Ergoth to the Tower of Wayreth, where a sharp, mathematical " +
          "mind marked her as a prodigy of spellcraft. There she fell into a " +
          "quiet romance with a fellow apprentice, Palin Majere, and the two of " +
          "them shared one conviction: that magic could be bent toward peace.",
        "Her Test of High Sorcery broke that conviction. Facing the truth of " +
          "Krynn's shifting leylines and the darkness gathering behind them, " +
          "her magic turned from ordinary sorcery toward something colder and " +
          "more absolute, a kind of divine order. She fled Wayreth without " +
          "explanation, left Palin behind, and pledged herself to the disputed " +
          "Silver Robes; today she keeps to her father's libraries in Thonvil, " +
          "watching the world's leylines fracture from behind a mask of duty.",
      ],
    },
    "ariakan-ariakas": {
      role: "Red Dragon Knight · Leader of the Eight Knights of Takhisis",
      bio: [
        "Ariakan Ariakas is the face the Dragon Empire shows the world: a Red " +
          "Dragon Knight in gilded armour, born to command and certain of his " +
          "right to it. His father, Duulket Ariakas, wore the crown of Dragon " +
          "Emperor and still failed to bring the Queen of Darkness across into " +
          "the mortal realm; the son means to succeed where the father fell " +
          "short.",
        "He leads the Eight Knights of Takhisis with cold discipline and " +
          "genuine faith, and he does not doubt for a moment that Takhisis will " +
          "reward the hand that opens the door for her return. To Ariakan, the " +
          "Children of the Lance are less an enemy than an inconvenience left " +
          "over from a war his family already lost once.",
      ],
    },
    zorath: {
      role: "The Purple Dragon Knight",
      bio: [
        "Zorath, the Purple Dragon Knight, rides among the Eight and confides " +
          "in none of them. Where the other Knights command armies in the open, " +
          "Zorath keeps to the edges of the story, and the orders the Purple " +
          "Knight carries are the ones the Empire never commits to paper.",
        "What Zorath wants, and where Zorath came from, are questions even " +
          "Ariakan has stopped asking aloud.",
      ],
    },
    "lord-soth": {
      role: "Knight of the Black Rose · Death Knight",
      bio: [
        "Lord Soth was once a Knight of Solamnia, and might have been " +
          "remembered as its greatest, had he not broken his oath for the love " +
          "of an elven priestess and let his pride turn him from the road to " +
          "redemption. For that failure he was cursed as the Cataclysm fell, " +
          "condemned to undeath in the ruin of his keep, his wife and unborn " +
          "child dead by his own choosing.",
        "Now he is the Knight of the Black Rose: a death knight who can kill " +
          "with a word of power, whose touch is death, and who rides at the " +
          "head of skeletal warriors and wailing banshees. In Children of the " +
          "Lance he returns as a legend the heroes prayed was only a story, " +
          "moving alongside the Eight Knights of Takhisis, and no one can say " +
          "whether he serves their cause or is quietly bending it toward a " +
          "design of his own.",
      ],
    },
  },
};

const es: CotlCopy = {
  switchLabel: "Idioma",
  nav: {
    home: "Inicio",
    historia: "La Historia",
    personagens: "Personajes",
    conflito: "El Conflicto",
    ler: "Leer la Historia",
    creditos: "Créditos",
  },
  menu: { open: "Menú", close: "Cerrar" },
  footer: { tag: "Un proyecto de aficionados" },
  disclaimer:
    "Children of the Lance es una obra de fans no oficial. No está afiliada, " +
    "respaldada ni asociada a Wizards of the Coast. Dragonlance y todas las " +
    "propiedades relacionadas son marcas registradas de Wizards of the Coast.",
  hero: {
    hook:
      "Treinta años después de que los Héroes de la Lanza desterraran a " +
      "Takhisis, el Imperio del Dragón y sus ocho Caballeros del Dragón " +
      "cabalgan para arrastrar a la Reina de la Oscuridad de vuelta al mundo. " +
      "Los hijos de los viejos héroes deben encontrarse entre sí y ocupar el " +
      "lugar donde estuvieron sus padres.",
    ctaRead: "Leer la Historia",
    ctaAbout: "Sobre la Historia",
  },
  personagens: {
    eyebrow: "Personajes",
    h1: "Personajes",
    lead:
      "Los herederos que responden a la llamada de Palin Majere, y los " +
      "Caballeros de Takhisis que cabalgan contra ellos.",
    h2Heroes: "Los Hijos de la Lanza",
    h2Supporting: "Personajes Secundarios",
    h2Villains: "Los Villanos",
  },
  historia: {
    eyebrow: "La Historia",
    h1: "Sobre la Historia",
    leadIntro:
      "Children of the Lance es una continuación no oficial, hecha por " +
      "aficionados, de la trilogía Dragonlance Chronicles (1984). Transcurre " +
      "en el mundo de Krynn, en el continente de Ansalón, dentro del universo " +
      "Dragonlance. Su resumen en tres palabras:",
    h2Before: "Lo que sucedió antes",
    before: [
      "Antes de Children of the Lance, Krynn era un mundo sin esperanza. Los " +
        "dioses habían vuelto el rostro, y los Ejércitos del Dragón de la Reina " +
        "de la Oscuridad marchaban sin oposición por las naciones libres de " +
        "Ansalón.",
      "Entonces los dioses regresaron, y con ellos un puñado de compañeros " +
        "improbables. Los Héroes de la Lanza recorrieron Ansalón de un extremo " +
        "a otro combatiendo a los Ejércitos del Dragón, reuniendo órdenes " +
        "deshechas y llamando a los dragones buenos de vuelta a la guerra. Su " +
        "camino terminó cuando Takhisis fue detenida en el umbral del mundo " +
        "mortal y arrojada de nuevo al Abismo.",
    ],
    h2Premise: "La premisa",
    premise: [
      "Han pasado treinta años de esa paz difícil. Ahora el Imperio del Dragón " +
        "se alza en su lugar, y sus ocho Caballeros del Dragón, cada uno unido " +
        "a un dragón poderoso, cabalgan con un solo propósito: abrir de par en " +
        "par la puerta que los viejos héroes cerraron y traer a Takhisis de " +
        "vuelta al mundo.",
      "Los hijos y descendientes de los Héroes de la Lanza originales están " +
        "dispersos por Ansalón, en su mayoría desconocidos entre sí. Para tener " +
        "alguna esperanza de detener al Imperio, primero deben encontrarse y " +
        "luego decidir si recorren el camino que recorrieron sus padres o " +
        "abren uno nuevo.",
    ],
    h2World: "El mundo: Krynn y Ansalón",
    world: [
      "Krynn es un mundo de dioses y dragones, donde Takhisis y Paladine están " +
        "en bandos opuestos de cada guerra, y donde kenders, minotauros, " +
        "elfos, humanos, enanos y gnomos se agolpan en el mismo mapa. Las " +
        "clases clásicas de Dungeons & Dragons llenan sus filas, de magos y " +
        "hechiceros a guerreros.",
      "Lugares conocidos regresan, todos cambiados por treinta años: la aldea " +
        "de Solace, el reino élfico de Qualinesti, la gran ciudad de Palanthas " +
        "y las ruinas de Neraka, donde la última guerra se perdió y se ganó.",
    ],
    ctaMeet: "Conocer a los Personajes",
  },
  conflito: {
    eyebrow: "El Conflicto",
    h1: "El Conflicto",
    lead:
      "Todo gira en torno a la Criatura de Plata, nacida de un dragón y de un " +
      "mortal. Ambos bandos persiguen a la criatura por toda Ansalón, y solo " +
      "uno de ellos puede llegar primero.",
    h2Search: "La búsqueda de la Criatura de Plata",
    silverChild:
      "Los Ocho Caballeros de Takhisis necesitan a la Criatura de Plata para " +
      "la obra oscura de traer de vuelta a su Reina, y gastarán ejércitos en " +
      "encontrarla. Los Hijos de la Lanza tienen que llegar antes a la " +
      "criatura y mantenerla fuera del alcance del Imperio, antes de que la " +
      "puerta del Abismo se fuerce por segunda vez.",
    h2Knights: "Los Ocho Caballeros de Takhisis",
    knights: [
      "Ocho Caballeros del Dragón dirigen el Imperio del Dragón, cada uno " +
        "unido a un dragón poderoso. Responden ante Ariakan Ariakas, el " +
        "Caballero del Dragón Rojo e hijo del antiguo Emperador del Dragón, " +
        "Duulket Ariakas. Entre ellos se mueve el misterioso Zorath, el " +
        "Caballero del Dragón Púrpura, cuyas órdenes nunca se ponen por " +
        "escrito.",
      "Más viejo y más frío que cualquiera de ellos, Lord Soth, el Caballero " +
        "de la Rosa Negra, cabalga con los Ocho como una leyenda que ha " +
        "vuelto, aliado a su causa o inclinándola en silencio hacia fines " +
        "propios.",
    ],
    h2Legacy: "Children versus Legacy",
    legacy:
      "Bajo la persecución, esta es una historia sobre el legado. Cada uno de " +
      "los Hijos nació dentro de una herencia: un nombre célebre, una vieja " +
      "profecía, la guerra inacabada de un padre o una madre. La pregunta que " +
      "el libro no suelta es si están atados a seguir el camino que se les " +
      "trazó o libres para forjar algo nuevo.",
    h2Where: "Dónde transcurre",
    whereIntro:
      "La cacería atraviesa Ansalón por lugares que la trilogía Chronicles " +
      "original hizo famosos, todos ellos cambiados en los treinta años " +
      "transcurridos:",
    ruinsOfNeraka: "Las ruinas de Neraka",
  },
  ler: {
    eyebrow: "Leer la Historia",
    h1: "Leer la Historia",
    lead:
      "Children of the Lance se publicará en línea como obra de aficionados. " +
      "El enlace de lectura irá aquí.",
    comingSoon: "Enlace de lectura próximamente",
    openStory: "Abrir la historia",
    activateNote:
      "Para activar este botón, define COTL_READ_URL en src/data/site.ts con " +
      "tu enlace de AO3 o Wattpad.",
    placeholder:
      "Página provisional — sustituye este texto cuando la historia esté " +
      "publicada.",
  },
  creditos: {
    eyebrow: "Créditos y Aviso Legal",
    h1: "Créditos y Aviso Legal",
    h2Unofficial: "Obra de aficionados no oficial",
    unofficial:
      "Children of the Lance es una continuación sin fines comerciales, hecha " +
      "por aficionados, de las Dragonlance Chronicles. Está hecha por " +
      "aficionados, para aficionados, y no genera dinero alguno. No es un " +
      "producto oficial de Dragonlance.",
    h2Disclaimer: "Aviso legal",
    h2Credits: "Créditos de ilustración",
    artworkNote:
      "Cualquier ilustración oficial de Dragonlance usada en este sitio se " +
      "acredita a su artista original justo al lado de la imagen, y de nuevo " +
      "en la lista de abajo.",
    artworkLabel: "ilustración:",
    artworkBeside: "Ilustración",
    noArt:
      "Todavía no hay ilustraciones de terceros acreditadas. Añade el nombre " +
      "del artista a cada entrada en data/characters.ts y aparecerá aquí y " +
      "junto a la imagen en la página de Personajes.",
    h2InProgress: "En construcción",
    inProgress:
      "Algunos retratos de personajes y créditos de ilustración todavía se " +
      "están añadiendo.",
    h2Trademarks: "Marcas registradas",
    trademarks:
      "Dragonlance, sus personajes, lugares y propiedades relacionadas son " +
      "marcas registradas de Wizards of the Coast. No se pretende cuestionar " +
      "dicha titularidad.",
  },
  notFound: {
    h1: "Esta página se ha perdido en Ansalón",
    lead: "El camino que seguiste no lleva a ninguna parte.",
    cta: "Volver al inicio",
  },
  characters: {
    "palin-majere": {
      role: "Mago de la Túnica Blanca · Hijo de Caramon",
      bio: [
        "Palin Majere es el corazón de los Hijos de la Lanza y quien los " +
          "convoca. Mago de la Túnica Blanca, ha pasado la vida a la sombra de " +
          "su familia, el firme Caramon y el terrible Raistlin, y de ambos ha " +
          "aprendido que el poder sin propósito devora a quien lo empuña.",
        "Mientras otros esperan que una profecía nombre a un salvador, Palin " +
          "cabalga de Solace a Palanthas reuniendo a los herederos de los " +
          "viejos héroes, sosteniendo que el legado no es un guion que " +
          "interpretar sino una elección que tomar. Si Ansalón se salva por " +
          "segunda vez, cree él, será porque sus hijos eligieron salvarlo. No " +
          "habla de la aprendiza que una vez compartió esa convicción antes de " +
          "marcharse de Wayreth sin una palabra, y se ha enseñado a no mirar " +
          "atrás en ese camino.",
      ],
    },
    "karst-uth-matar": {
      role: "Desertor del Imperio del Dragón · Hijo secreto de Kitiara",
      bio: [
        "Karst Uth Matar se crió como soldado del Imperio del Dragón, " +
          "instruido en sus cadencias y sus crueldades antes de tener edad para " +
          "cuestionarlas. Solo más tarde supo de quién era la sangre que " +
          "llevaba: Kitiara uth Matar, cuya ambición y traición aún resuenan en " +
          "cada relato de guerra que se cuenta en Krynn.",
        "Desertó con los planes del Imperio en la cabeza y la marca del " +
          "Imperio en la espalda, y ahora combate la máquina que lo forjó, con " +
          "la esperanza de que una vida dedicada a derribarla pese contra el " +
          "nombre que le dieron. Los demás Hijos no saben si fiarse de él. Él " +
          "mismo, casi todos los días, tampoco.",
      ],
    },
    gryff: {
      role: "Joven Minotauro · El Cuerno Roto",
      bio: [
        "Gryff es un joven minotauro que lleva su vergüenza en la cara: un " +
          "cuerno partido de raíz, en un pueblo que lee un cuerno roto como un " +
          "guerrero a medio hacer. El mundo lo mira una vez y espera menos de " +
          "él, y ha construido toda su corta vida en torno a desmentir esa " +
          "mirada.",
        "Entre los Hijos de la Lanza ha encontrado algo que los suyos nunca le " +
          "ofrecieron, compañeros que lo miden por lo que hace y no por lo que " +
          "le falta. No lo diría en voz alta, pero ha empezado a luchar por " +
          "ellos y ya no solo por su nombre.",
      ],
    },
    "usha-dithon": {
      role: "Maga de la Túnica Plateada · Vigía de las Líneas de Energía",
      bio: [
        "Usha DiThon nació de un erudito y una maga y creció entre los " +
          "archivos de Thonvil. Su don la llevó de las marismas de Ergoth del " +
          "Norte a la Torre de Wayreth, donde una mente afilada y matemática la " +
          "señaló como un prodigio de la hechicería. Allí vivió un romance " +
          "discreto con otro aprendiz, Palin Majere, y ambos compartían una " +
          "sola convicción: que la magia podía doblegarse en favor de la paz.",
        "Su Prueba de la Alta Hechicería rompió esa convicción. Ante la verdad " +
          "de las líneas de energía inestables de Krynn y de la oscuridad que " +
          "se reunía tras ellas, su magia se apartó de la hechicería común " +
          "hacia algo más frío y más absoluto, una suerte de orden divino. " +
          "Huyó de Wayreth sin explicación, dejó atrás a Palin y se entregó a " +
          "las discutidas Túnicas Plateadas; hoy permanece encerrada en las " +
          "bibliotecas de su padre, en Thonvil, vigilando cómo las líneas de " +
          "energía del mundo se fracturan tras una máscara de deber.",
      ],
    },
    "ariakan-ariakas": {
      role: "Caballero del Dragón Rojo · Líder de los Ocho Caballeros de Takhisis",
      bio: [
        "Ariakan Ariakas es el rostro que el Imperio del Dragón muestra al " +
          "mundo: un Caballero del Dragón Rojo de armadura dorada, nacido para " +
          "mandar y seguro de su derecho a ello. Su padre, Duulket Ariakas, " +
          "llevó la corona de Emperador del Dragón y aun así no logró traer a " +
          "la Reina de la Oscuridad al reino mortal; el hijo pretende lograr " +
          "allí donde el padre se quedó corto.",
        "Dirige a los Ocho Caballeros de Takhisis con disciplina fría y fe " +
          "sincera, y no duda ni un instante de que Takhisis recompensará a la " +
          "mano que le abra la puerta del regreso. Para Ariakan, los Hijos de " +
          "la Lanza son menos un enemigo que un estorbo sobrante de una guerra " +
          "que su familia ya perdió una vez.",
      ],
    },
    zorath: {
      role: "El Caballero del Dragón Púrpura",
      bio: [
        "Zorath, el Caballero del Dragón Púrpura, cabalga entre los Ocho y no " +
          "se confía a ninguno de ellos. Mientras los demás Caballeros mandan " +
          "ejércitos a la vista de todos, Zorath se mantiene en los márgenes de " +
          "la historia, y las órdenes que lleva el Caballero Púrpura son las " +
          "que el Imperio nunca pone por escrito.",
        "Qué quiere Zorath, y de dónde vino Zorath, son preguntas que hasta " +
          "Ariakan ha dejado de hacer en voz alta.",
      ],
    },
    "lord-soth": {
      role: "Caballero de la Rosa Negra · Caballero de la Muerte",
      bio: [
        "Lord Soth fue en su día un Caballero de Solamnia, y podría haber sido " +
          "recordado como el más grande, de no haber roto su juramento por el " +
          "amor de una sacerdotisa elfa y haber dejado que el orgullo lo " +
          "apartara del camino de la redención. Por esa falta fue maldecido " +
          "cuando cayó el Cataclismo, condenado a la no-muerte en las ruinas de " +
          "su fortaleza, su esposa y su hijo no nacido muertos por decisión " +
          "suya.",
        "Ahora es el Caballero de la Rosa Negra: un caballero de la muerte que " +
          "mata con una palabra de poder, cuyo tacto es la muerte, y que " +
          "cabalga al frente de guerreros esqueléticos y plañideras aullantes. " +
          "En Children of the Lance regresa como una leyenda que los héroes " +
          "rezaron que fuera solo un cuento, moviéndose junto a los Ocho " +
          "Caballeros de Takhisis, y nadie sabe decir si sirve a su causa o la " +
          "inclina en silencio hacia un designio propio.",
      ],
    },
  },
};

export const COTL_CONTENT: Record<CotlLocale, CotlCopy> = { pt, en, es };
