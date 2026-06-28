import React, { useEffect, useRef, useState } from 'react';
import MatchCard from '../components/MatchCard';
import { useMatchesStore } from '../services/store/useMatchesStore';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Items() {
  const loaderRef = useRef(null);
  const { t } = useTranslation();

  const { matches, loading, error, loadMatches } = useMatchesStore();

  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');
  const [limit, setLimit] = useState(10);
  const [season, setSeason] = useState(2024);
  const availableSeasons = Array.from({ length: 7 }, (_, index) => 2020 + index);

  const filteredMatches = matches.filter((match) => {
    const text = search.toLowerCase();
    return (
      match.teams.home.name.toLowerCase().includes(search.toLowerCase()) ||
      match.teams.away.name.toLowerCase().includes(search.toLowerCase()) ||
      match.fixture.venue.name?.toLowerCase().includes(text) ||
      match.fixture.referee?.toLowerCase().includes(text)
    );
  });

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sort === 'date') {
      return new Date(b.fixture.date) - new Date(a.fixture.date);
    }
    if (sort === 'name') {
      const homeCompare = a.teams.home.name.localeCompare(b.teams.home.name);
      if (homeCompare !== 0) return homeCompare;
      return a.teams.away.name.localeCompare(b.teams.away.name);
    }
    if (sort === 'score') {
      return b.goals.home + b.goals.away - (a.goals.home + a.goals.away);
    }
    return 0;
  });

  useEffect(() => {
    loadMatches(season);
  }, [loadMatches, season]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];

      if (target.isIntersecting && limit < sortedMatches.length) {
        setLoadingMore(true);

        setTimeout(() => {
          setLimit((prev) => prev + 10);
          setLoadingMore(false);
        }, 800);
      }
    });

    const current = loaderRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [limit, sortedMatches.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <CircularProgress size={40} sx={{ color: 'var(--color-primary)' }} />
      </div>
    );
  }

  if (error) return <p className="text-red-500">{t(error)}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[var(--color-primary)]">
        <span>{t('items.title')}</span>
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Año</span>
        <select
          value={season}
          onChange={(e) => {
            setSeason(Number(e.target.value));
            setLimit(10);
            setLoadingMore(false);
          }}
          className="h-[3rem] px-4 rounded bg-white/10 text-base min-w-[8rem]"
        >
          {availableSeasons.map((year) => (
            <option key={year} value={year} className="bg-slate-800 text-white">
              {year}
            </option>
          ))}
        </select>

        <span className="text-sm text-gray-400">{t('items.sortBy')}</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-[3rem] px-4 rounded bg-white/10 text-base min-w-[12rem]"
        >
          <option value="name" className="bg-slate-800 text-white">
            {t('items.filter.name')}
          </option>
          <option value="date" className="bg-slate-800 text-white">
            {t('items.filter.date')}
          </option>
          <option value="score" className="bg-slate-800 text-white">
            {t('items.filter.score')}
          </option>
        </select>

        <input
          type="text"
          placeholder={t('items.searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 h-[3rem] px-4 rounded bg-white/10 text-base"
        />
      </div>

      {sortedMatches.length === 0 && !loading && (
        <p className="text-gray-400 text-center">{t('items.noMatches')}</p>
      )}

      {sortedMatches.slice(0, limit).map((match) => (
        <MatchCard key={match.fixture.id} match={match} />
      ))}

      <div ref={loaderRef} className="flex justify-center py-6">
        {loadingMore && <CircularProgress size={28} sx={{ color: 'var(--color-primary)' }} />}
      </div>
    </div>
  );
}
