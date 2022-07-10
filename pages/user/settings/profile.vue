<template>
  <div class="setting-block">
    <div class="setting-title font-16 fw-500">Profile</div>

    <div class="setting-body white-bg-color">
      <form class="custom-form" @submit.prevent="update">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <BaseInput ></BaseInput>
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
    import Form from 'vform';
    export default {
      name: "profile",
      components:[BaseTextarea,BaseInput],
      data(){
        return{
          form: new Form({
            "tagline": "Laravel & Vue developer",
            "about": "I am a senior Full-Stack developer at faradars",
            "name": "Hossein Moradi",
            "formatted_address": "Markazi-arak",
            "location": {
              "latitude": "-75.5",
              "longitude": "42.4"
            },
            "available_to_hire": true
          })
        }
      }
    }
</script>

<style scoped>

</style>
