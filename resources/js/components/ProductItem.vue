<template>
    <div class="product-item__wrapper">
        <div class="container">
            <div class="product-item">
                <div class="product-item__photo">
                    <img class="product-item__photo-img" :src="product.image || getPlaceholder()" alt="">
                </div>
                <div class="product-item__content">
                    <div class="product-item__content__name">
                        {{ product.name }}
                    </div>
                    <div class="product-item__content__energy-value">
                        
                        <span v-if="product.calories > 0">{{ product.calories }} Ккал,</span> {{ product.weight }} г.
                    </div>
                    <div class="product-item__content__description">
                        {{ product.description }}
                    </div>
                    <div class="product-item__content__price">
                        {{ formatPrice(product.price) }} р.
                    </div>
                    <div class="product-item__content__buttons">
                        <div class="product-item__quantity">
                            <div class="product-item__quantity-button minus" @click="decreaseQuantity">
                                -
                            </div>
                            <input class="product-item__quantity-input" type="number" v-model="quantity" min="1">
                            <div class="product-item__quantity-button plus" @click="increaseQuantity">
                                +
                            </div>
                        </div>

                        <div class="product-item__content__button cart" @click="handleAddToCart">
                            В корзину
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: 'ProductItem',
    props: {
        product: Object,
        restaurantSlug: String
    },
    data() {
        return {
            quantity: 1 
        };
    },
    methods: {
        ...mapActions("cart", ["addToCart"]), 

        increaseQuantity() {
            this.quantity++;
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        handleAddToCart() {
            const restaurantId = this.restaurantSlug;

            const cartItem = {
                id: this.product.id,
                name: this.product.name,
                price: this.product.price,
                quantity: this.quantity,
                image: this.product.image || this.getPlaceholder() || '',
                calories: this.product.calories,
                weight: this.product.weight,
                recommended_products: this.product.recommended_products
            };

            this.addToCart({ restaurantId, item: cartItem });

            this.quantity = 1;
        },
        formatPrice(price) {
            return Math.floor(parseFloat(price));
        },

        getFullImagePath(imageName) {
            return `https://rave-back.pisateli-studio.ru/storage/${imageName}`;
        },
        getPlaceholder() {
            return this.$restaurantPlugs[this.restaurantSlug] || '/images/plugs/default.png';
        }
    }
};
</script>

<style scoped>
    .product-item{
        display: flex;
        /* align-items: center; */
        align-items: self-end;
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
        height: 100%;
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

<style scoped>
    @media (max-width: 1100px){
        .product-item{
            flex-direction: column;
            align-items: flex-start;
        }

        .product-item__photo{
            width: 100%;
            height: 100%;
        }

        .product-item__photo-img{
            width: auto;
            height: auto;
            max-height: 350px;
        }

        .product-item__content{
            width: 100%;
            padding: 24px;
        }
    }

    @media (max-width: 768px){
        .product-item{
            margin-bottom: 42px;
        }
        .product-item__content{
            padding: 24px 12px 12px;
        }

        .product-item__content__name{
            max-width: 60%;
            font-family: Vela Sans GX;
            font-size: 18px;
            font-weight: 700;
            line-height: 21.6px;
            letter-spacing: -0.02em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            margin-bottom: 12px;
        }

        .product-item__content__energy-value{
            font-family: Vela Sans GX;
            font-size: 14px;
            font-weight: 400;
            line-height: 16.8px;
            letter-spacing: -0.03em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            margin-bottom: 16px;
        }

        .product-item__content__description{
            font-family: Vela Sans GX;
            font-size: 14px;
            font-weight: 300;
            line-height: 18.34px;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            margin-bottom: 16px;
        }

        .product-item__content__price{
            font-family: Vela Sans GX;
            font-size: 24px;
            font-weight: 700;
            line-height: 24px;
            letter-spacing: -0.03em;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            margin-bottom: 16px;
        }

        .product-item__content__buttons{
            width: 100%;
            gap: 16px;
        }

        .product-item__quantity{
            width: 125px;
            height: 48px;
            margin-right: 0;
        }

        .product-item__content__button.cart{
            width: 100%;
            max-width: 180px;
        }
    }
</style>