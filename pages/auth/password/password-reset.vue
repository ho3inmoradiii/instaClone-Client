<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-3 text-center font-22">
        بازیابی رمز عبور
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <div class="alert alert-success" v-if="stat">
{{ status }}
          <p>
            <nuxt-link :to="{ name: 'login' }">ورود</nuxt-link>
          </p>
        </div>
        <div class="form-group">
          <input
            type="email"
            readonly
            v-model.trim="form.email"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': form.errors.has('email') }"
          >
          <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" class="text-danger font-13 mt-1 text-right dir-rtl" />
          <div v-if="form.errors.has('message')" v-html="form.errors.get('message')" class="text-danger font-13 mt-1 text-right dir-rtl" />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="رمز عبور"
            v-model.trim="form.password"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': form.errors.has('password') }"
          >
          <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" class="text-danger font-13 mt-1 text-right dir-rtl" />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="تایید رمز عبور"
            v-model.trim="form.password_confirmation"
            class="form-control form-control-lg font-14 fw-300"
          >
        </div>
        <div class="text-right">
          <button class="btn-block btn-primary btn-sm" :disabled="form.busy">
            <span v-if="form.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            تایید
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
  import Form from 'vform';
  export default {
    name: "email-password",
    data(){
      return{
        form: new Form({
          email: '',
          token: '',
          password: '',
          password_confirmation: ''
        }),
        stat: false,
        status: null
      }
    },
    methods:{
      submit(){
        this.form.post(`/password/reset`)
          .then(res => {
            this.stat = true
            this.status = res.data.status
            this.form.reset()
          }).catch(error => {
          this.errors = error.response.data.errors;
        })

      }
    },created() {
      this.form.email = this.$route.query.email;
      this.form.token = this.$route.params.token;
    }
  }
</script>

<style scoped>

</style>
