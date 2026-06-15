import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BottomBar from "../components/BottomBar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">

      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      <div className="flex-1 p-4 pb-20 md:pb-4">
        <Outlet/>
      </div>

      <div className="md:hidden fixed bottom-0 w-full">
        <BottomBar />
      </div>

    </div>
  );
}