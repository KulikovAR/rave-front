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
            product: {},  // Данные о продукте
        };
    },
    computed: {
        ...mapState('restaurant', ['products']),
        ...mapGetters('restaurant', ['getProductBySlug']),
        
        // Получаем продукт из геттера
        productData() {
            const product = this.getProductBySlug(this.productSlug);
            console.log('productData computed:', product); // Логирование
            return product;
        }
    },
    watch: {
        // Слежение за изменением slug продукта и загрузка данных, если они изменяются
        '$route.params.productSlug': 'loadProductData'
    },
    methods: {
        ...mapActions('restaurant', ['fetchProducts']),
        
        showContactsPopUp() {
            this.$refs.ContactsPopUp.showPopUp();
        },

        // Получаем полный путь к изображению
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

        // Загружаем продукт, если его нет в хранилище
        loadProductData() {
            if (!this.productData) {
                console.log('Продукт не найден в хранилище, загружаем...');
                this.$store.dispatch('restaurant/fetchProducts')
                    .then(() => {
                        const loadedProduct = this.productData;
                        if (loadedProduct) {
                            this.product = {
                                ...loadedProduct,
                                image: this.getFullImagePath(loadedProduct.media[0].path),
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
                // Если продукт уже найден, просто инициализируем breadcrumbs
                this.product = {
                    ...this.productData,
                    image: this.getFullImagePath(this.productData.media[0].path),
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
        // При загрузке страницы проверяем, есть ли данные о продукте в хранилище
        if (this.products.length === 0) {
            console.log('Продукты не загружены, загружаем...');
            this.$store.dispatch('restaurant/fetchProducts')
                .then(() => {
                    this.loadProductData();  // После загрузки данных, загружаем продукт
                })
                .catch(error => {
                    console.error('Ошибка при загрузке продуктов:', error);
                });
        } else {
            // Если продукты уже загружены, сразу пытаемся найти продукт
            this.loadProductData();
        }
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