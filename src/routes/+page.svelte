<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Editor from '$lib/components/edtior/Editor.svelte';
	import { useNotes } from '$lib/hooks/useNotes.svelte';
	import { onMount } from 'svelte';
	import { db } from '$lib/db/db';

	const notesManager = useNotes();

	onMount(async () => {
		const count = await db.notes.count();
		if (count === 0) {
			notesManager.createNote('note', 'First Note', '<p>Welcome to your new note!</p>');
		}
	});
</script>

<Button onclick={() => notesManager.createNote('note', 'New Note')}>New Note</Button>

{#if notesManager.currentNote}
	<Editor note={notesManager.currentNote} {notesManager} />
{:else}
	<p>Select a note to edit or create a new one.</p>
{/if}
