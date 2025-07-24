<!-- src/lib/components/ui/input/Input.svelte -->
<script lang="ts">
	import { Field } from '@ark-ui/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		name: string;
		label: string;
		value?: string | number;
		error?: string;
		helperText?: string;
		children?: Snippet;
	} & HTMLInputAttributes;

	let { name, label, value = $bindable(), error, helperText, children, ...rest }: Props = $props();
</script>

<Field.Root class="flex flex-col gap-1.5">
	<Field.Label class="text-sm font-medium text-foreground">{label}</Field.Label>
	<Field.Input
		{...rest}
		{name}
		{value}
		oninput={(e) => (value = e.currentTarget.value)}
		class="rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
	/>
	{#if children}
		{@render children()}
	{/if}
	{#if error}
		<Field.ErrorText class="text-sm font-medium text-destructive">{error}</Field.ErrorText>
	{/if}
	{#if helperText}
		<Field.HelperText class="text-sm text-muted-foreground">{helperText}</Field.HelperText>
	{/if}
</Field.Root>
