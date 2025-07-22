<script lang="ts">
	import { slashCommandStore } from '$lib/store/slashCommand.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let selectedIndex = $state(0);
	let menuRef = $state<HTMLElement>();

	function handleKeyDown(event: KeyboardEvent) {
		if (!slashCommandStore.isOpen) return;

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex =
				(selectedIndex + slashCommandStore.items.length - 1) % slashCommandStore.items.length;
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = (selectedIndex + 1) % slashCommandStore.items.length;
		} else if (event.key === 'Enter') {
			event.preventDefault();
			selectItem(selectedIndex);
		}
	}

	function selectItem(index: number) {
		const item = slashCommandStore.items[index];
		if (item && slashCommandStore.command) {
			slashCommandStore.command(item);
			slashCommandStore.close();
		}
	}

	onMount(() => {
		// Este código só roda no navegador
		window.addEventListener('keydown', handleKeyDown, true);
		return () => {
			window.removeEventListener('keydown', handleKeyDown, true);
		};
	});

	$effect(() => {
		// Este código só roda no navegador
		if (browser && slashCommandStore.isOpen && menuRef) {
			const rect = slashCommandStore.rect;
			if (rect) {
				menuRef.style.position = 'fixed';
				menuRef.style.left = `${rect.left}px`;
				// Adiciona window.scrollY para corrigir o posicionamento ao rolar a página
				menuRef.style.top = `${rect.bottom + window.scrollY}px`;
			}
		}
	});
</script>

{#if slashCommandStore.isOpen}
	<div
		bind:this={menuRef}
		class="z-50 min-w-[180px] rounded-md border border-border bg-background p-1 text-foreground shadow-md"
	>
		{#if slashCommandStore.items.length}
			{#each slashCommandStore.items as item, index}
				<button
					class="flex w-full items-center space-x-2 rounded-md p-2 text-left text-sm
          {index === selectedIndex ? 'bg-accent text-accent-foreground' : 'bg-transparent'}"
					onclick={() => selectItem(index)}
				>
					<span>{item.title}</span>
				</button>
			{/each}
		{:else}
			<div class="item p-2 text-sm">No result</div>
		{/if}
	</div>
{/if}
