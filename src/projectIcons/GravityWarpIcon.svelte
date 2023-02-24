<script lang="ts">
    
    import ProjectIcon from "./ProjectIcon.svelte";
    import NeoButton from "../NeoButton.svelte";
    import { goTo } from "../App.svelte";

    export let height: string;
    export let iconHeight: string;

</script>

<ProjectIcon {height} >

    <svg
        slot="icon"
        width="512"
        height="512"
        viewBox="0 0 512 512"
        style="--height: {iconHeight};"
    >
        <rect
            fill="#000000;"
            x="0"
            y="0"
            width="512"
            height="512"
        />
        <path d="M 170.66667,50 V 462" />
        <path d="M 341.33333,50 V 461.99999" />
        <path d="M 50,170.66667 H 462" />
        <path d="M 60,341.33333 H 472" />
    </svg>

    <div slot="actions">
        <NeoButton
            text="GitHub"
            on:click={() => { goTo('') }}
            inactive={true}
            />
            <NeoButton
            text="YouTube"
            on:click={() => { goTo('') }}
            inactive={true}
        />
    </div>

</ProjectIcon>

<style>

    svg {
        width: var(--height);
        height: var(--height);
        border: 1px solid white;
        border-radius: calc(var(--height) / 6) 0 calc(var(--height) / 6) 0;
    }

    svg path {
        stroke: rgb(0, 225, 255);
        stroke-width: 20px;
        stroke-linecap: round;
        stroke-miterlimit: 0;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }

</style>