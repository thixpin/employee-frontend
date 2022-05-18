<template>
  <div class="employee">
    <div v-if="employee" class="row">

      <div class="action" v-if="authToken">
        <router-link class="btn" :to="'/employees/' + employee.id + '/edit'">Edit</router-link>
        <a href="javascript:" class="btn btn-danger" @click="deleteEmployee(employee.id)">Delete</a>
      </div>
      <h2>{{ employee.name }} </h2>
      <h4> {{ employee.position }}, {{ employee.department.name }} Department</h4>
      <img :src="employee.photo" alt="" srcset="">
      <p>Salary: {{ employee.salary }}</p>
      <p>Email: {{ employee.email }}</p>
      <p>Phone: {{ employee.phone }}</p>
      <p>Address: {{ employee.address }}</p>
      <p>JoinedDate: {{ moment(employee.joined_at).format('YYYY-MMM-DD') }}</p>
      <p>Active: {{ employee.is_active }}</p>
      <p>Create: {{ employee.created_at }}</p>
      <p>Lest Update: {{ employee.updated_at }}</p>


    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getToken } from '../vue-apollo.js'
import EmployeeQuery from '@/graphql/queries/Employee.gql'
import deleteEmployeeMutate from '@/graphql/mutations/deleteEmployee.gql'

export default {
  name: 'EmployeeView',
  data() {
    return {
      authToken: getToken(),
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
        if (data.deleteEmployee) {
          this.$toast.open({
            message: 'Employee deleted',
            type: 'success',
            position: 'top'
          })
          setTimeout(() => {
            this.$router.push('/');
            this.$router.go(0);
          }, 1500);
        }
      }).catch(err => {
        this.$toast.open({
          message: err.message,
          type: 'error',
          position: 'top'
        })
      })
    }
  }
}
</script>


<style scoped>
.employee .action .btn{
  max-width: 300px;
  padding: 8px 20px;
  margin: 8px;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  text-decoration: none;
  border: none;
  cursor: pointer;
}
.employee .action .btn.btn-danger{
  background-color: #f44336;
}
</style>