<script setup>
import { decodeCredential, googleLogout } from 'vue3-google-login'
import { useCookies } from 'vue3-cookies'
import { onMounted, ref } from 'vue';

const { cookies } = useCookies()

let isLoggedIn = ref(false)
let userName = ''

const callback = (response => { 
    isLoggedIn.value = true
    const userData = decodeCredential(response.credential)
    console.log(userData);
    userName = userData.given_name
    console.log('Setting cookie:', response.credential)
    cookies.set('user_session', response.credential)

    fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userEmail: userData.email,
            
        })
    })
    .then(() => {
        console.log('session saved');
    })
    .catch(error => {
        console.error(error);
    })
})

const checkSession = () => {
    if(cookies.isKey('user_session')) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName = userData.given_name
    } 
}

const handleLogout = () => {
    googleLogout()
    cookies.remove('user_session')
    isLoggedIn.value = false
}

onMounted(() => {
  
    checkSession()
})


</script>


<template>

<div class="welcome">
    <h1 v-if="isLoggedIn">Welcome to the Three Putt Club <br>  {{ userName }}</h1> 
    
    <div v-else>
      <h1> Welcome to the Three Putt Club <br> Login </h1>
      <googleLogin :callback="callback" /> 
    </div> <br>
    <br>
    <RouterLink  :to="'/scorecard/new'">
      <button v-if="isLoggedIn" class="btn btn-new">New Scorecard</button> <br>
    </RouterLink>
    <br>
    <br>
    <button v-if="isLoggedIn" @click="handleLogout" class="btn btn-secondary">Log Out</button>
</div>

</template>

<style scoped>

.welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    color: white;
    width: 100%;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-image: url('https://photo-assets.masters.com/images/pics/large/h_amencormer_easter_12ANGC09RBa1984Hc.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
}


.btn-new {
  background-color: rgb(193, 225, 193);
  color: black;
  transition: background-color 0.3s;
}

.btn-new:hover {
  background-color: black;
  color: white;
}


</style>