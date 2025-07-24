<script lang="ts">
	import { Dialog } from '@ark-ui/svelte/dialog';
	import { Collapsible } from '@ark-ui/svelte/collapsible';
	import { Portal } from '@ark-ui/svelte/portal';
	import { ChevronLeft, X } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	type SnippetProps = { isCollapsed: boolean };

	let {
		isMobileOpen = $bindable(),
		isDesktopCollapsed = $bindable(),
		class: className = '',
		children
	}: {
		isMobileOpen: boolean;
		isDesktopCollapsed: boolean;
		class?: string;
		children?: Snippet<[SnippetProps]>;
	} = $props();

	let isDesktopExpanded = $derived(!isDesktopCollapsed);
</script>

<!-- Mobile Sidebar (Drawer) -->
<div class="lg:hidden">
	<Dialog.Root bind:open={isMobileOpen} closeOnInteractOutside>
		<Portal>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<div class="flex items-center justify-between border-b border-sidebar-border p-4">
						<Dialog.Title class="font-semibold">Menu</Dialog.Title>
						<Dialog.CloseTrigger class="rounded-md p-1 hover:bg-sidebar-accent">
							<X class="h-5 w-5" />
						</Dialog.CloseTrigger>
					</div>
					<div class="p-4">
						{#if children}
							{@render children({ isCollapsed: false })}
						{/if}
					</div>
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog.Root>
</div>

<!-- Desktop Sidebar -->
<div class="hidden h-full w-auto lg:block">
	<Collapsible.Root
		class="h-full"
		bind:open={isDesktopExpanded}
		onOpenChange={(details) => (isDesktopCollapsed = !details.open)}
	>
		<aside
			class="mx-auto h-full border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out {className}"
			class:w-64={!isDesktopCollapsed}
			class:w-12={isDesktopCollapsed}
		>
			<div class="flex h-full flex-col">
				<div
					class="flex h-16 items-center border-b border-sidebar-border"
					class:justify-between={!isDesktopCollapsed}
					class:justify-center={isDesktopCollapsed}
					class:px-6={!isDesktopCollapsed}
					class:px-2={isDesktopCollapsed}
				>
					{#if !isDesktopCollapsed}
						<a
							href="/"
							class="flex items-center gap-2 overflow-hidden font-semibold whitespace-nowrap"
						>
							<span>Better Note</span>
						</a>
					{/if}
					<Collapsible.Trigger class="rounded-md p-1 hover:bg-sidebar-accent">
						<ChevronLeft
							class={`h-5 w-5 transition-transform${isDesktopCollapsed ? ' rotate-180' : ''}`}
						/>
					</Collapsible.Trigger>
				</div>

				<nav
					class={`flex flex-col items-center gap-2 overflow-auto  py-4 ${isDesktopCollapsed ? 'justify-items-center' : ''} items-start   font-medium`}
				>
					{#if children}
						{@render children({ isCollapsed: isDesktopCollapsed })}
					{/if}
				</nav>
			</div>
		</aside>
	</Collapsible.Root>
</div>

<style>
	:global([data-scope='dialog'][data-part='backdrop']) {
		position: fixed;
		inset: 0;
		background-color: oklch(0 0 0 / 0.5);
		z-index: 40;
		animation: fadeIn 200ms ease-out;
	}
	:global([data-scope='dialog'][data-part='positioner']) {
		position: fixed;
		top: 0;
		left: 0;
		height: 100dvh;
		width: 100%;
		z-index: 50;
	}
	:global([data-scope='dialog'][data-part='content']) {
		height: 100%;
		width: 280px;
		background-color: var(--sidebar);
		color: var(--sidebar-foreground);
		animation-duration: 250ms;
		animation-timing-function: ease-out;
	}
	:global([data-scope='dialog'][data-part='content'][data-state='open']) {
		animation-name: slideIn;
	}
	:global([data-scope='dialog'][data-part='content'][data-state='closed']) {
		animation-name: slideOut;
	}

	[data-scope='collapsible'][data-part='content'] {
		overflow: hidden;
	}

	@keyframes slideIn {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}
	@keyframes slideOut {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-100%);
		}
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
