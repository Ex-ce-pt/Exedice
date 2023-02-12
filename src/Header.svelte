<main>

    <div class="shade"></div>
    <img src="../mark neo.svg" alt="" />

</main>

<style>

    main {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 75vh;
        isolation: isolate;
        background-color: grey;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url('');
        border-bottom-left-radius: 1em;
        border-bottom-right-radius: 1em;
    }

    .shade {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }
    
    img {
        width: 50%;
        height: 50%;
        z-index: 2;
    }

</style>
