<template>
    <div class="order-content__wrapper">
        <div class="container">
            <div class="order-content">
                <div class="order-form__wrapper">
                    <div class="order-content__title">
                        Оформление заказа
                    </div>

                    <div class="order-form">
                        <div class="order-form__type-selector">
                            <div 
                                class="order-form__type-button" 
                                :class="{ active: deliveryType === 'Доставка' }"
                                @click="deliveryType = 'Доставка'"
                            >
                                Доставка
                            </div>
                            <div 
                                class="order-form__type-button" 
                                :class="{ active: deliveryType === 'Самовывоз' }"
                                @click="deliveryType = 'Самовывоз'"
                            >
                                Самовывоз
                            </div>
                        </div>

                        <div class="order-form__inputs">

                            <div class="order-form__inputs-row">
                                <input class="order-form__input" type="text" v-model="form.customer_name" placeholder="Имя">
                                <input class="order-form__input" type="tel" v-model="form.customer_phone" placeholder="Номер телефона">
                            </div>

                            
                            
                            <template v-if="deliveryType === 'Доставка'">
                                <div class="order-form__inputs-row">
                                    <div class="custom-select">
                                        <select class="order-form__input" v-model="form.city">
                                            <option disabled value="">Выберите город</option>
                                            <option v-for="city in cities" :key="city" :value="city">
                                                {{ city }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="custom-select">
                                        <select class="order-form__input" v-model="form.district" :disabled="!form.city">
                                            <option disabled value="">Выберите район</option>
                                            <option v-for="district in districts[form.city] || []" :key="district" :value="district">
                                                {{ district }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="order-form__inputs-row">
                                    <input class="order-form__input" type="text" v-model="form.street" placeholder="Улица">
                                    <input class="order-form__input" type="text" v-model="form.house" placeholder="Дом">
                                </div>

                                <div class="order-form__inputs-row">
                                    <input class="order-form__input" type="text" v-model="form.entrance" placeholder="Подъезд">
                                    <input class="order-form__input" type="text" v-model="form.apartment" placeholder="Квартира">
                                </div>
                                
                            </template>

                            
                            <div class="textarea-wrapper">
                                <textarea class="order-form__input" v-model="form.comment" placeholder="Комментарий"></textarea>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="order-cart__wrapper">
                    <div class="order-content__title">
                        Ваш заказ
                    </div>

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
                                    <div class="cart__item__info-name">
                                        {{ item.name }} <span v-if="item.quantity > 1" class="cart__item__info-quantity-span">({{item.quantity}})</span>
                                    </div>
                                    <div class="cart__item__price">
                                        {{item.price}} р.
                                    </div>
                                    <img class="cart__item__cross" src="/images/cart/cross.svg" alt="Удалить" @click="deleteCartItem(item)">
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
                                Оформить заказ
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CartDeleteItemPopUp from './CartDeleteItemPopUp.vue';

export default {
    name: 'OrderContent',
    components: {
        CartDeleteItemPopUp
    },
    data() {
        return {
            deliveryType: 'Доставка',
            form: {
                customer_name: '',
                customer_phone: '',
                city: '',
                district: '',
                street: '',
                house: '',
                entrance: '',
                apartment: '',
                comment: ''
            },
            cities: ['Донецк', 'Макеевка'],
            districts: {
                'Донецк': ['Калининский', 'Будённовский', 'Киевский', 'Куйбышевский', 'Ленинский', 'Петровский', 'Пролетарский'],
                'Макеевка': ['Горняцкий', 'Кировский', 'Советский', 'Червоногвардейский']
            },
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
                    quantity: 2,
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
                    quantity: 3,
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
                    name : "Шаурма кебаб гуакамоле",
                    description : "p1",
                    price : "360.00",
                    weight : 350,
                    calories : 890,
                    hidden : 0,
                    new : 1,
                    priority : 0,
                    quantity: 2,
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
                    quantity: 3,
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
            ],
        };
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
};
</script>

<style scoped>
.order-content__wrapper {
    margin-top: 68px;
    height: calc(100% - 68px - 24px);
}

.order-content__wrapper .container{
    height: 100%;
}

.order-content {
    border-top: 1px solid var(--Color-Gray, #9E9E9E);
    border-left: 1px solid var(--Color-Gray, #9E9E9E);
    width: 100%;
    display: flex;
    align-items: flex-start;
    height: 100%;
}

.order-form__wrapper {
    width: 55%;
    border-bottom: 1px solid var(--Color-Gray, #9E9E9E);
    border-right: 1px solid var(--Color-Gray, #9E9E9E);
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
    height: 100%;
}

.order-cart__wrapper {
    width: 45%;
    border-bottom: 1px solid var(--Color-Gray, #9E9E9E);
    border-right: 1px solid var(--Color-Gray, #9E9E9E);
    padding: 32px 0 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
    height: 100%;
}

.order-content__title {
    font-family: Vela Sans GX;
    font-size: 24px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.03em;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    text-transform: uppercase;
    color: var(--Btn-Black, #000000);
    margin-bottom: 24px;
}

.order-form {
    width: 100%;
    display: flex;
    flex-direction: column;

    height: 100%;
}

.order-form__type-selector {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
}

.order-form__type-button {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--Btn-Black, #000000);
    font-family: Vela Sans GX;
    font-size: 14px;
    font-weight: 600;
    line-height: 20.3px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

    cursor: pointer;
}

.order-form__type-button:hover{
    color: var(--Btn-Hover-Red, #BE1522);
    border: 1px solid var(--Btn-Hover-Red, #BE1522)
}

.order-form__type-button.active {
    background: var(--Btn-Black, #000000);
    color: var(--Color-White, #FFFFFC);
}

.order-form__type-button.active:hover {
    color: var(--Color-White, #FFFFFC);
    border: 1px solid var(--Btn-Black, #000000);
}

.order-form__inputs {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;

    height: 100%;
}

.order-form__inputs-row{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
}

.order-form__input {
    width: calc(50% - 8px);
    height: 48px;
    padding: 12px;
    border: 1px solid var(--Color-Gray, #9E9E9E);
    border-radius: 2px;
    font-family: Vela Sans GX;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: var(--Btn-Black, #000000);
    background: transparent;

}

.custom-select{
    width: calc(50% - 8px);
    height: 48px;
    position: relative;
}

.order-form__input::placeholder{
    font-weight: 400;
    color: var(--Color-Dark-gray, #505050);
}


.order-form__input:focus {
    border: 1px solid var(--Btn-Black, #000000);
    outline: none;
}




.custom-select select {
    width: 100%;
    height: 48px;
    padding: 12px;
    border: 1px solid var(--Color-Gray, #9E9E9E);
    border-radius: 2px;
    font-size: 16px;
    font-weight: 500;
    color: var(--Btn-Black, #000000);
    background: transparent;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 48px; /* Отступ для стрелки */
    cursor: pointer;
}

.custom-select::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 12px;
    width: 24px;
    height: 24px;
    background: url('/images/form/select-arrow.svg') no-repeat center;
    background-size: contain;
    transform: translateY(-50%);
    transition: transform 0.3s ease;
}

.custom-select:focus-within::after {
    transform: translateY(-50%) rotate(180deg);
}

select.order-form__input::-ms-expand {
    display: none;
}

.textarea-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
    max-height: calc(100% - (48px * 4) - (16px * 4));
}

textarea.order-form__input {
    width: 100%;
    min-height: 120px;
    height: 100%; /* Растягиваем textarea на всю высоту */
    resize: none;
    flex-grow: 1;
}
</style>

<style scoped>
    .cart{
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        height: calc(100% - 48px);
    }

    .cart__list{
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        margin-bottom: 48px;
        padding-right: 32px;

        overflow-y: scroll;
    }

    .cart__list::-webkit-scrollbar {
        width: 4px;
        background-color: transparent;
    }
    

    .cart__item{
        display: flex;
        height: 25%;
        width: 100%;
        align-items: stretch;
        border-bottom: 1px solid #9E9E9E;
    }

    .cart__item__photo{
        height: auto;
        width: 25%;
        display: flex;
        align-items: flex-end;
        overflow: hidden;
        margin-right: 12px;
        align-self: stretch;
    }
    .cart__item__photo-img{
        width: 100%;
        height: 100%;
        object-fit: contain; /* Сохраняет пропорции */
        object-position: left bottom; /* Прижимает к левому нижнему углу */
    }

    .cart__item__content{
        width: 75%;
        display: flex;
        align-items: center;
        padding: 32px 32px 32px 0;
        gap: 14%;
    }

    .cart__item__info-name{
        flex-grow: 1;
        font-family: Vela Sans GX;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.2px;
        letter-spacing: -0.02em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        text-transform: uppercase;
        color: var(--Btn-Black, #000000);
    }

    span.cart__item__info-quantity-span{
        flex-grow: 1;
        font-family: Vela Sans GX;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.2px;
        letter-spacing: -0.02em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        text-transform: uppercase;
        color: var(--Btn-Black, #000000);
    }

    .cart__item__price{
        white-space: nowrap;
        font-family: Vela Sans GX;
        font-size: 18px;
        font-weight: 800;
        line-height: 18px;
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
        width: 100%;
        padding-right: 32px;
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