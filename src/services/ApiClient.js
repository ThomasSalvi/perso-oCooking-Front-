import axios from "axios";

/**
 * Je crée une instance d'Axios dans laquelle je viens mettre l'URL de base vers mon API (je n'aurai plus besoin de renseigner cette URL de base dans tous les appels Ajax à partir de cette instance.
 *
 * @link https://github.com/axios/axios#config-defaults
 *
 * J'utilise une variable définie dans le fichier de configuration de mon application (.env.local)
 *
 * @link https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
 */
const ApiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

export default ApiClient;
