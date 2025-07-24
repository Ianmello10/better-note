<script lang="ts">
	import { Tooltip as ArkTooltip } from '@ark-ui/svelte/tooltip';
	import { Portal } from '@ark-ui/svelte/portal';
	import type { Snippet } from 'svelte';
	import type { TooltipRootProps } from '@ark-ui/svelte/tooltip';

	// Criamos uma interface omitindo o id obrigatório
	type Props = Omit<TooltipRootProps, 'id'> & {
		content: Snippet;
		children: Snippet;
		class?: string;
		id?: string; // Tornamos o id opcional
	};

	let {
		id,
		content,
		children,
		// Definimos um valor padrão para 'positioning' para evitar o 'undefined'
		positioning = { placement: 'top', gutter: 1 },
		...rest
	}: Props = $props();

	// Geramos um ID único se não for fornecido
	const tooltipId = id || `tooltip-${Math.random().toString(36).substr(2, 9)}`;
</script>

<!-- Passamos as props diretamente para o componente Ark UI -->
<ArkTooltip.Root id={tooltipId} {positioning} {...rest}>
	<ArkTooltip.Trigger>
		{@render children()}
	</ArkTooltip.Trigger>

	<Portal>
		<ArkTooltip.Positioner>
			<ArkTooltip.Content>
				<ArkTooltip.Arrow>
					<ArkTooltip.ArrowTip />
				</ArkTooltip.Arrow>
				{@render content()}
			</ArkTooltip.Content>
		</ArkTooltip.Positioner>
	</Portal>
</ArkTooltip.Root>

<!-- Os estilos permanecem os mesmos -->
<style>
	:global([data-scope='tooltip'][data-part='content']) {
		background-color: var(--popover, #333);
		color: var(--popover-foreground, white);
		padding: 0.5rem 0.7rem;
		border-radius: var(--radius, 0.375rem);
		font-size: 0.875rem;
		box-shadow: var(--shadow-lg);
		animation: fadeIn 150ms ease-out;
		z-index: 99;
		border: 1px solid var(--popover-border, #444);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px); /* compatibilidade Safari */
	}

	:global([data-scope='tooltip'][data-part='arrow-tip']) {
		fill: var(--popover, #333);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
