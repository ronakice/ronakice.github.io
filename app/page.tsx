"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, AtSign, FileText, GraduationCap, Twitter, Github, Music, Calendar, ExternalLink, Search } from "lucide-react"
import { useState, useMemo, useEffect, useRef } from "react"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Lazy-loads Spotify iframes only when scrolled into view.
// Each iframe is ~1MB+; loading 3 eagerly blocks initial paint.
function LazySpotifyEmbed({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true)
          observer.disconnect()
        }
      },
      // Start loading well before the embed scrolls into view.
      { rootMargin: "1200px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="rounded-lg overflow-hidden shadow-lg" style={{ minHeight: 352 }}>
      {loaded ? (
        <iframe
          style={{ borderRadius: "12px" }}
          src={src}
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <div className="flex h-[352px] items-center justify-center rounded-lg border border-border/40 bg-card/40">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Loading playlist...</p>
        </div>
      )}
    </div>
  )
}

function PapersSection() {
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set())
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set())
  const [selectedVenues, setSelectedVenues] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")

  const topics = ["Retrieval", "Reranking", "Retrieval-Augmented Generation", "Large Language Models", "Benchmarking", "Evaluation"]
  const years = ["2026", "2025", "2024", "2023", "2022", "2021", "2020"]
  const venues = ["SIGIR", "ACL", "EMNLP", "TREC", "EACL", "NAACL", "ECIR", "Preprint", "Others"]

  // Helper function to normalize venue
  const normalizeVenue = (venue: string): string => {
    if (venue.includes("NAACL")) return "NAACL"
    if (venue.includes("ECIR")) return "ECIR"
    if (venue.includes("EACL")) return "EACL"
    if (venue.includes("ACL")) return "ACL"
    if (venue.includes("EMNLP")) return "EMNLP"
    if (venue.includes("SIGIR")) return "SIGIR"
    if (venue.includes("TREC")) return "TREC"
    if (venue.includes("arXiv") || venue.includes("Preprint") || venue.includes("Under Review")) return "Preprint"
    return "Others"
  }

  const papers = useMemo(() => {
    return [
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
      .map((paper, index) => ({
        ...paper,
        year: paper.year?.toString() ?? "",
        venueNormalized: normalizeVenue(paper.venue),
        topics: paper.subtopics,
        originalIndex: index,
      }))
      .sort((a, b) => {
        const yearDiff = parseInt(b.year, 10) - parseInt(a.year, 10)
        return yearDiff !== 0 ? yearDiff : a.originalIndex - b.originalIndex
      })
  }, [])

  const toggleFilter = (set: Set<string>, value: string) => {
    const newSet = new Set(set)
    if (newSet.has(value)) {
      newSet.delete(value)
    } else {
      newSet.add(value)
    }
    return newSet
  }

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = paper.title.toLowerCase().includes(query)
        const matchesAuthors = paper.authors.toLowerCase().includes(query)
        const matchesVenue = paper.venue.toLowerCase().includes(query)
        if (!matchesTitle && !matchesAuthors && !matchesVenue) return false
      }

      // If no filters selected, show all (default "all" view)
      const hasTopicFilter = selectedTopics.size > 0
      const hasYearFilter = selectedYears.size > 0
      const hasVenueFilter = selectedVenues.size > 0

      if (!hasTopicFilter && !hasYearFilter && !hasVenueFilter) {
        return true
      }

      // Check topic filter
      if (hasTopicFilter) {
        const paperHasSelectedTopic = paper.topics.some((topic) => selectedTopics.has(topic))
        if (!paperHasSelectedTopic) return false
      }

      // Check year filter
      if (hasYearFilter) {
        if (!selectedYears.has(paper.year)) return false
      }

      // Check venue filter
      if (hasVenueFilter) {
        if (!selectedVenues.has(paper.venueNormalized)) return false
      }

      return true
    })
  }, [selectedTopics, selectedYears, selectedVenues, papers, searchQuery])

  const papersByYear = useMemo(() => {
    const groups = new Map<string, typeof filteredPapers>()
    for (const paper of filteredPapers) {
      const group = groups.get(paper.year) ?? []
      group.push(paper)
      groups.set(paper.year, group)
    }
    return Array.from(groups.entries())
  }, [filteredPapers])

  // Check for easter egg conditions
  const hasEasterEgg = filteredPapers.length === 0 && selectedYears.size > 0
  const selectedYearsArray = Array.from(selectedYears)
  const hasOldYear = selectedYearsArray.some((year) => parseInt(year) < 2024)

  // Map topics to spectral colors
  const topicColorMap: Record<string, string> = {
    "Retrieval": "chip-retrieval",
    "Reranking": "chip-reranking",
    "Retrieval-Augmented Generation": "chip-rag",
    "Large Language Models": "chip-llm",
    "Benchmarking": "chip-benchmarking",
    "Evaluation": "chip-evaluation",
  }

  return (
    <section id="papers" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/30 -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Publications</h2>

          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search papers, authors, venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search publications"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background/50 font-mono text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-10 space-y-6">
          {/* Topics Filter */}
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Topics</div>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => {
                const isSelected = selectedTopics.has(topic)
                const colorClass = topicColorMap[topic] || ""
                return (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopics(toggleFilter(selectedTopics, topic))}
                    className={cn(
                      "px-4 py-1.5 rounded-full font-mono text-xs transition-all border",
                      isSelected
                        ? `${colorClass} border-current shadow-lg`
                        : "bg-background/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    )}
                  >
                    {topic}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Year Filter */}
            <div>
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Year</div>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => {
                  const isSelected = selectedYears.has(year)
                  return (
                    <button
                      key={year}
                      onClick={() => setSelectedYears(toggleFilter(selectedYears, year))}
                      className={cn(
                        "px-4 py-1.5 rounded-full font-mono text-xs transition-all border",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                          : "bg-background/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      )}
                    >
                      {year}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Venue Filter */}
            <div>
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Venue</div>
              <div className="flex flex-wrap gap-2">
                {venues.map((venue) => {
                  const isSelected = selectedVenues.has(venue)
                  return (
                    <button
                      key={venue}
                      onClick={() => setSelectedVenues(toggleFilter(selectedVenues, venue))}
                      className={cn(
                        "px-4 py-1.5 rounded-full font-mono text-xs transition-all border",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                          : "bg-background/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      )}
                    >
                      {venue}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Papers list, grouped by year */}
        <p className="text-sm text-muted-foreground font-serif mb-8" aria-live="polite">
          {filteredPapers.length === papers.length
            ? `${papers.length} papers`
            : `Showing ${filteredPapers.length} of ${papers.length} papers`}
        </p>
        {filteredPapers.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-2 font-serif">No papers match these filters. Clear a filter or try a different search.</p>
            {hasEasterEgg && hasOldYear && (
              <p className="text-muted-foreground mt-4 font-display italic text-xl">
                If only I had a tardis
              </p>
            )}
            {hasEasterEgg && !hasOldYear && (
              <p className="text-muted-foreground mt-4 font-display italic text-xl">
                If only I was more productive
              </p>
            )}
          </div>
        ) : (
          <div className="max-w-4xl">
            {papersByYear.map(([year, yearPapers]) => (
              <div key={year} className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[6rem_1fr] gap-4 md:gap-8 border-t border-border/60 pt-5 mt-5 first:mt-0">
                <h3 className="font-display font-bold text-2xl md:text-3xl text-muted-foreground md:sticky md:top-24 self-start">{year}</h3>
                <ul>
                  {yearPapers.map((paper) => (
                    <li key={paper.title} className="py-3 border-b border-border/30 last:border-b-0">
                      <p className="font-display font-semibold text-lg leading-snug text-foreground">
                        {paper.link ? (
                          <Link href={paper.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            {paper.title}
                          </Link>
                        ) : (
                          paper.title
                        )}
                      </p>
                      <p className="text-muted-foreground text-[0.95rem] leading-relaxed font-serif mt-1">
                        {paper.authors.split("Ronak Pradeep").map((part, i, parts) => (
                          <span key={i}>
                            {part}
                            {i < parts.length - 1 && <span className="text-foreground font-semibold">Ronak Pradeep</span>}
                          </span>
                        ))}
                      </p>
                      <p className="text-sm text-primary font-serif mt-0.5">{paper.venue}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {filteredPapers.length > 0 && (
          <div className="text-center pt-12">
            <p className="text-muted-foreground">
              ... and a few more papers I might have potentially missed! See my{" "}
              <Link
                href="https://scholar.google.com/citations?user=xH7uDXgAAAAJ&hl"
                className="text-primary hover:text-primary/80 font-medium underline decoration-primary/30 underline-offset-4"
              >
                Google Scholar
              </Link>{" "}
              for the complete list.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}



const DarkSideVoxel = dynamic(
  () => import("@/components/DarkSideVoxel").then((mod) => ({ default: mod.DarkSideVoxel })),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-transparent" />,
  }
)

const SketchSelfPortrait = dynamic(
  () => import("@/components/SketchSelfPortrait"),
  { ssr: false }
)

export default function HomePage() {
  const [profileImage, setProfileImage] = useState("/images/RonakPradeep_circle.png")
  const [isMobile, setIsMobile] = useState(false)
  // The sketch is fixed bottom-right. Without a wide gutter it would sit on the hero photo,
  // so on those screens it waits until the visitor scrolls a little before sliding in.
  const [hasSketchGutter, setHasSketchGutter] = useState(false)
  const [pastHeroTop, setPastHeroTop] = useState(false)
  const [enableHeroVisuals, setEnableHeroVisuals] = useState(false)
  const [showHeroVisuals, setShowHeroVisuals] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      setHasSketchGutter(window.innerWidth >= 1680)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const loadVisuals = () => setEnableHeroVisuals(true)

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadVisuals, { timeout: 1500 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = window.setTimeout(loadVisuals, 300)
    return () => window.clearTimeout(timeoutId)
  }, [])

  const { scrollY } = useScroll()
  // The prism layer scrolls with the page (absolute, not fixed) and fades as it leaves,
  // so it never sits behind the hero text. The text itself is never faded.
  const voxelOpacity = useTransform(scrollY, [0, 500], [1, 0])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest < 1100
    setShowHeroVisuals((prev) => (prev === next ? prev : next))
    const past = latest > 240
    setPastHeroTop((prev) => (prev === past ? prev : past))
  })

  const toggleImage = () => {
    setProfileImage((prev) =>
      prev === "/images/RonakPradeep_circle.png"
        ? "/images/MrPenguin_circle.png"
        : "/images/RonakPradeep_circle.png"
    )
  }

  // `linkText` must appear verbatim in `text`; that span becomes the link.
  const updates: { date: string; text: string; link?: string; linkText?: string; icon: typeof Calendar }[] = [
    {
      date: "Jun 2026",
      text: "Life update: I joined Databricks AI Research!",
      icon: Calendar
    },
    {
      date: "Apr 2026",
      text: "Two papers accepted at SIGIR 2026: Auto-Judge, a benchmark for LLM judges in citation-grounded RAG, and automating long-form query generation!",
      icon: FileText
    },
    {
      date: "Mar 2026",
      text: "The overview of the TREC 2025 RAG Track is out! We are running the track again in 2026.",
      link: "https://arxiv.org/abs/2603.09891",
      linkText: "overview of the TREC 2025 RAG Track",
      icon: FileText
    },
    { date: "Apr 2025", text: "We have five papers accepted at SIGIR 2025! See you all in Padova!", icon: FileText },
    {
      date: "Nov 2024",
      text: "We had a successful first year of the TREC RAG 2024 Track with many submissions! Looking forward to Y2.",
      link: "https://trec-rag.github.io/",
      linkText: "TREC RAG 2024 Track",
      icon: Calendar
    },
    {
      date: "Feb 2024",
      text: "Organizing the TREC RAG 2024 Track! Do submit your systems :))",
      link: "https://trec-rag.github.io/",
      linkText: "TREC RAG 2024 Track",
      icon: Calendar
    },
    { date: "Dec 2023", text: "We introduced RankZephyr which garnered great community engagement!", icon: FileText },
    {
      date: "Dec 2023",
      text: 'I\'m excited to visit Singapore for EMNLP 2023 to present our work "How Does Generative Retrieval Scale to Millions of Passages?"',
      icon: ExternalLink
    },
    {
      date: "Nov 2023",
      text: "I will be leading the TREC 2024 Retrieval-Augmented Generation Track! More information coming soon!",
      icon: Calendar
    },
    {
      date: "Sep 2023",
      text: "We introduced RankVicuna, the first zero-shot listwise reranker that leverages open-source LLMs!",
      icon: FileText
    },
  ]

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30">
      {/* Voxel Background Layer - fades on scroll for both mobile and desktop */}
      <motion.div style={{ opacity: voxelOpacity }} className="absolute top-0 left-0 right-0 h-[85vh] z-0 pointer-events-none md:translate-y-0 -translate-y-[15vh]">
        {enableHeroVisuals && showHeroVisuals ? <DarkSideVoxel onPrismClick={toggleImage} /> : null}
        {/* Gradient Mask to blend into content */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </motion.div>

      {/* Keep the sketch available on large screens even after the hero visuals fade out. */}
      {!isMobile && enableHeroVisuals ? <SketchSelfPortrait tucked={!hasSketchGutter && !pastHeroTop} /> : null}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50 transition-all duration-300">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-3 md:py-4">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-x-8 gap-y-2">
            <Link href="#home" className="font-display text-xl font-bold text-foreground tracking-tight">
              Ronak Pradeep
            </Link>
            <div className="order-last md:order-none w-full md:w-auto flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar md:ml-auto pb-1 md:pb-0">
              {["Home", "Research", "Updates", "Papers", "Mentorship", "Playlists"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-spectrum-violet transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-spectrum-red via-spectrum-green to-spectrum-violet transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section - enough top padding on mobile to see prism first */}
      <section id="home" className="pt-[36vh] md:pt-[60vh] pb-20 relative z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 pointer-events-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-8 md:gap-16 items-center"
          >
            {/* Photo - show first on mobile, last on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center md:hidden mb-4"
            >
              <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-2xl ring-2 ring-border/50" title="Click the prism!">
                <Image
                  src={profileImage}
                  alt="Ronak Pradeep"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
            </motion.div>

            <div className="md:col-span-2 space-y-8">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl md:text-7xl font-display font-bold text-foreground mb-6 leading-tight"
                >
                  Ronak Pradeep
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex flex-wrap items-center gap-3 mb-6 font-mono text-sm"
                >
                  <span className="text-spectrum-blue">Research Scientist @ Databricks AI Research</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-spectrum-green">PhD, University of Waterloo</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-spectrum-orange">Apple PhD Fellow</span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed max-w-2xl"
              >
                <p>
                  Hi! I am a Research Scientist at{" "}
                  <Link href="https://www.databricks.com/research" className="text-primary hover:text-primary/80">
                    Databricks AI Research
                  </Link>{" "}
                  working on synthetic data and reinforcement learning for post-training information-seeking agents. I completed my PhD in the{" "}
                  <Link href="https://cs.uwaterloo.ca/" className="text-primary hover:text-primary/80">
                    David R. Cheriton School of Computer Science
                  </Link>{" "}
                  at the{" "}
                  <Link href="https://uwaterloo.ca/" className="text-primary hover:text-primary/80">
                    University of Waterloo
                  </Link>
                  , where I was advised by{" "}
                  <Link
                    href="https://cs.uwaterloo.ca/~jimmylin/index.html"
                    className="text-primary hover:text-primary/80"
                  >
                    Jimmy Lin
                  </Link>
                  . I have also had the chance to work at{" "}
                  <Link href="https://research.google/" className="text-primary hover:text-primary/80">
                    Google
                  </Link>,{" "}
                  <Link href="https://machinelearning.apple.com/" className="text-primary hover:text-primary/80">
                    Apple
                  </Link>, and{" "}
                  <Link href="https://yupp.ai/" className="text-primary hover:text-primary/80">
                    Yupp AI
                  </Link>
                  .
                </p>
                <p>
                  Previously, I completed my undergraduate studies at the University of Waterloo, where I majored in
                  Computer Science and{" "}
                  <Link
                    href="https://uwaterloo.ca/combinatorics-and-optimization/"
                    className="text-primary hover:text-primary/80"
                  >
                    Combinatorics and Optimization
                  </Link>
                  . During my undergrad, I've had the chance to intern at{" "}
                  <Link href="https://mila.quebec/en/" className="text-primary hover:text-primary/80">
                    Quebec Artificial Intelligence Institute (Mila)
                  </Link>
                  , ContextLogic, and RBC Research.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { icon: Mail, label: "Email", href: "mailto:rpradeep@uwaterloo.ca" },
                  { icon: AtSign, label: "Alt Email", href: "mailto:ronakice@hotmail.com" },
                  { icon: FileText, label: "CV", href: "/data/RonakPradeep-CV.pdf" },
                  { icon: GraduationCap, label: "Scholar", href: "https://scholar.google.com/citations?user=xH7uDXgAAAAJ&hl" },
                  { icon: Twitter, label: "Twitter", href: "https://twitter.com/rpradeep42" },
                  { icon: Github, label: "Github", href: "https://github.com/ronakice" },
                  { icon: Music, label: "Spotify", href: "https://open.spotify.com/user/qsjnogh907vnv3c6js7vcjccs?si=4139788b14f54573" },
                ].map((item, i) => (
                  <Button key={i} variant="outline" size="sm" className="rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all" asChild>
                    <Link href={item.href}>
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </motion.div>
            </div>

            {/* Photo - desktop only (mobile version is above) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="hidden md:flex justify-center"
            >
              <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl ring-2 ring-border/50" title="Click the prism!">
                <Image
                  src={profileImage}
                  alt="Ronak Pradeep"
                  width={256}
                  height={256}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-24 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-4xl font-display font-bold text-foreground mb-6 sticky top-24">Research Interests</h2>
            </div>
            <div className="md:col-span-2 prose prose-lg text-muted-foreground max-w-none leading-relaxed font-serif">
              <p>
                My research interests lie at the intersection of <span className="text-foreground font-medium">Information Retrieval</span> and <span className="text-foreground font-medium">Natural Language Processing</span>.
                More specifically, I'm interested in tasks such as Evaluation, Benchmarking, Retrieval-Augmented Generation, Reranking, Tool Use, Fact Verification, and
                Document Ranking.
                I have also been investigating the <span className="text-foreground font-medium">memory component of Large Language Models</span> and the interplay between the inherent reasoning and memory modules, entangled in a single LLM or
                otherwise. I look forward to contributing to the next generation of reasoners capable of working with a
                constantly evolving ocean of both structured and unstructured data.
                Some of my earlier work explores how to build neural search systems that promote correct and reliable information and work well in low-resource
                domains such as biomedical texts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Updates Section - Timeline */}
      <section id="updates" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold text-foreground mb-16 text-center">
            Latest Updates
          </h2>

          <div className="relative ml-4 md:ml-0 space-y-12">
            {/* Spectral light beam line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 beam-gradient opacity-60" />

            {updates.map((update, index) => (
              <div key={index} className="relative pl-12 md:pl-0">
                {/* Prism-shaped marker */}
                <div
                  className="absolute left-[-6px] top-1 w-3 h-3 rotate-45 bg-background border border-primary z-10"
                  style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
                />

                <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
                  <div className="md:col-span-1 md:text-right mb-2 md:mb-0">
                    <span className="font-mono text-xs text-primary tracking-wider uppercase">{update.date}</span>
                  </div>
                  <div className="md:col-span-4">
                    <div className="bg-card/50 border border-border/50 p-6 rounded-lg relative">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent rounded-l" />
                      <div className="absolute top-6 right-6 text-muted-foreground/10">
                        <update.icon className="w-8 h-8" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed pr-8 font-serif">
                        {update.link && update.linkText && update.text.includes(update.linkText) ? (
                          <span>
                            {update.text.slice(0, update.text.indexOf(update.linkText))}
                            <Link href={update.link} className="text-primary hover:underline">
                              {update.linkText}
                            </Link>
                            {update.text.slice(update.text.indexOf(update.linkText) + update.linkText.length)}
                          </span>
                        ) : (
                          update.text
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PapersSection />

      {/* Mentorship Section */}
      <section id="mentorship" className="py-24 bg-muted/30 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold text-foreground mb-10">Mentorship</h2>
          <div className="prose prose-lg text-muted-foreground max-w-none mb-10 leading-relaxed font-serif">
            <p>
              During my PhD journey, I had the privilege of mentoring over 40 undergraduate and graduate students!
              Below are some of the amazing students I've had the honor to work with (ordered lexicographically by last name):
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Vikram Chandramohan",
              "Haonan (Arthur) Chen",
              "Steven Chen",
              "Yidi Chen",
              "Hang Cui",
              "Lily Ge",
              "Lingwei Gu",
              "Qing Guo",
              "Zibo (Daniel) Guo",
              "Nikhil Gupta",
              "Xiao (Johnson) Han",
              "Nour Jedidi",
              "Yuxuan Ji",
              "Faraz Khoubsirat",
              "Nathan Kuissi",
              "Sisi Li",
              "Yilin (Larry) Li",
              "Estella Liu",
              "Yuqi Liu",
              "Xueguang Ma",
              "Jie (Stefan) Min",
              "Ryan Nguyen",
              "Pouya Sadeghi",
              "Nima Sadri",
              "Andre Slavescu",
              "Yuvan Sooryakumar",
              "Kai Sun",
              "Manveer Singh Tamber",
              "Raghav Vasudeva",
              "Yuetong Wang",
              "Alvis Wong",
              "Jasper Xian",
              "Andrew Xu",
              "Edward Xu",
              "Ruizhou (Richard) Xu",
              "Yicheng (Kevin) Xu",
              "Jeongseop (Patrick) Yi",
              "Edwin Zhang",
              "Eric Zhang",
              "Lijia (Lizzy) Zhang",
              "Brayden Zhong",
              "Vincent Zhong",
              "Catherine Zhou",
              "Joe Zou"
            ].map((name, index) => (
              <div key={index}>
                <Card className="bg-card/50 border-border/30 h-full">
                  <CardContent className="p-4 text-center flex items-center justify-center h-full">
                    <p className="text-foreground font-serif">{name}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Playlists Section */}
      <section id="playlists" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold text-foreground mb-6">Playlists</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed font-serif">
            Thanks for making it to here :-) As a token of gratitude and since you asked nicely for it, I shall also
            introduce you to a few of my Spotify playlists.
          </p>

          <div className="space-y-16">
            {/* Om - Sacred glow effect */}
            <div>
              <h3 className="text-4xl font-display font-semibold text-foreground mb-3 glow-sacred">ॐ</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed font-serif italic">
                And everything under the sun is in tune. <span className="text-spectrum-orange">But the sun is eclipsed by the moon.</span>
              </p>
              <p className="text-muted-foreground/70 mb-5 text-sm font-mono">
                A music dump of sorts. Updated regularly.
              </p>
              <LazySpotifyEmbed src="https://open.spotify.com/embed/playlist/1iM4pb2UpkQt07zsXLkDj7?utm_source=generator" />
            </div>

            <div>
              <h3 className="text-3xl font-display font-semibold text-foreground mb-3">A Day In The Life</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed font-serif">
                An allusion to{" "}
                <Link
                  href="https://open.spotify.com/track/0hKRSZhUGEhKU6aNSPBACZ?si=e1ab0c90f70042ac"
                  className="text-primary hover:text-primary/80"
                >
                  the Beatles song
                </Link>
                . Curated by a younger me for{" "}
                <Link href="https://en.wikipedia.org/wiki/Antheia" className="underline-wavy italic text-primary/80 hover:text-primary">
                  someone who stole my heart
                </Link>
                .
                </p>
                <p className="text-muted-foreground/70 mb-5 text-sm font-mono">
                  Not updated anymore.
                </p>
              <LazySpotifyEmbed src="https://open.spotify.com/embed/playlist/1VlYsIRVFv1ze8QDshghDe?utm_source=generator" />
            </div>

            <div>
              <h3 className="text-3xl font-display italic text-foreground mb-3">Liebesträume</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed font-serif">
                And what exactly is a <em className="text-primary">dream of love</em>? Here I take on Liszt and attempt to provide a longer
                answer to aid with my sleep.
              </p>
              <p className="text-muted-foreground/70 mb-5 text-sm font-mono">
                Updated semi-regularly.
              </p>
              <LazySpotifyEmbed src="https://open.spotify.com/embed/playlist/7uZRM2KlIGYhJzdv8dPTJ1?utm_source=generator" />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/30 text-center text-muted-foreground">
        <p className="font-mono text-xs">© {new Date().getFullYear()} Ronak Pradeep. Built with Next.js & Tailwind.</p>
      </footer>
    </div>
  )
}
