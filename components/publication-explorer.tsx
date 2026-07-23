"use client"

import type { Publication } from "@/lib/site-data"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"

const normalizeVenue = (venue: string) => venue.replace(/\s20\d{2}.*$/, "").replace("Under Review", "Preprint")

function Authors({ value }: { value: string }) {
  const parts = value.split("Ronak Pradeep")
  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {index > 0 && <strong>Ronak Pradeep</strong>}
          {part}
        </span>
      ))}
    </>
  )
}

function PublicationRow({ paper, rank }: { paper: Publication; rank?: number }) {
  return (
    <article className="publication-row">
      <div className="publication-index" aria-hidden="true">{rank ? String(rank).padStart(2, "0") : paper.venueYear}</div>
      <div>
        <div className="publication-meta">
          <span>{paper.venue}</span>
          {paper.status && <span>{paper.status}</span>}
        </div>
        <h3>{paper.title}</h3>
        <p><Authors value={paper.authors} /></p>
      </div>
      <div className="publication-links">
        {paper.links.length ? paper.links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>
        )) : <span>Forthcoming</span>}
      </div>
    </article>
  )
}

export function PublicationExplorer({ publications }: { publications: Publication[] }) {
  const [expanded, setExpanded] = useState(false)
  const [query, setQuery] = useState("")
  const [year, setYear] = useState<number | null>(null)
  const [venue, setVenue] = useState<string | null>(null)

  const featured = publications.filter((paper) => paper.featured)
  const years = [...new Set(publications.map((paper) => paper.venueYear))].sort((a, b) => b - a)
  const venues = [...new Set(publications.map((paper) => normalizeVenue(paper.venue)))].sort()

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return publications.filter((paper) => {
      const matchesQuery = !needle || `${paper.title} ${paper.authors} ${paper.venue}`.toLowerCase().includes(needle)
      const matchesYear = year === null || paper.venueYear === year
      const matchesVenue = venue === null || normalizeVenue(paper.venue) === venue
      return matchesQuery && matchesYear && matchesVenue
    })
  }, [publications, query, venue, year])

  const grouped = useMemo(() => {
    return filtered.reduce<Record<number, Publication[]>>((result, paper) => {
      result[paper.venueYear] ??= []
      result[paper.venueYear].push(paper)
      return result
    }, {})
  }, [filtered])

  return (
    <div>
      <div className="featured-publications">
        {featured.map((paper, index) => <PublicationRow key={paper.id} paper={paper} rank={index + 1} />)}
      </div>

      <button className="expand-publications" type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
        <span>{expanded ? "Close complete bibliography" : `Explore all ${publications.length} publications`}</span>
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>

      {expanded && (
        <div className="publication-browser">
          <div className="publication-controls">
            <label className="search-field">
              <span>Search the bibliography</span>
              <span className="search-input"><Search aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, author, or venue" /></span>
            </label>
            <fieldset>
              <legend>Venue year</legend>
              <div className="filter-row">
                <button type="button" aria-pressed={year === null} onClick={() => setYear(null)}>All</button>
                {years.map((value) => <button key={value} type="button" aria-pressed={year === value} onClick={() => setYear(value)}>{value}</button>)}
              </div>
            </fieldset>
            <fieldset>
              <legend>Venue</legend>
              <div className="filter-row venue-filters">
                <button type="button" aria-pressed={venue === null} onClick={() => setVenue(null)}>All</button>
                {venues.map((value) => <button key={value} type="button" aria-pressed={venue === value} onClick={() => setVenue(value)}>{value}</button>)}
              </div>
            </fieldset>
          </div>
          <p className="results-count" aria-live="polite">{filtered.length} publication{filtered.length === 1 ? "" : "s"}</p>
          {Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a)).map(([groupYear, papers]) => (
            <section className="publication-year" key={groupYear} aria-labelledby={`year-${groupYear}`}>
              <h3 id={`year-${groupYear}`}>{groupYear}</h3>
              <div>{papers.map((paper) => <PublicationRow key={paper.id} paper={paper} />)}</div>
            </section>
          ))}
          {!filtered.length && <p className="empty-results">No publications match those filters. Try a broader query.</p>}
        </div>
      )}
    </div>
  )
}
