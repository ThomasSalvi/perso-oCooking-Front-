import ApiClient from "@/services/ApiClient.js";

const IngredientModel = {
  /**
   * List ingredients
   *
   * @param {Array} ids Ingredient IDs
   *
   * @return {Promise}
   */
  list(ids = []) {
    let listIngredientsRequest = ApiClient.get("/wp/v2/recipes/ingredients", {
      params: {
        include: ids
      }
    });

    return listIngredientsRequest;
  }
};

export default IngredientModel;
