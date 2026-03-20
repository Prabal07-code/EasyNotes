import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search notes by title, content or tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        spellCheck={false}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} title="Clear">
          ✕
        </button>
      )}
    </div>
  );
}
