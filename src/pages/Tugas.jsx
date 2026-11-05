import BottomNav from '../components/BottomNav';

export default function Jadwal() { // Ganti nama fungsinya sesuai file
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-900">Halaman Jadwal</h1>
        <p className="text-slate-500 mt-2">Segera hadir.</p>
      </div>
      <BottomNav />
    </div>
  );
}