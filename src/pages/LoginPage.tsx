import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('ERROR: MISSING_CREDENTIALS');
      return;
    }

    try {
      setIsLoading(true);
      await login({ email, password });
      navigate('/todos');
    } catch (err) {
      setError(err instanceof Error ? `ERROR: ${err.message}` : 'ERROR: AUTH_FAILED');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-darker flex items-center justify-center p-4 relative overflow-hidden">
   
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse-slow"></div>
      
      <div className="card-cyber max-w-md w-full p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-cyber-blue mb-2 text-glow">
            {'>'} TODO.SYS
          </h1>
          <p className="text-cyber-green text-sm">
            $ AUTHENTICATION_REQUIRED
          </p>
          <div className="mt-4 text-xs text-cyber-blue/50">
            [SYSTEM v1.0.0] • [STATUS: ONLINE]
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
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-4 bg-gradient-to-r from-cyber-blue to-cyan-400 border-2 border-cyber-blue text-black hover:from-cyan-400 hover:to-cyber-blue transition-all duration-300 shadow-neon-blue font-bold uppercase tracking-wider rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'AUTHENTICATING...' : 'LOGIN'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-cyber-blue/30 pt-6">
          <p className="text-cyber-blue/70 text-sm">
            $ NEW_USER?{' '}
            <Link to="/register" className="text-cyber-green hover:text-glow transition-all">
              REGISTER_HERE
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
