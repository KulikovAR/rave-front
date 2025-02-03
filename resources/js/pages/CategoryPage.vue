<template>
    <div class="category-page page">
        <Header
            @showContactsPopUp="showContactsPopUp"
        />
        <ContactsPopUp
            ref="ContactsPopUp"
        />
        <CategoryTabs/>
        <CategoryList
            ref="CategoryList"
        />
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import CategoryTabs from '../components/CategoryTabs.vue';
import CategoryList from '../components/CategoryList.vue';
import ContactsPopUp from '../components/ContactsPopUp.vue';
export default {
    name: 'CategoryPage',
    components: {
        Header,
        CategoryTabs,
        CategoryList,
        ContactsPopUp
    },
    data(){
        return{
            categories: [],
        }
    },
    methods: {
        initCategoriesData(){
            this.categories = [
                {
                    name: 'Шаурма',
                    description: 'Сделав классическую, мы добавили авторские позиции с знакомыми сочетаниями на основе соусов и полуфабрикатов нашего производства',
                    image: '/images/restaurants/categories/category-bg-1.png',
                },
                {
                    name: 'Хот-доги',
                    description: 'Домашняя нежная булочка из нашей пекарни с домашней  сосиской из куриного рубленного бедра, сделанной по собственной рецептуре в натуральной оболочке',
                    image: '/images/restaurants/categories/category-bg-2.png',
                },
                {
                    name: 'Экстра',
                    description: 'Авторские боулы и отборный картофель фри',
                    image: '/images/restaurants/categories/category-bg-3.png',
                },
                {
                    name: 'Сендвичи',
                    description: 'Домашний ремеслянный хлеб, приготовленный в нашей пекарне из пшеничной муки с добавлением солода и семечек подсолнуха, который мы обжариваем на гриле',
                    image: '/images/restaurants/categories/category-bg-4.png',
                },
                {
                    name: 'Шаурма',
                    description: 'Сделав классическую, мы добавили авторские позиции с знакомыми сочетаниями на основе соусов и полуфабрикатов нашего производства',
                    image: '/images/restaurants/categories/category-bg-1.png',
                },
                {
                    name: 'Хот-доги',
                    description: 'Домашняя нежная булочка из нашей пекарни с домашней  сосиской из куриного рубленного бедра, сделанной по собственной рецептуре в натуральной оболочке',
                    image: '/images/restaurants/categories/category-bg-2.png',
                },
                {
                    name: 'Экстра',
                    description: 'Авторские боулы и отборный картофель фри',
                    image: '/images/restaurants/categories/category-bg-3.png',
                },
                {
                    name: 'Сендвичи',
                    description: 'Домашний ремеслянный хлеб, приготовленный в нашей пекарне из пшеничной муки с добавлением солода и семечек подсолнуха, который мы обжариваем на гриле',
                    image: '/images/restaurants/categories/category-bg-4.png',
                }
            ];
            this.initCategoryList();
        },
        initCategoryList(){
            this.$refs.CategoryList.categories = this.categories;
        },
        showContactsPopUp(){
            this.$refs.ContactsPopUp.showPopUp();
        },
    },
    mounted(){
        this.initCategoriesData();
    }
}
</script>

<style scoped>
    .category-page{
        padding-top: calc(65px + 48px + 3 * 24px);
        padding-bottom: calc(65px + 48px + 3 * 24px);
    }
</style>