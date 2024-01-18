<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>

  <div>
    <nav class="navbar">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      |
      <RouterLink to="/scorecard" class="nav-link">Scorecards</RouterLink>
      |
      <RouterLink to="/course" class="nav-link">Courses</RouterLink>
    </nav>
  </div>
  <RouterView />
  
</template>


<style scoped>

body {
  margin: 0;
  padding: 0;
}

.navbar {
  background-color: rgb(193, 225, 193);
  color: white;
  padding: 10px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.nav-link {
  color: black;
  text-decoration: none;
}

</style>