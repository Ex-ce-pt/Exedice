<script lang="ts">

    import { onMount } from "svelte"
    import DevSkills from "./Stack.svelte";
    import Projects from "./Projects.svelte";

    let sections: HTMLElement[] = new Array(4);

    let observer = new IntersectionObserver((e) => {
        const entry: IntersectionObserverEntry = e[0];
        if (!entry.isIntersecting) return;
        entry.target.classList.add('animated');
    }, {
        rootMargin: '0px',
        threshold: 0
    });

    onMount(() => {
        sections.forEach((s) => {
            if (s != undefined)
                observer.observe(s);
        });
    });

</script>

<main>

    <p bind:this={sections[0]}>Hi there! I'm Exedice. Glad to see you on my portfolio website!</p>

    <section bind:this={sections[1]}>
        <h2>About me</h2>
        <p>
            I'm just a regular highschooler.
        </p>
        <p>
            I do a variety of different things: I'm a <span class="trait">programmer</span>,
            I try to make <span class="trait">music</span> and draw <span class="trait">pixelart</span> sometimes.
            I'm not very good at it though.
        </p>
        <p>
            I probably have a impostor syndrome. <span class="small">(now read the previous sentence again)</span>
        </p>
        <p>
            I like math and chemistry. Maybe becoming a <span class="trait">bioinformaticists?</span> Who knows?
        </p>
    </section>

    <section class="programming" bind:this={sections[2]}>
        <h2>My programming knowledge</h2>
        <div>

            <div>
                <p>Let's get back to programming, shall we?</p>
                <p>This is quite literally my stack!</p>
                <p>The most used tools are at the top.</p>
            </div>

            <DevSkills />

            <div>
                <p>
                    On top of that, I have also had some experience with
                    <span class="trait">Arduino</span> and <span class="trait">Unity</span>
                </p>
            </div>

        </div>
    </section>

    <section class="projects" bind:this={sections[3]}>
        <h2>Projects I've worked on</h2>

        <Projects />
    </section>
    
</main>

{#if false}
<span class="animated"></span>
{/if}

<style>

    main {
        --vertical-margin: 10em;

        display: flex;
        flex-direction: column;
        width: 75%;
        margin: var(--vertical-margin) 0 var(--vertical-margin) 0;
    }

    main > p {
        text-align: center;
    }

    section {
        margin: var(--vertical-margin) 0 var(--vertical-margin) 0;
    }

    section > h2 {
        text-align: left;
        color: grey;
        margin: 0.5em 0 0.5em 0.2em;
    }

    section > p {
        margin-top: 0.4em;
        margin-bottom: 0.4em;
    }

    p {
        margin: 0.2em;
    }

    .trait {
        font-weight: bold;
    }

    .small {
        font-size: var(--very-small-font-size);
    }

    .programming > div {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .animated {
        animation-name: fade-in;
        animation-duration: 1s;
        animation-timing-function: ease;
        animation-fill-mode: forwards;
    }

    @keyframes fade-in {
        from {
            transform: translateY(50%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @media screen and (max-width: 1000px) {
        .programming > div {
            display: flex;
            flex-direction: column;
            /* align-items: center; */
            row-gap: 2em;
        }
    }

</style>
