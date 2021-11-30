import ApiClient from "@/services/ApiClient.js";

const TypeModel = {
  /**
   * List types
   *
   * @return {Promise}
   */
  list() {
    let listTypesRequest = ApiClient.get("/wp/v2/recipes/types");

    return listTypesRequest;
  }
};

export default TypeModel;
