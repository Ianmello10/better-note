<!-- src/lib/components/ui/dialog/Dialog.svelte -->
<script lang="ts">
	import { Dialog as ArkDialog } from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { X } from '@lucide/svelte';
	import { dialogStore } from '$lib/store/dialog.svelte';
</script>

<ArkDialog.Root
	closeOnEscape={true}
	open={dialogStore.isOpen}
	onOpenChange={(e) => !e.open && dialogStore.close()}
>
	<Portal>
		<ArkDialog.Backdrop class="fixed inset-0 z-50 bg-black/80" />

		<ArkDialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center">
			<ArkDialog.Content
				class="z-50 grid w-full max-w-lg gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full"
			>
				{#if dialogStore.component}
					<dialogStore.component {...dialogStore.props} />
				{/if}
			</ArkDialog.Content>
		</ArkDialog.Positioner>
	</Portal>
</ArkDialog.Root>
