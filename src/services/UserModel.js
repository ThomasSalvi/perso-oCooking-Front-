import ApiClient from "@/services/ApiClient.js";

const UserModel = {
  /**
   * Validate a token
   *
   * @param {string} token User's token
   *
   * @return {Promise}
   */
  validate(token) {
    let validateTokenRequest = ApiClient.post(
      "/jwt-auth/v1/token/validate",
      {},
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    return validateTokenRequest;
  },

  /**
   * Get logged in user data
   *
   * @return {Promise}
   */
  me() {
    let meRequest = ApiClient.get("/wp/v2/users/me");

    return meRequest;
  }
};

export default UserModel;
