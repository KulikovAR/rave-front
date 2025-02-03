<template>
    <div class="catalog-item"
        :class="{ new: item.new }"
    >
        <div class="catalog-item__photo">
            <img class="catalog-item__photo-img" :src="item.media[0].path" alt="photo">
            <div class="catelog-item__new-flag">
                New
            </div>
        </div>

        <div class="catalog-item__content">
            <div class="catalog-item__separator"></div>
            <div class="catalog-item__name">
            {{ this.item.name }}
            </div>
            <div class="catalog-item__price">
                {{ this.item.price }}
            </div>

            <div class="catalog-item__buttons">
                <div class="catalog-item__button cart">
                    В корзину
                </div>
                <div class="catalog-item__button">
                    Подробнее
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
export default {
    name: 'CatalogItem',
    props: {
        item: Object,
    }
}
</script>

<style scoped>
    .catalog-item{
        position: relative;
        width: 25%;
        height: 424px;
        display: flex;
        flex-direction: column;
        align-items: center;

        border-right: 1px solid #9E9E9E;
        border-bottom: 1px solid #9E9E9E;
    }

    .catalog-item::after {
        content: "";
        position: absolute;
        top: -1px;  /* Выступает наружу */
        left: -1px;
        right: -1px;
        bottom: -1px;
        border: 1px solid transparent; /* Исходно невидимая обводка */
        pointer-events: none;
    }

    .catalog-item:hover::after {
        border: 2px solid var(--Btn-Hover-Red, #BE1522); /* Показываем обводку */
    }

    .catalog-item__photo{
        position: relative;
        width: 100%;
        height: 55%;
        overflow: hidden; /* Чтобы изображение не выходило за границы */
    }

    .catalog-item__photo-img{
        width: 100%;
        height: 100%;
        object-fit: contain; /* Сохраняет пропорции */
        object-position: left bottom; /* Прижимает к левому нижнему углу */
    }

    .catelog-item__new-flag{
        position: absolute;
        top: 16px;
        right: 16px;

        padding: 4px 6px;
        border-radius: 4px;
        background: var(--Btn-Hover-Red, #BE1522);

        font-family: Vela Sans GX;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        letter-spacing: -0.03em;
        text-align: center;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        text-transform: uppercase;
        color: var(--Color-White, #FFFFFC);


        display: none;
        justify-content: center;
        align-items: center;


    }

    .catalog-item.new .catelog-item__new-flag{
        display: flex;
    }

    .catalog-item__content{
        padding: 0 12px 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        flex-grow: 1;
        width: 100%;

    }



    .catalog-item__name{
        font-family: Vela Sans GX;
        font-size: 16px;
        font-weight: 400;
        line-height: 21.6px;
        text-align: center;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;

        color: #000;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* Количество строк */
        line-clamp: 2; /* Стандартная версия */
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: calc(21.6px * 2); /* 2 строки * высоту строки */
    }

    .catalog-item__price{
        font-family: Vela Sans GX;
        font-size: 18px;
        font-weight: 800;
        line-height: 18px;
        letter-spacing: -0.03em;
        text-align: center;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;

        color: var(--Btn-Black, #000000);

        /* flex-grow: 1; */
    }

    .catalog-item__buttons{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px
    }

    .catalog-item__button{
        width: 100%;
        height: 48px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: Vela Sans GX;
        font-size: 14px;
        font-weight: 600;
        line-height: 20.3px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;

        color: var(--Btn-Black, #000000);
        border: 1px solid var(--Btn-Black, #000000);


        cursor: pointer;
    }

    .catalog-item__button:hover{
        color: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522);
    }

    .catalog-item__button.cart{
        background: var(--Btn-Black, #000000);
        color: var(--Color-White, #FFFFFC);
    }

    .catalog-item__button.cart:hover{
        color: #FFFFFF;
        background: var(--Btn-Hover-Red, #BE1522);
        border: 1px solid var(--Btn-Hover-Red, #BE1522);
    }
</style>