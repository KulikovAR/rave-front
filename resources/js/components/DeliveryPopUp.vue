<template>
    <div class="delivery__pop-up">
        <div class="delivery__pop-up__frame">
            <div class="delivery__pop-up__header">
                <div class="delivery__pop-up__header__logo">
                    <img class="delivery__pop-up__header__logo-img" src="/images/logo.svg" alt="logo">
                </div>
                <img class="delivery__pop-up__cross" src="/images/pop-ups/cross.svg" alt="close" @click="closePopUp()">
            </div>
            
            <div class="delivery__pop-up__content">
                <div class="delivery__pop-up__content-title">
                    Оплата и доставка
                </div>
                <div class="delivery__pop-up__content-list">
                    <div class="delivery__pop-up__content-item">
                        Расстояние до <span class="red-text">10 км</span>: <br>
                        Минимальная сумма заказа <span class="red-text">2000 р</span>,  стоимость доставки бесплатная
                    </div>
                    <div class="delivery__pop-up__content-item">
                        Расстояние от <span class="red-text">10 до 15 км</span>: <br>
                        Минимальная сумма заказа <span class="red-text">2500 р</span>, стоимость доставки бесплатная
                    </div>
                    <div class="delivery__pop-up__content-item">
                        Расстояние от <span class="red-text">15 до 20 км</span>: <br>
                        Минимальная сумма заказа <span class="red-text">3000 р</span>, стоимость доставки бесплатная
                    </div>
                </div>
                
            </div>

            <div class="delivery__pop-up__footer">
                <div class="delivery__pop-up__content-item">
                    <span class="red-text">
                        Доставка в небезопасные районы города, в текущей обстановке , отсутствует
                    </span>
                </div>
                <div class="delivery__pop-up__content-item">
                    После оформления заказа с Вами свяжется оператор для уточнения времени доставки и дополнительных пожеланий
                </div>
            </div>


            
        </div>
        

        <div class="delivery__pop-up__bg"></div>
    </div>
</template>

<script>
export default {
    name: 'DeliveryPopUp',
    methods: {
        closePopUp(){
            document.querySelector('.delivery__pop-up').style.display = "none";
        },
        showPopUp(){
            document.querySelector('.delivery__pop-up').style.display = "block";
        },
    },
    data(){
        return {
            
        }
    },
    mounted() {
        document.querySelector('.delivery__pop-up__bg').addEventListener('click', () => {
            this.closePopUp();
        });
    },
}
</script>

<style scoped>
    .delivery__pop-up{
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
    .delivery__pop-up__frame{
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
    .delivery__pop-up__bg{
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
    .delivery__pop-up__cross{
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
</style>

<style scoped>
    .delivery__pop-up__header{
        height: 42px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 80px;
    }
    .delivery__pop-up__header__logo,
    .delivery__pop-up__header__logo-img{
        height: 100%;
    }
    .delivery__pop-up__content{
        padding: 0 120px;
        margin-bottom: 80px;
        text-transform: uppercase;
    }

    .delivery__pop-up__content-title{
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
    .delivery__pop-up__content-item{
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

    .delivery__pop-up__content-item+.delivery__pop-up__content-item{
        margin-top: 33px;
    }

    .delivery__pop-up__footer{
        padding: 0 120px;
        text-transform: uppercase;
    }

    .delivery__pop-up__footer .delivery__pop-up__content-item{
        font-family: Vela Sans GX;
        font-size: 18px;
        font-weight: 600;
        line-height: 26.1px;
        letter-spacing: -0.05em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;

    }
    span.red-text{
        font-family: Vela Sans GX;
        color: #BE1522;
    }
</style>
