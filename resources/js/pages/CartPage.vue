<template>
    <div class="cart-page page" :class="{ empty: totalPrice === 0 }">
        <Header 
            @showContactsPopUp="showContactsPopUp" 
            :restaurantSlug="restaurantSlug"
        />
        <ContactsPopUp 
            ref="ContactsPopUp"
            :restaurantSlug="restaurantSlug"
        />

        <BreadCrumbs :links="breadCrumbs" />

        <template v-if="totalPrice > 0">
            <Cart 
                :restaurantSlug="restaurantSlug"
                @itemRemovedFromCart="handleCartState" 
            />
            <RecommendedProductsSlider
                ref="RecommendedProductsSlider"
                :restaurantSlug="restaurantSlug"
                :products="recommendedProductsList.map(product => ({
                    ...product,
                    image: getFullImage(product.media[0].path)
                }))" 
                @itemAddedToCart="handleCartState"
            />
        </template>

        <template v-else>
            <EmptyCartContent
                :restaurantSlug="restaurantSlug"
            />
        </template>

        <NotWorkingTimePopUp
            :restaurantSlug="restaurantSlug"
        />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from '../components/Header.vue';
import ContactsPopUp from '../components/ContactsPopUp.vue';
import BreadCrumbs from '../components/BreadCrumbs.vue';
import Cart from '../components/Cart.vue';
import RecommendedProductsSlider from '../components/RecommendedProductsSlider.vue';
import EmptyCartContent from '../components/EmptyCartContent.vue';
import NotWorkingTimePopUp from "../components/NotWorkingTimePopUp.vue";

const BASE_URL = process.env.MIX_RAVE_IMAGE_STORAGE_BASE;

export default {
    name: 'CartPage',
    components: {
        Header,
        ContactsPopUp,
        BreadCrumbs,
        Cart,
        RecommendedProductsSlider,
        EmptyCartContent,
        NotWorkingTimePopUp
    },
    data() {
        return {
            restaurantSlug: this.$route.params.restaurantSlug,
            breadCrumbs: [],
            isProductsLoaded: false, 
        };
    },
    computed: {
        ...mapGetters("cart", ["getCart", "getTotalPrice"]),
        recommendedProductsList() {
            return this.$store.getters['restaurant/recommendedProducts'](this.restaurantSlug)
                .filter(product => product.hidden === 0);
        },
        totalPrice() {
            return this.getTotalPrice(this.restaurantSlug);
        },
    },
    methods: {
        getFullImage(imagePath) {
            return `${BASE_URL}${imagePath}`;
        },
        showContactsPopUp() {
            this.$refs.ContactsPopUp.showPopUp();
        },
        initData() {
            this.breadCrumbs = [
                { textname: 'Каталог', name: 'categories', params: { restaurantSlug: this.restaurantSlug } },
                { textname: 'Корзина', name: 'cart', params: { restaurantSlug: this.restaurantSlug } }
            ];
        },
        handleCartState() {
            this.updateRecommendedProducts();
        },
        loadProductsIfNeeded() {
            if (this.$store.state.restaurant.products.length === 0) {
                this.$store.dispatch('restaurant/fetchProducts').then(() => {
                    this.isProductsLoaded = true;
                    this.updateRecommendedProducts();
                });
            } else {
                this.isProductsLoaded = true;
                this.updateRecommendedProducts();
            }
        },
        updateRecommendedProducts() {
            this.$store.dispatch('restaurant/updateRecommendedProducts', this.restaurantSlug);
        }
    },
    mounted() {
        this.initData();
        this.loadProductsIfNeeded();
        this.$store.dispatch('cart/validateCart');
    },
};
</script>

<style scoped>
    .cart-page{
        padding-top: calc(65px + 2 * 24px);
        padding-bottom: calc(65px + 2 * 24px);
        min-height: 100vh;
    }

    .cart-page.empty{
        height: 100vh;
    }
</style>

<style scoped>
    @media (max-width: 768px) {
        .cart-page {
            padding-top: calc(48px + 18px* 2);
            padding-bottom: 22px;
        }
    }
</style>