<template>
    <div class="order-success__pop-up">
        <div class="order-success__pop-up__frame">
            <div class="order-success__pop-up__title">
                Заказ успешно создан
            </div>

            <div class="order-success__pop-up__text">
                Первый освободившийся оператор свяжется с вами для подтверждения заказа
            </div>

            <div class="order-success__pop-up__btns">
                <div class="order-success__pop-up__btn go-main" @click="redirectToMain()">
                    На главную
                </div>
            </div>

            <img class="order-success__pop-up__cross" src="/images/pop-ups/cross.svg" alt="close" @click="closePopUp()">
        </div>
        

        <div class="order-success__pop-up__bg"></div>
    </div>
</template>

<script>
export default {
    name: 'OrderSuccessPopUp',
    methods: {
        closePopUp(){
            document.querySelector('.order-success__pop-up').style.display = "none";
            document.body.style.overflow = 'auto';
            this.redirectToMain();
        },
        showPopUp(){
            document.querySelector('.order-success__pop-up').style.display = "block";
            document.body.style.overflow = 'hidden';
        },
        redirectToMain(){
            this.$router.push({ name: 'main' });
        }
    },
    data(){
        return {
            item: {}
        }
    },
    mounted() {
        document.querySelector('.order-success__pop-up__bg').addEventListener('click', () => {
            this.closePopUp();
        });
    },
}
</script>

<style scoped>
    .order-success__pop-up{
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
    .order-success__pop-up__frame{
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        padding: 52px 28px;
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

        gap: 24px;
        max-width: 432px;
    }
    .order-success__pop-up__bg{
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
    .order-success__pop-up__cross{
        width: 24px;
        height: 24px;
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
</style>

<style scoped>
    .order-success__pop-up__title{
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

    .order-success__pop-up__text{
        font-family: Vela Sans GX;
        font-size: 18px;
        font-weight: 400;
        line-height: 26.1px;
        letter-spacing: -0.05em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: var(--Color-Dark-gray, #505050);

    }

    .order-success__pop-up__btns{
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .order-success__pop-up__btn{
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

    .order-success__pop-up__btn:hover{
        color: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522);
    }

    .order-success__pop-up__btn.go-main{
        background: var(--Btn-Black, #000000);
        color: var(--Color-White, #FFFFFC);
    }

    .order-success__pop-up__btn.go-main:hover{
        background: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522);
    }
</style>

<style scoped>
    @media (max-width: 768px){
        .order-success__pop-up__frame{
            gap: 16px;
            padding: 24px 24px;
            width: calc(100% - 16px* 2);
            max-width: unset;
        }
        
    }
    @media (max-width: 500px){
        .order-success__pop-up__title{
            font-family: Vela Sans GX;
            font-size: 18px;
            font-weight: 600;
            line-height: 22.86px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        .order-success__pop-up__text{
            font-family: Vela Sans GX;
            font-size: 14px;
            font-weight: 400;
            line-height: 20.3px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        .order-success__pop-up__btns{
            height: 37px;
        }
        .order-success__pop-up__btn{
            font-family: Vela Sans GX;
            font-size: 12px;
            font-weight: 600;
            line-height: 17.4px;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        .order-success__pop-up__cross{
            width: 16px;
            height: 16px;
            top: 8px;
            right: 8px;
        }
    }
</style>
