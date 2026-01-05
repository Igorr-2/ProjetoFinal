import { useState } from 'react';
import type { User } from '../App';

interface LoginProps {
  onLogin: (user: User) => void;
}

// Mock users database
const MOCK_USERS = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@sesi.edu.br',
    password: 'aluno123',
    role: 'student' as const,
    class: '3º Ano A',
    balance: 150.00,
    phone: '11987654321'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@sesi.edu.br',
    password: 'aluno123',
    role: 'student' as const,
    class: '2º Ano B',
    balance: 200.00,
    phone: '11912345678'
  },
  {
    id: 'admin',
    name: 'Administrador Cantina',
    email: 'admin@sesi.edu.br',
    password: 'admin123',
    role: 'admin' as const
  }
];

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
    } else {
      setError('Email ou senha incorretos');
    }
  };

  const quickLogin = (userEmail: string) => {
    const user = MOCK_USERS.find(u => u.email === userEmail);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Cantina Sesi</h1>
            <p className="text-gray-600 mt-2">Sistema de Pedidos Online</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="seu.email@sesi.edu.br"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Entrar
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-4">Acesso rápido para demonstração:</p>
            <div className="space-y-2">
              <button
                onClick={() => quickLogin('joao.silva@sesi.edu.br')}
                className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm"
              >
                🎓 Entrar como Aluno (João Silva)
              </button>
              <button
                onClick={() => quickLogin('maria.santos@sesi.edu.br')}
                className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm"
              >
                🎓 Entrar como Aluna (Maria Santos)
              </button>
              <button
                onClick={() => quickLogin('admin@sesi.edu.br')}
                className="w-full px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition text-sm"
              >
                👨‍💼 Entrar como Administrador
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}