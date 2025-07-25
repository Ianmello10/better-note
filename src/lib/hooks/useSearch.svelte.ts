import { db, type Note, type Tag, type NoteTag } from '$lib/db/db';
import { liveQuery } from 'dexie';
import Fuse, { type FuseResult } from 'fuse.js';

// Tipagem para o documento de busca, que inclui as tags
type SearchableNote = Note & { tags: Tag[] };

// Configuração do Fuse.js
const fuseOptions = {
	keys: [
		{ name: 'title', weight: 0.4 },
		{ name: 'content', weight: 0.3 },
		{ name: 'type', weight: 0.2 },
		{ name: 'tags.name', weight: 0.1 }
	],
	includeScore: true,
	threshold: 0.4,
	minMatchCharLength: 2
};

export function useSearch() {
	// Estados reativos para os dados brutos do DB
	let notes = $state<Note[]>([]);
	let tags = $state<Tag[]>([]);
	let noteTags = $state<NoteTag[]>([]);
	let searchResults = $state<FuseResult<SearchableNote>[]>([]);

	// Live queries para manter os dados sempre atualizados
	const notesSubscription = liveQuery(() => db.notes.toArray()).subscribe((data) => (notes = data));
	const tagsSubscription = liveQuery(() => db.tags.toArray()).subscribe((data) => (tags = data));
	const noteTagsSubscription = liveQuery(() => db.noteTags.toArray()).subscribe((data) => (noteTags = data));

	// Estado derivado para criar os documentos de busca combinados
	const searchableNotes = $derived(() => {
		const tagMap = new Map(tags.map((tag) => [tag.id, tag]));
		return notes.map((note) => {
			const relatedTagIds = noteTags.filter((nt) => nt.noteId === note.id).map((nt) => nt.tagId);
			const relatedTags = relatedTagIds.map((tagId) => tagMap.get(tagId)).filter(Boolean) as Tag[];
			return {
				...note,
				tags: relatedTags
			} as SearchableNote;
		});
	});

	let fuse = $state(new Fuse<SearchableNote>([], fuseOptions));

	// Efeito para recriar a instância do Fuse quando os dados mudam
	$effect(() => {
		fuse = new Fuse<SearchableNote>(searchableNotes(), fuseOptions);
	});

	function search(term: string) {
		console.log('🔍 Search called with term:', term);
		console.log('📚 Available notes:', notes.length);
		console.log('🏷️ Available tags:', tags.length);
		console.log('🔗 Note-tag relations:', noteTags.length);

		if (!term || term.trim() === '') {
			searchResults = [];
			return;
		}

		const searchableData = searchableNotes();
		console.log('🔍 Searchable notes:', searchableData.length);
		console.log('📋 First note example:', searchableData[0]);

		const results = fuse.search(term);
		console.log('📊 Search results:', results.length);

		searchResults = results;
	}

	function cleanup() {
		notesSubscription?.unsubscribe();
		tagsSubscription?.unsubscribe();
		noteTagsSubscription?.unsubscribe();
	}

	return {
		get results() {
			return searchResults;
		},
		search,
		cleanup
	};
}
