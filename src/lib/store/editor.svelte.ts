import type { Editor } from '@tiptap/core';
import { dialogStore } from './dialog.svelte';
import ImageDialog from '$lib/components/edtior/dialogs/ImageDialog.svelte';

const state = $state({
	editor: null as Editor | null,
	transactionCount: 0
});

export const editorStore = {
	// --- Getters for state ---
	get editor() {
		return state.editor;
	},

	// --- Actions ---
	init(instance: Editor | null) {
		state.editor = instance;
	},
	update() {
		state.transactionCount++;
	},

	// --- Getters for active states ---
	isHeadingActive(level: 1 | 2) {
		if (state.transactionCount && state.editor) {
			return state.editor.isActive('heading', { level });
		}
		return false;
	},
	isItalicActive() {
		if (state.transactionCount && state.editor) {
			return state.editor.isActive('italic');
		}
		return false;
	},
	isParagraphActive() {
		if (state.transactionCount && state.editor) {
			return state.editor.isActive('paragraph');
		}
		return false;
	},

	// --- Commands ---
	toggleHeading(level: 1 | 2) {
		state.editor?.chain().focus().toggleHeading({ level }).run();
	},
	toggleItalic() {
		state.editor?.chain().focus().toggleItalic().run();
	},
	setParagraph() {
		state.editor?.chain().focus().setParagraph().run();
	},
	addImage() {
		dialogStore.open(ImageDialog, {
			onSelect: (src: string) => {
				if (src) {
					state.editor?.chain().focus().setImage({ src }).run();
				}
			}
		});
	},
	toggleBulletList() {
		state.editor?.chain().focus().toggleBulletList().run();
	},
	toggleNumberedList() {
		state.editor?.chain().focus().toggleOrderedList().run();
	},
	addHorizontalRule() {
		state.editor?.chain().focus().setHorizontalRule().run();
	}
};
