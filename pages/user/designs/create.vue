<template>
  <div>
    <section class="hero text-center bg-secondary text-white">
      <div class="container">
        <h1 class="font-28 fw-600 text-uppercase">
          آپلود عکس
        </h1>
      </div>
    </section>

    <div class="upload-shot">
      <div class="container">
        <div class="row justify-content-center align-items-center text-center">
          <div class="col-md-6">
            <div class="card bg-white shadow-sm">
              <div class="d-flex flex-column justify-content-center p-1">
                <div class="alert alert-danger" v-if="error">
                  <p>زمان آپلود تصویر مشکلی رخ داده است</p>
                  <p>{{ error }}</p>
                </div>
                <slim-cropper :options="slimOptions">
                  <input type="file" name="image" />
                </slim-cropper>
                <div class="text-success caption-sm mt-2" v-if="uploading">
                  <i class="fas fa-spinner fa-spin"></i>
                </div>
              </div>
            </div>
            <div class="upload-para mt-2">
              <p class="font-14 fw-400 dir-rtl">
                ابعاد تصاویر شما بایستی حداقل 800px در 600px باشد
                همچنین سایز تصویر اپلودی بایستی حداکثر 2 مگابایت باشد.
                لطفا قبل از آپلود تصویر خود را تغییر سایز دهید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Slim from '@/components/slim/slim.vue';
  export default {
    middleware: ['auth'],
    components: {
      'slim-cropper': Slim
    },
    data() {
      return {
        slimOptions: {
          service: this.slimService,
          minSize: '800,600',
          post: 'output',
          maxFileSize: 2,
          defaultInputName: 'image',
          label: 'تصویر مورد نظر خود را انتخاب کنید'
        },
        uploading: false,
        error: ''
      };
    },

    methods: {
      slimService(formData, progress, success, failure, slim){
        this.uploading = true;
        this.$axios.post(`/designs`,formData)
          .then(res => {
            this.$router.push({
              name: 'design.edit',
              params: {id: res.data.id}
            })
            // console.log(res)
          })
          .catch(err => {
            const message = err.response.data.errors;
            this.error = message[Object.keys(message)[0][0]]
            failure(500)
            //console.log(err.response)
          })
          .finally(() => this.uploading = false)
        //console.log(formData)
      }
    }
  };
</script>
