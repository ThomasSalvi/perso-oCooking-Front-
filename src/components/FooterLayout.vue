<template>
  <footer class="footer">
    <nav class="nav">
      <!--<a href="javascript:void(0)">Liste des recettes</a>-->
      <RouterLink v-bind:to="{name: 'Home'}">Liste des recettes</RouterLink>
      <!--<a href="javascript:void(0)">Inscription</a>-->
      <RouterLink v-bind:to="{name: 'Register'}" v-if="!isConnected">Inscription</RouterLink>
      <!--<a href="javascript:void(0)">Connexion</a>-->
      <RouterLink v-bind:to="{name: 'Login'}" v-if="!isConnected">Connexion</RouterLink>
      <RouterLink v-bind:to="{name: 'CreateRecipe'}" v-if="isConnected">Créer une recette</RouterLink>
    </nav>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FooterLayout",
  computed: {
    /**
     * J'injecte dans les computed de mon composant la valeur associée au getter isConnected via l'opérateur de décomposition
     *
     * @link https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_and_Operators#op%C3%A9rateur_de_d%C3%A9composition
     */
    ...mapGetters([
      "isConnected"
    ])
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/colors';

/* COMPOSANT Footer */

.footer {
  position: fixed;
  width: 100%;
  background-color: $mainBackgroundColor;
  box-shadow: 0px 0px 10px rgba(20, 20, 20, 0.2);
  bottom: 0;

  .nav {
    align-items: center;
    display: flex;
    justify-content: space-around;
    padding: 1rem;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
