import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNotes } from './hooks/useNotes.jsx';
import NoteCard from './components/NoteCard.jsx';
import NoteModal from './components/NoteModal.jsx';
import SearchBar from './components/SearchBar.jsx';
import './App.css';

export default function App() {
  // const { notes, loading, searchTerm, setSearchTerm, addNote, editNote, removeNote, togglePin } = useNotes();
  const { notes = [], loading, searchTerm, setSearchTerm, addNote, editNote, removeNote, togglePin } = useNotes();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const openCreate = () => { setEditingNote(null); setModalOpen(true); };
  const openEdit = (note) => { setEditingNote(note); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditingNote(null); };

  const handleSave = async (formData) => {
    if (editingNote?._id) {
      await editNote(editingNote._id, formData);
    } else {
      await addNote(formData);
    }
    closeModal();
  };

  // const pinned = notes.filter((n) => n.pinned);
  // const others = notes.filter((n) => !n.pinned);
  const pinned = (notes || []).filter((n) => n.pinned);
  const others = (notes || []).filter((n) => !n.pinned);


  return (
    <div className="app">
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />

      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon">📓</span>
            <h1>EasyNotes</h1>
            <span className="brand-icon">📓</span>
          </div>
          <button className="btn btn-primary new-note-btn" onClick={openCreate}>
            + New Note
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="search-section">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          {searchTerm && (
            <p className="search-info">
              {notes.length === 0
                ? `No results for "${searchTerm}"`
                : `${notes.length} result${notes.length !== 1 ? 's' : ''} for "${searchTerm}"`}
            </p>
          )}
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner" />
            <p>Loading notes...</p>
          </div>
        ) : notes.length === 0 && !searchTerm ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h2>No notes yet</h2>
            <p>Create your first note to get started</p>
            <button className="btn btn-primary" onClick={openCreate}>+ Create Note</button>
          </div>
        ) : (
          <>
            {pinned.length > 0 && (
              <section>
                <h2 className="section-label">📌 Pinned</h2>
                <div className="notes-grid">
                  {pinned.map((note) => (
                    <NoteCard key={note._id} note={note} searchTerm={searchTerm}
                      onEdit={openEdit} onDelete={removeNote} onPin={togglePin} />
                  ))}
                </div>
              </section>
            )}
            {others.length > 0 && (
              <section>
                {pinned.length > 0 && <h2 className="section-label">All Notes</h2>}
                <div className="notes-grid">
                  {others.map((note) => (
                    <NoteCard key={note._id} note={note} searchTerm={searchTerm}
                      onEdit={openEdit} onDelete={removeNote} onPin={togglePin} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {modalOpen && (
        <NoteModal note={editingNote} onSave={handleSave} onClose={closeModal} />
      )}
    </div>
  );
}
