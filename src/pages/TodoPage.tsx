import { useAuth } from '../context/AuthContext';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';

export const TodoPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-cyber-darker py-8 px-4 relative overflow-hidden">
   
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      
      <div className="max-w-2xl mx-auto relative z-10">
  
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 card-cyber p-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-cyber-blue mb-2 text-glow">
              {'>'} TODO.SYS_
            </h1>
            <p className="text-cyber-green text-sm">
              $ USER: {user?.email || 'UNKNOWN'} • [ACTIVE]
            </p>
          </div>
          <button
            onClick={logout}
            className="text-sm px-8 py-3 bg-gradient-to-r from-cyber-pink to-red-600 border-2 border-cyber-pink text-white hover:from-red-600 hover:to-cyber-pink transition-all duration-300 shadow-neon-pink font-bold uppercase tracking-wider rounded"
          >
            ⚠ LOGOUT
          </button>
        </header>

        <TodoForm />

        <TodoList />

        <footer className="text-center mt-12 text-cyber-blue/50 text-xs border-t border-cyber-blue/20 pt-6">

          <p className="mt-2">STATUS: OPERATIONAL</p>
        </footer>
      </div>
    </div>
  );
};
