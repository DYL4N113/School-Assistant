import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Jadwal from './pages/Jadwal';
import Tugas from './pages/Tugas';
import Pengaturan from './pages/Pengaturan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/tugas" element={<Tugas />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;