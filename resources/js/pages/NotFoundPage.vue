<template>
    <div class="not-found-page page">
        <Header
            @showContactsPopUp="showContactsPopUp"
        />
        <ContactsPopUp
            ref="ContactsPopUp"
        />
        <NotFoundContent/>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import ContactsPopUp from '../components/ContactsPopUp.vue';
import NotFoundContent from '../components/NotFoundContent.vue';

export default {
    name: 'NotFoundPage',
    components: {
        Header,
        ContactsPopUp,
        NotFoundContent
    },
    data(){
        return{
            
        }
    },
    methods: {
        showContactsPopUp(){
            this.$refs.ContactsPopUp.showPopUp();
        },
        
    },
    
}
</script>

<style scoped>
    .not-found-page{
        padding-top: calc(65px + 2 * 24px);
        padding-bottom: calc(65px + 2 * 24px);
        height: 100vh;
    }
</style>