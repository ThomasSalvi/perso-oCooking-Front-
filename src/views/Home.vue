<template>
  <main class="main-container">
    <RecipeList v-bind:page="page" />
  </main>
</template>

<script>
import RecipeList from "@/components/RecipeList.vue";


export default {
  name: "Home",
  // Je liste les composants que je veux utiliser dans le template
  components: {
    RecipeList
  },
  props: {
    page: {
      required: false,
      default: 1,
      type: Number
    }
  }
};
</script>
