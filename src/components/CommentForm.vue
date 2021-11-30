<template>
  <div class="comment-form">
    <h3>Commenter</h3>
    <form v-on:submit.prevent="onSubmit()">
      <div>
        <div class="field">
          <textarea
            placeholder="Le texte de votre commentaire"
            class="textarea field__input"
            v-model="content"
          ></textarea>
        </div>
      </div>
      <div
        class="alert"
        v-bind:class="{error: isError, success: !isError}"
        v-if="responseMessage.length > 0"
      >{{ responseMessage }}</div>
      <button type="submit" class="button">Commenter</button>
    </form>
  </div>
</template>

<script>
import CommentModel from "@/services/CommentModel.js";

export default {
  name: "CommentForm",
  props: {
    postId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      content: '',
      responseMessage: '',
      isError: false
    }
  },
  methods: {
    onSubmit() {
      /*
      console.log(
        this.postId,
        this.content,
        window.sessionStorage.getItem("token")
      );
      */

      this.errorMessage = '';

      /**
       * @type {Promise}
       */
      let createCommentRequest = CommentModel.create(this.postId, this.content);

      createCommentRequest
        .then((response) => {
          this.isError = false;

          let comment = response.data;

          if (comment.status === "approved") {
            /**
             * J'envoie l'information qu'un nouveau commentaire a été créé en déclenchant un événement personnalisé
             *
             * @link https://vuejs.org/v2/guide/components-custom-events.html
             */
            this.$emit('addcomment', comment);
          } else {
            this.responseMessage = "Votre commentaire a bien été pris en compte. Il doit être validé par notre équipe de modération avant publication.";
          }
        })
        .catch((error) => {
          this.isError = true;

          if (error.response.data.message) {
            this.responseMessage = error.response.data.message;
          }
        });
    }
  }
};
</script>

<style lang="scss">
/* COMPOSANT CommentForm */

.comment-form {
    margin-top: 1rem;
}
</style>
