<script lang="ts">
	import { useNotes } from '$lib/hooks/useNotes.svelte';
	import { extractImages } from '$lib/editor-utils';
	import CardImage from '../card/CardImage.svelte';
	const notesManager = useNotes();

	const images = extractImages(notesManager.notes);

	console.log('Extracted Images:', images); // For debugging purposes
</script>

<!-- container fluido + responsivo -->
<div
	class="
    mx-auto
    grid w-[99%] auto-rows-min
    grid-cols-1
    gap-4
    rounded-xl
    border
    border-accent
    bg-card/30
    px-4
    py-6
    sm:grid-cols-2
    sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
	2xl:grid-cols-6
  "
>
	{#if images.length > 0}
		{#each images as image}
			<CardImage {image} />
		{/each}
	{:else}
		<p class="text-center text-gray-500">No images found.</p>
	{/if}
</div>
