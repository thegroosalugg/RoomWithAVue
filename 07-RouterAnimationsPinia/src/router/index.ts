import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuard } from 'vue-router'
import RouterPage from '@/pages/RouterPage.vue'
import RouterChildPage from '@/pages/RouterChildPage.vue';
import RouterChildSiblingPage from '@/pages/RouterChildSiblingPage.vue';
import AnimationsPage from '@/pages/AnimationsPage.vue';
import NotFound from '@/pages/NotFound.vue';
import logger from '@/lib/utils/logger';

// beforeEnter, route specific navGuard must be defined in routes, not as lifecycle, due to composition <script setup>
const beforeEnter: NavigationGuard = (to, from, next) => {
  logger(200, { beforeEnter_to: to, from })
  next()
}

const routes = [
  // redirect transforms the the URL to navigated route
  { path: '/', redirect: '/router' },
  {
         path: '/router',
    component: RouterPage,
        alias: '/example', // alias: loads current route when alias is navigated to, but preserves alias URL
         meta: { customValue: 'your value' }, // meta: add any custom value to read in your nav guards
     children: [
      {
              path: 'child',
              name: 'router-child', // name: allows navigation directly to route without full path
        // like slots, a route can have multiple children. default: reserved, [second]: name as you like
        components: { default: RouterChildPage, second: RouterChildSiblingPage },
        beforeEnter,
      },
    ],
  },
  // dynamic routes: should load last in group or they overwrite siblings; props: true - sets :id as a prop, not tied to router
  // without props - component is route specific; with props - component is pure and reusable on any route
  { path: '/router/:testId', component: RouterPage, name: 'dynamic-route', props: true },
  { path: '/animations',     component: AnimationsPage },
  { path: '/pinia',          component: NotFound },
  // catch-all route: load last in group; :key(.*) can be any text, it is used internally for indexing
  { path: '/:catchall(.*)',  component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'underline', // apply global CSS class when .router-link-active | .router-link-exact-active
  // manage scroll behaviour; _unusued_parameters
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition // ensures back button returns to last scroll
    return { top: 0, left: 0 } // new navigation scrolls to top
  }
})

// ** Navigation guards
router.beforeEach((to, from, next) => {
  // used for authentication/confirmation dialogs etc. redirect user, block navigation etc.
  logger(40, { beforeEach_to: to, from })
  next() // accepts boolean, navigation strings | objects
})

router.afterEach((to, from) => { // no next() on afterEach
  logger(50, { afterEach_to: to, from })
})

export default router
