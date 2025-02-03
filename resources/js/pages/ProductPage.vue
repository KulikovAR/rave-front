<template>
    <div class="product-page page">
        <Header
            @showContactsPopUp="showContactsPopUp"
        />
        <ContactsPopUp
            ref="ContactsPopUp"
        />
        <BreadCrumbs :links="this.breadCrumbs" />
        <ProductItem :product="this.product"/>
        <RecommendedProductsSlider/>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import ContactsPopUp from '../components/ContactsPopUp.vue';
import BreadCrumbs from '../components/BreadCrumbs.vue';
import ProductItem from '../components/ProductItem.vue';
import RecommendedProductsSlider from '../components/RecommendedProductsSlider.vue';
export default {
    name: 'ProductPage',
    components: {
        Header,
        ContactsPopUp,
        BreadCrumbs,
        ProductItem,
        RecommendedProductsSlider
    },
    data(){
        return{
            categories: [],
            breadCrumbs: [],
            product: {}
        }
    },
    methods: {
        showContactsPopUp(){
            this.$refs.ContactsPopUp.showPopUp();
        },
        initData(){
            this.product = {
                name: '',
                id: "9e154f88-e460-4086-8e08-141d74786295",
                category_id: "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                name: "Шаурма кебаб гуакамоле",
                description: "Лаваш, кебаб свино-говяжий, тар тар из томатов и красного лука, гуакамоле, соус белый, свежий шпинат, томат, красный лук, сыр чеддер, омлет",
                price: "390.00",
                weight: 350,
                calories: 890,
                hidden: 0,
                new: 1,
                priority: 1,
                created_at: "2025-01-29T09:40:58.000000Z",
                updated_at: "2025-01-31T10:45:20.000000Z",
                media: [
                    {
                        "id": "9e154f88-e8a1-4de6-84bc-64abff81b421",
                        "product_id": "9e154f88-e460-4086-8e08-141d74786295",
                        "path": "01JJRPYWQ63005FHZE7E21S1H5.jpg",
                        "created_at": "2025-01-29T09:40:58.000000Z",
                        "updated_at": "2025-01-29T09:40:58.000000Z"
                    }
                ]
            };
            this.breadCrumbs = [
                {
                    name: 'Каталог',
                    path: '/catalog',
                },
                {
                    name: 'Шаурма кебаб гуакамоле',
                    path: '/product'
                }
            ];
        }
    },
    mounted(){
        this.initData();
    }
}
</script>

<style scoped>
    .product-page{
        padding-top: calc(65px + 2 * 24px);
        padding-bottom: calc(65px + 2 * 24px);
    }
</style>