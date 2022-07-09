<template>
    <div>
      <!-- Start Hero -->
      <section class="hero text-center bg-secondary mb-4 text-white">
        <div class="container">
          <h1 class="font-28 fw-600 text-uppercase">
            آپدیت اطلاعات طرح
          </h1>
        </div>
      </section>
      <!-- End Hero -->
      <!-- Upload Shot -->
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body p-1" v-if="design.data.images">
                <img :src="design.data.images.large" class="w-100 mb-4" />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <form class="auth-form" @submit.prevent="submit">
                  <div class="alert alert-success text-center" v-if="stat">
                    آپدیت موفقیت آمیز
                  </div>
<!--                  <alert-success :form="form">-->
<!--                    Design successfully updated-->
<!--                  </alert-success>-->
                  <div class="form-group">
                    <BaseInput
                      :form="form"
                      field="title"
                      v-model="form.title"
                      placeholder="عنوان طرح"
                    ></BaseInput>
                  </div>
                  <div class="form-group">
                    <BaseTextarea
                      :form="form"
                      field="description"
                      v-model="form.description"
                      placeholder="توضیح طرح"
                    ></BaseTextarea>
                  </div>
                  <div class="form-group">
                    <client-only>
                      <better-input-tag
                        :tags="form.tags"
                        placeholder="تگ ها را با , از هم جدا کنید"
                        on-paste-delimiter=","
                      ></better-input-tag>
                    </client-only>
                  </div>
                  <div class="form-group custom-control custom-checkbox text-right">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="is_live"
                      v-model="form.is_live"
                    />
                    <label
                      class="custom-control-label"
                      for="is_live"
                    >
                      انتشار طرح
                    </label>
                  </div>
                  <template v-if="teams.data.length">
                    <div class="form-group custom-control custom-checkbox text-right">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="assign_to_team"
                        v-model="form.assign_to_team"
                        @change="check($event)"
                      />
                      <label
                        class="custom-control-label"
                        for="assign_to_team"
                      >
                        اختصاص به تیم
                      </label>
                    </div>
                    <div class="form-group">
                      <select
                        :disabled="!form.assign_to_team"
                        class="custom-select text-right"
                        :class="{ 'is-invalid': form.errors.has('team') }"
                        v-model="form.team"
                      >
                        <option :value="null">اختصاص به تیم</option>
                        <option
                          v-for="team in teams.data"
                          :key="team.id"
                          :value="team.id"
                        >
                          {{ team.name }}
                        </option>
                      </select>
                      <div v-if="form.errors.has('team')" v-html="form.errors.get('team')" class="text-danger font-13 mt-1 text-right dir-rtl" />
                    </div>
                  </template>
                  <div class="text-left">
<!--                    <nuxt-link :to="{ name: 'settings.designs' }"-->
<!--                    >Cancel</nuxt-link-->
<!--                    >-->
                    <BaseButton :loading="form.busy">
                      تایید
                    </BaseButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Upload Shot -->
    </div>
</template>

<script>
  import Form from 'vform';
  import BaseButton from "~/components/global/buttons/BaseButton";
  import BaseInput from "~/components/global/inputs/BaseInput";
  import BaseTextarea from "~/components/global/inputs/BaseTextarea";
  import BetterInputTag from 'better-vue-input-tag'
    export default {
      middleware: ['auth'],
      components: {BaseButton,BaseInput,BaseTextarea,BetterInputTag},
      name: "edit",
      data(){
        return{
          form: new Form({
            title: '',
            description: '',
            is_live: false,
            tags: [],
            assign_to_team: false,
            team: null
          }),
          stat: false
        }
      },
      async asyncData({ $axios, params, error, redirect })
      {
        try {
          const [design, teams] = await Promise.all([
            await $axios.get(`/designs/${params.id}/byUser`),
            await $axios.get(`/users/teams`),
          ])

          //const design = await $axios.get(`/designs/${params.id}`)
          // const teams = await $axios.get(`/users/teams`);

          return { design: design.data,teams: teams.data };
        }catch (e) {
          if (e.response.status === 404) {
            error({statusCode: 404, message: 'طرح مورد نظر یافت نشد'})
          }
          else if (e.response.status === 401){
            redirect('/login')
          }
          else {
            error({statusCode: 500, message: 'مشکلی رخ داده است'})
          }
        }
      },
      mounted() {
        if (this.design.data) {
          Object.keys(this.form).forEach(key => {
            if (this.design.data.hasOwnProperty(key)){
              this.form[key] = this.design.data[key]
            }
          });

          this.form.tags = this.design.data.tag_list.tags || [];
          if (this.design.data.team) {
            this.form.team = this.design.data.team.id;
            this.form.assign_to_team = true;
          } else {
            this.form.assign_to_team = false;
          }
          // if (this.teams.data)
          // {
          //   this.form.team = this.teams.data.id;
          //   this.form.assign_to_team = true;
          // }else {
          //   this.form.assign_to_team = false;
          // }
        }
      },
      methods:{
        submit(){
          this.form.put(`/designs/${this.$route.params.id}`)
              .then(res => {
                this.stat = true;
                // console.log(res)
                setTimeout( () => {
                  this.$router.push({ name: 'settings.dashboard' })
                },1000);
              })
              .catch(err => console.log(err))
          //console.log(this.$route.params.id)
        },
        check(event){
          if (!this.form.assign_to_team){
            this.form.team = null;
          }
        }
      }
    }

</script>

<style scoped>

</style>
