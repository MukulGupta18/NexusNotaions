import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "6665f3aea62efb76296ca8da3",
            "user": "666574a629d4795af9a3e2d3",
            "title": "First",
            "description": "Wake up",
            "tag": "personal",
            "date": "2024-06-09T18:25:50.328Z",
            "__v": 0
        },
        {
            "_id": "6665f423b350b2fe7fc92449d",
            "user": "666574a629d4795af9a3e2d3",
            "title": "First",
            "description": "Wake up",
            "tag": "personal",
            "date": "2024-06-09T18:27:47.579Z",
            "__v": 0
        },
        {
            "_id": "6665f426b450b2fe7fc92449f",
            "user": "666574a629d4795af9a3e2d3",
            "title": "First",
            "description": "Wake up",
            "tag": "personal",
            "date": "2024-06-09T18:27:50.119Z",
            "__v": 0
        },
        {
            "_id": "6669779ffaac0582a70568b7b",
            "user": "666574a629d4795af9a3e2d3",
            "title": "First",
            "description": "Wake up",
            "tag": "personal",
            "date": "2024-06-12T10:25:35.850Z",
            "__v": 0
        },
        {
            "_id": "6665f423b50b2fe7f5c92449d",
            "user": "666574a629d4795af9a3e2d3",
            "title": "First",
            "description": "Wake up",
            "tag": "personal",
            "date": "2024-06-09T18:27:47.579Z",
            "__v": 0
        },
        {
            "_id": "6665f426b50b2fe7f1c92449f",
            "user": "666574a629d4795af9a3e2d3",
            "title": "First",
            "description": "Wake up",
            "tag": "personal",
            "date": "2024-06-09T18:27:50.119Z",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;

