<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-3 text-center font-22">
        فعالسازی ایمیل
      </h1>
      <form class="auth-form">
<!--        <div>-->
<!--{{ mountains }}-->
<!--        </div>-->
        <div class="form-group" v-if="status">
          <div class="alert alert-success text-center">
            ایمیل با موفقیت فعال شد
          </div>
          <nuxt-link :to="{name: 'login'}">ورود</nuxt-link>
        </div>
        <div class="form-group" v-else>
          <div class="alert alert-danger text-center">
{{ errTxt }}
          </div>
        </div>

      </form>
    </div>
  </section>
</template>

<script>
    export default {
      data() {
        return {
          mountains: null,
          status: null,
          errTxt:null
        }
      },

      async fetch() {
        //this.mountains = this.$route.query;
        const q = Object.keys(this.$route.query)
          .map(k => `${k}=${this.$route.query[k]}`)
          .join('&');
        //this.mountains = `http://127.0.0.1:8000/api/verification/verify/${this.$route.params.id}?${q}`;
        let response = await fetch(
          `http://127.0.0.1:8000/api/verification/verify/${this.$route.params.id}?${q}`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        )
          .then(res =>
            res.json()
          )
          .then(data => {
            if (data.errors)
            {
              this.status = false;
              this.errTxt = data.errors.message;
            }else{
              this.status = true;
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
</script>

<style scoped>

</style>
