import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import { RouteNames } from './route-names'
import type MetaData from '@/types/meta-data'

const viewsMeta = import.meta.glob('../views/*.json')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.Home,
      component: HomeView,
      meta: viewsMeta[`../views/Home.json`] ? (await viewsMeta[`../views/Home.json`]() as any).default : { allowAnonymous: true }
    },
    {
      path: '/about',
      name: RouteNames.About,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue'),
      meta: viewsMeta[`../views/About.json`] ? (await viewsMeta[`../views/About.json`]() as any).default : { allowAnonymous: true }
    },
    {
      path: '/calendar',
      name: RouteNames.Calendar,
      component: () => import('../views/Calendar.vue'),
      meta: viewsMeta[`../views/Calendar.json`] ? (await viewsMeta[`../views/Calendar.json`]() as any).default : { allowAnonymous: true }
      
    }
  ],
})

const getMetaData = async (route: string): Promise<MetaData> => {

  // https://github.com/vitejs/vite/issues/4945 - if needed... dealing w/ nested paths
  const pathParts = route.split('/')
  try {
    return (await import(`../views/${pathParts[0]}.json`)).default
  } catch {
    // Default to Home.json so there are meta tags
    // yes this creates duplicate tags for pages but that's better than no tag at all.
    return (await import(`../views/Home.json`)).default as MetaData
  }

}

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  try {

    // Get meta info for the route
    getMetaData(to.name as string).then((meta) => {
      document.title = meta.title

      meta.metaTags.map((tagDef: any) => {
        try {

          // cast as string to avoid error: Type 'undefined' cannot be used as an index type.
          let tag = document.querySelector((`meta[${Object.keys(tagDef)[0]}='${tagDef[Object.keys(tagDef)[0] as string]}']`))

          if (!tag) {
            tag = document.createElement('meta');
            document.head.appendChild(tag)
          }

          Object.keys(tagDef).forEach(key => {
            tag!.setAttribute(key, tagDef[key]);
          });
        } catch (e) {
          console.log(e);
        }

      });
      next();
    });
  } catch (e) {
    console.log(e);
    next();
  }
});

export default router
