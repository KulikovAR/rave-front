<template>
    <div class="order-page page">
        <Header
            @showContactsPopUp="showContactsPopUp"
            :restaurantSlug="restaurantSlug"
        />
        <ContactsPopUp
            ref="ContactsPopUp"
            :restaurantSlug="restaurantSlug"
        />
        <BreadCrumbs :links="this.breadCrumbs" />
        <OrderContent
            :restaurantSlug="restaurantSlug"
        />
        <NotWorkingTimePopUp
            :restaurantSlug="restaurantSlug"
        />
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import ContactsPopUp from '../components/ContactsPopUp.vue';
import BreadCrumbs from '../components/BreadCrumbs.vue';
import OrderContent from '../components/OrderContent.vue';
import NotWorkingTimePopUp from '../components/NotWorkingTimePopUp.vue';

export default {
    name: 'OrderPage',
    components: {
        Header,
        ContactsPopUp,
        BreadCrumbs,
        OrderContent,
        NotWorkingTimePopUp
    },
    data(){
        return{
            restaurantSlug: this.$route.params.restaurantSlug,
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
            this.breadCrumbs = [
                {
                    textname: 'Каталог',
                    name: 'categories',
                    params: {
                        restaurantSlug: this.restaurantSlug,
                    }
                },
                {
                    textname: 'Корзина',
                    name: 'cart',
                    params: {
                        restaurantSlug: this.restaurantSlug,
                    }
                },
                {
                    textname: 'Оформление заказа',
                    name: 'order',
                    params: {
                        restaurantSlug: this.restaurantSlug,
                    }
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

<style scoped>
    @media (max-width: 1250px){
        .order-page{
            padding-top: calc(65px + 2 * 24px);
            padding-bottom: 44px;
            height: auto;
        }
    }
    @media (max-width: 768px) {
        .order-page{
            padding-top: calc(48px + 18px* 2);
            padding-bottom: 22px;
        }
    }
</style>