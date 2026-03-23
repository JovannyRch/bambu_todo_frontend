import { useState, useEffect } from 'react';
import { useTodos } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

type FilterType = 'all' | 'active' | 'completed';

export const TodoList = () => {
  const { todos, loading, error, meta, report, fetchTodos } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    // Cuando cambia el filtro o la página, hacer fetch con los parámetros correctos
    const query: any = {
      page: currentPage,
      limit,
    };
    
    if (filter === 'active') query.finalizada = false;
    if (filter === 'completed') query.finalizada = true;
    
    fetchTodos(query);
  }, [filter, currentPage, limit]);

  const handlePageChange = (newPage: number) => {
    if (meta && newPage >= 1 && newPage <= meta.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to page 1 when filtering
  };

  const stats = {
    total: report?.totalTodos || 0,
    active: report?.pendingTodos || 0,
    completed: report?.completedTodos || 0,
    completionRate: report?.completionRate || 0,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyber-blue border-t-transparent"></div>
          <p className="mt-4 text-cyber-blue font-mono">$ LOADING_TASKS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-cyber-pink bg-cyber-pink/10 text-cyber-pink px-6 py-4">
        <p className="font-bold">⚠ SYSTEM_ERROR</p>
        <p className="font-mono text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="card-cyber p-6 mb-6">
        <h2 className="text-lg font-bold text-cyber-green mb-4 border-b border-cyber-blue/30 pb-2">
          {'>'} STATISTICS
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center border border-cyber-blue/30 p-4 hover:border-cyber-blue/60 transition-all">
            <p className="text-4xl font-bold text-cyber-blue text-glow">{stats.total}</p>
            <p className="text-xs text-cyber-blue/70 uppercase mt-2 font-mono">TOTAL</p>
          </div>
          <div className="text-center border border-cyber-blue/30 p-4 hover:border-cyber-blue/60 transition-all">
            <p className="text-4xl font-bold text-cyber-green text-glow">{stats.active}</p>
            <p className="text-xs text-cyber-green/70 uppercase mt-2 font-mono">ACTIVE</p>
          </div>
          <div className="text-center border border-cyber-blue/30 p-4 hover:border-cyber-blue/60 transition-all">
            <p className="text-4xl font-bold text-cyber-pink text-glow">{stats.completed}</p>
            <p className="text-xs text-cyber-pink/70 uppercase mt-2 font-mono">DONE</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-cyber-blue uppercase font-mono font-bold">
              {'>'} COMPLETION_RATE
            </span>
            <span className="text-2xl font-bold text-cyber-green font-mono text-glow">
              {stats.completionRate.toFixed(1)}%
            </span>
          </div>
          <div className="relative h-10 bg-black/90 border-[3px] border-cyber-blue rounded-lg overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyber-pink via-cyber-green to-cyber-blue transition-all duration-700 ease-out shadow-[inset_0_0_20px_rgba(255,255,255,0.3)]"
              style={{ width: `${stats.completionRate}%` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] font-mono z-10 tracking-wider">
                {stats.completed} / {stats.total} TASKS COMPLETED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => handleFilterChange('all')}
          className={`flex-1 py-3 px-4 font-bold text-sm uppercase transition-all rounded ${
            filter === 'all'
              ? 'border-2 border-cyber-blue bg-cyber-blue/30 text-white shadow-neon-blue'
              : 'border-2 border-cyber-blue/50 bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20 hover:border-cyber-blue'
          }`}
        >
          📊 ALL: {stats.total}
        </button>
        <button
          onClick={() => handleFilterChange('active')}
          className={`flex-1 py-3 px-4 font-bold text-sm uppercase transition-all rounded ${
            filter === 'active'
              ? 'border-2 border-cyber-green bg-cyber-green/30 text-white shadow-neon-green'
              : 'border-2 border-cyber-green/50 bg-cyber-green/10 text-cyber-green hover:bg-cyber-green/20 hover:border-cyber-green'
          }`}
        >
          ⚡ ACTIVE: {stats.active}
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={`flex-1 py-3 px-4 font-bold text-sm uppercase transition-all rounded ${
            filter === 'completed'
              ? 'border-2 border-cyber-pink bg-cyber-pink/30 text-white shadow-neon-pink'
              : 'border-2 border-cyber-pink/50 bg-cyber-pink/10 text-cyber-pink hover:bg-cyber-pink/20 hover:border-cyber-pink'
          }`}
        >
          ✅ DONE: {stats.completed}
        </button>
      </div>

      {/* Todo List */}
      {todos.length === 0 ? (
        <div className="text-center py-12 card-cyber">
          <p className="text-cyber-blue/50 text-lg font-mono">
            {filter === 'all' && '$ NO_TASKS_FOUND • CREATE_NEW_TASK'}
            {filter === 'active' && '$ NO_ACTIVE_TASKS'}
            {filter === 'completed' && '$ NO_COMPLETED_TASKS'}
          </p>
          <p className="text-cyber-blue/30 text-xs mt-2 font-mono">
            [EMPTY_BUFFER]
          </p>
        </div>
      ) : (
        <div>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="card-cyber p-6 mt-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-6 py-2 font-bold text-sm uppercase transition-all rounded border-2 ${
                currentPage === 1
                  ? 'border-cyber-blue/20 bg-cyber-blue/5 text-cyber-blue/30 cursor-not-allowed'
                  : 'border-cyber-blue bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30 shadow-neon-blue'
              }`}
            >
              ← PREV
            </button>

            <div className="flex items-center gap-2">
              <span className="text-cyber-green font-mono text-sm">
                PAGE {currentPage} / {meta.totalPages}
              </span>
              <span className="text-cyber-blue/50 font-mono text-xs">
                ({meta.total} TOTAL)
              </span>
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === meta.totalPages}
              className={`px-6 py-2 font-bold text-sm uppercase transition-all rounded border-2 ${
                currentPage === meta.totalPages
                  ? 'border-cyber-blue/20 bg-cyber-blue/5 text-cyber-blue/30 cursor-not-allowed'
                  : 'border-cyber-blue bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30 shadow-neon-blue'
              }`}
            >
              NEXT →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
