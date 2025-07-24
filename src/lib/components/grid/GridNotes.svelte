<script lang="ts">
	import CardNote from '$lib/components/card/CardNote.svelte';
	import { useNotes } from '$lib/hooks/useNotes.svelte';

	const notesManager = useNotes();
</script>

<!-- container fluido + responsivo -->
<div
	class="
  mx-auto
  grid
    w-[99%] auto-rows-min grid-cols-1
    gap-4
    rounded-xl
    border
    border-accent
    bg-card/30
    px-4
    py-6
    sm:grid-cols-2
    sm:gap-6
    md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
	 
  "
>
	{#each notesManager.notes as note (note.id)}
		<CardNote title={note.title} content={note.content} date={note.createdAt} href="/{note.id}" />
	{/each}
</div>
