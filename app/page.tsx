import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, FileText, GraduationCap, Twitter, Github, Music } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="#home" className="text-xl font-semibold text-foreground">
              Ronak Pradeep
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#home" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="#research" className="text-muted-foreground hover:text-foreground transition-colors">
                Research
              </Link>
              <Link href="#updates" className="text-muted-foreground hover:text-foreground transition-colors">
                Updates
              </Link>
              <Link href="#papers" className="text-muted-foreground hover:text-foreground transition-colors">
                Papers
              </Link>
              <Link href="#playlists" className="text-muted-foreground hover:text-foreground transition-colors">
                Playlists
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Ronak Pradeep</h1>
                <div className="flex items-center gap-2 mb-6">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    PhD Student
                  </Badge>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                    Apple PhD Fellow
                  </Badge>
                </div>
              </div>

              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Hi! I am a PhD student in the{" "}
                  <Link href="https://cs.uwaterloo.ca/" className="text-blue-600 hover:text-blue-800">
                    David R. Cheriton School of Computer Science
                  </Link>{" "}
                  at the{" "}
                  <Link href="https://uwaterloo.ca/" className="text-blue-600 hover:text-blue-800">
                    University of Waterloo
                  </Link>
                  , advised by{" "}
                  <Link
                    href="https://cs.uwaterloo.ca/~jimmylin/index.html"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Jimmy Lin
                  </Link>
                  . The past few months, I've been working on LLMs (and that sort of things) at{" "}
                  <Link href="https://yupp.ai/" className="text-blue-600 hover:text-blue-800">
                    Yupp AI
                  </Link>
                  . During my PhD, I've also had the chance to work at{" "}
                  <Link href="https://research.google/" className="text-blue-600 hover:text-blue-800">
                    Google
                  </Link>{" "}
                  and{" "}
                  <Link href="https://machinelearning.apple.com/" className="text-blue-600 hover:text-blue-800">
                    Apple
                  </Link>
                  .
                </p>
                <p>
                  Previously, I completed my undergraduate studies at the University of Waterloo, where I majored in
                  Computer Science and{" "}
                  <Link
                    href="https://uwaterloo.ca/combinatorics-and-optimization/"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Combinatorics and Optimization
                  </Link>
                  . During my undergrad, I've had the chance to intern at{" "}
                  <Link href="https://mila.quebec/en/" className="text-blue-600 hover:text-blue-800">
                    Quebec Artificial Intelligence Institute (Mila)
                  </Link>
                  , ContextLogic, and RBC Research.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="mailto:rpradeep@uwaterloo.ca">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/data/RonakPradeep-CV.pdf">
                    <FileText className="w-4 h-4 mr-2" />
                    CV
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://scholar.google.com/citations?user=xH7uDXgAAAAJ&hl">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Google Scholar
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://twitter.com/rpradeep42">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com/ronakice">
                    <Github className="w-4 h-4 mr-2" />
                    Github
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://open.spotify.com/user/qsjnogh907vnv3c6js7vcjccs?si=4139788b14f54573">
                    <Music className="w-4 h-4 mr-2" />
                    Spotify
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/images/RonakPradeep_circle.png"
                  alt="Ronak Pradeep"
                  width={256}
                  height={256}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">Research</h2>
          <div className="prose prose-lg text-muted-foreground max-w-none">
            <p>
              My research interests lie at the intersection of Information Retrieval and Natural Language Processing.
              More specifically, I'm interested in tasks such as Open Domain Question Answering, Fact Verification, and
              Document Ranking. In recent months, I have also been investigating the memory component of Large Language
              Models and the interplay between the inherent reasoning and memory modules, entangled in a single LLM or
              otherwise. I look forward to contributing to the next generation of reasoners capable of working with a
              constantly evolving ocean of both structured and unstructured data. Some of my earlier work explores how
              to build neural search systems that promote correct and reliable information and work well in low-resource
              domains such as biomedical texts.
            </p>
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section id="updates" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">Updates</h2>
          <div className="space-y-4">
            {[
              { date: "Apr 2025", text: "We have fives papers accepted at SIGIR 2025! See you all in Padova!" },
              {
                date: "Nov 2024",
                text: "We had a successful first year of the TREC RAG 2024 Track with many submissions! Looking forward to Y2.",
                link: "https://trec-rag.github.io/",
              },
              {
                date: "Feb 2024",
                text: "Organizing the TREC RAG 2024 Track! Do submit your systems :))",
                link: "https://trec-rag.github.io/",
              },
              { date: "Dec 2023", text: "We introduced RankZephyr which garnered great community engagement!" },
              {
                date: "Dec 2023",
                text: 'I\'m excited to visit Singapore for EMNLP 2023 to present our work "How Does Generative Retrieval Scale to Millions of Passages?"',
              },
              {
                date: "Nov 2023",
                text: "I will be leading the TREC 2024 Retrieval-Augmented Generation Track! More information coming soon!",
              },
              {
                date: "Sep 2023",
                text: "We introduced RankVicuna, the first zero-shot listwise reranker that leverages open-source LLMs!",
              },
            ].map((update, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <Badge variant="outline" className="w-fit">
                      {update.date}
                    </Badge>
                    <p className="text-muted-foreground">
                      {update.link ? (
                        <span>
                          {update.text.split("TREC RAG 2024 Track")[0]}
                          <Link href={update.link} className="text-blue-600 hover:text-blue-800">
                            TREC RAG 2024 Track
                          </Link>
                          {update.text.split("TREC RAG 2024 Track")[1]}
                        </span>
                      ) : (
                        update.text
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Papers Section */}
      <section id="papers" className="py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">Papers</h2>
          <div className="space-y-6">
            {[
              {
                title: "[39] RankLLM: A Python Package for Reranking with LLMs",
                authors:
                  "Sahel Sharifymoghaddam, Ronak Pradeep, Andre Slavescu, Ryan Nguyen, Andrew Xu, Zijian Chen, Yilin Zhang, Yidi Chen, Jasper Xian, Jimmy Lin",
                venue: "SIGIR 2025",
              },
              {
                title: "[38] Gosling Grows Up: Retrieval with Learned Dense and Sparse Representations Using Anserini",
                authors:
                  "Jimmy Lin, Arthur Haonan Chen, Carlos Lassance, Xueguang Ma, Ronak Pradeep, Tommaso Teofili, Jasper Xian, Jheng-Hong Yang, Brayden Zhong, Vincent Zhong",
                venue: "SIGIR 2025",
              },
              {
                title: "[37] Support Evaluation for the TREC 2024 RAG Track: Comparing Human versus LLM Judges",
                authors: "Nandan Thakur, Ronak Pradeep, Shivani Upadhyay, Daniel Campos, Nick Craswell, Jimmy Lin",
                venue: "SIGIR 2025",
                link: "https://arxiv.org/abs/2504.15205",
              },
              {
                title:
                  "[36] The Great Nugget Recall: Automating Fact Extraction and RAG Evaluation with Large Language Models",
                authors: "Ronak Pradeep, Nandan Thakur, Shivani Upadhyay, Daniel Campos, Nick Craswell, Jimmy Lin",
                venue: "SIGIR 2025",
                link: "https://arxiv.org/abs/2504.15068",
              },
              {
                title:
                  "[35] Initial Nugget Evaluation Results for the TREC 2024 RAG Track with the AutoNuggetizer Framework",
                authors: "Ronak Pradeep, Nandan Thakur, Shivani Upadhyay, Daniel Campos, Nick Craswell, Jimmy Lin",
                venue: "arXiv",
                link: "https://arxiv.org/abs/2411.09607",
              },
              {
                title: "[34] A Large-Scale Study of Relevance Assessments with Large Language Models: An Initial Look",
                authors: "Shivani Upadhyay, Ronak Pradeep, Nandan Thakur, Daniel Campos, Nick Craswell, Ian Soboroff, Hoa Trang Dang, Jimmy Lin",
                venue: "Under Review for a Suitable Conference",
                link: "https://arxiv.org/abs/2411.08275",
              },
              {
                title: "[33] A FIRST Reproduction and Improvements to Single-Token Decoding for Fast Listwise Reranking",
                authors: "Zijian Chen, Ronak Pradeep, Jimmy Lin",
                venue: "SIGIR 2025",
                link: "https://arxiv.org/abs/2411.05508",
              },
              {
                title: "[32] Ragnarök: A Reusable RAG Framework and Baselines for TREC 2024 Retrieval-Augmented Generation Track",
                authors: "Ronak Pradeep, Nandan Thakur, Sahel Sharifymoghaddam, Eric Zhang, Ryan Nguyen, Daniel Campos, Nick Craswell, Jimmy Lin",
                venue: "Under Review for a Suitable Conference",
                link: "https://arxiv.org/abs/2406.16828",
              },
              {
                title: "[31] Prompts as Auto-Optimized Training Hyperparameters: Training Best-in-Class IR Models from Scratch with 10 Gold Labels",
                authors: "Jasper Xian, Saron Samuel, Faraz Khoubsirat, Ronak Pradeep, Md Arafat Sultan, Radu Florian, Salim Roukos, Avirup Sil, Christopher Potts, Omar Khattab",
                venue: "Under Review for a Suitable Conference",
                link: "https://arxiv.org/abs/2406.11706",
              },
              {
                title: "[30] UMBRELA: UMbrela is the (Open-Source Reproduction of the) Bing RELevance Assessor",
                authors: "Shivani Upadhyay, Ronak Pradeep, Nandan Thakur, Nick Craswell, Jimmy Lin",
                venue: "Under Review for a Suitable Conference",
                link: "https://arxiv.org/abs/2406.06519",
              },
              {
                title: "[29] ConvKGYarn: Spinning Configurable and Scalable Conversational Knowledge Graph QA datasets with Large Language Models",
                authors: "Ronak Pradeep, Daniel Lee, Ali Mousavi, Jeffrey Pound, Yisi Sang, Jimmy Lin, Ihab Ilyas, Saloni Potdar, Mostafa Arefiyan, Yunyao Li",
                venue: "EMNLP 2024 Industry Track, EACL 2024 KaLLM + Knowledgeable Language Models Workshop",
                link: "papers/convgen.pdf",
              },
              {
                title: "[28] Entity Disambiguation via Fusion Entity Decoding",
                authors: "Junxiong Wang, Ali Mousavi, Omar Attia, Ronak Pradeep, Saloni Potdar, Alexander Rush, Umar Farooq Minhas, Yunyao Li",
                venue: "NAACL 2024",
                link: "https://aclanthology.org/2024.naacl-long.363",
              },
              {
                title: "[27] Zero-Shot Cross-Lingual Reranking with Large Language Models for Low-Resource Languages",
                authors: "Mofetoluwa Adeyemi, Akintunde Oladipo, Ronak Pradeep, Jimmy Lin",
                venue: "ACL 2024",
                link: "https://arxiv.org/abs/2312.16159",
              },
              {
                title: "[26] Scaling Down, LiTting Up: Efficient Zero-Shot Listwise Reranking with Seq2seq Encoder-Decoder Models",
                authors: "Manveer Singh Tamber, Ronak Pradeep, Jimmy Lin",
                venue: "Under Review for a Suitable Conference",
                link: "https://arxiv.org/abs/2312.16098",
              },
              {
                title: "[25] RankZephyr: Effective and Robust Zero-Shot Listwise Reranking is a Breeze!",
                authors: "Ronak Pradeep, Sahel Sharifymoghaddam, Jimmy Lin",
                venue: "Under Review for a Suitable Conference",
                link: "https://arxiv.org/abs/2312.02724",
              },
              {
                title: "[24] RankVicuna: Zero-Shot Listwise Document Reranking with Open-Source Large Language Models",
                authors: "Ronak Pradeep, Sahel Sharifymoghaddam, Jimmy Lin",
                venue: "Under Review for a Suitable Conference",
                link: "https://arxiv.org/abs/2309.15088",
              },
              {
                title: "[23] Vector Search with OpenAI Embeddings: Lucene Is All You Need",
                authors: "Jimmy Lin, Ronak Pradeep, Tommaso Teofili, Jasper Xian",
                venue: "WSDM 2024 Demo",
              },
              {
                title: "[22] End-to-End Health Misinformation-Free Search with a Large Language Model",
                authors: "Ronak Pradeep, Jimmy Lin",
                venue: "Under Review for a Suitable Conference",
              },
              {
                title: "[21] How Does Generative Retrieval Scale to Millions of Passages?",
                authors: "Ronak Pradeep, Kai Hui, Jai Gupta, Adam D Lelkes, Honglei Zhuang, Jimmy Lin, Donald Metzler, Vinh Q Tran",
                venue: "EMNLP 2023, SIGIR 2023 GenIR Workshop",
                link: "https://openreview.net/pdf?id=u9gI4JlOSj",
              },
              {
                title: "[20] ReadProbe: A Demo of Retrieval-Enhanced Large Language Models to Support Lateral Reading",
                authors: "Dake Zhang, Ronak Pradeep",
                venue: "arXiv",
                link: "https://github.com/DakeZhang1998/ReadProbe",
              },
              {
                title: "[19] Zero-Shot Listwise Document Reranking with a Large Language Model",
                authors: "Xueguang Ma, Xinyu Zhang, Ronak Pradeep, Jimmy Lin",
                venue: "arXiv",
                link: "https://arxiv.org/abs/2305.02156",
              },
              {
                title: "[18] Pre-processing Matters! Improved Wikipedia Corpora for Open-Domain Question Answering",
                authors: "Manveer Singh Tamber, Ronak Pradeep, Jimmy Lin",
                venue: "ECIR 2023 Reproducibility",
                link: "https://github.com/castorini/pyserini",
              },
              {
                title: "[17] PyGaggle: A Gaggle of Resources for Open-Domain Question Answering",
                authors: "Ronak Pradeep, Haonan Chen, Lingwei Gu, Manveer Singh Tamber, Jimmy Lin",
                venue: "ECIR 2023 Reproducibility",
                link: "https://github.com/castorini/pygaggle",
              },
              {
                title: "[16] Neural Query Synthesis and Domain-Specific Ranking Templates for Multi-Stage Clinical Trial Matching",
                authors: "Ronak Pradeep, Yilin Li, Yuetong Wang, Jimmy Lin",
                venue: "SIGIR 2022",
                link: "https://github.com/castorini/pyserini",
              },
              {
                title: "[15] Document Expansion Baselines and Learned Sparse Lexical Representations for MS MARCO v1 and v2",
                authors: "Xueguang Ma, Ronak Pradeep, Rodrigo Nogueira, Jimmy Lin",
                venue: "SIGIR 2022 Reproducibility",
              },
              {
                title: "[14] Another Look at DPR: Reproduction of Training and Replication of Retrieval",
                authors: "Xueguang Ma, Kai Sun, Ronak Pradeep, Minghan Li, Jimmy Lin",
                venue: "ECIR 2022 Reproducibility",
                link: "https://github.com/castorini/pygaggle",
              },
              {
                title: "[13] New Nails for Old Hammers: Anserini and Pyserini at TREC 2021",
                authors: "Jimmy Lin, Haonen Chen, Chengcheng Hu, Sheng-Chieh Lin, Yilin Li, Xueguang Ma, Ronak Pradeep, Jheng-Hong Yang, Chuan-Ju Wang, Andrew Yates, Xinyu Zhang",
                venue: "TREC 2021 Proceedings",
                link: "https://github.com/castorini/pygaggle",
              },
              {
                title: "[12] Vera: Prediction Techniques for Reducing Harmful Misinformation In Consumer Health Search",
                authors: "Ronak Pradeep, Xueguang Ma, Rodrigo Nogueira, Jimmy Lin",
                venue: "SIGIR 2021",
                link: "https://dl.acm.org/doi/10.1145/3404835.3463120",
              },
              {
                title: "[11] Chatty Goose: A Python Framework for Conversational Search",
                authors: "Edwin Zhang, Sheng-Chieh Lin, Jheng-Hong Yang, Ronak Pradeep, Rodrigo Nogueira, Jimmy Lin",
                venue: "SIGIR 2021 Demo",
                link: "https://cs.uwaterloo.ca/~jimmylin/publications/Zhang_etal_SIGIR2021_chatty-goose.pdf",
              },
              {
                title: "[10] Pyserini: An Easy-to-Use Python Toolkit to Support Replicable IR Research with Sparse and Dense Representations",
                authors: "Jimmy Lin, Xueguang Ma, Sheng-Chieh Lin, Jheng-Hong Yang, Ronak Pradeep, Rodrigo Nogueira",
                venue: "SIGIR 2021 Resource",
                link: "https://dl.acm.org/doi/10.1145/3404835.3463238",
              },
              {
                title: "[9] H₂oloo at TAC 2020: Epidemic Question Answering",
                authors: "Justin Borromeo, Ronak Pradeep, Jimmy Lin",
                venue: "TAC 2020 Proceedings",
              },
              {
                title: "[8] Exploring Listwise Evidence Reasoning with T5 for Fact Verification",
                authors: "Kelvin Jiang, Ronak Pradeep, Jimmy Lin",
                venue: "ACL 2021",
                link: "https://aclanthology.org/2021.acl-short.51",
              },
              {
                title: "[7] H₂oloo at TREC 2020: When all you got is a Hammer... Deep Learning, Health Misinformation, and Precision Medicine",
                authors: "Ronak Pradeep, Xueguang Ma, Xinyu Zhang, Hang Cui, Ruizhou Xu, Rodrigo Nogueira, Jimmy Lin",
                venue: "TREC 2020 Proceedings",
                link: "https://trec.nist.gov/pubs/trec29/papers/h2oloo.DL.HM.PM.pdf",
              },
              {
                title: "[6] Scientific Claim Verification with VerT5erini",
                authors: "Ronak Pradeep, Xueguang Ma, Rodrigo Nogueira, Jimmy Lin",
                venue: "LOUHI: EACL 2021 Workshop",
                link: "https://aclanthology.org/2021.louhi-1.11",
              },
              {
                title: "[5] A Replication Study of Dense Passage Retriever",
                authors: "Xueguang Ma, Kai Sun, Ronak Pradeep, Jimmy Lin",
                venue: "Will be submitted to a suitable venue",
                link: "https://arxiv.org/abs/2104.05740",
              },
              {
                title: "[4] Covidex: Neural Ranking Models and Keyword Search Infrastructure for the COVID-19 Open Research Dataset",
                authors: "Edwin Zhang, Nikhil Gupta, Raphael Tang, Xiao Han, Ronak Pradeep, Kuang Lu, Yue Zhang, Rodrigo Nogueira, Kyunghyun Cho, Hui Fang, Jimmy Lin",
                venue: "Scholarly Document Processing: EMNLP 2020 Workshop",
                link: "https://aclanthology.org/2020.sdp-1.5",
              },
              {
                title: "[3] The Expando-Mono-Duo Design Pattern for Text Ranking with Pretrained Sequence-to-Sequence Models",
                authors: "Ronak Pradeep, Rodrigo Nogueira, Jimmy Lin",
                venue: "Will be submitted to a suitable venue",
                link: "https://arxiv.org/abs/2101.05667",
              },
              {
                title: "[2] Document Ranking with a Pretrained Sequence-to-Sequence Model",
                authors: "Rodrigo Nogueira, Zhiying Jiang, Ronak Pradeep, Jimmy Lin",
                venue: "EMNLP 2020 Findings",
                link: "https://aclanthology.org/2020.findings-emnlp.63",
              },
              {
                title: "[1] Foveated Down-Sampling Techniques",
                authors: "Parsa Torabian, Ronak Pradeep, Jeff Orchard, Bryan Tripp",
                venue: "CVIS 2020",
                link: "https://openjournals.uwaterloo.ca/index.php/vsl/article/view/3540",
              },
            ].map((paper, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {paper.link ? (
                      <Link href={paper.link} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        {paper.title}
                      </Link>
                    ) : (
                      paper.title
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-2">{paper.authors}</p>
                  <Badge variant="secondary">{paper.venue}</Badge>
                  {paper.link && (
                    <div className="mt-3">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={paper.link}>
                          <FileText className="w-4 h-4 mr-2" />
                          Paper
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            <div className="text-center pt-6">
              <p className="text-muted-foreground">
                ... and a few more papers I might have potentially missed! See my{" "}
                <Link
                  href="https://scholar.google.com/citations?user=xH7uDXgAAAAJ&hl"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Google Scholar
                </Link>{" "}
                for the complete list.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Playlists Section */}
      <section id="playlists" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-4">Playlists</h2>
          <p className="text-muted-foreground mb-8">
            Thanks for making it to here :-) As a token of gratitude and since you asked nicely for it, I shall also
            introduce you to a few of my Spotify playlists.
          </p>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">ॐ</h3>
              <p className="text-muted-foreground mb-4">
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
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">A Day In The Life</h3>
              <p className="text-muted-foreground mb-4">
                An allusion to{" "}
                                  <Link
                    href="https://open.spotify.com/track/0hKRSZhUGEhKU6aNSPBACZ?si=e1ab0c90f70042ac"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    the Beatles song
                  </Link>
                  . Curated by a younger me for a{" "}
                  <Link href="https://en.wikipedia.org/wiki/Antheia" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
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
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">Liebesträume</h3>
              <p className="text-muted-foreground mb-4">
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
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
