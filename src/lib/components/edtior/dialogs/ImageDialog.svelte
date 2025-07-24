<!-- src/lib/components/editor/dialogs/ImageDialog.svelte -->
<script lang="ts">
	import { Dialog } from '@ark-ui/svelte';
	import { X } from '@lucide/svelte';
	import { dialogStore } from '$lib/store/dialog.svelte';

	let {
		onSelect,
		...rest
	}: {
		onSelect: (src: string) => void;
		[key: string]: any;
	} = $props();

	let imageUrl = $state('');
	let selectedTab = $state('url');

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			onSelect(result);
			dialogStore.close();
		};
		reader.readAsDataURL(file);
	}

	function handleSubmit() {
		if (imageUrl) {
			onSelect(imageUrl);
			dialogStore.close();
		}
	}
</script>

<Dialog.Title class="text-lg font-semibold">Adicionar Imagem</Dialog.Title>
<Dialog.Description class="text-sm text-muted-foreground">
	Adicione uma imagem a partir de uma URL ou faça upload do seu dispositivo.
</Dialog.Description>

<div class="my-4">
	<div class="flex border-b">
		<button
			onclick={() => (selectedTab = 'url')}
			class="-mb-px border-b-2 px-4 py-2 {selectedTab === 'url'
				? 'border-primary text-primary'
				: 'border-transparent text-muted-foreground'}"
		>
			URL
		</button>
		<button
			onclick={() => (selectedTab = 'upload')}
			class="-mb-px border-b-2 px-4 py-2 {selectedTab === 'upload'
				? 'border-primary text-primary'
				: 'border-transparent text-muted-foreground'}"
		>
			Upload
		</button>
	</div>

	<div class="py-4">
		{#if selectedTab === 'url'}
			<form onsubmit={handleSubmit}>
				<label for="imageUrl" class="text-sm font-medium">URL da Imagem</label>
				<input
					id="imageUrl"
					type="url"
					bind:value={imageUrl}
					placeholder="https://example.com/image.png"
					class="mt-2 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
					required
				/>
				<div class="mt-4 flex justify-end">
					<button type="submit" class="rounded-md bg-primary px-4 py-2 text-primary-foreground">
						Adicionar
					</button>
				</div>
			</form>
		{:else if selectedTab === 'upload'}
			<div>
				<label for="fileUpload" class="text-sm font-medium">Selecione o arquivo</label>
				<input
					id="fileUpload"
					type="file"
					onchange={handleFileSelect}
					accept="image/*"
					class="mt-2 w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground"
				/>
			</div>
		{/if}
	</div>
</div>

<Dialog.CloseTrigger class="absolute top-4 right-4">
	<X class="h-4 w-4" />
</Dialog.CloseTrigger>
