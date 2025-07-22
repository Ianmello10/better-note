<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor, type Transaction } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import ToolBar from '$lib/components/edtior/toolbar/ToolBar.svelte';
	import type { Note } from '$lib/db';
	import type { useNotes } from '$lib/hooks/useNotes.svelte';
	import { editorStore } from '$lib/store/editor.svelte';

	let { note, notesManager }: { note: Note | null; notesManager: ReturnType<typeof useNotes> } =
		$props();

	let element: HTMLElement;
	// A instância local do editor não precisa ser reativa aqui.
	let editorInstance: Editor | undefined;

	function initializeEditor(content: string) {
		if (element) {
			editorInstance = new Editor({
				element: element,
				extensions: [StarterKit],
				editorProps: {
					attributes: {
						class:
							'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
					}
				},
				content: content,
				onTransaction: ({ transaction }: { transaction: Transaction }) => {
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
		if (note) {
			initializeEditor(note.content || '');
		}
	});

	onDestroy(() => {
		editorInstance?.destroy();
		editorStore.init(null);
	});

	$effect(() => {
		if (note && editorInstance) {
			if (editorInstance.getHTML() !== note.content) {
				editorInstance.commands.setContent(note.content || '', false);
			}
		} else if (note && !editorInstance) {
			initializeEditor(note.content || '');
		}
	});
</script>

{#if editorStore.editor}
	<ToolBar />
{/if}

<div bind:this={element}></div>
