<template>
  <div id="app">
    <HeaderLayout />

    <!-- Le composant lié à la route actuelle sera chargé par le composant du Router RouterView -->
    <router-view />

    <FooterLayout />
  </div>
</template>

<script>
import HeaderLayout from "@/components/HeaderLayout.vue";
import FooterLayout from "@/components/FooterLayout.vue";

export default {
  name: "App",
  components: {
    HeaderLayout,
    FooterLayout
  },
  created() {
    this.$store.dispatch("validate");
  }
};
</script>

<style lang="scss">
// J'importe un fichier scss de mon dossier src/assets
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/fonts.scss";
@import "@/assets/scss/forms.scss";

/* STYLE GLOBAL */

html,
body {
  font-size: 14px;
  font-family: "Montserrat", "Arial";
  line-height: 1.4;
}

* {
  box-sizing: border-box;
}

a {
  color: #000;
  text-decoration: none;
}

h1,
h2,
h3 {
  font-family: "Montserrat Black", "Arial Black";
  text-transform: uppercase;
}

h1 {
  font-size: 2rem;
  margin: 1rem auto;
  text-align: center;
}

h2 {
  font-size: 1.2rem;
  margin: 1rem auto 0.5rem auto;
}

.main-container {
  padding-top: 5rem;
  padding-bottom: 5rem;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

</style>
