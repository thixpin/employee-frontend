<template>
  <div class="employee">
    <div v-if="employee" class="row">

      <div class="action">
        <button @click="deleteEmployee(employee.id)">Delete</button>
        <router-link :to="'/employees/' + employee.id + '/edit'">Edit</router-link>
      </div>
      <h2>{{ employee.name }} </h2>
      <h4> {{ employee.position }}, {{ employee.department.name }} Department</h4>
      <img :src="employee.photo" alt="" srcset="">
      <p>Salary: {{ employee.salary }}</p>
      <p>Email: {{ employee.email }}</p>
      <p>Phone: {{ employee.phone }}</p>
      <p>Address: {{ employee.address }}</p>
      <p>JoinedDate: {{moment(employee.joined_at).format('YYYY-MMM-DD')}}</p>
      <p>Active: {{ employee.is_active }}</p>
      <p>Create: {{ employee.created_at }}</p>
      <p>Lest Update: {{ employee.updated_at }}</p>

    
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import EmployeeQuery from '@/graphql/queries/Employee.gql'
import deleteEmployeeMutate from '@/graphql/mutations/deleteEmployee.gql'

export default {
  name: 'EmployeeView',
  data(){
    return {
      employee: null,
      id: this.$route.params.id
    }
  },
  apollo: {
    employee: {
      query: EmployeeQuery,
      variables() {
        return {
          id: this.id
        }
      },
      result({ data }) {
        this.employee = data.employee
      }
    }
  },
  methods: {
    moment,
    deleteEmployee(id) {
      this.$apollo.mutate({
        mutation: deleteEmployeeMutate,
        variables: {
          id
        }
      }).then(({ data }) => {
        if(data.deleteEmployee) {
          this.$toast.open({
            message: 'Employee deleted',
            type: 'success',
            position: 'top'
          })
          this.$router.push('/employees')
        }
      }).catch(err => {
        this.$toast.open({
          message: err.message,
          type: 'error',
          position: 'top'
        })
      })
      // console.log(id)
    }
  }
}
</script>
