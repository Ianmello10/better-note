import { editorStore } from '$lib/store/editor.svelte';
import { slashCommandStore } from '$lib/store/slashCommand.svelte';

export const suggestion = {
	items: ({ query }: { query: string }) => {
		const commands = [
			{
				title: 'Heading 1',
				command: () => editorStore.toggleHeading(1)
			},
			{
				title: 'Heading 2',
				command: () => editorStore.toggleHeading(2)
			},
			{
				title: 'Italic',
				command: () => editorStore.toggleItalic()
			},
			{
				title: 'Paragraph',
				command: () => editorStore.setParagraph()
			},
			{
				title: 'Image',
				command: () => editorStore.addImage()
			},
			{
				title: 'Bulleted List',
				command: () => editorStore.toggleBulletList()
			},
			{
				title: 'Numbered List',
				command: () => editorStore.toggleNumberedList()
			},
			{
				title: 'Horizontal Rule',
				command: () => editorStore.addHorizontalRule()
			}
		].filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()));

		return commands;
	},

	render: () => {
		return {
			onStart: (props: any) => {

				const command = (item: any) => {
					// 1. PRIMEIRO, delete o texto do comando (ex: "/italic").
					props.editor.chain().focus().deleteRange(props.range).run();
					// 2. DEPOIS, execute o comando. Para 'Italic', isso ativará
					//    a formatação para o próximo texto a ser digitado.
					item.command();
				};
				slashCommandStore.open(props.items, props.clientRect(), command);
			},

			onUpdate: (props: any) => {

				const command = (item: any) => {
					// Mesma lógica do onStart
					props.editor.chain().focus().deleteRange(props.range).run();
					item.command();
				};
				slashCommandStore.open(props.items, props.clientRect(), command);
			},

			onExit: () => {
				slashCommandStore.close();
			},

			onKeyDown: (props: any) => {
				// Esta parte pode permanecer a mesma.
				if (slashCommandStore.isOpen) {
					return false;
				}
				return false;
			}
		};
	}
};