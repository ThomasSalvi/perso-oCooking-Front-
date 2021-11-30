<template>
  <main class="main-container">
    <h1>Créer un compte</h1>
    <!-- J'intercepte la soumission du formulaire avec un écouteur d'événement de type submit et je demande à Vue.js d'exécuter le preventDefault -->
    <form v-on:submit.prevent="onSubmit()">
      <fieldset>
        <div class="field" v-bind:class="{'field--error': firstNameHasErrors}">
          <label class="field__label">Prénom</label>
          <ul class="field__error-list" v-show="firstNameHasErrors">
            <li
              v-for="(error, index) of errors.firstName"
              v-bind:key="index"
            >{{ error }}</li>
          </ul>
          <!-- Je lie un champ de formulaire à une data de mon composant à l'aide de la directive v-model (https://fr.vuejs.org/v2/guide/forms.html) -->
          <input class="field__input" type="text" placeholder="John" v-model="firstName" />
        </div>
        <div class="field" v-bind:class="{'field--error': lastNameHasErrors}">
          <label class="field__label">Nom</label>
          <ul class="field__error-list" v-show="lastNameHasErrors">
            <li
              v-for="(error, index) of errors.lastName"
              v-bind:key="index"
            >{{ error }}</li>
          </ul>
          <input class="field__input" type="text" placeholder="Doe" v-model="lastName" />
        </div>
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
      </fieldset>
      <fieldset>
        <div class="field" v-bind:class="{'field--error': usernameHasErrors}">
          <label class="field__label">Identifiant</label>
          <ul class="field__error-list" v-show="usernameHasErrors">
            <li
              v-for="(error, index) of errors.username"
              v-bind:key="index"
            >{{ error }}</li>
          </ul>
          <input class="field__input" type="text" placeholder="johndoe" v-model="username" />
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
        <div class="field" v-bind:class="{'field--error': passwordHasErrors}">
          <label class="field__label">Confirmation du mot de passe</label>
          <input
            class="field__input"
            type="password"
            placeholder="Confirmez le mot de passe"
            v-model="passwordConfirmation"
          />
        </div>
      </fieldset>

      <button class="button">Créer le compte</button>
    </form>
  </main>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
      errors: {
        firstName: [],
        lastName: [],
        email: [],
        username: [],
        password: []
      }
    };
  },
  methods: {
    onSubmit() {
      // Je pense à vider ma liste d'erreur avant de revérifier mon champ
      this.errors.firstName = [];

      if (this.firstName.length === 0) {
        this.errors.firstName.push("Le prénom ne peut pas être vide.");
      } else if (this.firstName.trim().length === 0) {
        this.errors.firstName.push("Le prénom est invalide.");
      }

      this.errors.lastName = [];

      if (this.lastName.length === 0) {
        this.errors.lastName.push("Le nom ne peut pas être vide.");
      } else if (this.lastName.trim().length === 0) {
        this.errors.lastName.push("Le nom est invalide.");
      }

      this.errors.email = [];

      if (this.email.length === 0) {
        this.errors.email.push("L'email ne peut pas être vide.");
      } else if (this.email.trim().length === 0) {
        this.errors.email.push("L'email est invalide.");
      } else if (! /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)) {
        this.errors.email.push("L'email est invalide.");
      }

      this.errors.username = [];

      if (this.username.length === 0) {
        this.errors.username.push("L'identifiant ne peut pas être vide.");
      } else if (this.username.trim().length === 0) {
        this.errors.username.push("L'identifiant est invalide.");
      } else if (this.username.length > 60) {
        this.errors.username.push("L'identifiant ne peut pas dépasser 60 caractères.");
      }

      this.errors.password = [];

      if (this.password.length === 0) {
        this.errors.password.push("Le mot de passe ne peut pas être vide.");
      } else if (this.password.length > 255) {
        this.errors.password.push("Le mot de passe ne peut pas dépasser 255 caractères.");
      } else if (this.password !== this.passwordConfirmation) {
        this.errors.password.push("Le mot de passe et sa confirmation ne correspondent pas.");
      }

      // Si le formulaire est valide
      if (this.isValidForm) {
        // On inscrit l'utilisateur
        console.log('do register');

      // Le formulaire est invalide
      } else {
        // On ne fait rien
        console.log('invalid form');
      }
    }
  },
  computed: {
    /**
     * @return {bool}
     */
    firstNameHasErrors() {
      return this.errors.firstName.length > 0;
    },
    lastNameHasErrors() {
      return this.errors.lastName.length > 0;
    },
    emailHasErrors() {
      return this.errors.email.length > 0;
    },
    usernameHasErrors() {
      return this.errors.username.length > 0;
    },
    passwordHasErrors() {
      return this.errors.password.length > 0;
    },
    isValidForm() {
      return (
        !this.firstNameHasErrors &&
        !this.lastNameHasErrors &&
        !this.emailHasErrors &&
        !this.usernameHasErrors &&
        !this.passwordHasErrors
      );
    }
  }
};
</script>
