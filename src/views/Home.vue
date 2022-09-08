<script setup lang="ts">
import { userSessionStore } from '../stores/userSession';
import AuthCard from '@/components/AuthCard.vue';

// initialize userSession store
const userSession = userSessionStore();
</script>

<template>
  <AuthCard />
  <div>
    {{ userSession.session }}
  </div>
</template>
