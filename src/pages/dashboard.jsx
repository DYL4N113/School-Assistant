import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Clock, Calendar, User, LogOut } from 'lucide-react';
import { db, auth } from '../firebase'; // Import Firestore & Auth
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Ambil data user yang lagi login
  const userName = localStorage.getItem("userName") || "Siswa";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat pagi";
    if (hour < 15) return "Selamat siang";
    if (hour < 18) return "Selamat sore";
    return "Selamat malam";
  };

  // Fungsi Logout
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userName");
    navigate('/login');
  };

  // Narik data dari Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const q = query(collection(db, "tasks"));
        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(tasksData);
      } catch (error) {
        console.error("Gagal narik data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      <header className="bg-white px-6 pt-8 pb-6 rounded-b-3xl shadow-sm border-b border-slate-100">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-1.5 rounded-full text-slate-500">
              <User size={16} />
            </div>
            <p className="text-slate-500 text-sm">{getGreeting()},</p>
          </div>
          {/* Tombol Logout */}
          <button onClick={handleLogout} className="text-slate-400 hover:text-rose-500 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{userName}</h1>
        
        {/* Info Card (Persiapan Besok) - Tetap Statis Dulu */}
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
        </div>
      </header>

      <main className="px-6 mt-6 space-y-6">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-slate-900">Tugas Terdekat</h3>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors">Lihat Semua</button>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-slate-500 text-center py-4">Memuat data...</p>
            ) : tasks.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">Belum ada tugas.</p>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                  <div className="bg-rose-100 p-2 rounded-lg text-rose-600">
                    <CheckCircle size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">{task.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Calendar size={12} /> Tenggat: -
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}