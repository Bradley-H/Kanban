<script lang="ts">
        import { globalStore } from "../../stores/globalStore";
        //props
        export let title: string = "";
        export let subtasks: any[] = [];

        import "../../scss/styles.scss";
</script>

<style lang="scss">
        @import "../../scss/util/index";

        .card {
                display: flex;
                flex-direction: column;
                padding: toRem(15);
                width: 100%;
                height: 100%;
                border-radius: toRem(8);
                gap: 10px;
                cursor: grab;
                max-width: 350px;
                &.darkCard {
                        box-shadow: -1px 3px 4px 3px #202434;
                }
                &.lightCard {
                        box-shadow: -1px 3px 4px 3px #e6e6e6;
                }
                h6 {
                        font-size: toRem($fontMobile);
                        @include tablet {
                                font-size: toRem($fontTablet);
                        }
                        @include desktop {
                                font-size: toRem($fontDesktop);
                        }
                }
                p {
                        font-size: toRem($fontMobile - 1);
                        @include tablet {
                                font-size: toRem($fontTablet - 1);
                        }
                        @include desktop {
                                font-size: toRem($fontDesktop - 1);
                        }
                }
        }
</style>


<article class="card {$globalStore.theme}Card">
        <h6>{title}</h6>
        <p>{subtasks} of {subtasks.length} subtasks completed</p>
</article>