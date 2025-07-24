<script lang="ts">
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	import { useNotes } from '$lib/hooks/useNotes.svelte'; // Ou seu serviço de notas
	import type { Note } from '$lib/db/db'; // Importe seu tipo de nota
	import Editor from '$lib/components/edtior/Editor.svelte';

	// A função 'load' nos deu o ID, que agora está em 'data.noteId'
	let { data } = $props();
	const notesManager = useNotes();

	let note: Note | null | undefined = $state(undefined);
	let isLoading = $state(true);

	// onMount só executa no NAVEGADOR
	onMount(async () => {
		try {
			// Agora estamos seguros para chamar o Dexie
			const fetchedNote = await notesManager.getNoteById(data.noteId);

			if (!fetchedNote) {
				// Lança um erro 404 se a nota não for encontrada.
				// O SvelteKit mostrará a página de erro.
				throw error(404, 'Note not found');
			}
			note = fetchedNote;
		} catch (err: any) {
			// Captura o erro 404 ou qualquer outro erro do Dexie
			console.error('Failed to load note:', err);
			// Se não for um erro HTTP do SvelteKit, podemos lançar um genérico
			if (err.status !== 404) {
				throw error(500, 'Could not load the note');
			}
			// Se já for um erro do SvelteKit, ele será propagado
			throw err;
		} finally {
			isLoading = false;
		}
	});
</script>

{#if isLoading}
	<p>Loading note...</p>
{:else if note}
	<article>
		<h1>{note.title}</h1>
		<Editor {note} {notesManager} />
		<!-- Renderize o resto dos detalhes da nota -->
	</article>
{:else}
	<!-- Este estado pode não ser alcançado por causa do 'throw error' -->
	<p>Note could not be loaded.</p>
{/if}
