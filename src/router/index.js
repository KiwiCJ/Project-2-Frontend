import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//? Courses
import CourseList from '@/views/CourseList.vue'
import SingleCourse from '@/views/SingleCourse.vue'
import CourseEdit from '@/views/CourseEdit.vue'
import NewCourse from '@/components/NewCourse.vue'
//? Scorecard
import ScorecardList from '@/views/ScorecardList.vue'
import SingleScorecard from '@/views/SingleScorecard.vue'
import ScorecardEdit from '@/views/ScorecardEdit.vue'
import NewScorecard from '@/components/NewScorecard.vue'
//? User
import UserLogin from '@/views/UserLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/course',
      name: 'course',
      component: CourseList
    },
    {
      path: '/course/new',
      name: 'newcourse',
      component: NewCourse
    },
    {
      path: '/course/:id',
      name: 'singlecourse',
      component: SingleCourse
    },
    {
      path: '/course/edit/:id',
      name: 'editcourse',
      component: CourseEdit
    },
    {
      path: '/scorecard',
      name: 'scorecard',
      component: ScorecardList
    },
    {
      path: '/scorecard/new',
      name: 'newscorecard',
      component: NewScorecard,
    },
    {
      path: '/scorecard/:id',
      name: 'singlescorecard',
      component: SingleScorecard
    },
    {
      path: '/scorecard/edit/:id',
      name: 'editscorecard',
      component: ScorecardEdit
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin
    },
  ]
})

export default router
