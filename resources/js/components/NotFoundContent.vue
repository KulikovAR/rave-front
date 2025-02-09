<template>
    <div class="not-found__content-wrapper">
        <div class="container">
            <div class="not-found__content">
                <div class="not-found__content__title">
                    404
                </div>
                <div class="not-found__content__text">
                    Страница не найдена
                </div>
                <router-link :to="{ name: 'main' }"  class="not-found__content__button">
                    На главную
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFoundContent'
}
</script>

<style scoped>
    .not-found__content-wrapper{
        width: 100%;
        height: 100%;
    }
    .not-found__content-wrapper .container{
        width: 100%;
        height: 100%;
    }
    .not-found__content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .not-found__content__title{
        font-family: Montserrat;
        font-size: 180px;
        font-weight: 800;
        line-height: 110px;
        letter-spacing: 1px;
        text-align: center;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        /* border: 2px solid var(--Btn-Black, #000000); */
        margin-bottom: 30px;

        color: transparent; /* Делаем текст прозрачным */
        -webkit-text-stroke: 2px var(--Btn-Black, #000000); 
        
        /* text-shadow: 
            -2px -2px 0 var(--Btn-Black, #000000),  
            2px -2px 0 var(--Btn-Black, #000000),  
            -2px 2px 0 var(--Btn-Black, #000000),  
            2px 2px 0 var(--Btn-Black, #000000); */
    }

    .not-found__content__text{
        font-family: Vela Sans GX;
        font-size: 12px;
        font-weight: 500;
        line-height: 40px;
        letter-spacing: 1px;
        text-align: center;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        text-transform: uppercase;
        color: var(--Btn-Black, #000000);
        margin-bottom: 30px;
    }

    .not-found__content__button{
        width: 178px;
        height: 48px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--Btn-Black, #000000);

        font-family: Vela Sans GX;
        font-size: 14px;
        font-weight: 600;
        line-height: 20.3px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: var(--Color-White, #FFFFFC);

        cursor: pointer;
    }

    .not-found__content__button:hover{
        color: #FFFFFF;
        background: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522);
    }
</style>

<style scoped>
    @media (max-width: 768px){
        .not-found__content__title{
            font-family: Montserrat;
            font-size: 100px;
            font-weight: 800;
            line-height: 110px;
            letter-spacing: 1px;
            text-align: center;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            margin-bottom: 10px;
            -webkit-text-stroke: 1px var(--Btn-Black, #000000); 
        }
        .not-found__content__text{
            line-height: 20px;
            margin-bottom: 24px;
        }
    }
</style>