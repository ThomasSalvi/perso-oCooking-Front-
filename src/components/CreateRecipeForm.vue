<template>
  <form v-on:submit.prevent="onSubmit()" ref="createRecipeForm">
    <div class="field" v-bind:class="{ 'field--error': titleHasErrors }">
      <label class="field__label">Titre</label
      ><input
        type="text"
        placeholder="Titre de la recette"
        class="field__input"
        v-model="title"
      />
      <ul class="field__error-list">
        <li v-for="(error, index) of errors.title" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="field" v-bind:class="{ 'field--error': difficultyHasErrors }">
      <label class="field__label">Difficulté</label>
      <select class="select" v-model="difficulty">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <ul class="field__error-list" v-if="difficultyHasErrors">
        <li v-for="(error, index) of errors.difficulty" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div
      class="field"
      v-bind:class="{ 'field--error': preparationTimeHasErrors }"
    >
      <label class="field__label">Temps de préparation (en minutes)</label
      ><input
        type="text"
        placeholder="15"
        class="field__input"
        v-model="preparationTime"
      />
      <ul class="field__error-list" v-if="preparationTimeHasErrors">
        <li v-for="(error, index) of errors.preparationTime" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="field" v-bind:class="{ 'field--error': cookingTimeHasErrors }">
      <label class="field__label">Temps de cuisson (en minutes)</label
      ><input
        type="text"
        placeholder="15"
        class="field__input"
        v-model="cookingTime"
      />
      <ul class="field__error-list" v-if="cookingTimeHasErrors">
        <li v-for="(error, index) of errors.cookingTime" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="field" v-bind:class="{ 'field--error': personCountHasErrors }">
      <label class="field__label">Nombre de personne</label
      ><input
        type="text"
        placeholder="1"
        class="field__input"
        v-model="personCount"
      />
      <ul class="field__error-list" v-if="personCountHasErrors">
        <li v-for="(error, index) of errors.costPerPerson" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div
      class="field"
      v-bind:class="{ 'field--error': costPerPersonHasErrors }"
    >
      <label class="field__label">Coût par personne (en euros (€))</label
      ><input
        type="text"
        placeholder="5"
        class="field__input"
        v-model="costPerPerson"
      />
      <ul class="field__error-list" v-if="costPerPersonHasErrors">
        <li v-for="(error, index) of errors.costPerPerson" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="field" v-bind:class="{ 'field--error': imageHasErrors }">
      <label class="field__label">Image</label
      ><input
        type="file"
        class="field__input"
        name="image"
        accept="image/jpeg,image/png"
      />
      <ul class="field__error-list" v-if="imageHasErrors">
        <li v-for="(error, index) of errors.image" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="field" v-bind:class="{ 'field--error': stepsHasErrors }">
      <label class="field__label">&Eacute;tapes</label
      ><textarea
        placeholder="Le texte de la recette"
        class="field__input"
        style="height: 30rem"
        v-model="steps"
      ></textarea>
      <ul class="field__error-list">
        <li v-for="(error, index) of errors.steps" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="alert error" v-if="errorMessage">{{ errorMessage }}</div>
    <button type="submit" class="button">Sauvegarder</button>
  </form>
</template>

<script>
import RecipeModel from "@/services/RecipeModel.js";
import MediaModel from "@/services/MediaModel.js";

export default {
  name: "CreateRecipeForm",
  data() {
    return {
      title: "",
      steps: "",
      difficulty: 1,
      preparationTime: "",
      cookingTime: "",
      personCount: "",
      costPerPerson: "",
      errors: {
        title: [],
        steps: [],
        difficulty: [],
        preparationTime: [],
        cookingTime: [],
        personCount: [],
        costPerPerson: [],
        image: [],
      },
      errorMessage: "",
    };
  },
  computed: {
    titleHasErrors() {
      return this.errors.title.length > 0;
    },
    stepsHasErrors() {
      return this.errors.steps.length > 0;
    },
    difficultyHasErrors() {
      return this.errors.difficulty.length > 0;
    },
    preparationTimeHasErrors() {
      return this.errors.preparationTime.length > 0;
    },
    cookingTimeHasErrors() {
      return this.errors.cookingTime.length > 0;
    },
    personCountHasErrors() {
      return this.errors.personCount.length > 0;
    },
    costPerPersonHasErrors() {
      return this.errors.costPerPerson.length > 0;
    },
    imageHasErrors() {
      return this.errors.image.length > 0;
    },
    isValidForm() {
      return (
        !this.titleHasErrors &&
        !this.stepsHasErrors &&
        !this.difficultyHasErrors &&
        !this.preparationTimeHasErrors &&
        !this.cookingTimeHasErrors &&
        !this.personCountHasErrors &&
        !this.costPerPersonHasErrors &&
        !this.imageHasErrors
      );
    },
  },
  methods: {
    onSubmit() {
      this.errors.title = [];

      if (this.title.length === 0) {
        this.errors.title.push("Le titre est obligatoire.");
      } else if (this.title.trim().length === 0) {
        this.errors.title.push(
          "Le titre ne peut pas contenir que des caractères invisibles"
        );
      }

      this.errors.steps = [];

      if (this.steps.length === 0) {
        this.errors.steps.push("Les étapes sont obligatoires.");
      } else if (this.steps.trim().length === 0) {
        this.errors.steps.push(
          "Les étapes ne peuvent pas contenir que des caractères invisibles"
        );
      }

      this.errors.difficulty = [];

      let difficulty = parseInt(this.difficulty, 10);

      if (difficulty < 1 || difficulty > 5) {
        this.errors.difficulty.push("La difficulté est invalide.");
      }

      this.errors.preparationTime = [];

      if (this.preparationTime.length === 0) {
        this.errors.preparationTime.push(
          "Le temps de préparation est obligatoire."
        );
      } else if (this.preparationTime.trim().length === 0) {
        this.errors.preparationTime.push(
          "Le temps de préparation ne peut pas contenir que des caractères invisibles."
        );
      } else {
        let preparationTime = parseInt(this.preparationTime, 10);

        if (preparationTime < 0) {
          this.errors.preparationTime.push(
            "Le temps de préparation ne peut pas être négatif."
          );
        }
      }

      this.errors.cookingTime = [];

      if (this.cookingTime.length === 0) {
        this.errors.cookingTime.push("Le temps de cuisson est obligatoire.");
      } else if (this.cookingTime.trim().length === 0) {
        this.errors.cookingTime.push(
          "Le temps de cuisson ne peut pas contenir que des caractères invisibles."
        );
      } else {
        let cookingTime = parseInt(this.cookingTime, 10);

        if (cookingTime < 0) {
          this.errors.cookingTime.push(
            "Le temps de cuisson ne peut pas être négatif."
          );
        }
      }

      this.errors.personCount = [];

      if (this.personCount.length === 0) {
        this.errors.personCount.push("Le nombre de personne est obligatoire.");
      } else if (this.personCount.trim().length === 0) {
        this.errors.personCount.push(
          "Le nombre de personne ne peut pas contenir que des caractères invisibles."
        );
      } else {
        let personCount = parseInt(this.personCount, 10);

        if (personCount < 0) {
          this.errors.personCount.push(
            "Le nombre de personne ne peut pas être négatif."
          );
        }
      }

      this.errors.costPerPerson = [];

      if (this.costPerPerson.length === 0) {
        this.errors.costPerPerson.push("Le coût par personne est obligatoire.");
      } else if (this.costPerPerson.trim().length === 0) {
        this.errors.costPerPerson.push(
          "Le coût par personne ne peut pas contenir que des caractères invisibles."
        );
      } else {
        let costPerPerson = parseInt(this.costPerPerson, 10);

        if (costPerPerson < 0) {
          this.errors.costPerPerson.push(
            "Le coût par personne ne peut pas être négatif."
          );
        }
      }

      this.errors.image = [];

      /**
       * v-model ne peut pas être utilisé avec un champ de type file. Il faut donc récupérer et tester la valeur du champ en JavaScript Vanilla
       *
       * @link https://developer.mozilla.org/fr/docs/Web/API/FormData
       */
      let formData = new FormData(this.$refs["createRecipeForm"]);
      /**
       * Je récupère les informations du fichier associé au champ
       *
       * @type {File}
       */
      let image = formData.get("image");

      console.log(image, image.type);

      /**
       * Je teste la taille du fichier
       *
       * @link https://developer.mozilla.org/fr/docs/Web/API/File#propri%C3%A9t%C3%A9s
       */
      if (image.size === 0) {
        this.errors.image.push("L'image est obligatoire.");
        /**
         * Je teste le type du fichier
         */
      } else if (
        image.type !== "image/jpeg" &&
        image.type !== "image/png"
      ) {
        this.errors.image.push(
          "Seules les fichiers de type JPEG ou PNG sont acceptés."
        );
      }

      if (this.isValidForm) {
        RecipeModel
          .create(
            this.title,
            this.steps,
            this.difficulty,
            this.preparationTime,
            this.cookingTime,
            this.personCount,
            this.costPerPerson
          )
          .then((response) => {
            let recipeId = response.data.id;

            MediaModel
              .create(image, recipeId)
              .then((response) => {
                let mediaId = response.data.id;

                RecipeModel
                  .update(recipeId, mediaId)
                  .then(() => {
                    this.$router.push({ name: "Home" });
                  })
                  .catch((errors) => {
                    this.errorMessage = errors.response.data.message;
                  });
              })
              .catch((errors) => {
                this.errorMessage = errors.response.data.message;
              });
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message;
          });
      } else {
        console.log("erreurs");
      }
    },
  },
};
</script>
