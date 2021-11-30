import ApiClient from "@/services/ApiClient.js";

const MediaModel = {
  /**
   * Get a media
   *
   * @param {Number} id Media's ID
   *
   * @return {Promise}
   */
  get(id) {
    let mediaRequest = ApiClient.get(`/wp/v2/media/${id}`);

    return mediaRequest;
  },

  /**
   * Create a media
   *
   * @param {File} file File to upload
   *
   * @return {Promise}
   */
  create(file) {
    let formData = new FormData();
    formData.append("file", file);

    let createMediaRequest = ApiClient.post(
      "/wp/v2/media",
      formData
    );

    return createMediaRequest;
  }
};

export default MediaModel;
