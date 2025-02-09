<template>
    <div class="category-list__wrapper">
        <div class="container">
            <div class="category-list">
                <CategoryItem
                    v-for="(item,index) in this.categories" 
                    :key="index"
                    :item="item"
                    :restaurantSlug="restaurantSlug"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import CategoryItem from "./CategoryItem.vue";

const BASE_URL = "https://rave-back.pisateli-studio.ru/storage/";

export default {
    name: "CategoryList",
    components: {
        CategoryItem,
    },
    props: {
        restaurantSlug: String,
    },
    setup(props) {
        const store = useStore();

        // Функция для получения полного пути к изображению
        const getFullImagePath = (imageName) => {
            return `${BASE_URL}${imageName}`;
        };

        const categories = computed(() => {
            const currentRestaurant = store.state.restaurant.restaurants.find(
                (r) => r.slug === props.restaurantSlug
            );
            if (!currentRestaurant) return [];

            return store.state.restaurant.categories
                .filter((category) => category.restaurant_id === currentRestaurant.id)
                .map((category) => ({
                    ...category,
                    image: getFullImagePath(category.image), // Добавляем полный путь к картинке
                }));
        });

        return {
            categories,
        };
    },
};
</script>

<style scoped>
    .category-list__wrapper{
        width: 100%;
    }
    .category-list{
        padding: 0 24px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 24px;
    }
</style>

<style scoped>
    @media (max-width: 1000px){
        .category-list {
            padding: 0;
        }
    }
</style>