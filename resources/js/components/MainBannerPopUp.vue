<template>
    <div v-if="show" class="main-banner__pop-up">
        <div class="main-banner__pop-up__frame"
            :class="{ 
                image: this.banner.image_path != null,
                text: this.banner.image_path == null
            }"
        >
            <template v-if="this.banner.image_path != null">
                <img class="main-banner__pop-up__img" :src="this.banner.image_path" alt="Баннер">
                <img class="main-banner__pop-up__cross-white" src="/images/pop-ups/cross-white.svg" alt="close" @click="closePopUp">
            </template>

            <template v-else>
                <div class="main-banner__pop-up__text">
                    {{this.banner.name}}
                </div>
                <img class="main-banner__pop-up__cross" src="/images/pop-ups/cross.svg" alt="close" @click="closePopUp">
            </template>
            

            
        </div>

        <div class="main-banner__pop-up__bg" @click="closePopUp"></div>
    </div>
</template>

<script>
export default {
    name: 'MainBannerPopUp',
    props: {
        banner: Object
    },
    data() {
        return {
            show: false,
        };
    },
    methods: {
        closePopUp() {
            this.show = false;
        },
        checkBanner() {
            if (!this.banner || this.banner.hidden === 1) return;
            this.show = true;
        },
    },
    watch: {
        banner: {
            immediate: true, // Запускаем сразу при монтировании
            handler() {
                this.checkBanner();
            }
        }
    }
};
</script>

<style scoped>
    .main-banner__pop-up{
        position: fixed;
        width: 100%;
        height: 100%;
        display: block;
        /* display: none; */
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        z-index: 25;
    }
    .main-banner__pop-up__frame{
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

        gap: 34px;
        max-width: 500px;
        max-height: 500px;
    }
    .main-banner__pop-up__bg{
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
    .main-banner__pop-up__cross{
        width: 24px;
        height: 24px;
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
    .main-banner__pop-up__cross-white{
        width: 20px;
        height: 20px;
        position: absolute;
        cursor: pointer;
        top: -3px;
        right: -25px;
    }
</style>

<style scoped>
    .main-banner__pop-up__text{
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

    .main-banner__pop-up__frame.image{
        width: 500px;
        height: 500px;
        padding: 0;
        max-width: 500px;
        max-height: 500px;
        width: fit-content;
        height: fit-content;
        border-radius: 2px;
        background-color: transparent;
    }

    .main-banner__pop-up__img{
        width: 100%;
        height: 100%;
        max-width: 500px;
        max-height: 500px;
        object-fit: contain; 
        object-position: center; 
        border-radius: 2px;
    }
</style>

<style scoped>
    @media (max-width: 768px){
        .main-banner__pop-up__frame.text{
            gap: 16px;
            padding: 24px 24px;
            width: calc(100% - 16px* 2);
            max-width: unset;
        }
        
    }
    @media (max-width: 600px){
        .main-banner__pop-up__frame.image .main-banner__pop-up__cross-white{
            top: 6px;
            right: 8px;
        }
    }
    @media (max-width: 532px){
        .main-banner__pop-up__frame.image{
            max-width: calc(100% - 16px* 2);
        }
    }
    @media (max-width: 500px){
        .main-banner__pop-up__text{
            font-family: Vela Sans GX;
            font-size: 18px;
            font-weight: 600;
            line-height: 22.86px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            padding-right: 0;
        }
        .main-banner__pop-up__cross{
            width: 16px;
            height: 16px;
            top: 8px;
            right: 8px;
        }
    }
</style>
