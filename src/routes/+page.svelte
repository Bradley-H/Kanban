<script lang="ts">
    export let data: any = {};
    //components
    import Header from "$lib/Header/Header.svelte";
    import Columns from "$lib/Main/Columns.svelte";
    import Card from "$lib/Main/Card.svelte";
    import SideNav from '$lib/SideNav/SideNav.svelte';
    import Button from '$lib/Button/Button.svelte';
    //store
    import { globalStore } from "../stores/globalStore";

    let currentBoard: number = 0;
    //destructuing //
    $: ({ name} = data.boards[currentBoard]);

    function boardClick(e: any) {
        if(e === currentBoard){
            return
        } else {
            currentBoard = parseInt(e.detail);
        }
    }

    $: console.log(data);

    //scss defintions
    import "../scss/styles.scss";
</script>

<style lang="scss">
    @import "../scss/util/index";

    .container {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        min-width: 100%;
        // overflow: auto;
        margin-top: toRem($headerHeight);
        padding-left: 2rem;
        @include xl{
            margin-top: toRem($headerHeightXL);
            height: max-content;
        }
        .content {
            display: flex;
            min-height: 100vh;
            max-height: max-content;
            padding: .75rem 6rem 2rem 2.25rem;
            transition: $primaryTransition;
            overflow-y: auto;
            @include tablet {
                &.active {
                    margin-left: toRem($logoWidth);
                }
            }
            @include xl{
                &.active{
                    margin-left: toRem($logoWidthXL);
                }
            }
            &_boards{
                display: flex;
                height: 100%;
                width: 100%;
                @include desktop{
                    gap: 1rem;
                }
            }
            
            .newColumn{
                @include centered;
                height: 65vh;
                margin-top: 2.4rem;
                padding: .75rem;
                cursor: pointer;
                text-align: center;
                h1{
                    font-size: toRem(13);
                    color: $mixedText;
                    width: max-content;
                    @include large{
                        font-size: toRem(15);
                    }
                }
            }
    }
}

.noBoards{
                @include centered;
                flex-direction: column;
                height: 100vh;
                width: 100%;
                gap: toRem(15);
                text-align: center;
                padding: 0;
                h6{
                    color: $mixedText;
                }
            }
</style>


<Header currentBoard={name} />
<SideNav board={data.boards} {currentBoard} on:boardClick={boardClick} />
{#await data.boards}
    <h1>Getting Data, please wait....</h1>
{:then _}


    {#if !data.boards[currentBoard].columns}
        <div class="noBoards {$globalStore.theme}BG">
            <h6>This board is Empty.</h6>
            <h6>Create a new column to get started</h6>
            <Button text="+ Add New Column" />
        </div>


    {:else}
        <div class="container {$globalStore.theme}BG">
            <main class="content" class:active={$globalStore.navbar}>
                <div class="content_boards">


                    {#each data.boards[currentBoard].columns as brd, i (i)}
                        <Columns name={brd.name} tasks={brd.tasks}>
                            {#each brd.tasks as task}
                                <Card title={task.title} />
                            {/each}
                        </Columns>
                    {/each}


                    <div class="newColumn {$globalStore.theme}Card">
                        <h1>+ Add New Column</h1>
                    </div>


                </div>
            </main>
        </div>
    {/if}
{/await}
