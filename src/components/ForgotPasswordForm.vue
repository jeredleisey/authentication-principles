<script setup lang="ts">
import { forgotPwd } from '@/utils/supabase';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { reactive, ref } from 'vue';

const state = reactive({
  email: '',
});

const submitted = ref(false);

const rules = {
  email: { required, email },
};

const v$ = useVuelidate(rules, state);

const submit = () => {
  if (!v$.value.$invalid) {
    forgotPwd(state.email);
    submitted.value = true;
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
          src="../assets/wheat-logo.svg"
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
        <h4 class="mt-6 text-center font-concert-one text-yellow-900">
          {{
            submitted
              ? 'Thank you for your submission. If your email address exists in our system, you will receive a link to reset your password.'
              : 'A password reset link will be sent to your email address.'
          }}
        </h4>
      </div>

      <form v-if="!submitted" class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
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
        </div>

        <div>
          <button
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            @click.prevent="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
