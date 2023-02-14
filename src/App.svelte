<script lang="ts" context="module">

	export const isMobileUser = /Android|iPhone/i.test(navigator.userAgent);

</script>

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

<svelte:head>

	<link rel='icon' type='image/png' href='{window.location.href}/favicon.png'>

</svelte:head>

<style>

	main {
		width: 100%;
		min-width: 200px;
		overflow-x: hidden;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		width: 100%;
	}

</style>
