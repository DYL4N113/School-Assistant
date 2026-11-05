import { Home, Calendar, CheckSquare, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Beranda' },
    { path: '/jadwal', icon: Calendar, label: 'Jadwal' },
    { path: '/tugas', icon: CheckSquare, label: 'Tugas' },
    { path: '/pengaturan', icon: Settings, label: 'Atur' },
  ];

  return (
    // Posisi fixed di bawah, background putih dengan shadow
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}