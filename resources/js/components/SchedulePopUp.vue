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
                        Принимаем заказы на доставку и самовывоз <nobr> ПН-ЧТ: 11:00-20:20,</nobr> <nobr>ПТ-ВС: 11:00-21:20</nobr>
                    </div>
                </div>
                
            </div>

            <div class="schedule__pop-up__footer">
                <div class="schedule__pop-up__footer-item">
                    резервный номер для заказа: <br>
                    <span class="red-text">
                        <a href="tel:+79490995393">+7 (949)  099-53-93</a>
                    </span>
                </div>
                <div class="schedule__pop-up__footer-item">
                    Единый номер службы достваки: <br>
                    <span class="red-text">
                        <a href="tel:238">238</a>
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
            document.body.style.overflow = 'auto';
        },
        showPopUp(){
            document.querySelector('.schedule__pop-up').style.display = "block";
            document.body.style.overflow = 'hidden';
        },
    },
    props: {
        restaurants: Array,
    },
    data(){
        return {

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

        overflow-y: scroll;
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
        align-items: flex-start;
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
        margin-right: 40px;
    }
    span.red-text{
        font-family: Vela Sans GX;
        color: #BE1522;
    }
    span.red-text a{
        font-family: Vela Sans GX;
        color: #BE1522;
        text-decoration: none;
    }
    nobr{
        font-family: inherit;
    }
</style>

<style scoped>
    @media(max-width: 1214px){
        .schedule__pop-up__content,
        .schedule__pop-up__footer {
            padding: 0 40px;
        }
    }

    @media(max-width: 914px){
        .schedule__pop-up__content,
        .schedule__pop-up__footer {
            padding: 0 20px;
        }
    }

    @media (max-width: 768px){
        .schedule__pop-up__frame{
            padding: 24px 12px;
            margin: 18px 16px 26px;
            width: calc(100% - 16px* 2);
            height: calc(100% - 18px - 26px);
            height: fit-content;
            max-height: calc(100% - 18px - 26px);
        }
        .schedule__pop-up__header{
            height: 33px;
            margin-bottom: 56px;
        }
        .schedule__pop-up__content{
            margin-bottom: 12px;
            padding: 0;
        }
        .schedule__pop-up__content-title{
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
        .schedule__pop-up__content-item{
            font-family: Vela Sans GX;
            font-size: 14px;
            font-weight: 600;
            line-height: 20.3px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        .schedule__pop-up__content-item+.schedule__pop-up__content-item{
            margin-top: 24px;
        }
        .schedule__pop-up__footer{
            margin-bottom: 0;
            padding: 0;
            flex-direction: column;
        }
        .schedule__pop-up__footer .schedule__pop-up__footer-item{
            font-family: Vela Sans GX;
            font-size: 14px;
            font-weight: 600;
            line-height: 20.3px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            
            margin-right: 0;
            width: 100%;
        }
        .schedule__pop-up__footer .schedule__pop-up__footer-item+.schedule__pop-up__footer-item{
            margin-top: 12px;
        }

        .schedule__pop-up__content-list .schedule__pop-up__content-item:last-child{
            margin-top: 56px;
        }
    }
</style>
