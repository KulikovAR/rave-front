<template>
    <div class="category-list__wrapper">
        <div class="container">
            <div class="category-list">
                <CategoryItem
                    v-for="(item,index) in this.categories" 
                    :key="index"
                    :item="item"
                />
            </div>
        </div>
    </div>
</template>

<script>
import CategoryItem from './CategoryItem.vue';
export default {
    name: 'CategoryList',
    components:{
        CategoryItem
    },
    data(){
        return{
            categories: [],
        }
    }
}
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