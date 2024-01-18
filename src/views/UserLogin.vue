<script setup>
import {decodeCredential, googleLogout} from 'vue3-google-login'
import {useCookies} from 'vue3-cookies'
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
    console.log('Component is mounted. Checking session...')
    checkSession()
})


</script>


<template>

<div class="welcome">
    <h1>Login</h1>
    <div v-if="isLoggedIn">
        <h2>Welcome {{ userName }}</h2>
        <button @click="handleLogout" class="btn btn-primary">Log Out</button>
    </div>
    <div v-else>
        <googleLogin :callback="callback" />
    </div>
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
    color: black;
    max-width: 400px;
    width: 100%;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: rgb(193, 225, 193);
} 


</style>