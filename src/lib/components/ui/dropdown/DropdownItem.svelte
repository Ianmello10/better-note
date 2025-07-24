<!-- src/lib/components/ui/dropdown/DropdownItem.svelte -->
<script lang="ts">
	import { Menu } from '@ark-ui/svelte';
	import type { Snippet } from 'svelte';

	let { children, ...rest }: { children: Snippet; [key: string]: any } = $props();
</script>

<Menu.Item
	{...rest}
	value={rest.value ?? ''}
	class="relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
>
	{@render children()}
</Menu.Item>
