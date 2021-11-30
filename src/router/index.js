import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "@/views/Register.vue";
import Error404 from "@/views/Error404.vue";
import Recipe from "@/views/Recipe.vue";
import Login from "@/views/Login.vue";
import CreateRecipe from "@/views/CreateRecipe.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/page/:page(\\d+)",
    name: "PaginatedHome",
    component: Home,
    props: (route) => ({
      page: parseInt(route.params.page, 10)
    })
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/recipe/create",
    name: "CreateRecipe",
    component: CreateRecipe
  },
  /**
   * Je crée une route avec des paramètres dynamiques
   *
   * @link https://router.vuejs.org/guide/essentials/dynamic-matching.html#dynamic-route-matching
   */
  {
    path: "/recipe/:id(\\d+)",
    name: "Recipe",
    component: Recipe,
    /**
     * J'envoie une prop automatique au composant associé à la route
     *
     * @link https://router.vuejs.org/guide/essentials/passing-props.html
     *
     * @param {Object} route Router data
     *
     * @return {Object} Props to send to the component
     */
    props: (route) => ({
      id: parseInt(route.params.id, 10)
    })
  },
  // La route équivalente à la page 404 doit toujours être en dernière position
  {
    path: "*",
    name: "Error404",
    component: Error404
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
