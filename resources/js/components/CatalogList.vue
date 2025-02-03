<template>
    <div class="catalog-list__wrapper">
        <div class="container">
            <div class="catalog-list">
                <CatalogItem
                    v-for="(item,index) in this.products" 
                    :key="index"
                    :item="item"
                />
            </div>
        </div>
    </div>
</template>

<script>
import CatalogItem from './CatalogItem.vue';
export default {
    name: 'CatalogList',
    components:{
        CatalogItem
    },
    data(){
        return{
            products: [],
        }
    },
    methods: {
        initProductsData(){
            this.products = [
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Шаурма кебаб гуакамоле",
                    description : "p1",
                    price : "360.00",
                    weight : 250,
                    calories : 1,
                    hidden : 0,
                    new : 1,
                    priority : 0,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "/images/restaurants/products/1.png",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Салат боул с курицей 390 г. Салат боул с курицей 390 г. Салат боул с курицей 390 г. Салат боул с курицей 390 г. Салат боул с курицей 390 г.",
                    description : "p1",
                    price : "499.00",
                    weight : 390,
                    calories : 1,
                    hidden : 0,
                    new : 0,
                    priority : 0,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "/images/restaurants/products/2.png",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Шаурма кебаб гуакамоле",
                    description : "p1",
                    price : "360.00",
                    weight : 250,
                    calories : 1,
                    hidden : 0,
                    new : 1,
                    priority : 0,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "https://rave-back.pisateli-studio.ru/public/storage/01JJRPYWQ63005FHZE7E21S1H5.jpg",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Салат боул с курицей 390 г. Салат боул с курицей 390 г. Салат боул с курицей 390 г.",
                    description : "p1",
                    price : "499.00",
                    weight : 390,
                    calories : 1,
                    hidden : 0,
                    new : 0,
                    priority : 0,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "https://rave-back.pisateli-studio.ru/public/storage/01JJXZE5RE9YZJXWMT6C3PBD9K.webp",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Шаурма кебаб гуакамоле",
                    description : "p1",
                    price : "360.00",
                    weight : 250,
                    calories : 1,
                    hidden : 0,
                    new : 1,
                    priority : 0,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "https://rave-back.pisateli-studio.ru/public/storage/01JJRPYWQ63005FHZE7E21S1H5.jpg",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Салат боул с курицей 390 г. Салат боул с курицей 390 г. Салат боул с курицей 390 г.",
                    description : "p1",
                    price : "499.00",
                    weight : 390,
                    calories : 1,
                    hidden : 0,
                    new : 0,
                    priority : 0,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "https://rave-back.pisateli-studio.ru/public/storage/01JJXZE5RE9YZJXWMT6C3PBD9K.webp",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Шаурма кебаб гуакамоле",
                    description : "p1",
                    price : "360.00",
                    weight : 250,
                    calories : 1,
                    hidden : 0,
                    new : 1,
                    priority : 0,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "https://rave-back.pisateli-studio.ru/public/storage/01JJRPYWQ63005FHZE7E21S1H5.jpg",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Салат боул с курицей 390 г. Салат боул с курицей 390 г. Салат боул с курицей 390 г.",
                    description : "p1",
                    price : "499.00",
                    weight : 390,
                    calories : 1,
                    hidden : 0,
                    new : 0,
                    priority : 0,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "https://rave-back.pisateli-studio.ru/public/storage/01JJXZE5RE9YZJXWMT6C3PBD9K.webp",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Шаурма кебаб гуакамоле",
                    description : "p1",
                    price : "360.00",
                    weight : 250,
                    calories : 1,
                    hidden : 0,
                    new : 1,
                    priority : 0,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "https://rave-back.pisateli-studio.ru/public/storage/01JJRPYWQ63005FHZE7E21S1H5.jpg",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Салат боул с курицей 390 г. Салат боул с курицей 390 г. Салат боул с курицей 390 г.",
                    description : "p1",
                    price : "499.00",
                    weight : 390,
                    calories : 1,
                    hidden : 0,
                    new : 0,
                    priority : 0,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "https://rave-back.pisateli-studio.ru/public/storage/01JJXZE5RE9YZJXWMT6C3PBD9K.webp",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
            ]
        }
    },
    mounted(){
        this.initProductsData();
    }
}
</script>

<style scoped>
    .catalog-list__wrapper{
        width: 100%;
    }
    .catalog-list{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        border-left: 1px solid #9E9E9E;  /* Граница слева */
        border-top: 1px solid #9E9E9E;   /* Граница сверху */
    }
</style>