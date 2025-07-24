<script lang="ts">
	import CardNote from '$lib/components/card/CardNote.svelte';
	import { useNotes } from '$lib/hooks/useNotes.svelte';

	const notesManager = useNotes();
</script>

<!-- container fluido + responsivo -->
<div
  class="
  w-[99%]
  mx-auto
    grid gap-4 sm:gap-6
    grid-cols-1 
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5  
    2xl:grid-cols-6  
    auto-rows-min
    px-4
    py-6
    border border-accent rounded-xl bg-card/30 
	my-2
  "
>
  {#each notesManager.notes as note (note.id)}
    <CardNote
      title={note.title}
      content={note.content}
      date={note.createdAt}
      href="/{note.id}"
    />
  {/each}
</div>