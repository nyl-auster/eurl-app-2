import contentService from "../../services/contentService";

export default {
  data: () => ({
    loading: true,
    posts: []
  }),
  created() {
    contentService.getPosts().then(result => {
      this.posts = result.data.data
      this.loading = false
    })
  }
}
