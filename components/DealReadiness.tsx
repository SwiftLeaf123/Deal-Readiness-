"use client";
// @ts-nocheck

import { useState, useEffect } from "react";

// ─── ADVISOR DATA ─────────────────────────────────────────────────────────────
const ADVISOR = {
  name: "Christophe El-Hamaoui",
  title: { en: "Business Lawyer — Mergers & Acquisitions", fr: "Avocat en droit des affaires — Fusions et acquisitions" },
  photo: "data:image/jpeg;base64,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",
  bio: {
    en: "Christophe advises business owners and entrepreneurs on mergers, acquisitions, and corporate transactions. He regularly assists clients in preparing their businesses for sale, conducting legal due diligence, and navigating complex deal structures under Quebec civil law. He holds a certificate in Negotiation Mastery from Harvard Business School Online.",
    fr: "Christophe conseille les propriétaires d'entreprises et les entrepreneurs dans le cadre de fusions, d'acquisitions et de transactions corporatives. Il accompagne régulièrement ses clients dans la préparation de leur entreprise à la vente, la vérification diligente juridique et la structuration de transactions complexes en droit civil québécois. Il est titulaire d'un certificat en négociation du Harvard Business School Online.",
  },
  expertise: {
    en: ["Mergers & Acquisitions", "Commercial Law", "Corporate Transactions", "Legal Due Diligence", "Contract Drafting"],
    fr: ["Fusions et acquisitions", "Droit commercial", "Transactions corporatives", "Vérification diligente juridique", "Rédaction de contrats"],
  },
  email: "christophe.el-hamaoui@lrmm.com",
  phone: "514 925-6404",
  profileUrl: "https://www.lrmm.com/en/team/attorneys/el-hamaoui-christophe/",
  bar: { en: "Member, Quebec Bar (2023)", fr: "Membre du Barreau du Québec (2023)" },
  languages: { en: "French, English, Arabic", fr: "Français, anglais, arabe" },
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  en: {
    appName: "Deal Readiness Score",
    appTagline: "M&A Advisory Tool",
    confidential: "Confidential Assessment Tool",
    heroTitle1: "Is Your Business",
    heroTitle2: "Ready to Sell?",
    heroSub: "Identify risks that could reduce your valuation or kill your deal.",
    heroDesc: "A structured overview of 15 transaction considerations commonly reviewed by buyers across ownership, financials, contracts, IP, and operations — designed to help business owners understand their readiness profile.",
    startBtn: "Begin Assessment →",
    stats: [["15", "Risk Factors"], ["6", "Assessment Areas"], ["~5 min", "Completion Time"]],
    disclaimer: "This tool provides general informational insights only. It does not constitute legal advice and does not create a lawyer-client relationship.",
    progress: "Progress",
    of: "of",
    whyMatters: "Why This Matters",
    selectToContinue: "Select an answer to continue",
    back: "← Back",
    yes: "Yes",
    no: "No",
    unsure: "Unsure",
    assessmentComplete: "Assessment Complete",
    downloadPdf: "Download PDF Report",
    retake: "Retake Assessment",
    nextSteps: "Possible Next Steps",
    addressIssues: "Transaction considerations worth reviewing before going to market",
    advisorCta: "Understanding these considerations before initiating a process may help clarify your situation. A professional conversation can help you interpret these results in the context of your specific circumstances.",
    speakAdvisor: "Discuss your situation →",
    scoreBreakdown: "Score Breakdown",
    dealReady: "Deal Ready",
    moderateRisk: "Moderate Risk",
    highRisk: "High Risk",
    priorityFlags: "Priority Risk Flags",
    recommendedAction: "What Buyers Typically Consider",
    riskLabel: "Risk",
    unsureLabel: "Unsure",
    noFlags: "No significant risk flags identified across all assessed areas.",
    emailStep: "One Last Step",
    emailDesc: "Enter your email to receive your full report by email.",
    emailPlaceholder: "your@email.com",
    emailBtn: "View My Results →",
    skipEmail: "Skip — View results now",
    benchmarkTitle: "Benchmark Insights",
    benchmarkSub: "How you compare to other businesses assessed on this platform.",
    percentileLabel: "Your Percentile",
    avgScore: "Average Score Range",
    avgScoreVal: "55 – 70",
    commonIssues: "3 Most Common Issues",
    commonIssuesList: ["Missing IP assignment agreements", "Customer revenue concentration", "Lack of signed customer contracts"],
    categoryBreakdown: "Category Breakdown",
    top3Actions: "Top 3 Considerations to Review",
    biggestRisks: "Commonly Reviewed Elements",
    valuationImpact: "Contextual Observations",
    valuationDesc: (score) => score >= 80 ? "Based on the information provided, this profile is broadly consistent with what buyers typically expect. Individual circumstances may vary." : score >= 60 ? "Some elements identified may be reviewed closely by buyers and could influence valuation discussions, depending on the specific context." : "Several elements identified in this assessment are commonly associated with valuation adjustments or additional due diligence in transaction processes.",
    statusDesc: (score) => score >= 80 ? "Based on the information provided, this profile reflects a number of elements commonly associated with transaction readiness. You may wish to review any remaining considerations with a professional." : score >= 60 ? "This profile suggests several elements that buyers commonly review closely during a transaction process. You may wish to consider these areas before initiating a sale." : "This profile highlights a number of elements that are frequently examined during due diligence and may warrant attention. Speaking with a professional may help clarify next steps.",
    advisorSectionTitle: "Your Advisor",
    advisorIntro: "Addressing the issues identified in this report can significantly improve your valuation and reduce deal risk. A brief conversation with an advisor can help clarify your situation and identify the most practical next steps.",
    advisorExpertise: "Areas of Expertise",
    advisorBookBtn: "Book a 15-minute call",
    advisorBookSubtext: "A short call to walk through your results and identify practical next steps before going to market.",
    advisorProfileBtn: "View Full Profile",
    advisorBarLabel: "Bar Admission",
    advisorLangLabel: "Languages",
    aboutAdvisorTitle: "About the Advisor",
    aboutAdvisorBio: "Christophe advises business owners and entrepreneurs on mergers, acquisitions, and corporate transactions. He regularly assists clients in preparing their businesses for sale and navigating complex deal structures.",
    aboutAdvisorBuiltBy: "This assessment was built in collaboration with",
    preQuestionnaireDisclaimer: "This tool provides general informational insights based on common transaction considerations. It does not constitute legal advice and does not create a lawyer-client relationship.",
    resultsDisclaimer: "This assessment is based solely on the information provided and reflects general transaction considerations. It is not a substitute for professional advice.",
    advisorConsultText: "If you would like to discuss your specific situation, you may wish to consult a professional.",
    valuationImpactLabel: "Contextual Observations",
    sectionIntros: {
      ownership: "Ownership structure is commonly among the first areas buyers review. Clarity over share ownership and exit rights is typically expected early in a transaction process.",
      financial: "Financial quality is a central factor in how buyers assess a business. Reliability of financial information and revenue concentration are elements commonly examined during due diligence.",
      contracts: "Written agreements with key customers and awareness of legal exposure are elements buyers typically examine. These factors may influence how a buyer assesses the stability of revenue.",
      hr: "Employment practices and key person dependencies are commonly reviewed in transaction processes. These elements may affect how buyers assess continuity and operational risk.",
      ip: "Clarity of intellectual property ownership is typically an important element for buyers. Where ownership is unclear or undocumented, this may affect how a transaction is structured.",
      operations: "Operational autonomy from the founder is commonly viewed as a factor in assessing the transferability of a business. Buyers often consider how the business would function under new ownership.",
    },
  },
  fr: {
    appName: "Indice de préparation à la vente",
    appTagline: "Outil conseil en fusion-acquisition",
    confidential: "Évaluation confidentielle",
    heroTitle1: "Votre entreprise est-elle",
    heroTitle2: "prête à être vendue?",
    heroSub: "Explorez les éléments couramment examinés par les acheteurs et susceptibles d'influencer une transaction.",
    heroDesc: "Un aperçu structuré de 15 considérations transactionnelles couramment examinées par les acheteurs — conçu pour aider les propriétaires d'entreprises à mieux comprendre leur profil de préparation.",
    startBtn: "Commencer l'évaluation →",
    stats: [["15", "Facteurs de risque"], ["6", "Domaines évalués"], ["~5 min", "Durée"]],
    disclaimer: "Cet outil fournit des informations générales à titre indicatif seulement. Il ne constitue pas un avis juridique et ne crée aucune relation avocat-client.",
    progress: "Progression",
    of: "sur",
    whyMatters: "Pourquoi c'est important",
    selectToContinue: "Sélectionnez une réponse pour continuer",
    back: "← Retour",
    yes: "Oui",
    no: "Non",
    unsure: "Incertain",
    assessmentComplete: "Évaluation complétée",
    downloadPdf: "Télécharger le rapport PDF",
    retake: "Recommencer l'évaluation",
    nextSteps: "Pistes de réflexion",
    addressIssues: "Considérations transactionnelles à examiner avant une mise en vente",
    advisorCta: "Comprendre ces éléments avant d'initier un processus peut aider à clarifier votre situation. Une conversation avec un professionnel peut vous aider à interpréter ces résultats dans le contexte de votre entreprise.",
    speakAdvisor: "Discuter de votre situation →",
    scoreBreakdown: "Détail du score",
    dealReady: "Prêt pour la vente",
    moderateRisk: "Risque modéré",
    highRisk: "Risque élevé",
    priorityFlags: "Risques prioritaires",
    recommendedAction: "Ce que les acheteurs examinent habituellement",
    riskLabel: "Risque",
    unsureLabel: "Incertain",
    noFlags: "Aucun facteur de risque significatif identifié dans l'ensemble des domaines évalués.",
    emailStep: "Dernière étape",
    emailDesc: "Entrez votre courriel pour recevoir votre rapport complet.",
    emailPlaceholder: "votre@courriel.com",
    emailBtn: "Voir mes résultats →",
    skipEmail: "Passer — Voir les résultats maintenant",
    benchmarkTitle: "Données comparatives",
    benchmarkSub: "Comparez votre résultat à celui des autres entreprises évaluées sur cette plateforme.",
    percentileLabel: "Votre percentile",
    avgScore: "Plage de scores habituelle",
    avgScoreVal: "55 – 70",
    commonIssues: "3 enjeux les plus fréquents",
    commonIssuesList: ["Absence de cession de droits de PI", "Concentration des revenus chez un seul client", "Absence de contrats écrits avec les clients"],
    categoryBreakdown: "Résultats par catégorie",
    top3Actions: "3 éléments prioritaires à examiner",
    biggestRisks: "Éléments couramment examinés",
    valuationImpact: "Observations contextuelles",
    valuationDesc: (score) => score >= 80 ? "Le profil fourni est généralement cohérent avec ce que les acheteurs considèrent habituellement favorable. Les circonstances individuelles peuvent varier." : score >= 60 ? "Certains éléments identifiés sont fréquemment examinés par les acheteurs et pourraient influencer les discussions sur la valorisation, selon le contexte." : "Plusieurs éléments identifiés dans cette évaluation sont couramment associés à des ajustements de valorisation ou à une vérification diligente approfondie.",
    statusDesc: (score) => score >= 80 ? "Sur la base des informations fournies, ce profil est généralement cohérent avec les éléments associés à une bonne préparation transactionnelle. Il peut être utile de passer en revue les considérations résiduelles avec un professionnel." : score >= 60 ? "Ce profil met en évidence plusieurs éléments que les acheteurs examinent couramment lors d'une transaction. Il peut être utile de considérer ces aspects avant d'initier un processus de vente." : "Ce profil met en lumière plusieurs éléments fréquemment examinés en vérification diligente. Il peut être utile d'en discuter avec un professionnel pour clarifier les prochaines étapes.",
    advisorSectionTitle: "Votre conseiller",
    advisorIntro: "Corriger les éléments identifiés dans ce rapport peut améliorer significativement la valeur de votre entreprise et réduire les risques liés à une transaction. Une brève conversation avec un conseiller peut aider à clarifier votre situation et à identifier les prochaines étapes les plus concrètes.",
    advisorExpertise: "Domaines d'expertise",
    advisorBookBtn: "Réserver un appel de 15 minutes",
    advisorBookSubtext: "Un court appel pour revoir vos résultats et identifier les prochaines étapes avant une éventuelle transaction.",
    advisorProfileBtn: "Voir le profil complet",
    advisorBarLabel: "Admission au barreau",
    advisorLangLabel: "Langues",
    aboutAdvisorTitle: "À propos du conseiller",
    aboutAdvisorBio: "Christophe conseille des entrepreneurs et des propriétaires d'entreprises en matière de fusions, acquisitions et transactions commerciales. Il accompagne régulièrement ses clients dans la préparation et la vente de leur entreprise.",
    aboutAdvisorBuiltBy: "Cet outil a été développé en collaboration avec",
    preQuestionnaireDisclaimer: "Cet outil fournit des informations générales basées sur des considérations courantes en matière de transactions. Il ne constitue pas un avis juridique et ne crée aucune relation avocat-client.",
    resultsDisclaimer: "Cette évaluation est basée uniquement sur les informations fournies et reflète des considérations générales en matière de transactions. Elle ne remplace pas un avis professionnel.",
    advisorConsultText: "Pour une analyse adaptée à votre situation, il peut être utile de consulter un professionnel.",
    valuationImpactLabel: "Observations contextuelles",
    sectionIntros: {
      ownership: "La structure d'actionnariat est généralement parmi les premiers éléments examinés par les acheteurs. La clarté des droits de propriété et de sortie est habituellement attendue dès le début d'un processus transactionnel.",
      financial: "La qualité des informations financières est un facteur central dans l'évaluation d'une entreprise par les acheteurs. La fiabilité des états financiers et la concentration des revenus sont des éléments couramment examinés en vérification diligente.",
      contracts: "Les ententes écrites avec les clients importants et la connaissance des expositions légales sont des éléments que les acheteurs examinent typiquement. Ces facteurs peuvent influencer la façon dont un acheteur évalue la stabilité des revenus.",
      hr: "Les pratiques en matière d'emploi et la dépendance aux personnes clés sont couramment examinées dans les processus transactionnels. Ces éléments peuvent influencer la façon dont les acheteurs évaluent la continuité et le risque opérationnel.",
      ip: "La clarté de la propriété intellectuelle est typiquement un élément important pour les acheteurs. Lorsque la propriété est incertaine ou mal documentée, cela peut affecter la structuration d'une transaction.",
      operations: "L'autonomie opérationnelle par rapport au fondateur est généralement perçue comme un facteur influençant la transférabilité d'une entreprise. Les acheteurs examinent souvent comment l'entreprise fonctionnerait sous une nouvelle direction.",
    },
  },
};

// ─── QUESTIONS DATA ───────────────────────────────────────────────────────────
const SECTIONS_DATA = [
  {
    id: "ownership",
    number: "01",
    title: { en: "Ownership & Corporate Structure", fr: "Structure d'actionnariat et constitution" },
    questions: [
      {
        id: "q1",
        weight: 7,
        invertRisk: false,
        text: {
          en: "Do you have a signed and up-to-date shareholders' agreement?",
          fr: "Disposez-vous d'une convention d'actionnaires signée et à jour?",
        },
        tooltip: {
          en: "Buyers commonly review this document early in a transaction process. Where it is absent or outdated, questions about exit rights and shareholder consent may arise and require clarification.",
          fr: "En contexte québécois, les acheteurs examinent généralement cette entente pour comprendre les droits de sortie et le fonctionnement décisionnel entre actionnaires. Son absence ou son caractère désuet peut soulever des questions qui nécessitent une clarification au cours du processus.",
        },
      },
      {
        id: "q2",
        weight: 6,
        invertRisk: false,
        text: {
          en: "Are all shares properly issued, documented, and compliant with corporate records?",
          fr: "Toutes les actions sont-elles correctement émises, documentées et conformes aux registres corporatifs?",
        },
        tooltip: {
          en: "Corporate records are commonly reviewed during due diligence. Where irregularities exist in share issuance or documentation, buyers may require these to be addressed before a transaction can progress.",
          fr: "Les registres corporatifs sont couramment examinés en vérification diligente. Des irrégularités dans l'émission d'actions ou la documentation peuvent soulever des questions qu'un acheteur voudra voir clarifiées avant de poursuivre le processus.",
        },
      },
      {
        id: "q3",
        weight: 8,
        invertRisk: true,
        text: {
          en: "Would any minority shareholder be able to block or delay a sale?",
          fr: "Un actionnaire minoritaire pourrait-il bloquer ou retarder une vente?",
        },
        tooltip: {
          en: "The ability of minority shareholders to influence or delay a transaction is commonly reviewed by buyers. Where such rights exist without corresponding drag-along provisions, this may affect how a transaction is structured or priced.",
          fr: "Au Québec, les droits des actionnaires minoritaires et la présence de clauses d'entraînement sont généralement examinés par les acheteurs. L'absence de telles dispositions peut influencer la structuration d'une transaction ou les discussions sur les conditions de clôture.",
        },
      },
    ],
  },
  {
    id: "financial",
    number: "02",
    title: { en: "Financial Quality & Risk", fr: "Qualité financière et risques" },
    questions: [
      {
        id: "q4",
        weight: 8,
        invertRisk: false,
        text: {
          en: "Are your financial statements prepared in a consistent and reliable manner (e.g., accountant-reviewed or audited)?",
          fr: "Vos états financiers sont-ils préparés de façon cohérente et fiable (ex. : examinés ou audités par un CPA)?",
        },
        tooltip: {
          en: "The reliability and consistency of financial information is commonly a central element of buyer due diligence. Reviewed or audited statements are typically viewed as a positive indicator of financial transparency.",
          fr: "La fiabilité et la cohérence des informations financières sont généralement un élément central de la vérification diligente des acheteurs. Des états financiers examinés ou vérifiés par un CPA sont habituellement perçus comme un indicateur positif de transparence financière.",
        },
      },
      {
        id: "q5",
        weight: 9,
        invertRisk: true,
        text: {
          en: "Does any single client represent more than 30% of your revenue?",
          fr: "Un seul client représente-t-il plus de 30 % de vos revenus?",
        },
        tooltip: {
          en: "Revenue concentration is commonly reviewed by buyers when assessing business risk. Where a significant portion of revenue is tied to a single client, buyers may factor this into how they assess the stability of future cash flows.",
          fr: "La concentration des revenus est couramment examinée par les acheteurs lors de l'évaluation du risque d'affaires. Lorsqu'une part importante des revenus provient d'un seul client, les acheteurs tendent à analyser la stabilité des flux financiers futurs en conséquence.",
        },
      },
      {
        id: "q6",
        weight: 8,
        invertRisk: true,
        text: {
          en: "Are there any aggressive tax positions or unresolved tax exposures?",
          fr: "Existe-t-il des positions fiscales agressives ou des risques fiscaux non résolus?",
        },
        tooltip: {
          en: "Tax positions and potential exposures are typically examined during due diligence, both at the federal and provincial level. Unresolved tax matters are commonly a point of discussion in transaction negotiations.",
          fr: "Au Québec, les questions fiscales sont examinées tant au niveau fédéral (ARC) que provincial (Revenu Québec). Les positions fiscales non résolues constituent typiquement un point de discussion lors des négociations transactionnelles.",
        },
      },
    ],
  },
  {
    id: "contracts",
    number: "03",
    title: { en: "Contracts & Legal Exposure", fr: "Contrats et exposition légale" },
    questions: [
      {
        id: "q7",
        weight: 9,
        invertRisk: false,
        text: {
          en: "Do you have written contracts in place with your key customers?",
          fr: "Avez-vous des contrats écrits avec vos clients importants?",
        },
        tooltip: {
          en: "Written agreements with key customers are commonly reviewed by buyers as an indicator of revenue stability. Where customer relationships are undocumented, buyers may view the associated revenue as less predictable.",
          fr: "En contexte québécois, les ententes écrites avec les clients importants sont généralement examinées par les acheteurs comme indicateur de la stabilité des revenus. Lorsque ces relations ne sont pas documentées, les acheteurs peuvent percevoir les revenus associés comme moins prévisibles.",
        },
      },
      {
        id: "q8",
        weight: 7,
        invertRisk: true,
        text: {
          en: "Do your key contracts contain change-of-control clauses requiring consent before a sale?",
          fr: "Vos contrats importants contiennent-ils des clauses de changement de contrôle nécessitant un consentement avant une vente?",
        },
        tooltip: {
          en: "Change-of-control provisions are commonly identified and reviewed during due diligence. Where such clauses exist, buyers typically assess what consents may be required and how this could affect the timeline of a transaction.",
          fr: "Les clauses de changement de contrôle sont courantes dans les contrats commerciaux québécois. Les acheteurs identifient généralement ces dispositions lors de la vérification diligente et évaluent les consentements potentiellement requis ainsi que leur incidence sur le calendrier transactionnel.",
        },
      },
      {
        id: "q9",
        weight: 9,
        invertRisk: true,
        text: {
          en: "Are you currently involved in, or threatened with, any litigation or disputes?",
          fr: "Êtes-vous actuellement impliqué dans un litige ou une menace de poursuite?",
        },
        tooltip: {
          en: "Active or threatened legal disputes are routinely reviewed during due diligence. Their presence may introduce uncertainty that buyers seek to understand and, where material, factor into the terms of a transaction.",
          fr: "Les litiges actifs ou latents sont systématiquement examinés en vérification diligente. En contexte québécois, cela inclut les poursuites civiles, les réclamations de la CNESST, les litiges fiscaux et les différends contractuels. Leur présence peut introduire une incertitude que les acheteurs cherchent à comprendre et à prendre en compte dans les conditions d'une transaction.",
        },
      },
    ],
  },
  {
    id: "hr",
    number: "04",
    title: { en: "Human Resources", fr: "Ressources humaines" },
    questions: [
      {
        id: "q10",
        weight: 7,
        invertRisk: false,
        text: {
          en: "Do key employees have enforceable employment agreements (including non-compete or retention provisions)?",
          fr: "Les employés clés ont-ils des contrats d'emploi exécutoires (incluant des clauses de non-concurrence ou de rétention)?",
        },
        tooltip: {
          en: "Employment agreements for key personnel are commonly reviewed by buyers to understand retention and continuity. The structure of non-compete provisions is also frequently examined, particularly in Quebec where enforceability depends on specific criteria.",
          fr: "Au Québec, les contrats d'emploi des personnes clés sont couramment examinés par les acheteurs pour évaluer la rétention et la continuité. Les clauses de non-concurrence font également l'objet d'une attention particulière, leur validité étant soumise à des critères spécifiques en droit québécois.",
        },
      },
      {
        id: "q11",
        weight: 8,
        invertRisk: true,
        text: {
          en: "Are any core workers classified as independent contractors but function like employees?",
          fr: "Certains travailleurs essentiels sont-ils classifiés comme travailleurs autonomes alors qu'ils fonctionnent comme des employés?",
        },
        tooltip: {
          en: "Worker classification is a point commonly reviewed during due diligence, particularly in Quebec where CNESST and Revenu Québec may assess the nature of working relationships. Where classification questions exist, buyers may seek to understand the potential implications.",
          fr: "La classification des travailleurs est un point couramment examiné en vérification diligente, notamment au Québec où la CNESST et Revenu Québec peuvent examiner la nature des relations de travail. Lorsque des questions de classification existent, les acheteurs cherchent généralement à en comprendre les implications potentielles.",
        },
      },
    ],
  },
  {
    id: "ip",
    number: "05",
    title: { en: "Intellectual Property", fr: "Propriété intellectuelle" },
    questions: [
      {
        id: "q12",
        weight: 10,
        invertRisk: false,
        text: {
          en: "Is all intellectual property (code, brand, content) clearly owned by the company — not individuals or contractors?",
          fr: "Toute la propriété intellectuelle (code, marque, contenu) est-elle clairement détenue par l'entreprise — et non par des individus ou sous-traitants?",
        },
        tooltip: {
          en: "Clear company ownership of intellectual property is typically expected by buyers. Where ownership is shared with or held by individuals or third parties, buyers commonly seek to understand how this may affect what is being acquired.",
          fr: "La clarté de la propriété des actifs intellectuels est généralement un élément important pour les acheteurs, notamment dans les entreprises technologiques. Lorsque la propriété est partagée avec des individus ou des tiers sans documentation formelle, les acheteurs cherchent habituellement à comprendre ce qui est effectivement transférable.",
        },
      },
      {
        id: "q13",
        weight: 9,
        invertRisk: false,
        text: {
          en: "Have all employees and contractors signed IP assignment agreements?",
          fr: "Tous les employés et sous-traitants ont-ils signé des ententes de cession de droits de propriété intellectuelle?",
        },
        tooltip: {
          en: "Written IP assignment agreements are commonly reviewed to establish a clear chain of ownership. Where such documentation is incomplete, buyers may seek additional clarity before proceeding.",
          fr: "Les ententes de cession de droits de propriété intellectuelle sont couramment examinées pour établir une chaîne de titre claire. Lorsque cette documentation est incomplète, les acheteurs cherchent généralement à obtenir des clarifications supplémentaires avant de progresser dans le processus.",
        },
      },
    ],
  },
  {
    id: "operations",
    number: "06",
    title: { en: "Operations & Dependency", fr: "Opérations et dépendances" },
    questions: [
      {
        id: "q14",
        weight: 8,
        invertRisk: false,
        text: {
          en: "Can the business operate for at least 3 months without your direct involvement?",
          fr: "L'entreprise peut-elle fonctionner au moins 3 mois sans votre implication directe?",
        },
        tooltip: {
          en: "The ability of a business to operate independently of its founder is commonly assessed by buyers as an indicator of transferability. This is often an area of focus in transactions involving owner-operated businesses.",
          fr: "La capacité d'une entreprise à fonctionner de manière autonome est couramment évaluée par les acheteurs comme indicateur de transférabilité. Cet aspect est souvent un point d'attention dans les transactions impliquant des entreprises dirigées par leur propriétaire.",
        },
      },
      {
        id: "q15",
        weight: 7,
        invertRisk: true,
        text: {
          en: "Are there any key supplier or partner relationships that could terminate upon a change of ownership?",
          fr: "Certaines relations avec des fournisseurs ou partenaires clés pourraient-elles prendre fin en cas de changement de propriétaire?",
        },
        tooltip: {
          en: "Key supplier and partner relationships are commonly reviewed to assess operational continuity. Where agreements include change-of-control provisions, buyers typically seek to understand how these relationships may be affected by a transaction.",
          fr: "Les relations avec les fournisseurs et partenaires clés sont couramment examinées pour évaluer la continuité opérationnelle. Lorsque des ententes comportent des clauses de changement de contrôle, les acheteurs cherchent généralement à comprendre comment ces relations pourraient être affectées par une transaction.",
        },
      },
    ],
  },
];

const ALL_QUESTIONS = SECTIONS_DATA.flatMap((s) => s.questions);
const TOTAL_WEIGHT = ALL_QUESTIONS.reduce((sum, q) => sum + q.weight, 0);

// ─── SCORING ENGINE (UNCHANGED) ───────────────────────────────────────────────
function computeScore(answers) {
  let earned = 0;
  ALL_QUESTIONS.forEach((q) => {
    const ans = answers[q.id];
    if (!ans) return;
    let pts = 0;
    if (q.invertRisk) {
      if (ans === "no") pts = q.weight;
      else if (ans === "unsure") pts = q.weight * 0.4;
      else pts = 0;
    } else {
      if (ans === "yes") pts = q.weight;
      else if (ans === "unsure") pts = q.weight * 0.4;
      else pts = 0;
    }
    earned += pts;
  });
  return Math.round((earned / TOTAL_WEIGHT) * 100);
}

function getRiskFlags(answers) {
  const flags = [];
  ALL_QUESTIONS.forEach((q) => {
    const ans = answers[q.id];
    if (!ans) return;
    const isRisk = q.invertRisk ? ans === "yes" : ans === "no";
    const isPartial = ans === "unsure";
    if (isRisk || isPartial) {
      flags.push({ id: q.id, severity: isRisk ? q.weight : Math.round(q.weight * 0.5), question: q, partial: isPartial });
    }
  });
  return flags.sort((a, b) => b.severity - a.severity);
}

function getStatus(score, lang) {
  const t = T[lang];
  if (score >= 80) return { label: t.dealReady, color: "#52B788", bg: "#0d2318", accent: "#52B788", border: "#1a4d2e" };
  if (score >= 60) return { label: t.moderateRisk, color: "#F4A261", bg: "#1d1508", accent: "#F4A261", border: "#3d2a08" };
  return { label: t.highRisk, color: "#E63946", bg: "#1d0808", accent: "#E63946", border: "#3d1010" };
}

function getPercentile(score, lang) {
  if (score >= 80) return lang === "fr" ? "les 20 % les mieux préparés" : "Top 20%";
  if (score >= 60) return lang === "fr" ? "la moyenne (50 % intermédiaires)" : "Middle 50%";
  return lang === "fr" ? "les 30 % les moins préparés" : "Bottom 30%";
}

function getPercentileNum(score) {
  if (score >= 80) return 82;
  if (score >= 60) return 51;
  return 22;
}

function getSectionScore(sectionId, answers) {
  const section = SECTIONS_DATA.find((s) => s.id === sectionId);
  if (!section) return 0;
  let earned = 0, max = 0;
  section.questions.forEach((q) => {
    max += q.weight;
    const ans = answers[q.id];
    if (!ans) return;
    if (q.invertRisk) {
      if (ans === "no") earned += q.weight;
      else if (ans === "unsure") earned += q.weight * 0.4;
    } else {
      if (ans === "yes") earned += q.weight;
      else if (ans === "unsure") earned += q.weight * 0.4;
    }
  });
  return Math.round((earned / max) * 100);
}

function getRiskActions(id, lang) {
  const actions = {
    en: {
      q1: "Buyers typically expect a shareholders' agreement to be in place, covering exit rights and decision-making procedures. Where this document is absent or outdated, this is commonly an area of focus during due diligence. You may wish to review the current state of this documentation with a professional.",
      q2: "Corporate records — including share registers and issuance documentation — are typically reviewed during due diligence. Where irregularities exist, buyers commonly seek clarification before a transaction can proceed. You may wish to verify that your records are complete and accurate.",
      q3: "Buyers typically assess whether all shareholders are aligned on an exit. Where minority shareholders hold rights that could affect a transaction, this is commonly a point of discussion in structuring the deal. You may wish to understand what rights currently exist in your shareholder documentation.",
      q4: "Reviewed or audited financial statements are commonly expected by buyers as a foundation for due diligence. Where financial information is inconsistent or unreviewed, buyers may seek additional verification. You may wish to consider the current state of your financial reporting with your accountant.",
      q5: "Revenue concentration is commonly assessed by buyers as an indicator of business risk. Where a single client represents a significant portion of revenue, this is typically a point of discussion in valuation. You may wish to consider how this element might be perceived and how it is currently documented.",
      q6: "Tax positions — at both the federal (CRA) and provincial (Revenu Québec) level — are typically reviewed during due diligence. Unresolved tax matters are commonly a subject of negotiation in transactions. You may wish to understand the nature of any open tax positions with your tax advisor.",
      q7: "Written agreements with key customers are commonly reviewed by buyers as an indicator of revenue reliability. Where customer relationships are not documented, buyers may view them as less certain. You may wish to consider how your key customer relationships are currently formalized.",
      q8: "Change-of-control provisions in key contracts are commonly identified and reviewed during due diligence. Their presence may affect the timing and structure of a transaction. You may wish to review your key contracts to understand what provisions, if any, exist in this area.",
      q9: "Active or potential legal disputes are routinely reviewed during due diligence. Their presence may introduce uncertainty that buyers typically seek to understand and factor into transaction terms. You may wish to understand the current state and potential implications of any outstanding matters.",
      q10: "Employment agreements for key personnel — including any non-compete provisions — are commonly reviewed by buyers. In Quebec, the validity of non-compete clauses depends on specific criteria. You may wish to review how these agreements are currently structured.",
      q11: "Worker classification is commonly reviewed during due diligence, particularly in Quebec where CNESST and Revenu Québec may assess the nature of working relationships. Where classification questions exist, buyers typically seek to understand the potential implications. You may wish to review how your workforce is currently classified.",
      q12: "Buyers typically expect intellectual property to be clearly and formally owned by the company. Where ownership involves individuals or third parties without written documentation, this may affect how the transaction is structured. You may wish to review how IP ownership is currently documented.",
      q13: "Written IP assignment agreements are typically reviewed to establish a clear chain of title. Where such documentation is incomplete, buyers commonly seek additional clarity. You may wish to verify that all contributors — past and present — have appropriate documentation in place.",
      q14: "The ability of a business to operate without its founder is commonly assessed as an indicator of transferability. Buyers often focus on this area in owner-operated businesses. You may wish to consider how operations are currently documented and how continuity is supported.",
      q15: "Key supplier and partner agreements are commonly reviewed to assess operational continuity. Where change-of-control provisions exist, buyers typically seek to understand their potential impact. You may wish to review your key agreements to identify any relevant provisions.",
    },
    fr: {
      q1: "Les acheteurs s'attendent généralement à ce qu'une convention d'actionnaires soit en place, couvrant les droits de sortie et les modalités décisionnelles. En l'absence d'un tel document ou s'il est désuet, cet aspect est couramment examiné en vérification diligente. Il peut être utile de revoir l'état actuel de cette documentation avec un professionnel.",
      q2: "Les registres corporatifs — incluant le registre des actionnaires et la documentation relative à l'émission d'actions — sont typiquement examinés lors de la vérification diligente. En présence d'irrégularités, les acheteurs cherchent habituellement des clarifications avant qu'une transaction puisse progresser. Il peut être utile de vérifier que vos registres sont complets et exacts.",
      q3: "Les acheteurs évaluent généralement si tous les actionnaires sont alignés sur une vente. Lorsque des actionnaires minoritaires détiennent des droits susceptibles d'affecter une transaction, cela est couramment un point de discussion dans la structuration de l'opération. Il peut être utile de comprendre les droits qui existent actuellement dans votre documentation actionnariale.",
      q4: "Des états financiers examinés ou vérifiés sont généralement attendus par les acheteurs comme base de la vérification diligente. Lorsque l'information financière est incohérente ou non examinée, les acheteurs peuvent chercher des vérifications supplémentaires. Il peut être utile d'évaluer l'état actuel de vos informations financières avec votre comptable.",
      q5: "La concentration des revenus est couramment évaluée par les acheteurs comme indicateur du risque d'affaires. Lorsqu'un seul client représente une part importante des revenus, cela est typiquement un point de discussion dans les négociations sur la valorisation. Il peut être utile de considérer comment cet élément pourrait être perçu et comment il est actuellement documenté.",
      q6: "Les positions fiscales — tant au niveau fédéral (ARC) que provincial (Revenu Québec) — sont typiquement examinées en vérification diligente. Les questions fiscales non résolues sont couramment un sujet de négociation dans les transactions. Il peut être utile de comprendre la nature de toute position fiscale ouverte avec votre conseiller fiscal.",
      q7: "Les ententes écrites avec les clients importants sont couramment examinées par les acheteurs comme indicateur de la fiabilité des revenus. Lorsque les relations clients ne sont pas documentées, les acheteurs peuvent les percevoir comme moins certaines. Il peut être utile de considérer comment vos relations clients importantes sont actuellement formalisées.",
      q8: "Les clauses de changement de contrôle dans les contrats importants sont couramment identifiées et examinées en vérification diligente. Leur présence peut affecter le calendrier et la structure d'une transaction. Il peut être utile de passer en revue vos contrats clés pour comprendre si de telles dispositions existent.",
      q9: "Les litiges actifs ou potentiels sont systématiquement examinés en vérification diligente. Leur présence peut introduire une incertitude que les acheteurs cherchent généralement à comprendre et à intégrer dans les conditions transactionnelles. Il peut être utile de comprendre l'état actuel de tout dossier contentieux.",
      q10: "Les contrats d'emploi des personnes clés — incluant les clauses de non-concurrence — sont couramment examinés par les acheteurs. Au Québec, la validité des clauses de non-concurrence dépend de critères spécifiques. Il peut être utile de revoir la structure de ces ententes.",
      q11: "La classification des travailleurs est couramment examinée en vérification diligente, notamment au Québec où la CNESST et Revenu Québec peuvent évaluer la nature des relations de travail. Lorsque des questions de classification existent, les acheteurs cherchent généralement à en comprendre les implications potentielles. Il peut être utile de vérifier comment votre main-d'oeuvre est actuellement classifiée.",
      q12: "Les acheteurs s'attendent généralement à ce que la propriété intellectuelle soit clairement et formellement détenue par l'entreprise. Lorsque la propriété implique des individus ou des tiers sans documentation écrite, cela peut affecter la structuration de la transaction. Il peut être utile de vérifier comment la propriété de la PI est actuellement documentée.",
      q13: "Les ententes de cession de droits de PI sont typiquement examinées pour établir une chaîne de titre claire. Lorsque cette documentation est incomplète, les acheteurs cherchent généralement des clarifications supplémentaires. Il peut être utile de vérifier que tous les contributeurs — passés et présents — disposent de la documentation appropriée.",
      q14: "La capacité d'une entreprise à fonctionner sans son fondateur est couramment évaluée comme indicateur de transférabilité. Les acheteurs portent souvent attention à cet aspect dans les entreprises dirigées par leur propriétaire. Il peut être utile de considérer comment les opérations sont actuellement documentées et comment la continuité est assurée.",
      q15: "Les ententes avec les fournisseurs et partenaires clés sont couramment examinées pour évaluer la continuité opérationnelle. Lorsque des clauses de changement de contrôle existent, les acheteurs cherchent généralement à en comprendre l'impact potentiel. Il peut être utile de passer en revue vos ententes clés pour identifier les dispositions pertinentes.",
    },
  };
  return { en: actions.en[id], fr: actions.fr[id] };
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function LangToggle({ lang, setLang }) {
  return (
    <div className="flex items-center gap-1" style={{ border: "1px solid #2d3d54", padding: "4px" }}>
      {["en", "fr"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="text-xs uppercase tracking-widest px-3 py-1 transition-all"
          style={{
            background: lang === l ? "#8B7355" : "transparent",
            color: lang === l ? "#0D0D0D" : "#5a6b7e",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function AppHeader({ lang, setLang, onRestart, showBack, onBack, showRetake }) {
  const t = T[lang];
  return (
    <header className="flex items-center justify-between px-6 md:px-8 py-5" style={{ borderBottom: "1px solid #1e2d40" }}>
      <button onClick={onRestart} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-5 h-5" style={{ background: "#8B7355" }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-1">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-xs uppercase tracking-[0.3em] hidden sm:inline" style={{ color: "#8B7355" }}>{t.appName}</span>
      </button>
      <div className="flex items-center gap-4">
        {showRetake && (
          <button onClick={onRestart} className="text-xs uppercase tracking-widest hidden sm:block" style={{ color: "#5a6b7e" }}>{t.retake}</button>
        )}
        {showBack && (
          <button onClick={onBack} className="text-xs uppercase tracking-widest" style={{ color: "#5a6b7e" }}>{t.back}</button>
        )}
        <LangToggle lang={lang} setLang={setLang} />
      </div>
    </header>
  );
}

function TooltipIcon({ text }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block ml-2 align-middle">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="w-5 h-5 rounded-full border flex items-center justify-center text-xs transition-opacity"
        style={{ color: "#8B7355", borderColor: "#8B7355", opacity: 0.6 }}
      >?</button>
      {show && (
        <div className="absolute z-50 left-7 top-0 w-72 p-4 rounded-sm shadow-2xl text-sm leading-relaxed"
          style={{ background: "#1a2234", color: "#d4c5a9", border: "1px solid #2D2D2D", fontFamily: "Georgia, serif" }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#8B7355" }}>
            {show}</div>
          {text}
        </div>
      )}
    </span>
  );
}

function ProgressBar({ current, total, lang }) {
  const t = T[lang];
  const pct = (current / total) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs uppercase tracking-widest" style={{ color: "#8B7355" }}>{t.progress}</span>
        <span className="text-xs" style={{ color: "#8B7355" }}>{current} {t.of} {total}</span>
      </div>
      <div className="h-px w-full" style={{ background: "#3d4f62" }}>
        <div className="h-px transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #8B7355, #C8A96E)" }} />
      </div>
    </div>
  );
}

function ScoreRing({ score, accent }) {
  const r = 54, circ = 2 * Math.PI * r;
  const [anim, setAnim] = useState(0);
  useEffect(() => { const t = setTimeout(() => setAnim(score), 150); return () => clearTimeout(t); }, [score]);
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#243044" strokeWidth="8" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={accent} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={circ - (anim / 100) * circ}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)" }} />
      </svg>
      <div className="absolute text-center">
        <div className="text-4xl font-light" style={{ color: "#f1e8d8", fontFamily: "Georgia, serif" }}>{score}</div>
        <div className="text-xs uppercase tracking-widest" style={{ color: "#8896aa" }}>/ 100</div>
      </div>
    </div>
  );
}

function CategoryBar({ label, score }) {
  const [anim, setAnim] = useState(0);
  useEffect(() => { const t = setTimeout(() => setAnim(score), 300); return () => clearTimeout(t); }, [score]);
  const color = score >= 80 ? "#52B788" : score >= 60 ? "#F4A261" : "#E63946";
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs" style={{ color: "#a89a8a" }}>{label}</span>
        <span className="text-xs" style={{ color }}>{score}%</span>
      </div>
      <div className="h-1 w-full rounded-full" style={{ background: "#1e2d40" }}>
        <div className="h-1 rounded-full transition-all duration-1000 ease-out" style={{ width: `${anim}%`, background: color }} />
      </div>
    </div>
  );
}

// ─── ADVISOR PHOTO (embedded, always loads) ──────────────────────────────────
function AdvisorPhoto({ size = 96, rounded = false }) {
  return (
    <div
      style={{
        width: size, height: size, flexShrink: 0,
        borderRadius: rounded ? "50%" : "4px",
        overflow: "hidden",
        border: "1px solid #2d3d54",
        background: "#1a2a3a",
      }}
    >
      <img
        src={ADVISOR.photo}
        alt={ADVISOR.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
      />
    </div>
  );
}

// ─── LANDING ADVISOR CARD ─────────────────────────────────────────────────────
function LandingAdvisorCard({ lang }) {
  const t = T[lang];
  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-20">
      {/* Section divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px" style={{ background: "#1a2a3a" }} />
        <span className="text-xs uppercase tracking-[0.35em]" style={{ color: "#4d5f72" }}>{t.aboutAdvisorTitle}</span>
        <div className="flex-1 h-px" style={{ background: "#1a2a3a" }} />
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start"
        style={{ border: "1px solid #1e2d40", background: "rgba(139,115,85,0.05)" }}>

        {/* Photo + firm */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <AdvisorPhoto size={88} rounded={true} />

        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="mb-3">
            <div className="text-lg font-normal" style={{ color: "#d4c5a9" }}>{ADVISOR.name}</div>
            <div className="text-sm mt-0.5" style={{ color: "#8B7355" }}>{ADVISOR.title[lang]}</div>
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#7a6a58", maxWidth: "400px" }}>
            {t.aboutAdvisorBio}
          </p>
          <div className="text-xs mb-5" style={{ color: "#4d5f72" }}>
            <a href={`mailto:${ADVISOR.email}`} style={{ color: "#7a6a58", textDecoration: "none" }}>{ADVISOR.email}</a>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={ADVISOR.profileUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 text-xs uppercase tracking-[0.25em] transition-all"
              style={{ background: "#8B7355", color: "#0D0D0D", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#C8A96E")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#8B7355")}>
              {t.advisorBookBtn}
            </a>
            <a href={ADVISOR.profileUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 text-xs uppercase tracking-[0.25em] transition-all"
              style={{ border: "1px solid #2d3d54", color: "#7a6a58", textDecoration: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#7a6a58"; e.currentTarget.style.color = "#8B7355"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2d3d54"; e.currentTarget.style.color = "#7a6a58"; }}>
              {t.advisorProfileBtn} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADVISOR SECTION (results page) ──────────────────────────────────────────
function AdvisorSection({ lang }) {
  const t = T[lang];

  return (
    <div className="mb-10">
      {/* Divider + intro */}
      <div className="mb-10 pt-6" style={{ borderTop: "1px solid #1e2d40" }}>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "#7a6a58", fontStyle: "italic", maxWidth: "520px" }}>
          {t.advisorIntro}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "#4d5f72", maxWidth: "520px" }}>
          {t.advisorConsultText}
        </p>
      </div>

      {/* Section label */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xs uppercase tracking-[0.3em]" style={{ color: "#8B7355" }}>{t.advisorSectionTitle}</h2>
        <div className="flex-1 h-px" style={{ background: "#1e2d40" }} />
      </div>

      {/* 15-min call primary CTA — above the card */}
      <div className="mb-6 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ border: "1px solid #2d3d54", background: "rgba(139,115,85,0.08)" }}>
        <div>
          <div className="text-sm mb-1" style={{ color: "#d4c5a9" }}>{t.advisorBookBtn}</div>
          <div className="text-xs leading-relaxed" style={{ color: "#7a6a58", maxWidth: "380px" }}>{t.advisorBookSubtext}</div>
        </div>
        <a href={ADVISOR.profileUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-7 py-3 text-xs uppercase tracking-[0.25em] transition-all flex-shrink-0"
          style={{ background: "#8B7355", color: "#0D0D0D", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#C8A96E")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#8B7355")}>
          {t.advisorBookBtn} →
        </a>
      </div>

      {/* Advisor card */}
      <div className="p-6 md:p-8" style={{ border: "1px solid #243044", background: "#161f30" }}>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">

          {/* Photo */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-3">
            <AdvisorPhoto size={96} rounded={true} />

          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-xl font-normal mb-0.5" style={{ color: "#f1e8d8", letterSpacing: "-0.01em" }}>
              {ADVISOR.name}
            </h3>
            <p className="text-sm" style={{ color: "#8B7355" }}>{ADVISOR.title[lang]}</p>


            <p className="text-sm leading-relaxed mb-5" style={{ color: "#8a7a65", maxWidth: "480px" }}>
              {ADVISOR.bio[lang]}
            </p>

            {/* Expertise pills */}
            <div className="mb-5">
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "#4d5f72" }}>{t.advisorExpertise}</div>
              <div className="flex flex-wrap gap-2">
                {ADVISOR.expertise[lang].map((item) => (
                  <span key={item} className="text-xs px-3 py-1"
                    style={{ border: "1px solid #2d3d54", color: "#7a6a58" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 mb-5 text-xs" style={{ color: "#4d5f72" }}>
              <span>{t.advisorBarLabel}: <span style={{ color: "#7a6a58" }}>{ADVISOR.bar[lang]}</span></span>
              <span>{t.advisorLangLabel}: <span style={{ color: "#7a6a58" }}>{ADVISOR.languages[lang]}</span></span>
            </div>

            {/* Secondary contacts */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`mailto:${ADVISOR.email}`}
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs tracking-wide transition-all"
                style={{ border: "1px solid #2d3d54", color: "#8a7a65", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8B7355"; e.currentTarget.style.color = "#8B7355"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2d3d54"; e.currentTarget.style.color = "#8a7a65"; }}>
                {ADVISOR.email}
              </a>
              <a href={ADVISOR.profileUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs uppercase tracking-[0.2em] transition-all"
                style={{ border: "1px solid #243044", color: "#4d5f72", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4d5f72"; e.currentTarget.style.color = "#8a7a65"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#243044"; e.currentTarget.style.color = "#4d5f72"; }}>
                {t.advisorProfileBtn} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────
function LandingPage({ lang, setLang, onStart }) {
  const t = T[lang];
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#111827", fontFamily: "Georgia, serif" }}>
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(139,115,85,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,115,85,0.06) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      <header className="relative z-10 flex items-center justify-between px-8 py-6" style={{ borderBottom: "1px solid #243044" }}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6" style={{ background: "#8B7355" }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-1">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xs uppercase tracking-[0.3em] hidden sm:inline" style={{ color: "#8B7355" }}>{t.appName}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs uppercase tracking-widest hidden md:block" style={{ color: "#4d5f72" }}>{t.appTagline}</div>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </header>
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="inline-block text-xs uppercase tracking-[0.4em] px-4 py-2 mb-10"
          style={{ border: "1px solid #2d3d54", color: "#8B7355" }}>
          {t.confidential}
        </div>
        <h1 className="text-5xl md:text-7xl font-normal leading-tight mb-8 max-w-4xl"
          style={{ color: "#f1e8d8", letterSpacing: "-0.02em" }}>
          {t.heroTitle1}<br />
          <span style={{ color: "#C8A96E", fontStyle: "italic" }}>{t.heroTitle2}</span>
        </h1>
        <p className="text-lg max-w-xl mb-4" style={{ color: "#8896aa", lineHeight: 1.8 }}>{t.heroSub}</p>
        <p className="text-sm max-w-lg mb-16" style={{ color: "#5a6b7e", lineHeight: 1.8 }}>{t.heroDesc}</p>
        <button onClick={onStart}
          className="px-12 py-5 text-sm uppercase tracking-[0.3em] transition-all duration-300"
          style={{ background: "#8B7355", color: "#0D0D0D" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#C8A96E")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#8B7355")}>
          {t.startBtn}
        </button>
        <div className="flex gap-16 mt-20" style={{ borderTop: "1px solid #1e2d40", paddingTop: "2rem" }}>
          {t.stats.map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-2xl mb-1" style={{ color: "#8B7355" }}>{num}</div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "#4d5f72" }}>{label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* About the Advisor — trust section before starting */}
      <LandingAdvisorCard lang={lang} />

      <footer className="relative z-10 text-center py-6" style={{ borderTop: "1px solid #1e2d40" }}>
        <p className="text-xs" style={{ color: "#3d4f62" }}>{t.disclaimer}</p>
      </footer>
    </div>
  );
}

function EmailCapturePage({ lang, setLang, onSubmit, onSkip }) {
  const t = T[lang];
  const [email, setEmail] = useState("");
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#111827", fontFamily: "Georgia, serif" }}>
      <AppHeader lang={lang} setLang={setLang} onRestart={onSkip} />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: "#8B7355" }}>{t.emailStep}</div>
          <h2 className="text-3xl font-normal mb-4" style={{ color: "#f1e8d8" }}>{t.emailDesc}</h2>
          <p className="text-sm mb-10" style={{ color: "#5a6b7e", lineHeight: 1.7 }}>{t.confidential}</p>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="w-full px-5 py-4 mb-4 text-sm outline-none"
            style={{ background: "#192032", border: "1px solid #2d3d54", color: "#f1e8d8", fontFamily: "Georgia, serif" }}
          />
          <button onClick={() => onSubmit(email)}
            className="w-full py-4 text-sm uppercase tracking-[0.3em] mb-4 transition-all"
            style={{ background: "#8B7355", color: "#0D0D0D" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C8A96E")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#8B7355")}>
            {t.emailBtn}
          </button>
          <button onClick={onSkip} className="text-xs uppercase tracking-widest" style={{ color: "#4d5f72" }}>{t.skipEmail}</button>
        </div>
      </div>
    </div>
  );
}

function QuestionnairePage({ lang, setLang, onComplete, onBack }) {
  const t = T[lang];
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const section = SECTIONS_DATA[sectionIdx];
  const q = section.questions[questionIdx];
  const globalIdx = SECTIONS_DATA.slice(0, sectionIdx).reduce((s, sec) => s + sec.questions.length, 0) + questionIdx;
  const totalQ = ALL_QUESTIONS.length;

  useEffect(() => { setSelected(answers[q?.id] || null); }, [sectionIdx, questionIdx]);

  const advance = (ans) => {
    if (animating || showIntro) return;
    const newAnswers = { ...answers, [q.id]: ans };
    setAnswers(newAnswers);
    setSelected(ans);
    setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        const nextQIdx = questionIdx + 1;
        if (nextQIdx < section.questions.length) {
          setQuestionIdx(nextQIdx);
        } else if (sectionIdx + 1 < SECTIONS_DATA.length) {
          setSectionIdx(sectionIdx + 1);
          setQuestionIdx(0);
          setShowIntro(true);
        } else {
          onComplete(newAnswers);
          return;
        }
        setAnimating(false);
      }, 300);
    }, 350);
  };

  const goBack = () => {
    if (animating) return;
    if (showIntro) {
      if (sectionIdx === 0) { onBack(); return; }
      setSectionIdx(sectionIdx - 1);
      setQuestionIdx(SECTIONS_DATA[sectionIdx - 1].questions.length - 1);
      setShowIntro(false); return;
    }
    if (questionIdx > 0) { setQuestionIdx(questionIdx - 1); return; }
    setShowIntro(true);
  };

  const optStyle = (val) => ({
    border: selected === val ? "1px solid #8B7355" : "1px solid #2d3d54",
    background: selected === val ? "rgba(139,115,85,0.1)" : "transparent",
    color: selected === val ? "#C8A96E" : "#8896aa",
    transition: "all 0.2s ease", cursor: "pointer",
    padding: "14px 24px", marginBottom: "10px",
    display: "flex", alignItems: "center", gap: "12px",
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#111827", fontFamily: "Georgia, serif" }}>
      <AppHeader lang={lang} setLang={setLang} onRestart={() => onBack(true)} showBack onBack={goBack} />
      <div className="px-6 md:px-8 pt-6 pb-2">
        <ProgressBar current={showIntro ? globalIdx : globalIdx + 1} total={totalQ} lang={lang} />
      </div>

      {showIntro ? (
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-5xl font-thin" style={{ color: "#2d3d54" }}>{section.number}</span>
              <div style={{ width: "1px", height: "48px", background: "#2d3d54" }} />
              <div>
                <div className="text-xs uppercase tracking-[0.3em] mb-1" style={{ color: "#8B7355" }}>
                  {lang === "fr" ? "Section" : "Section"} {sectionIdx + 1} {lang === "fr" ? "sur" : "of"} {SECTIONS_DATA.length}
                </div>
                <h2 className="text-2xl font-normal" style={{ color: "#f1e8d8" }}>{section.title[lang]}</h2>
              </div>
            </div>
            <p className="text-base leading-relaxed mb-10" style={{ color: "#9a8a75", fontStyle: "italic", borderLeft: "2px solid #2A2A2A", paddingLeft: "20px" }}>
              {t.sectionIntros[section.id]}
            </p>
            {sectionIdx === 0 && (
              <div className="mb-8 px-4 py-3" style={{ border: "1px solid #243044", background: "rgba(139,115,85,0.06)" }}>
                <p className="text-xs leading-relaxed" style={{ color: "#4A4040" }}>{t.preQuestionnaireDisclaimer}</p>
              </div>
            )}
            <button onClick={() => setShowIntro(false)}
              className="px-10 py-4 text-xs uppercase tracking-[0.3em] transition-all"
              style={{ background: "#8B7355", color: "#0D0D0D" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#C8A96E")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#8B7355")}>
              {lang === "fr" ? "Continuer →" : "Continue →"}
            </button>
          </div>
        </div>
      ) : (
        <main className="flex-1 flex items-center justify-center px-6 py-12"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateX(-20px)" : "translateX(0)", transition: "opacity 0.3s ease, transform 0.3s ease" }}>
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl font-thin" style={{ color: "#2d3d54" }}>{section.number}</span>
              <div style={{ width: "1px", height: "32px", background: "#2d3d54" }} />
              <div>
                <div className="text-xs uppercase tracking-[0.3em]" style={{ color: "#8B7355" }}>{section.title[lang]}</div>
                <div className="text-xs" style={{ color: "#4d5f72" }}>{lang === "fr" ? "Question" : "Question"} {questionIdx + 1} {lang === "fr" ? "sur" : "of"} {section.questions.length}</div>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-normal leading-snug mb-2" style={{ color: "#f1e8d8" }}>
              {q.text[lang]}
              <TooltipIcon text={q.tooltip[lang]} />
            </h2>
            <div className="mt-10">
              {[{ val: "yes", label: t.yes }, { val: "no", label: t.no }, { val: "unsure", label: t.unsure }].map((opt) => (
                <div key={opt.val} onClick={() => advance(opt.val)} style={optStyle(opt.val)}
                  onMouseEnter={(e) => { if (selected !== opt.val) { e.currentTarget.style.borderColor = "#5a6b7e"; e.currentTarget.style.color = "#9A9A8A"; } }}
                  onMouseLeave={(e) => { if (selected !== opt.val) { e.currentTarget.style.borderColor = "#2d3d54"; e.currentTarget.style.color = "#8896aa"; } }}>
                  <div className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ border: selected === opt.val ? "4px solid #8B7355" : "1px solid #3A3A3A" }} />
                  <span className="text-sm tracking-wide">{opt.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-xs" style={{ color: "#3d4f62" }}>{globalIdx + 1} / {totalQ} — {t.selectToContinue}</div>
          </div>
        </main>
      )}
    </div>
  );
}

function ResultsPage({ answers, email, lang, setLang, onRestart }) {
  const t = T[lang];
  const score = computeScore(answers);
  const status = getStatus(score, lang);
  const allFlags = getRiskFlags(answers);
  const top5Flags = allFlags.slice(0, 5);
  const top3Actions = allFlags.slice(0, 3);
  const percentileLabel = getPercentile(score, lang);
  const percentileNum = getPercentileNum(score);

  // Save to localStorage for future benchmarking (Part 7)
  useEffect(() => {
    try {
      const record = { score, answers, timestamp: new Date().toISOString(), lang };
      const existing = JSON.parse(localStorage.getItem("drs_submissions") || "[]");
      existing.push(record);
      localStorage.setItem("drs_submissions", JSON.stringify(existing.slice(-100)));
    } catch (e) {}
  }, []);

  const generatePDF = () => {
    const flagsHtml = top5Flags.map((f, i) => {
      const actions = getRiskActions(f.id, lang);
      const qText = f.question.text[lang];
      const qTooltip = f.question.tooltip[lang];
      return `<div style="margin-bottom:24px;padding:20px;border:1px solid #e8e0d4;background:#fdfcfa;">
        <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;">
          <span style="background:#8B7355;color:white;width:26px;height:26px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;flex-shrink:0;">${i + 1}</span>
          <div><strong style="font-size:14px;color:#1a1a1a;">${qText}</strong></div>
        </div>
        <p style="font-size:13px;color:#555;margin:0 0 12px 34px;line-height:1.7;">${qTooltip}</p>
        <div style="margin-left:34px;background:#f0ebe3;padding:14px;border-left:3px solid #8B7355;">
          <strong style="font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#8B7355;">${t.recommendedAction}</strong>
          <p style="font-size:13px;margin:6px 0 0;color:#333;line-height:1.6;">${actions[lang]}</p>
        </div>
      </div>`;
    }).join("");

    const catRows = SECTIONS_DATA.map(s => {
      const pct = getSectionScore(s.id, answers);
      const col = pct >= 80 ? "#2D6A4F" : pct >= 60 ? "#7B4F00" : "#7B1D1D";
      return `<tr style="border-bottom:1px solid #eee;">
        <td style="padding:10px;font-size:13px;">${s.title[lang]}</td>
        <td style="padding:10px;text-align:center;">
          <div style="width:100%;background:#eee;height:6px;border-radius:3px;">
            <div style="width:${pct}%;background:${col};height:6px;border-radius:3px;"></div>
          </div>
        </td>
        <td style="padding:10px;text-align:right;font-size:13px;color:${col};font-weight:bold;">${pct}%</td>
      </tr>`;
    }).join("");

    const allRows = ALL_QUESTIONS.map(q => {
      const ans = answers[q.id] || "—";
      const labels = { yes: t.yes, no: t.no, unsure: t.unsure };
      return `<tr style="border-bottom:1px solid #eee;">
        <td style="padding:8px 10px;font-size:12px;color:#333;">${q.text[lang]}</td>
        <td style="padding:8px 10px;text-align:center;font-size:12px;color:#555;">${labels[ans] || "—"}</td>
      </tr>`;
    }).join("");

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>${t.appName} — ${lang === "fr" ? "Rapport confidentiel" : "Confidential Report"}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: Georgia, serif; color: #1a1a1a; background: white; }
  .cover { background: #0f172a; color: #f1e8d8; padding: 60px; }
  .cover-badge { display:inline-block; border:1px solid #8B7355; color:#8B7355; font-size:10px; letter-spacing:0.3em; text-transform:uppercase; padding:6px 14px; margin-bottom:24px; }
  .cover h1 { font-size:38px; font-weight:normal; margin:0 0 8px; }
  .cover .sub { color:#6B6B6B; font-size:14px; }
  .section { padding:40px 60px; border-bottom:1px solid #e8e0d4; }
  .section-title { font-size:10px; text-transform:uppercase; letter-spacing:0.3em; color:#8B7355; margin-bottom:20px; }
  .score-row { display:flex; align-items:center; gap:32px; }
  .score-circle { width:90px; height:90px; border-radius:50%; background:${status.bg}; border:3px solid ${status.accent}; display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; }
  .score-num { font-size:28px; color:${status.color}; line-height:1; }
  .score-lbl { font-size:9px; text-transform:uppercase; letter-spacing:0.15em; color:${status.color}; }
  .badge { display:inline-block; background:${status.bg}; color:${status.color}; border:1px solid ${status.accent}; padding:5px 14px; font-size:11px; letter-spacing:0.15em; text-transform:uppercase; margin-top:8px; }
  table { width:100%; border-collapse:collapse; }
  th { font-size:10px; text-transform:uppercase; letter-spacing:0.12em; color:#8B7355; text-align:left; padding:8px 10px; background:#f5f1ea; border-bottom:1px solid #ddd; }
  .benchmark-box { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-top:16px; }
  .bm-item { background:#f5f1ea; padding:16px; border-left:3px solid #8B7355; }
  .bm-num { font-size:24px; color:#8B7355; margin-bottom:4px; }
  .bm-lbl { font-size:10px; text-transform:uppercase; letter-spacing:0.12em; color:#888; }
  .advisor-card { display:flex; gap:24px; align-items:flex-start; padding:24px; background:#fdfcfa; border:1px solid #e8e0d4; margin-top:16px; }
  .advisor-photo { width:72px; height:72px; object-fit:cover; object-position:top; border:1px solid #ddd; flex-shrink:0; }
  .advisor-pill { display:inline-block; border:1px solid #ddd; color:#7A6A5A; font-size:10px; padding:3px 9px; margin:2px 2px 0 0; }
  .footer { padding:24px 60px; background:#f5f1ea; font-size:11px; color:#888; line-height:1.7; }
  @media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
</style></head><body>
<div class="cover">
  <div class="cover-badge">${lang === "fr" ? "Confidentiel — Rapport d'évaluation" : "Confidential — Assessment Report"}</div>
  <h1>${t.appName}</h1>
  <div class="sub">${lang === "fr" ? "Rapport préparé le" : "Report prepared"} ${new Date().toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", { year:"numeric", month:"long", day:"numeric" })}${email ? ` · ${email}` : ""}</div>
</div>

<div class="section">
  <div class="section-title">1. ${lang === "fr" ? "Sommaire exécutif" : "Executive Summary"}</div>
  <p style="font-size:14px;line-height:1.8;color:#333;max-width:600px;">${t.statusDesc(score)}</p>
</div>

<div class="section">
  <div class="section-title">2. ${lang === "fr" ? "Score de préparation" : "Deal Readiness Score"}</div>
  <div class="score-row">
    <div class="score-circle"><div class="score-num">${score}</div><div class="score-lbl">/ 100</div></div>
    <div>
      <div style="font-size:26px;font-weight:normal;margin-bottom:6px;">${status.label}</div>
      <div class="badge">${status.label}</div>
      <p style="font-size:13px;color:#666;margin-top:12px;max-width:400px;line-height:1.7;">${t.valuationDesc(score)}</p>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">3. ${lang === "fr" ? "Position comparative" : "Benchmark Position"}</div>
  <div class="benchmark-box">
    <div class="bm-item"><div class="bm-num">${percentileNum}${lang === "fr" ? "e percentile" : "th %ile"}</div><div class="bm-lbl">${t.percentileLabel}</div></div>
    <div class="bm-item"><div class="bm-num">${t.avgScoreVal}</div><div class="bm-lbl">${t.avgScore}</div></div>
    <div class="bm-item"><div class="bm-num">${score >= 80 ? "↑" : score >= 60 ? "→" : "↓"}</div><div class="bm-lbl">${percentileLabel}</div></div>
  </div>
</div>

<div class="section">
  <div class="section-title">4. ${lang === "fr" ? "Facteurs de risque prioritaires" : "Key Risk Factors"}</div>
  ${top5Flags.length === 0 ? `<p style="font-size:14px;color:#555;">${t.noFlags}</p>` : flagsHtml}
</div>

<div class="section">
  <div class="section-title">5. ${lang === "fr" ? "Observations contextuelles" : "Contextual Observations"}</div>
  <p style="font-size:14px;color:#333;line-height:1.8;max-width:600px;">${t.valuationDesc(score)}</p>
</div>

<div class="section">
  <div class="section-title">6. ${lang === "fr" ? "Résultats par catégorie" : "Category Breakdown"}</div>
  <table><thead><tr><th>${lang === "fr" ? "Catégorie" : "Category"}</th><th>${lang === "fr" ? "Score visuel" : "Score"}</th><th style="text-align:right;">${lang === "fr" ? "Résultat" : "Result"}</th></tr></thead>
  <tbody>${catRows}</tbody></table>
</div>

<div class="section">
  <div class="section-title">7. ${lang === "fr" ? "Réponses complètes" : "Full Assessment Responses"}</div>
  <table><thead><tr><th>${lang === "fr" ? "Question" : "Question"}</th><th style="text-align:center;">${lang === "fr" ? "Réponse" : "Response"}</th></tr></thead>
  <tbody>${allRows}</tbody></table>
</div>

<div class="section">
  <div class="section-title">8. ${lang === "fr" ? "Votre conseiller" : "Your Advisor"}</div>
  <p style="font-size:13px;color:#666;line-height:1.7;margin-bottom:8px;max-width:560px;">${lang === "fr" ? "Ce rapport présente des considérations générales basées sur les informations fournies. Il ne constitue pas un avis juridique et ne crée aucune relation avocat-client." : "This report presents general considerations based on the information provided. It does not constitute legal advice and does not create a lawyer-client relationship."}</p>
  <p style="font-size:13px;color:#666;line-height:1.7;margin-bottom:20px;max-width:560px;">${lang === "fr" ? "Pour une analyse adaptée à votre situation, il peut être utile de consulter un professionnel." : "If you would like to discuss your specific situation, you may wish to consult a professional."}</p>
  <div class="advisor-card">
    <img class="advisor-photo" src="${ADVISOR.photo}" alt="${ADVISOR.name}" onerror="this.style.display='none'" />
    <div style="flex:1;">
      <div style="font-size:20px;font-weight:normal;color:#1a1a1a;margin-bottom:3px;">${ADVISOR.name}</div>
      <div style="font-size:12px;color:#8B7355;margin-bottom:2px;">${ADVISOR.title[lang]}</div>
      <div style="font-size:11px;color:#888;margin-bottom:14px;">${ADVISOR.firm}</div>
      <p style="font-size:13px;color:#555;line-height:1.7;margin-bottom:14px;max-width:480px;">${ADVISOR.bio[lang]}</p>
      <div style="margin-bottom:12px;">
        ${ADVISOR.expertise[lang].map(e => `<span class="advisor-pill">${e}</span>`).join("")}
      </div>
      <div style="font-size:11px;color:#888;margin-bottom:6px;">${lang === "fr" ? "Admission au barreau" : "Bar Admission"}: <span style="color:#555;">${ADVISOR.bar[lang]}</span></div>
      <div style="font-size:11px;color:#888;margin-bottom:14px;">${lang === "fr" ? "Langues" : "Languages"}: <span style="color:#555;">${ADVISOR.languages[lang]}</span></div>
      <div style="font-size:12px;line-height:1.9;">
        <div>✉ <a href="mailto:${ADVISOR.email}" style="color:#8B7355;text-decoration:none;">${ADVISOR.email}</a></div>
        <div>☎ ${ADVISOR.phone}</div>
        <div>⊕ <a href="${ADVISOR.profileUrl}" style="color:#8B7355;text-decoration:none;">${ADVISOR.profileUrl}</a></div>
      </div>
    </div>
  </div>
</div>

<div class="footer">
  <strong>${lang === "fr" ? "Avis de non-responsabilité" : "Disclaimer"}:</strong> ${lang === "fr" ? "Ce rapport est généré automatiquement à partir des informations fournies et est présenté à titre informatif seulement. Il ne constitue pas un avis juridique et ne crée aucune relation avocat-client. Il ne doit pas être interprété comme un avis juridique ou un substitut à des conseils professionnels. Les résultats sont basés sur des réponses autodéclarées et n'ont pas fait l'objet d'une vérification indépendante." : "This report is generated automatically based on user inputs and is for informational purposes only. It does not constitute legal advice and does not create a lawyer-client relationship. It should not be relied upon as legal advice or as a substitute for professional counsel. Results are based on self-reported responses and have not been independently verified."}
</div></body></html>`;

    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 600);
  };

  return (
    <div className="min-h-screen" style={{ background: "#111827", fontFamily: "Georgia, serif" }}>
      <AppHeader lang={lang} setLang={setLang} onRestart={onRestart} showRetake />

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Score hero */}
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.4em] mb-8" style={{ color: "#8B7355" }}>{t.assessmentComplete}</div>
          <ScoreRing score={score} accent={status.accent} />
          <div className="mt-5">
            <div className="inline-block text-sm uppercase tracking-[0.3em] px-6 py-2"
              style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}>
              {status.label}
            </div>
          </div>
          <p className="mt-6 text-sm max-w-lg mx-auto leading-relaxed" style={{ color: "#8896aa" }}>{t.statusDesc(score)}</p>
          {/* Results disclaimer */}
          <div className="mt-6 px-4 py-3 max-w-lg mx-auto" style={{ border: "1px solid #1e2d40", background: "rgba(139,115,85,0.06)" }}>
            <p className="text-xs leading-relaxed" style={{ color: "#4d5f72" }}>{t.resultsDisclaimer}</p>
          </div>
        </div>

        {/* Benchmark Insights */}
        <div className="mb-14 p-6 md:p-8" style={{ border: "1px solid #243044", background: "rgba(139,115,85,0.06)" }}>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-xs uppercase tracking-[0.3em]" style={{ color: "#8B7355" }}>{t.benchmarkTitle}</h2>
            <div className="flex-1 h-px" style={{ background: "#1e2d40" }} />
          </div>
          <p className="text-xs mb-6" style={{ color: "#5a6b7e" }}>{t.benchmarkSub}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { num: `${percentileNum}${lang === "fr" ? "e" : "th"}`, label: t.percentileLabel, sub: percentileLabel },
              { num: t.avgScoreVal, label: t.avgScore, sub: lang === "fr" ? "Basé sur les données simulées" : "Based on simulated data" },
              { num: score >= 80 ? "↑" : score >= 60 ? "→" : "↓", label: lang === "fr" ? "Tendance" : "Trend", sub: status.label },
            ].map((item) => (
              <div key={item.label} className="p-4" style={{ background: "#192032", border: "1px solid #243044" }}>
                <div className="text-2xl mb-1" style={{ color: "#C8A96E" }}>{item.num}</div>
                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#8B7355" }}>{item.label}</div>
                <div className="text-xs" style={{ color: "#5a6b7e" }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div className="pt-4" style={{ borderTop: "1px solid #1e2d40" }}>
            <div className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#8B7355" }}>{t.commonIssues}</div>
            {t.commonIssuesList.map((issue, i) => (
              <div key={i} className="flex items-center gap-3 mb-2">
                <span className="w-5 h-5 flex items-center justify-center text-xs rounded-full flex-shrink-0"
                  style={{ background: "#1a2a3a", color: "#8B7355", border: "1px solid #2d3d54" }}>{i + 1}</span>
                <span className="text-xs" style={{ color: "#8a7a65" }}>{issue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs uppercase tracking-[0.3em]" style={{ color: "#8B7355" }}>{t.categoryBreakdown}</h2>
            <div className="flex-1 h-px" style={{ background: "#1e2d40" }} />
          </div>
          {SECTIONS_DATA.map((s) => (
            <CategoryBar key={s.id} label={s.title[lang]} score={getSectionScore(s.id, answers)} />
          ))}
        </div>

        {/* Top 3 Immediate Actions */}
        {top3Actions.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xs uppercase tracking-[0.3em]" style={{ color: "#8B7355" }}>{t.top3Actions}</h2>
              <div className="flex-1 h-px" style={{ background: "#1e2d40" }} />
            </div>
            {top3Actions.map((flag, i) => {
              const actions = getRiskActions(flag.id, lang);
              return (
                <div key={flag.id} className="flex gap-4 mb-4 p-5" style={{ border: "1px solid #1e2d40" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                    style={{ background: ["#7B1D1D","#7B4F00","#3D3D2A"][i], color: "#f1e8d8" }}>{i + 1}</div>
                  <div>
                    <div className="text-xs mb-2" style={{ color: "#d4c5a9" }}>{flag.question.text[lang]}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "#8a7a65" }}>{actions[lang]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Priority Risk Flags */}
        {top5Flags.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xs uppercase tracking-[0.3em]" style={{ color: "#8B7355" }}>{t.priorityFlags}</h2>
              <div className="flex-1 h-px" style={{ background: "#1e2d40" }} />
            </div>
            {top5Flags.map((flag, i) => {
              const actions = getRiskActions(flag.id, lang);
              return (
                <div key={flag.id} className="p-6 mb-4 rounded-sm" style={{ border: "1px solid #243044", background: "rgba(255,255,255,0.02)" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                      style={{ background: i === 0 ? "#7B1D1D" : i === 1 ? "#7B4F00" : "#2A2A1A", color: "#f1e8d8" }}>{i + 1}</div>
                    <div className="flex-1">
                      <div className="text-sm leading-snug mb-2" style={{ color: "#d4c5a9" }}>{flag.question.text[lang]}</div>
                      <p className="text-xs leading-relaxed mb-4" style={{ color: "#5a6b7e" }}>{flag.question.tooltip[lang]}</p>
                      <div className="p-3" style={{ background: "rgba(139,115,85,0.09)", borderLeft: "2px solid #8B7355" }}>
                        <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: "#8B7355" }}>{t.recommendedAction}</div>
                        <p className="text-xs leading-relaxed" style={{ color: "#a89a8a" }}>{actions[lang]}</p>
                      </div>
                    </div>
                    <div className="text-xs px-2 py-1 flex-shrink-0"
                      style={{ border: "1px solid #2d3d54", color: "#5a6b7e" }}>
                      {flag.partial ? t.unsureLabel : t.riskLabel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Valuation Impact */}
        <div className="mb-14 p-6" style={{ border: `1px solid ${status.border}`, background: status.bg }}>
          <div className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: status.color }}>{t.valuationImpact}</div>
          <p className="text-sm leading-relaxed" style={{ color: status.color }}>{t.valuationDesc(score)}</p>
        </div>

        {/* Score tiers */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-5">
            <h2 className="text-xs uppercase tracking-[0.3em]" style={{ color: "#8B7355" }}>{t.scoreBreakdown}</h2>
            <div className="flex-1 h-px" style={{ background: "#1e2d40" }} />
          </div>
          {[
            { label: t.dealReady, range: "80–100", active: score >= 80, color: "#2D6A4F", accent: "#52B788", bg: "#0d2318" },
            { label: t.moderateRisk, range: "60–79", active: score >= 60 && score < 80, color: "#C8860A", accent: "#F4A261", bg: "#1d1508" },
            { label: t.highRisk, range: lang === "fr" ? "Moins de 60" : "Below 60", active: score < 60, color: "#E63946", accent: "#E63946", bg: "#1d0808" },
          ].map((tier) => (
            <div key={tier.label} className="flex items-center justify-between px-5 py-3 mb-1"
              style={{ background: tier.active ? tier.bg : "transparent", border: `1px solid ${tier.active ? tier.accent : "#1e2d40"}` }}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ background: tier.active ? tier.accent : "#2d3d54" }} />
                <span className="text-sm" style={{ color: tier.active ? tier.accent : "#4d5f72" }}>{tier.label}</span>
              </div>
              <span className="text-xs" style={{ color: tier.active ? tier.accent : "#2d3d54" }}>{tier.range}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14">
          <button onClick={generatePDF}
            className="flex-1 py-4 text-xs uppercase tracking-[0.3em] transition-all"
            style={{ border: "1px solid #8B7355", color: "#8B7355", background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(139,115,85,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            {t.downloadPdf}
          </button>
          <button onClick={onRestart}
            className="flex-1 py-4 text-xs uppercase tracking-[0.3em] transition-all"
            style={{ border: "1px solid #2d3d54", color: "#5a6b7e", background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#5a6b7e"; e.currentTarget.style.color = "#8896aa"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2d3d54"; e.currentTarget.style.color = "#5a6b7e"; }}>
            {t.retake}
          </button>
        </div>

        {/* Advisor Section */}
        <AdvisorSection lang={lang} />

        <p className="text-xs text-center mt-10 leading-relaxed" style={{ color: "#3d4f62" }}>{t.disclaimer}</p>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState("en");

  const restart = () => { setAnswers({}); setEmail(""); setPage("landing"); };

  return (
    <>
      {page === "landing" && <LandingPage lang={lang} setLang={setLang} onStart={() => setPage("questionnaire")} />}
      {page === "questionnaire" && (
        <QuestionnairePage lang={lang} setLang={setLang}
          onComplete={(ans) => { setAnswers(ans); setPage("email"); }}
          onBack={(full) => full ? restart() : setPage("landing")} />
      )}
      {page === "email" && (
        <EmailCapturePage lang={lang} setLang={setLang}
          onSubmit={(e) => { setEmail(e); setPage("results"); }}
          onSkip={() => setPage("results")} />
      )}
      {page === "results" && (
        <ResultsPage answers={answers} email={email} lang={lang} setLang={setLang} onRestart={restart} />
      )}
    </>
  );
}
