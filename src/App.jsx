import { BookOpen, CheckCircle, Clock, Calendar, User } from 'lucide-react';

function App() {
  // 1. Simulasi data user (Nanti ini bakal diganti sama data dari Supabase)
  const user = { name: "Dylan" }; 

  // 2. Logika buat nentuin waktu (Pagi/Siang/Sore/Malam)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat pagi";
    if (hour < 15) return "Selamat siang";
    if (hour < 18) return "Selamat sore";
    return "Selamat malam";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      
      {/* Header */}
      <header className="bg-white px-6 pt-8 pb-6 rounded-b-3xl shadow-sm border-b border-slate-100">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-slate-100 p-1.5 rounded-full text-slate-500">
            <User size={16} />
          </div>
          <p className="text-slate-500 text-sm">{getGreeting()},</p>
        </div>
        {/* Nama dinamis dari variabel user.name */}
        <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
        
        {/* Info Card (Persiapan Besok) */}
        <div className="mt-6 bg-indigo-600 p-5 rounded-2xl text-white shadow-md shadow-indigo-200 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 opacity-10">
            <BookOpen size={100} />
          </div>
          
          <p className="text-indigo-100 text-sm mb-2">Persiapan besok</p>
          <h2 className="text-xl font-semibold mb-1">Matematika</h2>
          <div className="flex items-center gap-2 text-indigo-200 text-sm mt-3">
            <Clock size={16} />
            <span>07.00 - 08.30</span>
          </div>
          <div className="mt-4 bg-white/20 p-2 rounded-lg text-sm inline-block backdrop-blur-sm">
            Bawa: Buku LKS, Kalkulator
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="px-6 mt-6 space-y-6">
        
        {/* Section Tugas */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-slate-900">Tugas Terdekat</h3>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors">Lihat Semua</button>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-rose-100 p-2 rounded-lg text-rose-600">
                <CheckCircle size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">PR Bahasa Inggris</h4>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Calendar size={12} /> Tenggat: Besok, 31 Okt
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                <BookOpen size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">Kelompok Fisika</h4>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Calendar size={12} /> Tenggat: 2 Nov
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Jadwal Hari Ini */}
        <section>
           <h3 className="font-bold text-lg text-slate-900 mb-4">Jadwal Hari Ini</h3>
           <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center mb-3">
              <div>
                <h4 className="font-semibold text-slate-800">Bahasa Indonesia</h4>
                <p className="text-xs text-slate-500">07.00 - 08.30</p>
              </div>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full">Selesai</span>
           </div>
           <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-slate-800">Matematika</h4>
                <p className="text-xs text-slate-500">08.30 - 10.00</p>
              </div>
              <span className="text-xs font-semibold bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">Sekarang</span>
           </div>
        </section>

      </main>
    </div>
  );
}

export default App;