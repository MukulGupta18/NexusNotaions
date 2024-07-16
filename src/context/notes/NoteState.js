import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get All Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem ('auth-token')
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem ('auth-token')
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add note: ${response.status}`); 
      }
      const note = await response.json();
      setNotes(notes.concat(note))
    } catch (error) {
      console.error("Error adding note:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem ('auth-token')
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.status}`);
      }

      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem ('auth-token')
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit note: ${response.status}`);
      }
      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error editing note:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
