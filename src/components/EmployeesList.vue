<template>

  <ApolloQuery :query="require('@/graphql/queries/Employees.gql')" :variables="{ page: parseInt($route.params.page) }">
    <template slot-scope="{ result: { data }, isLoading }">
      <div class="add-employee">
        <h4 v-if="!authToken"> Please  <router-link to="/login">login</router-link> to edit data </h4>
        <router-link v-else :to="{ name: 'addEmployee' }">
          <button  class="btn btn-primary"> + Add Employee</button>
        </router-link>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Department</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody v-if="isLoading">
          <tr>
            <th colspan="6"> Loading.... </th>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="employee in data.employees.data" :key="employee.id">
            <th scope="row">{{ employee.id }}</th>
            <td>{{ employee.name }}</td>
            <td>{{ employee.department.name }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.phone }}</td>
            <td>
              <router-link :to="{ name: 'employee', params: { id: employee.id } }">
                <button class="btn btn-primary">View</button>
              </router-link>
              <button v-if="authToken" class="btn-delete" @click="deleteEmployee(employee.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!isLoading && (data.employees.paginatorInfo.lastPage > 1)" class="paginator">
        <button v-if="data.employees.paginatorInfo.currentPage > 1" class="btn btn-primary"
          @click="changePage(1)">1</button>
        <span v-if="data.employees.paginatorInfo.currentPage > 4"> ... </span>
        <button v-if="data.employees.paginatorInfo.currentPage - 2 > 1" class="btn btn-primary"
          @click="changePage(data.employees.paginatorInfo.currentPage - 2)">{{ data.employees.paginatorInfo.currentPage
              - 2
          }}</button>
        <button v-if="data.employees.paginatorInfo.currentPage - 1 > 1" class="btn btn-primary"
          @click="changePage(data.employees.paginatorInfo.currentPage - 1)">{{ data.employees.paginatorInfo.currentPage
              - 1
          }}</button>
        <button class="btn btn-primary active">{{ data.employees.paginatorInfo.currentPage }}</button>
        <button v-if="data.employees.paginatorInfo.currentPage + 1 < data.employees.paginatorInfo.lastPage"
          class="btn btn-primary" @click="changePage(data.employees.paginatorInfo.currentPage + 1)">{{
              data.employees.paginatorInfo.currentPage + 1
          }}</button>
        <button v-if="data.employees.paginatorInfo.currentPage + 2 < data.employees.paginatorInfo.lastPage"
          class="btn btn-primary" @click="changePage(data.employees.paginatorInfo.currentPage + 2)">{{
              data.employees.paginatorInfo.currentPage + 2
          }}</button>
        <span v-if="data.employees.paginatorInfo.currentPage + 3 < data.employees.paginatorInfo.lastPage"> ... </span>
        <button v-if="data.employees.paginatorInfo.currentPage < data.employees.paginatorInfo.lastPage"
          class="btn btn-primary" @click="changePage(data.employees.paginatorInfo.lastPage)">{{
              data.employees.paginatorInfo.lastPage
          }}</button>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import deleteEmployeeMutate from '@/graphql/mutations/deleteEmployee.gql'
import { getToken } from '../vue-apollo.js'

export default {
  name: 'EmployeesList',
  data() {
    return {
      authToken: getToken()
    }
  },
  methods: {
    changePage(page) {
      this.$router.push({
        name: 'employees',
        params: {
          page: page
        }
      })
    },
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
          this.$router.go(0);
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
.table {
  width: 100%;
  margin: 0 auto;
}

.table thead th {
  text-align: left;
  padding: 10px;
  background-color: #42b983;
  color: #fff;
}

.table tbody tr th,
.table tbody tr td {
  border-bottom: 1px solid #ddd;
}

.table tbody td {
  padding: 10px;
  text-align: left;
}

.table tbody td last-child {
  text-align: center;
}

.table tbody td a {
  padding: 0 5px;
  text-decoration: none;
  font-weight: bold;
}

.add-employee {
  text-align: right;
  padding: 10px;
}

.add-employee button {
  padding: 5px 15px;
  border: 1px solid #42b983;
  border-radius: 3px;
  font-weight: bold;
  color: #fff;
  background-color: #42b983;
}

.paginator {
  margin-top: 20px;
  text-align: right;
  padding: 0 10px;
}

.paginator button {
  margin: 0 3px;
  padding: 5px 15px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-weight: bold;
  color: #42b983;
}

.paginator button.active,
.paginator button:hover {
  background-color: #42b983;
  color: #fff;
}

a {
  color: #42b983;
}
</style>