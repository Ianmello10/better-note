<!-- src/lib/components/ui/tabs/Tabs.svelte -->
<script lang="ts">
	import { Tabs } from '@ark-ui/svelte/tabs';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	type TabsValue = {
		value: string;
		label: string;
		disabled?: boolean;
	};

	interface TabsProps {
		class?: string | undefined | null;
		tabs: TabsValue[];
		defaultValue?: string;
		[key: string]: any;
	}

	let { class: className, tabs = [], defaultValue = $bindable(), ...slots }: TabsProps = $props();
</script>

<Tabs.Root bind:value={defaultValue} class={cn('w-full', className)}>
	<Tabs.List>
		{#each tabs as tab}
			<Tabs.Trigger value={tab.value} disabled={tab.disabled}>
				{tab.label}
			</Tabs.Trigger>
		{/each}
		<Tabs.Indicator style="width: var(--width);  " />
	</Tabs.List>
	{#each tabs as tab}
		<Tabs.Content value={tab.value}>
			{#if slots[tab.value]}
				{@render slots[tab.value]?.()}
			{/if}
		</Tabs.Content>
	{/each}
</Tabs.Root>
