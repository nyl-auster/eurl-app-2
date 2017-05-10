<script>
  import Component from "../controllers/PageBlogSingle.js"
  Component.components = {}
  export default Component;
</script>

<template>
  <div class="row page">
    <div class="small-12 columns">
      <div class="post-content" v-if="!loading">
      <h1>{{post.attributes.title}} </h1>
        <div class="body" v-html="post.attributes.body.value"></div>
        <div class="text-center"><a class="button" href="/blog"> &#10094  Retour au blog</a> </div>
      </div>
    </div>
  </div>
</template>

