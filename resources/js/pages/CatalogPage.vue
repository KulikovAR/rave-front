<template>
    <div class="catalog-page page">
        <Header
            @showContactsPopUp="showContactsPopUp"
        />
        <ContactsPopUp
            ref="ContactsPopUp"
        />
        <CategoryTabs/>
        <CatalogList
            ref="CatalogList"
        />
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import CategoryTabs from '../components/CategoryTabs.vue';
import CatalogList from '../components/CatalogList.vue';
import ContactsPopUp from '../components/ContactsPopUp.vue';
export default {
    name: 'CatalogPage',
    components: {
        Header,
        CategoryTabs,
        CatalogList,
        ContactsPopUp
    },
    data(){
        return{
            categories: [],
        }
    },
    methods: {
        showContactsPopUp(){
            this.$refs.ContactsPopUp.showPopUp();
        },
    },
    mounted(){
        
    }
}
</script>

<style scoped>
    .catalog-page{
        padding-top: calc(65px + 48px + 3 * 24px);
        padding-bottom: calc(65px + 48px + 3 * 24px);
    }
</style>