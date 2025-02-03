<template>
    <div class="order-page page">
        <Header
            @showContactsPopUp="showContactsPopUp"
        />
        <ContactsPopUp
            ref="ContactsPopUp"
        />
        <BreadCrumbs :links="this.breadCrumbs" />
        <OrderContent/>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import ContactsPopUp from '../components/ContactsPopUp.vue';
import BreadCrumbs from '../components/BreadCrumbs.vue';
import OrderContent from '../components/OrderContent.vue';

export default {
    name: 'OrderPage',
    components: {
        Header,
        ContactsPopUp,
        BreadCrumbs,
        OrderContent
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
                    name: 'Корзина',
                    path: '/cart'
                },
                {   
                    name: 'Оформление заказа',
                    path: '/order'
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
    .order-page{
        padding-top: calc(65px + 2 * 24px);
        padding-bottom: 70px;
        height: 100vh;
    }
</style>