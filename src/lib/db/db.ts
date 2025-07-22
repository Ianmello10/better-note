import Dexie, { type EntityTable } from 'dexie';

export type NoteType = 'note' | 'weblink' | 'image' | 'book';
export type BookPropertyType = 'text' | 'number' | 'date';

export interface Note {
	id: string;
	type: NoteType;
	title: string;
	content?: string;
	createdAt: Date;
	updatedAt: Date;
	coverImage?: string;
	icon?: string;
	url?: string;
	description?: string;
}

export interface BookProperty {
	id: string;
	noteId: string;
	key: string;
	value: string | number | Date;
	type: BookPropertyType;
}

export interface Tag {
	id: string;
	name: string;
	color?: string;
}

export interface NoteTag {
	noteId: string;
	tagId: string;
}

export class NoteTakingDB extends Dexie {
	notes!: EntityTable<Note, 'id'>;
	tags!: EntityTable<Tag, 'id'>;
	noteTags!:  EntityTable<NoteTag, "noteId" | "tagId">
	bookProperties!: EntityTable<BookProperty, 'id'>;

	constructor() {
		super('NoteTakingDB');
		this.version(2).stores({
			notes: 'id, title, type, createdAt, updatedAt',
			tags: 'id, name',
			noteTags: '[noteId+tagId], noteId, tagId',
			bookProperties: 'id, &[noteId+key], noteId'
		});
	}
}

export const db = new NoteTakingDB();
