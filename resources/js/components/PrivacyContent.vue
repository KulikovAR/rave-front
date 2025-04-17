<template>
    <div class="privacy-content__wrapper">
        <div class="container">
            <div class="privacy-content">
                <div class="privacy-content__title">
                    ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
                </div>

                <div class="privacy-content__text" v-if="restaurant" v-html="parsedPrivacy">
                </div>


                
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { marked } from 'marked';

export default {
    name: 'PrivacyContent',
    props: {
        restaurantSlug: String
    },
    computed: {
        ...mapState('restaurant', ['restaurants']),
        restaurant() {
            return this.restaurants.find(r => r.slug === this.restaurantSlug);
        },
        parsedPrivacy() {
            return this.restaurant ? marked(this.restaurant.privacy) : '';
        }
    },
    methods: {
        ...mapActions('restaurant', ['fetchRestaurants'])
    },
    created() {
        if (!this.restaurants || this.restaurants.length === 0) {
            this.fetchRestaurants();
        }
    }
}
</script>

<style scoped>
    .privacy-content__wrapper .container{
        max-width: 1144px;
    }

    .privacy-content__title{
        font-family: Vela Sans GX;
        font-weight: 500;
        font-size: 16px;
        line-height: 145%;
        letter-spacing: -5%;

        color: #000000;
    }

    .privacy-content__text{
        margin: 24px 0;
        font-family: Vela Sans GX;
        font-weight: 400;
        font-size: 16px;
        line-height: 145%;
        letter-spacing: -5%;

        color: #505050;
    }

    .privacy-content__link{
        text-decoration: underline;
        color: #505050;
    }

    .privacy-content__text :deep(ol) {
        margin: 1em 0;
        font-family: Vela Sans GX;
        font-weight: 500;
        font-size: 16px;
        line-height: 145%;
        letter-spacing: -5%;

        color: #000000;
    }

    .privacy-content__text :deep(ol li) {
        font-family: Vela Sans GX;
        font-weight: 500;
        font-size: 16px;
        line-height: 145%;
        letter-spacing: -5%;

        color: #000000;
    }

    .privacy-content__text :deep(p) {
        font-family: Vela Sans GX;
        font-weight: 400;
        font-size: 16px;
        line-height: 145%;
        letter-spacing: -5%;

        color: #505050;
    }

    .privacy-content__text :deep(strong) {
        font-weight: 500;
    }

    .privacy-content__text :deep(a) {
        color: #505050;
        text-decoration: underline;
    }
</style>