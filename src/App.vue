<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavigationBar.vue';
import { userSessionStore } from './stores/userSession';
import { supabase } from './utils/supabase';

// initialize the userSession store
const userSession = userSessionStore();

// listen for auth events (e.g. sign in, sign out, refresh)
// set session based on the auth event
supabase.auth.onAuthStateChange((_, session) => {
  userSession.session = session;
});
</script>

<template>
  <div class="flex justify-center">
    <NavBar />
  </div>
  <RouterView />
</template>
