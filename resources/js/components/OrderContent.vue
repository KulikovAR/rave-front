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
                                <input 
                                    class="order-form__input" 
                                    type="text" 
                                    v-model="form.customer_name" 
                                    placeholder="Имя"
                                    :class="{ error: formErrors.customer_name }"
                                >
                                <input 
                                    class="order-form__input" 
                                    v-imask="{ mask: '+7 (000) 000-00-00' }"
                                    v-model="form.customer_phone"
                                    placeholder="+7 (___) ___-__"
                                    :class="{ error: phoneError }"
                                >
                            </div>

                            <template v-if="deliveryType === 'Доставка'">
                                <div class="order-form__inputs-row">
                                    <div class="custom-select" :class="{ error: formErrors.city }">
                                        <div class="custom-dropdown" @click="toggleDropdown('city')">
                                            {{ form.city || 'Выберите город' }}
                                            <span class="dropdown-arrow" :class="{ open: openDropdown === 'city' }"></span>
                                        </div>
                                        <ul v-if="openDropdown === 'city'" class="dropdown-list">
                                            <li 
                                                v-for="city in cities" 
                                                :key="city" 
                                                @click="selectCity(city)" 
                                                :class="{ selected: city === form.city }"
                                            >
                                                <img v-if="city === form.city" src="/images/form/checkmark.svg" class="checkmark" />
                                                {{ city }}
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="custom-select" :class="{ error: formErrors.district, disabled: !form.city }">
                                        <div class="custom-dropdown" @click="toggleDropdown('district')" :class="{ disabled: !form.city }">
                                            {{ form.district || 'Выберите район' }}
                                            <span class="dropdown-arrow" :class="{ open: openDropdown === 'district' }"></span>
                                        </div>
                                        <ul v-if="openDropdown === 'district'" class="dropdown-list">
                                            <li 
                                                v-for="district in districts[form.city] || []" 
                                                :key="district" 
                                                @click="selectDistrict(district)" 
                                                :class="{ selected: district === form.district }"
                                            >
                                                <img v-if="district === form.district" src="/images/form/checkmark.svg" class="checkmark" />
                                                {{ district }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="order-form__inputs-row">
                                    <input class="order-form__input" type="text" v-model="form.street" placeholder="Улица" :class="{ error: formErrors.street }">
                                    <input class="order-form__input" type="text" v-model="form.house" placeholder="Дом" :class="{ error: formErrors.house }">
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

                <div class="order-cart__wrapper" v-if="cart.length">
                    <div class="order-content__title">
                        Ваш заказ
                    </div>
                    <CartDeleteItemPopUp 
                        ref="CartDeleteItemPopUp" 
                        @deleteCartItemConfirm="deleteCartItemConfirm" 
                    />
                    <FormErrorNotify 
                        ref="FormErrorNotify" 
                    />
                    <div class="cart" v-if="cart.length">

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
                                    <div class="cart__item__info-name">
                                        {{ item.name }} <span v-if="item.quantity > 1" class="cart__item__info-quantity-span">({{ item.quantity }})</span>
                                    </div>
                                    <div class="cart__item__price">
                                        {{ item.price * item.quantity }} р.
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
                                    {{ totalPrice }} р.
                                </div>
                            </div>
                            <div class="cart-order-btn" @click="submitOrder()">
                                Оформить заказ
                            </div>
                        </div>

                    </div>


                </div>
            </div>

            <div class="cart-total-order mobile" v-if="cart.length">
                <div class="cart-total">
                    <div class="cart-total__title">
                        Итого:
                    </div>
                    <div class="cart-total__value">
                        {{ totalPrice }} р.
                    </div> 
                </div>
                <div class="cart-order-btn" @click="submitOrder">
                    Оформить заказ
                </div>
            </div>

            <OrderSuccessPopUp
                ref="OrderSuccessPopUp"
            />

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CartDeleteItemPopUp from './CartDeleteItemPopUp.vue';
import OrderSuccessPopUp from './OrderSuccessPopUp.vue';
import FormErrorNotify from './FormErrorNotify.vue';
import api from '../api';

export default {
    name: 'OrderContent',
    components: { 
        CartDeleteItemPopUp, 
        OrderSuccessPopUp, 
        FormErrorNotify 
    },
    props: {
        restaurantSlug: String,
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
            formErrors: {
                customer_name: false,
                customer_phone: false,
                city: false,
                district: false,
                street: false,
                house: false
            },
            cities: ['Донецк', 'Макеевка'],
            districts: {
                'Донецк': ['Калининский', 'Будённовский', 'Киевский', 'Куйбышевский', 'Ленинский', 'Петровский', 'Пролетарский'],
                'Макеевка': ['Горняцкий', 'Кировский', 'Советский', 'Червоногвардейский']
            },
            openDropdown: null,
            phoneError: false,
        };
    },
    computed: {
        ...mapGetters('cart', ['getCart', 'getTotalPrice']),
        cart() {
            return this.getCart(this.restaurantSlug);
        },
        totalPrice() {
            return this.getTotalPrice(this.restaurantSlug);
        }
    },
    methods: {
        ...mapActions('cart', ['removeItem', 'clearCartForRestaurant']),
        deleteCartItem(item) {
            this.$refs.CartDeleteItemPopUp.item = item;
            this.$refs.CartDeleteItemPopUp.showPopUp();
        },
        deleteCartItemConfirm(data) {
            this.$refs.CartDeleteItemPopUp.closePopUp();
            this.removeItem({ restaurantId: this.restaurantSlug, itemId: data.id });
        },
        showOrderSuccessPopUp() {
            this.$refs.OrderSuccessPopUp.showPopUp();
        },
        toggleDropdown(type) {
            this.openDropdown = this.openDropdown === type ? null : type;
        },
        selectCity(city) {
            this.form.city = city;
            this.form.district = '';
            this.openDropdown = null;
        },
        selectDistrict(district) {
            this.form.district = district;
            this.openDropdown = null;
        },
        validatePhone() {
            if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(this.form.customer_phone)) {
                return false;
            }
            return true;
        },
        submitOrder() {
            if (!this.validateForm()) return;

            const cleanedPhone = this.form.customer_phone.replace(/\D/g, '');

            const orderData = {
                customer_name: this.form.customer_name,
                customer_phone: cleanedPhone,
                type: this.deliveryType,
                city: this.deliveryType === 'Доставка' ? this.form.city : null,
                district: this.deliveryType === 'Доставка' ? this.form.district : null,
                street: this.deliveryType === 'Доставка' ? this.form.street : null,
                house: this.deliveryType === 'Доставка' ? this.form.house : null,
                entrance: this.form.entrance || null,
                apartment: this.form.apartment || null,
                comment: this.form.comment || null,
                products: this.cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity
                }))
            };

            api.post('/orders', orderData)
                .then(res => {
                    console.log('Заказ успешно создан:', res.data);
                    this.$refs.OrderSuccessPopUp.showPopUp();
                    this.clearCartForRestaurant(this.restaurantSlug);
                })
                .catch(error => {
                    console.error('Ошибка при оформлении заказа:', error.response?.data || error);
                    this.$refs.FormErrorNotify.showNotify();
                });
        },
        validateForm() {
            console.log('validating');

            this.phoneError = false;
            let hasError = false;

            // Обнуляем ошибки перед проверкой
            this.formErrors = {
                customer_name: false,
                customer_phone: false,
                city: false,
                district: false,
                street: false,
                house: false
            };

            const requiredFields = this.deliveryType === 'Доставка'
                ? ['customer_name', 'customer_phone', 'city', 'district', 'street', 'house']
                : ['customer_name', 'customer_phone'];

            requiredFields.forEach(field => {
                if (!this.form[field].trim()) {
                    this.formErrors[field] = true;
                    hasError = true;
                }
            });

            if (!this.validatePhone()) {
                this.phoneError = true;
                hasError = true;
            }

            if (hasError) {
                this.$refs.FormErrorNotify.showNotify();

                setTimeout(() => {
                    this.formErrors = {
                        customer_name: false,
                        customer_phone: false,
                        city: false,
                        district: false,
                        street: false,
                        house: false
                    };
                    this.phoneError = false;
                }, 5000);

                return false;
            }

            return true;
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

/* .custom-select::after {
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
} */

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

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; 
        line-clamp: 3; 
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: calc(19.2px * 3); 
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

    .cart-total-order.mobile{
        display: none;
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


    .order-form__input.error{
        color: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522)
    }

    .custom-select.error{
        color: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522)
    }
    
</style>

<style scoped>
    .custom-select {
        width: calc(50% - 8px);
        position: relative;
    }

    /* Кастомный селект (закрытый) */
    .custom-dropdown {
        width: 100%;
        height: 48px;
        padding: 12px;
        border: 1px solid var(--Color-Gray, #9E9E9E);
        border-radius: 2px;
        font-size: 16px;
        font-weight: 500;
        color: var(--Btn-Black, #000000);
        /* background: url('/images/form/paper.png'), url('/images/form/noisy-bg.png');
        background-blend-mode: overlay;
        background-size: cover; */
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    /* Заблокированный селект */
    .custom-dropdown.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Стрелка */
    .dropdown-arrow {
        width: 24px;
        height: 24px;
        background: url('/images/form/select-arrow.svg') no-repeat center;
        background-size: contain;
        transition: transform 0.3s ease;
    }

    .dropdown-arrow.open {
        transform: rotate(180deg);
    }

    /* Выпадающий список */
    .dropdown-list {
        position: absolute;
        /* top: 100%; */
        /* top: 85%; */
        top: 40px;
        left: 0;
        width: 100%;
        background: url('/images/form/paper.png'), url('/images/form/noisy-bg.png');
        background-blend-mode: normal;
        background-size: cover;
        padding: 14px 12px;
        border: 1px solid var(--Color-Gray, #9E9E9E);
        border-radius: 2px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        z-index: 10;
        background-color: rgba(255, 255, 255, 1); /* Полностью непрозрачный белый фон */
        opacity: 1 !important; /* Убираем все нежелательные эффекты прозрачности */
    }

    /* Опции */
    .dropdown-list li {
        display: flex;
        align-items: center;
        padding-left: 36px;
        height: 32px;
        cursor: pointer;
        transition: background 0.2s;

        font-family: Vela Sans GX;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;

    }

    .dropdown-list li+li{
        margin-top: 8px;
    }

    .dropdown-list li.selected{
        padding-left: 0;
    }

    .dropdown-list li:hover {
        background: #9E9E9E26;
    }

    /* Галочка у выбранного */
    .checkmark {
        width: 24px;
        height: 24px;
        margin-right: 12px;
    }

</style>

<style scoped>
    @media (max-width: 1394px){
        .order-form__wrapper,
        .order-cart__wrapper{
            width: 50%;
        }
    }
    @media (max-width: 1250px){
        .order-content{
            flex-direction: column;
        }
        .order-form__wrapper,
        .order-cart__wrapper{
            width: 100%;
        }
        .cart__list{
            height: 371px;
        }
    }

    @media (max-width: 768px){
        .order-content__wrapper{
            margin-top: 0;
        }
        .order-form__wrapper{
            padding: 18px 12px;
        }
        .order-content__title{
            font-family: Vela Sans GX;
            font-size: 18px;
            font-weight: 600;
            line-height: 18px;
            letter-spacing: -0.03em;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            margin-bottom: 18px;
        }
        .order-form__type-selector{
            height: 35px;
            margin-bottom: 18px;
        }
        .order-form__type-button{
            font-family: Vela Sans GX;
            font-size: 12px;
            font-weight: 600;
            line-height: 17.4px;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
        }

        .order-form__inputs{
            gap: 8px;
        }
        .order-form__inputs-row{
            flex-direction: column;
            gap: 8px;
        }
        .order-form__input{
            width: 100%;
            height: 45px;
        }
        .custom-select{
            width: 100%;
            height: 45px;
        }

        .order-cart__wrapper{
            padding: 18px 0 18px 12px;
        }
        .cart__list{
            padding-right: 12px;
            height: 240px;
            margin-bottom: 0;
        }
        .cart-total-order{
            padding-right: 12px;
        }
        .cart__item{
            padding-top: 6px;
        }
        .cart__item__content{
            padding: 8px 8px 8px 0;
            gap: 12px;
        }
        .cart__item__info-name{
            font-family: Vela Sans GX;
            font-size: 12px;
            font-weight: 500;
            line-height: 14.4px;
            letter-spacing: -0.02em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;

            -webkit-line-clamp: 3; 
            line-clamp: 3; 
            max-height: calc(14.4px * 3); 
        }
        span.cart__item__info-quantity-span{
            font-family: Vela Sans GX;
            font-size: 12px;
            font-weight: 500;
            line-height: 14.4px;
            letter-spacing: -0.02em;
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
        }
        .cart__item__cross{
            width: 16px;
            height: 16px;
        }
        .cart-total-order{
            display: none;
        }

        .cart-total-order.mobile{
            display: flex;
            padding-right: 0;
        }
        .order-content{
            margin-bottom: 18px;
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
    }
</style>

