import { HeroInstrument } from "@/components/hero-instrument"
import { ListeningRoom } from "@/components/listening-room"
import { PublicationExplorer } from "@/components/publication-explorer"
import { SiteNav } from "@/components/site-nav"
import { mentees, playlists, publications, researchThreads, updates } from "@/lib/site-data"
import { ArrowDownRight, ArrowUpRight, Download, Mail } from "lucide-react"

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ronak Pradeep",
  url: "https://ronakice.github.io/",
  jobTitle: "Research Scientist",
  worksFor: { "@type": "Organization", name: "Databricks AI Research", url: "https://www.databricks.com/research" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Waterloo", url: "https://uwaterloo.ca/" },
  sameAs: [
    "https://scholar.google.com/citations?user=xH7uDXgAAAAJ&hl",
    "https://github.com/ronakice",
    "https://twitter.com/rpradeep42",
  ],
}

const preferredLinks = [
  ["Scholar", "https://scholar.google.com/citations?user=xH7uDXgAAAAJ&hl"],
  ["GitHub", "https://github.com/ronakice"],
  ["Twitter", "https://twitter.com/rpradeep42"],
] as const

export default function HomePage() {
  const recentUpdates = updates.slice(0, 3)
  const archivedUpdates = updates.slice(3)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteNav />

      <main id="main-content">
        <section id="home" className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span>Research scientist</span><span>Databricks AI Research</span></p>
            <h1 id="hero-title">I build and evaluate <em>information-seeking agents.</em></h1>
            <p className="hero-thesis">
              Combining retrieval, synthetic data, reinforcement learning, and rigorous RAG evaluation so agents can find and use changing information.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#work">Explore selected work <ArrowDownRight aria-hidden="true" /></a>
              <a className="text-action" href="mailto:rpradeep@uwaterloo.ca"><Mail aria-hidden="true" /> Email Ronak</a>
            </div>
            <div className="identity-line">
              <span>PhD, University of Waterloo</span>
              <span>Apple PhD Fellow</span>
            </div>
          </div>
          <HeroInstrument />
        </section>

        <section id="work" className="section work-section" aria-labelledby="work-title">
          <div className="section-intro">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">From ranking documents to training agents that seek evidence.</h2>
            <p>Three connected research threads chart the path from open rerankers to scalable evaluation and information-seeking agents.</p>
          </div>

          <div className="research-threads">
            {researchThreads.map((thread, index) => {
              const artifacts = thread.publicationIds
                .map((id) => publications.find((paper) => paper.id === id))
                .filter((paper): paper is NonNullable<typeof paper> => Boolean(paper))
              return (
                <article className="research-thread" key={thread.id}>
                  <div className="thread-stage"><span>{String(index + 1).padStart(2, "0")}</span>{thread.stage}</div>
                  <div className="thread-copy">
                    <p>{thread.question}</p>
                    <h3>{thread.title}</h3>
                    <p>{thread.description}</p>
                  </div>
                  <div className="thread-artifacts">
                    {artifacts.map((paper) => {
                      const link = paper.links[0]
                      return link ? (
                        <a key={paper.id} href={link.href} target="_blank" rel="noreferrer">
                          <span>{paper.title}</span><ArrowUpRight aria-hidden="true" />
                        </a>
                      ) : (
                        <span key={paper.id}><span>{paper.title}</span><small>Forthcoming</small></span>
                      )
                    })}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="leadership" className="section leadership-section" aria-labelledby="leadership-title">
          <div className="section-marker"><span>Evidence, not ornament</span></div>
          <div className="leadership-copy">
            <p className="eyebrow">Leadership & recognition</p>
            <h2 id="leadership-title">Building shared infrastructure for the research community.</h2>
          </div>
          <div className="evidence-grid">
            <article><strong>TREC RAG</strong><p>Lead organizer in 2024, co-organizer in 2025, and supervising student organizers in 2026.</p></article>
            <article><strong>Apple PhD Fellowship</strong><p>Recognition supporting doctoral research in modern information access.</p></article>
            <article><strong>Snowflake AI Research Grant</strong><p>Collaborative research support during the PhD.</p></article>
            <article><strong>Open evaluation</strong><p>Top submissions across TREC retrieval, health misinformation, and clinical-trial matching tasks.</p></article>
          </div>
        </section>

        <section id="publications" className="section publications-section" aria-labelledby="publications-title">
          <div className="section-intro compact-intro">
            <p className="eyebrow">Publications</p>
            <h2 id="publications-title">Selected signals, then the complete index.</h2>
            <p>Start with six representative artifacts, or search the full bibliography by title, author, venue, and year.</p>
          </div>
          <PublicationExplorer publications={publications} />
        </section>

        <section id="mentorship" className="section mentorship-section" aria-labelledby="mentorship-title">
          <div className="mentorship-intro">
            <p className="eyebrow">Mentorship</p>
            <h2 id="mentorship-title">Forty-plus students, one principle: build together.</h2>
            <p>I mentor through real research artifacts—papers, systems, benchmarks, and open-source tools—with increasing ownership from question to release.</p>
          </div>
          <div className="mentee-index" role="list" aria-label="Students mentored through doctoral and professional work">
            {mentees.map((mentee, index) => (
              <div key={mentee.name} role="listitem"><span>{String(index + 1).padStart(2, "0")}</span>{mentee.name}</div>
            ))}
          </div>
        </section>

        <section id="now" className="section now-section" aria-labelledby="now-title">
          <div>
            <p className="eyebrow">Now / then</p>
            <h2 id="now-title">A compact changelog.</h2>
          </div>
          <div className="updates-list">
            {recentUpdates.map((update) => (
              <article key={`${update.date}-${update.text}`}>
                <time>{update.date}</time>
                <p>{update.href ? <a href={update.href} target="_blank" rel="noreferrer">{update.text}</a> : update.text}</p>
              </article>
            ))}
            <details>
              <summary>Earlier updates <span>+</span></summary>
              {archivedUpdates.map((update) => (
                <article key={`${update.date}-${update.text}`}>
                  <time>{update.date}</time>
                  <p>{update.href ? <a href={update.href} target="_blank" rel="noreferrer">{update.text}</a> : update.text}</p>
                </article>
              ))}
            </details>
          </div>
        </section>

        <section id="listening-room" className="section listening-section" aria-labelledby="listening-title">
          <div className="section-intro compact-intro">
            <p className="eyebrow">Listening room</p>
            <h2 id="listening-title">The human side of the spectrum.</h2>
            <p>Three playlists, a sketchy companion, and the music that lives between experiments.</p>
          </div>
          <ListeningRoom playlists={playlists} />
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <p className="eyebrow">Start a conversation</p>
          <h2 id="contact-title">Research collaboration, talks, or a good retrieval question?</h2>
          <a className="contact-email" href="mailto:rpradeep@uwaterloo.ca">rpradeep@uwaterloo.ca <ArrowUpRight aria-hidden="true" /></a>
          <div className="contact-links">
            <a href="/data/RonakPradeep-CV.pdf"><Download aria-hidden="true" /> CV</a>
            {preferredLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Ronak Pradeep</span>
        <span>Search widely. Rank carefully. Verify everything.</span>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
    </div>
  )
}
