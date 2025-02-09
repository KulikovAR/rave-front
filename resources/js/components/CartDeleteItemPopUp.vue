<template>
    <div class="cart-delete-item__pop-up">
        <div class="cart-delete-item__pop-up__frame">
            <div class="cart-delete-item__pop-up__title">
                Вы действительно хотите удалить позицию?
            </div>

            <div class="cart-delete-item__pop-up__text">
                Отменить данное действие будет невозможно
            </div>

            <div class="cart-delete-item__pop-up__btns">
                <div class="cart-delete-item__pop-up__btn delete" @click="deleteCartItemConfirm()">
                    Удалить
                </div>
                <div class="cart-delete-item__pop-up__btn" @click="closePopUp()">
                    Отмена
                </div>
            </div>

            <img class="cart-delete-item__pop-up__cross" src="/images/pop-ups/cross.svg" alt="close" @click="closePopUp()">
        </div>

        <div class="cart-delete-item__pop-up__bg"></div>
    </div>
</template>

<script>
export default {
    name: 'CartDeleteItemPopUp',
    methods: {
        closePopUp() {
            document.querySelector('.cart-delete-item__pop-up').style.display = "none";
            document.body.style.overflow = 'auto';
        },
        showPopUp() {
            document.querySelector('.cart-delete-item__pop-up').style.display = "block";
            document.body.style.overflow = 'hidden';
        },
        deleteCartItemConfirm() {
            this.$emit('deleteCartItemConfirm', this.item);
        }
    },
    data() {
        return {
            item: {}
        };
    },
    mounted() {
        // Используем $nextTick, чтобы гарантировать, что элемент существует
        this.$nextTick(() => {
            const popUpBackground = document.querySelector('.cart-delete-item__pop-up__bg');
            if (popUpBackground) {
                popUpBackground.addEventListener('click', this.closePopUp);
            }
        });
    },
    beforeDestroy() {
        // Удаляем обработчик перед уничтожением компонента
        const popUpBackground = document.querySelector('.cart-delete-item__pop-up__bg');
        if (popUpBackground) {
            popUpBackground.removeEventListener('click', this.closePopUp);
        }
    }
}
</script>

<style scoped>
    .cart-delete-item__pop-up{
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
    .cart-delete-item__pop-up__frame{
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

        gap: 18px;
        max-width: 432px;
    }
    .cart-delete-item__pop-up__bg{
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
    .cart-delete-item__pop-up__cross{
        width: 24px;
        height: 24px;
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
</style>

<style scoped>
    .cart-delete-item__pop-up__title{
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

    .cart-delete-item__pop-up__text{
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

    .cart-delete-item__pop-up__btns{
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .cart-delete-item__pop-up__btn{
        height: 100%;
        width: 50%;
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

    .cart-delete-item__pop-up__btn:hover{
        color: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522);
    }

    .cart-delete-item__pop-up__btn.delete{
        background: var(--Btn-Black, #000000);
        color: var(--Color-White, #FFFFFC);
    }

    .cart-delete-item__pop-up__btn.delete:hover{
        background: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522);
    }
</style>

<style scoped>
    @media (max-width: 768px){
        .cart-delete-item__pop-up__frame{
            gap: 16px;
            padding: 24px 24px;
            width: calc(100% - 16px* 2);
            max-width: unset;
        }
        
    }
    @media (max-width: 500px){
        .cart-delete-item__pop-up__title{
            font-family: Vela Sans GX;
            font-size: 18px;
            font-weight: 600;
            line-height: 22.86px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        .cart-delete-item__pop-up__text{
            font-family: Vela Sans GX;
            font-size: 14px;
            font-weight: 400;
            line-height: 20.3px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        .cart-delete-item__pop-up__btns{
            height: 37px;
        }
        .cart-delete-item__pop-up__btn{
            font-family: Vela Sans GX;
            font-size: 12px;
            font-weight: 600;
            line-height: 17.4px;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        .cart-delete-item__pop-up__cross{
            width: 16px;
            height: 16px;
            top: 8px;
            right: 8px;
        }
    }
</style>
