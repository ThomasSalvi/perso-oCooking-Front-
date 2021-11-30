<template>
  <div>
    <div class="filter-list">
      <div class="filter-list__title">Filtrer</div>
      <div class="filter-list__content">
        <div class="filter">
          <label class="filter__label">Type</label>
          <select class="filter__control select" v-model="selectedTypeId">
            <option
              v-for="type of typeList"
              v-bind:key="type.id"
              v-bind:value="type.id"
            >
              {{ type.name }}
            </option>
          </select>
        </div>
        <div class="filter">
          <label class="filter__label">Ingrédients</label>
          <select
            multiple
            class="filter__control select"
            v-model="selectedIngredientIds"
          >
            <option
              v-for="ingredient of ingredientList"
              v-bind:key="ingredient.id"
              v-bind:value="ingredient.id"
            >
              {{ ingredient.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="recipe-list">
      <h1>Recettes</h1>
      <!-- En PHP : foreach( $recipeList as $index => $recipe ) : -->
      <!-- L'attribut v-bind:key est obligatoire et permet à Vue.js d'être plus performant dans la mise à jour des élements DOM générés à partir de la boucle -->
      <RecipeExcerpt
        v-for="recipe of recipeList"
        v-bind:key="recipe.id"
        v-bind:id="recipe.id"
        v-bind:title="recipe.title.rendered"
        v-bind:excerpt="recipe.excerpt.rendered"
        v-bind:imageId="recipe.featured_media"
      />
    </div>

    <div class="pagination">
      <RouterLink
        v-bind:to="{ name: 'PaginatedHome', params: { page: (page - 1) } }"
        v-show="hasPreviousPage"
        class="pagination__previous button"
      >Précédent</RouterLink>
      <RouterLink
        v-bind:to="{ name: 'PaginatedHome', params: { page: (page + 1) } }"
        v-show="hasNextPage"
        class="pagination__next button"
      >Suivant</RouterLink>
    </div>
  </div>
</template>

<script>
import RecipeExcerpt from "@/components/RecipeExcerpt.vue";
// Je charge la dépendance axios depuis node_modules (pas besoin de mettre son chemin)
import RecipeModel from "@/services/RecipeModel.js";
import IngredientModel from "@/services/IngredientModel.js";
import TypeModel from "@/services/TypeModel.js";

export default {
  name: "RecipeList",
  components: {
    RecipeExcerpt,
  },
  props: {
    page: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      recipeList: [],
      ingredientList: [],
      typeList: [],
      selectedTypeId: null,
      selectedIngredientIds: [],
      hasPreviousPage: false,
      hasNextPage: false
    };
  },
  /**
   * Exécute le code lorsque le hook de cycle de vie du composant created est déclenché
   *
   * @link https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
   */
  created() {
    this.getRecipeList();

    IngredientModel
      .list()
      // Promesse résolue (resolve)
      .then((response) => {
        this.ingredientList = response.data;
      })
      // Promesse rejetée (reject)
      .catch((error) => {
        console.log(error);
      });

    TypeModel
      .list()
      .then((response) => {
        this.typeList = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  /**
   * Je peux observer et effectuer des traitements lorsque mes data (props ?) changent de valeur
   *
   * @https://vuejs.org/v2/guide/computed.html#Watchers
   */
  methods: {
    getRecipeList() {
      this.hasPreviousPage = (this.page > 1);

      /**
       * J'exécute une requête HTTP asynchrone à l'aide de la librairie Axios
       */
      RecipeModel
        .list(this.page, this.selectedTypeId, this.selectedIngredientIds)
        // Quand tout se passe bien, j'exécute la fonction renseignée dans le then
        // Pour avoir accès à this, il faut utiliser une fonction fléchée
        .then((response) => {
          // J'envoie les données reçues de l'API dans une data de mon composant
          this.recipeList = response.data;


          let totalPages = parseInt(response.headers['x-wp-totalpages'], 10);

          this.hasNextPage = (this.page < totalPages);
        });
    },
  },
  watch: {
    selectedTypeId() {
      this.getRecipeList();
    },
    selectedIngredientIds() {
      this.getRecipeList();
    },
    page() {
      this.getRecipeList();
    }
  },
};
</script>

<style lang="scss">
/* COMPOSANT FilterList */

.filter-list {
  margin: 1rem 0;

  &__title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  &__content {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;

    .filter {
      display: flex;
      flex-direction: column;
      padding: 0 0.5rem;
      width: 50%;

      .filter__label,
      .filter__control {
        width: 100%;
      }

      .filter__label {
        margin-bottom: 0.5rem;
      }
    }
  }
}

/* COMPOSANT RecipeExcerpt */

.article {
  text-align: left;
  margin-bottom: 2rem;
  text-align: left;
  margin-bottom: 2rem;
  background-color: $primaryBackgroundColor;
  padding-bottom: 2rem;
  border-radius: $cardBorderRadius;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);

  .text-content {
    padding: 0 30px;
  }

  .media-image {
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: cover;
    display: block;
    margin: auto;
    border-radius: $cardBorderRadius;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

/* COMPONENT PaginationNavigation */

.pagination {
  display: flex;
  justify-content: space-between;
}
</style>
