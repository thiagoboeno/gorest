import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import Error from '@/views/Error.vue'
import PostView from '@/views/post/View.vue'
import PostCreate from '@/views/post/Create.vue'
import PostEdit from '@/views/post/Edit.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  },
  {
    path: '/posts/:id',
    name: 'PostView',
    component: PostView
  },
  {
    path: '/posts/create',
    name: 'PostCreate',
    component: PostCreate
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEdit',
    component: PostEdit
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
