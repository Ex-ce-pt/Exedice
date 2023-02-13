<script lang="ts">

    let thisObj: HTMLElement;
    let folded: boolean = false;
    let copyStatus: 'success' | 'fail' | 'undef' = 'undef';

    const toggleFold = (): void => {
        folded = !folded;

        const style = getComputedStyle(thisObj);
        const height = style.getPropertyValue('--nav-height');

        thisObj.style.top = folded ? `calc(-${height})` : "0";
    }

    const goTo = (url: string): void => {
        window.location.href = url;
    }

    const copy = (txt: string): void => {
        navigator.clipboard.writeText(txt).then(() => {
            copyStatus = 'success';
        }).catch(() => {
            copyStatus = 'fail';
        });
    }

    setTimeout(toggleFold, 2000);

    // TODO:
    // SoundCloud, Gmail

</script>

<nav bind:this={thisObj}>

    <div class="content">

        <button title="Email" on:click={() => copy("except.dice@gmail.com")}>

        </button>

        <button title="Discord" on:click={() => copy("Exedice#7316")}>
            <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                id="discord-logo"
            >
                <path
                    d="m 64.096087,12.0355 -2.637779,5.36271 c -7.558745,-1.12367 -15.158248,-0.896531 -22.808,0.05282 l -2.68272,-5.394012 C 29.127069,13.248311 20.490937,16.006893 15.39877,18.421448 8.5583951,28.448353 2.7634186,41.325758 0,57.803417 L 0.45916902,75.2063 C 6.5352168,80.296883 21.639148,87.282988 25.772083,87.9645 c 1.638405,-2.032566 4.845834,-7.038163 5.500258,-8.817852 -1.479858,-0.529422 -6.825507,-2.793299 -8.384231,-4.094912 1.365676,-0.997242 1.903109,-1.529965 1.903109,-1.529965 0,0 10.981925,5.778825 25.377393,5.626833 14.395466,-0.15199 25.209355,-5.648355 25.209355,-5.648355 0,0 1.483923,1.223653 1.869893,1.57301 -1.128718,1.069501 -8.454572,4.104694 -8.454572,4.104694 0,0 4.325842,7.92067 5.445549,8.733723 C 79.157425,87.303633 98.572353,77.598989 99.637723,75.174994 99.95929,71.086989 100.24334,63.241967 99.672893,57.803417 98.279502,44.941861 93.346862,30.48537 84.733292,18.425362 78.420626,15.235637 71.471289,13.60935 64.096087,12.0355 Z m 2.66318,31.743874 a 9.1286709,9.9545661 0 0 1 9.128671,9.954567 9.1286709,9.9545661 0 0 1 -9.128671,9.954565 9.1286709,9.9545661 0 0 1 -9.12867,-9.954565 9.1286709,9.9545661 0 0 1 9.12867,-9.954567 z m -33.308316,0.197604 a 9.1286709,9.9545661 0 0 1 9.128671,9.954567 9.1286709,9.9545661 0 0 1 -9.128671,9.954565 9.1286709,9.9545661 0 0 1 -9.12867,-9.954565 9.1286709,9.9545661 0 0 1 9.12867,-9.954567 z"
                />
            </svg>
        </button>

        <button title="GitHub" on:click={() => goTo('https://github.com/Ex-ce-pt')}>
            <svg
                width="512"
                height="512"
                viewBox="0 0 512 512.00002"
                id="github-logo"
            >
                <path
                    d="M 256 0 A 256 256 0 0 0 0 256 A 256 256 0 0 0 192.9668 503.60742 C 192.9313 491.76688 192.79813 447.7772 192.78711 445.0957 C 162.76699 451.85506 147.43723 447.28769 129 441.73242 C 110.56277 436.17716 96.15947 394.10616 91.775391 389.04883 C 87.391311 383.99149 83.750269 380.72636 78.164062 377.24805 C 72.577856 373.76973 62.566838 368.4209 69.318359 363.61719 C 76.069881 358.81347 80.251033 360.37211 96.300781 366.39062 C 121.95556 380.33663 135.1736 415.90656 159.59961 415.92383 C 184.02561 415.94113 193.12109 409.71289 193.12109 409.71289 C 193.12109 409.71289 196.10678 379.71206 208.41797 375.55664 C 201.24817 374.69029 103.62731 370.30774 94.716797 282.64258 C 85.806288 194.97741 118.21484 180.88867 118.21484 180.88867 C 118.21484 180.88867 103.48479 124.31041 124.05469 111.98438 C 146.97997 107.70507 192.49609 138.53125 192.49609 138.53125 C 192.49609 138.53125 222.41382 128.96427 255.98438 129.10352 C 289.55492 129.24276 319.52344 138.51367 319.52344 138.51367 C 319.52344 138.51367 345.98965 109.41146 388.25586 111.3125 C 404.80368 131.31953 393.5 180.10742 393.5 180.10742 C 393.5 180.10742 420.64758 180.06397 415.86328 275.99414 C 411.07898 371.92427 302.46484 375.42969 302.46484 375.42969 C 302.46484 375.42969 309.09244 374.58367 315.70508 395.25391 C 321.44334 413.19094 320.09603 484.12251 319.62305 503.48047 A 256 256 0 0 0 512 256 A 256 256 0 0 0 256 0 z M 261.9668 511.57422 L 250.08789 511.57812 A 256 256 0 0 0 256 512 A 256 256 0 0 0 261.9668 511.57422 z "
                />
           </svg>
        </button>

        <button title="YouTube" on:click={() => goTo('https://www.youtube.com/@ExediceWhyNot')}>
            <svg
               width="100"
               height="100"
               viewBox="0 0 100 100"
               id="youtube-logo"
            >
              <path
                 d="M 15 17.5 C 6.6900083 17.5 0 24.190008 0 32.5 L 0 67.5 C 0 75.809992 6.6900083 82.5 15 82.5 L 85 82.5 C 93.309992 82.5 100 75.809992 100 67.5 L 100 32.5 C 100 24.190008 93.309992 17.5 85 17.5 L 15 17.5 z M 40 35 L 60 50 L 40 65 L 40 35 z "
               />
            </svg>

        </button>

        <button title="GameJolt" on:click={() => goTo('https://gamejolt.com/@Exedice')}>
            <svg
               width="16"
               height="17"
               viewBox="0 0 16 17"
               id="gamejolt-logo"
            >
               <path
                    d="M 4 0 L 4 2 L 3 2 L 3 4 L 2 4 L 2 6 L 1 6 L 1 8 L 0 8 L 0 10 L 6 10 L 6 13 L 5 13 L 5 14 L 4 14 L 4 16 L 5 16 L 5 15 L 6 15 L 6 14 L 7 14 L 7 13 L 8 13 L 8 12 L 9 12 L 9 11 L 10 11 L 10 10 L 11 10 L 11 9 L 12 9 L 12 8 L 13 8 L 13 7 L 14 7 L 14 6 L 15 6 L 15 5 L 12 5 L 12 4 L 13 4 L 13 3 L 14 3 L 14 2 L 15 2 L 15 1 L 16 1 L 16 0 L 4 0 z M 4 16 L 3 16 L 3 17 L 4 17 L 4 16 z M 5 2 L 12 2 L 12 3 L 11 3 L 11 4 L 10 4 L 10 5 L 9 5 L 9 6 L 8 6 L 8 7 L 9 7 L 9 8 L 8 8 L 8 7 L 7 7 L 7 8 L 6 8 L 6 7 L 5 7 L 5 8 L 4 8 L 4 7 L 3 7 L 3.0117188 6 L 3 6 L 3.0117188 5.9980469 L 3.0117188 6 L 4 6 L 4 4 L 5 4 L 5 2 z M 4 6 L 4 7 L 5 7 L 5 6 L 4 6 z M 6 7 L 7 7 L 7 6 L 6 6 L 6 7 z M 10 7 L 11 7 L 11 8 L 10 8 L 10 7 z "
                />
            </svg>
        </button>


    </div>

    <button on:click={toggleFold}></button>

    <div
        class="copy-status"
        data-status={copyStatus}
    >
        {#if copyStatus === 'success'}
        Copied to Clipboard!
        {:else if copyStatus === 'fail'}
        Failed to Copy!
        {/if}
    </div>

</nav>

<style>

    nav {
        --nav-height: 5em;
        --toggle-height: 1em;
        --animation-duration: 0.5s;
	    --ease: cubic-bezier(0, 0.9, 0.6, 1);

        display: grid;
        grid-template-rows: 1fr var(--toggle-height);
        position: fixed;
        top: 0;
        left: 0;
        width: calc(100% - var(--scrollbar-width));
        height: calc(var(--nav-height) + var(--toggle-height));
        background-color: var(--color-bg);
        z-index: 100;
        overflow-x: scroll;
        transition: top var(--animation-duration) var(--ease);
    }

    nav::-webkit-scrollbar {
        display: none;
    }

    nav > button {
        width: 100%;
        height: var(--toggle-height);
        background-color: var(--color-shaded);
    }

    .content {
        display: flex;
        align-items: center;
        height: var(--nav-height);
    }

    .content > button {
        height: 50%;
        aspect-ratio: 1 / 1;
        padding: 0;
        margin: 0.5em;
        background-color: transparent;
        border: none;
    }

    button > svg {
        width: 100%;
        height: 100%;
        stroke: none;
        fill: var(--color-shaded);
        transition: fill 0.2s ease;
    }

    button:hover > svg {
        fill: cyan;
    }
    
    button {
        cursor: pointer;
    }

    .copy-status {
        position: absolute;
        top: -50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 7px;
        border: 3px solid green;
        border-radius: 1em;
        background-color: var(--color-bg);
        font-size: var(--very-small-font-size);
        font-weight: bold;
    }

    .copy-status[data-status="success"] {
        color: green;
    }

    .copy-status[data-status="fail"] {
        color: red;
    }

    .copy-status[data-status="success"],
    .copy-status[data-status="fail"] {
        animation-name: show-copy-status;
        animation-duration: 2s;
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        animation-fill-mode: forwards;
        animation-direction: alternate;
        animation-iteration-count: 2;
    }

    @keyframes show-copy-status {
        0% { top: -50%; }
        100% { top: 50%; }
    }

</style>