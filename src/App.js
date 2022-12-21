import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {

    const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || []);
    const [activeNote, setActiveNote] = useState(false);
    // const [duplicate, onAddNote] = useState([]);


    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const onAddNote = () => {
        // Create a list of all the existing titles
        const existingTitles = notes.map((note) => note.title);

        // Prompt the user to enter a new title
        const title = window.prompt('Enter a title for the new note:');

        // Check if the user-entered title already exists in the list of titles
        if (existingTitles.indexOf(title) !== -1) {
            // Title already exists, so display an error message
            window.alert('This title already exists');
        } else {
            // Title is unique, so create the new note with the user-entered title
            const newNote = {
                id: uuid(),
                title,
                body: "",
                lastModified: Date.now(),
            };

            // Add the new note to the beginning of the list of notes
            setNotes([newNote, ...notes]);
            setActiveNote(newNote.id);
        }
    };

    //Delete function
    const onDeleteNote = (idToDelete) => {
        setNotes(notes.filter((note) => note.id !== idToDelete));
    };

    //updatedNote
    const onUpdateNote = (updatedNote) => {
        const updatedNotesArray = notes.map((note) => {
            if (note.id === activeNote) {
                return updatedNote;
            }

            return note;
        });

        setNotes(updatedNotesArray);
    };

    const getActiveNote = () => {
        return notes.find((note) => note.id === activeNote);
    };

    return ( <
        div className = "App" >
        <
        Sidebar notes = { notes }
        onAddNote = { onAddNote }
        onDeleteNote = { onDeleteNote }
        activeNote = { activeNote }
        setActiveNote = { setActiveNote }
        /> <
        Main activeNote = { getActiveNote() }
        onUpdateNote = { onUpdateNote }
        /> < /
        div >
    );
}

export default App;