export function formatMatchDate(dateString) {
  const date = new Date(dateString);

  const weekday = date.toLocaleDateString("es-AR", {
    weekday: "long",
  });

  const capitalizedWeekday =
    weekday.charAt(0).toUpperCase() + weekday.slice(1);

  const formattedDate = date.toLocaleDateString("es-AR");

  return `${capitalizedWeekday} ${formattedDate}`;
}