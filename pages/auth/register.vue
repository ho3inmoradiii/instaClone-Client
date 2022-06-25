<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">ثبت نام</h1>
      <form class="auth-form" @submit.prevent="submit">
<!--        <AlertSuccess :form="form">We have sent you an email to activate your account.</AlertSuccess>-->
<!--        <div class="form-group">-->
<!--          <base-input :form="form" field="name" v-model.trim="form.name" placeholder="Full Name"></base-input>-->
<!--        </div>-->
        <div class="form-group">
          <input
            type="text"
            placeholder="نام کاربری"
            v-model.trim="form.username"
            class="form-control form-control-lg font-14 fw-300"
            name="username"
            :class="{ 'is-invalid': form.errors.has('username') }"
          >
          <div v-if="form.errors.has('username')" v-html="form.errors.get('username')" class="text-danger font-13 mt-1 text-right dir-rtl" />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="نام"
            v-model.trim="form.name"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': form.errors.has('name') }"
          >
          <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" class="text-danger font-13 mt-1 text-right dir-rtl" />
        </div>
        <div class="form-group">
          <input
            type="email"
            placeholder="ایمیل"
            v-model.trim="form.email"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': form.errors.has('email') }"
          >
          <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" class="text-danger font-13 mt-1 text-right dir-rtl" />
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
            placeholder="تایید رمز عبور"
            type="password"
            v-model.trim="form.password_confirmation"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': form.errors.has('password_confirmation') }"
          >
          <div v-if="form.errors.has('password_confirmation')" v-html="form.errors.get('password_confirmation')" class="text-danger font-13 mt-1 text-right dir-rtl" />
        </div>

        <div class="text-right">
          <button
            class="btn-block btn-primary btn-sm"
            type="submit"
            :disabled="form.busy"
          >
            <span v-if="form.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            ثبت نام
          </button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          حساب کاربری دارید؟
          <nuxt-link :to="{name: 'login'}" class="color-blue">ورود</nuxt-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
    import Form from 'vform';
    export default {
        name: "register",
        data(){
          return{
            form: new Form({
              username: '',
              name: '',
              email: '',
              password: '',
              password_confirmation: ''
            }),
            errors: null
          }
        },
      methods:{
          submit(){
            this.form.post(`/register`)
            //this.form.post(`/register`)
            .then(res => {
              this.$toast.success('ما یک ایمیل برای فعالسازی حساب کاربری تان ارسال کردیم')
              this.form.reset()
              console.log(res)
            }).catch(error => {
              this.errors = error.response.data.errors
              console.log(this.errors)
            })
          }
      }
    }
</script>

<style scoped>

</style>
