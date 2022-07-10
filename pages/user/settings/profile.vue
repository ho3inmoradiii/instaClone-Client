<template>
  <div class="setting-block">
    <div class="setting-title font-16 fw-500 text-right">Profile</div>

    <div class="setting-body white-bg-color">
      <form class="custom-form" @submit.prevent="update">
        <div class="alert-success alert" v-if="stat">
          اطلاعات شما با موفقیت به روز شد
        </div>
        <div class="row dir-rtl">
          <div class="col-md-9">
            <div class="form-group d-flex justify-content-between flex-column">
              <label class="text-right dir-rtl">نام:</label>
              <BaseInput :form="form" field="name" v-model="form.name" placeholder="نام"></BaseInput>
            </div>
            <div class="form-group d-flex justify-content-between flex-column">
              <label class="text-right dir-rtl">عنوان:</label>
              <BaseInput :form="form" field="tagline" v-model="form.tagline" placeholder="عنوان"></BaseInput>
            </div>
            <div class="form-group d-flex justify-content-between flex-column">
              <label class="text-right dir-rtl">توضیحات:</label>
              <BaseTextarea
                :form="form"
                field="about"
                :rows="4"
                v-model="form.about"
                placeholder="لطفا اطلاعات مختصری از خود وارد کنید"
              ></BaseTextarea>
            </div>
            <div class="form-group d-flex justify-content-between flex-column">
              <label class="text-right dir-rtl">آدرس:</label>
              <BaseInput :form="form" field="formatted_address" v-model="form.formatted_address" placeholder="آدرس"></BaseInput>
            </div>
            <div class="form-group custom-control custom-checkbox text-right">
              <input
                type="checkbox"
                class="custom-control-input"
                id="available_to_hire"
                v-model="form.available_to_hire"
              />
              <label
                class="custom-control-label"
                :value="true"
                for="available_to_hire"
              >آماده برای استخدام؟</label>
            </div>
            <div class="text-right">
              <BaseButton :loading="form.busy">تایید</BaseButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    import BaseInput from "~/components/global/inputs/BaseInput";
    import BaseTextarea from "~/components/global/inputs/BaseTextarea";
    import BaseButton from "~/components/global/buttons/BaseButton";
    import Form from 'vform';
    export default {
      name: "profile",
      components: {BaseTextarea, BaseInput},
      data(){
        return{
          form: new Form({
            tagline: '',
            about: '',
            name: '',
            formatted_address: '',
            available_to_hire: false
          }),
          stat: false
        }
      },
      methods:{
        update(){
          this.form.put('/settings/profile')
          .then(res => {
            this.stat = true;
            this.$auth.fetchUser()
            // setTimeout(() => {
            //
            // },1000)
          })
          .catch(err => {
            console.log(err)
          })
        }
      },
      mounted() {

        Object.keys(this.form).forEach(k => {
          if (this.$auth.user.data.hasOwnProperty(k)) {
            this.form[k] = this.$auth.user.data[k];
          }
        });
      }
    }
</script>

<style scoped>

</style>
