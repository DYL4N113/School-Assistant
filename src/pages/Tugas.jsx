import { useState, useEffect } from 'react';
import { CheckCircle, Calendar } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import BottomNav from '../components/BottomNav';

export default function Tugas() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('pending'); // 'pending' atau 'completed'
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const q = query(collection(db, "tasks"));
      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleStatus = async (taskId, currentStatus) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, {
        status: currentStatus === 'pending' ? 'completed' : 'pending'
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Filter tugas berdasarkan tab yang dipilih
  const filteredTasks = tasks.filter(task => task.status === filter);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans pb-24">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Daftar Tugas</h1>
        
        {/* Tab Filter */}
        <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6">
          <button
            onClick={() => setFilter('pending')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              filter === 'pending' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Belum Selesai
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              filter === 'completed' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Selesai
          </button>
        </div>
      </div>

      <div className="px-6 space-y-3">
        {loading ? (
          <p className="text-center text-slate-500">Memuat data...</p>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-400">Tidak ada tugas di kategori ini.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              onClick={() => handleToggleStatus(task.id, task.status)}
              className={`p-4 rounded-2xl shadow-sm border flex items-start gap-4 cursor-pointer transition-all ${
                task.status === 'completed' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-slate-100'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${
                task.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
              }`}>
                <CheckCircle size={20} />
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold text-base ${
                  task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'
                }`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5">
                  <Calendar size={12} /> 
                  <span>
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : 'Belum disetel'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}