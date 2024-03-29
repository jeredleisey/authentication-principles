import { createRouter, createWebHistory } from 'vue-router';

import { userSessionStore } from '@/stores/userSession';
import Home from '@/views/Home.vue';
import Admin from '@/views/Admin.vue';
import SignUp from '@/components/SignUp.vue';
import ForgotPasswordForm from '@/components/ForgotPasswordForm.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import NotFound from '@/components/NotFound.vue';

const router = createRouter({
  history: createWebHistory('/'),
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
      path: '/forgot-password',
      name: 'forgot',
      component: ForgotPasswordForm,
    },
    {
      path: '/reset-password',
      name: 'reset',
      component: ResetPassword,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        needsAuth: true,
      },
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: NotFound,
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
