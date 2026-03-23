import { useState } from 'react';
import type { Todo, Priority } from '../types/todo';
import { useTodos } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

const getPriorityBadge = (priority?: Priority) => {
  switch (priority) {
    case 'alta':
      return <span className="px-2 py-1 text-xs font-bold border border-cyber-pink text-cyber-pink bg-cyber-pink/10">🔴 HIGH</span>;
    case 'media':
      return <span className="px-2 py-1 text-xs font-bold border border-cyber-yellow/60 text-cyber-yellow bg-cyber-yellow/10">🟡 MED</span>;
    case 'baja':
      return <span className="px-2 py-1 text-xs font-bold border border-cyber-green text-cyber-green bg-cyber-green/10">🟢 LOW</span>;
    default:
      return null;
  }
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority || 'media');
  const { updateTodo, deleteTodo, toggleTodo } = useTodos();

  const handleToggle = async () => {
    try {
      await toggleTodo(todo.id, !todo.completed);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('⚠ DELETE_TASK? [Y/N]')) {
      try {
        await deleteTodo(todo.id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    }
  };

  const handleUpdate = async () => {
    if (!editTitle.trim()) return;

    try {
      await updateTodo(todo.id, {
        title: editTitle,
        description: editDescription || undefined,
        priority: editPriority,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority || 'media');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="card-cyber p-6 mb-4 border-2 border-cyber-green/60">
        <div className="mb-2 text-cyber-green text-xs font-bold border-b border-cyber-green/30 pb-2">
          {'>'} EDIT_MODE
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="input-cyber w-full px-3 py-2 outline-none"
            placeholder="$ title..."
          />
        </div>
        <div className="mb-3">
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="input-cyber w-full px-3 py-2 outline-none resize-none"
            placeholder="$ description..."
            rows={2}
          />
        </div>
        <div className="mb-4">
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as Priority)}
            className="input-cyber w-full px-3 py-2 outline-none cursor-pointer"
          >
            <option value="baja">🟢 LOW</option>
            <option value="media">🟡 MEDIUM</option>
            <option value="alta">🔴 HIGH</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="flex-1 bg-cyber-green/20 border-2 border-cyber-green text-white hover:bg-cyber-green hover:text-black px-4 py-2 font-bold text-sm uppercase transition-all rounded"
          >
             SAVE
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-600/20 border-2 border-gray-500 text-white hover:bg-gray-500 hover:text-black px-4 py-2 font-bold text-sm uppercase transition-all rounded"
          >
             CANCEL
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`card-cyber p-6 mb-4 transition-all ${todo.completed ? 'opacity-70 border-cyber-green/60' : 'border-cyber-blue/40'}`}>
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggle}
          className={`flex flex-col items-center justify-center gap-1 px-4 py-3 min-w-[100px] font-bold text-xs uppercase transition-all rounded border-[3px] ${
            todo.completed
              ? 'bg-cyber-green/30 border-cyber-green text-cyber-green shadow-[0_0_25px_rgba(0,255,65,0.8)] hover:bg-cyber-green hover:text-black'
              : 'bg-cyber-pink/30 border-cyber-pink text-cyber-pink shadow-[0_0_25px_rgba(255,0,110,0.8)] hover:bg-cyber-pink hover:text-black'
          }`}
          title={todo.completed ? "Click to mark as TODO" : "Click to mark as DONE"}
        >
          <span className="text-2xl">
            {todo.completed ? '✓' : '⬜'}
          </span>
          <span className="font-mono font-bold tracking-wider">
            {todo.completed ? 'DONE' : 'TODO'}
          </span>
        </button>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3
              className={`text-base font-bold ${
                todo.completed ? 'line-through text-cyber-blue/40' : 'text-cyber-blue'
              }`}
            >
              {'>'} {todo.title}
            </h3>
            &nbsp;
            <div className='flex items-center justify-center h-full'>
                {getPriorityBadge(todo.priority)}
            </div>
          </div>
          
          {todo.description && (
            <p
              className={`text-sm mb-3 font-mono ${
                todo.completed ? 'line-through text-cyber-blue/30' : 'text-cyber-blue/70'
              }`}
            >
              $ {todo.description}
            </p>
          )}
          
          {todo.createdAt && (
            <p className="text-xs text-cyber-blue/40 font-mono">
              [CREATED: {new Date(todo.createdAt).toLocaleString('es-ES')}]
            </p>
          )}
        </div>

        <div className="flex gap-2 flex-col sm:flex-row">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-cyber-blue/20 border-2 border-cyber-blue text-white hover:bg-cyber-blue hover:text-black px-4 py-2 font-bold text-xs uppercase transition-all disabled:opacity-30 rounded"
            disabled={todo.completed}
          >
             EDIT
          </button>
          <button
            onClick={handleDelete}
            className="bg-cyber-pink/20 border-2 border-cyber-pink text-white hover:bg-cyber-pink hover:text-black px-4 py-2 font-bold text-xs uppercase transition-all rounded"
          >
             DEL
          </button>
        </div>
      </div>
    </div>
  );
};
