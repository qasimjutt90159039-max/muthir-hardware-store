import React from 'react';
import { Menu, Bell, User, LogOut, ExternalLink, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminHeader = ({ setIsSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-[#161616] text-white border-b border-zinc-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="lg:hidden p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-mono font-bold uppercase">
              Admin Mode
            </span>
            <span className="text-xs font-mono text-zinc-400 hidden md:inline">
              Mutahir Hardware Store Management Console
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2 pl-2 border-l border-zinc-700">
            <div className="w-7 h-7 rounded bg-orange-500 text-zinc-950 font-bold flex items-center justify-center text-xs">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-mono font-bold leading-none">{user?.name || 'Administrator'}</div>
              <div className="text-[10px] text-zinc-400 font-mono">Store Master</div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors ml-1"
              title="Sign Out of Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
