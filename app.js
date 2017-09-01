"use strict";
const yargs = require('yargs');

const notes = require('./notes');

let argv = yargs
    .command('add', 'add a new note', {
        title: {
            describe: 'title for a note',
            demand: true,
            alias: 't'
        },
        body: {
            describe: 'body for a note',
            demand: true,
            alias: 'b'
        }
    })
    .command('remove', 'delete a note', {
        title: {
            describe: 'title of the note to delete',
            demand: true,
            alias: 't'
        }
    })
    .command('read', 'shows a note', {
        title: {
            describe: 'title of the note to read',
            demand: true,
            alias: 't'
        }
    })
    .command('list', 'shows a full list of notes')
    .help()
    .argv;
let command = argv._[0];

if (command === 'add') {
    const addedNote = notes.addNote(argv.title, argv.body);
    if (addedNote) {
        console.log('Note Added')
        notes.logNote(addedNote)
    } else {
        console.log('Title has been taken');
    }
} else if (command === 'list') {
    const allNotes = notes.getAll();
    console.log(`Showing ${allNotes.length} note(s) found.`);
    allNotes.forEach(note => notes.logNote(note));
} else if (command === 'remove') {
    const title = notes.removeNote(argv.title);
    const log = title ? `Note removed.` : 'Note not found.'
    console.log(log);
} else if (command === 'read') {
    const note = notes.getNote(argv.title);
    if (note.length > 0) {
        console.log('Note Found.');
        notes.logNote(note[0]);
    } else {
        console.log('Note not found.')
    }
} else {
    console.log('No command found.');
}