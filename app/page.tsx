"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, FileText, GraduationCap, Twitter, Github, Music, Calendar, ExternalLink, Search } from "lucide-react"
import { useState, useMemo, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function PapersSection() {
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set())
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set())
  const [selectedVenues, setSelectedVenues] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")

  const topics = ["Retrieval", "Reranking", "Retrieval-Augmented Generation", "Large Language Models", "Benchmarking", "Evaluation"]
  const years = ["2025", "2024", "2023", "2022", "2021", "2020"]
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
        title: "Support Evaluation for the TREC 2024 RAG Track: Comparing Human versus LLM Judges",
        authors: "Nandan Thakur, Ronak Pradeep, Shivani Upadhyay, Daniel Campos, Nick Craswell, Jimmy Lin",
        venue: "SIGIR 2025",
        link: "https://arxiv.org/abs/2504.15205",
        subtopics: ["Retrieval-Augmented Generation", "Evaluation", "Large Language Models"],
        year: 2025,
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
        title: "A Large-Scale Study of Relevance Assessments with Large Language Models: An Initial Look",
        authors: "Shivani Upadhyay, Ronak Pradeep, Nandan Thakur, Daniel Campos, Nick Craswell, Ian Soboroff, Hoa Trang Dang, Jimmy Lin",
        venue: "Under Review for a Suitable Conference",
        link: "https://arxiv.org/abs/2411.08275",
        subtopics: ["Retrieval", "Evaluation", "Large Language Models"],
        year: 2024,
      },
      {
        title: "A FIRST Reproduction and Improvements to Single-Token Decoding for Fast Listwise Reranking",
        authors: "Zijian Chen, Ronak Pradeep, Jimmy Lin",
        venue: "SIGIR 2025",
        link: "https://arxiv.org/abs/2411.05508",
        subtopics: ["Retrieval", "Reranking", "Large Language Models"],
        year: 2024,
      },
      {
        title: "Ragnarök: A Reusable RAG Framework and Baselines for TREC 2024 Retrieval-Augmented Generation Track",
        authors: "Ronak Pradeep, Nandan Thakur, Sahel Sharifymoghaddam, Eric Zhang, Ryan Nguyen, Daniel Campos, Nick Craswell, Jimmy Lin",
        venue: "Under Review for a Suitable Conference",
        link: "https://arxiv.org/abs/2406.16828",
        subtopics: ["Retrieval", "Reranking", "Retrieval-Augmented Generation", "Benchmarking", "Large Language Models"],
        year: 2024,
      },
      {
        title: "Prompts as Auto-Optimized Training Hyperparameters: Training Best-in-Class IR Models from Scratch with 10 Gold Labels",
        authors: "Jasper Xian, Saron Samuel, Faraz Khoubsirat, Ronak Pradeep, Md Arafat Sultan, Radu Florian, Salim Roukos, Avirup Sil, Christopher Potts, Omar Khattab",
        venue: "Under Review for a Suitable Conference",
        link: "https://arxiv.org/abs/2406.11706",
        subtopics: ["Retrieval", "Reranking", "Large Language Models"],
        year: 2024,
      },
      {
        title: "UMBRELA: UMbrela is the (Open-Source Reproduction of the) Bing RELevance Assessor",
        authors: "Shivani Upadhyay, Ronak Pradeep, Nandan Thakur, Nick Craswell, Jimmy Lin",
        venue: "Under Review for a Suitable Conference",
        link: "https://arxiv.org/abs/2406.06519",
        subtopics: ["Retrieval", "Evaluation", "Large Language Models"],
        year: 2024,
      },
      {
        title: "ConvKGYarn: Spinning Configurable and Scalable Conversational Knowledge Graph QA datasets with Large Language Models",
        authors: "Ronak Pradeep, Daniel Lee, Ali Mousavi, Jeffrey Pound, Yisi Sang, Jimmy Lin, Ihab Ilyas, Saloni Potdar, Mostafa Arefiyan, Yunyao Li",
        venue: "EMNLP 2024 Industry Track, EACL 2024 KaLLM + Knowledgeable Language Models Workshop",
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
        year: 2023,
      },
      {
        title: "Scaling Down, LiTting Up: Efficient Zero-Shot Listwise Reranking with Seq2seq Encoder-Decoder Models",
        authors: "Manveer Singh Tamber, Ronak Pradeep, Jimmy Lin",
        venue: "Under Review for a Suitable Conference",
        link: "https://arxiv.org/abs/2312.16098",
        subtopics: ["Retrieval", "Reranking", "Large Language Models"],
        year: 2023,
      },
      {
        title: "RankZephyr: Effective and Robust Zero-Shot Listwise Reranking is a Breeze!",
        authors: "Ronak Pradeep, Sahel Sharifymoghaddam, Jimmy Lin",
        venue: "Under Review for a Suitable Conference",
        link: "https://arxiv.org/abs/2312.02724",
        subtopics: ["Retrieval", "Reranking", "Large Language Models"],
        year: 2023,
      },
      {
        title: "RankVicuna: Zero-Shot Listwise Document Reranking with Open-Source Large Language Models",
        authors: "Ronak Pradeep, Sahel Sharifymoghaddam, Jimmy Lin",
        venue: "Under Review for a Suitable Conference",
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
        year: 2023,
      },
      {
        title: "End-to-End Health Misinformation-Free Search with a Large Language Model",
        authors: "Ronak Pradeep, Jimmy Lin",
        venue: "Under Review for a Suitable Conference",
        link: "https://link.springer.com/chapter/10.1007/978-3-031-56066-8_9",
        subtopics: ["Retrieval", "Large Language Models"],
        year: 2023,
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
        title: "Document Expansion Baselines and Learned Sparse Lexical Representations for MS MARCO v1 and v2",
        authors: "Xueguang Ma, Ronak Pradeep, Rodrigo Nogueira, Jimmy Lin",
        venue: "SIGIR 2022 Reproducibility",
        link: "https://dl.acm.org/doi/10.1145/3477495.3531749",
        subtopics: ["Retrieval"],
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
        title: "Vera: Prediction Techniques for Reducing Harmful Misinformation In Consumer Health Search",
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
        title: "Pyserini: An Easy-to-Use Python Toolkit to Support Replicable IR Research with Sparse and Dense Representations",
        authors: "Jimmy Lin, Xueguang Ma, Sheng-Chieh Lin, Jheng-Hong Yang, Ronak Pradeep, Rodrigo Nogueira",
        venue: "SIGIR 2021 Resource",
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
        venue: "Will be submitted to a suitable venue",
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
        venue: "Will be submitted to a suitable venue",
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
    ].map((paper, index) => ({
      ...paper,
      year: paper.year?.toString() ?? "",
      venueNormalized: normalizeVenue(paper.venue),
      topics: paper.subtopics,
      originalIndex: index,
    }))
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

  // Check for easter egg conditions
  const hasEasterEgg = filteredPapers.length === 0 && selectedYears.size > 0
  const selectedYearsArray = Array.from(selectedYears)
  const hasOldYear = selectedYearsArray.some((year) => parseInt(year) < 2024)

  return (
    <section id="papers" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/30 -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">Publications</h2>

          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search papers, authors, venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
          </div>
        </motion.div>

        {/* Filter Section */}
        <div className="mb-10 space-y-6">
          {/* Topics Filter */}
          <div>
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Topics</div>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => {
                const isSelected = selectedTopics.has(topic)
                return (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopics(toggleFilter(selectedTopics, topic))}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm transition-all border",
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
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
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Year</div>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => {
                  const isSelected = selectedYears.has(year)
                  return (
                    <button
                      key={year}
                      onClick={() => setSelectedYears(toggleFilter(selectedYears, year))}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-sm transition-all border",
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
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Venue</div>
              <div className="flex flex-wrap gap-2">
                {venues.map((venue) => {
                  const isSelected = selectedVenues.has(venue)
                  return (
                    <button
                      key={venue}
                      onClick={() => setSelectedVenues(toggleFilter(selectedVenues, venue))}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-sm transition-all border",
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

        {/* Papers List - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.length === 0 ? (
            <div className="text-center py-20 col-span-full">
              <p className="text-muted-foreground text-lg mb-2">No papers found matching your criteria.</p>
              {hasEasterEgg && hasOldYear && (
                <p className="text-muted-foreground italic mt-2">
                  <em>If only I had a tardis</em>
                </p>
              )}
              {hasEasterEgg && !hasOldYear && (
                <p className="text-muted-foreground italic mt-2">
                  <em>If only I was more productive</em>
                </p>
              )}
            </div>
          ) : (
            filteredPapers.map((paper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="h-full"
              >
                <Card className="glass-card hover:scale-[1.02] transition-all duration-300 border-border/50 group h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {paper.venue}
                      </Badge>
                      {paper.year && <span className="text-xs text-muted-foreground font-mono">{paper.year}</span>}
                    </div>

                    <h3 className="font-semibold text-lg text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                      {paper.link ? (
                        <Link href={paper.link} target="_blank">
                          {paper.title}
                        </Link>
                      ) : (
                        paper.title
                      )}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                      {paper.authors}
                    </p>

                    {paper.link && (
                      <div className="mt-auto pt-4 border-t border-border/50">
                        <Button variant="ghost" size="sm" className="w-full justify-between hover:bg-primary/10 hover:text-primary" asChild>
                          <Link href={paper.link} target="_blank">
                            <span>View Paper</span>
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

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

export default function HomePage() {
  const [profileImage, setProfileImage] = useState("/images/RonakPradeep_circle.png")
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const y = useTransform(scrollY, [0, 300], [0, 100])
  const voxelOpacity = useTransform(scrollY, [0, 600], [1, 0.02])

  const toggleImage = () => {
    setProfileImage((prev) =>
      prev === "/images/RonakPradeep_circle.png"
        ? "/images/MrPenguin_circle.png"
        : "/images/RonakPradeep_circle.png"
    )
  }

  const updates = [
    { date: "Aug 2025", text: "Apparently I'm a PhD Candidate now...", icon: GraduationCap },
    { date: "Apr 2025", text: "We have five papers accepted at SIGIR 2025! See you all in Padova!", icon: FileText },
    {
      date: "Nov 2024",
      text: "We had a successful first year of the TREC RAG 2024 Track with many submissions! Looking forward to Y2.",
      link: "https://trec-rag.github.io/",
      icon: Calendar
    },
    {
      date: "Feb 2024",
      text: "Organizing the TREC RAG 2024 Track! Do submit your systems :))",
      link: "https://trec-rag.github.io/",
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
      {/* Voxel Background Layer */}
      <motion.div style={{ opacity: voxelOpacity }} className="fixed top-0 left-0 right-0 h-[85vh] z-0 pointer-events-none">
        <DarkSideVoxel onPrismClick={toggleImage} />
        {/* Gradient Mask to blend into content */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/70 backdrop-blur-md border-b border-white/10 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="#home" className="text-xl font-heading font-bold text-foreground tracking-tight">
              Ronak Pradeep
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "Research", "Updates", "Papers", "Mentorship", "Playlists"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-[60vh] pb-20 relative z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 pointer-events-auto">
          <motion.div
            style={{ opacity, y }}
            className="grid md:grid-cols-3 gap-16 items-center"
          >
            <div className="md:col-span-2 space-y-8">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl md:text-7xl font-heading font-bold text-foreground mb-6 leading-tight tracking-tight"
                >
                  <span className="text-gradient">Ronak Pradeep</span>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 px-3 py-1 text-sm">
                    PhD Student
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 px-3 py-1 text-sm">
                    Apple PhD Fellow
                  </Badge>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="prose prose-lg text-muted-foreground space-y-5 leading-relaxed max-w-2xl"
              >
                <p>
                  Hi! I am a PhD student in the{" "}
                  <Link href="https://cs.uwaterloo.ca/" className="text-primary hover:text-primary/80">
                    David R. Cheriton School of Computer Science
                  </Link>{" "}
                  at the{" "}
                  <Link href="https://uwaterloo.ca/" className="text-primary hover:text-primary/80">
                    University of Waterloo
                  </Link>
                  , advised by{" "}
                  <Link
                    href="https://cs.uwaterloo.ca/~jimmylin/index.html"
                    className="text-primary hover:text-primary/80"
                  >
                    Jimmy Lin
                  </Link>
                  . The past few months, I've been working on LLMs (and that sort of things) at{" "}
                  <Link href="https://yupp.ai/" className="text-primary hover:text-primary/80">
                    Yupp AI
                  </Link>
                  . During my PhD, I've also had the chance to work at{" "}
                  <Link href="https://research.google/" className="text-primary hover:text-primary/80">
                    Google
                  </Link>{" "}
                  and{" "}
                  <Link href="https://machinelearning.apple.com/" className="text-primary hover:text-primary/80">
                    Apple
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

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="flex justify-center"
            >
              <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl ring-4 ring-background/50 backdrop-blur-sm">
                <Image
                  src={profileImage}
                  alt="Ronak Pradeep"
                  width={256}
                  height={256}
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-24 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12"
          >
            <div className="md:col-span-1">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6 sticky top-24">Research Interests</h2>
            </div>
            <div className="md:col-span-2 prose prose-lg text-muted-foreground max-w-none leading-relaxed">
              <p>
                My research interests lie at the intersection of <span className="text-foreground font-medium">Information Retrieval</span> and <span className="text-foreground font-medium">Natural Language Processing</span>.
                More specifically, I'm interested in tasks such as Retrieval-Augmented Generation, Fact Verification, and
                Document Ranking
                I have also been investigating the <span className="text-foreground font-medium">memory component of Large Language Models</span> and the interplay between the inherent reasoning and memory modules, entangled in a single LLM or
                otherwise. I look forward to contributing to the next generation of reasoners capable of working with a
                constantly evolving ocean of both structured and unstructured data
                Some of my earlier work explores how to build neural search systems that promote correct and reliable information and work well in low-resource
                domains such as biomedical texts.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Updates Section - Timeline */}
      <section id="updates" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-heading font-bold text-foreground mb-16 text-center"
          >
            Latest Updates
          </motion.h2>

          <div className="relative border-l-2 border-border/50 ml-4 md:ml-0 space-y-12">
            {updates.map((update, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12 md:pl-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] z-10" />

                <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
                  <div className="md:col-span-1 md:text-right mb-2 md:mb-0">
                    <span className="text-sm font-bold text-primary tracking-wider uppercase">{update.date}</span>
                  </div>
                  <div className="md:col-span-4">
                    <div className="glass-card p-6 rounded-xl relative group hover:-translate-y-1 transition-transform duration-300">
                      <div className="absolute top-6 right-6 text-muted-foreground/20 group-hover:text-primary/20 transition-colors">
                        <update.icon className="w-8 h-8" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed pr-8">
                        {update.link ? (
                          <span>
                            {update.text.split("TREC RAG 2024 Track")[0]}
                            <Link href={update.link} className="text-primary hover:underline">
                              TREC RAG 2024 Track
                            </Link>
                            {update.text.split("TREC RAG 2024 Track")[1]}
                          </span>
                        ) : (
                          update.text
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PapersSection />

      {/* Mentorship Section */}
      {/* Mentorship Section */}
      {/* Mentorship Section */}
      <section id="mentorship" className="py-24 bg-muted/30 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-10">Mentorship</h2>
          <div className="prose prose-lg text-muted-foreground max-w-none mb-10 leading-relaxed">
            <p>
              During my PhD journey, I've had the privilege of mentoring over 40 undergraduate students!
              Below are some of the amazing students I've had the honor to work with (ordered lexicographically by last name):
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
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
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  show: { opacity: 1, scale: 1 }
                }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 border-border/50 h-full">
                  <CardContent className="p-5 text-center flex items-center justify-center h-full">
                    <p className="text-foreground font-medium">{name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Playlists Section */}
      <section id="playlists" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-6">Playlists</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Thanks for making it to here :-) As a token of gratitude and since you asked nicely for it, I shall also
            introduce you to a few of my Spotify playlists.
          </p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="space-y-12"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
              <h3 className="text-3xl font-heading font-semibold text-foreground mb-3">ॐ</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                And everything under the sun is in tune. A music dump of sorts. Updated regularly.
              </p>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/playlist/1iM4pb2UpkQt07zsXLkDj7?utm_source=generator"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
              <h3 className="text-3xl font-heading font-semibold text-foreground mb-3">A Day In The Life</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                An allusion to{" "}
                <Link
                  href="https://open.spotify.com/track/0hKRSZhUGEhKU6aNSPBACZ?si=e1ab0c90f70042ac"
                  className="text-primary hover:text-primary/80"
                >
                  the Beatles song
                </Link>
                . Curated by a younger me for a{" "}
                <Link href="https://en.wikipedia.org/wiki/Antheia" className="text-primary hover:text-primary/80">
                  <em>someone who stole my heart</em>
                </Link>
                . Not updated anymore.
              </p>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/playlist/1VlYsIRVFv1ze8QDshghDe?utm_source=generator"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
              <h3 className="text-3xl font-heading font-semibold text-foreground mb-3">Liebesträume</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                And what exactly is a <em>dream of love</em>? Here I take on Liszt and attempt to provide a longer
                answer to aid with my sleep. Updated semi-regularly.
              </p>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/playlist/7uZRM2KlIGYhJzdv8dPTJ1?utm_source=generator"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/50 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Ronak Pradeep. Built with Next.js & Tailwind.</p>
      </footer>
    </div>
  )
}
