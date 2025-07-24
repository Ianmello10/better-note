import type { NoteType } from '$lib/db/db';

let noteType = $state<NoteType>('note');

export const typeNoteStore = () => {
	return {
		get noteType() {
			return noteType;
		},
		set noteType(newType: NoteType) {
			noteType = newType;
		}
	};
};
