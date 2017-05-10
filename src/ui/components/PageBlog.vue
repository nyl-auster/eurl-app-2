<script>
  import Component from "../controllers/PageBlog.js"
  import Loader from "./Loader"
  Component.components = {
    Loader
  }
  export default Component;
</script>

<template>
  <div class="row page">
    <div class="small-12 columns">
      <div v-for="post in posts">
        <h2>{{post.attributes.title}}</h2>
        <div v-html="post.attributes.body.value" class="post--content">
        </div>
        <div class="post--more">
          <router-link :to="'/blog/' + post.id" class="button">Lire la suite</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

