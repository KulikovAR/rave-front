<template>
    <div class="product-page page">
        <Header
            @showContactsPopUp="showContactsPopUp"
            :restaurantSlug="restaurantSlug"
        />
        <ContactsPopUp
            ref="ContactsPopUp"
            :restaurantSlug="restaurantSlug"
        />
        <BreadCrumbs :links="breadCrumbs" />
        <ProductItem 
            ref="ProductItem"
            :restaurantSlug="restaurantSlug"
            :product="product"  
        />
        <RecommendedProductsSlider 
            ref="RecommendedProductsSlider"
            :restaurantSlug="restaurantSlug"
            :categorySlug="categorySlug"
            :products="product.recommended_products"
        />
        <NotWorkingTimePopUp
            :restaurantSlug="restaurantSlug"
        />
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Header from '../components/Header.vue';
import ContactsPopUp from '../components/ContactsPopUp.vue';
import BreadCrumbs from '../components/BreadCrumbs.vue';
import ProductItem from '../components/ProductItem.vue';
import RecommendedProductsSlider from '../components/RecommendedProductsSlider.vue';
import NotWorkingTimePopUp from '../components/NotWorkingTimePopUp.vue';

const BASE_URL = 'https://rave-back.pisateli-studio.ru/storage/';

export default {
    name: 'ProductPage',
    components: {
        Header,
        ContactsPopUp,
        BreadCrumbs,
        ProductItem,
        RecommendedProductsSlider,
        NotWorkingTimePopUp,
    },
    data() {
        return {
            restaurantSlug: this.$route.params.restaurantSlug,
            categorySlug: this.$route.params.categorySlug,
            productSlug: this.$route.params.productSlug,
            breadCrumbs: [],
            product: {},
        };
    },
    computed: {
        ...mapState('restaurant', ['products']),
        ...mapGetters('restaurant', ['getProductBySlug']),
        
        productData() {
            const product = this.getProductBySlug(this.productSlug);
            return product;
        }
    },
    watch: {
        '$route.params.productSlug': 'loadProductData'
    },
    methods: {
        ...mapActions('restaurant', ['fetchProducts']),
        
        showContactsPopUp() {
            this.$refs.ContactsPopUp.showPopUp();
        },

        getFullImagePath(imageName) {
            return `${BASE_URL}${imageName}`;
        },

        initBreadCrumbs() {
            if (this.product) {
                this.breadCrumbs = [
                    {
                        textname: 'Каталог',
                        name: 'catalog',
                        params: {
                            restaurantSlug: this.restaurantSlug,
                            categorySlug: this.categorySlug
                        }
                    },
                    {
                        textname: this.product.name,
                        name: 'product',
                        params: {
                            restaurantSlug: this.restaurantSlug,
                            categorySlug: this.categorySlug,
                            productSlug: this.productSlug
                        }
                    }
                ];
            }
        },

        loadProductData() {
            if (!this.productData) {
                this.$store.dispatch('restaurant/fetchProducts')
                    .then(() => {
                        const loadedProduct = this.productData;
                        if (loadedProduct) {
                            this.product = {
                                ...loadedProduct,
                                image: loadedProduct.media?.[0]?.path ? this.getFullImagePath(loadedProduct.media[0].path) : null,
                                recommended_products: loadedProduct.recommended_products.map(product => ({
                                    ...product,
                                    image: product.media?.[0]?.path ? this.getFullImagePath(product.media[0].path) : null
                                }))
                            };
                            this.initBreadCrumbs();
                        }
                    })
                    .catch(error => {
                        console.error('Ошибка при загрузке продукта:', error);
                    });
            } else {
                this.product = {
                    ...this.productData,
                    image: this.productData.media?.[0]?.path ? this.getFullImagePath(this.productData.media[0].path) : null,
                    recommended_products: this.productData.recommended_products.map(product => ({
                        ...product,
                        image: product.media?.[0]?.path ? this.getFullImagePath(product.media[0].path) : null
                    }))
                };
                this.initBreadCrumbs();
            }
        }
    },
    mounted() {
        if (this.products.length === 0) {
            this.$store.dispatch('restaurant/fetchProducts')
                .then(() => {
                    this.loadProductData();
                })
                .catch(error => {
                    console.error('Ошибка при загрузке продуктов:', error);
                });
        } else {
            this.loadProductData();
        }

        this.$store.dispatch('cart/validateCart');
    }
};
</script>

<style scoped>
    .product-page{
        padding-top: calc(65px + 2 * 24px);
        padding-bottom: calc(65px + 2 * 24px);
    }
</style>

<style scoped>
    @media (max-width: 768px){
        .product-page{
            padding-top: calc(48px + 18px * 2);
            padding-bottom: 22px;
        }
    }
</style>