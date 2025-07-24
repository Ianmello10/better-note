<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import AppSideBar from '$lib/components/sidebar/AppSideBar.svelte';
	import Dialog from '$lib/components/ui/dialog/Dialog.svelte';
	import { goto } from '$app/navigation';
	import { Book, Home, Tags, Images } from '@lucide/svelte';
	import { ToggleGroup } from '@ark-ui/svelte';
	import { page } from '$app/state';

	let { children } = $props();

	let isMobileOpen = $state(false);
	let isDesktopCollapsed = $state(false);

	interface NavItem {
		path: string;
		label: string;
		icon: any;
	}

	export const navItems: NavItem[] = [
		{ path: '/', label: 'All Notes', icon: Home },
		{ path: '/books', label: 'Books', icon: Book },
		{ path: '/tags', label: 'Tags', icon: Tags },
		{ path: '/images-note', label: 'Images', icon: Images }
	];

	const activePath = $derived(page.url.pathname);

	function handleNavChange(details: { value: string[] }) {
		const newPath = details.value[0];
		if (newPath) {
			goto(newPath);
			isMobileOpen = false;
		}
	}
</script>

<ModeWatcher />
<Dialog />

<main class="flex h-screen w-full overflow-hidden bg-background">
	<AppSideBar bind:isMobileOpen bind:isDesktopCollapsed>
		{#snippet children({ isCollapsed })}
			<ToggleGroup.Root
				class={`flex w-full flex-col gap-1 text-sm ${isCollapsed ? 'px-2' : 'px-3'}`}
				aria-label="Navegação Principal"
				value={[activePath]}
				onValueChange={handleNavChange}
			>
				{#each navItems as item}
					<ToggleGroup.Item
						value={item.path}
						class={`flex w-full items-center gap-2 py-2 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
						title={item.label}
					>
						<item.icon class="h-4 w-4" />
						{#if !isCollapsed}
							<span class="whitespace-nowrap">{item.label}</span>
						{/if}
					</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>
		{/snippet}
	</AppSideBar>

	<section class="mx-auto h-full w-full overflow-hidden py-2">
		{@render children?.()}
	</section>
</main>
