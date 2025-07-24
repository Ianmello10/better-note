<!-- src/lib/components/edtior/nodes/ImageView.svelte -->
<script lang="ts">
	// Props simplificadas - apenas o que realmente precisamos
	let { node, selected = false }: { node: any; selected?: boolean } = $props();

	// Estado derivado para aplicar estilos quando a imagem é selecionada
	let isSelected = $derived(selected);
</script>

<!-- 
  O wrapper principal. 
  'data-drag-handle' permite que o usuário arraste a imagem para reordená-la.
-->
<div class="image-wrapper group relative my-4 inline-block" data-drag-handle>
	<img
		src={node.attrs.src}
		alt={node.attrs.alt}
		title={node.attrs.title}
		class="block max-h-96 rounded-lg transition-all"
		class:ring-2={isSelected}
		class:ring-primary={isSelected}
		class:ring-offset-2={isSelected}
	/>

	{#if isSelected}
		<div
			class="absolute right-2 bottom-2 rounded-md bg-background/80 p-1 text-xs text-muted-foreground backdrop-blur-sm"
		>
			Imagem Selecionada
		</div>
	{/if}
</div>

<style>
	.image-wrapper {
		/* Impede que o texto flua para dentro do wrapper */
		clear: both;
		display: block;
	}
</style>
