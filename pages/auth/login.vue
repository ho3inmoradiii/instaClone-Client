<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        ورود
      </h1>
      <form class="auth-form">
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
        <div class="mt-4 mb-4 clearfix text-right">
          <a class="forgot-pass color-blue font-14 fw-400" href="#">
            رمز عبور خود را فراموش کرده اید؟
          </a>
        </div>
        <div class="text-right">
          <button class="btn-block btn-primary btn-sm">
            ورود
          </button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          حساب کاربری ندارید؟
          <a class="color-blue">
            ساخت حساب کاربری
          </a>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped>

</style>
