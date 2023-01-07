import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "./pages/Home.vue";
import Create from "./pages/Create.vue";

// export type AppRouteNames = 'home'

const routes: RouteRecordRaw[] = [
  {
    name: "home",
    path: "/:customhuxle?",
    component: Home,
  },
  {
    name: "create",
    path: "/create",
    component: Create,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import("../pages/AboutView.vue")
  // }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
