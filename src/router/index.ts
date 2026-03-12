import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import { supabase } from "@/utils/supabase";

const routes = [
  {
    path: "/",
    component: () => import("@/views/LoginAdmin.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("@/views/DashboardView.vue"),
    meta: { requiresAuth: true },
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

router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (to.meta.requiresAuth && !session) {
    next("/");
  } else {
    next();
  }
});

export default router;
