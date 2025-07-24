<!-- src/lib/components/ui/dropdown/Dropdown.svelte -->
<script lang="ts">
	import { Menu } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import type { Snippet } from 'svelte';

	let {
		children,
		trigger
	}: {
		children: Snippet;
		trigger: Snippet;
	} = $props();
</script>

<Menu.Root>
	<Menu.Trigger>
		{@render trigger()}
	</Menu.Trigger>
	<Portal>
		<Menu.Positioner>
			<Menu.Content
				class="z-50 min-w-32 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
			>
				{@render children()}
			</Menu.Content>
		</Menu.Positioner>
	</Portal>
</Menu.Root>

<style>
	:global([data-scope='menu'][data-part='content']) {
		animation: fadeIn 150ms ease-out;
		transform-origin: var(--ark-menu-transform-origin);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
