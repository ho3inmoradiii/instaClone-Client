<template>
  <div>
    <!-- Start Filters -->
    <section class="filters-block shadow-sm">
      <div class="container">
        <form @submit.prevent="search">
          <div class="filters d-flex justify-content-between align-items-center">
            <ul class="filters-dropdown">
              <li class="dropdown">
                <select
                  v-model="filters.orderBy"
                  class="custom-select"
                  style="width: 200px;"
                  @change="search"
                >
                  <option value="latest">جدیدترین ها</option>
                  <option value="likes">محبوب ترین ها</option>
                </select>
              </li>
            </ul>

            <div class="d-flex align-items-center">
              <div class="custom-control mr-3 custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="hasComments"
                  v-model="filters.has_comment"
                  true-value="1"
                  false-value="0"
                  @change="search"
                />
                <label class="custom-control-label" for="hasComments">دارای نظرات</label>
              </div>

              <div class="custom-control custom-checkbox mr-3">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="hasTeam"
                  v-model="filters.has_team"
                  true-value="1"
                  false-value="0"
                  @change="search"
                />
                <label class="custom-control-label" for="hasTeam">دارای تیم</label>
              </div>
              <div>
                <div class="input-group mb-0">
                  <input
                    type="text"
                    class="form-control dir-rtl"
                    v-model="filters.q"
                    placeholder="جستجو..."
                  />
                  <div class="input-group-append">
                    <button
                      :disabled="searching"
                      class="btn rounded primary-bg-color text-white"
                      type="submit"
                    >
                      <span v-show="searching">
                        <i class="fas fa-spinner fa-spin"></i>
                      </span>
                      جستجو
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
    <!-- End Filters -->

    <section class="cards-block">
      <div class="container">
        <div class="row">
          <BaseDesign v-for="design in designs" :key="design.id" :design="design"></BaseDesign>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import BaseDesign from "~/components/global/cards/BaseDesign";
    export default {
      name: "search",
      components: {BaseDesign},
      data(){
        return{
          filters:{
            has_team: 0,
            has_comment: 0,
            orderBy: 'likes',
            q: ''
          },
          searching: false,
          designs: null
        }
      },
      computed:{
        queryString(){
          return Object.keys(this.filters).map(k => `${k}=${this.filters[k]}`).join('&')
        }
      },
      methods:{
        search(){
          this.searching = true
          this.$axios.$get(`/search/design?${this.queryString}`)
          .then(res => {
            this.designs = res.data
            //console.log(res)
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.searching = false
          })
        }
      },
      beforeMount() {
        this.search();
      }
    }
</script>

<style scoped>

</style>
