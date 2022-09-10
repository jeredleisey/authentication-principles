<script setup lang="ts">
import { userSessionStore } from '../stores/userSession';
import SignIn from '@/components/SignIn.vue';

// initialize userSession store
const userSession = userSessionStore();
</script>

<template>
  <div v-if="!userSession.session">
    <SignIn />
  </div>
  <div
    class="flex justify-center font-concert-one text-gray-500 text-3xl"
    v-if="userSession.session"
  >
    Congrats on being a member!
  </div>
</template>
