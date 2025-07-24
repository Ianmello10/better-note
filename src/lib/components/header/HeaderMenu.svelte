<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft, ArrowRight, Ellipsis } from '@lucide/svelte';
	import ToolTip from '$lib/components/ui/tooltip/ToolTip.svelte';

	function goBack() {
		history.back();
	}
	function goForward() {
		history.forward();
	}

	//const currentPage = page.url.pathname;
	let pageTitle = $state('');

	function verifyPathName(currentPage: string) {
		switch (currentPage) {
			case '/':
				pageTitle = 'Notes';
				break;
			case '/images-note':
				pageTitle = 'Images Note';
				break;
			case '/books':
				pageTitle = 'Books';
				break;
			default:
				pageTitle = 'Unknown'; // Ou qualquer valor padrão desejado
				break;
		}
	}

	$effect(() => {
		// Acesse page.url.pathname diretamente aqui
		verifyPathName(page.url.pathname);
		// Opcional: adicione um console.log para debug
		// console.log('Pathname changed to:', page.url.pathname);
	});
</script>

<div class="mx-auto flex h-9 w-[99%] items-center justify-between px-2">
	<div class="flex items-center gap-x-2">
		<ToolTip>
			{#snippet children()}
				<button onclick={goBack} class="cursor-pointer p-2">
					<ArrowLeft class="h-3.5 w-3.5" />
				</button>
			{/snippet}

			{#snippet content()}
				<span class="text-xs">Navigate back</span>
			{/snippet}
		</ToolTip>

		<ToolTip>
			{#snippet children()}
				<button onclick={goForward} class="cursor-pointer p-2">
					<ArrowRight class="h-3.5 w-3.5" />
				</button>
			{/snippet}

			{#snippet content()}
				<span class="text-xs">Navigate forward</span>
			{/snippet}
		</ToolTip>

		<span class="pl-1 text-sm text-foreground">{pageTitle}</span>
	</div>

	<ToolTip>
		{#snippet children()}
			<button class="p-2">
				<Ellipsis class="h-3.5 w-3.5" />
			</button>
		{/snippet}

		{#snippet content()}
			<span>Este é um tooltip básico!</span>
		{/snippet}
	</ToolTip>
</div>
