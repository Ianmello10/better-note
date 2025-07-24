<script lang="ts">
	import { ToggleGroup } from '@ark-ui/svelte/toggle-group';

	import { editorStore } from '$lib/store/editor.svelte';
	import { Heading1, Heading2, Italic, Pilcrow, Image } from '@lucide/svelte';
	import { Dropdown, DropdownItem } from '$lib/components/ui/dropdown';

	interface ToolbarItem {
		label: string;
		icon: any;
		value: string;
	}

	const toolbarItems: ToolbarItem[] = [
		{ value: 'heading-1', icon: Heading1, label: 'Título nível 1' },
		{ value: 'heading-2', icon: Heading2, label: 'Título nível 2' },
		{ value: 'italic', icon: Italic, label: 'Itálico' },
		{ value: 'paragraph', icon: Pilcrow, label: 'Parágrafo' },
		{ value: 'image', icon: Image, label: 'Imagem' }
	];

	// Mapeia o estado ativo do editor para o valor do ToggleGroup
	const activeValues = $derived(() => {
		const values = [];
		if (editorStore.isHeadingActive(1)) values.push('heading-1');
		if (editorStore.isHeadingActive(2)) values.push('heading-2');
		if (editorStore.isItalicActive()) values.push('italic');
		if (editorStore.isParagraphActive()) values.push('paragraph');
		return values;
	});

	// Lida com as mudanças de valor do ToggleGroup e atualiza o editor
	const handleValueChange = (details: any) => {
		const { value } = details;
		// Simplificando a lógica, aqui você pode ter uma lógica mais
		// robusta para lidar com a seleção múltipla se necessário.
		const lastSelected = value[value.length - 1];

		switch (lastSelected) {
			case 'heading-1':
				editorStore.toggleHeading(1);
				break;
			case 'heading-2':
				editorStore.toggleHeading(2);
				break;
			case 'italic':
				editorStore.toggleItalic();
				break;
			case 'paragraph':
				editorStore.setParagraph();
				break;
			case 'image':
				editorStore.addImage();
				break;
		}
	};
</script>

<ToggleGroup.Root
	class="section-a mt-4 flex h-8   w-auto gap-x-2"
	role="toolbar"
	aria-label="Formatar texto"
	multiple
	value={activeValues()}
	onValueChange={handleValueChange}
>
	{#each toolbarItems as item}
		<ToggleGroup.Item
			class="h-full"
			value={item.value}
			aria-label={item.label}
			data-tip={item.label}
		>
			<item.icon class="h-4 w-4" />
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>

<style>
</style>
