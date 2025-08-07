import React, { useState } from 'react';
import { Trash2, Check, Edit2, Save, X, ChevronDown, ChevronUp, FileText, Calendar } from 'lucide-react';

const TaskList = ({ tasks, onToggleComplete, onDeleteTask, onEditTask, darkMode }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('');
  const [expandedTasks, setExpandedTasks] = useState(new Set());

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditDescription(task.description || '');
    setEditDate(task.date || '');
  };

  const saveEdit = () => {
    if (editText.trim()) {
      onEditTask(editingId, editText.trim(), editDescription.trim(), editDate.trim());
    }
    setEditingId(null);
    setEditText('');
    setEditDescription('');
    setEditDate('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditDescription('');
    setEditDate('');
  };

  const toggleExpanded = (taskId) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    }
    if (e.key === 'Escape') cancelEdit();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <p className="empty-text">Henüz görev yok. İlk görevini ekle!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => {
        const isExpanded = expandedTasks.has(task.id);
        const hasDescription = task.description && task.description.trim();
        const hasDate = task.date && task.date.trim();
        
        return (
          <div
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <div className="task-content">
              <button
                onClick={() => onToggleComplete(task.id)}
                className={`complete-button ${task.completed ? 'checked' : ''}`}
              >
                {task.completed && <Check size={14} />}
              </button>

              {editingId === task.id ? (
                <div className="edit-container">
                  <div className="edit-inputs">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                      onKeyPress={handleKeyPress}
                      placeholder="Görev başlığı"
                      autoFocus
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="edit-description"
                      placeholder="Açıklama (isteğe bağlı)"
                      rows="2"
                    />
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="edit-date"
                      placeholder="Tarih seçin"
                    />
                  </div>
                  <div className="edit-actions">
                    <button
                      onClick={saveEdit}
                      className="edit-action save"
                      title="Kaydet"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="edit-action cancel"
                      title="İptal"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="task-info">
                    <div className="task-header">
                      <span className={`task-text ${task.completed ? 'completed-text' : ''}`}>
                        {task.text}
                      </span>
                      {(hasDescription || hasDate) && (
                        <button
                          onClick={() => toggleExpanded(task.id)}
                          className="expand-button"
                          title={isExpanded ? 'Gizle' : 'Detayları göster'}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      )}
                    </div>
                    
                    {isExpanded && (hasDescription || hasDate) && (
                      <div className="task-details">
                        {hasDescription && (
                          <div className="task-description">
                            <div className="description-icon">
                              <FileText size={14} />
                            </div>
                            <p className="description-text">{task.description}</p>
                          </div>
                        )}
                        
                        {hasDate && (
                          <div className="task-date">
                            <div className="date-icon">
                              <Calendar size={14} />
                            </div>
                            <span className="date-text">{formatDate(task.date)}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {!isExpanded && (hasDescription || hasDate) && (
                      <div className="task-preview">
                        {hasDescription && (
                          <div className="description-indicator">
                            <FileText size={12} />
                            <span className="description-preview">
                              {task.description.length > 30 
                                ? task.description.substring(0, 30) + '...' 
                                : task.description}
                            </span>
                          </div>
                        )}
                        {hasDate && (
                          <div className="date-indicator">
                            <Calendar size={12} />
                            <span className="date-preview">{formatDate(task.date)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="task-actions">
                    <button
                      onClick={() => startEditing(task)}
                      className="task-action edit"
                      title="Düzenle"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="task-action delete"
                      title="Sil"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;