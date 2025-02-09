<template>
    <div v-if="!hasSeenPopUp && isClosed" class="not-working-time__pop-up">
        <div class="not-working-time__pop-up__frame">
            <div class="not-working-time__pop-up__title">
                “Заведение не работает до {{ nextOpenTime }}”
            </div>

            <div class="not-working-time__pop-up__btns">
                <div class="not-working-time__pop-up__btn" @click="closePopUp">
                    Понятно
                </div>
            </div>

            <img class="not-working-time__pop-up__cross" src="/images/pop-ups/cross.svg" alt="close" @click="closePopUp">
        </div>

        <div class="not-working-time__pop-up__bg" @click="closePopUp"></div>
    </div>
</template>

<script>
export default {
    name: 'NotWorkingTimePopUp',
    props: {
        restaurantSlug: String,
    },
    data() {
        return {
            nextOpenTime: '',
            schedule: [],
        };
    },
    computed: {
        restaurants() {
            return this.$store.getters['restaurant/restaurants'];
        },
        hasSeenPopUp() {
            return this.$store.getters['ui/hasSeenPopUp'](this.restaurantSlug); // Проверяем флаг для конкретного ресторана
        },
        isClosed() {
            const restaurant = this.restaurants.find(r => r.slug === this.restaurantSlug);
            if (!restaurant?.schedule || !this.schedule.length) return false;

            return this.checkWorkingTime();
        }
    },
    methods: {
        closePopUp() {
            this.$store.dispatch('ui/markPopUpAsSeen', this.restaurantSlug); // Сохраняем флаг ТОЛЬКО для этого ресторана
        },
        initScheduleData() {
            const restaurant = this.restaurants.find(r => r.slug === this.restaurantSlug);
            if (restaurant?.schedule) {
                this.schedule = restaurant.schedule;
                this.checkWorkingTime();
            } else {
                this.fetchRestaurants();
            }
        },
        async fetchRestaurants() {
            await this.$store.dispatch('restaurant/fetchRestaurants');
            this.initScheduleData();
        },
        checkWorkingTime() {
            if (!this.schedule.length) return false;

            const now = new Date();
            const today = now.toLocaleString('en-US', { weekday: 'long' });
            const currentTime = now.toTimeString().split(' ')[0];

            const todaySchedule = this.schedule.find(day => day.day_of_week === today);

            if (!todaySchedule || todaySchedule.is_open === 0) {
                this.nextOpenTime = this.getNextOpenTime();
                return true;
            }

            const openingTime = todaySchedule.opening_time?.substring(0, 5);
            const closingTime = todaySchedule.closing_time?.substring(0, 5);

            if (!openingTime || !closingTime || currentTime < openingTime || currentTime > closingTime) {
                this.nextOpenTime = this.getNextOpenTime();
                return true;
            }

            return false;
        },
        getNextOpenTime() {
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let now = new Date();
            let nextDayIndex = (now.getDay() + 1) % 7;

            for (let i = 0; i < 7; i++) {
                const nextDayName = daysOfWeek[nextDayIndex];
                const nextDaySchedule = this.schedule.find(day => day.day_of_week === nextDayName);

                if (nextDaySchedule?.is_open && nextDaySchedule.opening_time) {
                    return `${this.translateDay(nextDayName)} ${nextDaySchedule.opening_time.substring(0, 5)}`;
                }
                nextDayIndex = (nextDayIndex + 1) % 7;
            }

            return "неизвестно";
        },
        translateDay(day) {
            return {
                "Monday": "понедельника",
                "Tuesday": "вторника",
                "Wednesday": "среды",
                "Thursday": "четверга",
                "Friday": "пятницы",
                "Saturday": "субботы",
                "Sunday": "воскресенья"
            }[day] || day;
        }
    },
    watch: {
        restaurants: {
            immediate: true,
            handler(newRestaurants) {
                if (newRestaurants.length) {
                    this.initScheduleData();
                }
            }
        }
    },
    mounted() {
        if (!this.hasSeenPopUp) {
            this.initScheduleData();
        }
    }
};
</script>

<style scoped>
    .not-working-time__pop-up{
        position: fixed;
        width: 100%;
        height: 100%;
        display: block;
        /* display: none; */
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        z-index: 25;
    }
    .not-working-time__pop-up__frame{
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        padding: 24px 28px;
        position: absolute;
        width: fit-content;
        height: fit-content;
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

        gap: 34px;
        max-width: 512px;
    }
    .not-working-time__pop-up__bg{
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
    .not-working-time__pop-up__cross{
        width: 24px;
        height: 24px;
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
</style>

<style scoped>
    .not-working-time__pop-up__title{
        padding-right: 24px;

        font-family: Vela Sans GX;
        font-size: 32px;
        font-weight: 600;
        line-height: 40.64px;
        letter-spacing: -0.05em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        text-transform: uppercase;
        color: var(--Btn-Black, #000000);

    }

    .not-working-time__pop-up__btns{
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .not-working-time__pop-up__btn{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--Btn-Black, #000000);
        border-radius: 2px;

        font-family: Vela Sans GX;
        font-size: 14px;
        font-weight: 600;
        line-height: 20.3px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: var(--Btn-Black, #000000);
        cursor: pointer;
    }

    .not-working-time__pop-up__btn{
        background: var(--Btn-Black, #000000);
        color: var(--Color-White, #FFFFFC);
    }

    .not-working-time__pop-up__btn:hover{
        background: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522);
    }
</style>

<style scoped>
    @media (max-width: 768px){
        .not-working-time__pop-up__frame{
            gap: 16px;
            padding: 24px 24px;
            width: calc(100% - 16px* 2);
            max-width: unset;
        }
        
    }
    @media (max-width: 500px){
        .not-working-time__pop-up__title{
            font-family: Vela Sans GX;
            font-size: 18px;
            font-weight: 600;
            line-height: 22.86px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        .not-working-time__pop-up__cross{
            width: 16px;
            height: 16px;
            top: 8px;
            right: 8px;
        }
    }
</style>
