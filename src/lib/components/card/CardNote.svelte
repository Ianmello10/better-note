<script lang="ts">
	import type { Tag } from '$lib/db/db';
	import { extractTextPreview } from '$lib/editor-utils';

	let {
		title,
		content,
		date,
		tags,
		href = ''
	}: {
		title: string;
		content?: string;
		date: Date;
		tags?: Tag[];
		href?: string;
		class?: string;
	} = $props();

	const formattedDate = new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}).format(date);

	// Extrai preview do texto limpo
	const textPreview = extractTextPreview(content, 120);
</script>

<!--
O elemento raiz é uma 'a' se 'href' for fornecido, caso contrário, é uma 'article'.
Isso torna o card semanticamente correto e clicável quando necessário.
-->
{#if href}
	<a
		{href}
		class="block rounded-lg border-[1px] border-muted bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
	>
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="text-lg leading-none font-semibold tracking-tight">{title}</h3>
			<p class="text-sm text-muted-foreground">{formattedDate}</p>
		</div>
		<div class="p-6 pt-0">
			<p class="line-clamp-3 text-sm text-muted-foreground">{textPreview}</p>
		</div>
		{#if tags && tags.length > 0}
			<div class="flex items-center p-6 pt-0">
				<div class="flex flex-wrap gap-2">
					{#each tags as tag}
						<span class="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
							{tag.name}
						</span>
					{/each}
				</div>
			</div>
		{/if}
	</a>
{/if}
