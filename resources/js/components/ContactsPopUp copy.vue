<template>
    <div class="contacts__pop-up">
        <div class="contacts__pop-up__frame">
            <div class="contacts__pop-up__header">
                <div class="contacts__pop-up__header__logo">
                    <img class="contacts__pop-up__header__logo-img" src="/images/logo.svg" alt="logo">
                </div>
                <img class="contacts__pop-up__cross" src="/images/pop-ups/cross.svg" alt="close" @click="closePopUp">
            </div>

            <div class="contacts__pop-up__content" v-if="restaurant">
                <div class="contacts__pop-up__content-title">Контакты</div>
                <div class="contacts__pop-up__content-list">
                    <div class="contacts__pop-up__content-item">
                        <span class="red-text">{{ restaurant.name }}:</span> {{ restaurant.address }} <br>
                        Принимаем заказы на доставку и самовывоз <br>
                        {{ groupSchedule() }}
                    </div>
                </div>
            </div>

            <div v-if="restaurant" class="contacts__pop-up__footer">
                <div class="contacts__pop-up__content-item">
                    резервный номер для заказа:
                    <span class="red-text">
                        <a href="tel:+79490995393">+7 (949) 099-53-93</a>
                    </span>
                </div>
                <div class="contacts__pop-up__content-item">
                    Единый номер службы доставки:
                    <span class="red-text">
                        <a href="tel:238">238</a>
                    </span>
                </div>
            </div>

            <div v-if="restaurant" class="contacts__pop-up__map">
                <a class="contacts__pop-up__map-link" :href="restaurant.map_link" target="_blank">
                    <img class="contacts__pop-up__map-img" :src="getFullImagePath(restaurant.map_image)" alt="Карта">
                </a>
            </div>
        </div>

        <div class="contacts__pop-up__bg" @click="closePopUp"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

const BASE_URL = process.env.MIX_RAVE_IMAGE_STORAGE_BASE;

export default {
    name: 'ContactsPopUp',
    props: {
        restaurantSlug: String,
    },
    computed: {
        ...mapState('restaurant', ['restaurants']),
        restaurant() {
            // Проверяем, если ресторан найден по slug
            return this.restaurants.find(r => r.slug === this.restaurantSlug) || null;
        }
    },
    methods: {
        closePopUp() {
            document.querySelector('.contacts__pop-up').style.display = "none";
            document.body.style.overflow = 'auto';
        },
        showPopUp() {
            document.querySelector('.contacts__pop-up').style.display = "block";
            document.body.style.overflow = 'hidden';
        },
        groupSchedule() {
            if (!this.restaurant || !this.restaurant.schedule) return '';

            const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const sortedSchedule = [...this.restaurant.schedule].sort(
                (a, b) => dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week)
            );

            let groupedSchedule = [];
            let groupedDays = [];
            let previousTime = null;

            for (const day of sortedSchedule) {
                if (!day.is_open || !day.opening_time || !day.closing_time) continue;
                
                const currentTime = `${this.formatTime(day.opening_time)} - ${this.formatTime(day.closing_time)}`;
                const currentDayString = this.getDayName(day.day_of_week);

                if (currentTime === previousTime) {
                    groupedDays.push(currentDayString);
                } else {
                    if (groupedDays.length > 0) {
                        groupedSchedule.push(this.formatGroupedDays(groupedDays, previousTime));
                    }
                    groupedDays = [currentDayString];
                    previousTime = currentTime;
                }
            }

            if (groupedDays.length > 0) {
                groupedSchedule.push(this.formatGroupedDays(groupedDays, previousTime));
            }

            return groupedSchedule.join(', ');
        },
        formatGroupedDays(days, time) {
            return days.length > 1 ? `${days[0]}-${days[days.length - 1]}: ${time}` : `${days[0]}: ${time}`;
        },
        getDayName(day) {
            return {
                'Monday': 'ПН', 'Tuesday': 'ВТ', 'Wednesday': 'СР', 'Thursday': 'ЧТ', 
                'Friday': 'ПТ', 'Saturday': 'СБ', 'Sunday': 'ВС'
            }[day] || '';
        },
        formatTime(time) {
            return time.slice(0, 5);
        },
        getFullImagePath(imageName) {
            return `${BASE_URL}${imageName}`;
        }
    },
    created() {
        if (!this.restaurants || this.restaurants.length === 0) {
            this.$store.dispatch('restaurant/fetchRestaurants');
        }
    }
}
</script>

<style scoped>
    .contacts__pop-up{
        position: fixed;
        width: 100%;
        height: 100%;
        /* display: block; */
        display: none;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        z-index: 25;
    }
    .contacts__pop-up__frame{
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: 24px 28px;
        padding: 24px 28px;
        position: absolute;
        width: calc(100% - 56px);
        height: calc(100% - 48px);
        background: #FFFFFC;
        border-radius: 2px;
        box-shadow: 0px 2px 10px 0px rgba(184, 164, 142, 0.4);
        z-index: 35;
        display: flex;
        flex-direction: column;
        align-items: start;

        background-image: url('/images/pop-ups/paper.png'), url('/images/pop-ups/noisy-bg.png');
        background-size: cover, cover; 
        background-position: center, center; 
        background-repeat: no-repeat, no-repeat; 

        overflow-y: scroll;
    }
    .contacts__pop-up__bg{
        position: absolute;
        z-index: 34;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        margin: auto;
        background: rgba(0,0,0,0.4);
    }
    .contacts__pop-up__cross{
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
</style>

<style scoped>
    .contacts__pop-up__header{
        height: 42px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 80px;
    }
    .contacts__pop-up__header__logo,
    .contacts__pop-up__header__logo-img{
        height: 100%;
    }
    .contacts__pop-up__content{
        padding: 0 120px;
        margin-bottom: 33px;
        text-transform: uppercase;
    }

    .contacts__pop-up__content-title{
        font-family: Vela Sans GX;
        font-size: 32px;
        font-weight: 600;
        line-height: 46.4px;
        letter-spacing: -0.05em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #000;
        margin-bottom: 33px;
    }
    .contacts__pop-up__content-item{
        font-family: Vela Sans GX;
        font-size: 18px;
        font-weight: 600;
        line-height: 26.1px;
        letter-spacing: -0.03em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #000;

    }

    .contacts__pop-up__content-item+.contacts__pop-up__content-item{
        margin-top: 33px;
    }

    .contacts__pop-up__footer{
        padding: 0 120px;
        text-transform: uppercase;
        margin-bottom: 33px;
    }

    .contacts__pop-up__footer .contacts__pop-up__content-item{
        font-family: Vela Sans GX;
        font-size: 18px;
        font-weight: 600;
        line-height: 26.1px;
        letter-spacing: -0.03em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
    }

    .contacts__pop-up__footer .contacts__pop-up__content-item+.contacts__pop-up__content-item{
        margin-top: 8px;
    }
    span.red-text{
        font-family: Vela Sans GX;
        color: #BE1522;
        white-space: nowrap;
    }
    span.red-text a{
        font-family: Vela Sans GX;
        color: #BE1522;
        text-decoration: none;
    }

    .contacts__pop-up__map{
        padding: 0 120px;
        height: 300px;
        width: 100%;
        border-radius: 12px;
        /* overflow: hidden; */
    }
    .contacts__pop-up__map-link{
        height: 100%;
        display: block;
        border-radius: 12px;
        overflow: hidden;
    }
    .contacts__pop-up__map-img{
        height: 100%;
        width: 100%;
        object-fit: contain;
        object-position: left top;
    }
</style>

<style scoped>
    @media(max-width: 1214px){
        .contacts__pop-up__content,
        .contacts__pop-up__footer,
        .contacts__pop-up__map {
            padding: 0 40px;
        }
    }

    @media(max-width: 914px){
        .contacts__pop-up__content,
        .contacts__pop-up__footer,
        .contacts__pop-up__map {
            padding: 0 20px;
        }
    }

    @media (max-width: 768px){
        .contacts__pop-up__frame{
            padding: 24px 12px;
            margin: 18px 16px 26px;
            width: calc(100% - 16px* 2);
            height: calc(100% - 18px - 26px);
            height: fit-content;
            max-height: calc(100% - 18px - 26px);
        }
        .contacts__pop-up__header{
            height: 33px;
            margin-bottom: 32px;
        }
        .contacts__pop-up__content{
            margin-bottom: 24px;
            padding: 0;
        }
        .contacts__pop-up__map{
            padding: 0;
            height: auto;
        }
        .contacts__pop-up__content-title{
            font-family: Vela Sans GX;
            font-size: 18px;
            font-weight: 600;
            line-height: 26.1px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            margin-bottom: 24px;
        }
        .contacts__pop-up__content-item{
            font-family: Vela Sans GX;
            font-size: 14px;
            font-weight: 600;
            line-height: 20.3px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        .contacts__pop-up__content-item+.contacts__pop-up__content-item{
            margin-top: 24px;
        }
        .contacts__pop-up__footer{
            margin-bottom: 32px;
            padding: 0;
        }
        .contacts__pop-up__footer .contacts__pop-up__content-item{
            font-family: Vela Sans GX;
            font-size: 14px;
            font-weight: 600;
            line-height: 20.3px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        /* .contacts__pop-up__map-link{
            height: 300px;
        }
        .contacts__pop-up__map-img{
            object-fit: cover;
            object-position: center;
        } */
    }
</style>
