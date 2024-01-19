<script setup>
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import { decodeCredential } from 'vue3-google-login'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

let isLoggedIn = ref(false)
let userName = ''


const API_URL = import.meta.env.VITE_API_URL
const scorecards = ref([])

const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/scorecard`)
    const data = await response.json()
    scorecards.value = data
  } catch (error) {
    console.error('Error fetching scorecards', error.message)
  }
}

onMounted(() => {
  fetchData()
  checkSession()
})

const checkSession = () => {
    if(cookies.isKey('user_session')) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName = userData.given_name
    } 
}


</script>

<template>
<div v-if="isLoggedIn">
  <main class="container">
    <h1>All Scorecards</h1>
    <br>
    <RouterLink  :to="'/scorecard/new'">
      <button class="btn btn-new">New Scorecard</button> <br>
    </RouterLink>

    <hr>

    <div class="grid">
      <div v-for="scorecard in scorecards" :key="scorecard._id">
        <router-link :to="'/scorecard/' + scorecard._id" class="card">

          <h2><strong>{{ scorecard.playerName }}</strong></h2>
          <h4><strong>{{ scorecard.courseName }}</strong></h4>
          Date: <strong>{{ scorecard.date }} </strong>
          Weather: <strong>{{ scorecard.weather }} </strong>

        </router-link>
      </div>
    </div>
  </main>
</div>
</template>

<style scoped>
main {
  margin-top: 60px;
}

.container {
  text-align: center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  text-align: center;
}

.card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s;
  color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('https://photo-assets.masters.com/images/pics/large/h_amencormer_easter_12ANGC09RBa1984Hc.jpg');
  text-decoration: none;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
}

.card:hover {
  transform: scale(1.05);
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