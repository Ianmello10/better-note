<script lang="ts">
	import { useNotes } from '$lib/hooks/useNotes.svelte';
	import { extractImages } from '$lib/editor-utils';
	import GridImages from '$lib/components/grid/GridImages.svelte';
	const allImagesNotes = useNotes();

	const images = extractImages(allImagesNotes.notes);
</script>

<div class="flex h-[calc(100vh-40px)] w-full">
	<GridImages />
</div>
