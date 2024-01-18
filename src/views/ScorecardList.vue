<script setup>
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'


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

onMounted(fetchData)


</script>

<template>

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
          <strong>Date:</strong> {{ scorecard.date }} 
          <strong>Weather:</strong> {{ scorecard.weather }}

        </router-link>
      </div>
    </div>
  </main>

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
  background-image: url('https://media.california.com/media/_versions/articles/scenic_golf_courses__4901x3089___v1222x580.jpg');
  text-decoration: none;
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