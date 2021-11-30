module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/colors";
          @import "@/assets/scss/variables";
        `,
      },
    },
  },
};
