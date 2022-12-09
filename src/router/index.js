import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../views/HomeView.vue'

import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: () => import(/* webpackChunkName: "about" */ '../views/Categorias.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/cursos',
      name: 'cursos',
      component: () => import(/* webpackChunkName: "about" */ '../views/Cursos.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => import(/* webpackChunkName: "about" */ '../views/Roles.vue')
    },
  ]
})

// const router = new VueRouter({

//   routes
// })


router.beforeEach( (to, from, next ) => {

  const rutaProtegida = to.matched.some( record => record.meta.requireAuth );
  if ( rutaProtegida && store.state.token === '' ) {
    next({name: 'login'});
  } else {
    next();
  }

})

export default router
