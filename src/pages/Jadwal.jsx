import { Clock, BookOpen } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function Jadwal() {
  // Data dummy dulu buat nampilin UI
  const jadwalHariIni = [
    { id: 1, jam: '07.00 - 08.30', mapel: 'Matematika', ruang: 'R. 12' },
    { id: 2, jam: '08.30 - 10.00', mapel: 'Bahasa Indonesia', ruang: 'R. 12' },
    { id: 3, jam: '10.15 - 11.45', mapel: 'Fisika', ruang: 'Lab IPA' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans pb-24">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Jadwal Pelajaran</h1>
        <p className="text-slate-500 text-sm mb-6">Senin, 30 Oktober 2026</p>
        
        {/* Kalender Mini Horizontal */}
        <div className="flex justify-between mb-6">
          {['Sen', 'Sel', 'Rab', 'Kam', 'Jum'].map((day, index) => (
            <div key={index} className={`flex flex-col items-center p-2 rounded-xl w-12 ${index === 0 ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-100'}`}>
              <span className="text-xs mb-1">{day}</span>
              <span className="font-bold">{27 + index}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-3">
        {jadwalHariIni.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
              <BookOpen size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-800">{item.mapel}</h4>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1"><Clock size={12} /> {item.jam}</span>
                <span>{item.ruang}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}