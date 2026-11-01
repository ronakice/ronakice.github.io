"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Mail, FileText, GraduationCap, Github, Search } from "lucide-react"
import { useState, useMemo, useEffect, useRef } from "react"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { DaySigil, EclipseSigil, Heartbeat, NocturneSigil } from "@/components/PlaylistSigils"
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// Spotify mark (Simple Icons, CC0), monochrome to match the GitHub and X icons.
function SpotifyLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

// Playlist rows: illustration on the left, copy and player on the right (lg+ only).
const playlistRow =
  "grid grid-cols-1 lg:grid-cols-[11rem_1fr] lg:gap-10 py-10 border-t border-border/50 first:border-t-0 first:pt-0"

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
    <div ref={ref} className="rounded-lg overflow-hidden shadow-lg" style={{ minHeight: 152 }}>
      {loaded ? (
        <iframe
          style={{ borderRadius: "12px" }}
          src={src}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <div className="flex h-[152px] items-center justify-center rounded-lg border border-border/40 bg-card/40">
          <p className="text-sm text-muted-foreground">Loading playlist…</p>
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


  return (
    <section id="papers" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/30 -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-[2rem] md:text-[2.5rem] leading-[1.1] font-display font-semibold text-foreground mb-6">Publications</h2>

          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search papers, authors, venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search publications"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background/50 text-base focus-visible:border-foreground transition-colors"
            />
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-10 space-y-6">
          {/* Topics Filter */}
          <div>
            <div className="text-sm font-semibold text-foreground/80 mb-3">Topics</div>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => {
                const isSelected = selectedTopics.has(topic)
                return (
                  <button
                    key={topic}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedTopics(toggleFilter(selectedTopics, topic))}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-sm transition-colors border",
                      isSelected
                        ? "bg-foreground text-background border-foreground"
                        : "border-input text-muted-foreground hover:bg-accent hover:text-foreground"
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
              <div className="text-sm font-semibold text-foreground/80 mb-3">Year</div>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => {
                  const isSelected = selectedYears.has(year)
                  return (
                    <button
                      key={year}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedYears(toggleFilter(selectedYears, year))}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-sm transition-colors border",
                        isSelected
                          ? "bg-foreground text-background border-foreground"
                          : "border-input text-muted-foreground hover:bg-accent hover:text-foreground"
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
              <div className="text-sm font-semibold text-foreground/80 mb-3">Venue</div>
              <div className="flex flex-wrap gap-2">
                {venues.map((venue) => {
                  const isSelected = selectedVenues.has(venue)
                  return (
                    <button
                      key={venue}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedVenues(toggleFilter(selectedVenues, venue))}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-sm transition-colors border",
                        isSelected
                          ? "bg-foreground text-background border-foreground"
                          : "border-input text-muted-foreground hover:bg-accent hover:text-foreground"
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
        <p className="text-sm text-muted-foreground mb-8" aria-live="polite">
          {filteredPapers.length === papers.length
            ? `${papers.length} papers`
            : `Showing ${filteredPapers.length} of ${papers.length} papers`}
        </p>
        {filteredPapers.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-2">No papers match these filters. Clear a filter or try a different search.</p>
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
                <h3 className="font-display font-semibold text-3xl md:text-4xl text-muted-foreground md:sticky md:top-24 self-start">{year}</h3>
                <ul>
                  {yearPapers.map((paper) => (
                    <li key={paper.title} className="py-3 border-b border-border/30 last:border-b-0">
                      <p className="font-medium text-lg md:text-xl leading-[1.35] tracking-[-0.01em] text-foreground">
                        {paper.link ? (
                          <Link href={paper.link} target="_blank" rel="noopener noreferrer" className="underline decoration-transparent underline-offset-[3px] decoration-1 hover:decoration-[hsl(var(--link-underline))] transition-colors">
                            {paper.title}
                          </Link>
                        ) : (
                          paper.title
                        )}
                      </p>
                      <p className="text-muted-foreground text-[0.95rem] leading-relaxed mt-1">
                        {paper.authors.split("Ronak Pradeep").map((part, i, parts) => (
                          <span key={i}>
                            {part}
                            {i < parts.length - 1 && <span className="text-foreground font-semibold">Ronak Pradeep</span>}
                          </span>
                        ))}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">{paper.venue}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {filteredPapers.length > 0 && (
          <div className="max-w-4xl pt-10">
            <p className="text-muted-foreground">
              ... and a few more papers I might have potentially missed! See my{" "}
              <Link
                href="https://scholar.google.com/citations?user=xH7uDXgAAAAJ&hl"
                className="link"
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
  const updates: { date: string; text: string; link?: string; linkText?: string }[] = [
    {
      date: "Jun 2026",
      text: "Life update: I joined Databricks AI Research!"
    },
    {
      date: "Apr 2026",
      text: "Two papers accepted at SIGIR 2026: Auto-Judge, a benchmark for LLM judges in citation-grounded RAG, and automating long-form query generation!"
    },
    {
      date: "Mar 2026",
      text: "The overview of the TREC 2025 RAG Track is out! We are running the track again in 2026.",
      link: "https://arxiv.org/abs/2603.09891",
      linkText: "overview of the TREC 2025 RAG Track"
    },
    { date: "Apr 2025", text: "We have five papers accepted at SIGIR 2025! See you all in Padova!" },
    {
      date: "Nov 2024",
      text: "We had a successful first year of the TREC RAG 2024 Track with many submissions! Looking forward to Y2.",
      link: "https://trec-rag.github.io/",
      linkText: "TREC RAG 2024 Track"
    },
    {
      date: "Feb 2024",
      text: "Organizing the TREC RAG 2024 Track! Do submit your systems :))",
      link: "https://trec-rag.github.io/",
      linkText: "TREC RAG 2024 Track"
    },
    { date: "Dec 2023", text: "We introduced RankZephyr which garnered great community engagement!" },
    {
      date: "Dec 2023",
      text: 'I\'m excited to visit Singapore for EMNLP 2023 to present our work "How Does Generative Retrieval Scale to Millions of Passages?"'
    },
    {
      date: "Nov 2023",
      text: "I will be leading the TREC 2024 Retrieval-Augmented Generation Track! More information coming soon!"
    },
    {
      date: "Sep 2023",
      text: "We introduced RankVicuna, the first zero-shot listwise reranker that leverages open-source LLMs!"
    },
  ]

  return (
    <div className="min-h-screen bg-background relative selection:bg-foreground selection:text-background">
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
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
        <div className="max-w-7xl mx-auto px-6 py-3 md:py-4">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-x-8 gap-y-2">
            <Link href="#home" className="font-display text-2xl font-semibold text-foreground">
              Ronak Pradeep
            </Link>
            <div className="order-last md:order-none w-full md:w-auto flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar md:ml-auto pb-1 md:pb-0 pr-6 md:pr-0 [mask-image:linear-gradient(to_right,black_80%,transparent)] md:[mask-image:none]">
              {["Home", "Research", "Updates", "Papers", "Mentorship", "Playlists"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="shrink-0 text-[0.95rem] text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all group-hover:w-full" />
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
                  className="text-[3.5rem] md:text-[5.5rem] font-display font-medium text-foreground mb-6 leading-[0.98] tracking-[-0.015em]"
                >
                  Ronak Pradeep
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="space-y-1"
                >
                  {/* Databricks brand red (#FF3621) is 3.4:1 on paper, so it is set at 24px to count as large text. */}
                  <p className="text-2xl font-semibold text-foreground">
                    Research Scientist at <span className="text-[#FF3621]">Databricks AI Research</span>
                  </p>
                  <p className="text-lg text-muted-foreground">PhD in Computer Science, University of Waterloo, as an Apple PhD Fellow.</p>
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
                  <Link href="https://www.databricks.com/research" className="link">
                    Databricks AI Research
                  </Link>{" "}
                  working on synthetic data and reinforcement learning for post-training information-seeking agents. I completed my PhD in the{" "}
                  <Link href="https://cs.uwaterloo.ca/" className="link">
                    David R. Cheriton School of Computer Science
                  </Link>{" "}
                  at the{" "}
                  <Link href="https://uwaterloo.ca/" className="link">
                    University of Waterloo
                  </Link>
                  , where I was advised by{" "}
                  <Link
                    href="https://cs.uwaterloo.ca/~jimmylin/index.html"
                    className="link"
                  >
                    Jimmy Lin
                  </Link>
                  . I have also had the chance to work at{" "}
                  <Link href="https://research.google/" className="link">
                    Google
                  </Link>,{" "}
                  <Link href="https://machinelearning.apple.com/" className="link">
                    Apple
                  </Link>, and{" "}
                  <Link href="https://yupp.ai/" className="link">
                    Yupp AI
                  </Link>
                  .
                </p>
                <p>
                  Previously, I completed my undergraduate studies at the University of Waterloo, where I majored in
                  Computer Science and{" "}
                  <Link
                    href="https://uwaterloo.ca/combinatorics-and-optimization/"
                    className="link"
                  >
                    Combinatorics and Optimization
                  </Link>
                  . During my undergrad, I've had the chance to intern at{" "}
                  <Link href="https://mila.quebec/en/" className="link">
                    Quebec Artificial Intelligence Institute (Mila)
                  </Link>
                  , ContextLogic, and RBC Research.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap items-center gap-3"
              >
                {[
                  { icon: Mail, label: "Email", href: "mailto:rpradeep@uwaterloo.ca" },
                  { icon: FileText, label: "CV", href: "/data/RonakPradeep-CV.pdf" },
                  { icon: GraduationCap, label: "Scholar", href: "https://scholar.google.com/citations?user=xH7uDXgAAAAJ&hl" },
                ].map((item) => (
                  <Button key={item.label} variant="outline" className="rounded-full border-input hover:bg-accent hover:text-foreground transition-colors" asChild>
                    <Link href={item.href}>
                      <item.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
                <div className="flex items-center gap-1 -ml-3 sm:ml-1">
                  {[
                    { icon: Github, label: "GitHub", href: "https://github.com/ronakice" },
                    { icon: XLogo, label: "X (Twitter)", href: "https://x.com/rpradeep42" },
                    { icon: SpotifyLogo, label: "Spotify", href: "https://open.spotify.com/user/qsjnogh907vnv3c6js7vcjccs?si=4139788b14f54573" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      title={item.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <item.icon className="w-[18px] h-[18px]" />
                    </Link>
                  ))}
                </div>
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
              <h2 className="text-[2rem] md:text-[2.5rem] leading-[1.1] font-display font-semibold text-foreground mb-6 sticky top-24">Research Interests</h2>
            </div>
            <div className="md:col-span-2 prose prose-lg text-muted-foreground max-w-[65ch] leading-relaxed">
              <p>
                I work on <span className="text-foreground font-medium">knowledge agents</span>: systems that search, read, and reason over large collections of structured and unstructured data to answer hard questions.
                I approach this from both the data side and the model side, through data environments and reinforcement learning.
                I have also worked extensively on evaluation, including nugget-based assessment of RAG, LLM judges, and community-wide benchmarks such as the TREC RAG Track.
                The two threads form one loop: how we measure a response becomes the reward an agent learns from.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section id="updates" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[2rem] md:text-[2.5rem] leading-[1.1] font-display font-semibold text-foreground mb-10">Latest Updates</h2>
          <ol className="max-w-4xl">
            {updates.map((update) => (
              <li
                key={update.date + update.text}
                className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-1 sm:gap-8 py-4 border-t border-border/50 first:border-t-0"
              >
                <time className="text-sm text-muted-foreground tabular-nums pt-0.5">{update.date}</time>
                <p className="text-foreground/90 leading-relaxed">
                  {update.link && update.linkText && update.text.includes(update.linkText) ? (
                    <>
                      {update.text.slice(0, update.text.indexOf(update.linkText))}
                      <Link href={update.link} className="link">
                        {update.linkText}
                      </Link>
                      {update.text.slice(update.text.indexOf(update.linkText) + update.linkText.length)}
                    </>
                  ) : (
                    update.text
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PapersSection />

      {/* Mentorship Section */}
      <section id="mentorship" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[2rem] md:text-[2.5rem] leading-[1.1] font-display font-semibold text-foreground mb-10">Mentorship</h2>
          <div className="prose prose-lg text-muted-foreground max-w-[65ch] mb-10 leading-relaxed">
            <p>
              During my PhD journey, I had the privilege of mentoring over 40 undergraduate and graduate students!
              Below are some of the amazing students I've had the honor to work with (ordered lexicographically by last name):
            </p>
          </div>

          <ul className="columns-2 md:columns-3 lg:columns-4 gap-x-8 max-w-5xl text-foreground">
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
            ].map((name) => (
              <li key={name} className="py-1.5 break-inside-avoid">{name}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Playlists Section */}
      <section id="playlists" className="py-24 bg-muted/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[2rem] md:text-[2.5rem] leading-[1.1] font-display font-semibold text-foreground mb-6">Playlists</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed max-w-[65ch]">
            Thanks for making it to here :-) As a token of gratitude and since you asked nicely for it, I shall also
            introduce you to a few of my Spotify playlists.
          </p>

          <div className="max-w-5xl">
            <div className={playlistRow}>
              <EclipseSigil />
              <div className="min-w-0">
              <h3 className="text-4xl font-display font-semibold text-foreground mb-3 glow-sacred">ॐ</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed italic">
                And everything under the sun is in tune. <span className="text-spectrum-orange">But the sun is eclipsed by the moon.</span>
              </p>
              <p className="text-muted-foreground mb-5 text-sm italic">
                A music dump of sorts. Updated regularly.
              </p>
              <LazySpotifyEmbed src="https://open.spotify.com/embed/playlist/1iM4pb2UpkQt07zsXLkDj7?utm_source=generator" />
              </div>
            </div>

            <div className={playlistRow}>
              <DaySigil />
              <div className="min-w-0">
              <h3 className="text-3xl font-display font-semibold text-foreground mb-3">A Day In The Life</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                An allusion to{" "}
                <Link
                  href="https://open.spotify.com/track/0hKRSZhUGEhKU6aNSPBACZ?si=e1ab0c90f70042ac"
                  className="link"
                >
                  the Beatles song
                </Link>
                . Curated by a younger me for{" "}
                <Link href="https://en.wikipedia.org/wiki/Antheia" className="underline-wavy italic text-foreground">
                  someone who stole my heart
                </Link>
                .
                </p>
                <p className="text-muted-foreground mb-5 text-sm italic">
                  Not updated anymore.
                </p>
              <LazySpotifyEmbed src="https://open.spotify.com/embed/playlist/1VlYsIRVFv1ze8QDshghDe?utm_source=generator" />
              </div>
            </div>

            <div className={playlistRow}>
              <NocturneSigil />
              <div className="min-w-0">
              <h3 className="text-3xl font-display italic text-foreground mb-3">Liebesträume</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                And what exactly is a <em className="text-foreground">dream of love</em>? Here I take on Liszt and attempt to provide a longer
                answer to aid with my sleep.
              </p>
              <p className="text-muted-foreground mb-5 text-sm italic">
                Updated semi-regularly.
              </p>
              <LazySpotifyEmbed src="https://open.spotify.com/embed/playlist/7uZRM2KlIGYhJzdv8dPTJ1?utm_source=generator" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/30 text-center text-muted-foreground">
        <p className="italic text-muted-foreground/90 mb-3 px-6">
          &ldquo;There is no dark side of the moon really. Matter of fact, it&rsquo;s all dark.&rdquo; <Heartbeat />
        </p>
        <p className="text-sm">© {new Date().getFullYear()} Ronak Pradeep. Last updated {process.env.NEXT_PUBLIC_LAST_UPDATED}.</p>
      </footer>
    </div>
  )
}
