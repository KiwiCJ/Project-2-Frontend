<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scorecard = ref({
  playerName: '',
  date: '',
  location: '',
  weather: '',
  courseName: '',
});

const handleSubmit = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/scorecard/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerName: scorecard.value.playerName,
        date: scorecard.value.date,
        location: scorecard.value.location,
        weather: scorecard.value.weather,
        courseName: scorecard.value.courseName
      }),
    });

    if (response.ok) {
      const newScorecard = await response.json();
      router.push({ name: 'singlescorecard', params: { id: newScorecard._id } })
    } else {
      console.error('Failed to create scorecard')
    }
  } catch (error) {
    console.error(error.message)
  }
};
</script>

<template>
  <section>
    <h1>Create New Scorecard</h1> <br>
    <form @submit.prevent="handleSubmit" class="new-scorecard">
      <label>
        <strong>Player Name:*</strong>
        <input v-model="scorecard.playerName" type="text" id="playerName" required />
      </label>
      <br>
      <label>
        <strong>Course Name:*</strong>
        <input v-model="scorecard.courseName" type="text" id="courseName" required />
      </label>
      <br>
      <label>
        <strong>Location:*</strong>
        <input v-model="scorecard.location" type="text" id="location" required />
      </label>
      <br>
      <label>
        <strong>Date:*</strong>
        <input v-model="scorecard.date" type="text" id="date" required />
      </label>
      <br>
      <label>
        <strong>Weather:*</strong>
        <input v-model="scorecard.weather" type="text" id="weather" required />
      </label>
      <hr>
      <button class="btn btn-add" type="submit">Create Scorecard</button>
    </form> 
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

.new-scorecard {
  color: black;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgb(193, 225, 193);
}

label {
  display: block;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

button {
  background-color: #4caf50;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

hr {
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 20px 0;
}

p {
  color: red;
}

.btn-add {
    background-color: #4caf50;
    color: black;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }

</style>
  