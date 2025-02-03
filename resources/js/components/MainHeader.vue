<template>
    <div class="main-header">
        <div class="container">
            <div class="main-header__content">
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainHeader',
    methods: {
        showDeliveryPopUp(){
            this.$emit('showDeliveryPopUp');
        },
        showSchedulePopUp(){
            this.$emit('showSchedulePopUp');
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
        z-index: 1;
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
</style>