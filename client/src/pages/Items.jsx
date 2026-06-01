import React, { useState } from "react";
import MatchCard from "../components/MatchCard";
import { useMatches } from "../hooks/useMatches";
import {Button, CircularProgress } from '@mui/material'

export default function Items() {

  const { matches, loading, error } = useMatches();

  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("date")
  const [limit, setLimit] = useState(10);

const filteredMatches = matches.filter((match) => {
  const text = search.toLowerCase();
  return (
    match.teams.home.name.toLowerCase().includes(search.toLowerCase()) ||
    match.teams.away.name.toLowerCase().includes(search.toLowerCase()) ||
    match.fixture.venue.name?.toLowerCase().includes(text) ||
    match.fixture.referee?.toLowerCase().includes(text)
  ) 
})

const sortedMatches = [...filteredMatches].sort((a,b) => {
  if(sort === 'date'){
    return new Date(b.fixture.date) - new Date(a.fixture.date)
  }
  if (sort === "home"){
    return a.teams.home.name.localeCompare(b.teams.home.name)
  }
  if (sort ==="away"){
    return a.teams.away.name.localeCompare(b.teams.away.name)
  }
  if(sort === "score") {
    return (b.goals.home + b.goals.away) - (a.goals.home + a.goals.away);
  }
  return 0;
})

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

    <div>
      <input 
        type="text"
        placeholder="buscar equipo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded bg-white/10"
        />
    </div>

    <div>
      <select 
        value={sort} 
        onChange={(e) => setSort(e.target.value)}
        className="p-2 rounded bg-white/10"
      >
        <option value="date" className='bg-slate-800 text-white'>Fecha</option>
        <option value="home"  className='bg-slate-800 text-white'>Equipo Local</option>
        <option value="away" className='bg-slate-800 text-white'>Equipo Visitante</option>
        <option value="score" className='bg-slate-800 text-white'>Goles totales</option>
      </select>
    </div>

    {sortedMatches.length === 0 && !loading && (
      <p className="text-gray-400 text-center">
        No se encontraron los partidos
      </p>
    )}

      {sortedMatches.slice(0, limit).map((match) =>(
        <MatchCard key={match.fixture.id} match={match}/>
      ))}

    <Button
        variant="contained"
        onClick={() => setLimit(prev => prev + 50)}
        sx={{
          backgroundColor: 'var(--color-primary)',
          '&:hover': { backgroundColor: '#4a6f4c' }
        }}
      >
        Ver más
    </Button>
    </div>
  )
}