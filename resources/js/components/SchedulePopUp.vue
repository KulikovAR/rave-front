<template>
    <div class="schedule__pop-up">
        <div class="schedule__pop-up__frame">
            <div class="schedule__pop-up__header">
                <div class="schedule__pop-up__header__logo">
                    <img class="schedule__pop-up__header__logo-img" src="/images/logo.svg" alt="logo">
                </div>
                <img class="schedule__pop-up__cross" src="/images/pop-ups/cross.svg" alt="close" @click="closePopUp()">
            </div>
            
            <div class="schedule__pop-up__content">
                <div class="schedule__pop-up__content-title">
                    График работы
                </div>
                <div class="schedule__pop-up__content-list">
                    <div 
                        v-for="(item,index) in this.restaurants" 
                        :key="index" 
                        class="schedule__pop-up__content-item"
                    >
                        <span class="red-text">{{item.name}}:</span> {{item.address}}
                    </div>
                    
                    <div class="schedule__pop-up__content-item">
                        Принимаем заказы на доставку и самовывоз  ПН-ЧТ: 11:00-20:20, ПТ-ВС: 11:00-21:20
                    </div>
                </div>
                
            </div>

            <div class="schedule__pop-up__footer">
                <div class="schedule__pop-up__footer-item">
                    резервный номер для заказа: <br>
                    <span class="red-text">
                        +7 (949)  099-53-93
                    </span>
                </div>
                <div class="schedule__pop-up__footer-item">
                    Единый номер службы достваки: <br>
                    <span class="red-text">
                        238
                    </span>
                </div>
            </div>


            
        </div>
        

        <div class="schedule__pop-up__bg"></div>
    </div>
</template>

<script>
export default {
    name: 'SchedulePopUp',
    methods: {
        closePopUp(){
            document.querySelector('.schedule__pop-up').style.display = "none";
        },
        showPopUp(){
            document.querySelector('.schedule__pop-up').style.display = "block";
        },
    },
    data(){
        return {
            restaurants: [
                {
                    'name': 'RAVE BURGER',
                    'address': 'Г. Донецк. ул. Университетская 20',
                },
                {
                    'name': 'RAVE BISTRO',
                    'address': 'Г. Донецк, бул. Пушкина 18',
                },
                {
                    'name': 'RAVE SUSHI',
                    'address': 'г. Донецк, бул. Пушкина 25',
                }
            ]
        }
    },
    mounted() {
        document.querySelector('.schedule__pop-up__bg').addEventListener('click', () => {
            this.closePopUp();
        });
    },
}
</script>

<style scoped>
    .schedule__pop-up{
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
    .schedule__pop-up__frame{
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
    .schedule__pop-up__bg{
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
    .schedule__pop-up__cross{
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
</style>

<style scoped>
    .schedule__pop-up__header{
        height: 42px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 80px;
    }
    .schedule__pop-up__header__logo,
    .schedule__pop-up__header__logo-img{
        height: 100%;
    }
    .schedule__pop-up__content{
        padding: 0 120px;
        margin-bottom: 80px;
        text-transform: uppercase;
    }

    .schedule__pop-up__content-title{
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
    .schedule__pop-up__content-item{
        font-family: Vela Sans GX;
        font-size: 24px;
        font-weight: 600;
        line-height: 34.8px;
        letter-spacing: -0.05em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #000;

    }

    .schedule__pop-up__content-item+.schedule__pop-up__content-item{
        margin-top: 33px;
    }

    .schedule__pop-up__footer{
        padding: 0 120px;

        width: 100%;
        display: flex;
        align-items: center;
        text-transform: uppercase;
    }

    .schedule__pop-up__footer .schedule__pop-up__footer-item{
        width: 50%;
        font-family: Vela Sans GX;
        font-size: 24px;
        font-weight: 600;
        line-height: 34.8px;
        letter-spacing: -0.03em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #000;

    }
    span.red-text{
        font-family: Vela Sans GX;
        color: #BE1522;
    }
</style>
