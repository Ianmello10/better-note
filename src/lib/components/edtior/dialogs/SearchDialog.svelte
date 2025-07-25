<script lang="ts">
	import { Search, FileText } from '@lucide/svelte';
	import { useSearch } from '$lib/hooks/useSearch.svelte';
	import { dialogStore } from '$lib/store/dialog.svelte';
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { Dialog } from '@ark-ui/svelte/dialog';

	const searchManager = useSearch();
	let query = $state('');
	let inputElement: HTMLInputElement;

	// Getter reativo para os resultados
	const results = $derived(searchManager.results);

	// Foca no input assim que o diálogo é montado
	onMount(() => {
		inputElement?.focus();
	});

	// Cleanup quando o componente é destruído
	onDestroy(() => {
		searchManager.cleanup();
	});

	// Executa a busca sempre que o texto da query mudar
	$effect(() => {
		searchManager.search(query);
	});

	function handleSelect(noteId: string) {
		dialogStore.close();
		goto(`/${noteId}`);
	}
</script>

<div class="flex flex-col gap-4">
	<Dialog.Title class="text-lg font-semibold">Search Notes</Dialog.Title>
	<Dialog.Description class="text-sm text-muted-foreground">
		Search by title, content, type, or tag.
	</Dialog.Description>
	<!-- Input de Busca -->
	<div class="relative">
		<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
		<input
			bind:this={inputElement}
			type="text"
			bind:value={query}
			placeholder="Search by title, content, type, or tag..."
			class="w-full rounded-md border border-input bg-transparent py-2 pr-4 pl-10 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
		/>
	</div>

	<!-- Lista de Resultados -->
	<!-- Debug: mostra estado atual -->
	<div class="text-xs text-muted-foreground">
		Query: "{query}" | Results: {results.length}
	</div>

	{#if query && results.length > 0}
		<ul class="max-h-[400px] overflow-y-auto border-t border-border">
			{#each results as result (result.item.id)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<li
					class="mt-2 cursor-pointer rounded-md p-3 transition-colors hover:bg-accent"
					onclick={() => handleSelect(result.item.id)}
				>
					<div class="flex items-center gap-3">
						<FileText class="h-5 w-5 text-muted-foreground" />
						<div class="flex flex-col">
							<span class="font-medium">{result.item.title}</span>
							<span class="line-clamp-1 text-xs text-muted-foreground">
								{@html result.item.content || 'No content'}
							</span>
							<span class="text-xs text-blue-500">Score: {result.score?.toFixed(2)}</span>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{:else if query && results.length === 0}
		<div class="flex h-24 items-center justify-center text-sm text-muted-foreground">
			No results found for "{query}".
		</div>
	{/if}
</div>
