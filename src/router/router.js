import { createRouter, createWebHistory } from 'vue-router';
import TodoApp from '@/components/TodoApp';
import LoginPage from '@/views/LoginPage';
import RegisterPage from '@/views/RegisterPage';
import HomePage from '@/views/HomePage';

const routes = [
  {
    path: '/',
    name: 'todos',
    component: TodoApp,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/Home',
    name: 'home',
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
