<template>
  <!-- https://fr.vuejs.org/v2/guide/class-and-style.html -->
  <header class="header" v-bind:class="{'logo-only': !isConnected}">
    <div class="logo-container">
      <!-- Je charge un asset depuis src avec le raccourci @ -->
      <img class="logo" src="@/assets/oven.svg">
      <div class="text-container">
        <span class="first-part">{{ title }}</span>
        <span class="second-part">O'Four</span>
      </div>
    </div>
    <!-- https://fr.vuejs.org/v2/guide/conditional.html -->
    <div class="user" v-if="isConnected">
      <span class="username">{{ user.user_display_name }}</span>
      <img class="avatar" src="@/assets/avatar.png" v-on:click="toggleActions()" />
      <div class="user-actions" v-show="isActionsVisible">
        <a href="javascript:void(0)">Inviter un ami</a>
        <a href="javascript:void(0)" v-on:click="disconnect()">Déconnexion</a>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HeaderLayout",
  // data: function() {
  data() {
    // La méthode data() doit retourner un objet
    return {
      title: "10 minutes",
      isActionsVisible: false
    };
  },
  computed: {
    ...mapGetters([
      "user",
      "isConnected"
    ])
  },
  methods: {
    // J'importe l'action disconnect du store dans mon composant
    ...mapActions([
      "disconnect"
    ]),
    // toggleActions: function() {
    toggleActions() {
      // Je modifie la valeur d'une data de mon component avec this (contexte objet)
      this.isActionsVisible = !this.isActionsVisible;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/colors';

/* COMPOSANT Header */

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  background-color: $primaryBackgroundColor;
  box-shadow: 0px 0px 10px rgba(20, 20, 20, 0.2);
  top: 0;
  padding-bottom: 1rem;
  line-height: 1;

  &.logo-only {
    justify-content: center;
  }

  .logo-container {
    display: flex;
    padding: 1rem;
    padding-bottom: 0;

    .logo {
      height: 2.4rem;
      vertical-align: middle;
    }

    .text-container {
      display: flex;
      flex-direction: column;

      .first-part {
        font-family: "Montserrat Bold", Arial;
      }

      .second-part {
        font-family: "Montserrat", Arial;
        font-size: 1.7rem;
      }
    }
  }

  .user {
    padding: 1rem;
    padding-bottom: 0;
    font-family: "Montserrat Bold", Arial;

    .user-badge {
      position: absolute;
      top: 1rem;
      right: 0.8rem;
    }

    .user-badge svg {
      fill: #306715;
    }

    .user-actions {
      position: fixed;
      right: 0rem;
      top: 3.5rem;
      background-color: $primaryStrongColor;
      padding: 1rem;
      box-shadow: 0px 0px 10px rgba(20, 20, 20, 0.2);

      a {
        display: block;
        line-height: 2;
        margin-bottom: 1rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

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

  .user {
    text-align: center;
    .username {
      padding-right: 0.5rem;
    }

    .avatar {
      vertical-align: middle;
      display: inline-block;
      height: 2rem;
      width: 2rem;
      border-radius: 50px;
    }
  }
}
</style>
