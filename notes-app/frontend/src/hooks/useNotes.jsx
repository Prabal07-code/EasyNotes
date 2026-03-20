import { useState, useEffect, useCallback, useRef } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../api';
import toast from 'react-hot-toast';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const debounceRef = useRef(null);

  const fetchNotes = useCallback(async (q = '') => {
    try {
      setLoading(true);
      const { data } = await getNotes(q);
      setNotes(data.notes);
    } catch {
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchNotes(searchTerm), 250);
    return () => clearTimeout(debounceRef.current);
  }, [searchTerm, fetchNotes]);

  const addNote = async (noteData) => {
    try {
      const { data } = await createNote(noteData);
      setNotes((prev) => [data, ...prev]);
      toast.success('Note created!');
      return data;
    } catch {
      toast.error('Failed to create note');
    }
  };

  const editNote = async (id, noteData) => {
    try {
      const { data } = await updateNote(id, noteData);
      setNotes((prev) => prev.map((n) => (n._id === id ? data : n)));
      toast.success('Note updated!');
      return data;
    } catch {
      toast.error('Failed to update note');
    }
  };

  const removeNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success('Note deleted');
    } catch {
      toast.error('Failed to delete note');
    }
  };

  const togglePin = async (note) => {
    await editNote(note._id, { ...note, pinned: !note.pinned });
  };

  return { notes, loading, searchTerm, setSearchTerm, addNote, editNote, removeNote, togglePin };
}
