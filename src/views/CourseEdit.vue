<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const courseId = route.params.id
const API_URL = import.meta.env.VITE_API_URL

const course = ref({
  courseName: '',
  location: '',
  comment: ''
})

const LoadCourseData = async () => {
  try {
    const response = await fetch(`${API_URL}/course/${courseId}`)
    const data = await response.json()
    console.log("Course ID:", courseId);
    course.value = {
      courseName: data.courseName,
      location: data.location,
      comment: data.comment
    }
    console.log(course.value)
  } catch (err) {
    console.error('Error fetching courses', err.message)
  }
}

onMounted(LoadCourseData)

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const res = await fetch(`${API_URL}/course/edit/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        courseName: course.value.courseName,
        location: course.value.location,
        comment: course.value.comment,
      })
    })

    if (res.ok) {
      console.log('Course updated:', course.value)
      router.push({ name: 'singlecourse', params: { id: courseId } })
    }
  } catch (err) {
    console.error(err.message)
  }
}

const handleDelete = async () => {
  try {
    const res = await fetch(`${API_URL}/course/${courseId}`, {
      method: "DELETE"
    })
    if (res.ok) {
      console.log('Course deleted')
      router.replace({ name: 'course' })
    }
  } catch (err) {
    console.log(err.message)
  }
}
</script>

<template>
  <section class="container">
    <div class="card p-4">
      <h1>Edit Course</h1>
      <hr>
      <form class="update-course">
        <label for="courseName">Course Name: </label> <br>
        <input 
          type="text"
          id="courseName" 
          name="courseName" 
          placeholder="Course Name"
          v-model="course.courseName"
          required
          class="form-control"
        />
        <br>

        <label for="location">Location: </label> <br>
        <input 
          type="text" 
          id="location"
          name="location" 
          placeholder="Location" 
          v-model="course.location"
          required
          class="form-control"
        />
        <br>

        <label for="comment">Comment: </label> <br>
        <textarea 
          id="comment"
          name="comment"
          placeholder="Comment"
          v-model="course.comment"
          class="form-control"
        ></textarea>
        <br>

        <div class="buttons">
          <button @click="handleSubmit" class="btn btn-update">Update Course</button>
          <button @click="handleDelete" class="btn btn-danger">Delete Course</button> 
        </div>
      </form>
      <hr>
      <RouterLink :to="{ name: 'singlecourse', params: { id: course._id }}" class="btn btn-secondary">
        Back to Course
      </RouterLink>
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
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.buttons {
  display: flex;
  justify-content: center;
  border: 1 solid #343a40;
}

.btn-update {
  background-color: #4caf50;
  color: black;
  transition: background-color 0.3s;
  flex: 1;
  margin: 0 5px;
}

.btn-update:hover {
  background-color: black;
  color: white;
}

.btn-danger {
  background-color: white;
  color: red;
  transition: background-color 0.3s;
  flex: 1;
  margin: 0 5px;
}

.btn-danger:hover {
  background-color: red;
  color: white;
}

.btn-secondary {
  background-color: white;
  color: black;
  transition: background-color 0.3s;
}

.btn-secondary:hover {
  background-color: #ccc;
  color: white;
}

 textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
 }

</style>