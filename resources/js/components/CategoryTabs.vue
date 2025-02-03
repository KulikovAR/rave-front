<template>
    <div class="category-tabs">
        <div class="container">
            <div class="category-tabs__wrapper">

                <!-- Логотип остается на месте -->
                <div class="current-restaurant__logo">
                    <img class="current-restaurant__logo-img" src="/images/restaurants/logo-3.png" alt="">
                </div>

                <!-- Вся обводка теперь статична, а внутренняя часть скроллится -->
                <div class="category-tabs__list-wrapper">
                    <div class="category-tabs__list" ref="scrollContainer">
                        <div class="category-tabs__item new">New</div>
                        <div class="category-tabs__item current">категории</div>
                        <div class="category-tabs__item">Шаурма</div>
                        <div class="category-tabs__item">Хот-доги</div>
                        <div class="category-tabs__item">Сендвичи</div>
                        <div class="category-tabs__item new">New</div>
                        <div class="category-tabs__item">Бургеры</div>
                        <div class="category-tabs__item">Стритфуд</div>
                        <div class="category-tabs__item">Напитки</div>
                        <div class="category-tabs__item">Десерты</div>
                        <div class="category-tabs__item new">New</div>
                        <div class="category-tabs__item current">категории</div>
                        <div class="category-tabs__item">Шаурма</div>
                        <div class="category-tabs__item">Хот-доги</div>
                        <div class="category-tabs__item">Сендвичи</div>
                        <div class="category-tabs__item new">New</div>
                        <div class="category-tabs__item">Бургеры</div>
                        <div class="category-tabs__item">Стритфуд</div>
                        <div class="category-tabs__item">Напитки</div>
                        <div class="category-tabs__item">Десерты</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoryTabs',
    mounted() {
        const slider = this.$refs.scrollContainer;
        let isDown = false;
        let startX;
        let scrollLeft;

        // Перетаскивание мышью
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = "grabbing";
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = "grab";
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = "grab";
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX); // Ускоряем движение
            slider.scrollLeft = scrollLeft - walk;
        });

        // Прокрутка колесом мыши
        slider.addEventListener('wheel', (e) => {
            e.preventDefault();
            slider.scrollLeft += e.deltaY * 0.2; // Прокручиваем горизонтально
        });
    }
}
</script>

<style scoped>
.category-tabs {
    position: fixed;
    top: calc(65px + 2 * 24px);
    width: 100%;
    height: 48px;
    z-index: 10;
}

.category-tabs__wrapper {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.current-restaurant__logo {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 4px;
    border: 1px solid var(--Color-Gray, #9E9E9E);
}

.current-restaurant__logo-img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
}

/* Обертка для списка с обводкой */
.category-tabs__list-wrapper {
    flex-grow: 1;
    overflow: hidden;
    height: 48px;
    border-radius: 4px;
    border: 1px solid var(--Color-Gray, #9E9E9E);
}

/* Сам список прокручивается */
.category-tabs__list {
    height: 48px;
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 0 24px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Скрываем скроллбар для Firefox */
    user-select: none;
}

.category-tabs__list::-webkit-scrollbar {
    display: none; /* Скрываем скроллбар для Chrome/Safari */
}

.category-tabs__item {
    flex-shrink: 0;
    white-space: nowrap;
    font-family: Vela Sans GX;
    font-size: 18px;
    font-weight: 500;
    color: #000;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;
}

.category-tabs__item.current {
    font-weight: 700;
    color: #BE1522;
}

.category-tabs__item.new {
    padding: 4px 6px;
    border-radius: 4px;
    background: #BE1522;
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFC;
}

.category-tabs__item:hover {
    color: #BE1522;
}

.category-tabs__item.new:hover {
    color: #FFFFFC;
    background: #CF0939;
    border: 1px solid black;
    padding: 3px 5px;
}
</style>