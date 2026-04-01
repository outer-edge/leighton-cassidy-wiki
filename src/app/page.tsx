"use client";

import { useState, useRef, useCallback, useEffect } from "react";

/* ─────────────────────── DATA ─────────────────────── */

type PracticeArea = {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  content: string[];
  relatedCases?: string[];
  seeAlso?: string[];
  infobox: Record<string, string>;
};

const practiceAreas: PracticeArea[] = [
  {
    id: "trade-marks",
    title: "Trade Marks and Brands",
    shortTitle: "Trade Marks",
    summary:
      "Trade marks protect distinctive signs \u2014 words, logos, shapes, sounds \u2014 that identify the goods or services of one trader from those of others.",
    content: [
      "In the infancy of a new brand our work can include screening and clearance of new trade marks and brands. This can include regional and international clearance projects in New Zealand, Australia and internationally too. Our projects can include work for large international businesses on new product names and sub-brands, established national businesses looking to launch a new core brand, and SME\u2019s starting out in the market.",
      "Assessing an acceptable level of clearance risk to the business is always a key consideration before launch. Most searching will identify a level of risk, so it is important that the business is comfortable with the risk or mitigate some of that risk, before launch.",
      "Advising on a cost-effective strategy for our clients\u2019 trade mark portfolios, including new filings, is an important step in the life of a brand. Securing protection by using Paris convention priority and stealth-filing strategies can be an important first step in securing the brand in important markets on launch.",
      "We also understand the importance of protecting the value of a brand once registered or protected. Defending our client\u2019s brand is an essential part of our service. We believe that a brand should be effectively and consistently enforced in order to maintain its value and deter infringers and opportunists.",
      "Our opposition and litigation strategies, that we have developed through our experience and expertise in New Zealand, Australia and around the world, mean that we can help our clients develop and maintain cost-effective local, national and international enforcement strategies.",
    ],
    relatedCases: [
      "Planet Fitness v PFIP International [2024] NZHC 2745",
      "Shopify v Shopee [2023] O/0757/23",
      "Caff\u00e8 Nero \u2014 NERO EXPRESS [2016]",
    ],
    seeAlso: ["collective-certification", "domain-names", "anti-counterfeiting"],
    infobox: {
      Jurisdiction: "NZ, AU, UK, EU, International",
      "Key Legislation": "Trade Marks Act 2002 (NZ)",
      "Filing Routes": "Direct, Madrid Protocol (WIPO)",
      "Protection Period": "10 years (renewable)",
      Services: "Clearance, Filing, Prosecution, Enforcement, Opposition, Licensing",
    },
  },
  {
    id: "collective-certification",
    title: "Collective and Certification Trade Marks",
    shortTitle: "Collective Marks",
    summary:
      "Collective trade marks identify members of an association; certification marks guarantee goods or services meet defined quality standards.",
    content: [
      "Collective trade marks are used by members of an association to indicate they are part of a collective \u2014 for example, the Master Builders logo indicating MB membership.",
      "Certification trade marks indicate that the goods or services meet certain requirements or qualities set by the owner. The owner as the certifying authority cannot trade in the goods or services that the trade mark is used on \u2014 for example, the NEW ZEALAND MADE red kiwi logo by Buy NZ Made Campaign, or the internationally recognised Woolmark.",
      "We can assist our clients with the filing of their collective and certification trade marks in New Zealand and Australia and internationally as required.",
      "Leighton was the instructing solicitor and successfully represented Omega Flex Limited in highly contentious proceedings reported as O/765/18 against BSI Group (also known as the British Standards Institution) relating to the famous BSI Kitemark certification trade mark before the Registrar at the United Kingdom Intellectual Property Office.",
    ],
    relatedCases: ["Omega Flex v BSI Group \u2014 Kitemark [2018] O/765/18"],
    seeAlso: ["trade-marks", "geographical-indications"],
    infobox: {
      "Collective Mark": "Indicates association membership",
      "Certification Mark": "Guarantees quality standards",
      "Key Distinction": "Certifier cannot trade in certified goods",
      Examples: "Woolmark, NZ Made, BSI Kitemark",
      Jurisdiction: "NZ, AU, International",
    },
  },
  {
    id: "design-rights",
    title: "Design Rights",
    shortTitle: "Designs",
    summary:
      "Registered designs protect the visual appearance of a product \u2014 its shape, configuration, pattern or ornamentation \u2014 but not its function.",
    content: [
      "A registered design helps protect the appearance of a product such as its shape or pattern. Registering a design may help our clients prove that it is their design, that it is the legal owner and when the design was created.",
      "In order to be protected the design must be new. It can include physical shape, configuration, decoration or colour and pattern. The functionality is not protected \u2014 for example, a bicycle that folds up more quickly than other foldable bicycles would not be protected.",
      "Our clients in the fashion, retail, sport, automotive and engineering industries recognise that maintaining exclusivity over their designs is essential. Our team are experienced designs lawyers and have assisted clients on third party challenges to their own designs and successfully invalidating the designs of others.",
      "We assist with design protection strategy including searching, filing, registration and maintenance/renewal in New Zealand and Australia and internationally.",
    ],
    seeAlso: ["copyright", "trade-marks"],
    infobox: {
      Requirement: "Must be new",
      "What\u2019s Protected": "Shape, configuration, pattern, ornamentation",
      "Not Protected": "Features dictated solely by function",
      Industries: "Fashion, Retail, Sport, Automotive, Engineering",
      Jurisdiction: "NZ, AU, International",
    },
  },
  {
    id: "copyright",
    title: "Copyright",
    shortTitle: "Copyright",
    summary:
      "Copyright protects the expression of ideas \u2014 text, music, art, code, film \u2014 but not the underlying ideas themselves.",
    content: [
      "Copyright is an important asset of many businesses both nationally and internationally. Copyright is often said to protect the expression of ideas or information \u2014 but it doesn\u2019t protect the ideas or information itself.",
      "An often cited example is a work of fiction or novel \u2014 in that case, the text is protected by copyright but not the plot or ideas behind the plot. Similarly if a business has a product that has a unique or creative design, copyright might be the key to stopping a competitor imitating or copying that work.",
      "We can assist you in taking action against infringers of your copyright. This might include a third party infringer copying, performing, selling or communicating a work, without proper authorisation or a licence in New Zealand, Australia and in most countries abroad.",
      "We work with our clients to provide cost-efficient advice and a clear strategy around the copyright dispute process. We are familiar with technology companies that provide image right protection services such as SmartFrame.",
    ],
    relatedCases: ["Hoyle v Hoyle [2017] NZCA 516 \u2014 industrially applied copyright"],
    seeAlso: ["design-rights", "anti-counterfeiting"],
    infobox: {
      "What\u2019s Protected": "Expression of ideas (text, art, music, code)",
      "Not Protected": "Ideas, plots, concepts themselves",
      "No Registration": "Automatic upon creation",
      "Key Feature": "Does not prevent independent creation",
      Enforcement: "NZ, AU, International",
    },
  },
  {
    id: "anti-counterfeiting",
    title: "Anti-Counterfeiting, Anti-Piracy and Border Protection",
    shortTitle: "Anti-Counterfeiting",
    summary:
      "The global counterfeit trade exceeds US$1 trillion. Border protection, customs notices and coordinated enforcement are critical tools for brand owners.",
    content: [
      "Counterfeiting and piracy is a major problem for brand owners. The global trade in pirated and counterfeit goods is estimated to be an activity with an economic impact in excess of US$1 trillion. The activity is known to be coordinated by international networks of criminals.",
      "The products often pose a danger to consumers who purchase them \u2014 counterfeit pharmaceuticals with only a placebo or adverse effect and counterfeit cosmetics with high concentrations of lead or unregulated ingredients, can be a serious danger to public health.",
      "We are experienced at providing our clients with strategies to combat and mitigate counterfeiting and piracy for their businesses. We often work in conjunction with our clients, specialist investigators and customs or government enforcement agencies.",
      "Online protection measures can involve the use of innovative anti-counterfeiting and anti-piracy technology. These products, which are constantly evolving, now come with integrated A.I. tools that monitor the internet and other online channels.",
      "The recordal of customs notices at the border is often an important first step in assisting in the identification of counterfeit activity and can result in the seizure and destruction of significant counterfeit products.",
    ],
    seeAlso: ["trade-marks", "copyright"],
    infobox: {
      "Economic Impact": "US$1 trillion+ globally",
      "Key Tools": "Customs notices, trap purchases, AI monitoring",
      Coordination: "Investigators, customs, enforcement agencies",
      Industries: "Pharmaceuticals, cosmetics, luxury goods, all sectors",
      Jurisdiction: "NZ, AU, International",
    },
  },
  {
    id: "domain-names",
    title: "Domain Names",
    shortTitle: "Domain Names",
    summary:
      "Domain names are essential online identifiers. Disputes involving cybersquatting and domain trolls can be resolved through UDRP and national procedures.",
    content: [
      "A domain name gives you an online presence, which is essential in a modern world. Without a domain name most businesses could not function in the online environment.",
      "Most businesses secure a distinctive trade mark or trading name first, and then stake their claim to a domain name.",
      "We also have experience in making anonymous approaches to domain name vendors in order to acquire the domain at a reasonable cost.",
      "We have experience advising on enforcement action with domain name squatters or trolls. We have pursued multiple actions under the Uniform Dispute Resolution Policy (UDRP) before the World Intellectual Property Office (WIPO) and through national domain registry procedures.",
    ],
    seeAlso: ["trade-marks"],
    infobox: {
      "Dispute Process": "UDRP (WIPO), National procedures",
      Issues: "Cybersquatting, domain trolls, brand hijacking",
      Services: "Acquisition, enforcement, anonymous approaches",
      "Key Forum": "World Intellectual Property Office (WIPO)",
      Jurisdiction: "Global",
    },
  },
  {
    id: "plant-variety-rights",
    title: "Plant Variety Rights (PVRs)",
    shortTitle: "Plant Variety Rights",
    summary:
      "PVRs grant plant breeders exclusive rights to commercialise new cultivars, promoting innovation in agriculture and horticulture.",
    content: [
      "Plant variety rights (PVRs) protect new varieties or cultivars of plants \u2014 for example, a new variety of apple or kiwifruit.",
      "PVRs give plant breeders the exclusive right to commercialise a particular variety, including to sell propagation material like cuttings or seeds.",
      "We can assist with advice and the filing of new PVRs in New Zealand and Australia.",
    ],
    seeAlso: ["geographical-indications", "trade-marks"],
    infobox: {
      "What\u2019s Protected": "New plant varieties and cultivars",
      "Exclusive Right": "Commercialisation of propagation material",
      Examples: "New apple varieties, kiwifruit cultivars",
      Purpose: "Incentivise plant breeding innovation",
      Jurisdiction: "NZ, AU",
    },
  },
  {
    id: "geographical-indications",
    title: "Geographical Indications (GIs)",
    shortTitle: "Geographical Indications",
    summary:
      "GIs link products to their place of origin, certifying authenticity and quality based on unique regional characteristics like climate and soil.",
    content: [
      "Geographical Indications (GIs) relate to where something is made. It is a sign of authenticity and quality.",
      "It is used by producers of specific products to link their product to the reputation of the place that the products are from.",
      "A GI applicant must state what makes that type of product from that region different, such as a unique combination of climate and soil \u2014 for example, Champagne from the Champagne region of France.",
      "GIs can only be used for the products they are registered for if the products are manufactured in that place.",
      "We can assist with advice and applications for GIs in New Zealand and Australia.",
    ],
    seeAlso: ["collective-certification", "trade-marks"],
    infobox: {
      Definition: "Sign of origin, authenticity and quality",
      Requirements: "Unique regional characteristics",
      "Famous Example": "Champagne (France)",
      Restriction: "Must be manufactured in the region",
      Jurisdiction: "NZ, AU",
    },
  },
];

type SelectedCase = {
  title: string;
  year: string;
  note: string;
  jurisdiction: string;
};

const selectedCases: SelectedCase[] = [
  { title: "Karen Walker Limited v Premonition Designs Pty Ltd", year: "2025", note: "Acting for successful opponent", jurisdiction: "AU" },
  { title: "Planet Fitness Limited v PFIP International, LLC [2024] NZHC 2745", year: "2024", note: "Trade marks opposition appeal \u2014 bad faith and confusion grounds", jurisdiction: "NZ" },
  { title: "Joines v Bruichladdich Distillery Company Limited [2024] NZIPOTM 30", year: "2024", note: "Acting for successful opponent", jurisdiction: "NZ" },
  { title: "Sunnya Pty Limited v Supermega Market Limited [2023] NZHC 3266", year: "2023", note: "Successful application to stay proceedings and refer to arbitration", jurisdiction: "NZ" },
  { title: "Australasian Conference Association v Target Brands Inc [2023] ATMO 154", year: "2023", note: "Acting for successful opponent", jurisdiction: "AU" },
  { title: "Shopify Inc v Shopee Singapore \u2014 O/0757/23", year: "2023", note: "Successful opposition under s 5(2)(b) and 5(3) \u2014 costs awarded in full", jurisdiction: "UK" },
  { title: "PXG Pharma v Parsons Xtreme Golf \u2014 O/1054/22", year: "2022", note: "Partially successful under s 5(2)(b) for narrow range of goods", jurisdiction: "UK" },
  { title: "GoPro Inc v Ross Walmsley [2021] ATMO 76", year: "2021", note: "Acting for successful removal applicant", jurisdiction: "AU" },
  { title: "Cresilon, Inc v Biologische Heilmittel Heel GmbH [2021] NZIPOTM 13", year: "2021", note: "Acting for successful opponent", jurisdiction: "NZ" },
  { title: "Digit Agency v Publicis Groupe \u2014 O/344/21 Appeal", year: "2021", note: "Successful appeal before Appointed Person under s 5(2)(b), 5(3), 5(4)(a)", jurisdiction: "UK" },
  { title: "Omega Flex v BSI Group \u2014 Kitemark \u2014 O/765/18", year: "2018", note: "Largely successful invalidity of BSI Kitemark certification mark", jurisdiction: "UK" },
  { title: "Google Inc v Nuanti Limited \u2014 O-606-18 Appeal", year: "2018", note: "Successful appeal \u2014 invalidation upheld under s 5(4)(a)", jurisdiction: "UK" },
  { title: "Hoyle v Hoyle [2017] NZCA 516", year: "2017", note: "Copyright infringement \u2014 industrially applied copyright", jurisdiction: "NZ" },
  { title: "Caff\u00e8 Nero \u2014 NERO EXPRESS \u2014 O-481-16", year: "2016", note: "Partially successful defended trade mark opposition", jurisdiction: "UK" },
  { title: "Circle Health v Circle Anglia \u2014 O/068/16", year: "2016", note: "Partially successful opposition under s 5(2)(b)", jurisdiction: "UK" },
];

type InsightArticle = {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
};

const insightArticles: InsightArticle[] = [
  {
    id: "jonah-lomu-resolves",
    title: "JONAH LOMU\u2019s widow resolves dispute",
    date: "25 August 2025",
    summary: "Following a protracted legal dispute, Nadene Lomu has reached a resolution with the estate and executor of the late All Black rugby legend, Jonah Lomu, securing all trademark rights to his name, image and likeness.",
    tags: ["Trade Marks", "Celebrity IP", "New Zealand", "Personality Rights"],
    content: "Following a protracted legal dispute Nadene Lomu has reached a resolution with the estate and executor, of the late All Black rugby legend, Jonah Lomu.\n\nIn a statement issued by Nadene Lomu and her family it was confirmed that \u201cAll trademark rights, usage and ownership regarding Jonah\u2019s Name, Image, and Likeness have been legally transferred and vested solely in me in accordance with Jonah\u2019s will.\u201d\n\nThe resolution was confirmed in a recent NZ Herald article on 10 August 2025, although Mr. Darlow, the executor, said he was \u201cunable to speak to the media further on Lomu matters.\u201d\n\nA recent search of the Intellectual Property Office of New Zealand (IPONZ) trade mark database confirms that the JONAH LOMU pending and registered trade marks have been assigned and are in Nadene Lomu\u2019s name as owner.\n\nIn her statement Nadene Lomu also addresses the New Zealand Film Commission (NZFC) funded documentary about the life of Jonah Lomu, stating \u201cThe Lomu documentary, currently in production, will continue; however, as it stands, Brayley, Dhyreille and I are no part of it and will make no further comment.\u201d\n\nNadene Lomu has also accused the Australian publisher, Rockpool of exploiting the JONAH LOMU trade mark and other IP rights in the book The Immortals of New Zealand Rugby by Jamie Wall. The book is unlikely to infringe the registered trade mark \u2014 Jonah Lomu\u2019s image is on the cover alongside other All Black greats, and the use seems consistent with the doctrine of fair use.\n\nIn relation to Jonah Lomu\u2019s image on t-shirts \u2014 as reported by Nadene Lomu \u2014 this has now been taken down from the alleged infringer\u2019s website. Whether Nadene Lomu might have stronger grounds here is arguable, drawing parallels with the UK case of Fenty v Arcadia Group Brands Ltd (t/a Topshop) [2015] EWCA Civ 3, where Rihanna won a passing off claim over a T-shirt bearing her image.\n\nIt seems like the Lomu family have found some comfort in the resolution of their principal IP dispute although, given how popular Jonah Lomu was as a player, other IP issues are likely to come up from time to time.",
  },
  {
    id: "right-to-repair",
    title: "Consumer Protection \u2014 The Right to Repair in New Zealand",
    date: "28 February 2025",
    summary: "The Consumer Guarantees (Right to Repair) Amendment Bill passed its first reading in NZ Parliament, marking a significant step toward requiring manufacturers to make repair parts and information available to consumers.",
    tags: ["Consumer Law", "Right to Repair", "New Zealand", "Legislation"],
    content: "The Consumer Guarantees (Right to Repair) Amendment Bill passed its first reading on 19 February 2025, sponsored by Green Party co-leader Hon. Marama Davidson. The Bill amends the Consumer Guarantees Act 1993 to require manufacturers to make repair parts and information available to consumers.\n\nThe Bill repeals section 42 (which allowed manufacturers to opt out of providing repair parts), replaces section 12 to expand consumers\u2019 guarantees regarding information, repairs and spare parts, and inserts new section 19A empowering consumers to request repairs rather than replacements.\n\nThe Bill has cross-party support from Labour, NZ First and Te P\u0101ti M\u0101ori. National and Act New Zealand voted against \u2014 MP Dan Bidois acknowledged supporting the intent but raised concerns about the details, pointing to Australia\u2019s targeted approach with motor vehicle repair information sharing as a better model.\n\nAuckland University Professor Alex Simms of the Right to Repair Coalition called it a \u201cfirst step\u201d noting New Zealand was \u201clagging behind\u201d a worldwide movement. One drawback is that the Commerce Commission would not have enforcement powers since it amends the Consumer Guarantees Act rather than the Fair Trading Act.\n\nIf passed, consumers taking items to unauthorised repairers would no longer void their warranty \u2014 \u201cThat will really help people get stuff fixed a lot cheaper.\u201d",
  },
  {
    id: "brown-nose-day",
    title: "BROWN NOSE DAY \u2014 Not Offensive, But Poor Taste and Likely to Confuse",
    date: "12 December 2024",
    summary: "An Australian cancer charity\u2019s attempt to register BROWN NOSE DAY for bowel cancer fundraising was blocked in NZ due to likelihood of confusion with and tarnishment of the well-known RED NOSE DAY mark.",
    tags: ["Trade Marks", "Opposition", "Charitable Marks", "New Zealand"],
    content: "A recent decision National Cancer Foundation Limited v Cure Kids and Red Nose Limited [2024] NZIPOTM 39 of Assistant Commissioner Wendy Aldred regarding the BROWN NOSE DAY trade mark has caused a bit of a \u201cstink\u201d in an opposition by Cure Kids and Red Nose Limited.\n\nThe National Cancer Foundation Limited of Australia applied for BROWN NOSE DAY as part of a charitable fundraising campaign for bowel cancer, arguing the concept brings up \u201cvarious, sometimes conflicting, images\u201d giving \u201cthe opportunity to use a mixture of humour and bluntness to raise awareness of colorectal cancers.\u201d\n\nCure Kids (founded 1970s, NZ\u2019s largest non-government funder of child health research) and Red Nose Limited (formerly the SIDS Research Foundation) co-own the RED NOSE DAY brand, first used for fundraising in 1989.\n\nThe opposition succeeded on three grounds: the mark is similar to opponents\u2019 registered marks and likely to confuse (s 25(1)(b)); bearing in mind the opponents\u2019 reputation, use would be likely to confuse or deceive (s 17(1)(a)); and RED NOSE DAY is well known in NZ and use would be contrary to s 25(1)(c).\n\nWhile use of BROWN NOSE DAY for bowel cancer fundraising was found to be \u201cin poor taste,\u201d it did not meet the high bar for being offensive under section 17(1)(c). However, there was a real risk of tarnishment of the RED NOSE DAY mark by assumed association.\n\nIt is likely that BROWN NOSE DAY is dead in the water, at least in New Zealand.",
  },
  {
    id: "karmapoint",
    title: "Bad Karma for Expensify \u2014 KARMAPOINT to be Registered",
    date: "25 September 2024",
    summary: "Expensify\u2019s opposition to the KARMAPOINT mark failed because the overclaiming ground (s 32(2)) was never included in the pleadings \u2014 a costly reminder of the importance of getting pleadings right.",
    tags: ["Trade Marks", "Opposition", "Pleadings", "New Zealand", "Overclaiming"],
    content: "In Swappoint AG v Expensify, Inc. [2024] NZIPOTM 32 \u2014 the final decision of Assistant Commissioner Natasha Alley before returning to private practice \u2014 Expensify\u2019s opposition to KARMAPOINT was unsuccessful because the crucial overclaiming ground was never pleaded.\n\nSwappoint\u2019s application covered goods and services in 8 separate Classes, and the \u201cextraordinarily broad\u201d scope was at the heart of Expensify\u2019s objection. However, Expensify\u2019s Notice of Opposition relied only on s 32(1) \u2014 s 32(2) was not included in the pleadings despite being relied upon in written submissions.\n\nAs highlighted by Dr Rob Batty, s 32(2) was originally intended to empower IPONZ to query overly broad specifications, but has emerged as an independent ground of opposition.\n\nThe overclaiming issue is also before The Supreme Court of the United Kingdom in SkyKick UK Ltd v Sky Ltd (UKSC 2021/0181), where SkyKick alleges that Sky employs a strategy of applying for overly broad trade marks.\n\nThe case is a timely reminder: getting the pleadings right is fundamental. In New Zealand, it is possible to amend pleadings prior to hearing under s 194 of the Trade Marks Act 2002.",
  },
  {
    id: "shrek-sheep",
    title: "SREX, SANTANA, SHREK THE SHEEP & SHREK",
    date: "11 September 2024",
    summary: "When a gold mining company named its prospects after the famous Shrek the Sheep of Central Otago, DreamWorks\u2019 trade mark rights forced a creative renaming to SREX \u2014 Southern Region Exploration.",
    tags: ["Trade Marks", "Copyright", "Pop Culture", "New Zealand", "Mining"],
    content: "An ASX announcement on 5 September 2024 from dual-listed Santana Minerals Limited (ASX/NZX: SMI) raised interesting trade mark and copyright issues. Santana noted that \u201cdue to copyright constraints over the use of the name Shreks,\u201d their Shreks and Shrek\u2019s East prospects were renamed SREX and SREX-East \u2014 Southern Region Exploration prospects.\n\nThe location in the Bendigo-Ophir region of New Zealand\u2019s South Island is where \u201cShrek the Sheep\u201d was famously located in 2004. Shrek had evaded the muster on John and Heather Perriam\u2019s Bendigo Station for several years and when finally rounded up, had a 27-kilogram fleece \u2014 nearly five times the weight of an average merino fleece.\n\nShrek the Sheep gained international media attention on CNN and BBC, met New Zealand\u2019s prime minister, and was featured in a children\u2019s book. Sadly, Shrek passed away in 2011.\n\nIn New Zealand, DreamWorks Animation L.L.C owns the SHREK registered trade mark since 2004. Mr Perriam attempted to file for SHREK in 2004 (withdrawn) and again with a figurative mark in 2008 (also withdrawn). DreamWorks\u2019 solicitors and the Bendigo Station owner agreed that \u201cas long as we called him \u2018Shrek the Sheep\u2019 and didn\u2019t go with commercial products, they were happy to put it to bed.\u201d\n\nRather than face scrutiny, Santana elected to change the name. The deterrent effect of DreamWorks\u2019 registered trade mark was sufficient.\n\nIt is advisable for Santana to file trade marks for SREX for mining services. Copyright is unlikely to offer protection for the name, and registered trade mark protection is usually the most effective way to secure a newly established name.",
  },
  {
    id: "jonah-lomu-invalidated",
    title: "JONAH LOMU Trade Mark Invalidated",
    date: "3 September 2024",
    summary: "Nadene Lomu\u2019s JONAH LOMU trade mark registration was invalidated on grounds of bad faith and being contrary to law, in a dispute rooted in a $800,000 NZFC documentary about the rugby legend\u2019s life.",
    tags: ["Trade Marks", "Bad Faith", "Invalidity", "Celebrity IP", "New Zealand"],
    content: "In Nadene Lomu v Stylez Limited [2024] NZIPOTM 33, the Intellectual Property Office of New Zealand invalidated the JONAH LOMU trademark registration on grounds of bad faith (s 17(2)) and being contrary to law (s 17(1)(b)).\n\nThe dispute originated from a $800,000 New Zealand Film Commission funded documentary about Jonah Lomu\u2019s life. Mrs Lomu sent a cease-and-desist letter to the NZFC and all producers.\n\nIn 1997, Mr Lomu licensed his IP to Stylez Limited, the corporate trustee of the Silk Trust benefiting his immediate family. Following his death in 2015, the 1997 Licence was varied in 2017. Mrs Lomu claimed the 2017 Variation was obtained through undue influence and duress.\n\nAssistant Commissioner Nigel Robb found that \u201ca reasonable and experienced business person would have recognised that the 2017 Variation Agreement and 2017 Deed were in place.\u201d The application was filed \u201cto effectively remove Stylez as the exclusive licensee\u201d \u2014 falling short of acceptable commercial conduct.\n\nOn the contrary to law ground, Mrs Lomu could not use the JONAH LOMU mark without Stylez\u2019s approval at the time of filing. Even the cease-and-desist demands constituted use contrary to the 2017 Deed.\n\nThe criticisms of executor Mr Darlow were found to be unfounded \u2014 he had acted professionally to avoid the estate being declared bankrupt.",
  },
  {
    id: "supermacs-big-mac",
    title: "A Victory for Ireland\u2019s Supermac\u2019s over McDonald\u2019s \u2014 BIG MAC",
    date: "28 August 2024",
    summary: "The EU General Court partially revoked McDonald\u2019s BIG MAC trade mark for failure to prove genuine use for chicken products and restaurant services \u2014 a David vs Goliath victory for Irish chain Supermac\u2019s.",
    tags: ["Trade Marks", "Non-Use", "EU Law", "Revocation", "Fast Food"],
    content: "The BIG MAC is significant globally and widely known in popular culture \u2014 it even has its own price index published by The Economist since 1996, measuring \u201cpatty power parity\u201d between currencies.\n\nThe fight between McDonald\u2019s and Ireland\u2019s Supermac\u2019s in the EU began when Supermac\u2019s attempted to register its name as an EU Trade Mark in 2014. McDonald\u2019s opposed and was partially successful in 2016.\n\nIn April 2017, Supermac\u2019s applied to revoke McDonald\u2019s BIG MAC EUTM registration on grounds of non-use. The case went through the Cancellation Division, the Board of Appeal, and finally to the General Court.\n\nThe General Court held that McDonald\u2019s had not proved genuine use for \u201cchicken sandwiches,\u201d \u201cfoods prepared from poultry products,\u201d and restaurant/drive-through services. The Court was critical of McDonald\u2019s evidence \u2014 it failed to provide adequate evidence of the extent of use.\n\nWhile this was technically a partial success for Supermac\u2019s, it has been widely reported as a resounding win \u2014 everyone loves an underdog. Supermac\u2019s founder Pat McDonagh described it as a David vs Goliath battle.\n\nMcDonald\u2019s responded that their rights \u201cremain unaffected.\u201d Even a company as large as McDonald\u2019s must provide adequate evidence of use or risk losing their registration.",
  },
];

type Section = "home" | "practice-areas" | "ip-disputes" | "insights" | "people" | "contact";

/* ─────────────────────── COMPONENTS ─────────────────────── */

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

function RevealSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useRevealOnScroll();
  return (
    <div ref={ref} className={`reveal-section ${isVisible ? 'revealed' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function OrnamentalDivider() {
  return <div className="ornamental-divider" aria-hidden="true"><span /></div>;
}

function Monogram({ size = "sm" }: { size?: "sm" | "lg" }) {
  return <span className={`monogram ${size === "lg" ? "monogram-lg" : ""}`}>LC</span>;
}

function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
  return (
    <button onClick={toggle} className="p-1.5 rounded-md hover:bg-border-light/50 transition-colors text-muted" title="Toggle theme" aria-label="Toggle theme">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
    </button>
  );
}


function Breadcrumbs({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted mb-4 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-border">&rsaquo;</span>}
          {i === items.length - 1 ? <span className="text-foreground">{item}</span> : <span className="hover:text-link cursor-pointer">{item}</span>}
        </span>
      ))}
    </nav>
  );
}

function InfoBox({ title, data }: { title: string; data: Record<string, string> }) {
  return (
    <aside className="float-right ml-5 mb-4 w-72 border border-border bg-infobox-bg rounded-sm text-sm max-sm:float-none max-sm:w-full max-sm:ml-0 max-sm:mb-5 content-panel">
      <div className="infobox-header-premium text-white px-3 py-2.5 font-serif font-semibold text-center text-base">{title}</div>
      <div className="divide-y divide-border-light">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex">
            <div className="w-28 shrink-0 px-3 py-1.5 font-semibold bg-paper-alt/50 text-muted text-xs uppercase tracking-wide">{key}</div>
            <div className="px-3 py-1.5 flex-1 text-foreground">{value}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav className="sticky top-20 w-56 shrink-0 hidden lg:block">
      <div className="border border-border bg-sidebar-bg rounded-sm p-3">
        <h4 className="font-serif font-semibold text-heading text-sm mb-2 pb-1.5 border-b border-border">Contents</h4>
        <ol className="space-y-0.5 text-xs">
          {items.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="block pl-3 py-0.5 border-l-2 border-transparent text-muted hover:text-link hover:border-border transition-colors">
                {i + 1}. {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

function SeeAlso({ ids, onNavigate }: { ids: string[]; onNavigate: (id: string) => void }) {
  return (
    <div className="mt-6 pt-4 border-t border-border-light">
      <h3 className="font-serif text-sm font-semibold text-heading mb-2">See also</h3>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {ids.map((id) => {
          const pa = practiceAreas.find((p) => p.id === id);
          return pa ? <li key={id}><button onClick={() => onNavigate(id)} className="text-link hover:underline">{pa.title}</button></li> : null;
        })}
      </ul>
    </div>
  );
}

/* ─────────────────────── MAIN PAGE ─────────────────────── */

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [activePracticeArea, setActivePracticeArea] = useState<string | null>(null);
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [activeDispute, setActiveDispute] = useState<string | null>(null);
  const [caseFilter, setCaseFilter] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback((section: Section, sub?: string) => {
    setActiveSection(section);
    setActivePracticeArea(section === "practice-areas" && sub ? sub : null);
    setActiveInsight(section === "insights" && sub ? sub : null);
    setActiveDispute(section === "ip-disputes" && sub ? sub : null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navItems: { label: string; section: Section }[] = [
    { label: "Main Page", section: "home" },
    { label: "About", section: "people" },
    { label: "Intellectual Property", section: "practice-areas" },
    { label: "IP Disputes", section: "ip-disputes" },
    { label: "Insights", section: "insights" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col" ref={mainRef}>
      {/* HEADER */}
      <header className="sticky top-0 z-50 premium-header">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="cursor-pointer flex items-center gap-4" onClick={() => navigate("home")}>
              <Monogram size="lg" />
              <div className="flex flex-col">
                <h1 className="font-serif text-2xl sm:text-3xl font-light text-heading" style={{ letterSpacing: '-0.03em' }}>Leighton Cassidy Legal</h1>
                <span className="hidden sm:inline text-[11px] text-gold uppercase tracking-[0.2em]">Intellectual Property is in our DNA</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="sm:hidden p-1.5 text-muted" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
                </svg>
              </button>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-0 -mb-px">
            {navItems.map((item) => (
              <button key={item.section} onClick={() => navigate(item.section)}
                className={`nav-link ${activeSection === item.section ? "active" : ""}`}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-border bg-paper">
            {navItems.map((item) => (
              <button key={item.section} onClick={() => navigate(item.section)}
                className={`block w-full text-left px-4 py-2.5 text-sm border-b border-border-light ${activeSection === item.section ? "text-accent font-medium bg-accent-light" : "text-foreground"}`}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 py-10">

        {/* HOME */}
        {activeSection === "home" && (
          <div className="fade-in">
            <RevealSection>
            <div className="bg-paper content-panel rounded-sm p-8 mb-10 wiki-article">
              <h2 className="font-serif text-2xl text-heading mb-1" style={{ letterSpacing: '-0.02em', fontWeight: 300 }}>We Make Your Intellectual Property Challenges Easier to Manage</h2>
              <h3 className="font-serif text-lg text-heading mt-4 mb-3">How We Can Work with You</h3>
              <p>Leighton Cassidy Legal is a law firm based in New Zealand and Australia.</p>
              <p>Our firm has market-leading practices in intellectual property, commercialisation of intellectual property, commercial advisory and dispute resolution and litigation.</p>
              <p>As an entrepreneurial and commercially pragmatic firm, our purpose is to provide trusted advisory, intellectual property and dispute resolution/litigation services to our clients. We take a collaborative and commercial approach with our clients, shaping our services to their needs and requirements.</p>
              <p>Our New Zealand and Australia offices are supported by our international network and international partner firms, which enable us to advise our clients with seamless efficiency. We have developed working relationships over many years through our membership of the International Trademark Association (INTA), Intellectual Property Society of Australia and New Zealand (IPSANZ) and other membership organisations.</p>
              <p>Our clients choose to work with us because we provide commercial and effective outcomes through our established legal experience and industry knowledge. We provide our services on time and on budget.</p>
              <p>Leighton Cassidy and his team have been nominated and won awards in the field of intellectual property. Leighton and Natalie are both recognised in the legal directories as leading professionals in the field of intellectual property and disputes.</p>
              <p>We operate across our offices in Dunedin, Auckland, Sydney and remotely.</p>
            </div>
            </RevealSection>
            <OrnamentalDivider />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RevealSection>
                <div>
                  <h3 className="font-serif text-lg text-heading mb-4 pb-2" style={{ borderBottom: '2px double var(--border)', letterSpacing: '-0.01em' }}>Practice Areas</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {practiceAreas.map((pa, i) => (
                      <RevealSection key={pa.id} delay={i * 60}>
                      <button onClick={() => navigate("practice-areas", pa.id)} className="text-left p-4 border border-border-light rounded-sm premium-card hover:border-accent group bg-paper w-full">
                        <h4 className="font-serif text-sm font-semibold text-heading group-hover:text-accent">{pa.shortTitle}</h4>
                        <p className="text-xs text-muted mt-1.5 line-clamp-2 leading-relaxed">{pa.summary}</p>
                      </button>
                      </RevealSection>
                    ))}
                  </div>
                </div>
                </RevealSection>
                <RevealSection delay={200}>
                <div className="mt-8 content-panel rounded-sm overflow-hidden bg-paper">
                  <div className="infobox-header-premium px-4 py-2.5"><h3 className="text-white font-serif text-sm font-semibold">Featured Insight</h3></div>
                  <div className="p-5">
                    <h4 className="font-serif text-xl text-heading mb-2 hover:text-link cursor-pointer" onClick={() => navigate("insights", "jonah-lomu-resolves")}>{insightArticles[0].title}</h4>
                    <p className="text-xs text-muted mb-3">{insightArticles[0].date}</p>
                    <p className="text-[15px] leading-relaxed mb-3">{insightArticles[0].summary}</p>
                    <button onClick={() => navigate("insights", "jonah-lomu-resolves")} className="text-sm text-link hover:underline">Read full article &rarr;</button>
                  </div>
                </div>
                </RevealSection>
              </div>
              <div className="space-y-6">
                <RevealSection delay={100}>
                <div className="content-panel rounded-sm bg-paper">
                  <div className="bg-sidebar-bg px-4 py-2.5 border-b border-border"><h3 className="font-serif text-sm font-semibold text-heading">Current Insights</h3></div>
                  <div className="divide-y divide-border-light">
                    {insightArticles.slice(1).map((article) => (
                      <button key={article.id} onClick={() => navigate("insights", article.id)} className="block w-full text-left px-4 py-3 hover:bg-accent-light/30 transition-colors">
                        <p className="text-sm text-link hover:underline leading-snug">{article.title}</p>
                        <p className="text-[11px] text-muted mt-1">{article.date}</p>
                      </button>
                    ))}
                  </div>
                </div>
                </RevealSection>
                <RevealSection delay={200}>
                <div className="content-panel rounded-sm bg-paper">
                  <div className="bg-sidebar-bg px-4 py-2.5 border-b border-border"><h3 className="font-serif text-sm font-semibold text-heading">Recognition</h3></div>
                  <div className="p-4 space-y-3">
                    <div className="pl-3 border-l-2 border-gold">
                      <p className="text-xs text-muted italic">&ldquo;Leighton Cassidy brings deep international expertise to brand protection and enforcement, shaped by two decades in the UK.&rdquo;</p>
                      <p className="text-[10px] text-gold mt-1 font-medium uppercase tracking-wider">WTR1000 2026</p>
                    </div>
                    <div className="pl-3 border-l-2 border-gold">
                      <p className="text-xs text-muted italic">&ldquo;Leighton Cassidy excels in advising on intellectual property and commercial matters.&rdquo;</p>
                      <p className="text-[10px] text-gold mt-1 font-medium uppercase tracking-wider">WTR1000 2025</p>
                    </div>
                  </div>
                </div>
                </RevealSection>
                <RevealSection delay={300}>
                <div className="content-panel rounded-sm bg-paper p-4">
                  <h4 className="font-serif text-xs font-semibold text-heading mb-2">Memberships</h4>
                  <div className="flex flex-wrap gap-2 text-[11px] text-muted">
                    {["INTA", "IPSANZ", "Business South"].map((m) => (
                      <span key={m} className="px-2 py-0.5 bg-paper-alt rounded-sm border border-border-light">{m}</span>
                    ))}
                  </div>
                </div>
                </RevealSection>
              </div>
            </div>
          </div>
        )}

        {/* PRACTICE AREAS */}
        {activeSection === "practice-areas" && (
          <div className="fade-in">
            {!activePracticeArea ? (
              <>
                {/* <Breadcrumbs items={["Main Page", "Practice Areas"]} /> */}
                <h2 className="font-serif text-2xl text-heading mb-2">Intellectual Property Practice Areas</h2>
                <p className="text-muted mb-6 max-w-2xl">Our team have decades of experience advising clients across New Zealand, Australia, the United Kingdom, European Union, Ireland, Canada, United States, China, Hong Kong SAR and Japan.</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {practiceAreas.map((pa, i) => (
                    <RevealSection key={pa.id} delay={i * 60}>
                    <button onClick={() => navigate("practice-areas", pa.id)} className="text-left p-5 border border-border rounded-sm premium-card hover:border-accent group bg-paper w-full">
                      <h3 className="font-serif text-lg text-heading group-hover:text-accent mb-1.5">{pa.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{pa.summary}</p>
                      <span className="text-xs text-link mt-3 inline-block">Read article &rarr;</span>
                    </button>
                    </RevealSection>
                  ))}
                </div>
              </>
            ) : (() => {
              const pa = practiceAreas.find((p) => p.id === activePracticeArea)!;
              const tocItems = [
                { id: "overview", label: "Overview" },
                { id: "details", label: "How We Work" },
                ...(pa.relatedCases ? [{ id: "related-cases", label: "Related Cases" }] : []),
                ...(pa.seeAlso ? [{ id: "see-also", label: "See Also" }] : []),
              ];
              return (
                <>
                  {/* <Breadcrumbs items={["Main Page", "Practice Areas", pa.title]} /> */}
                  <div className="flex gap-6">
                    <TableOfContents items={tocItems} />
                    <article className="flex-1 wiki-article min-w-0">
                      <h1 className="font-serif text-3xl text-heading mb-1 font-light" style={{ letterSpacing: '-0.025em' }}>{pa.title}</h1>
                      <p className="text-sm text-muted italic mb-4">From Leighton Cassidy Legal — Intellectual Property is in our DNA</p>
                      <InfoBox title={pa.shortTitle} data={pa.infobox} />
                      <div id="overview"><p className="text-[15px] leading-relaxed font-medium mb-4">{pa.summary}</p></div>
                      <h2 id="details">How We Work</h2>
                      {pa.content.map((p, i) => <p key={i}>{p}</p>)}
                      {pa.relatedCases && (
                        <><h2 id="related-cases">Related Cases</h2>
                        <ul>{pa.relatedCases.map((c, i) => <li key={i}><button onClick={() => navigate("ip-disputes", "selected-cases")} className="text-link hover:underline">{c}</button></li>)}</ul></>
                      )}
                      {pa.seeAlso && <div id="see-also"><SeeAlso ids={pa.seeAlso} onNavigate={(id) => navigate("practice-areas", id)} /></div>}
                      <div className="mt-6 pt-4 border-t border-border-light text-xs text-muted">
                        <button onClick={() => navigate("practice-areas")} className="text-link hover:underline">&larr; Back to all Practice Areas</button>
                      </div>
                    </article>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* IP DISPUTES */}
        {activeSection === "ip-disputes" && (
          <div className="fade-in">
            {!activeDispute ? (
              <>
                {/* <Breadcrumbs items={["Main Page", "IP Disputes"]} /> */}
                <h2 className="font-serif text-2xl text-heading mb-2">IP Dispute Resolution and Litigation</h2>
                <p className="text-muted mb-4 max-w-2xl">Our team have decades of experience advising clients in relation to their intellectual property dispute resolution and litigation requirements.</p>
                <p className="text-muted mb-6 max-w-2xl">In addition to our core practice in New Zealand and Australia, we have extensive international experience practising in international jurisdictions including the United Kingdom, European Union and Ireland and working with clients and agents based in those countries. We also have extensive experience in advising clients from many other countries including Canada, United States, China, Hong Kong SAR and Japan.</p>
                <div className="grid sm:grid-cols-3 gap-5 mb-10">
                  {[
                    { id: "opposition", title: "Opposition, Revocation, Invalidity", desc: "Protecting IP assets through registry proceedings, trade mark watching and negotiated resolutions." },
                    { id: "litigation", title: "Litigation and Appeals", desc: "Full dispute resolution from cease and desist through to trial and appeal before the registries and courts." },
                    { id: "selected-cases", title: "Selected Cases", desc: "A selection of reported cases across NZ, Australia and the UK." },
                  ].map((item, i) => (
                    <RevealSection key={item.id} delay={i * 100}>
                    <button onClick={() => navigate("ip-disputes", item.id)} className="text-left p-5 border border-border rounded-sm premium-card hover:border-accent group bg-paper w-full">
                      <h3 className="font-serif text-lg text-heading group-hover:text-accent mb-1.5">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                      <span className="text-xs text-link mt-3 inline-block">Read more &rarr;</span>
                    </button>
                    </RevealSection>
                  ))}
                </div>
                <RevealSection>
                <blockquote className="border-l-3 border-gold pl-4 text-muted italic max-w-2xl" style={{ borderLeftWidth: '3px', borderLeftColor: 'var(--gold)' }}>
                  &ldquo;Leighton Cassidy brings deep international expertise to brand protection and enforcement, shaped by two decades in the UK guiding high-value trademark matters. He advises on worldwide filing strategies, registry proceedings and commercial exploitation of rights, as well as coordinating multinational litigation and negotiated settlements for diverse rights holders.&rdquo;
                  <cite className="block text-xs not-italic mt-2 font-medium uppercase tracking-wider" style={{ color: 'var(--gold)' }}>&mdash; WTR1000 2026</cite>
                </blockquote>
                </RevealSection>
              </>
            ) : activeDispute === "opposition" ? (
              <>
                {/* <Breadcrumbs items={["Main Page", "IP Disputes", "Opposition, Revocation, Invalidity"]} /> */}
                <article className="wiki-article max-w-3xl">
                  <h1 className="font-serif text-3xl text-heading mb-1 font-light" style={{ letterSpacing: '-0.025em' }}>Opposition, Revocation, Invalidity Proceedings</h1>
                  <p className="text-sm text-muted italic mb-4">From Leighton Cassidy Legal &mdash; Intellectual Property is in our DNA</p>
                  <InfoBox title="Registry Proceedings" data={{ Scope: "Opposition, revocation, invalidation", Jurisdiction: "NZ, AU, UK, EU, International", Resolution: "Decision or negotiated settlement", Services: "Watching, co-existence agreements, prior-rights agreements" }} />
                  <p>We support our clients in protecting their intellectual property assets, which are often the most valuable assets in their business.</p>
                  <p>We assist with advising our clients directly in New Zealand and Australia in connection with trade mark opposition, revocation and invalidation proceedings. We also have experience in managing disputes internationally often co-ordinating with foreign counsel to run parallel proceedings in other countries and territories.</p>
                  <p>We have decades of experience in running these proceedings to a successful decision but also provide pragmatic and commercial advice that often results in a negotiated resolution. That might require the negotiation of a co-existence agreement, a letter of undertaking or a prior-rights agreement.</p>
                  <p>We can also provide trade mark watching services to monitor the trade mark registers (often globally or in specific markets) for potentially infringing trade marks in order to oppose the application once it is published for opposition purposes.</p>
                  <div className="mt-6 pt-4 border-t border-border-light text-xs text-muted flex gap-4">
                    <button onClick={() => navigate("ip-disputes")} className="text-link hover:underline">&larr; Back to IP Disputes</button>
                    <button onClick={() => navigate("ip-disputes", "selected-cases")} className="text-link hover:underline">Selected Cases &rarr;</button>
                  </div>
                </article>
              </>
            ) : activeDispute === "litigation" ? (
              <>
                {/* <Breadcrumbs items={["Main Page", "IP Disputes", "Litigation and Appeals"]} /> */}
                <article className="wiki-article max-w-3xl">
                  <h1 className="font-serif text-3xl text-heading mb-1 font-light" style={{ letterSpacing: '-0.025em' }}>Litigation and Appeals before the Registries and the Courts</h1>
                  <p className="text-sm text-muted italic mb-4">From Leighton Cassidy Legal &mdash; Intellectual Property is in our DNA</p>
                  <InfoBox title="Litigation & Appeals" data={{ Scope: "All stages of dispute resolution", Courts: "Registry appeals, High Court, Court of Appeal", Services: "Cease & desist, proceedings, trial, appeal", "Fee Structure": "Staged estimates for budget certainty" }} />
                  <p>We support our clients through all stages of the dispute resolution and litigation process.</p>
                  <p>We have extensive experience in appeals from registry proceedings through first instance appeal and through the Courts. We are often able to negotiate settlements on behalf of our clients cost effectively with minimal disruption to the business.</p>
                  <p>We assist with cease and desist letters and are often able to resolve issues without issuing proceedings. We can advise on a litigation strategy, instruct counsel, arrange the issue of proceedings, deal with the evidentiary stages right through to trial and any appeal. We can provide staged fee estimates at specific stages of the dispute in order to provide budget certainty for our clients.</p>
                  <p>We can also assist with litigation support services through our relationship with our trusted suppliers.</p>
                  <p>We can work with our client&apos;s preferred counsel if desired. We have also developed good relationships with the IP bar in New Zealand and Australia, so we can also recommend a number of cost effective and appropriately experienced counsel for the dispute at hand.</p>
                  <div className="mt-6 pt-4 border-t border-border-light text-xs text-muted flex gap-4">
                    <button onClick={() => navigate("ip-disputes")} className="text-link hover:underline">&larr; Back to IP Disputes</button>
                    <button onClick={() => navigate("ip-disputes", "selected-cases")} className="text-link hover:underline">Selected Cases &rarr;</button>
                  </div>
                </article>
              </>
            ) : activeDispute === "selected-cases" ? (
              <>
                {/* <Breadcrumbs items={["Main Page", "IP Disputes", "Selected Cases"]} /> */}
                <h2 className="font-serif text-2xl text-heading mb-2">Selected Cases</h2>
                <p className="text-muted mb-4 max-w-2xl text-sm">A selection of reported cases spanning trade mark oppositions, invalidity proceedings, appeals and copyright disputes across multiple jurisdictions.</p>
                <div className="flex gap-2 mb-5 flex-wrap">
                  {["all", "NZ", "AU", "UK"].map((f) => (
                    <button key={f} onClick={() => setCaseFilter(f)}
                      className={`px-3 py-1 text-xs rounded-sm border transition-colors ${caseFilter === f ? "bg-accent text-white border-accent" : "bg-paper border-border text-muted hover:border-accent"}`}>
                      {f === "all" ? "All Jurisdictions" : f}
                    </button>
                  ))}
                </div>
                <div className="space-y-0 content-panel rounded-sm overflow-hidden bg-paper">
                  <div className="grid grid-cols-[1fr_60px_60px] sm:grid-cols-[1fr_80px_80px] bg-sidebar-bg px-4 py-2.5 text-xs font-semibold text-muted uppercase tracking-wider" style={{ borderBottom: '2px solid var(--gold)' }}>
                    <span>Case</span><span className="text-center">Year</span><span className="text-center">Jdx</span>
                  </div>
                  {selectedCases.filter((c) => caseFilter === "all" || c.jurisdiction === caseFilter).map((c, i) => (
                    <div key={i} className="case-row grid grid-cols-[1fr_60px_60px] sm:grid-cols-[1fr_80px_80px] px-4 py-3.5 border-b border-border-light last:border-0 hover:bg-accent-light/20">
                      <div>
                        <p className="text-sm font-serif text-heading leading-snug">{c.title}</p>
                        <p className="text-xs text-muted mt-0.5">{c.note}</p>
                      </div>
                      <span className="text-center text-sm text-muted self-center">{c.year}</span>
                      <span className="text-center self-center">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-sm border font-medium ${c.jurisdiction === 'NZ' ? 'badge-nz' : c.jurisdiction === 'AU' ? 'badge-au' : 'badge-uk'}`}>{c.jurisdiction}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-border-light text-xs text-muted">
                  <button onClick={() => navigate("ip-disputes")} className="text-link hover:underline">&larr; Back to IP Disputes</button>
                </div>
              </>
            ) : null}
          </div>
        )}

        {/* INSIGHTS */}
        {activeSection === "insights" && (
          <div className="fade-in">
            {!activeInsight ? (
              <>
                {/* <Breadcrumbs items={["Main Page", "Insights"]} /> */}
                <h2 className="font-serif text-2xl text-heading mb-2">Insights</h2>
                <p className="text-muted mb-6 max-w-2xl text-sm">Updates on developments in the law, interesting cases and newsworthy stories across industries and relevant sectors.</p>
                <div className="space-y-5">
                  {insightArticles.map((article, i) => (
                    <RevealSection key={article.id} delay={i * 80}>
                    <button onClick={() => navigate("insights", article.id)} className="block w-full text-left p-6 border border-border rounded-sm premium-card hover:border-accent bg-paper group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-serif text-lg text-heading group-hover:text-accent leading-snug">{article.title}</h3>
                          <p className="text-xs text-muted mt-1">{article.date}</p>
                          <p className="text-sm text-muted mt-2 leading-relaxed">{article.summary}</p>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {article.tags.map((tag) => <span key={tag} className="text-[10px] px-2 py-0.5 bg-paper-alt border border-border-light rounded-sm text-muted">{tag}</span>)}
                          </div>
                        </div>
                        <span className="text-link text-sm shrink-0 mt-1">&rarr;</span>
                      </div>
                    </button>
                    </RevealSection>
                  ))}
                </div>
              </>
            ) : (() => {
              const article = insightArticles.find((a) => a.id === activeInsight)!;
              return (
                <>
                  {/* <Breadcrumbs items={["Main Page", "Insights", article.title]} /> */}
                  <article className="wiki-article max-w-3xl">
                    <h1 className="font-serif text-3xl text-heading mb-1 font-light leading-snug" style={{ letterSpacing: '-0.025em' }}>{article.title}</h1>
                    <div className="flex items-center gap-3 mb-5 text-sm text-muted">
                      <time>{article.date}</time><span className="text-border">|</span><span>Leighton Cassidy Legal &mdash; Insights</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {article.tags.map((tag) => <span key={tag} className="text-[10px] px-2 py-0.5 bg-paper-alt border border-border-light rounded-sm text-muted">{tag}</span>)}
                    </div>
                    <div className="px-5 py-4 mb-8 text-sm italic font-serif leading-relaxed" style={{ background: 'color-mix(in srgb, var(--gold-light) 40%, transparent)', borderLeft: '3px solid var(--gold)' }}>{article.summary}</div>
                    {article.content.split("\n\n").map((paragraph, i) => <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>)}
                    <div className="mt-8 pt-4 border-t border-border-light text-xs text-muted">
                      <button onClick={() => navigate("insights")} className="text-link hover:underline">&larr; Back to all Insights</button>
                    </div>
                  </article>
                </>
              );
            })()}
          </div>
        )}

        {/* PEOPLE */}
        {activeSection === "people" && (
          <div className="fade-in">
            {/* <Breadcrumbs items={["Main Page", "About"]} /> */}
            <h2 className="font-serif text-2xl text-heading mb-2">About Leighton Cassidy Legal</h2>
            <p className="text-muted mb-6 max-w-2xl">Our team have decades of experience advising clients in relation to their intellectual property and dispute resolution requirements.</p>
            <div className="space-y-8">
              <article className="wiki-article">
                <div className="flex gap-6 max-sm:flex-col">
                  <InfoBox title="Leighton Cassidy" data={{ Role: "Director & Founder", Admitted: "NZ (1997), England & Wales (2006), Ireland (2017)", "UK Experience": "20+ years, co-head of IP team from 2013", Recognition: "WTR1000 2025 & 2026, Legal 500, Managing IP", "Pro Bono": "Chair, Otago University RFC", Committees: "INTA Indigenous Rights Committee" }} />
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl text-heading mb-3 font-normal">Leighton Cassidy</h3>
                    <p className="text-sm text-accent font-medium mb-3">Director</p>
                    <p className="mb-3">Leighton is the founder of Leighton Cassidy Legal, established in 2026. Prior to returning to live and practice in New Zealand in 2023, Leighton was a partner in an international law firm based in London, England. Leighton spent over 20 years in the UK and was co-head of the intellectual property team from 2013.</p>
                    <p className="mb-3">Leighton is admitted in New Zealand (1997) England &amp; Wales (2006) and Ireland (2017). He advises clients in relation to their intellectual property and commercial requirements including worldwide trade mark and design clearance, filing and prosecution; contentious registry proceedings; trade mark licensing, exploitation and commercialisation; settlement, co-existence agreements and dispute resolution; and managing intellectual property litigation internationally.</p>
                    <p className="mb-3">Leighton is internationally recognised in the legal directories including the Legal 500, Who&apos;s Who, Managing IP, World Trademark Review. Leighton and his team are a past winner of Managing IP&apos;s Firm of the Year, Trade Mark (Law Firms).</p>
                    <p className="mb-3">He is a past committee member of The University of Otago Trust (UK), current Chair of the Otago University Rugby Football Club, sits on the NZURFC committee and is an alternate Director for the Highlanders super rugby team. He sits on the Indigenous Rights Committee of the International Trademark Association (INTA).</p>
                    <blockquote>&ldquo;Leighton Cassidy brings deep international expertise to brand protection and enforcement, shaped by two decades in the UK guiding high-value trademark matters.&rdquo;<br/><cite className="text-xs not-italic text-muted">&mdash; WTR1000 2026</cite></blockquote>
                  </div>
                </div>
              </article>
              <OrnamentalDivider />
              <article className="wiki-article">
                <div className="flex gap-6 max-sm:flex-col">
                  <InfoBox title="Natalie Harre" data={{ Role: "Principal", Expertise: "IP enforcement, trade marks, copyright, consumer law", Courts: "District, High, Court of Appeal, IPONZ, IP Australia", Recognition: "Best Lawyers NZ, WTR 1000, Lexology Index", "Pro Bono": "Bombay School Board of Trustees", "Past Roles": "IPSANZ, Auckland Women Lawyers' Association" }} />
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl text-heading mb-3 font-normal">Natalie Harre</h3>
                    <p className="text-sm text-accent font-medium mb-3">Principal</p>
                    <p className="mb-3">Natalie brings a vibrant energy and a wealth of expertise to her role as principal. She is known for her forward-thinking, commercial approach and passion for helping clients protect and enforce their intellectual property rights in New Zealand, Australia and internationally.</p>
                    <p className="mb-3">Prior to joining Leighton Cassidy Legal, Natalie was a principal at a leading New Zealand intellectual property firm and headed up the firm&apos;s Auckland litigation team.</p>
                    <p className="mb-3">Her expertise spans complex IP enforcement, trade mark filing and prosecution, copyright, border protection, domain name disputes, privacy, advertising, consumer law, commercial advice and dispute resolution.</p>
                    <p className="mb-3">Natalie has appeared before the District Courts, High Court, Court of Appeal, the Intellectual Property Office of New Zealand, and IP Australia. She is an experienced negotiator, regularly advises on settlement and co-existence agreements, and has attended mediations and arbitrations as both lead and support counsel.</p>
                    <p>Natalie is recognised in leading legal directories including Best Lawyers New Zealand (Intellectual Property), WTR 1000 (Enforcement &amp; Litigation), and Lexology Index (formerly Who&apos;s Who Legal, Trade Marks).</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        )}

        {/* CONTACT */}
        {activeSection === "contact" && (
          <div className="fade-in">
            {/* <Breadcrumbs items={["Main Page", "Contact"]} /> */}
            <h2 className="font-serif text-2xl text-heading mb-6">Contact</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="mb-6 text-[15px]">Please get in touch via your usual contact or feel free to reach out if you are a new client and would like an initial consultation at no charge.</p>
                <div className="space-y-4">
                  {[
                    { city: "Dunedin", address: "Level 1, 218 George Street, Dunedin, 9016", country: "New Zealand", type: "Head Office" },
                    { city: "Auckland", address: "110 Carlton Gore Road, Newmarket, Auckland, 1023", country: "New Zealand", type: "Office" },
                    { city: "Sydney", address: "1 Denison St, North Sydney, New South Wales, 2060", country: "Australia", type: "Office" },
                  ].map((office) => (
                    <div key={office.city} className="p-4 border border-border rounded-sm bg-paper">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-serif font-semibold text-heading">{office.city}</h4>
                        {office.type === "Head Office" && <span className="text-[10px] px-1.5 py-0.5 rounded-sm font-medium uppercase tracking-wider" style={{ background: 'var(--gold)', color: 'white' }}>Head Office</span>}
                      </div>
                      <p className="text-sm text-foreground">{office.address}</p>
                      <p className="text-sm text-muted">{office.country}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-highlight/30 border border-border rounded-sm">
                  <p className="text-sm"><strong className="text-heading">International Network:</strong> <span className="text-muted">Supported by our international partner firms and memberships of INTA, IPSANZ and other organisations, enabling seamless global IP advisory.</span></p>
                </div>
              </div>
              <div className="content-panel rounded-sm bg-paper overflow-hidden">
                <div className="infobox-header-premium px-4 py-3"><h3 className="text-white font-serif text-sm font-semibold">Send us a message</h3></div>
                <form className="p-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div><label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1">Name *</label><input type="text" required className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-sm premium-input" /></div>
                  <div><label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1">Company</label><input type="text" className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-sm premium-input" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1">Phone</label><input type="tel" className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-sm premium-input" /></div>
                    <div><label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1">Email *</label><input type="email" required className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-sm premium-input" /></div>
                  </div>
                  <div><label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1">Message *</label><textarea required rows={5} className="w-full px-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:border-accent resize-y" /></div>
                  <button type="submit" className="px-6 py-2.5 text-white text-sm font-medium rounded-sm premium-button">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="premium-footer mt-12" style={{ background: 'linear-gradient(to bottom, var(--paper), var(--paper-alt))' }}>
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="flex justify-center mb-8">
            <Monogram size="lg" />
          </div>
          <div className="grid sm:grid-cols-3 gap-8 text-xs text-muted">
            <div>
              <h4 className="font-serif font-light text-heading text-sm mb-3" style={{ letterSpacing: '-0.01em' }}>Leighton Cassidy Legal</h4>
              <p className="leading-relaxed">Market-leading practices in intellectual property, commercialisation, commercial advisory and dispute resolution.</p>
              <p className="mt-3 text-gold text-[10px] uppercase tracking-[0.15em]">Dunedin &middot; Auckland &middot; Sydney</p>
            </div>
            <div>
              <h4 className="font-serif font-light text-heading text-sm mb-3" style={{ letterSpacing: '-0.01em' }}>Recognised In</h4>
              <div className="flex flex-wrap gap-2">
                {["Legal 500", "WTR1000", "Who's Who", "Managing IP", "Best Lawyers NZ", "Lexology Index"].map((d) => (
                  <span key={d} className="px-2.5 py-1 rounded-sm text-[10px]" style={{ background: 'color-mix(in srgb, var(--gold-light) 50%, transparent)', border: '1px solid color-mix(in srgb, var(--gold) 30%, transparent)', color: 'var(--gold)' }}>{d}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-serif font-light text-heading text-sm mb-3" style={{ letterSpacing: '-0.01em' }}>Legal</h4>
              <div className="space-y-1.5"><p className="hover:text-link cursor-pointer transition-colors">Privacy Statement</p><p className="hover:text-link cursor-pointer transition-colors">Terms of Engagement</p></div>
              <p className="mt-4 text-[10px] text-muted/50">&copy; {new Date().getFullYear()} Leighton Cassidy Legal. All rights reserved.</p>
            </div>
          </div>
          <OrnamentalDivider />
          <p className="text-center text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--gold)' }}>
            Intellectual Property is in our DNA
          </p>
        </div>
      </footer>
    </div>
  );
}
