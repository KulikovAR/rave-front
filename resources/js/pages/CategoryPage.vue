<template>
    <div class="category-page page">
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
        />
        <CategoryList
            ref="CategoryList"
            :restaurantSlug="restaurantSlug"
        />
        <NotWorkingTimePopUp
            :restaurantSlug="restaurantSlug"
        />
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import CategoryTabs from '../components/CategoryTabs.vue';
import CategoryList from '../components/CategoryList.vue';
import ContactsPopUp from '../components/ContactsPopUp.vue';
import NotWorkingTimePopUp from '../components/NotWorkingTimePopUp.vue';
import { mapState, mapActions } from 'vuex';

const BASE_URL = process.env.VUE_APP_RAVE_IMAGE_STORAGE_BASE;

export default {
    name: 'CategoryPage',
    components: {
        Header,
        CategoryTabs,
        CategoryList,
        ContactsPopUp,
        NotWorkingTimePopUp
    },
    data(){
        return{
            restaurantSlug: this.$route.params.restaurantSlug,
        }
    },
    computed: {
        ...mapState('restaurant', ['restaurants', 'banner', 'categories']),
        
        currentRestaurant() {
            return this.restaurants.find(restaurant => restaurant.slug === this.restaurantSlug) || {};
        },
        bannerWithImagePath() {
            if (this.banner && this.banner.image_path) {
                return {
                    ...this.banner,
                    image_path: this.getFullImagePath(this.banner.image_path)
                };
            }
            return this.banner;
        }
    },
    methods: {
        ...mapActions('restaurant', ['fetchRestaurants', 'fetchBanner', 'fetchCategories']),
        showContactsPopUp() {
            this.$refs.ContactsPopUp.showPopUp();
        },
        getFullImagePath(imageName) {
            return `${BASE_URL}${imageName}`;
        },
        initData() {
            if (!this.restaurants.length) {
                this.fetchRestaurants();
            }
            if (!this.categories.length) {
                this.fetchCategories();
            }
        },
        initCategoryList() {
            this.$refs.CategoryList.categories = this.categories;
        },
        initCategoryTabs() {
            this.$refs.CategoryTabs.categories = this.categories;
            this.$refs.CategoryTabs.currentRestaurantLogo = this.currentRestaurant.photo ? this.getFullImagePath(this.currentRestaurant.photo) : '';
            this.$refs.CategoryTabs.currentRestaurantName = this.currentRestaurant.name || '';
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
}
</script>

<style scoped>
    .category-page{
        padding-top: calc(65px + 48px + 3 * 24px);
        padding-bottom: calc(65px + 48px + 3 * 24px);
    }
</style>

<style scoped>
    @media (max-width: 768px){
        .category-page{
            padding-top: calc(48px * 2 + 16px * 2 + 18px);
            padding-bottom: 22px;
        }
    }
</style>