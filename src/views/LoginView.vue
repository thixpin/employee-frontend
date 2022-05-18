<template>
    <div class="login">
        <h1>Login</h1>
        <div class="form">
            <div>
                <input type="text" v-model="email" id="email" placeholder="Email">
            </div>
            <div>
                <input type="password" v-model="password" id="password" placeholder="Enter your password">
            </div>
            <button @click="login">Login</button>
        </div>
    </div>
</template>

<script>
// import { loginMutation } from '@/graphql/mutations/login.gql'
import gql from 'graphql-tag'
import { onLogin } from '../vue-apollo.js'

export default {
    name: 'LoginForm',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$apollo.mutate({
                // mutation: loginMutation,
                mutation: gql` mutation ($input: LoginInput!) {
                    login(input: $input) {
                        access_token
                    }
                }`,
                variables: {
                    input:{
                        username: this.email,
                        password: this.password
                    }
                }
            }).then(({ data }) => {
                // console.log(data);
                onLogin(this.$apollo.provider.defaultClient, data.login.access_token);
                this.$router.push('/')
                this.$router.go('/')
            }).catch(err => {
                // console.log(err);
                this.$toast.open({
                    message: err.message,
                    type: 'error',
                    position: 'top'
                });
            })
        }
    }
}
</script>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .form div{
        width: 100%;
        max-width: 300px;
    }
    .form input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
    }

    .form button {
        width: 100%;
        max-width: 300px;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }
</style>