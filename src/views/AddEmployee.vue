<template>
    <div class="create">
        <h1>Create Employee</h1>
        <div class="form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="name" id="name">
            </div>
            <div class="form-group">
                <label for="salary">Salary</label>
                <input type="number" v-model="salary" id="salary">
            </div>
            <div class="form-group">
                <label for="position">Position</label>
                <input type="text" v-model="position" id="position">
            </div>
            <div class="form-group">
                <label for="department">Department</label>
                <select v-model="department_id" id="department">
                    <option value="">Select a department</option>
                    <option v-for="department in departments.data" :value="department.id" :key="department.id">{{
                            department.name
                    }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="text" v-model="phone" id="phone">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" v-model="email" id="email">
            </div>
            <div class="form-group">
                <label for="joined_at">joined_at</label>
                <input type="date" v-model="joined_at" id="joined_at">
            </div>
            <div class="form-group">
                <label for="is_active">Active</label>
                <input type="checkbox" v-model="is_active" id="is_active">
            </div>
            <div class="form-group">
                <label for="address">Address</label>
                <textarea type="text" v-model="address" id="address"></textarea>
            </div>
            <div class="form-group">
                <label for="photo">Photo URL</label>
                <input type="text" v-model="photo" id="photo">
            </div>
            <button @click="createEmployee">Submit</button>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import DepartmentsQuery from '@/graphql/queries/Departments.gql'
import createEmployeeMutation from '@/graphql/mutations/createEmployee.gql'

export default {
    name: 'AddEmployee',
    data() {
        return {
            name: '',
            salary: '',
            position: '',
            department_id: '',
            phone: '',
            email: '',
            joined_at: '',
            is_active: false,
            address: '',
            photo: '',
            departments: []
        }
    },
    apollo: {
        departments: {
            query: DepartmentsQuery,
            result({ data }) {
                this.departments = data.departments
            }
        }
    },
    methods: {
        createEmployee() {
            var hasEmtpy = false;
            const requireFies = ['name', 'salary', 'position', 'department_id'];
            requireFies.every(field => {
                if(!this[field]) {
                    this.$toast.open({
                        message: `${field} is required`,
                        type: 'error',
                        position: 'top'
                    });
                    hasEmtpy = true;
                    return false;
                }
                return true;
            });
            if(hasEmtpy) return;
            this.$apollo.mutate({
                mutation: createEmployeeMutation,
                variables: {
                    name: this.name,
                    salary: parseInt(this.salary),
                    position: this.position,
                    department_id: this.department_id,
                    phone: this.phone,
                    email: this.email,
                    joined_at: this.joined_at ? moment(this.joined_at).format('YYYY-MM-DD HH:mm:ss') : null,
                    is_active: this.is_active,
                    address: this.address,
                    photo: this.photo
                }
            }).then(({ data }) => {
                this.$toast.open({
                    message: data.createEmployee.name + ' has been add to employee list',
                    type: 'success',
                    position: 'top'
                });
                setTimeout(() => {
                    this.$router.go(0);
                }, 1200);
            }).catch(error => {
                this.$toast.open({
                    message: error.message,
                    type: 'error',
                    position: 'top'
                });
            });
        }
    }
}
</script>

<style scoped>
.create .form {
    max-width: 500px;
    margin: 0 auto;
}

.create .form button {
    width: 120px;
    margin-top: 20px;
    margin-left: 220px;
    padding: 7px 10px;
    font-weight: bold;
    color: #fff;
    background-color: #42b983;
    border: 1px solid #42b983;
    border-radius: 3px;
}

.create .form-group {
    text-align: left;
    margin-bottom: 10px;
}

.create {
    max-width: 960px;
    margin: 0 auto;
}

.create .form-group label {
    display: inline-block;
    width: 120px;
}

.create .form-group input,
.create .form-group textarea {
    width: 300px;
}

.create .form-group select {
    width: 308px;
}
</style>
