<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = route.params.id
const API_URL = import.meta.env.VITE_API_URL

const course = ref({
  courseName: '',
  location: '',
  comment: '',
})

const loadCourseData = async () => {
  try {
    const response = await fetch(`${API_URL}/course/${courseId}`)
    const data = await response.json()
    console.log('course data:' , data);
    course.value = {
      courseName: data.courseName,
      location: data.location,
      comment: data.comment,
    }
  } catch (err) {
    console.error('Error fetching course details', err.message)
  }
}

onMounted(loadCourseData)

</script>





<template>

  <section class="container">
    <div class="card p-4">
      <h1 class="title"><strong>{{ course.courseName }}</strong></h1> <br>
      <p>Location: <br> <strong>{{ course.location }} </strong></p>
      <p>Comment:  <br> <strong>{{ course.comment }} </strong></p>
      <br>
      <router-link :to="{ name: 'editcourse', params: { id: course._id }}" class="btn btn-primary">Edit Course</router-link>
      <br>
      <router-link to="/course" class="btn btn-secondary back-button">Back to Course List</router-link>
      <br>
    </div>
  </section>

</template>





<style scoped>

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  min-height: 100vh;
  text-align: center;
}

.card {
  color: black;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgb(193, 225, 193);
}


.btn-primary {
  background-color: white;
  color: black;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: black;
  color: white;
}

.back-button {
  background-color: white;
  color: black;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #ccc;
  color: white;
}

</style>