import { Link, useLocation } from 'react-router-dom';


export default function Sidebar() {
  const {pathname} = useLocation();


  const linkClass = (path) => 
    `block px-4 py-3 rounded-lg transition-all ${
      pathname === path
        ? "bg-[#00ff9c]/20 text-[#00ff9c] shadow-[0_0_10px_#00ff9c]"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div className="h-full p-4 backdrop-blur-md bg-white/5 border-r border-white/10">
      <h1 className="text-xl font-bold text-[#578056] mb-6">
        LibertaDEpelota
      </h1>

      <nav className="flex flex-col gap-2">
        <Link to="/" className={linkClass("/")}>
          Partidos
        </Link>

        <Link to="/settings" className={linkClass("/settings")}>
          Configuración
        </Link>
      </nav>
    </div>
  );
}
