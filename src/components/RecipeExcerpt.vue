<template>
  <article class="article">
    <RouterLink v-bind:to="{name: 'Recipe', params: {id: id}}">
      <!-- https://fr.vuejs.org/v2/guide/class-and-style.html#Liaison-de-Styles-HTML -->
      <!-- Je peux utiliser les computed comme des data classiques (imageURL) -->
      <div
        class="media-image"
        v-if="image"
        v-bind:style="{backgroundImage: `url(${imageURL})`}"
      ></div>
      <div class="text-content">
        <!-- équivalent à innerHtml -->
        <h2 v-html="title"></h2>
        <!-- https://vuejs.org/v2/guide/syntax.html#Raw-HTML -->
        <!-- équivalent à innerHTML -->
        <div v-html="excerpt"></div>
      </div>
    </RouterLink>
  </article>
</template>

<script>
import MediaModel from "@/services/MediaModel.js";

export default {
  name: "RecipeExcerpt",
  /**
   * Les props sont des "data" nécessaire à la contruction de notre composant. Ils peuvent optionnels (par défaut) ou obligatoires.
   * On peut également forcer le type d'une prop (Types disponibles : https://fr.vuejs.org/v2/guide/components-props.html#Verification-de-types)
   */
  props: {
    id: {
      required: true,
      type: Number
    },
    title: {
      required: true,
      type: String
    },
    excerpt: {
      required: true,
      type: String
    },
    imageId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      image: null
    };
  },
  created() {
    // Si j'ai une image associée à ma recette
    if (this.imageId > 0) {
      // Je récupère ses informations à l'aide de l'API
      MediaModel
        .get(this.imageId)
        .then((response) => {
          this.image = response.data;
        });
    }
  },
  /**
   * Les computed sont des data calculées à l'aide d'un traitement (une méthode).
   * Ils doivent retourner la donnée calculée.
   * Vue.js met un système de cache automatique et le regénère si les data "dynamiques" qu'on utilise dans la méthode changent de valeur. Par exemple, pour imageURL, si la data image change, le computed imageURL sera recalculé.
   *
   * @link https://fr.vuejs.org/v2/guide/computed.html
   */
  computed: {
    /**
     * Get image URL from media sizes
     *
     * @return {string} Selected image URL
     */
    imageURL() {
      let imageURL = '';

      // Si j'ai une image
      if (this.image !== null) {
        // Si cette image a un format large
        if (this.image.media_details.sizes.large) {
          // Je l'utilise comme URL d'image
          imageURL = this.image.media_details.sizes.large.source_url;
        } else {
          // Sinon j'utilise l'URL de l'image source
          imageURL = this.image.media_details.sizes.full.source_url;
        }
      }

      // Je pense à retourne l'URL de l'image que l'on veut utiliser pour ce computed
      return imageURL;
    }
  }
};
</script>

<style lang="scss"></style>
