<script lang="ts" context="module">

    interface ProjectData {
        iconPath?: string,
        title: string,
        desc: string
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

    const PROJECTS: ProjectData[] = [
        {
            iconPath: `${window.location.href}icons/mark neo.svg`,
            title: "My website",
            desc: "This is the website you're currently on! Made with Svelte."
        },
        {
            iconPath: "",
            title: "GravityWarp",
            desc: "A nice little shader playground. Shows how gravity distords space. (I'm not a physicist!)"
        }
    ];
    const animationCurve = (t: number): number => {
        return Math.pow(Math.cos((t - 1) * Math.PI / 2), 4);
    };

    let sectionElement: HTMLElement;
    let currentProjectIndex = 0;
    let animationData: AnimationData = {
        running: false,
        start: null,
        duration: 1_000
    };
    
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
   
    <section bind:this={sectionElement}>

        <h2>{PROJECTS[currentProjectIndex].title}</h2>
        <img src={PROJECTS[currentProjectIndex].iconPath ?? ""} alt={`${PROJECTS[currentProjectIndex].title} logo`} />
        <p>{PROJECTS[currentProjectIndex].desc}</p>

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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: stretch;
        /* width: 100%; */
        /* height: 100%; */
        margin: 1em;
        box-sizing: border-box;
    }

    section > img {
        height: 25%;
        padding: calc(25% / 2) 0 calc(25% / 2) 0;
    }
    
    section > p {
        font-size: var(--very-small-font-size);
    }

    @media screen and (max-width: 1000px) {
        main {
            height: 100vw;
            aspect-ratio: 1 / 1.5;
        }
    }

</style>
