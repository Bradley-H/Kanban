<script lang="ts">
    //store//
    import {globalStore} from '../../stores/globalStore';
    //constants 
    import {toggleNavbar} from '../../constants/functions';
    //props // 
    export let currentBoard: string = ""
    import "../../scss/styles.scss";

    let innerWidth =  0;
</script>

<style lang="scss">
    @import "../../scss/util/index";

    .header{
        @extend %centered;
        height: toRem($headerHeight);
        width: 100%;
        border-bottom: 2px solid transparentize($color: $mixedText, $amount: .8);
        position: fixed;
        top: 0;
        z-index: 2;
        @include xl{
            height: toRem($headerHeightXL);
        }

        &_logo{
            @extend %centered;
            padding: 0 toRem(5);
            margin: 0 toRem(5) 0 toRem(10);
            @include tablet{
                display: flex;
                justify-content: start;
                border-right: 2px solid transparentize($color: $mixedText, $amount: .8);
                height: 100%;
                margin-right: toRem(20);
                width: toRem($logoWidth);
            }
            @include xl{
                width: toRem($logoWidthXL);
            }
            img{
                height: max-content;
                @include tablet{
                    margin-left: .5rem;
                }
            }
        }
        &_information{
            @extend %centered;
            gap: toRem(10);
            svg{
                width: toRem(10);
                height: toRem(15);
                transform: translateY(7px);
                overflow: visible;
                cursor: pointer;
                path{
                    transform-origin: center center;
                    transform: scale(1.5) translateY(1px);
                }
                @include tablet{
                    display: none;
                }
            }
            h4{
                @include tablet{
                    transform: translateY(1px);
                }
                @include desktop{
                    font-size: 1.3rem
                }
                @include xl{
                    font-size: 1.5rem
                }
            }
        }
        &_settings{
            @extend %flex;
            align-items: center;
            gap: toRem(15);
            margin-left: auto;
            margin-right: toRem(15);
            button{
                @extend %flex;
                transition: all .3s ease-in-out;
                background-color: $primaryColor;
                color: white;
                @include tablet{
                    @include centered;
                }
                @include desktop{
                    width: 150px;
                    padding: toRem(11);
                }
                @include xl{
                    width: 200px;
                }
                &:hover{
                    background-color: $primaryHover;
                }
            }
            svg{
                cursor: pointer;
                @include tablet{
                    margin-right: toRem(5);
                }
            }
        }
    }
</style>

<svelte:window bind:innerWidth />

<header class="header {$globalStore.theme}Card">

    <div class="header_logo">
        {#if innerWidth <= 767}
            <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
                <g fill="#635FC7" fill-rule="evenodd">
                    <rect width="6" height="25" rx="2" />
                    <rect
                        opacity=".75"
                        x="9"
                        width="6"
                        height="25"
                        rx="2"/><rect
                        opacity=".5"
                        x="18"
                        width="6"
                        height="25"
                        rx="2"/>
                    </g>
            </svg>
        {:else}
            <img src="./logo-{$globalStore.theme}.svg" alt="" />
        {/if}
    </div>

    <div class="header_information">
        <h4>{currentBoard}</h4>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <svg width="10" on:click={toggleNavbar} height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4"/></svg>
    </div>


    <div class="header_settings">
        <button>
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"/></svg>
            {innerWidth <= 767 ? "" : "Add New Task"}
        </button>

        <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>

    </div>
</header>
