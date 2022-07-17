<template>
  <li class="clearfix">
    <div class="comment-thumb float-left">
      <a href="#">
        <img :src="comment.user.photo_url" />
      </a>
    </div>
    <div class="comment-meta">
      <h3 class="font-16 fw-500 mb-2">
        <a href="#" title="Neba">{{ comment.user.name }}</a>
      </h3>
      <p class="font-14 fw-300 mb-2">
        {{ comment.body }}
      </p>
      <span class="font-14 fw-300 d-flex justify-content-between">
        <a href="#">{{ comment.create_dates.created_at_humans }}</a>
        <span v-if="$auth.loggedIn && $auth.user.data.id == comment.user.id">
          <a href="#" @click.prevent="destroyComment" class="text-danger">
            حذف
          </a>
        </span>
      </span>
    </div>
  </li>
</template>

<script>
    export default {
      name: "DesignComment",
      props: {
        comment: {
          type: Object,
          required: true
        }
      },
      methods:{
        destroyComment(){
          this.$axios.$delete(`/comment/${this.comment.id}`)
          .then(res => {
            this.$toast.success('نظر شما با موفقیت حذف شد')
            this.$emit('deleted', this.comment.id)
          })
          .catch(err => console.log(err))
        }
      }
    }
</script>

<style scoped>

</style>
