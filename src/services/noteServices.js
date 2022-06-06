'use strict'

import Note from '../models/notes.js'

const checkNotesById = async (id) => {
    return await Note.filter((note) => note.id === id).length === 1
}

const getSingleNote = async (id) => {
    return await Note.filter((note) => note.id === id)[0]
}

export default { checkNotesById, getSingleNote }