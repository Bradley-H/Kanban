<script lang="ts">
        import {globalStore} from '../../stores/globalStore';
        //props
        export let title: string = "";
        export let subtasks: any[] = [];

import "../../scss/styles.scss";
</script>

<style lang="scss">
        @import "../../scss/util/index";

        .card{
                display: flex;
                flex-direction: column;
                padding: toRem(15);
                width: 100%;
                height: 100%;
                border-radius: toRem(8);
                gap: 10px;
                cursor: grab;
                &.darkCard{
                        box-shadow: -1px 3px 4px 3px #202434;
                }
                &.lightCard{
                        box-shadow: -1px 3px 4px 3px #e6e6e6;
                }
                h6{
                        @include desktop{
                                font-size: 1.25rem;
                        }
                }
                p{
                        @include desktop{
                                font-size: 1.15rem;
                        }
                }
        }
</style>


<article class="card {$globalStore.theme}Card">
        <h6>{title}</h6>
        <p>{subtasks} of {subtasks.length}  subtasks completed</p>
</article>