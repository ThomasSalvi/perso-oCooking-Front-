import ApiClient from "@/services/ApiClient.js";

const CommentModel = {
  /**
   * List comments
   *
   * @param {Number} postId Comments' post ID
   *
   * @return {Promise}
   */
  list(postId) {
    /**
     * @type {Promise}
     */
    let request = ApiClient.get("/wp/v2/comments", {
      params: {
        post: postId
      }
    });

    return request;
  },

  /**
   * Get a comment
   *
   * @param {Number} commentId Comment's ID
   *
   * @return {Promise}
   */
  get(commentId) {
    let request = ApiClient.get(`/wp/v2/comments/${commentId}`);

    return request;
  },

  /**
   * Create a comment
   *
   * @param {Number} postId Comment's post ID
   * @param {String} content Comment's content
   *
   * @return {Promise}
   */
  create(postId, content) {
    let request = ApiClient.post(
      "/wp/v2/comments",
      {
        post: postId,
        content: content
      }
    );

    return request;
  },

  /**
   * Update a comment
   *
   * @param {Number} commentId Comment's ID
   * @param {String} content Comment's content
   *
   * @return {Promise}
   */
  update(commentId, content) {
    let request = ApiClient.patch(
      `/wp/v2/comments/${commentId}`,
      {
        content: content
      }
    );

    return request;
  },

  /**
   * Delete a comment
   *
   * @param {Number} commentId Comment's ID
   *
   * @return {Promise}
   */
  delete(commentId) {
    let request = ApiClient.delete(
      `/wp/v2/comments/${commentId}`
    );

    return request;
  }
};

export default CommentModel;
