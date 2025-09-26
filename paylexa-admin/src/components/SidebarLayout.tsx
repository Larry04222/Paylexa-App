import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/security', label: 'Morphon-X Security' },
];

type Props = {
  children: ReactNode;
};

export const SidebarLayout = ({ children }: Props) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-phoenixBlack via-[#121321] to-[#06070c] text-white">
      <aside className="hidden w-72 flex-col border-r border-royalBlue/30 bg-[#0d0f19]/80 p-6 md:flex">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.4em] text-darkGold">Paylexa Admin</span>
          <h1 className="mt-3 text-2xl font-semibold text-white">Command Console</h1>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-phoenix px-4 py-3 text-sm font-medium transition ${
                  active ? 'bg-emerald/30 text-darkGold' : 'hover:bg-royalBlue/20'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 px-6 py-8 md:px-12">{children}</main>
    </div>
  );
};
