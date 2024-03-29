<script setup lang="ts">
import { computed, reactive } from 'vue';
import { email, minLength, required, sameAs } from '@vuelidate/validators';
import { createAcct, loginWithProvider } from '@/utils/supabase';
import { LockClosedIcon } from '@heroicons/vue/20/solid';
import useVuelidate from '@vuelidate/core';
import ProviderLoginButton from './ProviderLoginButton.vue';

const state = reactive({
  email: '',
  password: '',
  passwordConfirm: '',
});

const pwdRef = computed(() => state.password);

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
  passwordConfirm: { required, sameAsPassword: sameAs(pwdRef) },
};

const v$ = useVuelidate(rules, state);
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          src="/wheat-logo.svg"
          alt="3 Wheat Auth"
          class="mx-auto h-24 w-auto"
        />
        <h1 class="text-center text-3xl font-concert-one text-yellow-900">
          3 Wheat Auth
        </h1>
        <h2
          class="mt-1 text-center text-lg font-concert-one tracking-tight text-yellow-500"
        >
          We barley knew you!
        </h2>
      </div>
      <form action="#" method="POST" class="mt-8 space-y-6">
        <div class="-space-y-px">
          <div class="relative">
            <input
              id="email-address"
              v-model="state.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-none rounded-t-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
              :class="v$.email.$error ? 'border border-red-500' : ''"
              placeholder=" "
              @change="v$.email.$touch"
              @blur="v$.email.$touch"
            />
            <label
              for="email-address"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:translate-x-1 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              :class="v$.email.$error ? 'text-red-700' : ''"
            >
              Email address
            </label>
          </div>
          <div v-if="v$.email.$error" class="text-xs px-2 my-2">
            Email field is required.
          </div>
          <div class="relative">
            <input
              id="password"
              v-model="state.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-none border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
              :class="v$.password.$error ? 'border border-red-500' : ''"
              placeholder=" "
              @change="v$.password.$touch"
              @blur="v$.password.$touch"
            />
            <label
              for="password"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:translate-x-1 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              :class="v$.password.$error ? 'text-red-700' : ''"
            >
              Password
            </label>
          </div>
          <div v-if="v$.password.$error" class="text-xs px-2 my-2">
            Password field is required.
          </div>
          <div class="relative">
            <input
              id="confirmPwd"
              v-model="state.passwordConfirm"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-none rounded-b-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
              :class="v$.passwordConfirm.$error ? 'border border-red-500' : ''"
              placeholder=" "
              @change="v$.passwordConfirm.$touch"
              @blur="v$.passwordConfirm.$touch"
            />
            <label
              for="confirmPwd"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:translate-x-1 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              :class="v$.passwordConfirm.$error ? 'text-red-700' : ''"
            >
              Confirm Password
            </label>
          </div>
          <div v-if="v$.passwordConfirm.$error" class="text-xs px-2 my-2">
            Confirm password field is required or must match.
          </div>
        </div>

        <div>
          <button
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            @click.prevent="createAcct(state.email, state.password)"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-amber-500 group-hover:text-amber-400"
                aria-hidden="true"
              />
            </span>
            Sign up
          </button>
        </div>
      </form>

      <div class="mt-6 grid grid-cols-3 items-center text-gray-600">
        <hr class="border-gray-400" />
        <p class="text-center text-sm font-concert-one">Or continue with</p>
        <hr class="border-gray-400" />
      </div>

      <div class="grid grid-cols-3 items-center gap-x-4">
        <ProviderLoginButton
          provider="google"
          @login-with-provider="loginWithProvider"
        />
        <ProviderLoginButton
          provider="facebook"
          @login-with-provider="loginWithProvider"
        />
        <ProviderLoginButton
          provider="github"
          @login-with-provider="loginWithProvider"
        />
      </div>

      <div class="text-gray-600">
        Already have an account?
        <router-link :to="'/'" class="text-amber-500 hover:text-amber-700">
          Sign in!
        </router-link>
      </div>
    </div>
  </div>
</template>
