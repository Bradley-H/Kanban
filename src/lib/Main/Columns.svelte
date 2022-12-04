<script lang="ts">
    // props //
    export let tasks: any[] = [];
    export let name: string = "";
    //scss defintions
    import "../../scss/styles.scss";
</script>

<style lang="scss">
    @import "../../scss/util/index";
    //placeholder varaible//
    %content {
        content: "";
        display: flex;
        position: absolute;
        left: toRem(-2);
        top: toRem(4);
        width: 13px;
        height: 13px;
        border-radius: 100%;
    }

    .column {
        display: flex;
        flex-direction: column;
        position: relative;
        width: toRem(270);
        height: max-content;
        @include desktop {
            min-width: toRem(300);
            max-width: 100%;
            margin-left: 1.5rem;
        }
        &_header {
            margin-left: toRem(15);
            position: relative;
            margin-bottom: toRem(18);
            width: max-content;
            text-align: center;

            p {
                @extend %fontSizes;
            }
        }
        &_content {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            @include desktop {
                gap: 25px;
            }
        }
    }

    .column:nth-of-type(1) {
        &:before {
            @extend %content;
            background-color: $primaryColor;
        }
    }
    .column:nth-of-type(2) {
        &:before {
            @extend %content;
            background-color: #3498db;
        }
    }

    .column:nth-of-type(3) {
        &:before {
            @extend %content;
            background-color: #9b59b6;
        }
    }

    .column:nth-of-type(4) {
        &:before {
            @extend %content;
            background-color: #3498db;
        }
    }

    .column:nth-of-type(5) {
        &:before {
            @extend %content;
            background-color: #34495e;
        }
    }

    .column:nth-of-type(6) {
        &:before {
            @extend %content;
            background-color: #2ecc71;
        }
    }

    .column:nth-of-type(7) {
        &:before {
            @extend %content;
            background-color: #e74c3c;
        }
    }

    .column:nth-of-type(8) {
        &:before {
            @extend %content;
            background-color: #ea5777;
        }
    }

    .column:nth-of-type(9) {
        &:before {
            @extend %content;
            background-color: #ecf0f1;
        }
    }

    .column:nth-of-type(10) {
        &:before {
            @extend %content;
            background-color: #f1c40f;
        }
    }
</style>


<section class="column">
    <div class="column_header">
        <p>{name} ({tasks.length})</p>
    </div>
    <div class="column_content">
        <slot/>
    </div>
</section>