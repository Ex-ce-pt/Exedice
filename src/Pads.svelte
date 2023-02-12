<script lang="ts">
	
	export let parent: HTMLElement;

	const PADS_COUNT = 20;
	
	let posY = -100;
	let listenerSet = false;
	
	$: if (parent != undefined && !listenerSet) {
		parent.addEventListener('mousemove', updatePos);
		listenerSet = true;
	}
	
	const updatePos = (e: MouseEvent): void => {
        const style = getComputedStyle(parent);
        const marginTop = Number(style.marginTop.substring(0, style.marginTop.length - 2));
        const offsetY = e.clientY - parent.getBoundingClientRect().y;
		posY = Math.floor(offsetY / parent.clientHeight * PADS_COUNT);
	}
	
	const clampActivation = (a: number): number => {
		return Math.min(Math.max(a, 0), 1);
	} 
	
	const computeActivation = (i: number, p: number): number => {
		// return i === p ? 1 : 0;

        let d = Math.abs(i - p);
        if (d > 2) {
            d = 9999999;
        }
		return clampActivation(1 / Math.pow(d + 1, 2));
	}
	
</script>

{#each ['left-side', 'right-side'] as clz}

<main
    class={clz}
    style="--pads-count: {PADS_COUNT};"
>

	{#each Array(PADS_COUNT) as _, i}
	
	<div style="--activation: {computeActivation(i, posY)};"></div>
	
	{/each}
	
</main>


{/each}

<style>

	main {
        --width: 0.5em;
        --translate-len: 200%;

		display: grid;
		grid-template-rows: repeat(var(--pads-count), 1fr);
		position: absolute;
		top: 0;
		width: var(--width);
		height: 100%;
	}
	
	.left-side {
		left: 0;
	}
	
	.right-side {
		right: 0;
	}
	
	div {
		background-color: cyan;
		border-radius: var(--width);
	}
	
	.left-side > div {
		transform: translateX(calc(var(--translate-len) * var(--activation)));
		transition: transform 0.2s ease;
	}
	
	.right-side > div {
		transform: translateX(calc(-1 * var(--translate-len) * var(--activation)));
		transition: transform 0.2s ease;
	}
	
</style>
