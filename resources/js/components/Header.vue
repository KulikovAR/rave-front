<template>
    <div class="header">
        <div class="container">
            <div class="header__content">
                <router-link :to="{ name:'main' }" class="header__logo">
                    <img class="header__logo-img" src="/images/logo.svg" alt="logo">
                </router-link>
                <div class="header__links">
                    <router-link :to="{ name:'main' }" class="header__link">
                        На Главную
                    </router-link>
                    <div class="header__link" @click="showContactsPopUp">
                        Контакты
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        showContactsPopUp(){
            this.$emit('showContactsPopUp');
        }
    }
}
</script>

<style scoped>
    .header{
        position: fixed;
        top: 24px;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 1;
    }

    .header__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 65px;
        background: #FFFFFC;
        border-radius: 2px;
        padding: 0 24px;
    }

    .header__logo{
        height: 42px;
    }
    .header__logo-img{
        height: 100%;
    }

    .header__links{
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 24px;
    }

    .header__link{
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

    .header__link:hover{
        color: var(--Btn-Hover-Red, #BE1522);
        transition: 1 ease;
    }
</style>