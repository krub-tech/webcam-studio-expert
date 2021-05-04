import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Studios',
    component: () => import('../views/Studios.vue'),
  },
  {
    path: '/studio/:id',
    name: 'Studio',
    component: () => import('../views/Studio.vue'),
  },
  {
    path: '/links',
    name: 'LinksHome',
    component: () => import('../views/LinksHome.vue'),
  },
  {
    path: '/links/:category',
    name: 'Links',
    component: () => import('../views/Links.vue'),
  },
  {
    path: '/certificate',
    name: 'Certificate',
    component: () => import('../views/Certificate.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (document.querySelector('.window-top')) {
    document.querySelector('.window-top').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  next();
});

export default router;
