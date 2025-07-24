<script lang="ts">
	import { dialogStore } from '$lib/store/dialog.svelte';
	import { Dialog } from '@ark-ui/svelte';
	import { useNotes } from '$lib/hooks/useNotes.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import Input from '$lib/components/ui/input/Input.svelte';

	let { ...rest } = $props();

	const notesManager = useNotes();
	let title = $state('');
	let content = $state('');
	async function handleSubmit() {
		if (title.trim()) {
			try {
				const note = await notesManager.createNote('note', title, content);
				console.log('Nota criada:', note);

				title = '';
				content = '';

				dialogStore.close();

				console.log('Navegando para:', `/${note.id}`);
				// Navegação mais robusta que força o recarregamento dos dados
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

<Dialog.Title class="text-lg font-semibold">Create a note</Dialog.Title>
<Dialog.Description class="text-sm text-muted-foreground">
	Add a note title and content.
</Dialog.Description>
<div class="my-4">
	<Input
		name="note-title"
		label="Title"
		type="text"
		bind:value={title}
		class="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-primary"
		placeholder="Enter note title"
	/>
	<button onclick={() => handleSubmit()}>Create Note</button>
</div>
