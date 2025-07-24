<script lang="ts">
	import CardNote from '$lib/components/card/CardNote.svelte';
	import { useNotes } from '$lib/hooks/useNotes.svelte';

	const notesManager = useNotes();
</script>

<div
	class="
   scroll-container
  scrollbar-thin
    scrollbar-thumb-rounded-full
    scrollbar-thumb-accent
    scrollbar-track-transparent
    mx-auto
  
    grid
    w-[99%]
    auto-rows-min
    grid-cols-1 gap-4 overflow-y-auto rounded-xl
     border
     border-accent
    bg-card/30
    px-4 py-6 sm:grid-cols-2 sm:gap-6
    md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
	 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:opacity-0 hover:[&::-webkit-scrollbar]:opacity-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-accent [&::-webkit-scrollbar-track]:bg-transparent
  "
>
	{#each notesManager.notes as note (note.id)}
		<CardNote title={note.title} content={note.content} date={note.createdAt} href="/{note.id}" />
	{/each}
</div>

<style>
</style>
