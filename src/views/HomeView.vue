<template>
  <div class="home">
    <EmployeesList />
  </div>
</template>

<script>
// @ is an alias to /src
import EmployeesList from '@/components/EmployeesList.vue'

export default {
  name: 'HomeView',
  components: {
    EmployeesList
  }
}
</script>

<style scoped>
  .home{
    max-width: 960px;
    margin: 0 auto;
  }
</style>
