import React, { useState } from 'react';
import { Plus, FileText, Calendar } from 'lucide-react';

const TaskForm = ({ onAddTask, darkMode }) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (task.trim()) {
      onAddTask(task.trim(), description.trim(), date);
      setTask('');
      setDescription('');
      setDate('');
      setShowDescription(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="task-form">
      <div className="form-container">
        <div className="input-group">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Yeni görev ekle..."
            className="task-input"
          />
          <button
            type="button"
            onClick={() => setDate(date ? '' : new Date().toISOString().split('T')[0])}
            className={`description-toggle calendar ${date ? 'active' : ''}`}
            title="Tarih ekle"
          >
            <Calendar size={18} />
          </button>
          <button
            type="button"
            onClick={() => setShowDescription(!showDescription)}
            className={`description-toggle ${showDescription ? 'active' : ''}`}
            title="Açıklama ekle"
          >
            <FileText size={18} />
          </button>
        </div>
        
        {date && (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="task-input"
            style={{ maxWidth: '200px' }}
          />
        )}
        
        {showDescription && (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Görev açıklaması (isteğe bağlı)..."
            className="description-input"
            rows="2"
            onKeyPress={handleKeyPress}
          />
        )}
        
        <button
          onClick={handleSubmit}
          className="add-button"
        >
          <Plus size={20} />
          Ekle
        </button>
      </div>
    </div>
  );
};

export default TaskForm;