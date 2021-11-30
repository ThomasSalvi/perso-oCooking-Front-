import ApiClient from "@/services/ApiClient.js";

const RecipeModel = {
  /**
   * List recipes
   *
   * @param {Number} page          Recipe list page
   * @param {Number} typeId        Recipes' type ID
   * @param {Array}  ingredientIds Recipes' ingredient IDs
   *
   * @return {Promise}
   */
  list(page, typeId, ingredientIds) {
    let listRecipesParameters = {
      page: page
    };

    if (typeId) {
      listRecipesParameters["recipes/types"] = typeId;
    }

    if (ingredientIds.length > 0) {
      listRecipesParameters["recipes/ingredients"] = ingredientIds;
    }

    if (ingredientIds.length > 1) {
      listRecipesParameters["recipes/ingredients_operator"] = "AND";
    }

    if (typeId && ingredientIds.length > 0) {
      listRecipesParameters.tax_relation = "AND";
    }

    let listRecipeRequest = ApiClient.get("/wp/v2/recipes", {
      params: listRecipesParameters
    });

    return listRecipeRequest;
  },

  /**
   * Get a recipe
   *
   * @param {Number} id Recipe's ID
   *
   * @return {Promise}
   */
  get(id) {
    let recipeRequest = ApiClient.get(`/wp/v2/recipes/${id}`);

    return recipeRequest;
  },

  /**
   * Create a recipe
   *
   * @param {string} title           Recipe's title
   * @param {string} steps           Recipe's steps
   * @param {string} difficulty      Recipe's difficulty
   * @param {string} preparationTime Recipe's preparation time
   * @param {string} cookingTime     Recipe's cooking time
   * @param {string} personCount     Recipe's person count
   * @param {string} costPerPerson   Recipe's cost per person
   * @param {number} imageId         Recipe's image ID
   *
   * @return {Promise}
   */
  create(title, steps, difficulty, preparationTime, cookingTime, personCount, costPerPerson, imageId) {
    difficulty      = parseInt(difficulty, 10);
    preparationTime = parseInt(preparationTime, 10);
    cookingTime     = parseInt(cookingTime, 10);
    personCount     = parseInt(personCount, 10);
    costPerPerson   = parseInt(costPerPerson, 10);

    let recipe = {
      title: title,
      content: steps,
      status: "pending",
      featured_media: imageId,
      meta: {
        difficulty: difficulty,
        preparation_time: preparationTime,
        cooking_time: cookingTime,
        person_count: personCount,
        cost_per_person: costPerPerson
      }
    };

    let createRecipeRequest = ApiClient.post("/wp/v2/recipes", recipe);

    return createRecipeRequest;
  },

  /**
   * Update a recipe
   *
   * @param {Number} id      Recipe's ID
   * @param {Number} mediaId Recipe's media ID
   *
   * @return {Promise}
   */
  update(id, mediaId) {
    let updateRecipeRequest = ApiClient.patch(`/wp/v2/recipes/${id}`, {
      featured_media: mediaId
    });

    return updateRecipeRequest;
  }
};

export default RecipeModel;
