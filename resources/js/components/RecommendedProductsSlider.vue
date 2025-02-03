<template>
    <div class="recommended-products__wrapper">
        <div class="container">
            <div class="recommended-products">
                <div class="recommended-products__title__wrapper">
                    <div class="recommended-products__title">
                        С этим берут
                    </div>

                    <div class="recommended-products__slider-buttons" v-show="!isMobile">
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

                <!-- :breakpoints="{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }" -->
                <swiper
                    @swiper="onSwiper"
                    ref="swiper"
                    :slides-per-view="isMobile ? 1.2 : 4"
                    :loop="true"
                    :pagination="{ clickable: true }"
                >
                    <swiper-slide v-for="(item, index) in products" :key="index">
                        <RecommendedProductsItem :item="item" />
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
    data() {
        return {
            products: [],
            isMobile: false,
            swiperInstance: null
        };
    },
    methods: {
        initProductsData() {
            this.products = [
                {
                    id: "9e154f88-e460-4086-8e08-141d74786295",
                    name: "Шаурма кебаб гуакамоле",
                    price: "360.00",
                    media: [{ path: "/images/restaurants/products/1.png" }]
                },
                {
                    id: "9e154f88-e460-4086-8e08-141d74786295",
                    name: "Салат боул с курицей 1.",
                    price: "499.00",
                    media: [{ path: "/images/restaurants/products/2.png" }]
                },
                {
                    id: "9e154f88-e460-4086-8e08-141d74786295",
                    name: "Салат боул с курицей 2",
                    price: "499.00",
                    media: [{ path: "/images/restaurants/products/2.png" }]
                },
                {
                    id: "9e154f88-e460-4086-8e08-141d74786295",
                    name: "Салат боул с курицей 3",
                    price: "499.00",
                    media: [{ path: "/images/restaurants/products/2.png" }]
                },
                {
                    id: "9e154f88-e460-4086-8e08-141d74786295",
                    name: "Салат боул с курицей 4.",
                    price: "499.00",
                    media: [{ path: "/images/restaurants/products/2.png" }]
                }
            ];
        },
        checkMobile() {
            this.isMobile = window.innerWidth < 768;
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
        }
    },
    mounted() {
        this.initProductsData();
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
    font-size: 32px;
    font-weight: 500;
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
    border-top: 1px solid #9E9E9E;
}
</style>