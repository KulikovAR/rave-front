<template>
    <div class="cart__wrapper">
        <div class="container">
            <CartDeleteItemPopUp
                ref="CartDeleteItemPopUp"
                @deleteCartItemConfirm="deleteCartItemConfirm"
            />
            <div class="cart">
                <div class="cart__list">
                    <div 
                        v-for="(item, index) in cart"
                        :key="index"
                        class="cart__item"
                    >
                        <div class="cart__item__photo">
                            <img class="cart__item__photo-img" :src="item.image" alt="Фото">
                        </div>

                        <div class="cart__item__content">
                            <div class="cart__item__info">
                                <div class="cart__item__info-name">
                                    {{ item.name }}
                                </div>
                                <div class="cart__item__info-energy-value">
                                    {{ item.calories }} Ккал, {{ item.weight }} г.
                                </div>
                            </div>

                            <div class="cart__item__control">
                                <div class="cart__item__quantity">
                                    <div class="cart__item__quantity-button minus" 
                                        @click="updateQuantity({ restaurantId: restaurantSlug, itemId: item.id, amount: -1 })"
                                    >
                                        -
                                    </div>
                                    <input 
                                        class="cart__item__quantity-input" 
                                        type="number" 
                                        :value="item.quantity" 
                                        @change="onQuantityInputChange($event, item.id)"
                                        step="1"
                                    />
                                    <div class="cart__item__quantity-button plus" 
                                        @click="updateQuantity({ restaurantId: restaurantSlug, itemId: item.id, amount: 1 })"
                                    >
                                        +
                                    </div>
                                </div>

                                <div class="cart__item__price">
                                    {{ item.price * item.quantity }} р.
                                </div>

                                <img 
                                    class="cart__item__cross" 
                                    src="/images/cart/cross.svg" 
                                    alt="Удалить" 
                                    @click="deleteCartItem(item)"
                                />
                            </div>

                            <img 
                                class="cart__item__cross mobile" 
                                src="/images/cart/cross.svg" 
                                alt="Удалить" 
                                @click="deleteCartItem(item)"
                            />
                        </div>
                    </div>
                </div>

                <div class="cart-total-order">
                    <div class="cart-total">
                        <div class="cart-total__title">
                            Итого:
                        </div>
                        <div class="cart-total__value">
                            {{ totalPrice }} р.
                        </div> 
                    </div>
                    <div class="cart-order-btn" @click="goToOrder()">
                        Перейти к оформлению
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CartDeleteItemPopUp from "./CartDeleteItemPopUp.vue";

export default {
    name: "Cart",
    components: {
        CartDeleteItemPopUp,
    },
    props: {
        restaurantSlug: String, // Принимаем restaurantSlug
    },
    computed: {
        ...mapGetters("cart", ["getCart", "getTotalPrice"]),
        cart() {
            return this.getCart(this.restaurantSlug);
        },
        totalPrice() {
            return this.getTotalPrice(this.restaurantSlug);
        }
    },
    methods: {
        ...mapActions("cart", ["updateQuantity", "removeItem"]),

        deleteCartItem(item) {
            this.$refs.CartDeleteItemPopUp.item = item;
            this.$refs.CartDeleteItemPopUp.showPopUp();
        },

        deleteCartItemConfirm(data) {
            this.$refs.CartDeleteItemPopUp.closePopUp();
            this.removeItem({ restaurantId: this.restaurantSlug, itemId: data.id });
            this.$emit('itemRemovedFromCart');
        },

        // Метод для обновления количества через input
        onQuantityInputChange(event, itemId) {
            let newQuantity = parseInt(event.target.value, 10);
            if (isNaN(newQuantity) || newQuantity < 1) {
                newQuantity = 1;
            }

            const item = this.cart.find(i => i.id === itemId);
            if (item) {
                const amount = newQuantity - item.quantity; // Разница, которую нужно применить
                if (amount !== 0) {
                    this.updateQuantity({ restaurantId: this.restaurantSlug, itemId, amount });
                }
            }
        },
        goToOrder() {
            const restaurantSlug = this.restaurantSlug;
            this.$router.push({ 
                name: 'order', 
                params: { 
                    restaurantSlug: restaurantSlug, 
                } 
            });
        },
    }
};
</script>

<style scoped>
    .cart__wrapper{
        padding-top: 44px;
        margin-bottom: 24px;
    }

    .cart{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .cart__list{
        width: 100%;
        display: flex;
        flex-direction: column;
        border-left: 1px solid #9E9E9E;
        border-top: 1px solid #9E9E9E;
        margin-bottom: 48px;
    }
    .cart__item{
        display: flex;
        /* align-items: center; */
        align-items: stretch;
        border-right: 1px solid #9E9E9E;
        border-bottom: 1px solid #9E9E9E;
    }

    .cart__item__photo{
        height: auto;
        width: 12%;
        display: flex;
        align-items: flex-end;
        overflow: hidden;
        margin-right: 56px;
        align-self: stretch;
    }
    .cart__item__photo-img{
        width: 100%;
        height: 100%;
        object-fit: contain; /* Сохраняет пропорции */
        object-position: left bottom; /* Прижимает к левому нижнему углу */
    }

    .cart__item__content{
        position: relative;
        width: 88%;
        display: flex;
        align-items: center;
        padding: 32px;
    }

    .cart__item__info{
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-right: 34px;
    }

    .cart__item__info-name{
        font-family: Vela Sans GX;
        font-size: 18px;
        font-weight: 700;
        line-height: 21.6px;
        letter-spacing: -0.02em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        text-transform: uppercase;
        color: var(--Btn-Black, #000000);

    }

    .cart__item__info-energy-value{
        font-family: Vela Sans GX;
        font-size: 12px;
        font-weight: 500;
        line-height: 14.4px;
        letter-spacing: -0.03em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: var(--Color-Gray, #9E9E9E);

    }

    .cart__item__control{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .cart__item__quantity{
        width: 165px;
        height: 48px;
        display: flex;
        align-items: center;
        background: #FFFFFF;
        border-radius: 2px;
        margin-right: 34px;
    }
    .cart__item__quantity *{
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

    .cart__item__quantity-button{
        cursor: pointer;
    }

    .cart__item__quantity-input{
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

    .cart__item__quantity-input {
        -moz-appearance:textfield;
        appearance: textfield;
    }
    .cart__item__quantity-input::-webkit-outer-spin-button,
    .cart__item__quantity-input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    .cart__item__price{
        font-family: Vela Sans GX;
        font-size: 24px;
        font-weight: 800;
        line-height: 24px;
        letter-spacing: -0.03em;
        text-align: center;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        text-transform: uppercase;
        color: var(--Btn-Black, #000000);

    }

    .cart__item__cross{
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .cart__item__cross.mobile{
        position: absolute;
        width: 16px;
        height: 16px;
        top: 8px;
        right: 8px;

        display: none;
    }

    .cart-total-order{
        display: flex;
        flex-direction: column;
        width: 370px;
    }

    .cart-total{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 34px;
    }

    .cart-total__title{
        font-family: Vela Sans GX;
        font-size: 18px;
        font-weight: 700;
        line-height: 21.6px;
        letter-spacing: -0.02em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        text-transform: uppercase;
        color: var(--Btn-Black, #000000);
    }

    .cart-total__value{
        font-family: Vela Sans GX;
        font-size: 32px;
        font-weight: 800;
        line-height: 32px;
        letter-spacing: -0.03em;
        text-align: center;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        text-transform: uppercase;
        color: var(--Btn-Black, #000000);
    }

    .cart-order-btn{
        width: 100%;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--Btn-Black, #000000);
        border-radius: 2px;
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

    .cart-order-btn:hover{
        color: #FFFFFF;
        background: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522);
    }
</style>

<style scoped>
    @media (max-width: 1100px){
        .cart__item{
            height: 110px;
        }
        .cart__item__photo{
            margin-right: 8px;
            max-width: 37%;
            width: auto;
        }
        .cart__item__content{
            flex-direction: column;
            width: 63%;
            padding: 8px;
            align-items: flex-start;

            height: 100%;
            gap: 8px;
            justify-content: space-between;
            width: 100%;
        }
        .cart__item__info{
            padding-right: 24px;
            width: 100%;

            margin: 0;
            flex-grow: 1;
            height: calc(100% - 33px - 8px* 2);
        }
        .cart__item__info-name{
            flex-grow: 1;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            max-height: calc(21.6px* 1);
        }
        .cart__item__control{
            width: 100%;
        }
        .cart__item__quantity{
            height: 33px;
        }
        .cart__item__cross{
            display: none;
        }
        .cart__item__cross.mobile{
            display: block;
        }
    }

    @media (max-width: 768px){
        .cart__wrapper{
            padding-top: 0;
        }
        .cart__item__quantity{
            width: 94px;
            height: 33px;
        }
        .cart__item__quantity-input{
            font-family: Vela Sans GX;
            font-size: 16px;
            font-weight: 600;
            line-height: 20.96px;
            text-align: center;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
    }

    @media (max-width: 500px){
        .cart__wrapper{
            margin-bottom: 42px;
        }
        .cart__list{
            margin-bottom: 18px;
        }
        .cart-total-order{
            width: 100%;
        }
        .cart-total{
            margin-bottom: 12px;
        }
        .cart-total__title{
            font-family: Vela Sans GX;
            font-size: 14px;
            font-weight: 500;
            line-height: 16.8px;
            letter-spacing: -0.02em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        .cart-total__value{
            font-family: Vela Sans GX;
            font-size: 20px;
            font-weight: 800;
            line-height: 20px;
            letter-spacing: -0.03em;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }

        .cart__item__info-name{
            font-family: Vela Sans GX;
            font-size: 12px;
            font-weight: 700;
            line-height: 14.4px;
            letter-spacing: -0.02em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;

            -webkit-line-clamp: 2;
            line-clamp: 2;
            max-height: calc(14.4px* 2);
        }
        .cart__item__info-energy-value{
            font-family: Vela Sans GX;
            font-size: 12px;
            font-weight: 500;
            line-height: 14.4px;
            letter-spacing: -0.03em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }
        .cart__item__price{
            font-family: Vela Sans GX;
            font-size: 14px;
            font-weight: 700;
            line-height: 14px;
            letter-spacing: -0.03em;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            width: 81px;
            text-align: end;
        }
        .cart__item__quantity{
            margin-right: 8px;
        }
    }

    @media (max-width: 375px){
        
    }
</style>