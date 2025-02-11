<template>
    <div class="catalog-page page">
        <Header
            @showContactsPopUp="showContactsPopUp"
            :restaurantSlug="restaurantSlug"
        />
        <ContactsPopUp
            ref="ContactsPopUp"
            :restaurantSlug="restaurantSlug"
        />
        <CategoryTabs
            ref="CategoryTabs"
            :restaurantSlug="restaurantSlug"
            :categorySlug="categorySlug"
        />
        <CatalogList
            ref="CatalogList"
            :restaurantSlug="restaurantSlug"
            :categorySlug="categorySlug"
            :products="filteredProducts"
        />
        <NotWorkingTimePopUp
            :restaurantSlug="restaurantSlug"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '../components/Header.vue';
import CategoryTabs from '../components/CategoryTabs.vue';
import CatalogList from '../components/CatalogList.vue';
import ContactsPopUp from '../components/ContactsPopUp.vue';
import NotWorkingTimePopUp from '../components/NotWorkingTimePopUp.vue';

const BASE_URL = 'https://rave-back.pisateli-studio.ru/storage/';

export default {
    name: 'CatalogPage',
    components: {
        Header,
        CategoryTabs,
        CatalogList,
        ContactsPopUp,
        NotWorkingTimePopUp
    },
    data() {
        return {
            restaurantSlug: this.$route.params.restaurantSlug,
            categorySlug: this.$route.params.categorySlug || 'new'
        };
    },
    computed: {
        ...mapState('restaurant', ['restaurants', 'categories', 'products']),
        
        isDataLoaded() {
            return this.restaurants.length > 0 && this.categories.length > 0 && this.products.length > 0;
        },

        restaurant() {
            return this.restaurants.find(restaurant => restaurant.slug === this.restaurantSlug);
        },

        categoriesForRestaurant() {
            return this.restaurant 
                ? this.categories.filter(category => category.restaurant_id === this.restaurant.id)
                : [];
        },

        filteredProducts() {
            if (!this.isDataLoaded) return [];

            let products = [];

            if (this.categorySlug === 'new') {
                const categoryIds = this.categoriesForRestaurant.map(category => category.id);
                products = this.products.filter(product => categoryIds.includes(product.category_id) && product.new);
            } else {
                const selectedCategory = this.categoriesForRestaurant.find(category => category.slug === this.categorySlug);
                if (selectedCategory) {
                    products = this.products.filter(product => product.category_id === selectedCategory.id);
                }
            }

            return products.map(product => ({
                ...product,
                image: product.media?.[0]?.path ? this.getFullImagePath(product.media[0].path) : null
            }));
        }
    },
    methods: {
        ...mapActions('restaurant', ['fetchRestaurants', 'fetchCategories', 'fetchProducts']),

        getFullImagePath(imageName) {
            return `${BASE_URL}${imageName}`;
        },

        initData() {
            if (this.restaurants.length === 0) this.fetchRestaurants();
            if (this.categories.length === 0) this.fetchCategories();
            if (this.products.length === 0) this.fetchProducts();
        },
        showContactsPopUp() {
            this.$refs.ContactsPopUp.showPopUp();
        }
    },

    mounted() {
        this.initData();
        this.$store.dispatch('cart/validateCart');
    },

    watch: {
        '$route'(to, from) {
            if (to.params.restaurantSlug !== from.params.restaurantSlug) {
                this.initData();
            }
        }
    }
};
</script>

<style scoped>
    .catalog-page{
        padding-top: calc(65px + 48px + 3 * 24px);
        padding-bottom: calc(65px + 48px + 3 * 24px);
    }
</style>

<style scoped>
    @media (max-width: 768px){
        .catalog-page{
            padding-top: calc(48px * 2 + 16px * 2 + 18px);
            padding-bottom: 22px;
        }
    }
</style>