<script lang="ts">
	let { children } = $props();
</script>

<buton class="box-content h-auto w-auto p-2">
	{@render children?.()}
</buton>
