<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-3 text-center font-22">
        ورود
      </h1>
      <form class="auth-form" @submit.prevent="submitLogin">
        <div class="text-center mb-3">
          <nuxt-link :to="{name: 'verification.resend'}" v-if="form.errors.has('verification')">ارسال مجدد لینک فعالسازی</nuxt-link>
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
        <div class="mt-4 mb-4 clearfix text-right">
          <a class="forgot-pass color-blue font-14 fw-400" href="#">
            رمز عبور خود را فراموش کرده اید؟
          </a>
        </div>
        <div class="text-right">
          <button class="btn-block btn-primary btn-sm" :disabled="form.busy">
            <span v-if="form.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            ورود
          </button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          حساب کاربری ندارید؟
          <nuxt-link :to="{name: 'register'}" class="color-blue">
            ساخت حساب کاربری
          </nuxt-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
  import Form from 'vform';
    export default {
        name: "login",
        data(){
          return{
            form: new Form({
              email: '',
              password: ''
            })
          }
        },
      methods:{
          async submitLogin(){
            // this.$axios.post(`login`,this.form)
            const successfulLogin = await this.$auth.loginWith('local', {
                data: this.form
              }).then(res => {
                  this.$toast.success('ورود موفقیت آمیز')
              }).catch(err => {
                  this.form.errors.set(err.response.data.errors)
                  if (this.form.errors.has('verification')){
                    this.$toast.error('شما باید ایمیل خود را فعال کنید')
                  }
              });

            if (successfulLogin) {
              await this.$auth.setUser({
                email: this.form.email,
                password: this.form.password,
              })
            }

          }
      }
    }
</script>

<style scoped>

</style>
