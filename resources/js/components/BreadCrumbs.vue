<template>
    <div class="bread-crumbs">
        <div class="container">
            <div class="bread-crumbs__list">
                <img class="bread-crumbs__back-arrow" src="/images/bread-crumbs/left-arrow.svg" alt="Назад">
                <router-link
                    v-for="(item,index) in this.links"
                    :key="index"
                    :to="{ path:item.path }" class="bread-crumbs__item"
                >
                        {{item.name}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BreadCrumbs',
    props: {
        links: Array
    },
}
</script>

<style scoped>
    .bread-crumbs{
        margin-bottom: 24px;
    }
    .bread-crumbs__list{
        height: 24px;
        display: flex;
        align-items: center;
    }

    .bread-crumbs__list *{
        display: inline;
        
    }

    .bread-crumbs__back-arrow{
        width: 24px;
        height: 24px;
    }
    .bread-crumbs__item{
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 20px;

        font-family: Vela Sans GX;
        font-size: 16px;
        font-weight: 500;
        line-height: 20.96px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: var(--Btn-Black, #000000);


    }
    .bread-crumbs__item::after{
        content: '';
        background-image: url('/images/bread-crumbs/point.svg');
        width: 4px;
        height: 4px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: -12px;
        margin: auto 0;
    }

    .bread-crumbs__list .bread-crumbs__item:last-child{
        color: var(--Btn-Hover-Red, #BE1522);

    }

    .bread-crumbs__list .bread-crumbs__item:last-child::after{
        display: none;
    }
</style>