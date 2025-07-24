import type { Component } from 'svelte';

type ComponentType = Component<any, any, any>;

type DialogState = {
	isOpen: boolean;
	component: ComponentType | null;
	props: Record<string, unknown>;
};

const state = $state<DialogState>({
	isOpen: false,
	component: null,
	props: {}
});

export const dialogStore = {
	get isOpen() {
		return state.isOpen;
	},
	get component() {
		return state.component;
	},
	get props() {
		return state.props;
	},

	open<T extends Record<string, unknown>>(component: ComponentType, props: T) {
		state.component = component;
		state.props = props;
		state.isOpen = true;
	},

	close() {
		state.isOpen = false;
		// Reset after transition
		setTimeout(() => {
			state.component = null;
			state.props = {};
		}, 200);
	}
};
