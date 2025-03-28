<template>
    <div class="main-page"
        :class="{ 
            twin: restaurants.length == 2,
            solo: restaurants.length == 1,
        }"
    >
        <MainHeader 
            ref="MainHeader"
            @showDeliveryPopUp="showDeliveryPopUp"
            @showSchedulePopUp="showSchedulePopUp"
        />
        <DeliveryPopUp
            ref="DeliveryPopUp"
        />
        <SchedulePopUp
            ref="SchedulePopUp"
            :restaurants="restaurants"
        />
        <MainBannerPopUp
            :banner="bannerWithImagePath"
        />
        <div class="restaurants__list">
            <div
                v-for="(item, index) in restaurants"
                :key="index"
                class="restaurant__item"
                :style="{ backgroundImage: `url('/images/restaurants/paper.png'), url('${getFullImagePath(item.background_image)}')` }"
                @click="goToRestaurant(item.slug)"
            >
                <div class="restaurant__noise"></div>
                <div class="restaurant__item__logo">
                    <img class="restaurant__item__logo-img" :src="getFullImagePath(item.photo)">
                </div>
                <div class="restaurant__item__description">
                    {{ item.description }}
                </div>
                <div class="restaurant__item__btn btn" @click="goToRestaurant(item.slug)">
                    Перейти в меню
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue';
import DeliveryPopUp from '../components/DeliveryPopUp.vue';
import SchedulePopUp from '../components/SchedulePopUp.vue';
import MainBannerPopUp from '../components/MainBannerPopUp.vue';
import { mapState, mapActions } from 'vuex';

const BASE_URL = process.env.MIX_RAVE_IMAGE_STORAGE_BASE;

export default {
    name: 'MainPage',
    components: {
        MainHeader,
        DeliveryPopUp,
        SchedulePopUp,
        MainBannerPopUp
    },
    computed: {
        ...mapState('restaurant', ['restaurants', 'banner']),
        
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
        ...mapActions('restaurant', ['fetchRestaurants', 'fetchBanner']),
        showDeliveryPopUp() {
            this.$refs.DeliveryPopUp.showPopUp();
        },
        showSchedulePopUp() {
            this.$refs.SchedulePopUp.showPopUp();
        },
        goToRestaurant(restaurantSlug) {
            this.$router.push({ name: 'categories', params: { restaurantSlug } });
        },
        getFullImagePath(imageName) {
            return `${BASE_URL}${imageName}`;
        },
    },
    mounted() {
        if (!this.restaurants.length) {
            this.fetchRestaurants();
        }
        if (!this.banner) {
            this.fetchBanner();
        }
    }
};
</script>

<style scoped>
    .main-page{
        /* width: 100vw; */
        height: 100vh;
        min-height: 100vh;
    }
    .restaurants__list{
        width: 100%;
        height: 100%;
        display: flex;
    }
    .restaurant__item {
        position: relative;
        background-size: cover, cover; 
        background-position: center, center; 
        background-repeat: no-repeat, no-repeat; 
        width: 33%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 20px;

        gap: 16px;

        filter: grayscale(100%); 
        transition: filter 0.3s ease-in-out;
    }

    .main-page.twin .restaurant__item{
        width: 50%;
    }

    .main-page.solo .restaurant__item{
        width: 100%;
    }


    .restaurant__item::after{
            content: '';
            background-color: #000000;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            opacity: 0.5;
            z-index: 1;
        }

        .restaurant__item__logo{
            z-index: 2;
        }
        .restaurant__item__description{
            z-index: 2;
        }
        .restaurant__item__btn{
            z-index: 2;
        }


    .restaurant__item:hover {
        filter: grayscale(0%);
    }

    .restaurant__item:hover .restaurant__item__logo{
        opacity: 1;
    }

    .restaurant__item__logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        background: #fff;
        border-radius: 4px;
        opacity: 0.5;
    }

    .restaurant__item__logo-img {
        width: 150px;
        height: 150px;
        transition: 0.3s ease;
        border-radius: 4px;
    }

    .restaurant__item:hover .restaurant__item__logo-img{
        width: 190px;
        height: 190px;
    } 

    .restaurant__item__description {
        max-width: 311px;
        font-size: 18px;
        font-weight: 500;
        color: white;

        white-space: pre-line; 

        font-family: Vela Sans GX;
        font-size: 18px;
        font-weight: 700;
        line-height: 18px;
        letter-spacing: -0.05em;
        text-align: center;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;

        text-transform: uppercase;
    }

    .restaurant__item__btn {
        width: 150px;
        height: 48px;
        background: #FFFFFC;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Vela Sans GX;
        font-size: 14px;
        font-weight: 600;
        line-height: 20.3px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #000;

        cursor: pointer;
        transition: 0.3s ease;
    }

    .restaurant__item__btn:hover{
        background: var(--Btn-Hover-Red, #BE1522);
        color: #FFFFFF;

    }

    .restaurant__noise {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('/images/restaurants/noisy-bg.png');
        opacity: 0.2;
        mix-blend-mode: overlay;
        pointer-events: none; 
    }
</style>

<style scoped>
    @media (max-width: 1000px){
        .main-page{
            height: auto;

            background-image: url('/images/restaurants/paper.png');
            background-size: cover; 
            background-position: center; 
            background-repeat: no-repeat; 
            background-color: var(--Btn-Black, #000000);
        }
        .restaurants__list{
            flex-direction: column;
            padding: 113px 28px 28px 28px;
        }
        .restaurant__item{
            height: 33%;
            width: 100%;
            background-size: cover, cover;
            padding: 63px;
        }
        .main-page.twin .restaurant__item{
            width: 100%;
            height: 33%;
        }
        .main-page.solo .restaurant__item{
            width: 100%;
            height: 100%;
        }
    }

    @media (max-width: 768px){
        .restaurant__item{
            filter: none;
            padding: 42px;
        }
        .restaurant__item:hover {
            filter: none;
        } 
        .restaurants__list{
            padding: 82px 16px 16px 16px;
        }

        .restaurant__item{
            position: relative;
        }

        .restaurant__item::after{
            content: '';
            background-color: #000000;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            opacity: 0.65;
            z-index: 1;
        }

        .restaurant__item__logo{
            z-index: 2;
            opacity: 1;
        }
        .restaurant__item__description{
            z-index: 2;
        }
        .restaurant__item__btn{
            z-index: 2;
        }
    }

    @media (max-width: 500px){
        .restaurant__item{
            gap: 14px;
        }
        .restaurant__item__logo-img{
            width: 76px;
            height: 76px;
        }
        .restaurant__item:hover .restaurant__item__logo-img{
            width: 96px;
            height: 96px;
        } 
        .restaurant__item__description{
            max-width: 228px;
            font-family: Vela Sans GX;
            font-size: 12px;
            font-weight: 600;
            line-height: 14.16px;
            letter-spacing: -0.05em;
            text-align: center;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        .restaurant__item__btn{
            height: 36px;
            width: 110px;
            font-family: Vela Sans GX;
            font-size: 10.24px;
            font-weight: 600;
            line-height: 14.84px;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
    }
</style>