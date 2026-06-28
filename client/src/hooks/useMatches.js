import { useEffect, useState } from "react";

export function useMatches(season) {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const cacheKey = `matches-${season}`;
    const cached = JSON.parse(localStorage.getItem(cacheKey));

    if (cached) {
      const isExpired = Date.now() - cached.timestamp > 5 * 60 * 1000;

      if (!isExpired) {
        setMatches(cached.data);
        setLoading(false);
        return;
      }
    }

    const fetchMatches = async () => {
      try {
        const res = await fetch(
          `https://v3.football.api-sports.io/fixtures?league=128&season=${season}`,
          {
            headers: {
              "x-apisports-key": import.meta.env.VITE_API_KEY_FOOTBALL,
            },
          }
        );

        if (!res.ok) throw new Error("Error en la API");

        const data = await res.json();
        setMatches(data.response);

        localStorage.setItem(cacheKey, JSON.stringify({
          data: data.response,
          timestamp: Date.now(),
        }));
      } catch (error) {
        console.error(error)
        setError("No se pudieron cargar los partidos");
      } finally {
        setLoading(false)
      }
    };

    fetchMatches()
  }, [season])

  return { matches, loading, error }
}


