<script lang="ts">
    export let data: any = {};
    //components
    import Header from "../components/Header/Header.svelte";
    import Columns from "../components/Main/Columns.svelte";
    import Card from "../components/Main/Card.svelte";
    import Sidenav from '../components/SideNav/Sidenav.svelte';
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
        overflow: scroll;
        margin-top: toRem($headerHeight);
        padding-left: 2rem;
        @include desktop{
            margin-top: toRem($headerHeightLarge);
            height: max-content;
        }
        .content {
            display: flex;
            height: 100vh;
            padding: 2.25rem 6rem 6rem 2.25rem;
            transition: $primaryTransition;
            overflow-y: auto;
            @include tablet {
                &.active {
                    margin-left: toRem($logoWidth);
                }
            }
            @include large{
                &.active{
                    margin-left: toRem($logoWidthLarge);
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
                display: flex;
                min-height: 20%;
                height: 100vh;
                background-color: pink;
            }
    }
}
</style>


<Header currentBoard={name}/>
<Sidenav board={data.boards} {currentBoard} on:boardClick={boardClick}/>
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
        </div>
        {/await}
        <div class="newColumn">
            <h1>+ Add New Column</h1>
    </div>  
   </main>
</div> 