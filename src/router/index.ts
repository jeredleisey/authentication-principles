import { createRouter, createWebHistory } from 'vue-router';

import { userSessionStore } from '@/stores/userSession';
import Home from '@/views/Home.vue';
import SignUp from '@/components/SignUp.vue';
import Protected from '@/views/Protected.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sign-up',
      name: 'sign up',
      component: SignUp,
    },
    {
      path: '/protected',
      name: 'protected',
      component: Protected,
      meta: {
        needsAuth: true,
      },
    },
  ],
});

router.beforeEach((to, _, next) => {
  const userSession = userSessionStore();

  if (to.meta.needsAuth) {
    if (userSession.session) {
      return next();
    } else {
      return next('/');
    }
  }

  return next();
});

export default router;
