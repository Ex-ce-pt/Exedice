<script lang="ts">
	
    import NavBar from "./NavBar.svelte";
    import Header from "./Header.svelte";
    import Pads from "./Pads.svelte";
    import SelfIntroduction from "./SelfIntroduction.svelte";
	
	let content: HTMLElement;

</script>

<main>

	<NavBar />

	<Header />

	<div class="content" bind:this={content}>
		<Pads parent={content} />
		<SelfIntroduction />
	</div>

</main>

<style>

	main {
		width: 100%;
		min-width: 600px;
		overflow-x: hidden;
	}

	.content {
		position: relative;
		width: 100%;
	}

</style>
