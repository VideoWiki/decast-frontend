<template>
    <div class="wrapper">
        <div class="heading flex">
            <img src="@/assets/images/dashboard/Vector31.svg"/>
            <p>Event is Live - Test Cast </p>
            <p>by Aman Bishnoi</p>
            <img class="cross" src="@/assets/images/create-event/Vector30.svg"/>
        </div>
        <div class="buttons">
            <button @click="changeTab('Verification')">Verification</button>
            <button @click="changeTab('Join')">Join</button>
        </div>
        <div v-if="activeSection==='Verification'" class="verifie">
            <p class="same">This is a private secure event, so let’s just verify that it is really you.</p>
            <div class="input-section">
                <p>Email *</p>
                <input class="take-input" type="email" placeholder="jangubisnoi@gmail.com"/>
            </div>
            <div class="otp-text">
                We will send an OTP to your email to verify your email. This does not 
                create your VideoWiki account.
            </div>
            <button class="submit">Request OTP</button>
        </div>
        <div v-else class="join">
            <p class="same">Enter your name to join the event.</p>
            <div class="input-section">
                <p>Your name *</p>
                <input class="take-input" type="email" placeholder="John Doe"/>
            </div>
            <button class="submit">Join</button>
        </div>
    </div>
</template>
<script>
export default{
    name : 'JoinPrivateCast',
    data () {
        return {
            activeSection : 'Verification',
        }
    },
    methods:{
        changeTab(tabName){
            this.activeSection = tabName;
        }

    }
}
</script>
<style scoped>
.wrapper{
    width: 423px;
    height: 335px;
    background-color: #1F272F;
    border-radius: 10px;
}

</style>