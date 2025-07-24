import { db } from '$lib/db/db';
import type { Note, NoteType } from '$lib/db/db';
import { liveQuery } from 'dexie';

let notes = $state<Note[]>([]);
let currentNote = $state<Note | null>(null);

liveQuery(() => db.notes.orderBy('updatedAt').reverse().toArray()).subscribe((notesData) => {
	notes = notesData;

	if (currentNote) {
		// Encontra a versão mais recente da nota atual no array de dados.
		const updatedCurrentNote = notesData.find((n) => n.id === currentNote!.id);
		if (updatedCurrentNote) {
			// Atualiza a nota atual se ela ainda existir.
			currentNote = updatedCurrentNote;
		} else {
			// Se a nota atual foi deletada, seleciona a primeira da lista.
			currentNote = notesData[0] || null;
		}
	} else if (notesData.length > 0) {
		// Se não havia nota atual, seleciona a primeira.
		currentNote = notesData[0];
	}
});

async function createNote(type: NoteType, title: string, content?: string) {
	const newNote: Note = {
		id: crypto.randomUUID(),
		type,
		title,
		content: content || '',
		createdAt: new Date(),
		updatedAt: new Date()
	};
	await db.notes.add(newNote);
	currentNote = newNote;
}

async function getNoteById(id: string) {


	const note = await db.notes.get(id);
	if (!note) {
		throw new Error('Note not found');
	}
	currentNote = note;
	return note;

}

async function updateNoteContent(id: string, content: string) {
	await db.notes.update(id, { content, updatedAt: new Date() });
}

async function deleteNote(id: string) {
	await db.notes.delete(id);
	if (currentNote?.id === id) {
		currentNote = notes[0] || null;
	}
}

function changeNote(note: Note) {
	currentNote = note;
}

export function useNotes() {
	return {
		get notes() {
			return notes;
		},
		get currentNote() {
			return currentNote;
		},
		createNote,
		updateNoteContent,
		deleteNote,
		changeNote,
		getNoteById
	};
}
