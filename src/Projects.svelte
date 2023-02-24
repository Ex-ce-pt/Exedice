<script lang="ts" context="module">
    
    import type { SvelteComponent } from "svelte";
    
    interface ProjectData {
        icon?: typeof SvelteComponent,
        title: string,
        desc: string,
        wip?: boolean
    }
    
    interface AnimationData {
        running: boolean,
        start: number | null,
        duration: number,
        callback?: () => void,
        callbackCalled?: boolean
    }
    
</script>

<script lang="ts">
    
    import { isMobileUser } from "./App.svelte";
    
    import { onMount, tick } from "svelte";
    import ExediceIcon from "./projectIcons/ExediceIcon.svelte";
    import GravityWarpIcon from "./projectIcons/GravityWarpIcon.svelte";
    
    const PROJECTS: ProjectData[] = [
        {
            icon: ExediceIcon,
            title: "My website",
            desc: "This is the website you're currently on! Made with Svelte."
        },
        {
            wip: true,
            icon: GravityWarpIcon,
            title: "GravityWarp",
            desc: "A nice little shader playground. Shows how gravity distords space. (I'm not a physicist!)"
        }
    ];
    const animationCurve = (t: number): number => {
        return Math.pow(Math.cos((t - 1) * Math.PI / 2), 4);
    };

    let mounted: boolean = false;
    let sectionElement: HTMLElement;
    let lastSectionChild: HTMLElement;
    let leftoverVerticalSpace: number = 0;
    let currentProjectIndex = 0;
    let animationData: AnimationData = {
        running: false,
        start: null,
        duration: 1_000
    };

    $: if (currentProjectIndex >= 0 && mounted) {
        (async () => {
            leftoverVerticalSpace = 0;
            await tick();
            leftoverVerticalSpace = calculateLeftoverVerticalSpace();
        })();
    }
    
    const defaultAnimationState = (): void => {
        animationData.running = false;
        animationData.callback = null;
        animationData.callbackCalled = false;
        animationData.start = null;
    }

    const showPrevious = (): void => {
        if (animationData.running) requestAnimationFrame(showPrevious);
        if (animationData.start == null) animationData.start = new Date().getTime();

        let progress = (new Date().getTime() - animationData.start) / animationData.duration;
        if (progress >= 1) {
            progress = 1;
            animationData.running = false;
        }
        progress = animationCurve(1 - progress);
        
        sectionElement.style.transform = `translateX(${progress * -100 * 2 + (progress < 0.5 ? 0 : 200)}%)`;
        
        
        if (progress <= 0.5 && !animationData.callbackCalled && animationData.callback != undefined) {
            animationData.callback();
            animationData.callbackCalled = true;
        }
    }

    const showNext = (): void => {
        if (animationData.running) requestAnimationFrame(showNext);
        if (animationData.start == null) animationData.start = new Date().getTime();
        
        let progress = (new Date().getTime() - animationData.start) / animationData.duration;
        if (progress >= 1) {
            progress = 1;
            animationData.running = false;
        }
        progress = animationCurve(progress);
        
        sectionElement.style.transform = `translateX(${progress * -100 * 2 + (progress < 0.5 ? 0 : 200)}%)`;
        

        if (progress >= 0.5 && !animationData.callbackCalled && animationData.callback != undefined) {
            animationData.callback();
            animationData.callbackCalled = true;
        }
    }

    const startAnimation = (a: () => void, cb: () => void): void => {
        defaultAnimationState();
        animationData.callback = cb;
        animationData.running = true;
        requestAnimationFrame(a);
    }
    
    const previous = (): void => {
        if (animationData.running) return;
        startAnimation(showPrevious, () => {
            if (currentProjectIndex === 0) {
                currentProjectIndex = PROJECTS.length - 1;
            } else {
                currentProjectIndex -= 1;
            }
        });
    }
    
    const next = (): void => {
        if (animationData.running) return;
        startAnimation(showNext, () => {
            currentProjectIndex = (currentProjectIndex + 1) % PROJECTS.length;
        });
    }

    const calculateLeftoverVerticalSpace = (): number => {
        if (lastSectionChild == undefined) return;

        // Last element
        const leTop: number = lastSectionChild.getBoundingClientRect().top;
        const leStyles = getComputedStyle(lastSectionChild);
        const leHeightPxl: string = leStyles.height;
        const leMarginBottomPxl: string = leStyles.marginBottom;
        const leHeight: number = Number(leHeightPxl.substring(0, leHeightPxl.length - 2));
        const leMarginBottom: number = Number(leMarginBottomPxl.substring(0, leMarginBottomPxl.length - 2));

        // Section

        const sTop: number = sectionElement.getBoundingClientRect().top;
        const sStyles = getComputedStyle(sectionElement);
        const sHeightPxl: string = sStyles.height;
        const sHeight: number = Number(sHeightPxl.substring(0, sHeightPxl.length - 2));

        // Calc

        const yOffset = leTop - sTop;
        const leftover = sHeight - leMarginBottom - leHeight - yOffset;

        console.log(leftover);

        return leftover;
    }

    // WARNING: this doesn't trigger rerender!
    window.addEventListener("resize", () => {
        console.log("resize");
        currentProjectIndex = currentProjectIndex;
    });

    onMount(() => {
        mounted = true;
    });

</script>

<main>

    <div class="pos">
        {#each PROJECTS as _, i}
        <span data-selected={i === currentProjectIndex}></span>
        {/each}
    </div>

    <div class="nav">
        <button on:click={previous}>&lt;</button>
        <button on:click={next}>&gt;</button>
    </div>
   
    <section
        style="--leftover-v-space: {leftoverVerticalSpace}px;"
        bind:this={sectionElement}
    >

        <h2 class="{PROJECTS[currentProjectIndex].wip ? 'wip' : ''}">
            {PROJECTS[currentProjectIndex].title}
        </h2>

        <svelte:component
            this={PROJECTS[currentProjectIndex].icon}
            height='50%'
            iconHeight={isMobileUser ? '3em' : '7em'}
        />
        
        <p bind:this={lastSectionChild}>{PROJECTS[currentProjectIndex].desc}</p>

    </section>

</main>

<style>

    main {
        display: grid;
        grid-template-rows: 1em 1em 1fr;
        height: 50vw;
        aspect-ratio: 1 / 1;
        margin: auto;
        border: 1px solid cyan;
        border-radius: 1em;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }

    .pos {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 0.5em;
    }

    .pos > span {
        height: 50%;
        aspect-ratio: 1 / 1;
        border: 1px solid cyan;
        border-radius: 50%;
        transition: background-color 0.2s ease;
    }
    
    .pos > span[data-selected="true"] {
        background-color: cyan;
    }

    .nav {
        display: flex;
        width: 100%;
    }

    button {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 0.5em;
        background-color: transparent;
        color: var(--color-content);
        transition: background-color 0.2s ease;
        user-select: none;
        -webkit-user-select: none;
    }

    button:hover {
        background-color: rgba(255, 255, 255, 0.5);
    }
    
    section {
        --bottom-margin: 1.5em;
        --gap: calc(var(--leftover-v-space) / 2 - var(--bottom-margin));

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: stretch;
        /* width: 100%; */
        /* height: 100%; */
        margin: 1em;
        gap: max(var(--gap), 0px);
        box-sizing: border-box;
    }
    
    section > h2 {
        position: relative;
        font-size: var(--big-font-size);
    }

    section > h2.wip:after {
        content: 'wip';
        position: absolute;
        top: 0;
        right: 0;
        padding: 3px 1em 3px 1em;
        border: 1px solid red;
        color: red;
        text-transform: uppercase;
        transform: translate(125%, 100%) rotate(20deg);
    }
    
    section > p {
        font-size: var(--standard-font-size);
    }
    
    @media screen and (max-width: 1000px) {
        main {
            height: 100vw;
            aspect-ratio: 1 / 1.5;
        }

        section > h2 {
            font-size: var(--standard-font-size);
        }
        
        section > p {
            font-size: var(--very-small-font-size);
        }
    }

</style>
