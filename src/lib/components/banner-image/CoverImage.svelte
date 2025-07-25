<script lang="ts">
	let { imageSrc, imageAlt }: { imageSrc?: string; imageAlt?: string } = $props();

	imageSrc = 'https://images.pexels.com/photos/27204149/pexels-photo-27204149.jpeg';
</script>

<div class=" h-auto w-full">
	<img class="  h-70 w-full rounded-t-lg object-cover" src={imageSrc} alt={imageAlt} />
</div>
