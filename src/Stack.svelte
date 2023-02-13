<script lang="ts">
    
    import { onMount } from "svelte";


    const STACK = [
        {
            name: "Svelte",
            icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png"
        },
        {
            name: "TypeScript",
            icon: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3254474/typescript-icon-icon-md.png"
        },
        {
            name: "C++",
            icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png"
        },
        {
            name: "Java",
            icon: "https://cdn-icons-png.flaticon.com/512/226/226777.png"
        },
        {
            name: "Python",
            icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png"
        },
        {
            name: "Rust",
            icon: "http://rust-lang.org/logos/rust-logo-512x512.png"
        },
    ];

    let thisObj: HTMLElement;
    let animate = false;
    
    let observer = new IntersectionObserver((e) => {
        const entry: IntersectionObserverEntry = e[0];
        if (!entry.isIntersecting) return;
        animate = true;
    }, {
        rootMargin: '0px',
        threshold: 1.0
    });

    onMount(() => {
        observer.observe(thisObj);
    });

</script>

<main style="--stack-size: {STACK.length}; --animation: {animate ? 'running' : 'paused'};" bind:this={thisObj}>

    {#each STACK as tool, i}

    <div style="--index: {STACK.length - i - 1}">
        <img src={tool.icon} alt={tool.name} />
        <span>{tool.name}</span>
    </div>

    {/each}


</main>

<style>

    main {
        position: relative;
        width: 300px;
        height: 400px;
        border: 1px solid cyan;
        border-width: 5px 5px 1px 1px;
        border-radius: 3px;
        margin-bottom: 1em;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        user-select: none;
        -webkit-user-select: none;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: calc(100% + 1px);
        left: calc((100% - (100% / 1.05)) / 2); /* center, so the animation stretches it to 100% */
        width: calc(100% / 1.05);
        height: calc(100% / var(--stack-size));
        padding: 0.5em;
        border: 1px solid cyan;
        border-radius: 0.5em;
        box-sizing: border-box;
        text-align: center;
        
        --box-bottom: calc(var(--index) * 100% / var(--stack-size));

        --fall-duration: 1s;
        --fall-delay: calc(var(--fall-duration) * var(--index));
        --fall-timing: cubic-bezier(0.6, 0, 1, 0.55);

        --bounce-duration: 1s;
        --bounce-delay: calc(var(--fall-delay) + var(--fall-duration));
        --bounce-timing: ease;

        animation-name: fall, bounce;
        animation-duration: var(--fall-duration), var(--bounce-duration);
        animation-delay: var(--fall-delay), var(--bounce-delay);
        animation-fill-mode: forwards, forwards;
        animation-timing-function: var(--fall-timing), var(--fall-timing);
        animation-play-state: var(--animation), var(--animation);
    }

    img {
        height: 100%;
        /* aspect-ratio: 1 / 1; */
    }

    span {
        flex: 1;
    }

    @keyframes fall {
      0% {
        bottom: calc(100% + 1px + var(--box-bottom));
      }
      
      100% {
        bottom: var(--box-bottom);
      }
    }
    
    @keyframes bounce {
      0%  { transform: scale(1.05,.95) translateY(0); }
      14%  { transform: scale(1,1)      translateY(-7px); }
      28%  { transform: scale(1,1)      translateY(0); }
      100% { transform: scale(1,1)      translateY(0); }
    }
    

</style>
