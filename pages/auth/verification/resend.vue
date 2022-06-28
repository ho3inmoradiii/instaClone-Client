<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-3 text-center font-22">
        ارسال مجدد لینک فعالسازی
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <div class="form-group">
          <input
            type="email"
            placeholder="لطفا ادرس ایمیل مورد  نظر را وارد کنید"
            v-model.trim="form.email"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': form.errors.has('email') }"
          >
          <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" class="text-danger font-13 mt-1 text-right dir-rtl" />
          <div v-if="form.errors.has('message')" v-html="form.errors.get('message')" class="text-danger font-13 mt-1 text-right dir-rtl" />
        </div>
        <div class="text-right">
          <button class="btn-block btn-primary btn-sm" :disabled="form.busy">
            <span v-if="form.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            ارسال
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
  import Form from 'vform';
  export default {
    name: "resend",
    data(){
      return{
        form: new Form({
          email: '',
        })
      }
    },
    methods:{
      submit(){
        this.form.post(`/verification/resend`)
          .then(res => {
            this.$toast.success('ما یک ایمیل برای فعالسازی حساب کاربری تان ارسال کردیم')
            this.form.reset()
          }).catch(error => {
              this.errors = error.response.data.errors;
        })

      }
    }
  }
</script>

<style scoped>

</style>
