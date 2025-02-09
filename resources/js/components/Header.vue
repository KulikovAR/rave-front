<template>
    <div class="header">
      <div class="container">
        <div class="header__content-wrapper">
          <div class="header__content" :class="{ 'open': isMenuOpen }">
            <router-link :to="{ name: 'main' }" class="header__logo">
              <img class="header__logo-img" src="/images/logo.svg" alt="Логотип">
            </router-link>
            <div class="header__links">
              <router-link :to="{ name: 'main' }" class="header__link">
                На Главную
              </router-link>
  
              <!-- Условное отображение для "Контактов" -->
              <div 
                class="header__link" 
                v-if="!is404Page"
                @click="showContactsPopUp"
              >
                Контакты
              </div>
  
              <!-- Условное отображение для корзины -->
              <router-link 
                v-if="!is404Page"
                :to="{ name: 'cart', params: { restaurantSlug } }" 
                class="header__link cart mobile"
                :class="{ active: restaurantCartCount > 0 }"
                @click="closeMenu()"
              >
                <img class="header__cart" src="/images/cart/cart.svg" alt="Корзина">
                <img class="header__cart active" src="/images/cart/cart-active.svg" alt="Корзина">
                <div v-if="restaurantCartCount > 0" class="header__cart__quantity">{{ restaurantCartCount }}</div>
              </router-link>
  
              <div class="main-header__burger-btn" @click="toggleMenu">
                <div class="main-header__burger-btn__row" :class="{ 'top': isMenuOpen }"></div>
                <div class="main-header__burger-btn__row" :class="{ 'middle': isMenuOpen }"></div>
                <div class="main-header__burger-btn__row" :class="{ 'bottom': isMenuOpen }"></div>
              </div>
            </div>
          </div>
          <div class="main-header__burger-dropdown" :class="{ 'open': isMenuOpen }">
            <router-link :to="{ name: 'main' }" class="header__link mobile" @click="closeMenu(); closeMenu()">
              На Главную
            </router-link>
            <div class="header__link mobile" v-if="!is404Page" @click="showContactsPopUp(); closeMenu()">
              Контакты
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    name: "Header",
    props: {
      restaurantSlug: String,
    },
    data() {
      return {
        isMenuOpen: false,
      };
    },
    computed: {
      ...mapGetters("cart", ["getCart"]),
      restaurantCartCount() {
        return (this.getCart(this.restaurantSlug) || []).reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      },
      // Проверяем, находимся ли мы на странице 404
      is404Page() {
        return this.$route.name === '404';
      }
    },
    methods: {
      showContactsPopUp() {
        this.$emit("showContactsPopUp");
      },
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
      closeMenu() {
        this.isMenuOpen = false;
      },
    },
  };
  </script>

<style scoped>
    .header{
        position: fixed;
        top: 24px;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 3;
    }

    .header__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 65px;
        background: #FFFFFC;
        border-radius: 2px;
        padding: 0 24px;
    }

    .header__content.open{
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .header__logo{
        height: 42px;
    }
    .header__logo-img{
        height: 100%;
    }

    .header__links{
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 24px;
    }

    .header__link{
        position: relative;
        font-family: Vela Sans GX;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        letter-spacing: -0.03em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #000;
        cursor: pointer;
        text-transform: uppercase;
        z-index: 100;
    }

    .header__link:hover{
        color: var(--Btn-Hover-Red, #BE1522);
        transition: 1 ease;
    }

    .header__cart{
        width: 24px;
        height: 24px;
    }

    .header__cart__quantity{
        position: absolute;
        top: 0;
        transform: translateY(-50%);
        right: -50%;
        border-radius: 32px;
        background: #CF0939;
        border: 1px solid var(--Color-White, #FFFFFC);

        font-family: Inter;
        font-size: 12px;
        font-weight: 600;
        line-height: 16.2px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        letter-spacing: 1px;

        color: #FFFFFF;

        padding: 1px 4px;

        min-width: 23px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header__link.cart .header__cart{
        display: block;
    }

    .header__link.cart .header__cart.active{
        display: none;
    }

    .header__link.cart:hover .header__cart{
        display: none;
    }
    .header__link.cart:hover .header__cart.active{
        display: block;
    }

    .header__link.cart.active .header__cart{
        display: none;
    }

    .header__link.cart.active .header__cart.active{
        display: block;
    }
</style>

<style scoped>
    .header__content-wrapper{
        width: 100%;
        position: relative;
    }
    .main-header__burger-btn{
        width: 18px;
        height: 16px;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        cursor: pointer;
        display: none;
        transition: all 0.3s ease-in-out;
    }

    .main-header__burger-btn__row{
        width: 100%;
        height: 2px;
        border-radius: 2px;
        background: #292D32;
        transition: all 0.3s ease-in-out;
    }

    .main-header__burger-btn__row.top {
        transform: translateY(7px) rotate(45deg);
    }

    .main-header__burger-btn__row.middle {
        opacity: 0;
    }

    .main-header__burger-btn__row.bottom {
        transform: translateY(-7px) rotate(-45deg);
    }

    .main-header__burger-dropdown {
        width: 100%;
        padding: 0 12px;
        background: #FFFFFC;
        position: absolute;
        top: 100%;
        left: 0;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    .main-header__burger-dropdown.open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
        padding: 35px 12px;
    }
</style>

<style scoped>
    @media (max-width: 768px){
        .header{
            top: 18px;
        }
        .header__content{
            height: 48px;
            padding: 0 12px;
        }
        .header__logo{
            height: 23px;
        }

        .header__link{
            font-family: Vela Sans GX;
            font-size: 16px;
            font-weight: 500;
            line-height: 16px;
            letter-spacing: -0.03em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            display: none;
        }

        .header__link.mobile{
            display: inline;
        }

        .main-header__burger-btn{
            display: flex;
        }
    }
    @media (min-width: 768px){
        .main-header__burger-dropdown.open{
            display: none;
        }
        .main-header__content.open{
            border-bottom-left-radius: 2px;
            border-bottom-right-radius: 2px;
        }
    }
</style>