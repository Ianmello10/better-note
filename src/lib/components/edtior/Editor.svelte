<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	import ToolBar from '$lib/components/edtior/toolbar/ToolBar.svelte';
	import type { Note } from '$lib/db/db';
	import type { useNotes } from '$lib/hooks/useNotes.svelte';
	import { editorStore } from '$lib/store/editor.svelte';

	import { SlashCommand } from '$lib/tiptap/extensions/slashCommand';
	import SlashCommandList from './slashcommand/SlashCommandList.svelte';
	import type { NodeViewProps } from '@tiptap/core';
	import { CustomImage } from '$lib/tiptap/extensions/CustomImage'; // ✅ Importamos nossa extensão customizada

	let { note, notesManager }: { note: Note | null; notesManager: ReturnType<typeof useNotes> } =
		$props();

	let element: HTMLElement;
	let editorInstance: Editor | undefined;

	function initializeEditor(content: string) {
		if (element) {
			editorInstance = new Editor({
				element: element,

				extensions: [StarterKit.configure({}), SlashCommand, CustomImage],
				editorProps: {
					attributes: {
						class:
							'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none w-full   max-w-none mx-auto    min-h-screen '
					}
				},
				content: content,
				onTransaction: ({ transaction }: { transaction: any }) => {
					editorStore.update();

					if (note && editorInstance && transaction.docChanged) {
						notesManager.updateNoteContent(note.id, editorInstance.getHTML());
					}
				}
			});

			editorStore.init(editorInstance);
		}
	}

	onMount(() => {
		// Aguarda o próximo tick para garantir que o elemento esteja renderizado
		setTimeout(() => {
			if (note && element && !editorInstance) {
				initializeEditor(note.content || '');
			}
		}, 0);
	});

	onDestroy(() => {
		editorInstance?.destroy();
		editorStore.init(null);
	});

	$effect(() => {
		if (note && element && !editorInstance) {
			// Inicializa o editor se ainda não foi criado
			initializeEditor(note.content || '');
		} else if (note && editorInstance) {
			// Atualiza o conteúdo se necessário
			if (editorInstance.getHTML() !== note.content) {
				editorInstance.commands.setContent(note.content || '', { emitUpdate: false });
			}
		} else if (!note && editorInstance) {
			// Remove o editor se não há nota
			editorInstance.destroy();
			editorInstance = undefined;
			editorStore.init(null);
		}
	});
</script>

<div class="relative w-full">
	{#if editorStore.editor}
		<ToolBar />
	{/if}
	<SlashCommandList />
	<div class="relative w-full" bind:this={element}></div>
</div>
