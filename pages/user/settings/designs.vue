<template>
  <div class="setting-block">
    <div class="setting-title font-16 fw-500">Designs</div>

    <div class="setting-body white-bg-color">

      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">تصویر</th>
          <th scope="col">عنوان</th>
          <th scope="col">وضعیت</th>
          <th scope="col">عملیات</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="design in designs" :key="design.id">
          <td>
            <img :src="design.images.thumbnail" width="100px">
          </td>
          <td>{{ design.title }}</td>
          <td>{{ design.is_live ? 'منتشر شده' : 'منتشر نشده' }}</td>
          <td>
            <nuxt-link :to="{ name: 'design.edit', params: { id: design.id } }">
              ویرایش
            </nuxt-link>
          </td>
        </tr>
        </tbody>
      </table>













<!--      <table class="table table-striped">-->
<!--        <thead>-->
<!--        <tr>-->
<!--          <td></td>-->
<!--          <td>Title</td>-->
<!--          <td>Status</td>-->
<!--          <td>Actions</td>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--        <tr v-for="design in designs" :key="design.id">-->
<!--          <td>-->
<!--            <div v-if="design.images">-->
<!--              <img :src="design.images.thumbnail" width="100" />-->
<!--            </div>-->
<!--          </td>-->
<!--          <td>{{ design.title }}</td>-->
<!--          <td>{{ design.is_live ? 'Published' : 'Draft' }}</td>-->
<!--          <td>-->
<!--            <nuxt-link-->
<!--              :to="{ name: 'designs.edit', params: { id: design.id } }"-->
<!--            >-->
<!--              Edit-->
<!--            </nuxt-link>-->
<!--          </td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--      </table>-->
    </div>
  </div>
</template>

<script>
    export default {
      name: "designs",
      data(){
          return{
            designs:[]
          }
      },
      methods:{
        async getDesigns(){
          const {data} = await this.$axios.$get(`users/${this.$auth.$storage.getUniversal('user').data.id}/designs`);
          this.designs = data;
          console.log(data);
        }
      },
      created() {
        this.getDesigns()
        // console.log(this.$auth.$storage.getUniversal('user').data.id)
      }
    }
</script>

<style scoped>

</style>
