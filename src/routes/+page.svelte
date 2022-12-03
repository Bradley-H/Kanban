<script lang="ts">
    export let data: any = {};
    //components
    import Header from "$lib/Header/Header.svelte";
    import Columns from "$lib/Main/Columns.svelte";
    import Card from "$lib/Main/Card.svelte";
    import SideNav from '$lib/SideNav/SideNav.svelte';
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
                gap: toRem(25);
                @include large{
                    gap: 1rem;
                }
            }
            .newColumn{
                @include centered;
                min-height: toRem(400);
                max-height: toRem(calc(100vh - toRem($headerHeight)));
                margin-top: 2.4rem;
                width: max-content;
                background-color: pink;
                padding: .75rem;
                cursor: pointer;
                h1{
                    font-size: toRem(15);
                }
            }
    }
}
</style>


<Header currentBoard={name}/>
<SideNav board={data.boards} {currentBoard} on:boardClick={boardClick}/>
<div class="container {$globalStore.theme}BG">
    <main class="content" class:active={$globalStore.navbar}>
        {#await data.boards}
            <h1>Getting Data, please wait....</h1>
        {:then _}
        <div class="content_boards">
            {#each data.boards[currentBoard].columns as brd, i (i) }
            <Columns name={brd.name} tasks={brd.tasks}>
                {#each brd.tasks as task}
                    <Card title={task.title}/>
                {/each}
            </Columns>
            {/each}
            <div class="newColumn">
                <h1>+ Add New Column</h1>
        </div>          
        </div>
        {/await}
        
   </main>
</div> 