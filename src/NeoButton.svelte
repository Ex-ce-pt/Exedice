<script lang="ts">

    export let text: string = "?";
    export let styles: string = "";
    export let onClick: () => void = undefined;
    export let special: boolean = false;
    export let selected: boolean = false;
    export let inactive: boolean = false;

</script>

<button
    style="{styles}"
    data-special={special}
    data-selected={selected}
    data-inactive={inactive}
    on:click={onClick ?? (() => {})}
>{text}</button>

<style>
    
    @import "https://fonts.googleapis.com/css2?family=Anton";

    button {
        --standard-color: rgb(0, 225, 255);
        --special-color: rgb(255, 242, 0);

        margin: 3px;
        padding: 0.2em;
        border-width: 0.4em;
        border-style: solid;
        text-align: center;
        text-transform: uppercase;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-family: Anton, sans-serif;
        font-weight: 1000;
        font-size: 18px;
        cursor: pointer;
        transition: color ease,
                    background-color ease,
                    border-bottom-width ease
                    0.2s;
    }
    
    button[data-special="false"][data-selected="false"][data-inactive="false"] {
        color: var(--standard-color);
        background-color: black;
        border-color: var(--standard-color);
    }
    
    button[data-special="false"][data-selected="true"][data-inactive="false"] {
        color: black;
        background-color: var(--standard-color);
        border-color: var(--standard-color);
        text-shadow: white 2px 2px 1px;
    }
    
    button[data-special="true"][data-selected="false"][data-inactive="false"]{
        color: var(--special-color);
        background-color: black;
        border-color: var(--special-color);
    }
    
    button[data-special="true"][data-selected="true"][data-inactive="false"] {
        color: black;
        background-color: var(--special-color);
        border-color: var(--special-color);
        text-shadow: white 2px 2px 1px;
    }

    button[data-special][data-selected][data-inactive="true"] {
        color: grey;
        background-color: black;
        border-color: grey;
    }

    button:hover {
        border-bottom-width: 0.6em;
    }

</style>