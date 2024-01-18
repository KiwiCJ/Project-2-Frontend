<script setup>
import { decodeCredential, googleLogout } from 'vue3-google-login'
import { useCookies } from 'vue3-cookies'
import { onMounted, ref } from 'vue'

const { cookies } = useCookies()

let isLoggedIn = ref(false);
let userName = ''

const callback = (response) => {
  isLoggedIn.value = true
  const userData = decodeCredential(response.credential)
  console.log(userData)
  userName = userData.given_name
  cookies.set('user_session', response.credential)

  fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userEmail: userData.email,
    }),
  })
    .then(() => {
      console.log('session saved')
    })
    .catch((error) => {
      console.error(error)
    })
}

const checkSession = () => {
  if (cookies.get('user_session')) {
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

onMounted(checkSession)


</script>

<template>
  <div class="welcome">
    <h1 v-if="isLoggedIn">Three Putt Club <br> {{ userName }}</h1>
    <div v-else>
      <h1>Login</h1>
      <googleLogin :callback="callback" />
    </div>
    <button v-if="isLoggedIn" @click="handleLogout" class="btn btn-secondary">Log Out</button>
  </div>
</template>

<style scoped>

.welcome {
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: black;
    max-width: 400px;
    margin-top: 60px;
    width: 100%;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
} 


</style>