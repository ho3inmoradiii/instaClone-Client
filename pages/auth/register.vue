<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">ثبت نام</h1>
      <form class="auth-form">
<!--        <alert-success :form="form">We have sent you an email to activate your account.</alert-success>-->
<!--        <div class="form-group">-->
<!--          <base-input :form="form" field="name" v-model.trim="form.name" placeholder="Full Name"></base-input>-->
<!--        </div>-->
        <div class="form-group">
          <input
            type="text"
            placeholder="Username"
            class="form-control form-control-lg font-14 fw-300"
          >
        </div>
        <div class="form-group">
          <input
            type="email"
            placeholder="Email"
            class="form-control form-control-lg font-14 fw-300"
          >
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            class="form-control form-control-lg font-14 fw-300"
          >
        </div>
        <div class="form-group">
          <input
            placeholder="Confirm Password"
            type="password"
            class="form-control form-control-lg font-14 fw-300"
          >
        </div>

        <div class="text-right">
          <button class="btn-block btn-primary btn-sm">ثبت نام</button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          حساب کاربری دارید؟
          <a class="color-blue">ورود</a>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
    export default {
        name: "register"
    }
</script>

<style scoped>

</style>
