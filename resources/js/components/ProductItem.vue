<template>
    <div class="product-item__wrapper">
        <div class="container">
            <div class="product-item">
                <div class="product-item__photo">
                    <img class="product-item__photo-img" src="/images/restaurants/products/1.png" alt="">
                </div>
                <div class="product-item__content">
                    <div class="product-item__content__name">
                        {{this.product.name}}
                    </div>
                    <div class="product-item__content__energy-value">
                        {{this.product.calories}} Ккал ,{{this.product.weight}} г.
                    </div>
                    <div class="product-item__content__description">
                        {{this.product.description}}
                    </div>
                    <div class="product-item__content__price">
                        {{this.product.price}} р.
                    </div>
                    <div class="product-item__content__buttons">
                        <div class="product-item__quantity">
                            <div class="product-item__quantity-button minus">
                                 -
                            </div>
                            <input class="product-item__quantity-input" type="number" value="3" step="1">
                            <div class="product-item__quantity-button plus">
                                +
                            </div>
                        </div>

                        <div class="product-item__content__button cart">
                            В корзину
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductItem',
    props: {
        product: Object
    }
}
</script>

<style scoped>
    .product-item{
        display: flex;
        align-items: center;
        border: 1px solid var(--Color-Gray, #9E9E9E);
        margin-bottom: 24px;
    }

    .product-item__photo{
        width: 50%;
        height: 100%;
        overflow: hidden; /* Чтобы изображение не выходило за границы */
        padding-right: 56px;
        display: flex;
        align-items: flex-end; /* Выравниваем изображение по нижнему краю */
    }

    .product-item__photo-img{
        width: 100%;
        height: 100%;
        object-fit: contain; /* Сохраняет пропорции */
        object-position: left bottom; /* Прижимает к левому нижнему углу */
    }



    .product-item__content{
        width: 50%;
        padding: 56px 56px 56px 0;
        display: flex;
        flex-direction: column;
    }

    .product-item__content__name{
        font-family: Vela Sans GX;
        font-size: 44px;
        font-weight: 700;
        line-height: 52.8px;
        letter-spacing: -0.02em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        text-transform: uppercase;
        color: var(--Btn-Black, #000000);
        margin-bottom: 12px;

    }

    .product-item__content__energy-value{
        font-family: Vela Sans GX;
        font-size: 24px;
        font-weight: 400;
        line-height: 28.8px;
        letter-spacing: -0.03em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: var(--Color-Gray, #9E9E9E);
        margin-bottom: 18px;
    }

    .product-item__content__description{
        font-family: Vela Sans GX;
        font-size: 18px;
        font-weight: 300;
        line-height: 23.58px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: var(--Btn-Black, #000000);
        margin-bottom: 18px;
    }

    .product-item__content__price{
        font-family: Vela Sans GX;
        font-size: 32px;
        font-weight: 800;
        line-height: 32px;
        letter-spacing: -0.03em;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        text-transform: uppercase;
        color: var(--Btn-Black, #000000);
        margin-bottom: 18px;
    }

    .product-item__content__buttons{
        display: flex;
        align-items: center;
    }

    .product-item__quantity{
        width: 165px;
        height: 48px;
        display: flex;
        align-items: center;
        background: #FFFFFF;
        border-radius: 2px;
        margin-right: 34px;
    }
    .product-item__quantity *{
        width: 33%;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: Montserrat;
        font-size: 24px;
        font-weight: 400;
        line-height: 31.5px;
        text-align: center;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #1E252C;
    }

    .product-item__quantity-button{
        cursor: pointer;
    }

    .product-item__quantity-input{
        font-family: Vela Sans GX;
        font-size: 18px;
        font-weight: 600;
        line-height: 23.58px;
        text-align: center;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: var(--Btn-Black, #000000);
        border: none;
        outline: none;

    }

    .product-item__quantity-input {
        -moz-appearance:textfield;
        appearance: textfield;
    }
    .product-item__quantity-input::-webkit-outer-spin-button,
    .product-item__quantity-input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    .product-item__content__button.cart{
        width: 278px;
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

    .product-item__content__button.cart:hover{
        color: #FFFFFF;
        background: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522)
    }
</style>