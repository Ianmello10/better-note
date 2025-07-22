import type { Editor } from '@tiptap/core';

type Command = {
	title: string;
	command: () => void;
};

const state = $state({
	isOpen: false,
	items: [] as Command[],
	command: null as ((item: Command) => void) | null,
	rect: null as DOMRect | null
});

export const slashCommandStore = {
	get isOpen() {
		return state.isOpen;
	},
	get items() {
		return state.items;
	},
	get rect() {
		return state.rect;
	},
	get command() {
		return state.command;
	},

	open(items: Command[], rect: DOMRect, command: (item: Command) => void) {
		state.items = items;
		state.rect = rect;
		state.command = command;
		state.isOpen = true;
	},

	close() {
		state.isOpen = false;
		state.items = [];
		state.rect = null;
		state.command = null;
	}
};
