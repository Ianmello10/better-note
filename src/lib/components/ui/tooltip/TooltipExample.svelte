<script lang="ts">
	import ToolTip from './ToolTip.svelte';
</script>

<!-- Exemplo básico de uso do tooltip -->
<div class="space-y-4 p-8">
	<h2 class="text-lg font-semibold">Exemplos de Tooltip</h2>

	<!-- Exemplo 1: Tooltip básico -->
	<div class="flex gap-4">
		<ToolTip>
			{#snippet children()}
				<button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
					Hover me!
				</button>
			{/snippet}

			{#snippet content()}
				<span>Este é um tooltip básico!</span>
			{/snippet}
		</ToolTip>

		<!-- Exemplo 2: Tooltip com posicionamento personalizado -->
		<ToolTip positioning={{ placement: 'bottom', gutter: 12 }}>
			{#snippet children()}
				<button class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
					Bottom tooltip
				</button>
			{/snippet}

			{#snippet content()}
				<div class="text-center">
					<strong>Tooltip na parte inferior</strong><br />
					Com conteúdo mais rico!
				</div>
			{/snippet}
		</ToolTip>

		<!-- Exemplo 3: Tooltip com delay personalizado -->
		<ToolTip openDelay={500} closeDelay={200}>
			{#snippet children()}
				<button class="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600">
					Slow tooltip
				</button>
			{/snippet}

			{#snippet content()}
				<span>Tooltip com delay personalizado (500ms para abrir, 200ms para fechar)</span>
			{/snippet}
		</ToolTip>
	</div>

	<!-- Exemplo 4: Tooltip em ícones -->
	<div class="flex items-center gap-4">
		<ToolTip positioning={{ placement: 'top' }}>
			{#snippet children()}
				<div
					class="flex h-8 w-8 cursor-help items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
				>
					?
				</div>
			{/snippet}

			{#snippet content()}
				<span>Informação de ajuda</span>
			{/snippet}
		</ToolTip>

		<ToolTip positioning={{ placement: 'right' }}>
			{#snippet children()}
				<div
					class="flex h-8 w-8 cursor-help items-center justify-center rounded-full bg-red-100 hover:bg-red-200"
				>
					!
				</div>
			{/snippet}

			{#snippet content()}
				<span>Aviso importante</span>
			{/snippet}
		</ToolTip>
	</div>

	<!-- Exemplo 5: Tooltip com texto simples -->
	<div class="flex gap-4">
		<ToolTip>
			{#snippet children()}
				<span class="cursor-help text-blue-600 underline">
					Hover aqui para ver mais informações
				</span>
			{/snippet}

			{#snippet content()}
				<span>Informação adicional sobre este texto</span>
			{/snippet}
		</ToolTip>
	</div>
</div>
