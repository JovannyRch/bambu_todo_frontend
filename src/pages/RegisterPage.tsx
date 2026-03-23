import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nombre || !email || !password || !confirmPassword) {
      setError('ERROR: MISSING_FIELDS');
      return;
    }

    if (password.length < 6) {
      setError('ERROR: PASSWORD_TOO_SHORT [MIN:6]');
      return;
    }

    if (password !== confirmPassword) {
      setError('ERROR: PASSWORD_MISMATCH');
      return;
    }

    try {
      setIsLoading(true);
      await register({ nombre, email, password });
      navigate('/todos');
    } catch (err) {
      setError(err instanceof Error ? `ERROR: ${err.message}` : 'ERROR: REGISTRATION_FAILED');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-darker flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse-slow"></div>
      
      <div className="card-cyber max-w-md w-full p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-cyber-blue mb-2 text-glow">
            {'>'} TODO.SYS
          </h1>
          <p className="text-cyber-green text-sm">
            $ USER_REGISTRATION
          </p>
          <div className="mt-4 text-xs text-cyber-blue/50">
            [CREATE_NEW_ACCOUNT] • [ENCRYPTED]
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="border border-cyber-pink/60 bg-cyber-pink/10 text-cyber-pink px-4 py-3 font-mono text-sm">
              <span className="text-cyber-pink font-bold">⚠ </span>
              {error}
            </div>
          )}

          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-cyber-blue mb-2 uppercase tracking-wider">
              {'>'} NOMBRE
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="input-cyber w-full px-4 py-3 outline-none"
              disabled={isLoading}
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cyber-blue mb-2 uppercase tracking-wider">
              {'>'} EMAIL_ADDRESS
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@terminal.sys"
              className="input-cyber w-full px-4 py-3 outline-none"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cyber-blue mb-2 uppercase tracking-wider">
              {'>'} PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="input-cyber w-full px-4 py-3 outline-none"
              disabled={isLoading}
              autoComplete="new-password"
            />
            <p className="text-xs text-cyber-blue/50 mt-1">$ MIN_LENGTH: 6_CHARS</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-cyber-blue mb-2 uppercase tracking-wider">
              {'>'} CONFIRM_PASSWORD
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="input-cyber w-full px-4 py-3 outline-none"
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-4 bg-gradient-to-r from-cyber-green to-green-400 border-2 border-cyber-green text-black hover:from-green-400 hover:to-cyber-green transition-all duration-300 shadow-neon-green font-bold uppercase tracking-wider rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'CREATING_ACCOUNT...' : 'REGISTER'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-cyber-blue/30 pt-6">
          <p className="text-cyber-blue/70 text-sm">
            $ EXISTING_USER?{' '}
            <Link to="/login" className="text-cyber-green hover:text-glow transition-all">
              LOGIN_HERE
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
