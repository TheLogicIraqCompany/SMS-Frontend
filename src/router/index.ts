import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const isLoggedIn = () => {
  const token = localStorage.getItem('accessToken')

  return !!(token)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    redirect: to => {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}')
      const userRole = (userData && userData?.role) ? userData?.role : null

      if (userRole === 'admin')
        return { path: '/home' }

      else return { path: '/login', query: to.query }
    },
  },
  ...setupLayouts(routes)],
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name != 'register') {
    if (isLoggedIn()) {
      const userData = JSON.parse(localStorage.getItem('userData') as string)

      if (userData.role == 'CallCenter' && (to.name != 'qr' && to.name != 'reservations'))
        next('/qr')

      next()
    }

    else { next({ name: 'login' }) }
  }
  else {
    next()
  }
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router
