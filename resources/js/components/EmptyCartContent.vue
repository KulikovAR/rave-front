<template>
    <div class="empty-cart-content__wrapper">
        <div class="container">
            <div class="empty-cart-content">
                <div class="empty-cart-content__title">
                    Корзина пуста
                </div>
                <div class="empty-cart-content__text">
                    Добавьте хотя бы один товар
                </div>
                <div class="empty-cart-content__btn" @click="goToCategories()">
                    Начать покупки
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EmptyCartContent',
    props: {
        restaurantSlug: String,
    },
    methods: {
        goToCategories(){
            const restaurantSlug = this.restaurantSlug;
            this.$router.push({ name: 'categories', params: { restaurantSlug } });
        }
    }
}
</script>

<style scoped>
    .empty-cart-content__wrapper{
        width: 100%;
        height: calc(100% - 24px - 18px);
    }

    .empty-cart-content__wrapper .container{
        width: 100%;
        height: 100%;
    }

    .empty-cart-content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
    }

    .empty-cart-content__title{
        font-family: Vela Sans GX;
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

    .empty-cart-content__text{
        font-family: Vela Sans GX;
        font-size: 18px;
        font-weight: 400;
        line-height: 26.1px;
        letter-spacing: -0.05em;
        text-align: center;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: var(--Color-Dark-gray, #505050);
    }

    .empty-cart-content__btn{
        width: 184px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2px;
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

    .empty-cart-content__btn:hover{
        background: var(--Btn-Hover-Red, #BE1522);
    }
</style>

<style scoped>
    .order-content .empty-cart-content__wrapper{
        width: 45%;
        border-bottom: 1px solid var(--Color-Gray, #9E9E9E);
        border-right: 1px solid var(--Color-Gray, #9E9E9E);
        padding: 32px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-grow: 1;
        height: auto;
    }
</style>

<style scoped>
    @media (max-width: 1250px){
        .order-content .empty-cart-content__wrapper{
            width: 100%;
            padding: 18px 12px;
        }
    }

    @media (max-width: 332px){
        .order-content .empty-cart-content__wrapper{
            width: 100%;
            padding: 18px 12px;
        }

        .order-content .empty-cart-content__wrapper .empty-cart-content__title{
            font-size: 24px;
            line-height: 24px;
        }

        .order-content .empty-cart-content__wrapper .empty-cart-content__text{
            font-size: 14px;
            line-height: 14px;
        }
    }
</style>