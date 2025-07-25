<script lang="ts">
	import { useNotes } from '$lib/hooks/useNotes.svelte';
	import { onMount } from 'svelte';
	import { db } from '$lib/db/db';
	import GridNotes from '$lib/components/grid/GridNotes.svelte';

	const notesManager = useNotes();

	onMount(async () => {
		const count = await db.notes.count();
		if (count === 0) {
			notesManager.createNote('note', 'First Note', '<p>Welcome to your new note!</p>');
		}
	});
</script>

<div class="flex h-[calc(100vh-40px)] w-full">
	<GridNotes />
</div>
