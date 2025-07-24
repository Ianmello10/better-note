<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { useNotes } from '$lib/hooks/useNotes.svelte';
	import type { Note } from '$lib/db/db';
	import Editor from '$lib/components/edtior/Editor.svelte';

	// A função 'load' nos deu o ID, que agora está em 'data.noteId'
	let { data } = $props();
	const notesManager = useNotes();

	let note: Note | null | undefined = $state(undefined);
	let isLoading = $state(true);

	// Função para carregar a nota
	async function loadNote(noteId: string) {
		try {
			isLoading = true;
			note = undefined;

			console.log('Carregando nota com ID:', noteId);
			const fetchedNote = await notesManager.getNoteById(noteId);

			if (!fetchedNote) {
				throw error(404, 'Note not found');
			}

			note = fetchedNote;
			console.log('Nota carregada:', fetchedNote);
		} catch (err: any) {
			console.error('Failed to load note:', err);
			if (err.status !== 404) {
				throw error(500, 'Could not load the note');
			}
			throw err;
		} finally {
			isLoading = false;
		}
	}

	// Reage às mudanças do noteId - isso é executado sempre que data.noteId muda
	$effect(() => {
		if (data.noteId) {
			loadNote(data.noteId);
		}
	});
</script>

{#if isLoading}
	<p>Loading note...</p>
{:else if note}
	<div class="mx-auto flex h-full w-[99%] flex-col overflow-hidden rounded-xl border border-accent">
		<div class="mx-auto flex w-full justify-between">
			<h1 class="text-2xl font-bold">{note.type}</h1>
			<input
				type="text"
				bind:value={note.title}
				class="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-primary"
			/>
		</div>
		<h1>{note.title}</h1>
		{#key data.noteId}
			<Editor {note} {notesManager} />
		{/key}
		<!-- Renderize o resto dos detalhes da nota -->
	</div>
{:else}
	<!-- Este estado pode não ser alcançado por causa do 'throw error' -->
	<p>Note could not be loaded.</p>
{/if}
