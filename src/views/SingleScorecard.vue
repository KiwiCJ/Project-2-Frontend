<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const scorecardId = route.params.id
const API_URL = import.meta.env.VITE_API_URL

const scorecard = ref({
  playerName: '',
  date: '',
  weather: '',
  courseName: '',
  Hole1: 0,
  courseHole1: 0,
  Hole2: 0,
  courseHole2: 0,
  Hole3: 0,
  courseHole3: 0,
  Hole4: 0,
  courseHole4: 0,
  Hole5: 0,
  courseHole5: 0,
  Hole6: 0,
  courseHole6: 0,
  Hole7: 0,
  courseHole7: 0,
  Hole8: 0,
  courseHole8: 0,
  Hole9: 0,
  courseHole9: 0,
  Hole10: 0,
  courseHole10: 0,
  Hole11: 0,
  courseHole11: 0,
  Hole12: 0,
  courseHole12: 0,
  Hole13: 0,
  courseHole13: 0,
  Hole14: 0,
  courseHole14: 0,
  Hole15: 0,
  courseHole15: 0,
  Hole16: 0,
  courseHole16: 0,
  Hole17: 0,
  courseHole17: 0,
  Hole18: 0,
  courseHole18: 0
})

const loadScorecardData = async () => {
  try {
    const response = await fetch(`${API_URL}/scorecard/${scorecardId}`)
    const data = await response.json()
    scorecard.value = {
      playerName: data.playerName,
      date: data.date,
      weather: data.weather,
      courseName: data.courseName,
      Hole1: data.Hole1,
      courseHole1: data.courseHole1,
      Hole2: data.Hole2,
      courseHole2: data.courseHole2,
      Hole3: data.Hole3,
      courseHole3: data.courseHole3,
      Hole4: data.Hole4,
      courseHole4: data.courseHole4,
      Hole5: data.Hole5,
      courseHole5: data.courseHole5,
      Hole6: data.Hole6,
      courseHole6: data.courseHole6,
      Hole7: data.Hole7,
      courseHole7: data.courseHole7,
      Hole8: data.Hole8,
      courseHole8: data.courseHole8,
      Hole9: data.Hole9,
      courseHole9: data.courseHole9,
      Hole10: data.Hole10,
      courseHole10: data.courseHole10,
      Hole11: data.Hole11,
      courseHole11: data.courseHole11,
      Hole12: data.Hole12,
      courseHole12: data.courseHole12,
      Hole13: data.Hole13,
      courseHole13: data.courseHole13,
      Hole14: data.Hole14,
      courseHole14: data.courseHole14,
      Hole15: data.Hole15,
      courseHole15: data.courseHole15,
      Hole16: data.Hole16,
      courseHole16: data.courseHole16,
      Hole17: data.Hole17,
      courseHole17: data.courseHole17,
      Hole18: data.Hole18,
      courseHole18: data.courseHole18
    }
    console.log(scorecard.value)
  } catch (err) {
    console.error('Error fetching scorecard', err.message)
  }
}

onMounted(loadScorecardData)

const handleDelete = async () => {
  try {
    const res = await fetch(`${API_URL}/scorecard/${scorecardId}`, {
      method: "DELETE"
    })
    if (res.ok) {
      console.log('Scorecard deleted')
      router.replace({ name: 'scorecard' })
    }
  } catch (err) {
    console.log(err.message)
  }
}

// const totalPlayerScore = computed(() => {
//   return Object.keys(scorecard.value)
//   .filter(key => key.startsWith('Hole'))
//   .reduce((total, key) => total + scorecard.value[key])
// })

</script>

<template>
  <section>
    <h1>Scorecard Details</h1>
    <div class="scorecard-info">
      <strong>{{ scorecard.playerName }} </strong><br>
      Date:  <strong>{{ scorecard.date }} </strong><br>
      Weather:<strong>{{ scorecard.weather }} </strong><br>
      <!-- Score: <strong>{{ totalPlayerScore }}</strong> -->
    </div> <br>
    <div class="course-info">
      <strong>{{ scorecard.courseName }}</strong>

      <div v-for="holeNumber in 18" :key="holeNumber" class="hole-info"> <hr>
        <strong>Hole {{ holeNumber }} </strong> <br> 
        Score: <strong>{{ scorecard['Hole' + holeNumber] }} </strong><br> 
        Par: <strong>{{ scorecard['courseHole' + holeNumber] }} </strong><br>
      </div>
    </div>
    <br>
    <div class="buttons">
      <router-link :to="{ name: 'editscorecard', params: { id: scorecardId }}" class="btn btn-update">Edit Scorecard</router-link>
      <button @click="handleDelete" class="btn btn-danger">Delete Scorecard</button>
    </div>
    <br>
    <router-link to="/scorecard" class="btn btn-secondary">Back to Scorecard List</router-link> 
  </section>
</template>

<style scoped>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    min-height: 100vh;
    text-align: center;
  }

  .scorecard-info,
  .course-info {
    color: black;
    max-width: 400px;
    width: 100%;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: rgb(193, 225, 193);
  }

  .hole-info {
    margin-bottom: 10px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    border: 1 solid #343a40;
  }

  .btn-update,
  .btn-danger,
  .btn-secondary {
    background-color: white;
    color: black;
    transition: background-color 0.3s;
    flex: 1;
    margin: 0 5px;
    text-decoration: none; /* Add this line for router-link */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid #343a40;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .btn-update:hover {
    background-color: #4caf50;
    color: black;
  }

  .btn-danger:hover {
    background-color: red;
    color: white;
  }

  .btn-secondary:hover {
    background-color: #ccc;
    color: white;
  }

  hr {
    border: 1px solid #4caf50;
    margin: 20px 0;
  }
</style>