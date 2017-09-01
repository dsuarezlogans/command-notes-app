'use strict';
const fs = require('fs');

const fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes-data.json'));
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {    
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

const logNote = (note) => {
    console.log(' ');
    console.log('---------Title---------');
    console.log(`    ${note.title}`);
    console.log(' ');
    console.log('---------Body---------');    
    console.log(`    ${note.body}`);   
    console.log(' ');
};

const addNote = (title, body) => {
    const notes = fetchNotes();
    const note =  {
        title,
        body
    }
    const titleUnique = notes.filter((note) => note.title === title);

    if (titleUnique.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }        
};

const getAll = () => {
    const notes = fetchNotes();
    return notes;
};

const getNote = (title) => {
    const notes = fetchNotes();
    return notes.filter(note => note.title === title);    
};

const removeNote = (title) => {
    const notes = fetchNotes();    
    const noteRemoved = notes.filter((note) => note.title !== title);
    saveNotes(noteRemoved);
    return notes.length !== noteRemoved.length;
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};