<template>
    <div class="recommended-products__wrapper" v-if="products && products.length > 0">
        <div class="container">
            <div class="recommended-products">
                <div class="recommended-products__title__wrapper">
                    <div class="recommended-products__title">
                        С этим берут
                    </div>

                    <!-- Показываем стрелки только если хватает товаров для прокрутки -->
                    <div class="recommended-products__slider-buttons" v-show="shouldShowArrows && !isMobile">
                        <img
                            class="recommended-products__slider-btn prev"
                            src="/images/slider/prev.svg"
                            alt="Назад"
                            @click="prevSlide"
                        />
                        <img
                            class="recommended-products__slider-btn next"
                            src="/images/slider/next.svg"
                            alt="Вперёд"
                            @click="nextSlide"
                        />
                    </div>
                </div>

                <swiper
                    @swiper="onSwiper"
                    ref="swiper"
                    :loop="false"
                    :pagination="{ clickable: true }"
                    :breakpoints="{
                        1100: { slidesPerView: 4, spaceBetween: 0 },
                        800: { slidesPerView: 3, spaceBetween: 0 },
                        500: { slidesPerView: 2, spaceBetween: 0 },
                        0: { slidesPerView: 1.3, spaceBetween: 16 }
                    }"
                >
                    <swiper-slide v-for="(item, index) in products" :key="index">
                        <RecommendedProductsItem 
                            :item="item" 
                            :restaurantSlug="restaurantSlug"
                            :categorySlug="categorySlug || item.categorySlug"
                            @itemAddedToCart="itemAddedToCart"
                        />
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import RecommendedProductsItem from "./RecommendedProductsItem.vue";

export default {
    name: "RecommendedProductsSlider",
    components: { Swiper, SwiperSlide, RecommendedProductsItem },
    props: {
        restaurantSlug: String,
        categorySlug: String,
        products: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            isMobile: false,
            swiperInstance: null,
            slidesPerView: 4 // Значение по умолчанию, обновляется динамически
        };
    },
    computed: {
        shouldShowArrows() {
            return this.products.length > this.slidesPerView;
        }
    },
    methods: {
        checkMobile() {
            this.isMobile = window.innerWidth <= 500;
            this.updateSlidesPerView();
        },
        updateSlidesPerView() {
            if (window.innerWidth >= 1100) {
                this.slidesPerView = 4;
            } else if (window.innerWidth >= 800) {
                this.slidesPerView = 3;
            } else if (window.innerWidth >= 500) {
                this.slidesPerView = 2;
            } else {
                this.slidesPerView = 1.3;
            }
        },
        onSwiper(swiper) {
            this.swiperInstance = swiper;
        },
        prevSlide() {
            if (this.swiperInstance) {
                this.swiperInstance.slidePrev();
            }
        },
        nextSlide() {
            if (this.swiperInstance) {
                this.swiperInstance.slideNext();
            }
        },
        itemAddedToCart() {
            this.$emit('itemAddedToCart');
        },
        updateSwiper() {
            if (this.swiperInstance) {
                this.swiperInstance.update();
            }
        }
    },
    watch: {
        products: 'updateSwiper'
    },
    mounted() {
        this.checkMobile();
        window.addEventListener("resize", this.checkMobile);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.checkMobile);
    }
};
</script>

<style scoped>
    .recommended-products__title__wrapper {
        margin-bottom: 24px;
        height: 38px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .recommended-products__title {
        font-family: Vela Sans GX;
        font-size: 32px;
        font-weight: 500;
        line-height: 38.4px;
        letter-spacing: -0.03em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        text-transform: uppercase;
        color: var(--Btn-Black, #000);
    }

    .recommended-products__slider-buttons {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .recommended-products__slider-btn {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }

    .swiper-slide {
        display: flex;
        justify-content: center;
    }
    .swiper{
        border-left: 1px solid #9E9E9E;
        /* border-top: 1px solid #9E9E9E; */
    }
</style>

<style scoped>
    @media (max-width: 768px){
        .recommended-products__title__wrapper{
            margin-bottom: 18px;
        }
        .recommended-products__title{
            font-family: Vela Sans GX;
            font-size: 18px;
            font-weight: 500;
            line-height: 21.6px;
            letter-spacing: -0.03em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
    }

    @media (max-width: 500px){
        .swiper{
            border: none;
            padding-right: 32px;
        }
        .recommended-products__wrapper .container{
            padding: 0;
        }
        .swiper-slide:first-child {
            margin-left: 16px;
        }
        .recommended-products__title{
            padding-left: 16px;
        }
    }
</style>