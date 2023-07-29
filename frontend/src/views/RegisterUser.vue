<template>
  <div class="container pt-3 mb-3">
        <h1 class="text-center m-4" >Register</h1>
        <form @submit.prevent="register">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" name="username" id="username" v-model="username" value @blur="v$.username.$touch()" class="form-control { error: v$.username.$error }" >
            </div>
            <template v-if="v$.username.$error">
                <p v-if="!v$.username.required.$response" class="errorMessage">
                Category is required.
                </p>
            </template>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" name="email" id="email" v-model="email" value @blur="v$.email.$touch()" class="form-control { error: v$.email.$error }"  aria-describedby="emailHelp">
            </div>
            <template v-if="v$.email.$error">
                <p v-if="!v$.email.required.$response" class="errorMessage">
                Email is required.
                </p>
            </template>

            <div class="mb-3">
                <label for="password" class="form-lable">Password</label>
                <input type="password" name="password" id="password" v-model="password" value @blur="v$.password.$touch()" class="form-control { error: v$.password.$error }">
            </div>
            <template v-if="v$.password.$error">
                <p v-if="!v$.password.required.$response" class="errorMessage">
                Password is required.
                </p>    
            </template>

            <div class="mb-3">
                <label for="confirm_password" class="form-label">Confirm Password</label>
                <input type="password" name="confirm_password" id="confirm_password" v-model="confirm_password" value @blur="v$.confirm_password.$touch()" class="form-control { error: v$.confirm_password.$error }">
            </div>
            <template v-if="v$.confirm_password.$error">
                <p v-if="!v$.confirm_password.required.$response" class="errorMessage">
                Confirm Password is required.
                </p>

                <p v-if="!v$.confirm_password.sameAsPassword.$response" class="errorMessage">
                Passwords do not match.
                </p>
            </template>

            <BaseButton
            type="submit"
            buttonClass="mt-5 mb-3 -fill-gradient"
            :disabled="v$.$invalid"
            >Register
            </BaseButton>
            <p v-if="v$.$error" class="errorMessage">
            Please fill out the required field(s).</p>
        </form>

        <p v-if="error" class="errorMessage">{{ error }}</p>
        <router-link to="/login" class="">Already have an account? Login</router-link>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required,sameAs, email } from '@vuelidate/validators'
export default {
     setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            errors: []
        }
    },
    validations() {  //here using validations as a funcion () instead of object is must to use sameAs function
        return {
            username: { required },
            email: { required, email },
            password: { required },
            confirm_password: { required,
                sameAsPassword: sameAs(this.password)
            }
        }
    },
    methods: {
        register() {
            this.$store.dispatch('register_user/register', {
                username: this.username,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password
            }).then(() => {
                this.$router.push({ name: 'login' })
            }).catch((err) => {
                console.log(err)
                if (err.response && err.response.data && err.response.data.message){
                    this.errors.push(err.response.data.message);
                } else {
                    this.errors.push('Something went wrong. Please try again later.');
                }
            })
        }
    }

}
</script>

<style>

</style>