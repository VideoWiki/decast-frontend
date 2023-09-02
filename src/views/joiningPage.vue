<template>
    <div class="full-container">
        <div class="logo">
            <img src="@/assets/images/dashboard/Cast-Draft-Logo-02.svg" alt=""/>
        </div>
        <div class="bottom flex">
            <div class="left">
                <img src="@/assets/images/dashboard/Onlinemeeting.svg" alt=""/>
            </div>
            <div class="right">
                <div class="heading-part">
                    <div class="join-text">You're joining the room</div>
                    <div class="class-info">{{ eventName }}</div>
                    <div class="host-info">Hosted by “Jerry D. Carbone”</div>
                </div>
                <div class="dynamic-part" v-if="signedIn">
                    <div class="input-name">
                        <p>Joining name</p>
                        <input v-model="name" type="text" placeholder="e.g John G. Miguel"/>
                    </div>
                    <button class="button" @click="joinRoom">Join</button>
                    <div class="separator">
                        <div class="line"></div>
                        <div>or</div>
                        <div class="line"></div>
                    </div>
                    <button class="sing-in">Sign in</button>
                    <div class="text">Do not have an account? <p>Sign up</p></div>
                </div>
                <div class="dynamic-part" v-else>
                    <div class="input-name">
                        <p>Joining name</p>
                        <input type="text" />
                    </div>
                    <button class="button">Join</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name : 'joiningPage',
    data(){
        return {
            signedIn : true,
            name: '', 
            roomId: this.$route.params.meeting_id ,
            code: '', 
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NjMsInVzZXJuYW1lIjoiYW1hbmogYiA1NjMiLCJleHAiOjE2ODExMzg1MjQsImVtYWlsIjoiYW1hbkB2aWRlby53aWtpIn0.OXyUQixPc1HHzoKJMnGx0oO2hs_1u2gVruY3VDuc1Wg', 
            eventName : '',
        }
    },
    mounted(){
        this.getUserDetails();
    },
    methods: {
        joinRoom() {

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;

        axios
            .post('https://dev.api.room.video.wiki/api/join/', {
                name: this.name,
                public_meeting_id: this.roomId,
                password: this.code,
            })
            .then((response) => {
            console.log('Join API response:', response.data);
            const roomUrl = response.data.room_url;
            window.location.href = roomUrl;
            this.$vs.notify({
                title: 'Success',
                text: response.data.message,
                color: 'success', 
            });
            })
            .catch((error) => {
            console.error('Join API error:', error);
            this.$vs.notify({
                title: 'OOPS',
                text: 'An error occurred while joining the room.',
                color: 'danger', 
            });

            });
        }, 
        async getUserDetails() {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://dev.api.room.video.wiki/api/get/room/details/?room_id=${this.roomId}`,
                headers: { 
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2MjgsInVzZXJuYW1lIjoiU3VqYXRhIERlbHUiLCJleHAiOjE2OTU3MDk5OTcsImVtYWlsIjoic3VqYXRhZGVsdUBnbWFpbC5jb20ifQ.yU1uAgjLrF9oIxsi9K8JUqneVnlcVkuRaYw4M7OzT-c'
                }
            };

            try {
                const response = await axios(config);
                const responseData = response.data;
                console.log("here are we" , responseData)
                this.eventName = responseData.details.event_name;
            } catch (error) {
                console.error(error);
            }
        },
            
    },

}
</script>
<style scoped>
*:not(i) {
  font-family: 'Karla', sans-serif !important;
}
.full-container{
    background-color: #181A20;
    height: 100vh;
    width: 100%;
    padding-left: 67px;
    padding-right: 67px;
    display: flex;
    flex-direction: column;
}
.logo{
    width: 91px;
    height: 91px;
    padding-top: 53px;
}
.bottom{
    margin-top: 200px;
    align-self: flex-end;
}
.left{
    width: 229px;
    height: 194px;
}
.left img{
    object-fit: cover;
}
.right{
    margin-left: 52px;
}
.join-text{
    color: #A6A6A8;
    font-weight: 600;
    font-size: 12px;
}
.class-info{
    color: #A6A6A8;
    font-weight: 500;
    font-size: 24px;
    margin-top: 20px;
}
.host-info{
    font-weight: 500;
    font-size: 16px;
    color: #647181;
    margin-top: 14px;
}
.dynamic-part{
    margin-top: 45px;
}
.input-name p{
    font-weight: 600;
    font-size: 12px;
    color: #637181;
    margin-bottom: 6px;
}
.input-name input{
    width: 319px;
    height: 40px;
    border: 1px solid #31394E;
    border-radius: 6px;
    background-color: #1D232B;
    padding-left: 14px;
    color: #A6A6A8;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    align-items: center;
}
.button{
    margin-top: 18px;
    width: 319px;
    height: 40px;
    background-color: #D7DF23;
    border: 1px solid #31394E;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #181A20;
}
.separator{
    width: 319px;
    margin-top: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.line{
    border: 1px solid #31394E;
    width: 135px;
    height: 1px;
}
.sing-in{
    margin-top: 14px;
    width: 319px;
    height: 40px;
    border: 1px solid #31394E;
    border-radius: 6px;
    background-color: #1F272F;
    font-weight: 500;
    font-size: 12px;
    color: #A6A6A8;
}
.text{
    margin-top: 15px;
    font-weight: 500;
    font-size: 12px;
    color: #A6A6A8;
    display: flex;
    align-items: center;
    justify-content:center;
}
.text p{
    font-weight: 600;
    font-size: 13px;
    margin-left: 5px;
}

</style>