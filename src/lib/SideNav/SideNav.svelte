<script lang="ts">
    //prop //
    export let board: any[] = [];
    export let currentBoard: number = 0;
    // svelte imports //
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    //stores //
    import { globalStore } from "../../stores/globalStore";
    // constants //
    import { toggleNavbar } from "../../constants/functions";
    // class //
    let navbar = {
        themeChange() {
            if ($globalStore.theme === "dark") {
                globalStore.update(($store) => {
                    $store.theme = "light";
                    return $store;
                });
            } else {
                globalStore.update(($store) => {
                    $store.theme = "dark";
                    return $store;
                });
            }
        },
    };

    function dispatchBoard(e: any) {
        dispatch("boardClick", e);
    }
    //variables
    let innerWidth: number = 0;

    // scss defintions //
    import "../../scss/styles.scss";
</script>

<style lang="scss">
    @import "../../scss/util/index";
    //component specific placeholder
    %border {
        border-top-right-radius: toRem(25);
        border-bottom-right-radius: toRem(25);
    }

    %fixed {
        position: fixed;
    }
    //

    .nav {
        @extend %fixed;
        padding: toRem(15) toRem(0);
        top: 15%;
        left: -75%;
        gap: 15px;
        width: toRem($logoWidth);
        border-radius: toRem(13);
        z-index: 2;
        transition: $primaryTransition;
        transition-delay: 150ms;
        &.active {
            left: 50%;
            transform: translateX(-50%);
        }
            @include tablet {
                left: 0;
                top: toRem($headerHeight - 1.5);
                height: 100%;
                width: toRem($logoWidth);
                border-radius: 0;
                transform: translateX(-100%);
                transition-delay: unset;
                &.active {
                    transform: translateX(0);
                    left: 0;
                }
            }
        @include xl {
            top: toRem($headerHeightXL - 1.5);
            width: toRem($logoWidthXL);
        }
        &_header {
            color: $mixedText;
            margin-left: toRem(12);
            h6 {
                @extend %fontSizes;
            }
        }
        &_boards {
            gap: 0.8rem;
            min-height: 70px;
            max-height: 300px;
            overflow: auto;
            margin-bottom: 3rem;
            @include tablet {
                max-height: 70%;
            }
            .board {
                padding: toRem(10) toRem(15);
                width: 90%;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                &.active {
                    background-color: $primaryColor;
                    @extend %border;
                    p {
                        @extend %white;
                    }
                    path {
                        @extend %white;
                    }
                }

                &:hover {
                    background-color: white;
                    @extend %border;
                    h6 {
                        color: $primaryColor;
                    }
                    path {
                        fill: $primaryColor;
                    }
                }
                h6 {
                    color: $mixedText;
                    @extend %fontSizes;
                }

                svg {
                    @include desktop {
                        transform: scale(1.3);
                        overflow: visible;
                    }
                }
            }
            .nav_newBoard {
                align-items: center;
                gap: 5px;
                color: $primaryColor;
                padding: toRem(10) toRem(15);
                cursor: pointer;
                margin-bottom: 0.5rem;
                svg {
                    stroke: $primaryColor;
                }
            }
        }
        .ThemeSwitch{
            @include centered;
            position: absolute;
            width: 100%;
            bottom: 1rem;
            .themeContainer{
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                padding: toRem(10);
                width: 90%;
            }

        }
    }
    .overlay {
        @extend %fixed;
        top: 0;
        left: 0;
        z-index: 1;
        &.active {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        @include tablet {
            display: none;
        }
    }

    .hide {
        display: none;
        position: fixed;
        @include tablet {
            @include centered;
            background-color: $primaryColor;
            left: 0;
            top: 85%;
            height: toRem(45);
            width: toRem(60);
            border-top-right-radius: toRem(20);
            border-bottom-right-radius: toRem(20);
            z-index: 5;
            &:hover {
                background-color: $primaryHover;
            }
            svg {
                transform: scale(1.4);
            }
        }
    }

    .lightCard {
        .board {
            &:hover {
                background-color: darken($lightModeBG, 2);
                color: $primaryColor;
            }
        }
    }
</style>



<svelte:window bind:innerWidth={innerWidth}/>

<nav class="{$globalStore.theme}Card nav flexCol" class:active={$globalStore.navbar}>
    <div class="nav_header">
        <h6>All Boards ({board.length})</h6>
    </div>
    <div class="nav_boards flexCol">
        <!--  -->
        {#each board as brd, i (i) }    
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="board flex" class:active={currentBoard === i} on:click={() => dispatchBoard(i)}>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#828FA3"/></svg>
                <p>{brd.name}</p>
                </div>
        {/each}
         <!--  -->
    <div class="ThemeSwitch">
        <div class="themeContainer {$globalStore.theme}BG flex">
            <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg"><path d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z" fill="#828FA3"/></svg>
            <input type="checkbox" class="slider" on:change={navbar.themeChange}>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z" fill="#828FA3"/></svg>
        </div>
    </div>
</nav>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="hide" on:click={toggleNavbar}>
    <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z" fill="#FFF"/>
    </svg>
</div>

<!-- overlay -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class:active={$globalStore.navbar} on:click={toggleNavbar} class="overlay"></div>