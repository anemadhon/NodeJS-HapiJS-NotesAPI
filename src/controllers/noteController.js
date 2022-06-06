'use strict'

import { nanoid } from 'nanoid'
import Notes from '../models/notes.js'
import noteService from '../services/noteServices.js'
import generalService from '../services/generalServices.js'

const index = async (req, res) => {
	return await generalService.apiResponse(res, 200, 'index', { notes: Notes })
}

const store = async (req, res) => {
	const id = nanoid(16)

	const createdAt = new Date().toISOString
	const updatedAt = createdAt

	const { title, tags, body } = req.payload

	const fromPayload = { title, tags, body }
	const newPost = { id, ...fromPayload, createdAt, updatedAt }

	Notes.push(newPost)

	const isNotesCreated = await noteService.checkNotesById(id)

	if (!isNotesCreated) {
		return await generalService.apiResponse(res, 500, 'Catatan gagal ditambahkan')
	}
    
	return await generalService.apiResponse(res, 201, 'Catatan berhasil ditambahkan', { noteId: id })
}

async function show(req, res) {
	const id = req.params.id
	const isNoteExist = await noteService.checkNotesById(id)

	if (!isNoteExist) {
		return await generalService.apiResponse(res, 404, 'Catatan tidak ditemukan')
	}
    
	return await generalService.apiResponse(res, 200, 'show', { note: await noteService.getSingleNote(id) })
}

async function update(req, res) {
	const id = req.params.id
	const isNoteExist = await noteService.checkNotesById(id)

	if (!isNoteExist) {
		return await generalService.apiResponse(res, 404, 'Catatan tidak ditemukan')
	}

	const existingNote = await noteService.getSingleNote(id)
	const { title, tags, body } = req.payload
	const noteToUpdate = {
		id: existingNote.id, 
		createdAt: existingNote.createdAt,
		updatedAt: new Date().toISOString, 
		title: title ?? existingNote.title,
		tags: tags ?? existingNote.tags,
		body: body ?? existingNote.body
	}

	const noteIndex = Notes.findIndex((note) => note.id === id)

	Notes[noteIndex] = noteToUpdate
    
	return await generalService.apiResponse(res, 200, 'Catatan berhasil diperbarui')
}

async function remove(req, res) {
	const id = req.params.id
	const isNoteExist = await noteService.checkNotesById(id)

	if (!isNoteExist) {
		return await generalService.apiResponse(res, 404, 'Catatan tidak ditemukan')
	}

	const noteIndex = Notes.findIndex((note) => note.id === id)

	Notes.splice(noteIndex, 1)

	return await generalService.apiResponse(res, 200, 'Catatan berhasil dihapus')
}

export default { index, store, show, update, remove }