/**
 * Récupérer les contenus du site
 */
import axios from "axios"

const apiUrl = "http://127.0.0.1/jsonblog/jsonapi"
const clientId = "eurlapp"

export default {

  // liste des posts de blogs
  getPosts () {
    return axios.get(apiUrl + "/node/article?sort=-created&filter[status][value]=1&filter[uid.name][value]=" + clientId)
  },

  getPost(id) {
    return axios.get(apiUrl + "/node/article/" + id)
  }

};
