<script setup lang="ts">
import { supabase } from '@/utils/supabase';
import { ApiError } from '@supabase/gotrue-js';
import { userSessionStore } from '@/stores/userSession';

const userSession = userSessionStore();

const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert((error as ApiError).message);
  }
};
</script>

<template>
  <div class="grid grid-cols-3 w-full max-w-7xl py-5">
    <div
      class="col-start-2 justify-self-center space-x-5 py-2 self-center font-concert-one text-gray-700 child-hover:text-amber-600 text-xl"
    >
      <router-link to="/">Home</router-link>
      <router-link to="/admin">Admin</router-link>
    </div>
    <div class="col-start-3 justify-self-end" v-if="userSession.session">
      <button
        class="group relative flex justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-concert-one font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        @click.prevent="signOut()"
      >
        Sign out
      </button>
    </div>
  </div>
</template>
