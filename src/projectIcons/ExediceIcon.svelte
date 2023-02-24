<script lang="ts">
    
    import ProjectIcon from "./ProjectIcon.svelte";
    import NeoButton from "../NeoButton.svelte";
    import { goTo } from "../App.svelte"

    export let height: string;
    export let iconHeight: string;

</script>

<ProjectIcon {height} >

    <img
        slot="icon"
        src={`${window.location.href}icons/mark neo.svg`}
        alt="Website Icon"
        style="width: {iconHeight}; height: {iconHeight};"
    />

    <div slot="actions">
        <NeoButton
            text="GitHub"
            on:click={() => { goTo('https://github.com/Ex-ce-pt/Exedice') }}
        />
    </div>

</ProjectIcon>

<style>

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }

</style>
