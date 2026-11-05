import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* Card Login */}
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Selamat Datang</h1>
          <p className="text-slate-500 text-sm mt-2">Masuk untuk mengakses jadwal dan tugasmu.</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Input Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                placeholder="nama@sekolah.com" 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Tombol Login */}
          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 shadow-md shadow-indigo-200"
          >
            Masuk
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer Form */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Belum punya akun? <a href="#" className="text-indigo-600 font-medium hover:underline">Daftar di sini</a>
        </p>
      </div>
    </div>
  );
}