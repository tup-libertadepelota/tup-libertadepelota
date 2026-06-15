import { useEffect, useState } from "react";

export function useMatches() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem("matches"));

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
          "https://v3.football.api-sports.io/fixtures?league=128&season=2024",
          {
            headers: {
              "x-apisports-key": import.meta.env.VITE_API_KEY_FOOTBALL,
            },
          }
        );

        if (!res.ok) throw new Error("Error en la API");

        const data = await res.json();
        setMatches(data.response);

        localStorage.setItem(
          "matches",
          JSON.stringify({
            data: data.response,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.error(error)
        setError("No se pudieron cargar los partidos");
      } finally {
        setLoading(false)
      }
    };

    fetchMatches()
  }, [])

  return { matches, loading, error }
}


