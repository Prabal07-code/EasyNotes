import React from 'react';

const NOTE_COLORS = [
  '#a16e6e', '#bbb67d', '#81b091', '#abb8ca', '#aa869a',
  '#8a82ad', '#edcb9e', '#a7d3ff',
];

function highlight(text, term) {
  if (!term || !text) return text;
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i} className="highlight">{part}</mark> : part
  );
}

export default function NoteCard({ note, searchTerm, onEdit, onDelete, onPin }) {
  const date = new Date(note.updatedAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <div className="note-card" style={{ background: note.color || '#fff' }}>
      <div className="note-card-header">
        <h3 className="note-title">{highlight(note.title, searchTerm)}</h3>
        <button
          className={`pin-btn ${note.pinned ? 'pinned' : ''}`}
          onClick={() => onPin(note)}
          title={note.pinned ? 'Unpin' : 'Pin'}
        >
          📌
        </button>
      </div>

      <p className="note-content">{highlight(note.content, searchTerm)}</p>

      {note.tags?.length > 0 && (
        <div className="note-tags">
          {note.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="note-footer">
        <span className="note-date">{date}</span>
        <div className="note-actions">
          <button className="btn-icon edit" onClick={() => onEdit(note)} title="Edit">✏️</button>
          <button className="btn-icon delete" onClick={() => onDelete(note._id)} title="Delete">🗑️</button>
        </div>
      </div>
    </div>
  );
}

export { NOTE_COLORS };
