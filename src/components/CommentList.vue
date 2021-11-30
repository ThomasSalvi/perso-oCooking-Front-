<template>
  <!-- Je stocke un élément DOM du template dans le tableau de références accessible dans le code du composant via this.$refs -->
  <section ref="commentList">
    <header>
      <h2>Commentaires ({{ totalCommentCount }})</h2>
    </header>
    <main>
      <div
        v-for="comment of commentList"
        v-bind:key="comment.id"
        class="comment"
      >
        <p class="author">{{ comment.author_name }}</p>
        <div v-html="comment.content.rendered"></div>
      </div>
      <!-- Je viens capturer l'événement émis par le composant CommentForm au niveau de son appel afin de gérer ici l'ajout d'un nouveau commentaire dans la liste -->
      <CommentForm
        v-if="isConnected"
        v-bind:postId="postId"
        v-on:addcomment="addComment"
      />
    </main>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CommentModel from "@/services/CommentModel.js";
import CommentForm from "@/components/CommentForm.vue";

export default {
  name: "CommentList",
  components: {
    CommentForm
  },
  props: {
    postId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      commentList: [],
      totalCommentCount: 0
    }
  },
  computed: {
    ...mapGetters([
      "isConnected"
    ])
  },
  methods: {
    /**
     * Add new comment to list
     *
     * @param {Object} comment Comment data
     */
    addComment(comment) {
      console.log('addcomment', comment);
      /**
       * J'ajoute le nouveau comment au début de mon tableau this.commentList
       */
      this.commentList.unshift(comment);

      /**
       * J'incrémente mon nombre total de commentaires
       */
      this.totalCommentCount += 1;

      /**
       * Je scrolle vers le haut de la liste des commentaires
       *
       * @link https://developer.mozilla.org/fr/docs/Web/API/Element/scrollIntoView
       * @link https://fr.vuejs.org/v2/guide/components-edge-cases.html#Acceder-a-des-instances-de-composants-enfants-et-des-elements-enfants
       *
       * @type {Element}
       */
      this.$refs['commentList'].scrollIntoView({
        behavior: "smooth"
      });

      /**
       * Je continue la propagation de l'événement
       */
      this.$emit('addcomment', comment);
    }
  },
  created() {
    /**
     * Je récupère la promesse générée par mon CommentModel qui s'occupe de récupérer la liste des commentaires liés à un contenu via une requête HTTP asynchrone.
     *
     * @type {Promise}
     */
    let commentListRequest = CommentModel.list(this.postId);

    commentListRequest.then((response) => {
      this.commentList = response.data;

      this.totalCommentCount = parseInt(response.headers["x-wp-total"], 10);
    });
  }
};
</script>

<style lang="scss">
/* COMPOSANT CommentList */

.comment {
  background-color: $primaryBackgroundColor;
  padding: 1rem;
  border-radius: $cardBorderRadius;
  margin-bottom: 1rem;

  .author {
    font-family: "Montserrat Italic", Arial;
    margin-bottom: 1rem;
  }
}
</style>
