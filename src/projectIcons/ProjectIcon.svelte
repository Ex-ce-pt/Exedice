<script lang="ts">

    export let height: string;

    const ANIMATION_DURATION = 500;

    let actionsContainer: HTMLElement;
    let showActions: boolean = false;
    let animationProgress: number = 0;
    let animationDirection: 'in' | 'out';
    let prevTime: number;

    const toggleExpanded = (): void => {
        showActions = !showActions;

        [animationDirection, animationProgress] = showActions ? ['in', 0] : ['out', 1];
        prevTime = new Date().getTime();
        requestAnimationFrame(animateActions);
    }
    
    const animateActions = (): void => {
        
        // console.log(actionsContainer);
        if (actionsContainer == undefined) return;
        
        const newTime = new Date().getTime();
        const deltaProgress = (newTime - prevTime) / ANIMATION_DURATION;
        prevTime = newTime;
        
        if (animationDirection === 'in') {
            
            animationProgress += deltaProgress;
            if (animationProgress >= 1) {
                animationProgress = 1;
            } else {
                actionsContainer.style.display = 'initial';
                requestAnimationFrame(animateActions);
            }

        } else {

            animationProgress -= deltaProgress;
            if (animationProgress <= 0) {
                animationProgress = 0;
                actionsContainer.style.display = 'none';
            } else {
                requestAnimationFrame(animateActions);
            }

        }

        const eased = Math.pow(Math.sin(animationProgress * Math.PI / 2), 3.5);
        actionsContainer.style.width = `${eased * 50}%`;
        actionsContainer.style.transform = `translateX(${(100 / eased - 100) / 2}%);`;
        actionsContainer.style.opacity = `${eased}`;

	}

</script>

<main style="height: {height};" >

    <div
        class="icon"
        on:click={toggleExpanded}
        on:keydown={() => {}}
    >

        <slot name="icon" />
        
    </div>

    <div
        class="actions"
        style="display: none;"
        bind:this={actionsContainer}
    >

        <slot name="actions" />

    </div>
    
</main>

<style>

    main {
        display: flex;
        align-items: stretch;
        justify-content: center;

        /* display: grid; */
        /* grid-template-columns: 1fr var(--actions-width, 0); */
        width: 100%;
    }
    
    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        transition: transform 0.2s var(--ease-out);
    }
    
    .icon:hover {
        transform: scale(1.15);
    }

</style>
