<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const course = ref({
  courseName: '',
  location: '',
  comment: ''
})

const errorMessage = ref('')
const router = useRouter()

function addCourse() {
    if (course.value.courseName === '' || course.value.location === '') {
        errorMessage.value = 'Course Name and Location are required';
    } else {
        fetch(`${import.meta.env.VITE_API_URL}/course/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                courseName: course.value.courseName,
                location: course.value.location,
                comment: course.value.comment
            })
        })
        .then(() => {
            course.value = {
                courseName: '',
                location: '',
                comment: ''
            };
            errorMessage.value = ''
            router.push({ name: 'course' });
        })
        .catch(error => {
            console.error(error);
        });
    }
}

</script>

<template>
  <main>
    <h1>Create new course</h1>
    <br>
    <div class="new-course">
        <label>
            <strong>Course Name:*</strong>
            <input v-model="course.courseName" />
        </label>
        <br>
        <label>
            <strong>Location:*</strong>
            <input v-model="course.location" />
        </label>
        <br>
        <label>
            <strong>Comments:</strong>
            <textarea v-model="course.comments"></textarea>
        </label>
        <p style="color: red;">{{ errorMessage }}</p>
        <br>
        <button @click="addCourse" class="btn btn-add">Add Course</button>
    </div>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    min-height: 100vh;
    text-align: center;
  }

  .new-course {
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

  input,
  textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
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

  p {
    color: red;
  }
</style>
