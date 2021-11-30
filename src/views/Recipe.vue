<template>
  <main class="main-container" v-if="recipe !== null">
    <h1 v-html="recipe.title.rendered"></h1>
    <article class="recipe">
      <section class="informations">
        <ul>
          <li>Difficulté : {{ recipe.meta.difficulty }} / 5</li>
          <li>Temps de préparation : {{ recipe.meta.preparation_time }} minute<span v-if="recipe.meta.preparation_time > 1">s</span></li>
          <li>Temps de cuisson : {{ recipe.meta.cooking_time }} minute<span v-if="recipe.meta.cooking_time > 1">s</span></li>
          <li>Nombre de personnes : {{ recipe.meta.person_count }} personne<span v-if="recipe.meta.person_count > 1">s</span></li>
          <li>Coût par personne : {{ recipe.meta.cost_per_person }} €</li>
        </ul>
        <img
          class="media-image"
          v-bind:src="imageURL"
        />
      </section>

      <section class="ingredients" v-if="ingredientList.length">
        <h2>Ingrédients</h2>
        <ul>
          <li v-for="ingredient of ingredientList" v-bind:key="ingredient.id">{{ ingredient.name }}</li>
        </ul>
      </section>
      <section class="preparation">
        <h2>Préparation</h2>
        <div v-html="recipe.content.rendered"></div>
      </section>
    </article>
    <CommentList v-bind:postId="id" v-on:addcomment="addComment" />
  </main>
  <img v-else src="@/assets/loader.gif" />
</template>

<script>
import RecipeModel from "@/services/RecipeModel.js";
import IngredientModel from "@/services/IngredientModel.js";
import MediaModel from "@/services/MediaModel.js";
import CommentList from "@/components/CommentList.vue";

export default {
  name: "Recipe",
  components: {
    CommentList
  },
  props: {
    id: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      recipe: null,
      ingredientList: [],
      image: null
    };
  },
  computed: {
    imageURL() {
      let imageURL = '';

      // Si j'ai une image
      if (this.image !== null) {
        // Si cette image a un format large
        if (this.image.media_details.sizes.large) {
          // Je l'utilise comme URL d'image
          imageURL = this.image.media_details.sizes.large.source_url;
        } else {
          // Sinon j'utilise l'URL de l'image source
          imageURL = this.image.media_details.sizes.full.source_url;
        }
      }

      // Je pense à retourne l'URL de l'image que l'on veut utiliser pour ce computed
      return imageURL;
    }
  },
  methods: {
    addComment(comment) {
      console.log('Recipe', comment);
    }
  },
  created() {
    RecipeModel
      .get(this.id)
      .then((response) => {
        this.recipe = response.data;

        let ingredientIds = this.recipe["recipes/ingredients"];

        if (ingredientIds.length) {
          IngredientModel
            .list(ingredientIds)
            .then((response) => {
              this.ingredientList = response.data;
            })
        };

        let mediaId = this.recipe.featured_media;

        if (mediaId) {
          MediaModel
            .get(mediaId)
            .then((response) => {
              this.image = response.data;
            });
        }
      })
  }
}
</script>

<style lang="scss">
/* COMPOSANT RecipeFull */
.recipe {
  ul {
    list-style-type: disc;
    padding-left: 1.2rem;
    padding-bottom: 1rem;
  }

  .preparation {
    p {
      margin-bottom: 1rem;
    }
  }

  .media-image {
    width: 100%;
    height: 75vh;
    object-fit: cover;
  }
}
</style>
