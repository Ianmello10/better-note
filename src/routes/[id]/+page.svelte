<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { useNotes } from '$lib/hooks/useNotes.svelte';
	import type { Note } from '$lib/db/db';
	import Editor from '$lib/components/edtior/Editor.svelte';
	import 'simplebar/dist/simplebar.min.css';
	import SimpleBar from 'simplebar';
	import ResizeObserver from 'resize-observer-polyfill';

	// Polyfill para navegadores mais antigos
	if (typeof window !== 'undefined') {
		window.ResizeObserver = ResizeObserver;
	}

	let { data } = $props();
	const notesManager = useNotes();

	let note: Note | null | undefined = $state(undefined);
	let isLoading = $state(true);

	async function loadNote(noteId: string) {
		try {
			isLoading = true;
			note = undefined;
			const fetchedNote = await notesManager.getNoteById(noteId);
			if (!fetchedNote) {
				throw error(404, 'Note not found');
			}
			note = fetchedNote;
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

	$effect(() => {
		if (data.noteId) {
			loadNote(data.noteId);
		}
	});
</script>

{#if isLoading}
	<div class="flex h-full items-center justify-center">
		<p>Loading note...</p>
	</div>
{:else if note}
	<div
		data-simplebar
		data-simplebar-auto-hide="true"
		class="relative mx-auto h-[calc(100vh-40px)] w-[99%] rounded-xl border border-accent bg-card/30"
	>
		{#key data.noteId}
			<Editor {note} {notesManager} />
		{/key}
	</div>
{/if}

<style>
	/* Garante que o wrapper da simplebar ocupe toda a altura do contêiner */
	:global(.simplebar-wrapper) {
		height: 100%;
		overflow: auto; /* Garante que o overflow seja gerenciado */
	}

	/* Remove padding/margin do contêiner de conteúdo da simplebar */
	:global(.simplebar-content) {
		padding: 0 !important;
		margin: 0 !important;
		height: 100%;
	}

	/* Estiliza a barra de rolagem */
	:global(.simplebar-scrollbar::before) {
		background-color: oklch(43.861% 0.00005 271.152);

		border-radius: 6px;
	}

	/* Estiliza a trilha da barra de rolagem */
	:global(.simplebar-track.simplebar-vertical) {
		width: 10px;
		background-color: transparent;
	}
</style>
