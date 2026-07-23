export type ArtifactLink = {
  label: "Paper" | "Code" | "Project" | "Dataset"
  href: string
}

export type Publication = {
  id: string
  title: string
  authors: string
  venue: string
  venueYear: number
  onlineYear?: number
  status?: "Forthcoming" | "Under review"
  topics: string[]
  links: ArtifactLink[]
  featured?: boolean
}

type RawPublication = {
  title: string
  authors: string
  venue: string
  link?: string
  subtopics: string[]
  year: number
}

const rawPublications: RawPublication[] = [
      {
        title: "Auto-Judge: A Cross-Task Benchmark for Comparing LLM Judges for Citation-Grounded RAG",
        authors:
          "Naghmeh Farzi, Tim Hagen, Eugene Yang, Maik Fröbe, Ronak Pradeep, Hossein A. Rahmani, Xi Wang, Oleg Zendel, Martin Potthast, Laura Dietz",
        venue: "SIGIR 2026",
        link: "",
        subtopics: ["Retrieval-Augmented Generation", "Benchmarking", "Evaluation", "Large Language Models"],
        year: 2026,
      },
      {
        title: "Automating Generation of Long-Form Queries",
        authors: "Shivani Upadhyay, Daniel Campos, Nandan Thakur, Ronak Pradeep, Nick Craswell, Jimmy Lin",
        venue: "SIGIR 2026",
        link: "",
        subtopics: ["Retrieval", "Benchmarking", "Large Language Models"],
        year: 2026,
      },
      {
        title: "Democratizing and Modernizing Information Access: From Open Rerankers to Scalable RAG Evaluation",
        authors: "Ronak Pradeep",
        venue: "PhD Thesis",
        link: "https://uwspace.uwaterloo.ca/items/e4b904e3-a64c-4290-ac1a-5a77025b1c60",
        subtopics: ["Retrieval", "Retrieval-Augmented Generation", "Evaluation", "Large Language Models"],
        year: 2025,
      },
      {
        title: "Overview of the TREC 2025 Retrieval Augmented Generation (RAG) Track",
        authors: "Shivani Upadhyay, Nandan Thakur, Ronak Pradeep, Nick Craswell, Daniel Campos, Jimmy Lin",
        venue: "TREC 2025",
        link: "https://arxiv.org/abs/2603.09891",
        subtopics: ["Retrieval-Augmented Generation", "Benchmarking", "Evaluation", "Large Language Models"],
        year: 2026,
      },
      {
        title: "Assembling Your Personal AI Council in Yupp to Provide Multiple Perspectives",
        authors: "Jimmy Lin, Ronak Pradeep, Gilad Mishne, Pankaj Gupta",
        venue: "WSDM 2026",
        link: "https://dl.acm.org/doi/10.1145/3773966.3784973",
        subtopics: ["Large Language Models", "Evaluation"],
        year: 2026,
      },
      {
        title: "NeuCLIRBench: A Modern Evaluation Collection for Monolingual, Cross-Language, and Multilingual Information Retrieval",
        authors: "Dawn Lawrie, James Mayfield, Eugene Yang, Andrew Yates, Sean MacAvaney, Ronak Pradeep, Scott Miller, Paul McNamee, Luca Soldaini",
        venue: "Under Review",
        link: "https://arxiv.org/abs/2511.14758",
        subtopics: ["Retrieval", "Benchmarking", "Evaluation", "Large Language Models"],
        year: 2025,
      },
      {
        title: "NeuCLIRTech: Chinese Monolingual and Cross-Language Information Retrieval Evaluation in a Challenging Domain",
        authors: "Dawn Lawrie, James Mayfield, Eugene Yang, Andrew Yates, Sean MacAvaney, Ronak Pradeep, Scott Miller, Paul McNamee, Luca Soldaini",
        venue: "Under Review",
        link: "https://arxiv.org/abs/2602.05334",
        subtopics: ["Retrieval", "Benchmarking", "Evaluation", "Cross-Language Information Retrieval"],
        year: 2026,
      },
      {
        title: "Humanity's Last Exam",
        authors: "Long Phan, Alice Gatti, Ziwen Han, ..., Ronak Pradeep, ...",
        venue: "Nature",
        link: "https://arxiv.org/abs/2501.14249",
        subtopics: ["Benchmarking", "Evaluation", "Large Language Models"],
        year: 2025,
      },
      {
        title: "RankLLM: A Python Package for Reranking with LLMs",
        authors:
          "Sahel Sharifymoghaddam, Ronak Pradeep, Andre Slavescu, Ryan Nguyen, Andrew Xu, Zijian Chen, Yilin Zhang, Yidi Chen, Jasper Xian, Jimmy Lin",
        venue: "SIGIR 2025",
        link: "https://github.com/castorini/rank_llm",
        subtopics: ["Retrieval", "Reranking", "Large Language Models"],
        year: 2025,
      },
      {
        title: "Gosling Grows Up: Retrieval with Learned Dense and Sparse Representations Using Anserini",
        authors:
          "Jimmy Lin, Arthur Haonan Chen, Carlos Lassance, Xueguang Ma, Ronak Pradeep, Tommaso Teofili, Jasper Xian, Jheng-Hong Yang, Brayden Zhong, Vincent Zhong",
        venue: "SIGIR 2025",
        link: "https://dl.acm.org/doi/10.1145/3726302.3730281",
        subtopics: ["Retrieval"],
        year: 2025,
      },
      {
        title: "Assessing Support for the TREC 2024 RAG Track: A Large-Scale Comparative Study of LLM and Human Evaluations",
        authors:
          "Nandan Thakur, Ronak Pradeep, Shivani Upadhyay, Daniel Campos, Nick Craswell, Ian Soboroff, Hoa Trang Dang, Jimmy Lin",
        venue: "SIGIR 2025",
        link: "https://dl.acm.org/doi/10.1145/3726302.3730165",
        subtopics: ["Retrieval-Augmented Generation", "Evaluation", "Large Language Models"],
        year: 2025,
      },
      {
        title: "Search Arena Meets Nuggets: Towards Explanations and Diagnostics in the Evaluation of LLM Responses",
        authors: "Sahel Sharifymoghaddam, Shivani Upadhyay, Nandan Thakur, Ronak Pradeep, Jimmy Lin",
        venue: "ICTIR 2026",
        link: "https://arxiv.org/abs/2504.20006",
        subtopics: ["Retrieval-Augmented Generation", "Evaluation", "Large Language Models"],
        year: 2026,
      },
      {
        title:
          "The Great Nugget Recall: Automating Fact Extraction and RAG Evaluation with Large Language Models",
        authors: "Ronak Pradeep, Nandan Thakur, Shivani Upadhyay, Daniel Campos, Nick Craswell, Jimmy Lin",
        venue: "SIGIR 2025",
        link: "https://arxiv.org/abs/2504.15068",
        subtopics: ["Retrieval-Augmented Generation", "Evaluation", "Large Language Models"],
        year: 2025,
      },
      {
        title:
          "Initial Nugget Evaluation Results for the TREC 2024 RAG Track with the AutoNuggetizer Framework",
        authors: "Ronak Pradeep, Nandan Thakur, Shivani Upadhyay, Daniel Campos, Nick Craswell, Jimmy Lin",
        venue: "arXiv",
        link: "https://arxiv.org/abs/2411.09607",
        subtopics: ["Retrieval-Augmented Generation", "Evaluation", "Large Language Models"],
        year: 2024,
      },
      {
        title: "A Large-Scale Study of Relevance Assessments with Large Language Models Using UMBRELA",
        authors: "Shivani Upadhyay, Ronak Pradeep, Nandan Thakur, Daniel Campos, Nick Craswell, Ian Soboroff, Hoa Trang Dang, Jimmy Lin",
        venue: "ICTIR 2025",
        link: "https://dl.acm.org/doi/10.1145/3731120.3744605",
        subtopics: ["Retrieval", "Evaluation", "Large Language Models"],
        year: 2025,
      },
      {
        title: "Accelerating Listwise Reranking: Reproducing and Enhancing FIRST",
        authors: "Zijian Chen, Ronak Pradeep, Jimmy Lin",
        venue: "SIGIR 2025",
        link: "https://dl.acm.org/doi/10.1145/3726302.3730287",
        subtopics: ["Retrieval", "Reranking", "Large Language Models"],
        year: 2025,
      },
      {
        title: "Ragnarök: A Reusable RAG Framework and Baselines for TREC 2024 Retrieval-Augmented Generation Track",
        authors: "Ronak Pradeep, Nandan Thakur, Sahel Sharifymoghaddam, Eric Zhang, Ryan Nguyen, Daniel Campos, Nick Craswell, Jimmy Lin",
        venue: "ECIR 2025",
        link: "https://arxiv.org/abs/2406.16828",
        subtopics: ["Retrieval", "Reranking", "Retrieval-Augmented Generation", "Benchmarking", "Large Language Models"],
        year: 2024,
      },
      {
        title: "Prompts as Auto-Optimized Training Hyperparameters: Training Best-in-Class IR Models from Scratch with 10 Gold Labels",
        authors: "Jasper Xian, Saron Samuel, Faraz Khoubsirat, Ronak Pradeep, Md Arafat Sultan, Radu Florian, Salim Roukos, Avirup Sil, Christopher Potts, Omar Khattab",
        venue: "arXiv",
        link: "https://arxiv.org/abs/2406.11706",
        subtopics: ["Retrieval", "Reranking", "Large Language Models"],
        year: 2024,
      },
      {
        title: "UMBRELA: UMbrela is the (Open-Source Reproduction of the) Bing RELevance Assessor",
        authors: "Shivani Upadhyay, Ronak Pradeep, Nandan Thakur, Nick Craswell, Jimmy Lin",
        venue: "arXiv",
        link: "https://arxiv.org/abs/2406.06519",
        subtopics: ["Retrieval", "Evaluation", "Large Language Models"],
        year: 2024,
      },
      {
        title: "ConvKGYarn: Spinning Configurable and Scalable Conversational Knowledge Graph QA Datasets with Large Language Models",
        authors: "Ronak Pradeep, Daniel Lee, Ali Mousavi, Jeffrey Pound, Yisi Sang, Jimmy Lin, Ihab Ilyas, Saloni Potdar, Mostafa Arefiyan, Yunyao Li",
        venue: "EMNLP 2024 Industry Track",
        link: "https://aclanthology.org/2024.emnlp-industry.89/",
        subtopics: ["Retrieval", "Large Language Models", "Benchmarking", "Evaluation"],
        year: 2024,
      },
      {
        title: "Entity Disambiguation via Fusion Entity Decoding",
        authors: "Junxiong Wang, Ali Mousavi, Omar Attia, Ronak Pradeep, Saloni Potdar, Alexander Rush, Umar Farooq Minhas, Yunyao Li",
        venue: "NAACL 2024",
        link: "https://aclanthology.org/2024.naacl-long.363",
        subtopics: ["Retrieval"],
        year: 2024,
      },
      {
        title: "Zero-Shot Cross-Lingual Reranking with Large Language Models for Low-Resource Languages",
        authors: "Mofetoluwa Adeyemi, Akintunde Oladipo, Ronak Pradeep, Jimmy Lin",
        venue: "ACL 2024",
        link: "https://arxiv.org/abs/2312.16159",
        subtopics: ["Retrieval", "Reranking", "Large Language Models"],
        year: 2024,
      },
      {
        title: "LiT and Lean: Distilling Listwise Rerankers into Encoder-Decoder Models",
        authors: "Manveer Singh Tamber, Ronak Pradeep, Jimmy Lin",
        venue: "ECIR 2025",
        link: "https://link.springer.com/chapter/10.1007/978-3-031-88714-7_13",
        subtopics: ["Retrieval", "Reranking", "Large Language Models"],
        year: 2025,
      },
      {
        title: "RankZephyr: Effective and Robust Zero-Shot Listwise Reranking is a Breeze!",
        authors: "Ronak Pradeep, Sahel Sharifymoghaddam, Jimmy Lin",
        venue: "arXiv",
        link: "https://arxiv.org/abs/2312.02724",
        subtopics: ["Retrieval", "Reranking", "Large Language Models"],
        year: 2023,
      },
      {
        title: "RankVicuna: Zero-Shot Listwise Document Reranking with Open-Source Large Language Models",
        authors: "Ronak Pradeep, Sahel Sharifymoghaddam, Jimmy Lin",
        venue: "arXiv",
        link: "https://arxiv.org/abs/2309.15088",
        subtopics: ["Retrieval", "Reranking", "Large Language Models"],
        year: 2023,
      },
      {
        title: "Vector Search with OpenAI Embeddings: Lucene Is All You Need",
        authors: "Jimmy Lin, Ronak Pradeep, Tommaso Teofili, Jasper Xian",
        venue: "WSDM 2024 Demo",
        link: "https://dl.acm.org/doi/10.1145/3616855.3635691",
        subtopics: ["Retrieval", "Large Language Models"],
        year: 2024,
      },
      {
        title:
          "naverloo @ TREC Deep Learning and NeuCLIR 2023: As Easy as Zero, One, Two, Three — Cascading Dual Encoders, Mono, Duo, and Listo for Ad-Hoc Retrieval",
        authors: "Carlos Lassance, Ronak Pradeep, Jimmy Lin",
        venue: "TREC 2023",
        link: "https://trec.nist.gov/pubs/trec32/papers/naverloo_DL.pdf",
        subtopics: ["Retrieval", "Large Language Models"],
        year: 2023,
      },
      {
        title: "Towards Automated End-to-End Health Misinformation Free Search with a Large Language Model",
        authors: "Ronak Pradeep, Jimmy Lin",
        venue: "ECIR 2024",
        link: "https://link.springer.com/chapter/10.1007/978-3-031-56066-8_9",
        subtopics: ["Retrieval", "Large Language Models"],
        year: 2024,
      },
      {
        title: "How Does Generative Retrieval Scale to Millions of Passages?",
        authors: "Ronak Pradeep, Kai Hui, Jai Gupta, Adam D Lelkes, Honglei Zhuang, Jimmy Lin, Donald Metzler, Vinh Q Tran",
        venue: "EMNLP 2023, SIGIR 2023 GenIR Workshop",
        link: "https://aclanthology.org/2023.emnlp-main.83/",
        subtopics: ["Retrieval"],
        year: 2023,
      },
      {
        title: "ReadProbe: A Demo of Retrieval-Enhanced Large Language Models to Support Lateral Reading",
        authors: "Dake Zhang, Ronak Pradeep",
        venue: "arXiv",
        link: "https://github.com/DakeZhang1998/ReadProbe",
        subtopics: ["Retrieval", "Large Language Models", "Retrieval-Augmented Generation"],
        year: 2023,
      },
      {
        title: "Zero-Shot Listwise Document Reranking with a Large Language Model",
        authors: "Xueguang Ma, Xinyu Zhang, Ronak Pradeep, Jimmy Lin",
        venue: "arXiv",
        link: "https://arxiv.org/abs/2305.02156",
        subtopics: ["Reranking", "Large Language Models"],
        year: 2023,
      },
      {
        title: "Pre-processing Matters! Improved Wikipedia Corpora for Open-Domain Question Answering",
        authors: "Manveer Singh Tamber, Ronak Pradeep, Jimmy Lin",
        venue: "ECIR 2023 Reproducibility",
        link: "https://github.com/castorini/pyserini",
        subtopics: ["Retrieval", "Reranking"],
        year: 2023,
      },
      {
        title: "PyGaggle: A Gaggle of Resources for Open-Domain Question Answering",
        authors: "Ronak Pradeep, Haonan Chen, Lingwei Gu, Manveer Singh Tamber, Jimmy Lin",
        venue: "ECIR 2023 Reproducibility",
        link: "https://github.com/castorini/pygaggle",
        subtopics: ["Retrieval", "Reranking"],
        year: 2023,
      },
      {
        title: "Neural Query Synthesis and Domain-Specific Ranking Templates for Multi-Stage Clinical Trial Matching",
        authors: "Ronak Pradeep, Yilin Li, Yuetong Wang, Jimmy Lin",
        venue: "SIGIR 2022",
        link: "https://dl.acm.org/doi/10.1145/3477495.3531853",
        subtopics: ["Retrieval", "Reranking"],
        year: 2022,
      },
      {
        title: "Document Expansions and Learned Sparse Lexical Representations for MS MARCO V1 and V2",
        authors: "Xueguang Ma, Ronak Pradeep, Rodrigo Nogueira, Jimmy Lin",
        venue: "SIGIR 2022",
        link: "https://dl.acm.org/doi/10.1145/3477495.3531749",
        subtopics: ["Retrieval"],
        year: 2022,
      },
      {
        title: "Squeezing Water from a Stone: A Bag of Tricks for Further Improving Cross-Encoder Effectiveness for Reranking",
        authors: "Ronak Pradeep, Yuqi Liu, Xinyu Zhang, Yilin Li, Andrew Yates, Jimmy Lin",
        venue: "ECIR 2022 Reproducibility",
        link: "https://dl.acm.org/doi/10.1007/978-3-030-99736-6_44",
        subtopics: ["Retrieval", "Reranking"],
        year: 2022,
      },
      {
        title: "Another Look at DPR: Reproduction of Training and Replication of Retrieval",
        authors: "Xueguang Ma, Kai Sun, Ronak Pradeep, Minghan Li, Jimmy Lin",
        venue: "ECIR 2022 Reproducibility",
        link: "https://github.com/castorini/pygaggle",
        subtopics: ["Retrieval"],
        year: 2022,
      },
      {
        title: "New Nails for Old Hammers: Anserini and Pyserini at TREC 2021",
        authors: "Jimmy Lin, Haonen Chen, Chengcheng Hu, Sheng-Chieh Lin, Yilin Li, Xueguang Ma, Ronak Pradeep, Jheng-Hong Yang, Chuan-Ju Wang, Andrew Yates, Xinyu Zhang",
        venue: "TREC 2021 Proceedings",
        link: "https://github.com/castorini/pygaggle",
        subtopics: ["Retrieval", "Reranking"],
        year: 2021
      },
      {
        title: "Vera: Prediction Techniques for Reducing Harmful Misinformation in Consumer Health Search",
        authors: "Ronak Pradeep, Xueguang Ma, Rodrigo Nogueira, Jimmy Lin",
        venue: "SIGIR 2021",
        link: "https://dl.acm.org/doi/10.1145/3404835.3463120",
        subtopics: ["Retrieval", "Reranking"],
        year: 2021,
      },
      {
        title: "Chatty Goose: A Python Framework for Conversational Search",
        authors: "Edwin Zhang, Sheng-Chieh Lin, Jheng-Hong Yang, Ronak Pradeep, Rodrigo Nogueira, Jimmy Lin",
        venue: "SIGIR 2021 Demo",
        link: "https://cs.uwaterloo.ca/~jimmylin/publications/Zhang_etal_SIGIR2021_chatty-goose.pdf",
        subtopics: ["Retrieval", "Reranking"],
        year: 2021,
      },
      {
        title: "Pyserini: A Python Toolkit for Reproducible Information Retrieval Research with Sparse and Dense Representations",
        authors: "Jimmy Lin, Xueguang Ma, Sheng-Chieh Lin, Jheng-Hong Yang, Ronak Pradeep, Rodrigo Nogueira",
        venue: "SIGIR 2021",
        link: "https://dl.acm.org/doi/10.1145/3404835.3463238",
        subtopics: ["Retrieval"],
        year: 2021,
      },
      {
        title: "H₂oloo at TAC 2020: Epidemic Question Answering",
        authors: "Justin Borromeo, Ronak Pradeep, Jimmy Lin",
        venue: "TAC 2020 Proceedings",
        link: undefined,
        subtopics: ["Retrieval", "Reranking"],
        year: 2020,
      },
      {
        title: "Exploring Listwise Evidence Reasoning with T5 for Fact Verification",
        authors: "Kelvin Jiang, Ronak Pradeep, Jimmy Lin",
        venue: "ACL 2021",
        link: "https://aclanthology.org/2021.acl-short.51",
        subtopics: ["Retrieval", "Reranking"],
        year: 2020,
      },
      {
        title: "H₂oloo at TREC 2020: When all you got is a Hammer... Deep Learning, Health Misinformation, and Precision Medicine",
        authors: "Ronak Pradeep, Xueguang Ma, Xinyu Zhang, Hang Cui, Ruizhou Xu, Rodrigo Nogueira, Jimmy Lin",
        venue: "TREC 2020 Proceedings",
        link: "https://trec.nist.gov/pubs/trec29/papers/h2oloo.DL.HM.PM.pdf",
        subtopics: ["Retrieval", "Reranking"],
        year: 2020,
      },
      {
        title: "Scientific Claim Verification with VerT5erini",
        authors: "Ronak Pradeep, Xueguang Ma, Rodrigo Nogueira, Jimmy Lin",
        venue: "LOUHI: EACL 2021 Workshop",
        link: "https://aclanthology.org/2021.louhi-1.11",
        subtopics: ["Retrieval", "Reranking"],
        year: 2020,
      },
      {
        title: "A Replication Study of Dense Passage Retriever",
        authors: "Xueguang Ma, Kai Sun, Ronak Pradeep, Jimmy Lin",
        venue: "arXiv",
        link: "https://arxiv.org/abs/2104.05740",
        subtopics: ["Retrieval"],
        year: 2021,
      },
      {
        title: "Covidex: Neural Ranking Models and Keyword Search Infrastructure for the COVID-19 Open Research Dataset",
        authors: "Edwin Zhang, Nikhil Gupta, Raphael Tang, Xiao Han, Ronak Pradeep, Kuang Lu, Yue Zhang, Rodrigo Nogueira, Kyunghyun Cho, Hui Fang, Jimmy Lin",
        venue: "Scholarly Document Processing: EMNLP 2020 Workshop",
        link: "https://aclanthology.org/2020.sdp-1.5",
        subtopics: ["Retrieval", "Reranking"],
        year: 2020,
      },
      {
        title: "The Expando-Mono-Duo Design Pattern for Text Ranking with Pretrained Sequence-to-Sequence Models",
        authors: "Ronak Pradeep, Rodrigo Nogueira, Jimmy Lin",
        venue: "arXiv",
        link: "https://arxiv.org/abs/2101.05667",
        subtopics: ["Retrieval", "Reranking"],
        year: 2020,
      },
      {
        title: "Document Ranking with a Pretrained Sequence-to-Sequence Model",
        authors: "Rodrigo Nogueira, Zhiying Jiang, Ronak Pradeep, Jimmy Lin",
        venue: "EMNLP 2020 Findings",
        link: "https://aclanthology.org/2020.findings-emnlp.63",
        subtopics: ["Retrieval", "Reranking"],
        year: 2020,
      },
      {
        title: "Foveated Down-Sampling Techniques",
        authors: "Parsa Torabian, Ronak Pradeep, Jeff Orchard, Bryan Tripp",
        venue: "CVIS 2020",
        link: "https://openjournals.uwaterloo.ca/index.php/vsl/article/view/3540",
        subtopics: [],
        year: 2020,
      },
]

const featuredTitles = new Set([
  "RankVicuna: Zero-Shot Listwise Document Reranking with Open-Source Large Language Models",
  "RankZephyr: Effective and Robust Zero-Shot Listwise Reranking is a Breeze!",
  "RankLLM: A Python Package for Reranking with LLMs",
  "Ragnarök: A Reusable RAG Framework and Baselines for TREC 2024 Retrieval-Augmented Generation Track",
  "The Great Nugget Recall: Automating Fact Extraction and RAG Evaluation with Large Language Models",
  "Democratizing and Modernizing Information Access: From Open Rerankers to Scalable RAG Evaluation",
])

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

export const publications: Publication[] = rawPublications.map((paper) => {
  const isUnderReview = paper.venue.toLowerCase().includes("under review")
  const isForthcoming = !paper.link
  const venueYearMatch = paper.venue.match(/(20\\d{2})/)
  const venueYear = venueYearMatch ? Number(venueYearMatch[1]) : paper.year

  return {
    id: slugify(paper.title),
    title: paper.title,
    authors: paper.authors,
    venue: paper.venue,
    venueYear,
    onlineYear: paper.year !== venueYear ? paper.year : undefined,
    status: isForthcoming ? "Forthcoming" : isUnderReview ? "Under review" : undefined,
    topics: paper.subtopics,
    links: paper.link ? [{ label: paper.link.includes("github.com") ? "Code" : "Paper", href: paper.link }] : [],
    featured: featuredTitles.has(paper.title),
  }
})

export type ResearchThread = {
  id: string
  stage: "RETRIEVE" | "RERANK" | "EVALUATE"
  title: string
  question: string
  description: string
  publicationIds: string[]
}

export const researchThreads: ResearchThread[] = [
  {
    id: "open-rerankers",
    stage: "RERANK",
    title: "Open rerankers",
    question: "Can open models make state-of-the-art ranking broadly usable?",
    description: "A line of listwise rerankers and reusable software that opened strong ranking systems to researchers without proprietary model access.",
    publicationIds: [
      "rankvicuna-zero-shot-listwise-document-reranking-with-open-source-large-language-models",
      "rankzephyr-effective-and-robust-zero-shot-listwise-reranking-is-a-breeze",
      "rankllm-a-python-package-for-reranking-with-llms",
    ],
  },
  {
    id: "rag-evaluation",
    stage: "EVALUATE",
    title: "Scalable RAG evaluation",
    question: "How do we measure whether long-form answers are useful and grounded?",
    description: "Benchmarks, reusable baselines, and automatic assessment methods for evaluating retrieval-augmented generation at realistic scale.",
    publicationIds: [
      "ragnaro-k-a-reusable-rag-framework-and-baselines-for-trec-2024-retrieval-augmented-generation-track",
      "the-great-nugget-recall-automating-fact-extraction-and-rag-evaluation-with-large-language-models",
      "umbrela-umbrela-is-the-open-source-reproduction-of-the-bing-relevance-assessor",
    ],
  },
  {
    id: "information-seeking-agents",
    stage: "RETRIEVE",
    title: "Information-seeking agents",
    question: "How should agents learn to search, verify, and act on changing information?",
    description: "Current work on synthetic data and reinforcement learning for post-training agents that gather and reason over evidence.",
    publicationIds: [
      "auto-judge-a-cross-task-benchmark-for-comparing-llm-judges-for-citation-grounded-rag",
      "democratizing-and-modernizing-information-access-from-open-rerankers-to-scalable-rag-evaluation",
    ],
  },
]

export type Update = { date: string; text: string; href?: string }

export const updates: Update[] = [
  { date: "Jun 2026", text: "Joined Databricks AI Research." },
  { date: "Apr 2025", text: "Five papers accepted at SIGIR 2025." },
  { date: "Nov 2024", text: "Completed the first year of the TREC RAG Track.", href: "https://trec-rag.github.io/" },
  { date: "Feb 2024", text: "Launched the TREC 2024 Retrieval-Augmented Generation Track.", href: "https://trec-rag.github.io/" },
  { date: "Dec 2023", text: "Introduced RankZephyr, an open zero-shot listwise reranker." },
  { date: "Sep 2023", text: "Introduced RankVicuna, an open-source listwise reranker." },
]

export type MentorshipEntry = { name: string; href?: string }

export const mentees: MentorshipEntry[] = [
  "Vikram Chandramohan", "Haonan (Arthur) Chen", "Steven Chen", "Yidi Chen", "Hang Cui", "Lily Ge", "Lingwei Gu", "Qing Guo", "Zibo (Daniel) Guo", "Nikhil Gupta", "Xiao (Johnson) Han", "Nour Jedidi", "Yuxuan Ji", "Faraz Khoubsirat", "Nathan Kuissi", "Sisi Li", "Yilin (Larry) Li", "Estella Liu", "Yuqi Liu", "Xueguang Ma", "Jie (Stefan) Min", "Ryan Nguyen", "Pouya Sadeghi", "Nima Sadri", "Andre Slavescu", "Yuvan Sooryakumar", "Kai Sun", "Manveer Singh Tamber", "Raghav Vasudeva", "Yuetong Wang", "Alvis Wong", "Jasper Xian", "Andrew Xu", "Edward Xu", "Ruizhou (Richard) Xu", "Yicheng (Kevin) Xu", "Jeongseop (Patrick) Yi", "Edwin Zhang", "Eric Zhang", "Lijia (Lizzy) Zhang", "Brayden Zhong", "Vincent Zhong", "Catherine Zhou", "Joe Zou",
].map((name) => ({ name }))

export type Playlist = { title: string; note: string; description: string; src: string }

export const playlists: Playlist[] = [
  { title: "ॐ", note: "A music dump of sorts. Updated regularly.", description: "And everything under the sun is in tune. But the sun is eclipsed by the moon.", src: "https://open.spotify.com/embed/playlist/1iM4pb2UpkQt07zsXLkDj7?utm_source=generator" },
  { title: "A Day In The Life", note: "Not updated anymore.", description: "An allusion to the Beatles song, curated by a younger me for someone who stole my heart.", src: "https://open.spotify.com/embed/playlist/1VlYsIRVFv1ze8QDshghDe?utm_source=generator" },
  { title: "Liebesträume", note: "Updated semi-regularly.", description: "What exactly is a dream of love? Here I take on Liszt and attempt a longer answer to aid with my sleep.", src: "https://open.spotify.com/embed/playlist/7uZRM2KlIGYhJzdv8dPTJ1?utm_source=generator" },
]
