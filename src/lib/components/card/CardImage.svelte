<script lang="ts">
	let { image }: { image: string } = $props();
</script>

<div class="h-auto w-auto">
	<img src={image} alt="" class="h-auto w-full rounded-lg shadow-md" />
</div>
