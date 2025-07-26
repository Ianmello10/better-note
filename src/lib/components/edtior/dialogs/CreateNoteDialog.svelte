<script lang="ts">
	import { dialogStore } from '$lib/store/dialog.svelte';
	import { Dialog } from '@ark-ui/svelte';
	import { useNotes } from '$lib/hooks/useNotes.svelte';
	import { goto } from '$app/navigation';
	import Input from '$lib/components/ui/input/Input.svelte';
	import type { NoteType } from '$lib/db/db';
	import Tabs from '$lib/components/ui/tabs/Tabs.svelte';

	const notesManager = useNotes();
	let title = $state('');
	let content = $state('');
	let type = $state<NoteType>('note'); // Default type

	const tabs = [
		{ value: 'note', label: 'Note' },
		{ value: 'weblink', label: 'Web Link' },
		{ value: 'book', label: 'Book' }
	];

	async function handleSubmit() {
		if (title.trim()) {
			try {
				const note = await notesManager.createNote(type, title, content);
				console.log('Nota criada:', note);

				title = '';
				content = '';

				dialogStore.close();

				console.log('Navegando para:', `/${note.id}`);
				await goto(`/${note.id}`, {
					replaceState: false,
					noScroll: false,
					keepFocus: false
				});
			} catch (error) {
				console.error('Erro ao criar nota:', error);
			}
		}
	}
</script>

<Dialog.Title class="text-lg font-semibold">Create a new entry</Dialog.Title>
<Dialog.Description class="text-sm text-muted-foreground">
	Choose the type of content you want to create.
</Dialog.Description>

<div class="my-4 flex h-auto w-full flex-col gap-4">
	<Tabs {tabs} bind:defaultValue={type}>
		{#snippet note()}
			<div class="mt-4">
				<Input
					name="note-title"
					label="Title"
					type="text"
					bind:value={title}
					class="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-primary"
					placeholder="Enter note title"
				/>
				<!-- Adicionar campo de conteúdo para 'note' se necessário -->
			</div>
		{/snippet}
		{#snippet weblink()}
			<div class="mt-4">
				<Input
					name="weblink-url"
					label="URL"
					type="text"
					bind:value={title}
					class="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-primary"
					placeholder="Enter web link URL"
				/>
			</div>
		{/snippet}
		{#snippet book()}
			<div class="mt-4">
				<Input
					name="book-title"
					label="Book Title"
					type="text"
					bind:value={title}
					class="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-primary"
					placeholder="Enter book title"
				/>
			</div>
		{/snippet}
	</Tabs>

	<div class="mt-6">
		<button
			class=" w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
			onclick={() => handleSubmit()}
		>
			Create
		</button>
	</div>
</div>
