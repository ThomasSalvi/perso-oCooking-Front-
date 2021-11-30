<template>
  <main class="main-container">
      <h1>Créer une recette</h1>
      <CreateRecipeForm />
    </main>
</template>

<script>
import CreateRecipeForm from "@/components/CreateRecipeForm.vue";

export default {
  name: "CreateRecipe",
  components: {
    CreateRecipeForm
  }
}
</script>
