<template>
    <div class="main-page">
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
        />
        <div class="restaurants__list">
            <div
                v-for="(item, index) in restaurants"
                :key="index"
                class="restaurant__item"
                :style="{ backgroundImage: `url('/images/restaurants/paper.png'), url('${item.background_image}')` }"
            >
                <div class="restaurant__noise"></div>
                <div class="restaurant__item__logo">
                    <img class="restaurant__item__logo-img" :src="item.photo" alt="">
                    <div class="restaurant__item__description">
                        {{item.description}}
                    </div>
                    <div class="restaurant__item__btn btn">
                        Перейти меню
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue';
import DeliveryPopUp from '../components/DeliveryPopUp.vue';
import SchedulePopUp from '../components/SchedulePopUp.vue';
export default {
    name: 'MainPage',
    components: {
        MainHeader,
        DeliveryPopUp,
        SchedulePopUp
    },
    data(){
        return{
            restaurants: [
                {
                    name: 'rave-sushi',
                    description: 'погрузись в Мир \n японской кухни!\n Премиум роллы и суши',
                    photo: '/images/restaurants/logo-1.png',
                    background_image: '/images/restaurants/bg-item-1.jpg',
                },
                {
                    name: 'rave-bistro',
                    description: 'Авторская шаурма, \n хот-доги и сендвичи \n в поп-арт стиле',
                    photo: '/images/restaurants/logo-2.png',
                    background_image: '/images/restaurants/bg-item-2.jpg',
                },
                {
                    name: 'rave-burger',
                    description: 'Авторскаие бургеры,\n традиционный вок в атмосфере \n индустриального лофта',
                    photo: '/images/restaurants/logo-3.png',
                    background_image: '/images/restaurants/bg-item-3.jpg',
                }
            ]
        }
    },
    methods: {
        showDeliveryPopUp(){
            this.$refs.DeliveryPopUp.showPopUp();
        },
        showSchedulePopUp(){
            this.$refs.SchedulePopUp.showPopUp();
        }
    }
}
</script>

<style scoped>
    .main-page{
        width: 100vw;
        height: 100vh;
    }
    .restaurants__list{
        width: 100%;
        height: 100%;
        display: flex;
    }
    .restaurant__item {
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

    .restaurant__item:hover {
        filter: grayscale(0%);
    }

    .restaurant__item__logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }

    .restaurant__item__logo-img {
        width: 150px;
        height: 150px;
        transition: 0.3s ease;
    }

    .restaurant__item:hover .restaurant__item__logo-img{
        width: 190px;
        height: 190px;
    } 

    .restaurant__item__description {
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