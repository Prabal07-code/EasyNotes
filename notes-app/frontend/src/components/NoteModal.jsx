import React, { useState, useEffect } from 'react';
import { NOTE_COLORS } from './NoteCard.jsx';

const EMPTY = { title: '', content: '', tags: '', color: '#ffffff', pinned: false };

export default function NoteModal({ note, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (note) {
      setForm({ ...note, tags: note.tags?.join(', ') || '' });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [note]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.content.trim()) e.content = 'Content is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    onSave({ ...form, tags });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{note?._id ? 'Edit Note' : 'New Note'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              placeholder="Note title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-msg">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Content *</label>
            <textarea
              placeholder="Write your note here..."
              value={form.content}
              rows={6}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className={errors.content ? 'error' : ''}
            />
            {errors.content && <span className="error-msg">{errors.content}</span>}
          </div>

          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input
              type="text"
              placeholder="work, ideas, todo..."
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {NOTE_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`color-dot ${form.color === c ? 'selected' : ''}`}
                  style={{ background: c }}
                  onClick={() => setForm({ ...form, color: c })}
                />
              ))}
            </div>
          </div>

          <div className="form-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.pinned}
                onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
              />
              Pin this note
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {note?._id ? 'Update Note' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
