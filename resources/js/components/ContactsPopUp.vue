<template>
    <div class="contacts__pop-up">
        <div class="contacts__pop-up__frame">
            <div class="contacts__pop-up__header">
                <div class="contacts__pop-up__header__logo">
                    <img class="contacts__pop-up__header__logo-img" src="/images/logo.svg" alt="logo">
                </div>
                <img class="contacts__pop-up__cross" src="/images/pop-ups/cross.svg" alt="close" @click="closePopUp()">
            </div>
            
            <div class="contacts__pop-up__content">
                <div class="contacts__pop-up__content-title">
                    Контакты
                </div>
                <div class="contacts__pop-up__content-list">
                    <div class="contacts__pop-up__content-item">
                        <span class="red-text">{{this.restaurant.name}}:</span> {{this.restaurant.address}} <br>
                        Принимаем заказы на доставку и самовывоз  <br>
                        <!-- ПН-ЧТ: 11:00-20:20, ПТ-ВС: 11:00-21:20 -->
                        {{ groupSchedule() }}
                    </div>
                </div>
                
            </div>

            <div class="contacts__pop-up__footer">
                <div class="contacts__pop-up__content-item">
                    резервный номер для заказа: 
                    <span class="red-text">
                        +7 (949)  099-53-93
                    </span>
                </div>
                <div class="contacts__pop-up__content-item">
                    Единый номер службы достваки: 
                    <span class="red-text">
                        238
                    </span>
                </div>
            </div>


            <div class="contacts__pop-up__map">
                <img class="contacts__pop-up__map-img" :src="this.restaurant.map_image" alt="">
            </div>
            


            
        </div>
        

        <div class="contacts__pop-up__bg"></div>
    </div>
</template>

<script>
export default {
    name: 'ContactsPopUp',
    data(){
        return {
            restaurant: {},
            schedule: []
        }
    },
    methods: {
        closePopUp(){
            document.querySelector('.contacts__pop-up').style.display = "none";
        },
        showPopUp(){
            document.querySelector('.contacts__pop-up').style.display = "block";
        },
        initData(){
            this.restaurant = {
                name: 'RAVE BISTRO',
                address: 'Г. Донецк, бул. Пушкина 18',
                map_image: '/images/restaurants/maps/map-1.png'
            };
            this.schedule = [
                {
                    "id": "9e154f52-9616-4711-b0d1-f381b7bd56ba",
                    "day_of_week": "Monday",
                    "is_open": 1,
                    "opening_time": "11:00:00",
                    "closing_time": "20:20:00",
                    "restaurant_id": "9e154f52-885f-431d-9a98-740382fd1fbd",
                    "created_at": "2025-01-29T09:40:23.000000Z",
                    "updated_at": "2025-01-29T09:40:23.000000Z"
                },
                {
                    "id": "9e154f52-9978-47a9-9a9e-b619bfe3ff2c",
                    "day_of_week": "Wednesday",
                    "is_open": 1,
                    "opening_time": "11:30:00",
                    "closing_time": "20:20:00",
                    "restaurant_id": "9e154f52-885f-431d-9a98-740382fd1fbd",
                    "created_at": "2025-01-29T09:40:23.000000Z",
                    "updated_at": "2025-01-29T09:40:23.000000Z"
                },
                {
                    "id": "9e154f52-97f1-44c2-ab8d-2ffe4775f936",
                    "day_of_week": "Tuesday",
                    "is_open": 1,
                    "opening_time": "11:00:00",
                    "closing_time": "20:20:00",
                    "restaurant_id": "9e154f52-885f-431d-9a98-740382fd1fbd",
                    "created_at": "2025-01-29T09:40:23.000000Z",
                    "updated_at": "2025-01-29T09:40:23.000000Z"
                },
                
                {
                    "id": "9e154f52-9b08-4143-9303-df48a9094715",
                    "day_of_week": "Thursday",
                    "is_open": 1,
                    "opening_time": "11:00:00",
                    "closing_time": "20:20:00",
                    "restaurant_id": "9e154f52-885f-431d-9a98-740382fd1fbd",
                    "created_at": "2025-01-29T09:40:23.000000Z",
                    "updated_at": "2025-01-29T09:40:23.000000Z"
                },
                {
                    "id": "9e154f52-9c8c-4bc8-8470-f8fbd95d1e4d",
                    "day_of_week": "Friday",
                    "is_open": 1,
                    "opening_time": "11:00:00",
                    "closing_time": "21:20:00",
                    "restaurant_id": "9e154f52-885f-431d-9a98-740382fd1fbd",
                    "created_at": "2025-01-29T09:40:23.000000Z",
                    "updated_at": "2025-01-29T09:40:23.000000Z"
                },
                {
                    "id": "9e154f52-9e25-448e-86bc-555e2bc5c022",
                    "day_of_week": "Saturday",
                    "is_open": 1,
                    "opening_time": "11:00:00",
                    "closing_time": "21:20:00",
                    "restaurant_id": "9e154f52-885f-431d-9a98-740382fd1fbd",
                    "created_at": "2025-01-29T09:40:23.000000Z",
                    "updated_at": "2025-01-29T09:40:23.000000Z"
                },
                {
                    "id": "9e154f52-9fd2-400b-ac71-9edef12ac706",
                    "day_of_week": "Sunday",
                    "is_open": 1,
                    "opening_time": "11:00:00",
                    "closing_time": "21:20:00",
                    "restaurant_id": "9e154f52-885f-431d-9a98-740382fd1fbd",
                    "created_at": "2025-01-29T09:40:23.000000Z",
                    "updated_at": "2025-01-29T09:40:23.000000Z"
                }
            ];
        },
        groupSchedule() {
            // Сортировка дней недели по порядку (ПН, ВТ, СР, ЧТ, ПТ, СБ, ВС)
            const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            // Сортируем расписание по дням недели
            this.schedule.sort((a, b) => dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week));

            let groupedSchedule = [];
            let groupedDays = [];
            let previousTime = null;

            // Проходим по расписанию
            for (let i = 0; i < this.schedule.length; i++) {
                let currentDay = this.schedule[i];
                let currentDayString = this.getDayName(currentDay.day_of_week);
                let currentTime = `${this.formatTime(currentDay.opening_time)} - ${this.formatTime(currentDay.closing_time)}`;

                // Если время совпадает с предыдущим, группируем дни
                if (currentTime === previousTime) {
                    groupedDays.push(currentDayString);
                } else {
                    // Если расписание изменилось, добавляем в массив, объединяя дни в диапазоны
                    if (groupedDays.length > 0) {
                        groupedSchedule.push(this.formatGroupedDays(groupedDays, previousTime));
                    }
                    
                    // Обновляем для нового времени
                    groupedDays = [currentDayString];
                    previousTime = currentTime;
                }
            }

            // Добавляем последние группы
            if (groupedDays.length > 0) {
                groupedSchedule.push(this.formatGroupedDays(groupedDays, previousTime));
            }

            return groupedSchedule.join(', '); // Соединяем группы в одну строку через запятую
        },

        // Функция для форматирования группы дней в диапазон
        formatGroupedDays(days, time) {
            let groupedRange = days.length > 1 ? `${days[0]}-${days[days.length - 1]}` : days[0];
            return `${groupedRange}: ${time}`;
        },

        // Функция для получения русского названия дня недели
        getDayName(day) {
            switch (day) {
                case 'Monday': return 'ПН';
                case 'Tuesday': return 'ВТ';
                case 'Wednesday': return 'СР';
                case 'Thursday': return 'ЧТ';
                case 'Friday': return 'ПТ';
                case 'Saturday': return 'СБ';
                case 'Sunday': return 'ВС';
                default: return '';
            }
        },

        // Функция для форматирования времени (удаляет секунды)
        formatTime(time) {
            return time.split(':').slice(0, 2).join(':'); // Убираем секунды
        }
    },
    mounted() {
        this.initData();
        document.querySelector('.contacts__pop-up__bg').addEventListener('click', () => {
            this.closePopUp();
        });
    },
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
    }

    .contacts__pop-up__map{
        padding: 0 120px;
    }
</style>
