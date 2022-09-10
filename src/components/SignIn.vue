<script setup lang="ts">
import { LockClosedIcon } from '@heroicons/vue/20/solid';
import { supabase } from '../utils/supabase';
import router from '../router';
import { ref } from 'vue';

const email = ref('');
const password = ref('');

// login function
const login = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (error) throw error;
  } catch (error) {
    alert((error as Error).message);
  }
};

// logout function
const logOut = async () => {
  try {
    const { error } = await supabase.auth.signOut().then(router.push('/'));
    if (error) throw error;
  } catch (error) {
    alert((error as Error).message);
  }
};

// create account
const createAcct = async () => {
  try {
    const { user, session, error } = await supabase.auth.signUp({
      email: 'jered.leisey@gmail.com',
      password: 'asdfzxcv',
    });
    if (error) throw error;
    console.log(user, session);
  } catch (error) {
    alert((error as Error).message);
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
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
            />
            <label
              for="remember-me"
              class="ml-2 block font-concert-one text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-concert-one text-amber-600 hover:text-amber-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            @click.prevent="login(email, password)"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-amber-500 group-hover:text-amber-400"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
        </div>
      </form>

      <div class="mt-6 grid grid-cols-3 items-center text-gray-600">
        <hr class="border-gray-400" />
        <p class="text-center text-sm font-concert-one">Or continue with</p>
        <hr class="border-gray-400" />
      </div>

      <div class="grid grid-cols-3 items-center gap-x-4">
        <button
          class="bg-white border py-2 w-full rounded-md flex justify-center items-center text-sm hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        >
          <img src="../assets/google.svg" />
        </button>
        <button
          class="bg-white border py-2 w-full rounded-md flex justify-center items-center text-sm hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        >
          <img src="../assets/apple.svg" />
        </button>
        <button
          class="bg-white border py-2 w-full rounded-md flex justify-center items-center text-sm hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        >
          <img src="../assets/github.svg" />
        </button>
      </div>

      <div class="text-gray-600">
        Don't have an account yet?
        <a class="text-amber-500 hover:text-amber-700" href="/sign-up"
          >Sign up!</a
        >
      </div>
    </div>
  </div>
</template>
