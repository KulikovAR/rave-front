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
                        v-for="(item,index) in this.cart"
                        :key="index"
                        class="cart__item"
                    >
                        <div class="cart__item__photo">
                            <img class="cart__item__photo-img" :src="item.media[0].path" alt="Фото">
                        </div>

                        <div class="cart__item__content">

                            <div class="cart__item__info">
                                <div class="cart__item__info-name">
                                    {{ item.name }}
                                </div>
                                <div class="cart__item__info-energy-value">
                                    {{item.calories}} Ккал ,{{item.weight}} г.
                                </div>
                            </div>

                            <div class="cart__item__control">
                                <div class="cart__item__quantity">
                                    <div class="cart__item__quantity-button minus">
                                        -
                                    </div>
                                    <input class="cart__item__quantity-input" type="number" :value="item.quantity" step="1">
                                    <div class="cart__item__quantity-button plus">
                                        +
                                    </div>
                                </div>

                                <div class="cart__item__price">
                                    {{item.price}} р.
                                </div>

                                <img class="cart__item__cross" src="/images/cart/cross.svg" alt="Удалить" @click="deleteCartItem(item)">
                            </div>
                        </div>

                        
                    </div>

                    


                </div>

                <div class="cart-total-order">
                    <div class="cart-total">
                       <div class="cart-total__title">
                            Итого:
                        </div>
                        <div class="cart-total__value">
                            1 320 р.
                        </div> 
                    </div>
                    <div class="cart-order-btn">
                        Перейти к оформлению
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import CartDeleteItemPopUp from './CartDeleteItemPopUp.vue';

export default {
    name: 'Cart',
    components:{
        CartDeleteItemPopUp
    },
    data(){
        return {
            cart: [
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Шаурма кебаб гуакамоле",
                    description : "p1",
                    price : "360.00",
                    weight : 350,
                    calories : 890,
                    hidden : 0,
                    new : 1,
                    priority : 0,
                    quantity: 1,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "/images/restaurants/products/1.png",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Цезарь с курицей",
                    description : "p1",
                    price : "390.00",
                    weight : 360,
                    calories : 820,
                    hidden : 0,
                    new : 1,
                    priority : 0,
                    quantity: 1,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "/images/restaurants/products/1.png",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
                {
                    id : "9e154f88-e460-4086-8e08-141d74786295",
                    category_id : "9e154f65-2a5c-487d-957e-e8e8b7b0e372",
                    name : "Сырный суп с куриным  бедром су-вид ",
                    description : "p1",
                    price : "340.00",
                    weight : 300,
                    calories : 890,
                    hidden : 0,
                    new : 1,
                    priority : 0,
                    quantity: 1,
                    created_at : "2025-01-29T09:40:58.000000Z",
                    updated_at : "2025-01-29T09:40:58.000000Z",
                    media : [
                        {
                            id : "9e154f88-e8a1-4de6-84bc-64abff81b421",
                            product_id : "9e154f88-e460-4086-8e08-141d74786295",
                            path : "/images/restaurants/products/1.png",
                            created_at : "2025-01-29T09:40:58.000000Z",
                            updated_at : "2025-01-29T09:40:58.000000Z",
                        }
                    ]
                },
            ]
        }
    },
    methods:{
        deleteCartItem(item){
            this.$refs.CartDeleteItemPopUp.item = item;
            this.$refs.CartDeleteItemPopUp.showPopUp();
        },
        deleteCartItemConfirm(data){
            this.$refs.CartDeleteItemPopUp.closePopUp();

            //для примера
            this.cart.splice(this.cart.indexOf(data), 1);
        }
    }
}
</script>

<style scoped>
    .cart__wrapper{
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