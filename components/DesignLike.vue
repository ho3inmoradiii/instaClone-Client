<template>
  <li class="d-table w-100">
    <div class="stats-txt d-table-cell w-50">
      <a href="#" @click.prevent="likeDesign" v-if="$auth.loggedIn">
        <template v-if="current_user_likes">
          <span>
            <i class="fas fa-thumbs-down fa-2x text-danger"></i>
          </span>
        </template>
        <template v-else>
          <span>
            <i class="fas fa-thumbs-up fa-2x text-success"></i>
          </span>
        </template>
      </a>
    </div>
    <div class="stats-num d-table-cell w-50 text-right dir-rtl">
      <a>{{ design.likes_count }} لایک</a>
    </div>
  </li>
</template>

<script>
  export default {
    props: ['design'],

    data() {
      return {
        current_user_likes: false,
        total_likes: 0
      };
    },

    methods: {
      likeDesign(){
        this.$axios.$post(`/designs/${this.design.id}/like`)
        .then(res => {
          this.current_user_likes = !this.current_user_likes;
          this.$emit('likeAble', this.current_user_likes ? 1 : -1);
          this.total_likes = res.total;
        })
      },

      isLikedByUser(){
        this.$axios.$get(`/designs/${this.design.id}/liked`)
        .then(res => {
          this.current_user_likes = res.isLiked
        })
      }
    },

    created() {
       this.isLikedByUser()
    }
  };
</script>

<style></style>
