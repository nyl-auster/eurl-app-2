import contentService from "../../services/contentService";

export default {
  data: () => ({
    post:{},
    loading: true
  }),
  created() {
    contentService.getPost(this.$route.params.id).then(result => {
      this.post = result.data.data
      this.loading = false
    })
  }
}
