<template>
  <main class="main-container">
    <h1>Connexion</h1>
    <form v-on:submit.prevent="onSubmit()">
      <fieldset>
        <div class="field" v-bind:class="{'field--error': emailHasErrors}">
          <label class="field__label">Adresse e-mail</label>
          <ul class="field__error-list" v-show="emailHasErrors">
            <li
              v-for="(error, index) of errors.email"
              v-bind:key="index"
            >{{ error }}</li>
          </ul>
          <input
            class="field__input"
            type="text"
            placeholder="johndoe@ocooking.local"
            v-model="email"
          />
        </div>
        <div class="field" v-bind:class="{'field--error': passwordHasErrors}">
          <label class="field__label">Mot de passe</label>
          <ul class="field__error-list" v-show="passwordHasErrors">
            <li
              v-for="(error, index) of errors.password"
              v-bind:key="index"
            >{{ error }}</li>
          </ul>
          <input
            class="field__input"
            type="password"
            placeholder="Mot de passe"
            v-model="password"
          />
        </div>
      </fieldset>
      <div
        v-if="errorMessage"
        class="alert error"
      >{{ errorMessage }}</div>
      <button class="button">Connexion</button>
    </form>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: [],
        password: []
      },
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions([
      "connect"
    ]),
    onSubmit() {
      this.errors.email = [];

      if (this.email.length === 0) {
        this.errors.email.push("L'email ne peut pas être vide.");
      } else if (this.email.trim().length === 0) {
        this.errors.email.push("L'email est invalide.");
      } else if (! /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)) {
        this.errors.email.push("L'email est invalide.");
      }

      this.errors.password = [];

      if (this.password.length === 0) {
        this.errors.password.push("Le mot de passe ne peut pas être vide.");
      } else if (this.password.length > 255) {
        this.errors.password.push("Le mot de passe ne peut pas dépasser 255 caractères.");
      }

      if (this.isValidForm) {
        console.log('do login');

        // Je genère les données que je veux envoyer au endpoint d'authentification
        let userCredentials = {
          username: this.email,
          password: this.password
        };

        /**
         * J'exécute l'action connect du store avec les données que je veux envoyer à l'API
         *
         * @type {Promise}
         */
        let connectRequest = this.connect(userCredentials);

        // Je vide mon message d'erreur avant de tenter ma connexion (afin de supprimer l'ancien message d'erreur des tentatives précédentes)
        this.errorMessage = '';

        connectRequest
          // Si la connexion est un succès ...
          .then(() => {
            // ... je redirige vers une autre view
            this.$router.push({ name: 'Home' });
          })
          // Si la connexion a échoué ...
          .catch((error) => {
            // ... j'affiche le message d'erreur dans l'interface utilisateur
            this.errorMessage = error.response.data.message;
          })
      } else {
        console.log('invalid form');
      }
    }
  },
  computed: {
    emailHasErrors() {
      return this.errors.email.length > 0;
    },
    passwordHasErrors() {
      return this.errors.password.length > 0;
    },
    isValidForm() {
      return (
        !this.emailHasErrors &&
        !this.passwordHasErrors
      );
    }
  }
};
</script>
