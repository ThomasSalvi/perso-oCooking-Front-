import Vue from "vue";
import Vuex from "vuex";
import ApiClient from "@/services/ApiClient.js";
import UserModel from "@/services/UserModel.js";

Vue.use(Vuex);

export default new Vuex.Store({
  /**
   * Data
   */
  state: {
    user: null,
  },
  /**
   * State settpers
   */
  mutations: {
    /**
     * Set state user
     *
     * @param {Object} state Store data
     * @param {Object} user User data
     */
    SET_USER(state, user) {
      // Je modifie la valeur user du state par la valeur reçue par l'appel à la méthode commit (voir l'action connect)
      state.user = user;
    },
  },
  /**
   * Async indirect setters
   */
  actions: {
    /**
     * Connect user
     *
     * @param {Object} context Context
     * @param {Object} userCredentials User credentials
     *
     * @return {Promise} Connect request
     */
    connect(context, userCredentials) {
      // J'exécute la requête HTTP de type POST d'authentification auprès de l'API de WordPress
      let connectRequest = ApiClient.post("/jwt-auth/v1/token", userCredentials)
        // Si je reçois une réponse à ma requête, la fonction associée en then sera exécutée
        .then((response) => {
          console.log(response.data);

          let user = response.data;
          let token = user.token;

          // Je stocke le token reçu dans le sessionStorage
          window.sessionStorage.setItem("token", token);

          console.log(window.sessionStorage.getItem("token"));

          // Je modifie l'ApiClient afin de lui ajouter automatiquement l'en-tête d'Authorization qui permet d'authentifier mes requêtes HTTP auprès de l'API
          ApiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;

          /**
           * J'exécute une mutation (setter) afin de modifier mon state
           */
          context.commit("SET_USER", user);
        });

      return connectRequest;
    },
    /**
     * Disconnect user
     *
     * @param {Object} context
     */
    disconnect(context) {
      // Je supprime le token du sessionStorage
      window.sessionStorage.removeItem("token");

      // Je supprime l'en-tête Authorization de mon instance générale d'Axios afin de ne plus envoyer le token dans mes futures requêtes HTTP à l'API
      delete ApiClient.defaults.headers.common["Authorization"];

      // Je repasse mon utilisateur à null
      context.commit("SET_USER", null);
    },

    /**
     * Validate token
     */
    validate(context) {
      // Au moment de la création du composant de base de l'application, je récupère le token stocké dans la sessionStorage
      let token = window.sessionStorage.getItem("token");

      // Si le token n'est pas vide...
      if (token) {
        // ... je le valide
        UserModel.validate(token)
          // S'il est valide
          .then(() => {
            // Je modifie le header Authorization de l'instance d'Axios pour toutes les prochaines requêtes
            ApiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;

            // Je récupère les informations de l'utilisateur lié au token
            UserModel.me().then((response) => {
              let user = {
                token: token,
                user_display_name: response.data.name,
              };

              // Je modifie le user du store avec les données reçues de l'API ce qui passera mon application en état connecté
              context.commit("SET_USER", user);
            });
          })
          // Si le token n'est pas valide...
          .catch(() => {
            // ... je le supprime du sessionStorage
            window.sessionStorage.removeItem("token");
          });
      }
    },
  },
  /**
   * Getters
   */
  getters: {
    /**
     * Get state user
     *
     * @param {Object} state State
     *
     * @return {Object} User
     */
    user(state) {
      return state.user;
    },
    /**
     * Is connected
     *
     * @param {Object} State state
     *
     * @return {boolean}
     */
    isConnected(state) {
      return state.user !== null;
    },
  },
});
