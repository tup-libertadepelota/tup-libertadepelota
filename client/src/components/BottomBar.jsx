import { Link, useLocation } from "react-router-dom";

export default function BottomBar() {
  const { pathname } = useLocation();

  const itemClass = (path) =>
    `flex flex-col items-center text-xs ${
      pathname === path
        ? "text-[var(--color-primary)]"
        : "text-gray-400"
    }`;

  return (
    <div className="flex justify-around py-3 bg-[var(--color-card)] border-t border-white/10 backdrop-blur-md">
      
      <Link to="/" className={itemClass("/")}>
        <span>Partidos</span>
      </Link>

      <Link to="/settings" className={itemClass("/settings")}>
        <span>Config</span>
      </Link>

    </div>
  );
}