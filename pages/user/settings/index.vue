<template>
  <div class="user-account-setting">
    <div class="container">
      <div class="row">
        <!-- LEFT -->
        <div class="col-sm-3" id="myScrollspy">
          <div class="list-group">

            <nuxt-link v-for="link in links" :key="link.route" :to="{name: link.route}" class="list-group-item list-group-item-action">
              {{ link.title }}
            </nuxt-link>


<!--            <nuxt-link-->
<!--              v-for="link in links"-->
<!--              :key="link.route"-->
<!--              :to="{ name: link.route }"-->
<!--              class="list-group-item list-group-item-action"-->
<!--            >-->
<!--              {{ link.title }}-->
<!--            </nuxt-link>-->
          </div>
        </div>

        <!-- RIGHT -->
        <div class="col-sm-9">
          <router-view></router-view>
        </div>
        <!-- END RIGHT -->
      </div>
    </div>
    <!-- END CONTAINER -->
  </div>
</template>

<script>
    export default {
      name: "index",
      middleware: ['auth'],
      data() {
        return {
          links: [
            { title: 'داشبورد', route: 'settings.dashboard' },
            { title: 'آپدیت پروفایل', route: 'settings.profile' },
            { title: 'طرح های آپلود شده', route: 'settings.designs' }
          ]
        };
      }
    }
</script>

<style scoped>

</style>
