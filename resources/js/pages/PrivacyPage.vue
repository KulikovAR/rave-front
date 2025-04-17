<template>
    <div class="privacy-page">
        <MainHeader 
            ref="MainHeader"
            @showDeliveryPopUp="showDeliveryPopUp"
            @showSchedulePopUp="showSchedulePopUp"
        />
        <DeliveryPopUp
            ref="DeliveryPopUp"
        />
        <SchedulePopUp
            ref="SchedulePopUp"
            :restaurants="restaurants"
        />
        <PrivacyContent />
    </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue';
import DeliveryPopUp from '../components/DeliveryPopUp.vue';
import SchedulePopUp from '../components/SchedulePopUp.vue';
import PrivacyContent from '../components/PrivacyContent.vue';

export default {
    name: 'PrivacyPage',
    components: {
        MainHeader,
        DeliveryPopUp,
        SchedulePopUp,
        PrivacyContent,
    },
    methods: {
        showDeliveryPopUp() {
            this.$refs.DeliveryPopUp.showPopUp();
        },
        showSchedulePopUp() {
            this.$refs.SchedulePopUp.showPopUp();
        },
    },
};
</script>

<style scoped>
    .privacy-page {
        padding-top: calc(65px + 48px);
        padding-bottom: calc(65px + 48px);
    }
    
</style>

