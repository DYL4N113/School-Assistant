import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Clock, Calendar, Plus, X, Settings, LogOut } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, query, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const navigate = useNavigate();
  
  const userName = localStorage.getItem("userName") || "Siswa";

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userName");
    navigate('/login');
  };

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

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title: newTaskTitle,
        status: 'pending',
        createdAt: serverTimestamp(),
        userId: auth.currentUser?.uid
      });
      setNewTaskTitle('');
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error("Gagal nambah tugas:", error);
    }
  };

  return (
    // Background abu-abu sangat terang, khas aplikasi mobile
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans pb-24">
      
      {/* Top Bar */}
      <div className="px-6 pt-8 pb-4 flex justify-between items-center bg-[#F8F9FA]">
        <div>
          <p className="text-slate-500 text-sm">Selamat datang,</p>
          <h1 className="text-xl font-bold text-slate-900">{userName}</h1>
        </div>
        <button onClick={handleLogout} className="p-2 bg-white rounded-full shadow-sm text-slate-400 hover:text-rose-500">
          <LogOut size={20} />
        </button>
      </div>

      <main className="px-6 space-y-6">
        
        {/* Card Persiapan Besok (Mirip TugasNih) */}
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <p className="text-indigo-100 text-xs font-medium uppercase tracking-wider">Persiapan Besok</p>
              <h2 className="text-lg font-bold">Matematika</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-indigo-100 mt-4 border-t border-white/20 pt-4">
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>07.00 - 08.30</span>
            </div>
          </div>
          <div className="mt-3 bg-white/20 px-3 py-2 rounded-lg text-sm inline-block font-medium">
            Bawa: Buku LKS, Kalkulator
          </div>
        </div>

        {/* Section Tugas */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-slate-900">Tugas & Tenggat</h3>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-slate-500 text-center py-4">Memuat data...</p>
            ) : tasks.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
                <p className="text-sm text-slate-500">Belum ada tugas. Tekan tombol + untuk menambah.</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 transition-all hover:shadow-md">
                  <div className="bg-amber-100 p-2.5 rounded-xl text-amber-600">
                    <CheckCircle size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 text-base">{task.title}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5">
                      <Calendar size={12} /> 
                      <span>Belum disetel</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </main>

      {/* FAB (Tombol Tambah) */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-300 hover:bg-indigo-700 transition-transform hover:scale-105 active:scale-95 z-40"
      >
        <Plus size={28} />
      </button>

      {/* Modal Tambah Tugas */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Tugas Baru</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200">
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleAddTask} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Apa tugasnya?</label>
                <input 
                  type="text" 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Misal: PR Sejarah" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  autoFocus
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-indigo-200"
              >
                Simpan Tugas
              </button>
            </form>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}