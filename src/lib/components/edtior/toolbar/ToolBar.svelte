<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { editorStore } from '$lib/store/editor.svelte';
</script>

<div class="mt-10 flex flex-wrap gap-1 rounded-lg border border-border/50 bg-muted/30 p-2">
	<Button
		variant="ghost"
		size="sm"
		class="transition-all duration-200 hover:bg-accent/50 active:bg-accent data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
		onclick={() => editorStore.toggleHeading(1)}
		aria-pressed={editorStore.isHeadingActive(1)}
		data-active={editorStore.isHeadingActive(1)}
	>
		<span class="font-bold">H1</span>
	</Button>

	<Button
		variant="ghost"
		size="sm"
		class="transition-all duration-200 hover:bg-accent/50 active:bg-accent data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
		onclick={() => editorStore.toggleHeading(2)}
		aria-pressed={editorStore.isHeadingActive(2)}
		data-active={editorStore.isHeadingActive(2)}
	>
		<span class="font-bold">H2</span>
	</Button>

	<Button
		variant="ghost"
		size="sm"
		class="transition-all duration-200 hover:bg-accent/50 active:bg-accent data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
		onclick={editorStore.toggleItalic}
		aria-pressed={editorStore.isItalicActive()}
		data-active={editorStore.isItalicActive()}
	>
		<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 20l4-16m4 4l4-16M6 20l4-16"
			/>
		</svg>
	</Button>

	<Button
		variant="ghost"
		size="sm"
		class="transition-all duration-200 hover:bg-accent/50 active:bg-accent data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
		onclick={editorStore.setParagraph}
		aria-pressed={editorStore.isParagraphActive()}
		data-active={editorStore.isParagraphActive()}
	>
		<span class="font-normal">P</span>
	</Button>
</div>
