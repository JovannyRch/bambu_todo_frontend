import { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import type { Priority } from '../types/todo';

export const TodoForm = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState<Priority>('media');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTodo } = useTodos();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    try {
      setIsSubmitting(true);
      await addTodo({ 
        nombre, 
        descripcion: descripcion || undefined,
        prioridad 
      });
      setNombre('');
      setDescripcion('');
      setPrioridad('media');
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 card-cyber p-6">
      <div className="mb-4 text-cyber-green text-sm font-bold border-b border-cyber-blue/30 pb-2">
        {'>'} NEW_TASK_ENTRY
      </div>

      <div className="mb-4">
        <label htmlFor="nombre" className="block text-xs font-medium text-cyber-blue mb-2 uppercase tracking-wider">
          {'>'} TITLE *
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="$ task_name..."
          className="input-cyber w-full px-4 py-2 outline-none"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="descripcion" className="block text-xs font-medium text-cyber-blue mb-2 uppercase tracking-wider">
          {'>'} DESCRIPTION
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="$ task_details..."
          rows={3}
          className="input-cyber w-full px-4 py-2 outline-none resize-none"
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="prioridad" className="block text-xs font-medium text-cyber-blue mb-2 uppercase tracking-wider">
          {'>'} PRIORITY_LEVEL
        </label>
        <select
          id="prioridad"
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value as Priority)}
          className="input-cyber w-full px-4 py-2 outline-none cursor-pointer"
          disabled={isSubmitting}
        >
          <option value="baja">🟢 LOW</option>
          <option value="media">🟡 MEDIUM</option>
          <option value="alta">🔴 HIGH</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!nombre.trim() || isSubmitting}
        className="w-full px-6 py-4 bg-gradient-to-r from-cyber-blue to-purple-600 border-2 border-cyber-blue text-white hover:from-purple-600 hover:to-cyber-blue transition-all duration-300 shadow-neon-blue font-bold uppercase tracking-wider rounded disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '⏳ PROCESSING...' : '➕ ADD_TASK'}
      </button>
    </form>
  );
};
