<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const scorecardId = route.params.id
const API_URL = import.meta.env.VITE_API_URL

const scorecard = ref({
  playerName: '',
  date: '',
  weather: '',
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
  const scorecardId = route.params.id
  console.log("Scorecard ID:", scorecardId)
  
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



const handleSubmit = async () => {
  try {
    const requestBody = {
      playerName: scorecard.value.playerName,
      date: scorecard.value.date,
      weather: scorecard.value.weather,
      courseName: scorecard.value.courseName,
    }

    for (let holeNumber = 1; holeNumber <= 18; holeNumber++) {
      const holeKey = `Hole${holeNumber}`
      const courseHoleKey = `courseHole${holeNumber}`

      requestBody[holeKey] = scorecard.value[holeKey]
      requestBody[courseHoleKey] = scorecard.value[courseHoleKey]
    }

    const res = await fetch(`${API_URL}/scorecard/edit/${scorecardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })

    if(res.ok) {
      console.log('Scorecard updated:', scorecard.value)
      router.replace({ name: 'singlescorecard', params: {id: scorecardId}})

    } else {
      console.error('Update failed')
    }
  } catch (error) {
    console.error(error.message)
  }
}


onMounted(loadScorecardData)

</script>

<template>
  <section>
    <h1>Edit Scorecard</h1>
    <div class="scorecard-info">
      <strong>Player Name:</strong>
      <input type="text" v-model="scorecard.playerName" />
      <br>
      <strong>Date:</strong>
      <input type="date" v-model="scorecard.date" />
      <br>
      <strong>Weather:</strong>
      <input type="text" v-model="scorecard.weather" />
    </div> 
    <br>
    <div class="course-info">
      <strong>{{ scorecard.courseName }}</strong>

      <div v-for="holeNumber in 18" :key="holeNumber" class="hole-info"> <hr>
        <h5>Hole {{ holeNumber }}</h5>
        <label for="playerScore">Player score:</label>
        <input type="number" :id="'playerScore' + holeNumber" v-model="scorecard['Hole' + holeNumber]" />
        <br>
        <label for="par">Par:</label>
        <input type="number" :id="'par' + holeNumber" v-model="scorecard['courseHole' + holeNumber]" />
        <br><br>
      </div>
    </div>
    <br>
    <div class="buttons">
      <button @click="handleSubmit" class="btn btn-update">Update Scorecard</button>
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
    margin-bottom: 20px;
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
    text-decoration: none;
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
</style>