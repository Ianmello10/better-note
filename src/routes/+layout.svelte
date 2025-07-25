<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import AppSideBar from '$lib/components/sidebar/AppSideBar.svelte';
	import Dialog from '$lib/components/ui/dialog/Dialog.svelte';
	import { goto } from '$app/navigation';
	import { Book, Home, Tags, Images, Plus } from '@lucide/svelte';
	import { ToggleGroup } from '@ark-ui/svelte';
	import { page } from '$app/state';

	import CreateNoteDialog from '$lib/components/edtior/dialogs/CreateNoteDialog.svelte';
	import SearchDialog from '$lib/components/edtior/dialogs/SearchDialog.svelte';
	import { dialogStore } from '$lib/store/dialog.svelte';
	import HeaderMenu from '$lib/components/header/HeaderMenu.svelte';

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

	function handleCreateNote() {
		dialogStore.open(CreateNoteDialog, {});
	}

	function handleSearch() {
		dialogStore.open(SearchDialog, {});
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
				<ToggleGroup.Item
					value=""
					class={`mt-2 mb-9 flex w-full cursor-pointer items-center gap-2 rounded-lg border-[1px] border-sidebar-accent bg-muted py-2 transition-colors hover:bg-muted
					 ${isCollapsed ? 'justify-center' : ''}`}
					title="New Content"
				>
					<Plus class="h-4 w-4" />
					{#if !isCollapsed}
						<button
							type="button"
							class="text-md m-0 cursor-pointer border-none bg-transparent p-0 whitespace-nowrap"
							onclick={handleCreateNote}
							aria-label="Create new content"
						>
							New content
						</button>
					{/if}
				</ToggleGroup.Item>

				<button
					type="button"
					class="text-md m-0 cursor-pointer border-none bg-transparent p-0 whitespace-nowrap"
					onclick={handleSearch}
					aria-label="Create new content"
				>
					Search
				</button>
				{#if !isCollapsed}
					<span class="pb-1 text-xs font-semibold text-muted-foreground">Objects</span>
				{/if}
				{#each navItems as item}
					<ToggleGroup.Item
						value={item.path}
						class={` flex w-full cursor-pointer items-center gap-2 py-2 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
						title={item.label}
					>
						<item.icon class="h-4 w-4" />
						{#if !isCollapsed}
							<span class="text-md whitespace-nowrap">{item.label} </span>
						{/if}
					</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>
		{/snippet}
	</AppSideBar>

	<section class="mx-auto w-full overflow-hidden py-0">
		<HeaderMenu />
		{@render children?.()}
	</section>
</main>
