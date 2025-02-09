<template>
    <div v-if="isVisible" class="form-error-notify__wrapper">
        <div class="container">
            <div class="form-error-notify">
                <div class="form-error-notify__img">
                    <img class="form-error-notify__img-img" src="/images/notify/error.svg" alt="Error">
                </div>
                <div class="form-error-notify__text">
                    Неправильно заполнены поля
                </div>
                <img class="form-error-notify__cross" src="/images/notify/cross.svg" alt="Закрыть" @click="closeNotify">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormErrorNotify',
    data() {
        return {
            isVisible: false
        };
    },
    methods: {
        showNotify() {
            this.isVisible = true;
            setTimeout(() => {
                this.isVisible = false;
            }, 5000);
        },
        closeNotify() {
            this.isVisible = false;
        }
    }
};
</script>

<style scoped>
    .form-error-notify__wrapper{
        position: fixed;
        top: calc(65px + 24px + 12px);
        right: 0;
        width: 100%;
    }

    .form-error-notify__wrapper .container{
        display: flex;
        justify-content: flex-end;
    }

    .form-error-notify{
        position: relative;
        display: flex;
        align-items: center;
        padding: 8px 30px 8px 12px;
        border-radius: 2px;
        background: #CF0939;
        box-shadow: 0px 4px 25px 0px #00000026;

        width: 359px;
        z-index: 1;
    }

    .form-error-notify__img{
        width: 24px;
        height: 24px;
        margin-right: 12px;
    }
    .form-error-notify__img-img{
        width: 100%;
        height: 100%;
        display: block;
    }

    .form-error-notify__text{
        font-family: Gilroy;
        font-size: 13px;
        font-weight: 500;
        line-height: 17.55px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #F0F0F0;
    }

    .form-error-notify__cross{
        position: absolute;
        width: 18px;
        height: 18px;
        top: 6px;
        right: 6px;
        cursor: pointer;
    }
</style>

<style scoped>
    @media (max-width: 768px){
        .form-error-notify__wrapper{
            top: calc(48px + 18px + 11px);
        }
        .form-error-notify{
            width: 100%;
        }
        .form-error-notify__cross{
            right: 7px;
            top: 0;
            bottom: 0;
            margin: auto 0;
        }
    }
</style>