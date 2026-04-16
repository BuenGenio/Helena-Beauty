import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ServicesIndexView from "../views/ServicesIndexView.vue";
import ServiceDetailView from "../views/ServiceDetailView.vue";
import ContactView from "../views/ContactView.vue";
import { VALID_SERVICE_SLUGS } from "../data/serviceMeta";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/services", name: "services", component: ServicesIndexView },
    {
      path: "/services/:slug",
      name: "service",
      component: ServiceDetailView,
      props: true,
      beforeEnter: (to, _from, next) => {
        const slug = to.params.slug as string;
        if (VALID_SERVICE_SLUGS.has(slug)) next();
        else next({ name: "services", replace: true });
      },
    },
    { path: "/contact", name: "contact", component: ContactView },
  ],
  scrollBehavior(_to, _from, saved) {
    if (saved) return saved;
    return { top: 0, behavior: "smooth" };
  },
});
