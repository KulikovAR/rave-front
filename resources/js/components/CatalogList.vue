<template>
    <div class="catalog-list__wrapper">
        <div class="container">
            <div class="catalog-list">
                <CatalogItem
                    v-for="(item, index) in products"
                    :key="index"
                    :item="item"
                    :restaurantSlug="restaurantSlug"
                    :categorySlug="categorySlug"
                />
            </div>
        </div>
    </div>
</template>

<script>
import CatalogItem from './CatalogItem.vue';

export default {
    name: 'CatalogList',
    components: { CatalogItem },
    props: {
        restaurantSlug: String,
        categorySlug: String,
        products: Array
    }
};
</script>

<style scoped>
    .catalog-list__wrapper{
        width: 100%;
    }
    .catalog-list{
        position: relative;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        border-left: 1px solid #9E9E9E;  /* Граница слева */
        /* border-top: 1px solid #9E9E9E;  */
    }
    
</style>

<style scoped>
    @media (max-width: 500px){
        .catalog-list{
            gap: 16px;
            border: none;
        }
    }
</style>