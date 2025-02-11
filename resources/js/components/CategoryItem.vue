<template>
    <div class="category-item"
        :style="{ 
            backgroundImage: `url('/images/restaurants/categories/paper.png'), url('${item.image}'), url('/images/restaurants/categories/noisy-bg.png')` 
        }"
        @click="goToCatalog(item.slug)"
    >
        <div class="category-item__name">
            {{ item.name }}
        </div>
        <div class="category-item__description-wrapper">
            <div class="category-item__description">
                {{ item.description }}
            </div>

            <div class="category-item__link" @click="goToCatalog(item.slug)">
                Перейти
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CategoryItem",
    props: {
        restaurantSlug: String,
        item: Object,
    },
    methods: {
        goToCatalog(categorySlug) {
            this.$router.push({ 
                name: "catalog", 
                params: { 
                    restaurantSlug: this.restaurantSlug, 
                    categorySlug 
                } 
            });
        }
    }
};
</script>

<style scoped>
    .category-item{
        width: calc(50% - 24px/2);
        height: 300px;
        padding: 24px 28px;
        border-radius: 2px;
        display: flex;
        flex-direction: column;

        
        background-size: cover, auto 100%, cover;   
        background-position: center, right bottom, center;
        background-repeat: no-repeat, no-repeat, repeat;
    }

    .category-item:hover{
        border: 1px solid var(--Btn-Hover-Red, #BE1522);
        transition: 0.3s ease;
    }

    .category-item__name{
        font-family: Vela Sans GX;
        font-size: 32px;
        font-weight: 600;
        line-height: 36.48px;
        letter-spacing: -0.05em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #000;
        text-transform: uppercase;
        margin-bottom: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 36.48px;
    }

    .category-item__description-wrapper{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
    }
    .category-item__description{
        max-width: 55%;
        font-family: Vela Sans GX;
        font-size: 14px;
        font-weight: 400;
        line-height: 20.3px;
        letter-spacing: -0.05em;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: var(--Color-Dark-gray, #505050);
        flex-grow: 1;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 7; /* Количество строк */
        line-clamp: 7; /* Стандартная версия */
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: calc(20.3px * 7); /* 2 строки * высоту строки */
    }

    .category-item__link{
        width: 160px;
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
        text-align: center;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: var(--Color-White, #FFFFFC);

        cursor: pointer;
    }

    .category-item__link:hover{
        color: #FFFFFF;
        background: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522)
    }
</style>

<style scoped>
    @media (max-width: 1000px){
        .category-item {
            width: 100%;
        }
    }

    @media (max-width: 768px){
        .category-item{
            height: 170px;
            padding: 16px 14px;
        }

        .category-item__name{
            font-family: Vela Sans GX;
            font-size: 16px;
            font-weight: 600;
            line-height: 18.24px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            margin-bottom: 4px;
            max-height: 18.24px;
        }

        .category-item__description{
            font-family: Vela Sans GX;
            font-size: 12px;
            font-weight: 300;
            line-height: 14.52px;
            letter-spacing: -0.05em;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;


            -webkit-line-clamp: 3; /* Количество строк */
            line-clamp: 3; /* Стандартная версия */
            max-height: calc(14.52px * 3); /* 2 строки * высоту строки */
        }

        .category-item__link{
            width: 115px;
            height: 30px;
            font-family: Vela Sans GX;
            font-size: 12px;
            font-weight: 600;
            line-height: 17.4px;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;

        }
    }
</style>