import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    component: () => import("@/views/LoginAdmin.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("@/views/DashboardView.vue"),
    children: [
      {
        path: "",
        name: "排程設定",
        component: () => import("@/views/ScheduleList.vue"),
      },
    ],
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

export default router;
