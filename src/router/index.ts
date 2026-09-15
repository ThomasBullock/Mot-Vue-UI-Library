import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Mot UI | Welcome' },
    },
    {
      path: '/library',
      name: 'Library',
      component: () => import('@/views/library/LibraryIndex.vue'),
      redirect: { name: 'ColourPallettes' },
      meta: { title: 'Mot UI: Component Library' },
      children: [
        {
          path: 'colours',
          name: 'ColourPallettes',
          component: () => import('@/views/library/ColourPallettes.vue'),
          meta: { title: 'Design: Colours | Mot UI' },
        },
        {
          path: 'button',
          name: 'Buttons',
          component: () => import('@/views/library/Buttons.vue'),
          meta: { title: 'Design: Buttons | Mot UI' },
        },
        {
          path: 'input',
          name: 'Inputs',
          component: () => import('@/views/library/Inputs.vue'),
          meta: { title: 'Design: Inputs | Mot UI' },
        },
        {
          path: 'slots',
          name: 'Slots',
          component: () => import('@/views/library/Slots.vue'),
          meta: { title: 'Design: Slots | Mot UI' },
        },
      ],
    },
  ],
});

export default router;
