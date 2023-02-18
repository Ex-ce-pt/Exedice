<script lang="ts">

    export let size: string;

</script>

<svg
   width="512"
   height="512"
   viewBox="0 0 512 512"
   style="--size: {size};"
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

<style>

    svg {
        width: var(--size);
        height: var(--size);
        border: 1px solid white;
        border-radius: calc(var(--size) / 6) 0 calc(var(--size) / 6) 0;
    }

    svg path {
        stroke: rgb(0, 225, 255);
        stroke-width: 20px;
        stroke-linecap: round;
        stroke-miterlimit: 0;
    }

</style>