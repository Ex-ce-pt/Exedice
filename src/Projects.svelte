<script lang="ts" context="module">

    interface ProjectData {
        iconPath?: string,
        title: string,
        desc: string
    }

</script>

<script lang="ts">

    const PROJECTS: ProjectData[] = [
        {
            iconPath: "",
            title: "My website",
            desc: "This is the website you're currently on! Made with Svelte."
        },
        {
            iconPath: "",
            title: "GravityWarp",
            desc: "A nice little shader playground. Shows how gravity distords space. (I'm not a physicist!)"
        }
    ];

    let currentProjectIndex = 0;

    const previous = (): void => {
        if (currentProjectIndex === 0) {
            currentProjectIndex = PROJECTS.length - 1;
        } else {
            currentProjectIndex -= 1;
        }
    }

    const next = (): void => {
        currentProjectIndex = (currentProjectIndex + 1) % PROJECTS.length;
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

    <section>
        <span>To Be Updated...</span>

    </section>

</main>

<style>

    main {
        display: grid;
        grid-template-rows: 1em 1em 1fr;
        width: 75%;
        aspect-ratio: 1 / 1;
        margin: auto;
        border: 1px solid cyan;
        border-radius: 1em;
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
    }

    button:hover {
        background-color: rgba(255, 255, 255, 0.5);
    }

    section {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media screen and (max-width: 1000px) {
        main {
            width: 90%;
            aspect-ratio: 1 / 1.5;
        }
    }

</style>
