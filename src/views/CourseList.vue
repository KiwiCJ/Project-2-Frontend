<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

//Logged in details 
import { decodeCredential } from 'vue3-google-login'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

let isLoggedIn = ref(false)
let userName = ''
// ---------

const router = useRouter()
const courses = ref([])

const goToCourse = (courseId => {
  router.push(`/course/${courseId}`)
})

const fetchData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/course`)
    const result = await response.json()
    courses.value = result
  } catch (error) {
    console.error(error)
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
    <div class="heading">
      <h1>Course List</h1>
      <br>
      <RouterLink :to="'/course/new'">
        <button class="btn btn-new">New Course</button>
      </RouterLink>
    </div>
    <hr>
    <br>

    <div class="row">
      <div
        v-for="course in courses"
        :key="course._id"
        class="col-md-4 mb-4"
        @click="goToCourse(course._id)"
      >
        <div class="card">
          <div class="card-body">
            <RouterLink :to="'/course/' + course._id" class="course-link">
              <h5 class="card-title">{{ course.courseName }}</h5>
            </RouterLink>
            <p class="card-text">{{ course.location }}</p>
          </div>
        </div>
      </div>
    </div>


    <hr>
  </main>
</div>
</template>

<style scoped>

main {
  margin-top: 60px;
}



.heading {
  text-align: center;
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

.course-link {
  color: white;
  text-decoration: none;
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
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
}

.card:hover {
  transform: scale(1.05);
}
</style>
