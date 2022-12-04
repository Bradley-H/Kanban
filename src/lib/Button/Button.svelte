<script lang="ts">
//props
export let text: string = "";
export let type: string = "primary";

//scss defintions
    import "../../scss/styles.scss";
</script>


<style lang="scss">
    @import "../../scss/util/_index.scss";

    button{
        width: max-content;
        &.primary{
            background-color: $primaryColor;
            color: white;
            &:hover{
                background-color: $primaryHover;
            }
        }
        &.danger{
            background-color: $dangerColor;
            color: white;
        }
    }
</style>


<button class="{type}" on:click>{text}</button>