import React, { useEffect, useRef, useState } from "react";
import MatchCard from "../components/MatchCard";
import { useMatches } from "../hooks/useMatches";
import { CircularProgress } from "@mui/material";

export default function Items() {
  const loaderRef = useRef(null)
  const availableSeasons = Array.from({ length: 7 }, (_, index) => 2020 + index)
  const [season, setSeason] = useState(2024)

  const { matches, loading, error } = useMatches(season)

  const [loadingMore, setLoadingMore] = useState(false)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("date")
  const [limit, setLimit] = useState(10)

  const filteredMatches = matches.filter((match) => {
    const text = search.toLowerCase()
    return (
      match.teams.home.name.toLowerCase().includes(search.toLowerCase()) ||
      match.teams.away.name.toLowerCase().includes(search.toLowerCase()) ||
      match.fixture.venue.name?.toLowerCase().includes(text) ||
      match.fixture.referee?.toLowerCase().includes(text)
    )
  })

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sort === "date") {
      return new Date(b.fixture.date) - new Date(a.fixture.date)
    }
    if (sort === "name") {
      return a.teams.home.name.localeCompare(b.teams.home.name)
    }
    if (sort === "score") {
      return (b.goals.home + b.goals.away) - (a.goals.home + a.goals.away)
    }
    return 0
  })

  useEffect(() => {
    setLimit(10)
    setLoadingMore(false)
  }, [season])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]

      if (target.isIntersecting && limit < sortedMatches.length) {
        setLoadingMore(true)

        setTimeout(() => {
          setLimit((prev) => prev + 10)
          setLoadingMore(false)
        }, 800)
      }
    })

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [limit, sortedMatches.length])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <CircularProgress size={40} sx={{ color: 'var(--color-primary)' }} />
      </div>
    )
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[var(--color-primary)]">
        <span>Partidos</span>
      </h2>

      <div className="flex items-center gap-4">
        <label htmlFor="seasonSelect" className="text-base text-gray-300">
          Año
        </label>
        <select
          id="seasonSelect"
          value={season}
          onChange={(e) => setSeason(Number(e.target.value))}
          className="h-[3rem] px-4 rounded bg-white/10 text-base min-w-[8rem]"
        >
          {availableSeasons.map((year) => (
            <option key={year} value={year} className="bg-slate-800 text-white">
              {year}
            </option>
          ))}
        </select>

        <label htmlFor="sortSelect" className="text-base text-gray-300">
          Sort by
        </label>
        <select
          id="sortSelect"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-[3rem] px-4 rounded bg-white/10 text-base min-w-[12rem]"
        >
          <option value="name" className="bg-slate-800 text-white">
            Nombre
          </option>

          <option value="date" className="bg-slate-800 text-white">
            Fecha
          </option>

          <option value="score" className="bg-slate-800 text-white">
            Goles totales
          </option>
        </select>

        <input
          type="text"
          placeholder="buscar equipo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 h-[3rem] px-4 rounded bg-white/10 text-base"
        />
      </div>

    {sortedMatches.length === 0 && !loading && (
      <p className="text-gray-400 text-center">
        No se encontraron los partidos
      </p>
    )}

      {sortedMatches.slice(0, limit).map((match) => (
        <MatchCard key={match.fixture.id} match={match} />
      ))}

      <div ref={loaderRef} className="flex justify-center py-6">
        {loadingMore && (
          <CircularProgress size={28} sx={{ color: "var(--color-primary)" }} />
        )}
      </div>
    </div>
  )
}