<template>
    <div class="category-tabs">
        <div class="container">
            <div class="category-tabs__wrapper">
                <div class="current-restaurant__logo" ref="logo">
                    <img 
                        class="current-restaurant__logo-img" 
                        :src="currentRestaurantLogo" 
                        :alt="currentRestaurantName"
                    >
                </div>

                <div class="category-tabs__list-wrapper" ref="listWrapper">
                    <div class="category-tabs__list" ref="scrollContainer">
                        <div 
                            v-if="hasNewItems"
                            class="category-tabs__item new"
                            :class="{ 'current': isActiveTab('new') }"
                            @click="goToCatalog('new')"
                        >
                            New
                        </div>

                        <div 
                            class="category-tabs__item"
                            :class="{ 'current': isActiveTab('categories') }"
                            @click="goToCategories"
                        >
                            Категории
                        </div>

                        <div 
                            v-for="(item, index) in categories"
                            :key="index"
                            class="category-tabs__item"
                            :class="{ 'current': isActiveTab(item.slug) }"
                            @click="goToCatalog(item.slug)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const BASE_URL = process.env.MIX_RAVE_IMAGE_STORAGE_BASE;

export default {
    name: "CategoryTabs",
    props: {
        restaurantSlug: String,
        categorySlug: String,
    },
    setup(props) {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const categories = computed(() => {
            const currentRestaurant = store.state.restaurant.restaurants.find(r => r.slug === props.restaurantSlug);
            if (!currentRestaurant) return [];
            
            return store.state.restaurant.categories.filter(category => category.restaurant_id === currentRestaurant.id);
        });

        const hasNewItems = computed(() => {
            const currentRestaurant = store.state.restaurant.restaurants.find(r => r.slug === props.restaurantSlug);
            if (!currentRestaurant) return false;

            const restaurantCategories = store.state.restaurant.categories
                .filter(category => category.restaurant_id === currentRestaurant.id)
                .map(category => category.id);

            return store.state.restaurant.products.some(product =>
                product.new === 1 && restaurantCategories.includes(product.category_id)
            );
        });

        const currentRestaurant = computed(() => 
            store.state.restaurant.restaurants.find(r => r.slug === props.restaurantSlug) || {}
        );

        const currentRestaurantLogo = computed(() =>
            currentRestaurant.value.photo
                ? `${BASE_URL}${currentRestaurant.value.photo}`
                : ""
        );
        const currentRestaurantName = computed(() => currentRestaurant.value.name || "");

        const currentTab = computed(() => props.categorySlug || "categories");
        const isActiveTab = (tabSlug) => {
            return currentTab.value === tabSlug;
        };

        const goToCatalog = (categorySlug) => {
            router.push({ 
                name: categorySlug === "new" ? "newCatalog" : "catalog",
                params: { restaurantSlug: props.restaurantSlug, categorySlug },
            });
        };

        const goToCategories = () => {
            router.push({ name: "categories", params: { restaurantSlug: props.restaurantSlug } });
        };

        const listWrapper = ref(null);
        const logo = ref(null);
        const scrollContainer = ref(null);

        const handleScroll = () => {
            if (listWrapper.value && logo.value) {
                const background = window.scrollY > 10 ? "#FFFFFC" : "transparent";
                listWrapper.value.style.background = background;
                logo.value.style.background = background;
            }
        };

        const handleMouseDown = (e) => {
            const slider = scrollContainer.value;
            if (!slider) return;

            slider.isDown = true;
            slider.startX = e.pageX - slider.offsetLeft;
            slider.scrollLeftStart = slider.scrollLeft;
            slider.style.cursor = "grabbing";
        };

        const handleMouseLeave = () => {
            const slider = scrollContainer.value;
            if (!slider) return;

            slider.isDown = false;
            slider.style.cursor = "grab";
        };

        const handleMouseUp = () => {
            const slider = scrollContainer.value;
            if (!slider) return;

            slider.isDown = false;
            slider.style.cursor = "grab";
        };

        const handleMouseMove = (e) => {
            const slider = scrollContainer.value;
            if (!slider || !slider.isDown) return;

            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = x - slider.startX;
            slider.scrollLeft = slider.scrollLeftStart - walk;
        };

        const handleWheelScroll = (e) => {
            const slider = scrollContainer.value;
            if (!slider) return;

            e.preventDefault();
            slider.scrollLeft += e.deltaY * 0.2;
        };

        onMounted(() => {
            window.addEventListener("scroll", handleScroll);

            nextTick(() => {
                const slider = scrollContainer.value;
                if (!slider) return;

                slider.addEventListener("mousedown", handleMouseDown);
                slider.addEventListener("mouseleave", handleMouseLeave);
                slider.addEventListener("mouseup", handleMouseUp);
                slider.addEventListener("mousemove", handleMouseMove);
                slider.addEventListener("wheel", handleWheelScroll);
            });
        });

        onUnmounted(() => {
            window.removeEventListener("scroll", handleScroll);

            const slider = scrollContainer.value;
            if (!slider) return;

            slider.removeEventListener("mousedown", handleMouseDown);
            slider.removeEventListener("mouseleave", handleMouseLeave);
            slider.removeEventListener("mouseup", handleMouseUp);
            slider.removeEventListener("mousemove", handleMouseMove);
            slider.removeEventListener("wheel", handleWheelScroll);
        });

        return {
            categories,
            currentRestaurantLogo,
            currentRestaurantName,
            currentTab,
            isActiveTab,
            goToCatalog,
            goToCategories,
            hasNewItems,
            listWrapper,
            logo,
            scrollContainer,
        };
    },
};
</script>

<style scoped>
.category-tabs {
    position: fixed;
    top: calc(65px + 2 * 24px);
    width: 100%;
    height: 48px;
    z-index: 2;
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

<style scoped>
    @media (max-width: 768px){
        .category-tabs {
            top: calc(48px + 18px + 16px);
        }
    }
</style>