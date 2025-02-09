<template>
    <div class="main-header">
        <div class="container">
            <div class="main-header__content-wrapper">
                <div class="main-header__content" :class="{ 'open': isMenuOpen }">
                    <div class="main-header__logo">
                        <img class="main-header__logo-img" src="/images/logo.svg" alt="logo">
                    </div>
                    <div class="main-header__links">
                        <div class="main-header__link" @click="showDeliveryPopUp">
                            Условия доставки 
                        </div>
                        <div class="main-header__link" @click="showSchedulePopUp">
                            График работы
                        </div>
                    </div>
                    <div class="main-header__burger-btn" @click="toggleMenu">
                        <div class="main-header__burger-btn__row" :class="{ 'top': isMenuOpen }"></div>
                        <div class="main-header__burger-btn__row" :class="{ 'middle': isMenuOpen }"></div>
                        <div class="main-header__burger-btn__row" :class="{ 'bottom': isMenuOpen }"></div>
                    </div>
                </div>
                <div class="main-header__burger-dropdown" :class="{ 'open': isMenuOpen }">
                    <div class="main-header__link" @click="showDeliveryPopUp">
                        Условия доставки 
                    </div>
                    <div class="main-header__link" @click="showSchedulePopUp">
                        График работы
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainHeader',
    data() {
        return {
            isMenuOpen: false
        };
    },
    methods: {
        showDeliveryPopUp(){
            this.$emit('showDeliveryPopUp');
        },
        showSchedulePopUp(){
            this.$emit('showSchedulePopUp');
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        }
    }
}
</script>

<style scoped>
    .main-header{
        position: absolute;
        top: 24px;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 3;
    }

    .main-header__content-wrapper{
        width: 100%;
        position: relative;
    }

    .main-header__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 65px;
        background: #FFFFFC;
        border-radius: 2px;
        padding: 0 24px;
    }

    .main-header__content.open{
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .main-header__logo{
        height: 42px;
    }
    .main-header__logo-img{
        height: 100%;
    }

    .main-header__links{
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 24px;
    }

    .main-header__link{
        font-family: Vela Sans GX;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        letter-spacing: -0.03em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #000;
        cursor: pointer;
        text-transform: uppercase;
    }
    .main-header__link:hover{
        color: var(--Btn-Hover-Red, #BE1522);
    }
</style>

<style scoped>
    .main-header__burger-btn{
        width: 18px;
        height: 16px;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        cursor: pointer;
        display: none;
        transition: all 0.3s ease-in-out;
    }

    .main-header__burger-btn__row{
        width: 100%;
        height: 2px;
        border-radius: 2px;
        background: #292D32;
        transition: all 0.3s ease-in-out;
    }

    .main-header__burger-btn__row.top {
        transform: translateY(7px) rotate(45deg);
    }

    .main-header__burger-btn__row.middle {
        opacity: 0;
    }

    .main-header__burger-btn__row.bottom {
        transform: translateY(-7px) rotate(-45deg);
    }

    .main-header__burger-dropdown {
        width: 100%;
        padding: 0 12px;
        background: #FFFFFC;
        position: absolute;
        top: 100%;
        left: 0;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    .main-header__burger-dropdown.open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
        padding: 35px 12px;
    }
</style>

<style scoped>
    @media (max-width: 768px){
        .main-header{
            top: 18px;
        }
        .main-header__content{
            height: 48px;
            padding: 0 12px;
        }
        .main-header__logo{
            height: 23px;
        }
        .main-header__links{
            display: none;
        }

        .main-header__link{
            font-family: Vela Sans GX;
            font-size: 16px;
            font-weight: 500;
            line-height: 16px;
            letter-spacing: -0.03em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }

        .main-header__burger-btn{
            display: flex;
        }
    }
    @media (min-width: 768px){
        .main-header__burger-dropdown.open{
            display: none;
        }
        .main-header__content.open{
            border-bottom-left-radius: 2px;
            border-bottom-right-radius: 2px;
        }
    }
</style>