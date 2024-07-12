import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

   //Get All Notes
   const getNotes = async () => {
    //API Call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "containt-type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NTc0YTYyOWQ0Nzk1YWY5YTNlMmQzIn0sImlhdCI6MTcxNzkzNTY3Mn0.7Tp7oD8KQDduwxAJIHXDtjhotCXMmfvTlMEtkfay3ik",
        },
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
  };

  //Add Note
  const addNote = async (title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/notes/addnote`, {
        method: "Post",
        headers: {
          "containt-type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NTc0YTYyOWQ0Nzk1YWY5YTNlMmQzIn0sImlhdCI6MTcxNzkzNTY3Mn0.7Tp7oD8KQDduwxAJIHXDtjhotCXMmfvTlMEtkfay3ik",
        },
        body: JSON.stringify({title, description, tag})
      });
  
    console.log("Adding a new note");
    const note = {
      _id: "6665f426b50b2fe7f1c92449f",
      user: "666574a629d4795af9a3e2d38",
      title: title,
      description: description,
      tag: tag,
      date: "2024-06-09T18:27:50.119Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  //Delete Note
  const deleteNote = (id) => {
    //TODO: API Call
    console.log("Deleting Note with Id" + id);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "containt-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NTc0YTYyOWQ0Nzk1YWY5YTNlMmQzIn0sImlhdCI6MTcxNzkzNTY3Mn0.7Tp7oD8KQDduwxAJIHXDtjhotCXMmfvTlMEtkfay3ik",
      },
      body: JSON.stringify({title, description, tag})
    });

    const json = response.json();

    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
