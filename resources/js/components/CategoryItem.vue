<template>
    <div class="category-item"
        :style="{ 
            backgroundImage: `url('/images/restaurants/categories/paper.png'), url('${this.item.image}'), url('/images/restaurants/categories/noisy-bg.png')` 
        }"
    >
        
        <div class="category-item__name">
            {{ this.item.name }}
        </div>
        <div class="category-item__description">
            {{ this.item.description }}
        </div>

        <div class="category-item__link">
            Перейти
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoryItem',
    props: {
        item: Object,
    }
}
</script>

<style scoped>
    .category-item{
        width: calc(50% - 24px/2);
        height: 300px;
        padding: 24px 28px;
        border-radius: 2px;
        display: flex;
        flex-direction: column;

        
        background-size: cover, contain, cover;   
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