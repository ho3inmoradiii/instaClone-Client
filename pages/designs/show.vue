<template>
  <section class="post-details mt-4 pb-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="row">
            <!-- LEFT -->
            <div class="col-md-8">
              <!-- Single Image -->
              <div class="post-detail">
                <div class="single-img">
                  <img :src="design.images.large" />
                </div>
              </div>
              <!-- End Single Image -->
              <!-- Design Detail Text -->
              <div class="desing-text font-16 fw-400 pb-3 pt-2">
                <p>
                  {{ design.description }}
                </p>
              </div>
              <!-- End Design Detail Text -->
              <!-- Design Comments -->
              <div class="design-comments mt-3">
                <h1 class="font-16 fw-300 mb-4">
                  <strong class="fw-500">{{ comments.length }} comments</strong>
                </h1>
                <ul class="comment-list">
                  <DesignComment
                    v-for="comment in comments"
                    :key="comment.id"
                    :comment="comment"
                    @deleted="deleteComment"
                  ></DesignComment>
                </ul>
              </div>

              <template v-if="$auth.loggedIn">
                <form @submit.prevent="postComment">
                  <BaseTextarea
                    :form="form"
                    field="body"
                    :rows="2"
                    v-model.trim="form.body"
                    placeholder="نظر خود را وارد کنید"
                  ></BaseTextarea>

                  <div class="mt-2 text-right">
                    <BaseButton :loading="form.busy" size="sm">
                      ارسال نظر
                    </BaseButton>
                  </div>
                </form>

              </template>

<!--              <template v-if="$auth.loggedIn">-->
<!--                <form @submit.prevent="save">-->
<!--                  <base-textarea-->
<!--                    :rows="2"-->
<!--                    :form="form"-->
<!--                    field="body"-->
<!--                    v-model.trim="form.body"-->
<!--                    placeholder="Enter a comment"-->
<!--                  ></base-textarea>-->

<!--                  <div class="mt-2 text-right">-->
<!--                    <base-button :loading="form.busy" size="sm">-->
<!--                      Post comment-->
<!--                    </base-button>-->
<!--                  </div>-->
<!--                </form>-->
<!--              </template>-->

<!--              &lt;!&ndash;/ END COMMENTS&ndash;&gt;-->
            </div>

            <!-- RIGHT -->
            <div class="col-md-4">
              <div class="post-detail-sidebar">
                <!-- Designer info -->
                <div class="modal-user-meta white-bg-color">
                  <a class="float-left" href="#" title="Neba">
                    <img :src="design.user.photo_url" alt="Neba" />
                  </a>
                  <div class="modal-user-detail">
                    <h1 class="font-13 fw-500">
                      <a href="#">
                        {{ design.user.name }}
                      </a>
                    </h1>
                    <p class="font-12 fw-300 mt-1">
                      <span class="shot-by">{{ design.user.tagline }}</span>
                    </p>
                    <p class="font-12 fw-300  mt-1">
                      {{ design.create_dates.created_at_humans }}
                    </p>
                  </div>
                </div>
                <!-- End Designer info -->
                <!-- Designer Design Info -->
                <ul class="details-side-meta font-14 fw-400">
                  <DesignLike :design="design" @likeAble="changeLikeCount"></DesignLike>

                  <li class="d-table w-100">
                    <div class="stats-txt d-table-cell w-100">
                      <a href="#"> More from {{ design.user.name }} </a>
                    </div>
                  </li>
                </ul>
                <!-- End Designer Design Info -->
<!--                 Designer More Designs -->
                <div class="more-designs-outer pb-3">
                  <ul class="more-designs row">
                    <li class="col-md-6">
                      <a href="#">
                        <img
                          class="w-100"
                          src="~assets/images/among_trees_night_dribbble.png"
                          alt="Image"
                        />
                      </a>
                    </li>
                    <li class="col-md-6">
                      <a href="#">
                        <img
                          class="w-100"
                          src="~assets/images/among_trees_night_dribbble.png"
                          alt="Image"
                        />
                      </a>
                    </li>
                    <li class="col-md-6">
                      <a href="#">
                        <img
                          class="w-100"
                          src="~assets/images/among_trees_night_dribbble.png"
                          alt="Image"
                        />
                      </a>
                    </li>
                    <li class="col-md-6">
                      <a href="#">
                        <img
                          class="w-100"
                          src="~assets/images/among_trees_night_dribbble.png"
                          alt="Image"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
<!--                 End Designer More Designs-->
                <!-- Designs Tags -->
                <div class="designs-tag-outer mt-3">
                  <h2 class="font-16 fw-500 mb-2">
                    تگ ها
                  </h2>
                  <div
                    class="designs-tag font-14 fw-300"
                    v-if="design.tag_list"
                  >
                    <a
                      v-for="(tag, i) in design.tag_list.tags"
                      :key="`tag-${i}`"
                      :href="`/tags/${design.tag_list.normalized[i]}`"
                    >
                      {{ tag }}
                    </a>
                  </div>
                </div>
                <!-- End Designs Tags -->
              </div>
            </div>
            <!--/ END RIGHT-->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import DesignComment from "~/components/DesignComment";
  import BaseTextarea from "~/components/global/inputs/BaseTextarea";
  import BaseButton from "~/components/global/buttons/BaseButton";
  import Form from 'vform';
  import DesignLike from "~/components/DesignLike";
    export default {
      name: "show",
      data(){
        return{
          form: new Form({
            body: '',
          }),
        }
      },
      components:{ DesignComment,BaseTextarea,BaseButton,DesignLike },
      async asyncData({ params, $axios }) {
        const data = await $axios.$get(`/designs/slug/${params.slug}`)
        return { design: data.data, comments:data.data.comments }
      },
      methods:{
        deleteComment(id){
          this.comments = this.comments.filter(c => c.id !== id)
        },
        postComment(){
          this.form.post(`/designs/${this.design.id}/comment`)
          .then(res => {
            this.$toast.success('نظر شما با موفقیت ثبت شد')
            this.form.reset()
            this.comments = [...this.comments,res.data.data]
          })
          .catch(err => console.log(err))
        },
        changeLikeCount(num){
          this.design.likes_count = this.design.likes_count + num;
        }
      }
    }
</script>

<style scoped>

</style>
