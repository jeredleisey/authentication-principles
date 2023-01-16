<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import { email, minLength, required, sameAs } from '@vuelidate/validators';
import { updatePwd } from '../utils/supabase';
import { LockClosedIcon } from '@heroicons/vue/20/solid';
import { userSessionStore } from '@/stores/userSession';

const userSessionEmail = userSessionStore().session?.user?.email;

const state = reactive({
  password: '',
  passwordConfirm: '',
});

const pwdRef = computed(() => state.password);

const rules = {
  password: { required, minLength: minLength(8) },
  passwordConfirm: { required, sameAsPassword: sameAs(pwdRef) },
};

const v$ = useVuelidate(rules, state);

const validateAndSubmit = async () => {
  const valid = await v$.value.$validate();
  if (valid) {
    updatePwd(state.password);
  } else {
    alert('form not valid');
  }
};
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
          We barley knew you
        </h2>
      </div>

      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div class="relative">
            <input
              id="password"
              v-model="state.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-none rounded-t-md border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
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
            Confirm password field is required and must match.
          </div>
        </div>

        <div>
          <button
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            @click.prevent="validateAndSubmit"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-amber-500 group-hover:text-amber-400"
                aria-hidden="true"
              />
            </span>
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
