<script setup lang="ts">
import { logOut } from '@/utils/supabase';
import { userSessionStore } from '@/stores/userSession';

const userSession = userSessionStore();
</script>

<template>
  <div class="grid grid-cols-3 w-full max-w-3xl py-5">
    <div
      class="col-start-2 justify-self-center space-x-5 py-2 self-center font-concert-one text-gray-700 child-hover:text-amber-600 text-xl"
    >
      <router-link to="/">Home</router-link>
      <router-link to="/admin" v-if="userSession.session">Admin</router-link>
    </div>
    <div class="col-start-3 justify-self-end pr-4" v-if="userSession.session">
      <img
        class="w-10 h-10 rounded-full cursor-pointer"
        :src="userSession.session.user?.user_metadata.avatar_url"
        alt="Profile dropdown"
        referrerpolicy="no-referrer"
        @click="logOut"
      />
      <!-- <button
        class="group relative flex justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-concert-one font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        @click.prevent="signOut()"
      >
        Sign out
      </button> -->
    </div>
  </div>
</template>
